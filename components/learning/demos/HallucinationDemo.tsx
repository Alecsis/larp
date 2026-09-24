"use client";

import { Bot } from "lucide-react";
import { ChoiceSortList, type ChoiceItem } from "./ChoiceSortList";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

/*
 * Fictional chatbot answers. The people, case and quote below were invented
 * for this lab — that's the point: they sound real but aren't.
 */
interface Card {
  id: string;
  question: string;
  reply: string;
  /** How sure the reply SOUNDS (0–100). Deliberately high for every card. */
  tone: number;
  answer: "trust" | "flag";
  reason: string;
}

const CARDS: Card[] = [
  {
    id: "h1",
    question: "At sea level, what temperature does water boil at in Celsius?",
    reply: "Water boils at 100 °C at sea level.",
    tone: 97,
    answer: "trust",
    reason:
      "This is a basic, well-established fact found in any science textbook — a low-risk answer. Even so, the confident tone isn't why it's right; the textbook agreement is.",
  },
  {
    id: "h2",
    question: "What did my history teacher, Ms. Okafor, say about the test in class yesterday?",
    reply: "Ms. Okafor said the test will cover chapters 5–7 and will be open-note.",
    tone: 95,
    answer: "flag",
    reason:
      "A chatbot has no way to know what happened in your classroom — it generated a plausible-sounding answer anyway. Catch it by asking: could this tool possibly have this information?",
  },
  {
    id: "h3",
    question: "Give me a famous quote about failure from the inventor Dela Voss.",
    reply: "“Every broken prototype is a map to the one that works.” — Dela Voss, 1987 interview",
    tone: 96,
    answer: "flag",
    reason:
      "Dela Voss is a fictional inventor made up for this lab, so the quote is invented too. Real chatbots can fabricate quotes and dates this way. Catch it: trace the quote to an original interview, book or speech.",
  },
  {
    id: "h4",
    question: "What is the closest planet to the Sun?",
    reply: "Mercury is the closest planet to the Sun.",
    tone: 98,
    answer: "trust",
    reason: "A simple, widely documented fact that is easy to confirm. Low stakes and easy to verify = reasonable to trust.",
  },
  {
    id: "h5",
    question: "Name a court case about students' rights to use phones at school.",
    reply:
      "In Jenkins v. Harlow Unified School District (2016), the court ruled that schools cannot confiscate student phones.",
    tone: 94,
    answer: "flag",
    reason:
      "This case was invented for the lab. Specific legal cases, names and years are exactly what AI tools sometimes fabricate. Catch it: look the case up in an official court or legal database before using it.",
  },
];

function ToneMeter({ value }: { value: number }) {
  return (
    <div className="mt-2 flex items-center gap-2 text-xs text-ink-3">
      <span className="shrink-0">How sure it sounds</span>
      <span className="h-2 flex-1 overflow-hidden rounded-full bg-paper-2" aria-hidden>
        <span className="block h-full rounded-full bg-cobalt" style={{ width: `${value}%` }} />
      </span>
      <span className="font-mono font-bold text-ink-2">{value}%</span>
    </div>
  );
}

const ITEMS: ChoiceItem[] = CARDS.map((card) => ({
  id: card.id,
  title: card.question,
  answer: card.answer,
  reason: card.reason,
  body: (
    <div className="rounded-lg border border-rule bg-paper p-3">
      <p className="flex gap-2 text-ink">
        <Bot aria-hidden className="mt-1 size-4 shrink-0 text-cobalt-ink" />
        <span>
          <span className="sr-only">Chatbot reply: </span>
          {card.reply}
        </span>
      </p>
      <ToneMeter value={card.tone} />
    </div>
  ),
}));

export function HallucinationDemo() {
  const markTried = useDemoTracker("hallucination");

  return (
    <DemoFrame
      title="Hallucination Hunt"
      instructions="A fictional chatbot answered five questions — and every answer sounds very sure of itself. Trust it or flag it?"
      takeaway="Confidence is a writing style, not evidence. Flag answers the tool couldn't possibly know, and anything with specific names, quotes, cases or dates until you trace it to a real source."
    >
      <ChoiceSortList
        groupName="hallucination"
        items={ITEMS}
        options={[
          { value: "trust", label: "Trust it" },
          { value: "flag", label: "Flag it" },
        ]}
        onInteract={markTried}
        revealLabel="Reveal the truth"
      />
    </DemoFrame>
  );
}
