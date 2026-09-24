/**
 * Badges ("stamps"). Each badge has a `measure` function that looks at the
 * student's progress and returns { current, target }. A badge unlocks the
 * moment current >= target — the same function also powers the progress
 * bars on the Achievements page, so the rule and the display can't disagree.
 */
import { getQuiz } from "@/lib/content";
import type { ProgressStats } from "@/lib/progress/selectors";
import type { ProgressState } from "@/types/progress";

export type AchievementIcon =
  | "footprints"
  | "flag"
  | "compass"
  | "flask"
  | "cpu"
  | "wand"
  | "scale"
  | "search-check"
  | "target"
  | "zap"
  | "layers"
  | "flame"
  | "graduation";

export type AchievementStats = Omit<ProgressStats, "totalXp" | "xpBreakdown" | "level" | "badgesUnlocked" | "totalBadges">;

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: AchievementIcon;
  /** Stamp color on the Achievements page. */
  tone: "cobalt" | "tangerine" | "emerald" | "sun" | "ink";
  xpBonus: number;
  measure: (stats: AchievementStats, state: ProgressState) => { current: number; target: number };
}

const moduleDone = (stats: AchievementStats, id: string) => {
  const mod = stats.modules.find((item) => item.module.id === id);
  return { current: mod?.completed ?? 0, target: mod?.total ?? 1 };
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-steps",
    name: "First Stop",
    description: "Complete your first lesson.",
    icon: "footprints",
    tone: "ink",
    xpBonus: 20,
    measure: (s) => ({ current: Math.min(s.lessonsCompleted, 1), target: 1 }),
  },
  {
    id: "ai-explorer",
    name: "AI Explorer",
    description: "Experiment with 4 different interactive labs.",
    icon: "compass",
    tone: "sun",
    xpBonus: 30,
    measure: (s) => ({ current: Math.min(s.demosTried, 4), target: 4 }),
  },
  {
    id: "pattern-pioneer",
    name: "Pattern Pioneer",
    description: "Finish every lesson on Line 1: AI Fundamentals.",
    icon: "cpu",
    tone: "cobalt",
    xpBonus: 50,
    measure: (s) => moduleDone(s, "ai-fundamentals"),
  },
  {
    id: "prompt-engineer",
    name: "Prompt Engineer",
    description: "Finish every lesson on Line 2: AI Tools & Techniques.",
    icon: "wand",
    tone: "tangerine",
    xpBonus: 50,
    measure: (s) => moduleDone(s, "ai-tools"),
  },
  {
    id: "ethics-advocate",
    name: "Ethics Advocate",
    description: "Finish every lesson on Line 3: Ethical & Responsible AI.",
    icon: "scale",
    tone: "emerald",
    xpBonus: 50,
    measure: (s) => moduleDone(s, "ai-ethics"),
  },
  {
    id: "fact-checker",
    name: "Fact Checker",
    description: "Complete the Verifying AI Output and Hallucinations lessons, and run the Claim Checker lab.",
    icon: "search-check",
    tone: "tangerine",
    xpBonus: 40,
    measure: (_s, state) => ({
      current:
        Number(Boolean(state.lessons["ai-tools/verifying-ai-output"])) +
        Number(Boolean(state.lessons["ai-ethics/hallucinations"])) +
        Number(Boolean(state.demos["fact-check"])),
      target: 3,
    }),
  },
  {
    id: "sharp-mind",
    name: "Sharp Mind",
    description: "Answer 10 knowledge checks correctly on the first try.",
    icon: "target",
    tone: "cobalt",
    xpBonus: 40,
    measure: (s) => ({ current: Math.min(s.checksFirstTry, 10), target: 10 }),
  },
  {
    id: "quiz-whiz",
    name: "Quiz Whiz",
    description: "Get a perfect score on any challenge.",
    icon: "zap",
    tone: "sun",
    xpBonus: 40,
    measure: (s) => ({ current: Math.min(s.perfectQuizzes, 1), target: 1 }),
  },
  {
    id: "module-master",
    name: "Module Master",
    description: "Pass all three module quizzes.",
    icon: "layers",
    tone: "ink",
    xpBonus: 75,
    measure: (s) => ({ current: s.modules.filter((m) => m.quizPassed).length, target: s.modules.length }),
  },
  {
    id: "on-a-roll",
    name: "On a Roll",
    description: "Learn on 3 days in a row.",
    icon: "flame",
    tone: "tangerine",
    xpBonus: 30,
    measure: (s) => ({ current: Math.min(s.longestStreak, 3), target: 3 }),
  },
  {
    id: "curious-mind",
    name: "Lab Regular",
    description: "Try every interactive lab on the site.",
    icon: "flask",
    tone: "emerald",
    xpBonus: 40,
    measure: (s) => ({ current: s.demosTried, target: s.totalDemos }),
  },
  {
    id: "ai-scholar",
    name: "AI Scholar",
    description: "Complete all lessons and pass the Final Challenge.",
    icon: "graduation",
    tone: "ink",
    xpBonus: 100,
    measure: (s, state) => {
      const finalRecord = state.quizzes["final-challenge"];
      const passPercent = getQuiz("final-challenge")?.passPercent ?? 70;
      const finalPassed = finalRecord ? (finalRecord.bestScore / finalRecord.total) * 100 >= passPercent : false;
      return { current: s.lessonsCompleted + (finalPassed ? 1 : 0), target: s.totalLessons + 1 };
    },
  },
];

export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((badge) => badge.id === id);
}
