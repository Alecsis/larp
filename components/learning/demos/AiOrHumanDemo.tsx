"use client";

import { ChoiceSortList, type ChoiceItem } from "./ChoiceSortList";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

const ITEMS: ChoiceItem[] = [
  {
    id: "d1",
    title: "Suggest synonyms for a word in your essay",
    answer: "ai",
    reason: "Low stakes and easy to check — you'll read the suggestions and pick one yourself anyway.",
  },
  {
    id: "d2",
    title: "Decide a student's final grade for the semester",
    answer: "human",
    reason: "Grades affect a student's future, and a teacher must be accountable for them and able to explain them.",
  },
  {
    id: "d3",
    title: "Summarize a long article so you can decide whether to read it",
    answer: "assist",
    reason: "A summary is a helpful first pass, but it can miss or distort points. If the article matters, read the key parts yourself.",
  },
  {
    id: "d4",
    title: "Decide whether a patient needs surgery",
    answer: "human",
    reason: "Life-or-health decisions need trained professionals who are responsible for the outcome. AI might support doctors, but it can't be the decider.",
  },
  {
    id: "d5",
    title: "Generate extra practice problems for a math test",
    answer: "ai",
    reason: "A good, low-risk study use. Just double-check any answer key it gives you — models can make math mistakes.",
  },
  {
    id: "d6",
    title: "Decide whether to suspend a student",
    answer: "human",
    reason: "Discipline decisions are high stakes, require context and fairness, and someone must be accountable. That's a human job.",
  },
  {
    id: "d7",
    title: "Flag emails that might be spam so someone can review them",
    answer: "assist",
    reason: "AI is good at spotting patterns across lots of messages, but a person should review what gets flagged so real emails aren't lost.",
  },
];

export function AiOrHumanDemo() {
  const markTried = useDemoTracker("ai-or-human");

  return (
    <DemoFrame
      title="Who Should Decide?"
      instructions="For each task, choose how much of the decision AI should have. Think about the stakes and who is accountable if it goes wrong."
      takeaway="The higher the stakes — health, grades, safety, fairness — the more a human must stay in charge. AI can assist; people stay accountable."
    >
      <ChoiceSortList
        groupName="ai-or-human"
        items={ITEMS}
        options={[
          { value: "ai", label: "AI can handle it" },
          { value: "assist", label: "AI assists, human decides" },
          { value: "human", label: "Human only" },
        ]}
        onInteract={markTried}
      />
    </DemoFrame>
  );
}
