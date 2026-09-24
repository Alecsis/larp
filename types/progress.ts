/**
 * Progress types — everything we save in the browser's localStorage.
 *
 * Important design rule: we store *what the student did* (completed lessons,
 * answers, quiz scores). Totals such as XP, level and percentages are always
 * *calculated* from these records (see lib/progress/selectors.ts), so they
 * can never drift out of sync.
 */

export interface LessonRecord {
  completedAt: string; // ISO date string
  xp: number;
}

export interface CheckRecord {
  /** Was the first attempt correct? Only first attempts earn XP. */
  firstTryCorrect: boolean;
  attempts: number;
  answeredAt: string;
}

export interface QuizRecord {
  bestScore: number; // number of correct answers on the best attempt
  lastScore: number;
  total: number; // number of questions
  attempts: number;
  lastTakenAt: string;
  /** XP from this quiz = best score XP (+ perfect bonus). Retakes can only raise it. */
  xp: number;
}

export interface BadgeRecord {
  unlockedAt: string;
}

export type ActivityType = "lesson" | "check" | "quiz" | "badge" | "demo";

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  label: string;
  xp: number;
  at: string;
  /** Optional link back to where the activity happened. */
  href?: string;
}

export interface ProgressState {
  /** Bump this number if the saved shape ever changes. */
  version: 1;
  /** Keyed by "moduleId/lessonId". */
  lessons: Record<string, LessonRecord>;
  /** Keyed by question id. */
  checks: Record<string, CheckRecord>;
  /** Keyed by quiz id. */
  quizzes: Record<string, QuizRecord>;
  /** Keyed by demo id; value = first time it was tried (ISO). */
  demos: Record<string, string>;
  /** Keyed by badge id. */
  badges: Record<string, BadgeRecord>;
  /** Local calendar days (YYYY-MM-DD) with any learning activity. */
  activeDays: string[];
  /** Most recent first, capped in length. */
  activity: ActivityEvent[];
}

/** A toast message shown after a student earns something. */
export interface RewardNotice {
  id: string;
  kind: "xp" | "badge" | "level";
  title: string;
  detail?: string;
}
