/**
 * XP rules and levels.
 *
 * Every way to earn XP is listed here so the whole reward economy can be
 * explained (and tuned) in one place.
 */

export const XP_RULES = {
  /** Lessons define their own XP in the data files; this is the default. */
  lessonDefault: 50,
  /** A knowledge check answered correctly on the FIRST try. */
  checkFirstTry: 10,
  /** Each correct answer on a quiz's best attempt. */
  quizCorrect: 10,
  /** Extra reward for a perfect quiz score. */
  quizPerfectBonus: 25,
  /** First time a student tries an interactive lab. */
  demoFirstTry: 5,
} as const;

export interface Level {
  level: number;
  name: string;
  minXp: number;
}

/** Level names follow the journey from curious beginner to AI scholar. */
export const LEVELS: Level[] = [
  { level: 1, name: "Curious Newcomer", minXp: 0 },
  { level: 2, name: "Pattern Spotter", minXp: 100 },
  { level: 3, name: "Data Detective", minXp: 250 },
  { level: 4, name: "Prompt Apprentice", minXp: 450 },
  { level: 5, name: "Model Mechanic", minXp: 700 },
  { level: 6, name: "Critical Thinker", minXp: 1000 },
  { level: 7, name: "AI Navigator", minXp: 1400 },
  { level: 8, name: "AI Scholar", minXp: 1900 },
];

export interface LevelInfo {
  current: Level;
  next: Level | null;
  /** XP earned inside the current level. */
  xpIntoLevel: number;
  /** XP needed to go from current level to the next one. */
  xpForNext: number;
  /** 0–100 progress toward the next level (100 at max level). */
  percentToNext: number;
}

export function getLevelInfo(totalXp: number): LevelInfo {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (totalXp >= LEVELS[i].minXp) index = i;
  }
  const current = LEVELS[index];
  const next = LEVELS[index + 1] ?? null;
  const xpIntoLevel = totalXp - current.minXp;
  const xpForNext = next ? next.minXp - current.minXp : 0;
  const percentToNext = next ? Math.min(100, Math.round((xpIntoLevel / xpForNext) * 100)) : 100;
  return { current, next, xpIntoLevel, xpForNext, percentToNext };
}
