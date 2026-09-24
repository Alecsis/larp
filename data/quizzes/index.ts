/**
 * Every quiz/challenge on the site. Order here = order on /challenges.
 */
import type { Quiz } from "@/types/content";
import { fundamentalsQuiz } from "./fundamentals-quiz";
import { toolsQuiz } from "./tools-quiz";
import { ethicsQuiz } from "./ethics-quiz";
import { scenariosQuiz } from "./scenarios-quiz";
import { finalQuiz } from "./final-quiz";

export const QUIZZES: Quiz[] = [fundamentalsQuiz, toolsQuiz, ethicsQuiz, scenariosQuiz, finalQuiz];
