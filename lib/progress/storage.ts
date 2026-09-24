/**
 * localStorage persistence.
 *
 * This file is the ONLY place that touches window.localStorage. Everything is
 * wrapped in try/catch because storage can be unavailable (private browsing,
 * blocked cookies, full quota). If that happens the site still works — progress
 * simply isn't saved between visits.
 */
import type { ProgressState } from "@/types/progress";

export const STORAGE_KEY = "tokenline:progress:v1";

export function createEmptyProgress(): ProgressState {
  return {
    version: 1,
    lessons: {},
    checks: {},
    quizzes: {},
    demos: {},
    badges: {},
    activeDays: [],
    activity: [],
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Saved data could be old, hand-edited, or corrupted. Instead of trusting it,
 * we copy over only the fields that have the right basic shape.
 */
export function sanitizeProgress(raw: unknown): ProgressState {
  const empty = createEmptyProgress();
  if (!isRecord(raw) || raw.version !== 1) return empty;

  return {
    version: 1,
    lessons: isRecord(raw.lessons) ? (raw.lessons as ProgressState["lessons"]) : empty.lessons,
    checks: isRecord(raw.checks) ? (raw.checks as ProgressState["checks"]) : empty.checks,
    quizzes: isRecord(raw.quizzes) ? (raw.quizzes as ProgressState["quizzes"]) : empty.quizzes,
    demos: isRecord(raw.demos) ? (raw.demos as ProgressState["demos"]) : empty.demos,
    badges: isRecord(raw.badges) ? (raw.badges as ProgressState["badges"]) : empty.badges,
    activeDays: Array.isArray(raw.activeDays)
      ? raw.activeDays.filter((d): d is string => typeof d === "string")
      : empty.activeDays,
    activity: Array.isArray(raw.activity)
      ? (raw.activity.filter(isRecord) as unknown as ProgressState["activity"])
      : empty.activity,
  };
}

export function loadProgress(): ProgressState {
  try {
    const text = window.localStorage.getItem(STORAGE_KEY);
    return text ? sanitizeProgress(JSON.parse(text)) : createEmptyProgress();
  } catch {
    return createEmptyProgress();
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage is unavailable or full — keep working in memory only.
  }
}

export function clearProgress(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore — nothing to clear.
  }
}
