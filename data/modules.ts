/**
 * The three learning modules ("lines" on the route map).
 * Lesson content lives in data/lessons/*.ts — one file per module.
 */
import type { Module } from "@/types/content";
import { aiFundamentalsLessons } from "./lessons/ai-fundamentals";
import { aiToolsLessons } from "./lessons/ai-tools";
import { aiEthicsLessons } from "./lessons/ai-ethics";

export const MODULES: Module[] = [
  {
    id: "ai-fundamentals",
    lineLabel: "Line 1",
    title: "AI Fundamentals",
    tagline: "How machines learn from data",
    description:
      "Find out what AI actually is, how machine learning turns examples into predictions, and why large language models sound so fluent — and still make mistakes.",
    color: "cobalt",
    badgeId: "pattern-pioneer",
    quizId: "fundamentals-quiz",
    lessons: aiFundamentalsLessons,
  },
  {
    id: "ai-tools",
    lineLabel: "Line 2",
    title: "AI Tools & Techniques",
    tagline: "Use AI assistants with skill",
    description:
      "Learn how AI assistants handle your requests, write prompts that get useful results, and use AI to study, brainstorm, research and code — then check the output.",
    color: "tangerine",
    badgeId: "prompt-engineer",
    quizId: "tools-quiz",
    lessons: aiToolsLessons,
  },
  {
    id: "ai-ethics",
    lineLabel: "Line 3",
    title: "Ethical & Responsible AI",
    tagline: "Use AI with integrity",
    description:
      "Spot hallucinations and bias, protect your privacy, cite AI honestly, recognize deepfakes, and decide when a human — not a model — should make the call.",
    color: "emerald",
    badgeId: "ethics-advocate",
    quizId: "ethics-quiz",
    lessons: aiEthicsLessons,
  },
];
