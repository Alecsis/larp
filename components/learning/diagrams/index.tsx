/**
 * Maps a lesson's { type: "diagram", diagram: "<id>" } block to an SVG diagram.
 * Every diagram is hand-built SVG — no stock images.
 */
import type { ComponentType } from "react";
import type { DiagramId } from "@/types/content";
import { AiNestingDiagram } from "./AiNestingDiagram";
import { AssistantPipelineDiagram } from "./AssistantPipelineDiagram";
import { NeuralNetworkDiagram } from "./NeuralNetworkDiagram";
import { RulesVsLearningDiagram } from "./RulesVsLearningDiagram";
import { UseSpectrumDiagram } from "./UseSpectrumDiagram";
import { VerifyLoopDiagram } from "./VerifyLoopDiagram";

export const DIAGRAM_COMPONENTS: Record<DiagramId, ComponentType> = {
  "ai-nesting": AiNestingDiagram,
  "rules-vs-learning": RulesVsLearningDiagram,
  "neural-network": NeuralNetworkDiagram,
  "assistant-pipeline": AssistantPipelineDiagram,
  "verify-loop": VerifyLoopDiagram,
  "use-spectrum": UseSpectrumDiagram,
};
