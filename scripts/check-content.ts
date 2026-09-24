/**
 * Content checker — run with:  npm run check:content
 *
 * Catches mistakes that TypeScript can't: duplicate question IDs, a
 * correct answer that isn't one of the options, lessons missing knowledge
 * checks, citations pointing to sources that don't exist, and whether the
 * top level is actually reachable with the XP available.
 */
import { ACHIEVEMENTS } from "@/data/achievements";
import { DEMOS } from "@/data/demos";
import { getSource } from "@/data/references";
import { getAllLessons, getLessonChecks, getModules, getQuizzes } from "@/lib/content";
import { LEVELS, XP_RULES } from "@/lib/progress/xp";
import type { Question } from "@/types/content";

const problems: string[] = [];
const seenQuestionIds = new Set<string>();

function checkQuestion(q: Question, where: string) {
  if (seenQuestionIds.has(q.id)) problems.push(`${where}: duplicate question id "${q.id}"`);
  seenQuestionIds.add(q.id);
  const optionIds = q.options.map((o) => o.id);
  if (new Set(optionIds).size !== optionIds.length) problems.push(`${where}: duplicate option ids in "${q.id}"`);
  if (!optionIds.includes(q.correctOptionId)) problems.push(`${where}: correct answer "${q.correctOptionId}" is not an option in "${q.id}"`);
  if (q.options.length < 2) problems.push(`${where}: "${q.id}" needs at least 2 options`);
  if (!q.explanation.trim()) problems.push(`${where}: "${q.id}" has no explanation`);
}

const lessonIds = new Set<string>();
for (const lesson of getAllLessons()) {
  const where = `lesson ${lesson.moduleId}/${lesson.id}`;
  if (lessonIds.has(lesson.id)) problems.push(`${where}: duplicate lesson id`);
  lessonIds.add(lesson.id);
  const checks = getLessonChecks(lesson);
  if (checks.length < 1) problems.push(`${where}: has no knowledge checks`);
  checks.forEach((q) => checkQuestion(q, where));
  for (const id of lesson.sourceIds ?? []) {
    if (!getSource(id)) problems.push(`${where}: cites unknown source "${id}" (add it to data/references.ts)`);
  }
}

for (const quiz of getQuizzes()) quiz.questions.forEach((q) => checkQuestion(q, `quiz ${quiz.id}`));

for (const demo of DEMOS) {
  const lesson = getAllLessons().find((l) => l.id === demo.lessonId && l.moduleId === demo.moduleId);
  if (!lesson) problems.push(`demo ${demo.id}: lesson ${demo.moduleId}/${demo.lessonId} not found`);
  else if (!lesson.blocks.some((b) => b.type === "demo" && b.demo === demo.id)) problems.push(`demo ${demo.id}: not placed in its lesson`);
}

for (const mod of getModules()) {
  if (!ACHIEVEMENTS.some((a) => a.id === mod.badgeId)) problems.push(`module ${mod.id}: unknown badge "${mod.badgeId}"`);
  if (!getQuizzes().some((q) => q.id === mod.quizId)) problems.push(`module ${mod.id}: unknown quiz "${mod.quizId}"`);
}

// Is the top level reachable?
const lessons = getAllLessons();
const maxXp =
  lessons.reduce((sum, l) => sum + l.xp, 0) +
  lessons.reduce((sum, l) => sum + getLessonChecks(l).length, 0) * XP_RULES.checkFirstTry +
  getQuizzes().reduce((sum, q) => sum + q.questions.length * XP_RULES.quizCorrect + XP_RULES.quizPerfectBonus, 0) +
  DEMOS.length * XP_RULES.demoFirstTry +
  ACHIEVEMENTS.reduce((sum, a) => sum + a.xpBonus, 0);
const top = LEVELS[LEVELS.length - 1];
if (maxXp < top.minXp) problems.push(`Top level needs ${top.minXp} XP but only ${maxXp} XP exists`);

console.log(`Lessons: ${lessons.length} · Questions: ${seenQuestionIds.size} · Labs: ${DEMOS.length} · Badges: ${ACHIEVEMENTS.length}`);
console.log(`Max possible XP: ${maxXp} (top level "${top.name}" at ${top.minXp})`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("All content checks passed.");
