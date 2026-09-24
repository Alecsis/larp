/**
 * Maps a lesson's { type: "demo", demo: "<id>" } block to the lab component.
 * To add a new lab: build the component, add its id to DemoId in
 * types/content.ts, list it in data/demos.ts, and register it here.
 */
import type { ComponentType } from "react";
import type { DemoId } from "@/types/content";
import { AiOrHumanDemo } from "./AiOrHumanDemo";
import { BiasScreeningDemo } from "./BiasScreeningDemo";
import { ClassifierDemo } from "./ClassifierDemo";
import { FactCheckDemo } from "./FactCheckDemo";
import { HallucinationDemo } from "./HallucinationDemo";
import { NeuronDemo } from "./NeuronDemo";
import { NextWordDemo } from "./NextWordDemo";
import { PrivacySortDemo } from "./PrivacySortDemo";
import { PromptBuilderDemo } from "./PromptBuilderDemo";
import { TaskBreakdownDemo } from "./TaskBreakdownDemo";
import { TokenizerDemo } from "./TokenizerDemo";
import { TrainingDataDemo } from "./TrainingDataDemo";

export const DEMO_COMPONENTS: Record<DemoId, ComponentType> = {
  tokenizer: TokenizerDemo,
  "next-word": NextWordDemo,
  classifier: ClassifierDemo,
  neuron: NeuronDemo,
  "training-data": TrainingDataDemo,
  "prompt-builder": PromptBuilderDemo,
  "task-breakdown": TaskBreakdownDemo,
  "fact-check": FactCheckDemo,
  hallucination: HallucinationDemo,
  "bias-screening": BiasScreeningDemo,
  "privacy-sort": PrivacySortDemo,
  "ai-or-human": AiOrHumanDemo,
};
