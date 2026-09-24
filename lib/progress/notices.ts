"use client";

/**
 * A tiny queue of reward pop-ups ("+50 XP", "Badge unlocked!").
 * Works the same way as the progress store, but is NOT saved — notices are
 * only for the current visit.
 */
import { useSyncExternalStore } from "react";
import type { RewardNotice } from "@/types/progress";

const EMPTY: RewardNotice[] = [];
let notices: RewardNotice[] = EMPTY;
const listeners = new Set<() => void>();
let counter = 0;

function emit() {
  listeners.forEach((listener) => listener());
}

export function pushNotice(notice: Omit<RewardNotice, "id">): void {
  counter += 1;
  // Keep at most 4 on screen so rapid rewards never cover the page.
  notices = [...notices, { ...notice, id: `notice-${counter}` }].slice(-4);
  emit();
}

export function dismissNotice(id: string): void {
  notices = notices.filter((notice) => notice.id !== id);
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useNotices(): RewardNotice[] {
  return useSyncExternalStore(
    subscribe,
    () => notices,
    () => EMPTY,
  );
}
