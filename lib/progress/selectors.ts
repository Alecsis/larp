/**
 * Selectors turn the raw saved records into the numbers students see:
 * total XP, level, percentages, streaks, quiz averages and the next lesson.
 *
 * These are plain functions with no React inside, so they are easy to test
 * and reason about: same saved state in → same stats out.
 */
import { ACHIEVEMENTS } from "@/data/achievements";
import { DEMOS } from "@/data/demos";
import { getAllLessons, getLessonChecks, getModules, getQuiz, lessonKey } from "@/lib/content";
import type { Lesson, Module } from "@/types/content";
import type { ProgressState, QuizRecord } from "@/types/progress";
import { getLevelInfo, XP_RULES, type LevelInfo } from "./xp";

export interface ModuleProgress {
  module: Module;
  completed: number;
  total: number;
  percent: number;
  isComplete: boolean;
  quiz: QuizRecord | null;
  /** Best quiz score as a percent, or null if never taken. */
  quizPercent: number | null;
  quizPassed: boolean;
}

export interface ProgressStats {
  totalXp: number;
  xpBreakdown: { lessons: number; checks: number; quizzes: number; demos: number; badges: number };
  level: LevelInfo;
  lessonsCompleted: number;
  totalLessons: number;
  overallPercent: number;
  modules: ModuleProgress[];
  checksAnswered: number;
  checksFirstTry: number;
  totalChecks: number;
  quizzesTaken: number;
  quizzesPassed: number;
  perfectQuizzes: number;
  /** Average of best quiz percentages, or null if no quiz taken yet. */
  quizAverage: number | null;
  demosTried: number;
  totalDemos: number;
  currentStreak: number;
  longestStreak: number;
  activeDayCount: number;
  badgesUnlocked: number;
  totalBadges: number;
  /** First unfinished lesson in route order, or null when everything is done. */
  nextLesson: Lesson | null;
}

const percent = (part: number, whole: number) => (whole === 0 ? 0 : Math.round((part / whole) * 100));

export function isQuizPassed(record: QuizRecord | undefined, passPercent: number): boolean {
  if (!record || record.total === 0) return false;
  return (record.bestScore / record.total) * 100 >= passPercent;
}

/** "Today" as YYYY-MM-DD in the student's own time zone. */
export function localDay(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function dayNumber(day: string): number {
  const [y, m, d] = day.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86_400_000);
}

/**
 * Streaks: the current streak counts consecutive active days ending today
 * (or yesterday, so the streak isn't "lost" before the student logs in today).
 */
export function computeStreaks(activeDays: string[], today = localDay()): { current: number; longest: number } {
  const days = [...new Set(activeDays)].map(dayNumber).sort((a, b) => a - b);
  if (days.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    run = days[i] === days[i - 1] + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  }

  const todayNum = dayNumber(today);
  const last = days[days.length - 1];
  let current = 0;
  if (last === todayNum || last === todayNum - 1) {
    current = 1;
    for (let i = days.length - 1; i > 0 && days[i] === days[i - 1] + 1; i--) current++;
  }
  return { current, longest };
}

/** Everything except badge-related numbers (badges are judged using these). */
export function computeActivityStats(state: ProgressState): Omit<ProgressStats, "totalXp" | "xpBreakdown" | "level" | "badgesUnlocked" | "totalBadges"> {
  const allLessons = getAllLessons();
  const lessonsCompleted = allLessons.filter((lesson) => state.lessons[lessonKey(lesson)]).length;

  const modules: ModuleProgress[] = getModules().map((module) => {
    const completed = module.lessons.filter((lesson) => state.lessons[lessonKey(lesson)]).length;
    const quizRecord = state.quizzes[module.quizId] ?? null;
    const quizDef = getQuiz(module.quizId);
    return {
      module,
      completed,
      total: module.lessons.length,
      percent: percent(completed, module.lessons.length),
      isComplete: completed === module.lessons.length,
      quiz: quizRecord,
      quizPercent: quizRecord ? percent(quizRecord.bestScore, quizRecord.total) : null,
      quizPassed: isQuizPassed(quizRecord ?? undefined, quizDef?.passPercent ?? 70),
    };
  });

  const checks = Object.values(state.checks);
  const quizEntries = Object.entries(state.quizzes);
  const quizPercents = quizEntries.map(([, record]) => percent(record.bestScore, record.total));
  const streaks = computeStreaks(state.activeDays);

  return {
    lessonsCompleted,
    totalLessons: allLessons.length,
    overallPercent: percent(lessonsCompleted, allLessons.length),
    modules,
    checksAnswered: checks.length,
    checksFirstTry: checks.filter((check) => check.firstTryCorrect).length,
    totalChecks: allLessons.reduce((sum, lesson) => sum + getLessonChecks(lesson).length, 0),
    quizzesTaken: quizEntries.length,
    quizzesPassed: quizEntries.filter(([id, record]) => isQuizPassed(record, getQuiz(id)?.passPercent ?? 70)).length,
    perfectQuizzes: quizEntries.filter(([, record]) => record.total > 0 && record.bestScore === record.total).length,
    quizAverage: quizPercents.length ? Math.round(quizPercents.reduce((a, b) => a + b, 0) / quizPercents.length) : null,
    demosTried: DEMOS.filter((demo) => state.demos[demo.id]).length,
    totalDemos: DEMOS.length,
    currentStreak: streaks.current,
    longestStreak: streaks.longest,
    activeDayCount: new Set(state.activeDays).size,
    nextLesson: allLessons.find((lesson) => !state.lessons[lessonKey(lesson)]) ?? null,
  };
}

/** Total XP is re-added from the records every time — it is never stored. */
export function computeXp(state: ProgressState): ProgressStats["xpBreakdown"] & { total: number } {
  const lessons = Object.values(state.lessons).reduce((sum, record) => sum + record.xp, 0);
  const checks = Object.values(state.checks).filter((check) => check.firstTryCorrect).length * XP_RULES.checkFirstTry;
  const quizzes = Object.values(state.quizzes).reduce((sum, record) => sum + record.xp, 0);
  const demos = DEMOS.filter((demo) => state.demos[demo.id]).length * XP_RULES.demoFirstTry;
  const badges = ACHIEVEMENTS.filter((badge) => state.badges[badge.id]).reduce((sum, badge) => sum + badge.xpBonus, 0);
  return { lessons, checks, quizzes, demos, badges, total: lessons + checks + quizzes + demos + badges };
}

export function computeStats(state: ProgressState): ProgressStats {
  const activity = computeActivityStats(state);
  const xp = computeXp(state);
  const { total, ...xpBreakdown } = xp;
  return {
    ...activity,
    totalXp: total,
    xpBreakdown,
    level: getLevelInfo(total),
    badgesUnlocked: ACHIEVEMENTS.filter((badge) => state.badges[badge.id]).length,
    totalBadges: ACHIEVEMENTS.length,
  };
}

/** The last `count` calendar days (oldest first) with whether each was active. */
export function getRecentDays(activeDays: string[], count = 14): { day: string; active: boolean }[] {
  const active = new Set(activeDays);
  const result: { day: string; active: boolean }[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const day = localDay(date);
    result.push({ day, active: active.has(day) });
  }
  return result;
}
