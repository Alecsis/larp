"use client";

/**
 * Actions — the ONLY functions that change a student's progress.
 *
 * Every action follows the same 4 steps:
 *   1. copy the current state and record what the student did
 *   2. log it in the activity feed and mark today as an active day
 *   3. check whether any new badges are now unlocked
 *   4. save + show reward pop-ups (XP, badge, level-up)
 */
import { ACHIEVEMENTS } from "@/data/achievements";
import { getDemo } from "@/data/demos";
import { challengeHref, getModules, getQuiz, lessonHref, lessonKey } from "@/lib/content";
import type { DemoId, Lesson, Question, Quiz } from "@/types/content";
import type { ActivityEvent, ProgressState } from "@/types/progress";
import { pushNotice } from "./notices";
import { computeActivityStats, computeXp, localDay } from "./selectors";
import { clearProgress, createEmptyProgress } from "./storage";
import { getProgress, setProgress } from "./store";
import { getLevelInfo, XP_RULES } from "./xp";

const MAX_ACTIVITY = 30;

function addActivity(state: ProgressState, event: Omit<ActivityEvent, "id" | "at">, at = new Date()): ProgressState {
  const entry: ActivityEvent = { ...event, id: `${at.getTime()}-${state.activity.length}`, at: at.toISOString() };
  const day = localDay(at);
  return {
    ...state,
    activity: [entry, ...state.activity].slice(0, MAX_ACTIVITY),
    activeDays: state.activeDays.includes(day) ? state.activeDays : [...state.activeDays, day],
  };
}

/** Unlock any badge whose rule is now satisfied. Returns the new state and the new badges. */
function unlockBadges(state: ProgressState, at = new Date()) {
  const stats = computeActivityStats(state);
  const newlyUnlocked = ACHIEVEMENTS.filter((badge) => {
    if (state.badges[badge.id]) return false;
    const { current, target } = badge.measure(stats, state);
    return current >= target;
  });

  let next = state;
  for (const badge of newlyUnlocked) {
    next = { ...next, badges: { ...next.badges, [badge.id]: { unlockedAt: at.toISOString() } } };
    next = addActivity(next, { type: "badge", label: `Unlocked the ${badge.name} badge`, xp: badge.xpBonus, href: "/achievements" }, at);
  }
  return { state: next, newlyUnlocked };
}

/** Save the change and announce rewards. `xpMessage` is the main pop-up text. */
function commit(before: ProgressState, after: ProgressState, xpMessage?: { title: string; detail?: string }) {
  const { state: finalState, newlyUnlocked } = unlockBadges(after);
  setProgress(finalState);

  if (xpMessage) pushNotice({ kind: "xp", ...xpMessage });
  for (const badge of newlyUnlocked) {
    pushNotice({ kind: "badge", title: `Badge unlocked: ${badge.name}`, detail: `+${badge.xpBonus} XP bonus` });
  }

  const levelBefore = getLevelInfo(computeXp(before).total).current;
  const levelAfter = getLevelInfo(computeXp(finalState).total).current;
  if (levelAfter.level > levelBefore.level) {
    pushNotice({ kind: "level", title: `Level ${levelAfter.level}: ${levelAfter.name}`, detail: "You leveled up!" });
  }
}

/* ------------------------------------------------------------------ */

export function completeLesson(lesson: Pick<Lesson, "id" | "moduleId" | "title" | "xp">): void {
  const before = getProgress();
  const key = lessonKey(lesson);
  if (before.lessons[key]) return; // already complete — XP is only awarded once

  let next: ProgressState = {
    ...before,
    lessons: { ...before.lessons, [key]: { completedAt: new Date().toISOString(), xp: lesson.xp } },
  };
  next = addActivity(next, { type: "lesson", label: `Completed "${lesson.title}"`, xp: lesson.xp, href: lessonHref(lesson) });
  commit(before, next, { title: `+${lesson.xp} XP`, detail: `Lesson complete: ${lesson.title}` });
}

/**
 * Record a knowledge-check answer. Only the FIRST attempt can earn XP, so
 * guessing until correct doesn't pay — but students can always retry to learn.
 */
export function answerCheck(
  question: Question,
  selectedOptionId: string,
  lesson?: Pick<Lesson, "id" | "moduleId" | "title">,
): boolean {
  const correct = selectedOptionId === question.correctOptionId;
  const before = getProgress();
  const existing = before.checks[question.id];
  const now = new Date().toISOString();

  let next: ProgressState = {
    ...before,
    checks: {
      ...before.checks,
      [question.id]: existing
        ? { ...existing, attempts: existing.attempts + 1, answeredAt: now }
        : { firstTryCorrect: correct, attempts: 1, answeredAt: now },
    },
  };

  if (!existing && correct) {
    next = addActivity(next, {
      type: "check",
      label: lesson ? `Nailed a knowledge check in "${lesson.title}"` : "Nailed a knowledge check",
      xp: XP_RULES.checkFirstTry,
      href: lesson ? lessonHref(lesson) : undefined,
    });
    commit(before, next, { title: `+${XP_RULES.checkFirstTry} XP`, detail: "Correct on the first try" });
  } else {
    commit(before, next);
  }
  return correct;
}

