"use client";

import { getAchievement } from "@/data/achievements";
import { useHydrated, useProgress } from "@/lib/progress/store";
import { BadgeStamp } from "./BadgeStamp";

/** Shows one badge with its locked/unlocked state (used on module pages). */
export function BadgeStatusCard({ badgeId, heading = "Line badge" }: { badgeId: string; heading?: string }) {
  const progress = useProgress();
  const hydrated = useHydrated();
  const badge = getAchievement(badgeId);
  if (!badge) return null;
  const unlocked = hydrated && Boolean(progress.badges[badge.id]);

  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-ink bg-surface p-4">
      <BadgeStamp badge={badge} unlocked={unlocked} />
      <div>
        <p className="eyebrow text-ink-3">{heading}</p>
        <p className="font-display text-lg font-bold">{badge.name}</p>
        <p className="text-sm text-ink-2">
          {unlocked ? "Unlocked — nice work!" : badge.description} <span className="font-bold">+{badge.xpBonus} XP</span>
        </p>
      </div>
    </div>
  );
}
