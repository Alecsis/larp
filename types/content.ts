/**
 * Content types — the "shape" of every module, lesson, question and quiz.
 *
 * All learning content lives in /data as plain TypeScript objects that follow
 * these types. Pages and components only *render* this data, so the team can
 * edit lesson text without touching any UI code.
 */

export type ModuleId = "ai-fundamentals" | "ai-tools" | "ai-ethics";

/** Each module is drawn as a colored "line" on our transit-style route map. */
export type LineColor = "cobalt" | "tangerine" | "emerald";

export interface Module {
  id: ModuleId;
  /** Short line name shown on route maps, e.g. "Line 1". */
  lineLabel: string;
  title: string;
  tagline: string;
  description: string;
  color: LineColor;
  /** The badge awarded when every lesson in this module is complete. */
  badgeId: string;
  /** The quiz that goes with this module (see data/quizzes.ts). */
  quizId: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: ModuleId;
  title: string;
  /** One-sentence summary used on cards and in metadata. */
  summary: string;
  /** Estimated time to complete, in minutes. */
  minutes: number;
  /** XP awarded when the lesson is marked complete. */
  xp: number;
  /** "By the end of this lesson you can…" statements. */
  objectives: string[];
  blocks: LessonBlock[];
  /** IDs from data/references.ts that support facts in this lesson. */
  sourceIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Lesson blocks: a lesson is an ordered list of these building blocks */
/* ------------------------------------------------------------------ */

export type DemoId =
  | "tokenizer"
  | "next-word"
  | "classifier"
  | "neuron"
  | "training-data"
  | "prompt-builder"
  | "task-breakdown"
  | "fact-check"
  | "hallucination"
  | "bias-screening"
  | "privacy-sort"
  | "ai-or-human";

export type DiagramId =
  | "ai-nesting"
  | "rules-vs-learning"
  | "neural-network"
  | "assistant-pipeline"
  | "verify-loop"
  | "use-spectrum";

export type CalloutTone = "tip" | "warning" | "think";

export interface TextBlock {
  type: "text";
  heading?: string;
  paragraphs: string[];
}

export interface KeyPointsBlock {
  type: "keyPoints";
  heading: string;
  points: string[];
}

export interface TermsBlock {
  type: "terms";
  terms: { term: string; definition: string }[];
}

export interface CalloutBlock {
  type: "callout";
  tone: CalloutTone;
  title: string;
  body: string;
}

export interface MythFactBlock {
  type: "mythFact";
  items: { myth: string; fact: string }[];
}

export interface LearnMoreBlock {
  type: "learnMore";
  title: string;
  paragraphs: string[];
}

/** A short example conversation or before/after sample. */
export interface ExampleBlock {
  type: "example";
  title: string;
  prompt: string;
  response: string;
  note: string;
}

export interface CompareBlock {
  type: "compare";
  heading: string;
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
}

export interface StepsBlock {
  type: "steps";
  heading: string;
  steps: { title: string; body: string }[];
}

export interface DiagramBlock {
  type: "diagram";
  diagram: DiagramId;
  caption: string;
}

export interface DemoBlock {
  type: "demo";
  demo: DemoId;
}

/** A knowledge check is a single question embedded inside a lesson. */
export interface CheckBlock {
  type: "check";
  question: Question;
}

export type LessonBlock =
  | TextBlock
  | KeyPointsBlock
  | TermsBlock
  | CalloutBlock
  | MythFactBlock
  | LearnMoreBlock
  | ExampleBlock
  | CompareBlock
  | StepsBlock
  | DiagramBlock
  | DemoBlock
  | CheckBlock;

/* ------------------------------------------------------------------ */
/* Questions and quizzes                                               */
/* ------------------------------------------------------------------ */

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  /** Must be unique across the whole site (used as a storage key). */
  id: string;
  prompt: string;
  /** Optional scenario text shown above the prompt. */
  scenario?: string;
  options: QuestionOption[];
  correctOptionId: string;
  /** Shown after answering — explains *why*, not just what. */
  explanation: string;
}

export type QuizKind = "module" | "scenario" | "final";

export interface Quiz {
  id: string;
  title: string;
  description: string;
  kind: QuizKind;
  /** Module this quiz belongs to (module quizzes only). */
  moduleId?: ModuleId;
  /** Percentage needed to "pass" (0–100). */
  passPercent: number;
  questions: Question[];
}
