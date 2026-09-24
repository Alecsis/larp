/**
 * Helpers for looking up modules, lessons and quizzes.
 * Components call these instead of digging through the data arrays directly.
 */
import { MODULES } from "@/data/modules";
import { QUIZZES } from "@/data/quizzes";
import type { Lesson, Module, ModuleId, Question, Quiz } from "@/types/content";

export function getModules(): Module[] {
  return MODULES;
}

export function getModule(id: string): Module | undefined {
  return MODULES.find((module) => module.id === id);
}

export function getLesson(moduleId: string, lessonId: string): Lesson | undefined {
  return getModule(moduleId)?.lessons.find((lesson) => lesson.id === lessonId);
}

/** Every lesson in route order (Line 1 → Line 2 → Line 3). */
export function getAllLessons(): Lesson[] {
  return MODULES.flatMap((module) => module.lessons);
}

/** The key used to store a lesson's completion: "moduleId/lessonId". */
export function lessonKey(lesson: Pick<Lesson, "moduleId" | "id">): string {
  return `${lesson.moduleId}/${lesson.id}`;
}

export function lessonHref(lesson: Pick<Lesson, "moduleId" | "id">): string {
  return `/learn/${lesson.moduleId}/${lesson.id}`;
}

export function moduleHref(moduleId: ModuleId): string {
  return `/learn/${moduleId}`;
}

/** Previous/next lesson inside the same module (null at either end). */
export function getAdjacentLessons(lesson: Lesson): { previous: Lesson | null; next: Lesson | null } {
  const lessons = getModule(lesson.moduleId)?.lessons ?? [];
  const index = lessons.findIndex((item) => item.id === lesson.id);
  return {
    previous: index > 0 ? lessons[index - 1] : null,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}

/** The knowledge-check questions embedded in a lesson. */
export function getLessonChecks(lesson: Lesson): Question[] {
  return lesson.blocks.flatMap((block) => (block.type === "check" ? [block.question] : []));
}

export function getQuizzes(): Quiz[] {
  return QUIZZES;
}

export function getQuiz(id: string): Quiz | undefined {
  return QUIZZES.find((quiz) => quiz.id === id);
}

export function challengeHref(quizId: string): string {
  return `/challenges/${quizId}`;
}

/** Every term definition from every lesson — powers the glossary. */
export function getGlossary(): { term: string; definition: string; lesson: Lesson }[] {
  const seen = new Set<string>();
  const entries: { term: string; definition: string; lesson: Lesson }[] = [];
  for (const lesson of getAllLessons()) {
    for (const block of lesson.blocks) {
      if (block.type !== "terms") continue;
      for (const item of block.terms) {
        const id = item.term.toLowerCase();
        if (seen.has(id)) continue;
        seen.add(id);
        entries.push({ ...item, lesson });
      }
    }
  }
  return entries.sort((a, b) => a.term.localeCompare(b.term));
}
