"use client";

import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { lessonHref, lessonKey } from "@/lib/content";
import { cn } from "@/lib/cn";
import { LINE_STYLES } from "@/lib/line-colors";
import { useProgress } from "@/lib/progress/store";
import type { Lesson, LineColor } from "@/types/content";

type RailLesson = Pick<Lesson, "id" | "moduleId" | "title" | "minutes">;

/**
 * The module's lessons drawn as stations on a vertical transit line.
 * Desktop: a sticky sidebar. Mobile: a collapsible "stations" panel.
 */
export function LessonRouteRail({
  lessons,
  currentId,
  color,
  lineLabel,
  moduleTitle,
}: {
  lessons: RailLesson[];
  currentId: string;
  color: LineColor;
  lineLabel: string;
  moduleTitle: string;
}) {
  const progress = useProgress();
  const done = lessons.filter((lesson) => progress.lessons[lessonKey(lesson)]).length;
  const heading = `${lineLabel}: ${moduleTitle}`;

  const list = <StationList lessons={lessons} currentId={currentId} color={color} completed={progress.lessons} />;

  return (
    <>
      {/* Mobile / tablet */}
      <details className="group rounded-xl border-2 border-ink bg-surface lg:hidden">
        <summary className="flex items-center justify-between gap-2 px-4 py-3">
          <span>
            <span className="eyebrow block text-ink-3">{heading}</span>
            <span className="font-display font-bold">
              Stations · {done}/{lessons.length} complete
            </span>
          </span>
          <ChevronDown aria-hidden className="size-5 transition-transform group-open:rotate-180" />
        </summary>
        <nav aria-label={`${heading} lessons`} className="border-t border-rule px-4 py-3">
          {list}
        </nav>
      </details>

      {/* Desktop */}
      <nav aria-label={`${heading} lessons`} className="sticky top-28 hidden lg:block">
        <p className="eyebrow text-ink-3">{heading}</p>
        <p className="mt-1 mb-4 text-sm text-ink-2">
          {done} of {lessons.length} stations complete
        </p>
        {list}
      </nav>
    </>
  );
}

function StationList({
  lessons,
  currentId,
  color,
  completed,
}: {
  lessons: RailLesson[];
  currentId: string;
  color: LineColor;
  completed: Record<string, unknown>;
}) {
  const line = LINE_STYLES[color];
  return (
    <div className="relative">
      <span aria-hidden className={cn("absolute top-4 bottom-4 left-[11px] w-1 rounded-full", line.bg)} />
      <ol className="relative space-y-1">
      {lessons.map((lesson, index) => {
        const isCurrent = lesson.id === currentId;
        const isDone = Boolean(completed[lessonKey(lesson)]);
        return (
          <li key={lesson.id} className="relative">
            <Link
              href={lessonHref(lesson)}
              aria-current={isCurrent ? "page" : undefined}
              className={cn(
                "flex items-start gap-3 rounded-lg py-2 pr-2 text-sm transition-colors hover:bg-ink/5",
                isCurrent && "font-bold",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "relative z-10 mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-[3px] font-mono text-[0.65rem] font-bold",
                  line.border,
                  isDone ? cn(line.bg, "text-white") : "bg-surface",
                  isCurrent && "ring-4 ring-sun",
                )}
              >
                {isDone ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}
              </span>
              <span className="leading-snug">
                {lesson.title}
                <span className="sr-only">{isDone ? " (complete)" : ""}{isCurrent ? " (current lesson)" : ""}</span>
                <span className="block text-xs font-normal text-ink-3">{lesson.minutes} min</span>
              </span>
            </Link>
          </li>
        );
      })}
      </ol>
    </div>
  );
}
