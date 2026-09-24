"use client";

import { useMemo } from "react";
import { computeStats, type ProgressStats } from "./selectors";
import { useProgress } from "./store";

/** Calculated stats (XP, level, percentages…) that update whenever progress changes. */
export function useProgressStats(): ProgressStats {
  const state = useProgress();
  return useMemo(() => computeStats(state), [state]);
}
