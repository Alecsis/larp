"use client";

/**
 * Small progress-aware pieces that can be dropped into server-rendered pages.
 * They read saved progress on the client, so the surrounding page can stay
 * static and fast.
 */
import { ArrowRight, Check, Circle, PlayCircle } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getModule, lessonHref, lessonKey, moduleHref } from "@/lib/content";
import { cn } from "@/lib/cn";
import { LINE_STYLES } from "@/lib/line-colors";
import { useProgressStats } from "@/lib/progress/hooks";
import { useHydrated, useProgress } from "@/lib/progress/store";
import type { ModuleId } from "@/types/content";

/** "3 of 6 lessons · 50%" + bar for one module. */
export function ModuleProgressSummary({ moduleId, className }: { moduleId: ModuleId; className?: string }) {
  const stats = useProgressStats();
  const hydrated = useHydrated();
  const mod = stats.modules.find((item) => item.module.id === moduleId);
  if (!mod) return null;
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="font-bold">{hydrated ? `${mod.completed} of ${mod.total} lessons` : `${mod.total} lessons`}</span>
        <span className="font-mono text-ink-3">{hydrated ? `${mod.percent}%` : ""}</span>
      </div>
      <ProgressBar value={hydrated ? mod.percent : 0} label={`${mod.module.title} progress`} color={mod.module.color} />
    </div>
  );
}

/** Check / circle icon showing whether one lesson is complete. */
export function LessonStatusIcon({ storageKey, className }: { storageKey: string; className?: string }) {
  const done = Boolean(useProgress().lessons[storageKey]);
  return done ? (
    <span className={cn("grid size-6 shrink-0 place-items-center rounded-full bg-emerald text-white", className)}>
      <Check aria-hidden className="size-4" strokeWidth={3} />
      <span className="sr-only">Complete</span>
    </span>
  ) : (
    <span className={cn("grid size-6 shrink-0 place-items-center text-ink-3", className)}>
      <Circle aria-hidden className="size-5" />
      <span className="sr-only">Not started</span>
    </span>
  );
}

/** Button that says "Start line" or "Continue line" depending on progress. */
export function ModuleStartButton({ moduleId }: { moduleId: ModuleId }) {
  const progress = useProgress();
  const hydrated = useHydrated();
  const mod = getModule(moduleId);
  if (!mod) return null;
  const firstOpen = mod.lessons.find((lesson) => !progress.lessons[lessonKey(lesson)]);
  const started = hydrated && mod.lessons.some((lesson) => progress.lessons[lessonKey(lesson)]);
  const target = firstOpen ?? mod.lessons[0];
  const label = !hydrated || !started ? "Start this line" : firstOpen ? "Continue line" : "Review line";
  return (
    <ButtonLink href={lessonHref(target)}>
      {label} <ArrowRight aria-hidden className="size-4" />
    </ButtonLink>
  );
}

/** The "pick up where you left off" card used on the hub and dashboard. */
export function ContinueCard({ className }: { className?: string }) {
  const stats = useProgressStats();
  const hydrated = useHydrated();
  const next = stats.nextLesson;
  const mod = next ? getModule(next.moduleId) : null;

  if (hydrated && !next) {
    return (
      <div className={cn("rounded-2xl border-2 border-ink bg-sun p-5", className)}>
        <p className="eyebrow">All stations complete</p>
        <p className="mt-1 font-display text-xl font-bold">You&apos;ve finished every lesson!</p>
        <Link href="/challenges/final-challenge" className="mt-3 inline-flex items-center gap-1 font-bold underline underline-offset-2">
          Take the Final Challenge <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    );
  }
  if (!next || !mod) return null;

  const line = LINE_STYLES[mod.color];
  const started = hydrated && stats.lessonsCompleted > 0;
  return (
    <div className={cn("rounded-2xl border-2 border-ink bg-surface p-5 shadow-pop", className)}>
      <p className={cn("eyebrow", line.text)}>{started ? "Up next" : "Start here"} · {mod.lineLabel}</p>
      <p className="mt-1 font-display text-xl leading-tight font-bold">{next.title}</p>
      <p className="mt-1 text-sm text-ink-2">{next.summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <ButtonLink href={lessonHref(next)} variant="sun">
          <PlayCircle aria-hidden className="size-5" /> {started ? "Continue" : "Begin"}
        </ButtonLink>
        <Link href={moduleHref(mod.id)} className="text-sm font-bold underline underline-offset-2">
          Line overview
        </Link>
      </div>
    </div>
  );
}
