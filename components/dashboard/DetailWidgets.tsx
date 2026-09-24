"use client";

import { ArrowRight, Award, BookCheck, BrainCircuit, FlaskConical, Trophy } from "lucide-react";
import Link from "next/link";
import { BadgeStamp } from "@/components/gamification/BadgeStamp";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ACHIEVEMENTS } from "@/data/achievements";
import { challengeHref, getQuizzes, moduleHref } from "@/lib/content";
import { cn } from "@/lib/cn";
import { LINE_STYLES } from "@/lib/line-colors";
import { computeActivityStats, type ProgressStats } from "@/lib/progress/selectors";
import type { ActivityType, ProgressState } from "@/types/progress";
import { Widget } from "./Widget";

/** One row per learning line: lesson progress + quiz result. */
export function ModuleProgressWidget({ stats }: { stats: ProgressStats }) {
  return (
    <Widget id="w-modules" eyebrow="Modules" title="Line progress">
      <ul className="space-y-5">
        {stats.modules.map((mod) => {
          const line = LINE_STYLES[mod.module.color];
          return (
            <li key={mod.module.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <Link href={moduleHref(mod.module.id)} className="font-bold hover:underline">
                  <span className={cn("eyebrow mr-2", line.text)}>{mod.module.lineLabel}</span>
                  {mod.module.title}
                </Link>
                <span className="font-mono text-sm text-ink-2">
                  {mod.completed}/{mod.total} lessons
                </span>
              </div>
              <ProgressBar value={mod.percent} label={`${mod.module.title} lessons complete`} color={mod.module.color} className="mt-2" />
              <p className="mt-1.5 text-sm text-ink-2">
                Quiz:{" "}
                {mod.quizPercent === null ? (
                  <Link href={challengeHref(mod.module.quizId)} className="font-bold underline underline-offset-2">
                    not taken yet
                  </Link>
                ) : (
                  <strong className={mod.quizPassed ? "text-emerald-ink" : "text-tangerine-ink"}>
                    best {mod.quizPercent}% {mod.quizPassed ? "· passed" : "· not passed yet"}
                  </strong>
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </Widget>
  );
}

/** Horizontal bars of best score per challenge, with the pass mark drawn in. */
export function QuizPerformanceWidget({ state, stats }: { state: ProgressState; stats: ProgressStats }) {
  const quizzes = getQuizzes();
  return (
    <Widget
      id="w-quizzes"
      eyebrow="Challenges"
      title="Quiz performance"
      action={<span className="rounded-full bg-paper-2 px-2.5 py-1 font-mono text-xs font-bold">Avg {stats.quizAverage ?? "—"}{stats.quizAverage !== null && "%"}</span>}
    >
      <ul className="space-y-4">
        {quizzes.map((quiz) => {
          const record = state.quizzes[quiz.id];
          const percent = record ? Math.round((record.bestScore / record.total) * 100) : 0;
          const passed = record ? percent >= quiz.passPercent : false;
          return (
            <li key={quiz.id}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <Link href={challengeHref(quiz.id)} className="min-w-0 truncate font-bold hover:underline">
                  {quiz.title}
                </Link>
                <span className="shrink-0 font-mono">{record ? `${record.bestScore}/${record.total}` : "—"}</span>
              </div>
              {/* Bar with a marker at the pass mark */}
              <div className="relative mt-1.5">
                <ProgressBar value={percent} label={`${quiz.title} best score`} color={passed ? "emerald" : "tangerine"} size="sm" />
                <span aria-hidden className="absolute -top-1 h-4 w-0.5 bg-ink" style={{ left: `${quiz.passPercent}%` }} />
              </div>
              {record && <p className="mt-1 text-xs text-ink-3">{record.attempts} attempt{record.attempts === 1 ? "" : "s"}</p>}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 flex items-center gap-2 text-xs text-ink-3">
        <span aria-hidden className="h-3 w-0.5 bg-ink" /> Pass mark
      </p>
    </Widget>
  );
}

const XP_PARTS: { key: keyof ProgressStats["xpBreakdown"]; label: string; color: string }[] = [
  { key: "lessons", label: "Lessons", color: "bg-cobalt" },
  { key: "checks", label: "Knowledge checks", color: "bg-sun" },
  { key: "quizzes", label: "Challenges", color: "bg-tangerine" },
  { key: "demos", label: "Labs", color: "bg-emerald" },
  { key: "badges", label: "Badge bonuses", color: "bg-ink" },
];

/** A single stacked bar showing where XP came from. */
export function XpBreakdownWidget({ stats }: { stats: ProgressStats }) {
  const total = stats.totalXp || 1;
  return (
    <Widget id="w-xp" eyebrow="XP sources" title="Where your XP came from">
      <div className="flex h-5 overflow-hidden rounded-full border-2 border-ink bg-paper-2" aria-hidden="true">
        {XP_PARTS.map((part) => (
          <span key={part.key} className={part.color} style={{ width: `${(stats.xpBreakdown[part.key] / total) * 100}%` }} />
        ))}
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {XP_PARTS.map((part) => (
          <div key={part.key} className="flex items-center gap-2">
            <span aria-hidden className={cn("size-3 shrink-0 rounded-sm border border-ink/30", part.color)} />
            <dt className="text-ink-2">{part.label}</dt>
            <dd className="ml-auto font-mono font-bold">{stats.xpBreakdown[part.key]}</dd>
          </div>
        ))}
      </dl>
    </Widget>
  );
}

/** Latest unlocked badges + the locked badge closest to unlocking. */
export function AchievementsWidget({ state }: { state: ProgressState }) {
  const activity = computeActivityStats(state);
  const unlocked = ACHIEVEMENTS.filter((badge) => state.badges[badge.id]).sort((a, b) =>
    state.badges[b.id].unlockedAt.localeCompare(state.badges[a.id].unlockedAt),
  );
  const closest = ACHIEVEMENTS.filter((badge) => !state.badges[badge.id])
    .map((badge) => {
      const { current, target } = badge.measure(activity, state);
      return { badge, current, target, ratio: target ? current / target : 0 };
    })
    .sort((a, b) => b.ratio - a.ratio)[0];

  return (
    <Widget
      id="w-badges"
      eyebrow="Achievements"
      title={`${unlocked.length} of ${ACHIEVEMENTS.length} badges`}
      action={
        <Link href="/achievements" className="inline-flex items-center gap-1 text-sm font-bold underline underline-offset-2">
          All <ArrowRight aria-hidden className="size-4" />
        </Link>
      }
    >
      {unlocked.length > 0 ? (
        <ul className="flex flex-wrap gap-3">
          {unlocked.slice(0, 6).map((badge) => (
            <li key={badge.id} className="flex w-20 flex-col items-center text-center">
              <BadgeStamp badge={badge} unlocked size="sm" />
              <span className="mt-1.5 text-xs leading-tight font-bold">{badge.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink-2">No badges yet — complete your first lesson to earn “First Stop”.</p>
      )}
      {closest && (
        <div className="mt-5 rounded-xl bg-paper p-3">
          <p className="eyebrow text-ink-3">Closest to unlocking</p>
          <div className="mt-2 flex items-center gap-3">
            <BadgeStamp badge={closest.badge} unlocked={false} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="font-bold">{closest.badge.name}</p>
              <p className="text-xs text-ink-2">{closest.badge.description}</p>
              <ProgressBar value={closest.ratio * 100} label={`${closest.badge.name} progress`} color="sun" size="sm" className="mt-1.5" />
              <p className="mt-1 font-mono text-xs">
                {closest.current}/{closest.target}
              </p>
            </div>
          </div>
        </div>
      )}
    </Widget>
  );
}

const ACTIVITY_ICONS: Record<ActivityType, typeof Award> = {
  lesson: BookCheck,
  check: BrainCircuit,
  quiz: Trophy,
  badge: Award,
  demo: FlaskConical,
};

/** The most recent things the student did. */
export function ActivityWidget({ state }: { state: ProgressState }) {
  const format = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  return (
    <Widget id="w-activity" eyebrow="History" title="Recent activity">
      {state.activity.length === 0 ? (
        <p className="text-sm text-ink-2">Nothing yet. Your lessons, labs, quizzes and badges will show up here.</p>
      ) : (
        <ol className="space-y-1">
          {state.activity.slice(0, 8).map((event) => {
            const Icon = ACTIVITY_ICONS[event.type] ?? Award;
            const content = (
              <>
                <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper">
                  <Icon aria-hidden className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm leading-snug font-bold">{event.label}</span>
                  <time dateTime={event.at} className="text-xs text-ink-3">
                    {format.format(new Date(event.at))}
                  </time>
                </span>
                {event.xp > 0 && <span className="shrink-0 rounded-full bg-sun-soft px-2 py-0.5 font-mono text-xs font-bold">+{event.xp}</span>}
              </>
            );
            return (
              <li key={event.id}>
                {event.href ? (
                  <Link href={event.href} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-paper">
                    {content}
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 p-1.5">{content}</div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </Widget>
  );
}
