/**
 * Interactive labs. Each lab component lives in components/learning/demos and
 * is placed in a lesson with a { type: "demo", demo: "<id>" } block.
 */
import type { DemoId, ModuleId } from "@/types/content";

export interface DemoInfo {
  id: DemoId;
  title: string;
  /** What the lab teaches, in one line (used on dashboard/achievements). */
  teaches: string;
  moduleId: ModuleId;
  lessonId: string;
}

export const DEMOS: DemoInfo[] = [
  { id: "classifier", title: "Train a Classifier", teaches: "How labeled examples shape a model's predictions", moduleId: "ai-fundamentals", lessonId: "machine-learning" },
  { id: "training-data", title: "Data Diet", teaches: "Why training data quality and coverage matter", moduleId: "ai-fundamentals", lessonId: "training-data" },
  { id: "neuron", title: "Build a Neuron", teaches: "How weights and a threshold turn inputs into a decision", moduleId: "ai-fundamentals", lessonId: "neural-networks" },
  { id: "tokenizer", title: "Token Vision", teaches: "How a language model splits text into tokens", moduleId: "ai-fundamentals", lessonId: "generative-ai-and-llms" },
  { id: "next-word", title: "Next-Word Predictor", teaches: "How LLMs generate text one likely token at a time", moduleId: "ai-fundamentals", lessonId: "generative-ai-and-llms" },
  { id: "prompt-builder", title: "Prompt Builder", teaches: "How goal, context, format and limits improve a prompt", moduleId: "ai-tools", lessonId: "prompt-design" },
  { id: "task-breakdown", title: "Task Splitter", teaches: "Breaking a big assignment into AI-sized steps", moduleId: "ai-tools", lessonId: "breaking-down-tasks" },
  { id: "fact-check", title: "Claim Checker", teaches: "Checking each claim in an AI answer", moduleId: "ai-tools", lessonId: "verifying-ai-output" },
  { id: "hallucination", title: "Hallucination Hunt", teaches: "Confident-sounding answers can be made up", moduleId: "ai-ethics", lessonId: "hallucinations" },
  { id: "bias-screening", title: "Biased Screener", teaches: "How skewed data leads to unfair outcomes", moduleId: "ai-ethics", lessonId: "bias-and-fairness" },
  { id: "privacy-sort", title: "Share or Shield?", teaches: "Which information never belongs in a chatbot", moduleId: "ai-ethics", lessonId: "privacy-and-your-data" },
  { id: "ai-or-human", title: "Who Should Decide?", teaches: "When a human must stay in charge", moduleId: "ai-ethics", lessonId: "human-oversight" },
];

export function getDemo(id: DemoId): DemoInfo | undefined {
  return DEMOS.find((demo) => demo.id === id);
}
