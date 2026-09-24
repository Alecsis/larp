"use client";

import { Award, Sparkles, TrendingUp, X } from "lucide-react";
import { useEffect } from "react";
import { dismissNotice, useNotices } from "@/lib/progress/notices";
import type { RewardNotice } from "@/types/progress";
import { cn } from "@/lib/cn";

const ICONS = { xp: Sparkles, badge: Award, level: TrendingUp } as const;

/**
 * Reward pop-ups in the corner of the screen. They live inside an
 * aria-live region, so screen readers announce "+50 XP" etc. politely.
 */
export function RewardToasts() {
  const notices = useNotices();
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-3 bottom-3 z-50 flex flex-col items-end gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-80"
    >
      {notices.map((notice) => (
        <Toast key={notice.id} notice={notice} />
      ))}
    </div>
  );
}

function Toast({ notice }: { notice: RewardNotice }) {
  const Icon = ICONS[notice.kind];

  // Auto-dismiss after a few seconds (badges stay a little longer).
  useEffect(() => {
    const timer = window.setTimeout(() => dismissNotice(notice.id), notice.kind === "xp" ? 3500 : 6000);
    return () => window.clearTimeout(timer);
  }, [notice.id, notice.kind]);

  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto flex w-full animate-rise items-start gap-3 rounded-xl border-2 border-ink p-3 shadow-pop",
        notice.kind === "badge" ? "bg-sun" : notice.kind === "level" ? "bg-cobalt-soft" : "bg-surface",
      )}
    >
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-surface", notice.kind === "badge" && "animate-pop")}>
        <Icon aria-hidden className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display font-bold leading-tight">{notice.title}</p>
        {notice.detail && <p className="mt-0.5 text-sm text-ink-2">{notice.detail}</p>}
      </div>
      <button
        type="button"
        onClick={() => dismissNotice(notice.id)}
        className="grid size-8 shrink-0 place-items-center rounded-md hover:bg-ink/10"
      >
        <X aria-hidden className="size-4" />
        <span className="sr-only">Dismiss notification</span>
      </button>
    </div>
  );
}
