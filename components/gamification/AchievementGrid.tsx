"use client";

import { Check } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ACHIEVEMENTS } from "@/data/achievements";
import { cn } from "@/lib/cn";
import { useProgressStats } from "@/lib/progress/hooks";
import { computeActivityStats } from "@/lib/progress/selectors";
import { useHydrated, useProgress } from "@/lib/progress/store";
import { LEVELS } from "@/lib/progress/xp";
import { BadgeStamp } from "./BadgeStamp";

/** Every badge with its live progress toward unlocking. */
export function AchievementGrid() {
  const state = useProgress();
  const hydrated = useHydrated();
  const activity = computeActivityStats(state);
  const dateFormat = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" });

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ACHIEVEMENTS.map((badge) => {
        const record = hydrated ? state.badges[badge.id] : undefined;
        const unlocked = Boolean(record);
        const { current, target } = badge.measure(activity, state);
        const shown = hydrated ? Math.min(current, target) : 0;
        return (
          <li
            key={badge.id}
            className={cn(
              "flex gap-4 rounded-2xl border-2 p-4 transition-colors",
              unlocked ? "border-ink bg-surface shadow-pop-sm" : "border-rule bg-paper",
            )}
          >
            <BadgeStamp badge={badge} unlocked={unlocked} animate={unlocked} />
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg leading-tight font-bold">
                {badge.name}
                <span className="sr-only">{unlocked ? " (unlocked)" : " (locked)"}</span>
              </h3>
              <p className="mt-0.5 text-sm text-ink-2">{badge.description}</p>
              {unlocked && record ? (
                <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-emerald-ink">
                  <Check aria-hidden className="size-4" strokeWidth={3} /> Unlocked {dateFormat.format(new Date(record.unlockedAt))} · +{badge.xpBonus} XP
                </p>
              ) : (
                <div className="mt-2">
                  <ProgressBar value={(shown / target) * 100} label={`${badge.name} progress`} color="sun" size="sm" />
                  <p className="mt-1 flex justify-between font-mono text-xs text-ink-2">
                    <span>
                      {shown}/{target}
                    </span>
                    <span>+{badge.xpBonus} XP</span>
                  </p>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Summary numbers for the Achievements page header. */
export function AchievementSummary() {
  const stats = useProgressStats();
  const hydrated = useHydrated();
  return (
    <ul className="flex flex-wrap gap-2 text-sm font-bold">
      <li className="rounded-full border-2 border-ink bg-surface px-3 py-1">
        {hydrated ? stats.badgesUnlocked : "–"} / {stats.totalBadges} badges
      </li>
      <li className="rounded-full border-2 border-ink bg-surface px-3 py-1">{hydrated ? stats.xpBreakdown.badges : "–"} bonus XP from badges</li>
      <li className="rounded-full border-2 border-ink bg-surface px-3 py-1">
        Level {hydrated ? stats.level.current.level : "–"}: {hydrated ? stats.level.current.name : "…"}
      </li>
    </ul>
  );
}

/** The level ladder, highlighting the student's current level. */
export function LevelLadder() {
  const stats = useProgressStats();
  const hydrated = useHydrated();
  const currentLevel = hydrated ? stats.level.current.level : 0;
  return (
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {LEVELS.map((level) => {
        const reached = level.level <= currentLevel;
        const isCurrent = level.level === currentLevel;
        return (
          <li
            key={level.level}
            aria-current={isCurrent ? "step" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl border-2 p-3",
              isCurrent ? "border-ink bg-sun" : reached ? "border-ink bg-surface" : "border-rule bg-paper text-ink-2",
            )}
          >
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-full font-display text-lg font-extrabold",
                reached ? "bg-ink text-paper" : "bg-paper-2",
              )}
            >
              {level.level}
            </span>
            <span>
              <span className="block font-bold text-ink">{level.name}</span>
              <span className="font-mono text-xs">
                {level.minXp} XP{isCurrent ? " · you are here" : ""}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
