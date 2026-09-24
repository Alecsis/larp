"use client";

/**
 * The progress store.
 *
 * WHY THIS EXISTS: Next.js renders pages on the server first, where
 * localStorage does not exist. If the server HTML said "0 XP" but the browser
 * immediately rendered "240 XP", React would report a *hydration mismatch*.
 *
 * React's built-in `useSyncExternalStore` solves this: during hydration it
 * uses `getServerSnapshot()` (an empty progress object, same as the server),
 * then re-renders with the real saved data right after. No mismatch, no flash
 * of errors, and no extra libraries.
 */
import { useSyncExternalStore } from "react";
import type { ProgressState } from "@/types/progress";
import { STORAGE_KEY, createEmptyProgress, loadProgress, saveProgress } from "./storage";

const SERVER_SNAPSHOT: ProgressState = createEmptyProgress();

let current: ProgressState | null = null; // lazily loaded on first client read
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getProgress(): ProgressState {
  if (current === null) current = loadProgress();
  return current;
}

/** Replace the whole state, save it, and tell every subscribed component. */
export function setProgress(next: ProgressState): void {
  current = next;
  saveProgress(next);
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  // Keep multiple open tabs in sync: another tab saved → reload our copy.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      current = loadProgress();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Read the student's saved progress inside any client component. */
export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getProgress, () => SERVER_SNAPSHOT);
}

const noopSubscribe = () => () => {};

/**
 * `true` once the component is running in the browser with real saved data.
 * Use it to show a neutral placeholder instead of "0%" for a split second.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
