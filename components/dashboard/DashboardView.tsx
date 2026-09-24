"use client";

import { Rocket } from "lucide-react";
import { ContinueCard } from "@/components/learning/ProgressBits";
import { ButtonLink } from "@/components/ui/Button";
import { useProgressStats } from "@/lib/progress/hooks";
import { useHydrated, useProgress } from "@/lib/progress/store";
import { AchievementsWidget, ActivityWidget, ModuleProgressWidget, QuizPerformanceWidget, XpBreakdownWidget } from "./DetailWidgets";
import { ProgressControls } from "./ProgressControls";
import { CompletionWidget, LevelWidget, StreakWidget } from "./SummaryWidgets";

/**
 * The dashboard is 100% based on data saved in this browser, so it renders
 * a light skeleton until the saved progress has been read (avoids showing
 * misleading zeros and avoids hydration mismatches).
 */
export function DashboardView() {
  const hydrated = useHydrated();
  const state = useProgress();
  const stats = useProgressStats();

  if (!hydrated) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="Loading your progress">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl border-2 border-rule bg-paper-2" />
        ))}
      </div>
    );
  }

  const isNew = stats.totalXp === 0 && state.activity.length === 0;

  return (
    <div className="space-y-4">
      {isNew && (
        <div className="flex flex-col gap-4 rounded-2xl border-2 border-ink bg-sun p-5 sm:flex-row sm:items-center">
          <Rocket aria-hidden className="size-10 shrink-0" />
          <div className="flex-1">
            <p className="font-display text-xl font-bold">Your dashboard is waiting for its first stop.</p>
            <p className="text-ink-2">Finish a lesson, try a lab or take a quiz — every widget below updates as you learn.</p>
          </div>
          <ButtonLink href="/learn/ai-fundamentals/what-is-ai">Start Lesson 1</ButtonLink>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <LevelWidget stats={stats} />
        <CompletionWidget stats={stats} />
        <StreakWidget stats={stats} activeDays={state.activeDays} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <ModuleProgressWidget stats={stats} />
        <div className="flex flex-col gap-4">
          <ContinueCard />
          <XpBreakdownWidget stats={stats} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <QuizPerformanceWidget state={state} stats={stats} />
        <AchievementsWidget state={state} />
        <ActivityWidget state={state} />
      </div>

      <ProgressControls />
    </div>
  );
}
