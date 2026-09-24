"use client";

import Link from "next/link";
import { useProgressStats } from "@/lib/progress/hooks";
import { useHydrated } from "@/lib/progress/store";
import { cn } from "@/lib/cn";

/** Compact level + XP indicator shown in the header. Links to the dashboard. */
export function XpChip({ className }: { className?: string }) {
  const stats = useProgressStats();
  const hydrated = useHydrated();
  const { level, totalXp } = stats;
  const radius = 11;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - level.percentToNext / 100);

  return (
    <Link
      href="/dashboard"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-surface py-1 pr-3 pl-1 text-sm font-bold transition-transform hover:-translate-y-px",
        className,
      )}
      aria-label={hydrated ? `Level ${level.current.level}, ${totalXp} XP. Open your dashboard.` : "Open your dashboard"}
    >
      <span className="relative grid size-8 place-items-center">
        <svg viewBox="0 0 28 28" className="absolute inset-0 -rotate-90" aria-hidden="true">
          <circle cx="14" cy="14" r={radius} fill="none" stroke="#ece8dc" strokeWidth="3" />
          <circle
            cx="14"
            cy="14"
            r={radius}
            fill="none"
            stroke="#2b50d8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={hydrated ? offset : circumference}
            className="transition-[stroke-dashoffset] duration-700"
          />
        </svg>
        <span className="font-mono text-xs" aria-hidden="true">
          {hydrated ? level.current.level : "–"}
        </span>
      </span>
      <span aria-hidden="true" className="tabular-nums">
        {hydrated ? totalXp.toLocaleString() : "—"} <span className="text-ink-3">XP</span>
      </span>
    </Link>
  );
}
