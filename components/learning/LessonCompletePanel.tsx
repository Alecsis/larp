"use client";

import { ArrowRight, Check, CircleDashed, PartyPopper, Trophy } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { completeLesson } from "@/lib/progress/actions";
import { useHydrated, useProgress } from "@/lib/progress/store";
import { lessonKey } from "@/lib/content";
import type { Lesson } from "@/types/content";

/**
 * End-of-lesson panel. The "Complete lesson" button unlocks only after every
 * knowledge check has been answered — so XP reflects real engagement, not
 * just scrolling to the bottom.
 */
export function LessonCompletePanel({
  lesson,
  checkIds,
  next,
}: {
  lesson: Pick<Lesson, "id" | "moduleId" | "title" | "xp">;
  checkIds: string[];
  /** Where to go after finishing: next lesson, or the module quiz. */
  next: { href: string; label: string };
}) {
  const progress = useProgress();
  const hydrated = useHydrated();
  const isComplete = Boolean(progress.lessons[lessonKey(lesson)]);
  const answered = checkIds.filter((id) => progress.checks[id]);
  const ready = answered.length === checkIds.length;

  if (hydrated && isComplete) {
    return (
      <section aria-labelledby="lesson-done-title" className="mt-12 rounded-2xl border-2 border-ink bg-emerald-soft p-5 shadow-pop sm:p-7">
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid size-14 animate-pop place-items-center rounded-full border-[3px] border-ink bg-emerald text-white">
            <PartyPopper aria-hidden className="size-7" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="lesson-done-title" className="font-display text-2xl font-extrabold">
              Station complete!
            </h2>
            <p className="text-ink-2">You earned {lesson.xp} XP for this lesson. Keep the momentum going.</p>
          </div>
          <ButtonLink href={next.href} size="lg">
            {next.label} <ArrowRight aria-hidden className="size-5" />
          </ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="lesson-finish-title" className="mt-12 rounded-2xl border-2 border-ink bg-surface p-5 sm:p-7">
      <h2 id="lesson-finish-title" className="font-display text-2xl font-extrabold">
        Finish this station
      </h2>
      <p className="mt-1 text-ink-2">Answer every knowledge check (right or wrong) to unlock completion.</p>

      <ul className="mt-4 space-y-2">
        {checkIds.map((id, index) => {
          const done = Boolean(progress.checks[id]);
          return (
            <li key={id} className="flex items-center gap-2">
              {done ? (
                <Check aria-hidden className="size-5 text-emerald-ink" strokeWidth={3} />
              ) : (
                <CircleDashed aria-hidden className="size-5 text-ink-3" />
              )}
              <span className={cn(done && "text-ink-2 line-through decoration-2")}>
                Knowledge check {index + 1}
                <span className="sr-only">{done ? " — answered" : " — not answered yet"}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button size="lg" variant="sun" disabled={!hydrated || !ready} onClick={() => completeLesson(lesson)}>
          <Trophy aria-hidden className="size-5" /> Complete lesson · +{lesson.xp} XP
        </Button>
        {!ready && (
          <p className="text-sm text-ink-3">
            {answered.length}/{checkIds.length} checks answered
          </p>
        )}
      </div>
    </section>
  );
}
