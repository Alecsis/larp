"use client";

import { Bot } from "lucide-react";
import { ChoiceSortList, type ChoiceItem } from "./ChoiceSortList";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

/*
 * A fictional AI answer split into claims. Everything here was written for
 * this lab — the journal and statistics are invented on purpose so students
 * can practice spotting what needs checking.
 */
const QUESTION = "Why do teenagers need more sleep, and how much should they get?";

const CLAIMS: ChoiceItem[] = [
  {
    id: "c1",
    title: "“During sleep, the brain processes and stores things you learned during the day.”",
    answer: "solid",
    reason:
      "This is a widely taught, general idea you'll find in many reliable health and science sources. Still worth a quick lateral-reading check, but it isn't a red flag.",
  },
  {
    id: "c2",
    title: "“Exactly 73.4% of high schoolers fall asleep in class at least once a week.”",
    answer: "check",
    reason:
      "A super-precise statistic with no source is a classic warning sign. We invented this number for the lab. Move: trace the claim to an original survey — if you can't find one, drop it.",
  },
  {
    id: "c3",
    title:
      "“A 2021 study in the Journal of Adolescent Sleep Rhythms by Dr. Hollis Marren proved that phones cause insomnia.”",
    answer: "check",
    reason:
      "That journal and researcher are made up for this lab — and AI tools can invent citations exactly like this. Move: search for the article itself in a library database or search engine. Also, one study rarely “proves” a cause.",
  },
  {
    id: "c4",
    title: "“The newest school start-time rules in your state went into effect this year.”",
    answer: "check",
    reason:
      "Time-sensitive claims can be outdated — a model's training data stops at a cutoff date, and it may not know about recent changes. Move: check the date on an official, current source.",
  },
  {
    id: "c5",
    title: "“Most sleep experts agree this is the single most important habit for teen success.”",
    answer: "check",
    reason:
      "“Most experts agree” and “single most important” are sweeping claims with no evidence attached. Move: find better coverage — do several reliable sources actually say this?",
  },
];

export function FactCheckDemo() {
  const markTried = useDemoTracker("fact-check");

  return (
    <DemoFrame
      title="Claim Checker"
      instructions="A (fictional) chatbot answered a student's question. Decide which claims look solid and which need checking before you use them."
      takeaway="An answer is only as trustworthy as its weakest claim. Precise numbers, named studies, recent events and sweeping statements are the claims to verify first."
    >
      <div className="mb-4 rounded-xl border border-rule bg-paper p-3 sm:p-4">
        <p className="eyebrow text-ink-3">Student asked</p>
        <p className="mt-1 font-bold">{QUESTION}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-3">
          <Bot aria-hidden className="size-4" /> The chatbot&apos;s answer contained these five claims. (Fictional example
          written for this lab.)
        </p>
      </div>
      <ChoiceSortList
        groupName="fact-check"
        items={CLAIMS}
        options={[
          { value: "solid", label: "Looks solid" },
          { value: "check", label: "Needs checking" },
        ]}
        onInteract={markTried}
        revealLabel="Reveal verdicts"
      />
    </DemoFrame>
  );
}