/** Save a finished quiz attempt. XP only increases if this beats the best score. */
export function recordQuizResult(quiz: Quiz, correctCount: number): { xpGained: number; isNewBest: boolean } {
  const before = getProgress();
  const total = quiz.questions.length;
  const existing = before.quizzes[quiz.id];
  const perfect = correctCount === total;
  const attemptXp = correctCount * XP_RULES.quizCorrect + (perfect ? XP_RULES.quizPerfectBonus : 0);
  const bestXp = Math.max(existing?.xp ?? 0, attemptXp);
  const xpGained = bestXp - (existing?.xp ?? 0);
  const isNewBest = !existing || correctCount > existing.bestScore;

  let next: ProgressState = {
    ...before,
    quizzes: {
      ...before.quizzes,
      [quiz.id]: {
        bestScore: Math.max(existing?.bestScore ?? 0, correctCount),
        lastScore: correctCount,
        total,
        attempts: (existing?.attempts ?? 0) + 1,
        lastTakenAt: new Date().toISOString(),
        xp: bestXp,
      },
    },
  };
  next = addActivity(next, {
    type: "quiz",
    label: `Scored ${correctCount}/${total} on "${quiz.title}"`,
    xp: xpGained,
    href: challengeHref(quiz.id),
  });
  commit(before, next, xpGained > 0 ? { title: `+${xpGained} XP`, detail: isNewBest ? "New best score!" : quiz.title } : undefined);
  return { xpGained, isNewBest };
}

/** Called the first time a student interacts with an interactive lab. */
export function recordDemoTry(demoId: DemoId): void {
  const before = getProgress();
  if (before.demos[demoId]) return;
  const demo = getDemo(demoId);
  let next: ProgressState = { ...before, demos: { ...before.demos, [demoId]: new Date().toISOString() } };
  next = addActivity(next, {
    type: "demo",
    label: `Experimented with the ${demo?.title ?? "interactive"} lab`,
    xp: XP_RULES.demoFirstTry,
    href: demo ? `/learn/${demo.moduleId}/${demo.lessonId}` : undefined,
  });
  commit(before, next, { title: `+${XP_RULES.demoFirstTry} XP`, detail: `Lab explored: ${demo?.title ?? demoId}` });
}

/** Wipe everything (used by the Reset Progress button). */
export function resetAllProgress(): void {
  clearProgress();
  setProgress(createEmptyProgress());
  pushNotice({ kind: "xp", title: "Progress reset", detail: "You're back at the start of the line." });
}

/**
 * FOR JUDGES / DEMOS: fill in a realistic "mid-journey" student so the
 * dashboard and achievements can be shown without completing every lesson.
 */
export function loadSampleProgress(): void {
  const now = Date.now();
  const daysAgo = (n: number, hour = 16) => {
    const d = new Date(now - n * 86_400_000);
    d.setHours(hour, 15, 0, 0);
    return d;
  };

  let state = createEmptyProgress();
  const [fundamentals, tools] = getModules();
  const plan: { lesson: Lesson; day: number }[] = [
    ...fundamentals.lessons.map((lesson, i) => ({ lesson, day: 4 - Math.floor(i / 2) })),
    ...tools.lessons.slice(0, 3).map((lesson) => ({ lesson, day: 0 })),
  ];

  plan.forEach(({ lesson, day }, i) => {
    const at = daysAgo(day, 15 + (i % 4));
    state = { ...state, lessons: { ...state.lessons, [lessonKey(lesson)]: { completedAt: at.toISOString(), xp: lesson.xp } } };
    lesson.blocks.forEach((block, j) => {
      if (block.type !== "check") return;
      const firstTryCorrect = (i + j) % 4 !== 0; // mostly correct, a few misses
      state = { ...state, checks: { ...state.checks, [block.question.id]: { firstTryCorrect, attempts: firstTryCorrect ? 1 : 2, answeredAt: at.toISOString() } } };
    });
    state = addActivity(state, { type: "lesson", label: `Completed "${lesson.title}"`, xp: lesson.xp, href: lessonHref(lesson) }, at);
  });

  (["tokenizer", "next-word", "classifier", "neuron", "prompt-builder"] as DemoId[]).forEach((id, i) => {
    const at = daysAgo(3 - Math.min(i, 3));
    state = { ...state, demos: { ...state.demos, [id]: at.toISOString() } };
  });

  const quiz = getQuiz(fundamentals.quizId);
  if (quiz) {
    const score = Math.max(0, quiz.questions.length - 1);
    const at = daysAgo(1, 18);
    state = {
      ...state,
      quizzes: {
        ...state.quizzes,
        [quiz.id]: { bestScore: score, lastScore: score, total: quiz.questions.length, attempts: 2, lastTakenAt: at.toISOString(), xp: score * XP_RULES.quizCorrect },
      },
    };
    state = addActivity(state, { type: "quiz", label: `Scored ${score}/${quiz.questions.length} on "${quiz.title}"`, xp: score * XP_RULES.quizCorrect, href: challengeHref(quiz.id) }, at);
  }

  // Sort activity newest-first, then award whatever badges this state earns.
  state = { ...state, activity: [...state.activity].sort((a, b) => b.at.localeCompare(a.at)).slice(0, MAX_ACTIVITY) };
  const { state: withBadges } = unlockBadges(state, daysAgo(0, 12));
  setProgress({ ...withBadges, activity: [...withBadges.activity].sort((a, b) => b.at.localeCompare(a.at)) });
  pushNotice({ kind: "xp", title: "Sample progress loaded", detail: "Line 1 complete, Line 2 in progress — explore the dashboard!" });
}
