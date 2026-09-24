"use client";

import { Flame, Sparkles } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { cn } from "@/lib/cn";
import { getRecentDays, type ProgressStats } from "@/lib/progress/selectors";
import { LEVELS } from "@/lib/progress/xp";
import { Widget } from "./Widget";

/** Level, XP and distance to the next level. */
export function LevelWidget({ stats }: { stats: ProgressStats }) {
  const { level, totalXp } = stats;
  return (
    <Widget id="w-level" eyebrow="Level" title={level.current.name} className="bg-cobalt-soft">
      <div className="flex items-center gap-5">
        <div className="grid size-24 shrink-0 animate-pop place-items-center rounded-full border-[3px] border-ink bg-ink text-paper">
          <span className="text-center leading-none">
            <span className="block font-mono text-xs text-sun">LEVEL</span>
            <span className="font-display text-4xl font-extrabold">{level.current.level}</span>
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 font-display text-3xl font-extrabold tabular-nums">
            <Sparkles aria-hidden className="size-6 text-tangerine-ink" />
            {totalXp.toLocaleString()} <span className="text-lg text-ink-2">XP</span>
          </p>
          {level.next ? (
            <>
              <ProgressBar value={level.percentToNext} label={`Progress to level ${level.next.level}`} color="cobalt" className="mt-3" />
              <p className="mt-1.5 text-sm text-ink-2">
                {level.xpForNext - level.xpIntoLevel} XP to <strong>Level {level.next.level}: {level.next.name}</strong>
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm font-bold">Max level reached — you&apos;re an AI Scholar!</p>
          )}
        </div>
      </div>
      <ol className="mt-5 flex gap-1" aria-label="All levels">
        {LEVELS.map((item) => (
          <li
            key={item.level}
            title={`Level ${item.level}: ${item.name} (${item.minXp} XP)`}
            className={cn("h-2 flex-1 rounded-full", item.level <= level.current.level ? "bg-cobalt" : "bg-surface ring-1 ring-ink/15")}
          >
            <span className="sr-only">
              Level {item.level}, {item.name}, {item.minXp} XP{item.level <= level.current.level ? " (reached)" : ""}
            </span>
          </li>
        ))}
      </ol>
    </Widget>
  );
}

/** Overall completion ring. */
export function CompletionWidget({ stats }: { stats: ProgressStats }) {
  return (
    <Widget id="w-complete" eyebrow="Overall" title="Course completion">
      <div className="flex flex-1 items-center gap-5">
        <ProgressRing value={stats.overallPercent} label="Overall course completion" color="#12976e" size={112}>
          <span className="font-display text-3xl font-extrabold">{stats.overallPercent}%</span>
        </ProgressRing>
        <dl className="space-y-1.5 text-sm">
          <Row label="Lessons" value={`${stats.lessonsCompleted}/${stats.totalLessons}`} />
          <Row label="Labs tried" value={`${stats.demosTried}/${stats.totalDemos}`} />
          <Row label="Badges" value={`${stats.badgesUnlocked}/${stats.totalBadges}`} />
          <Row
            label="Checks right 1st try"
            value={stats.checksAnswered ? `${Math.round((stats.checksFirstTry / stats.checksAnswered) * 100)}%` : "—"}
          />
        </dl>
      </div>
    </Widget>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="text-ink-2">{label}</dt>
      <dd className="font-mono font-bold">{value}</dd>
    </div>
  );
}

/** Current streak + the last 14 days as a strip of squares. */
export function StreakWidget({ stats, activeDays }: { stats: ProgressStats; activeDays: string[] }) {
  const days = getRecentDays(activeDays, 14);
  const format = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" });
  return (
    <Widget id="w-streak" eyebrow="Activity" title="Learning streak" className="bg-tangerine-soft">
      <p className="flex items-center gap-2">
        <Flame aria-hidden className={cn("size-9", stats.currentStreak > 0 ? "text-tangerine-ink" : "text-ink-3")} />
        <span className="font-display text-4xl font-extrabold tabular-nums">{stats.currentStreak}</span>
        <span className="text-ink-2">day{stats.currentStreak === 1 ? "" : "s"} in a row</span>
      </p>
      <p className="mt-1 text-sm text-ink-2">
        Longest streak: <strong>{stats.longestStreak}</strong> · Active days: <strong>{stats.activeDayCount}</strong>
      </p>
      <ol aria-label="Activity over the last 14 days" className="mt-4 grid grid-cols-7 gap-1.5 sm:grid-cols-14">
        {days.map(({ day, active }) => {
          const [y, m, d] = day.split("-").map(Number);
          const label = format.format(new Date(y, m - 1, d));
          return (
            <li
              key={day}
              title={label}
              className={cn("aspect-square rounded-md border-2", active ? "border-ink bg-tangerine" : "border-ink/15 bg-surface")}
            >
              <span className="sr-only">
                {label}: {active ? "active" : "no activity"}
              </span>
            </li>
          );
        })}
      </ol>
    </Widget>
  );
}
