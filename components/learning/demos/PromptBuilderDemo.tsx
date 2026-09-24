"use client";

import { Bot, Check, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

type Ingredient = "goal" | "context" | "format" | "limits";

const INGREDIENTS: { id: Ingredient; label: string; hint: string; text: string }[] = [
  {
    id: "goal",
    label: "Goal",
    hint: "What do you want?",
    text: "Give me feedback on the thesis statement for my 5-paragraph argumentative essay.",
  },
  {
    id: "context",
    label: "Context",
    hint: "What does it need to know?",
    text: "I'm in 10th grade English. My thesis is: “Schools should start later because teens need more sleep.”",
  },
  {
    id: "format",
    label: "Format",
    hint: "How should the answer look?",
    text: "Answer in 3 bullet points: one strength, one weakness, and one question I should think about.",
  },
  {
    id: "limits",
    label: "Limits",
    hint: "What should it avoid?",
    text: "Don't rewrite the thesis for me, and keep it under 120 words.",
  },
];

const VAGUE_PROMPT = "Help me with my essay.";

/* Pre-written example responses, from weakest prompt (0 ingredients) to strongest (4). */
const RESPONSES: { text: string[]; note: string }[] = [
  {
    text: [
      "Sure! I'd be happy to help with your essay. Good essays usually have an introduction, body paragraphs, and a conclusion. Make sure your writing is clear, check your grammar and spelling, and support your points with evidence. What is your essay about?",
    ],
    note: "Generic advice. The AI has to guess what you need, so it gives everyone the same answer.",
  },
  {
    text: [
      "A strong thesis for an argumentative essay makes a clear, debatable claim and previews your main reasons. Avoid statements that are just facts, and make sure a reader could reasonably disagree. If you share your thesis, I can give more specific feedback.",
    ],
    note: "Better focus — but without your actual thesis, the feedback can't be specific.",
  },
  {
    text: [
      "Your thesis — “Schools should start later because teens need more sleep” — takes a clear, debatable position, which is great. It could be stronger if it previewed your body paragraphs, such as health, grades, and safety. You might also consider whether sleep is your main point or what better sleep leads to. Counterarguments like bus schedules and after-school jobs are worth addressing too. Overall it's a solid start that could be sharper and more specific, and there are many directions you could take it from here depending on your evidence…",
    ],
    note: "Now it's specific to you — but it's a long wall of text that's hard to act on.",
  },
  {
    text: [
      "• Strength: It takes a clear position a reader could disagree with.",
      "• Weakness: It gives one reason but doesn't preview the three points your body paragraphs will argue.",
      "• Question: Is sleep your main point, or what better sleep leads to (focus, health, safety)?",
      "Revised thesis: “Schools should start later because more sleep improves teens' health, focus, and safety.”",
    ],
    note: "Organized and useful — but it rewrote your thesis for you, which you didn't ask for (and your teacher may not allow).",
  },
  {
    text: [
      "• Strength: It takes a clear position a reader could disagree with.",
      "• Weakness: It gives one reason but doesn't preview the three points your body paragraphs will argue.",
      "• Question: Is sleep your main point, or what better sleep leads to — like focus, health, or safety? Try adding those to your thesis in your own words.",
    ],
    note: "Specific, organized, short — and the thinking (and rewriting) stays with you.",
  },
];

export function PromptBuilderDemo() {
  const markTried = useDemoTracker("prompt-builder");
  const [active, setActive] = useState<Record<Ingredient, boolean>>({
    goal: false,
    context: false,
    format: false,
    limits: false,
  });

  const chosen = INGREDIENTS.filter((item) => active[item.id]);
  const strength = chosen.length;
  const prompt = strength === 0 ? VAGUE_PROMPT : chosen.map((item) => item.text).join(" ");
  const response = RESPONSES[strength];

  function toggle(id: Ingredient) {
    markTried();
    setActive((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <DemoFrame
      title="Prompt Builder"
      instructions="Start with a vague prompt, then add ingredients from our GCFL framework: Goal, Context, Format, Limits. Watch the prompt and the example response change."
      takeaway="Each ingredient removes guesswork. Goal and Context make the answer specific, Format makes it usable, and Limits keep the AI helping you instead of doing the work for you."
    >
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="Prompt ingredients">
        {INGREDIENTS.map((item) => {
          const on = active[item.id];
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(item.id)}
              className={cn(
                "flex items-start gap-2 rounded-xl border-2 p-3 text-left transition-colors",
                on ? "border-ink bg-tangerine-soft" : "border-rule bg-surface hover:border-ink",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2",
                  on ? "border-ink bg-ink text-paper" : "border-ink-3",
                )}
              >
                {on ? <Check className="size-3.5" /> : <Plus className="size-3.5 text-ink-3" />}
              </span>
              <span>
                <span className="block font-bold">{item.label}</span>
                <span className="block text-sm text-ink-3">{item.hint}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-ink-3">Your prompt</p>
          <p className="mt-2 rounded-xl border-2 border-ink bg-paper p-3 font-mono text-sm leading-relaxed">{prompt}</p>

          <div className="mt-4">
            <p className="eyebrow text-ink-3" id="prompt-strength-label">
              Prompt strength: {strength} / 4
            </p>
            <div
              className="mt-2 grid grid-cols-4 gap-1"
              role="meter"
              aria-labelledby="prompt-strength-label"
              aria-valuemin={0}
              aria-valuemax={4}
              aria-valuenow={strength}
            >
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={cn("h-2.5 rounded-full transition-colors", i < strength ? "bg-tangerine" : "bg-paper-2")}
                />
              ))}
            </div>
          </div>
        </div>

        <div aria-live="polite">
          <p className="eyebrow flex items-center gap-1.5 text-ink-3">
            <Bot aria-hidden className="size-4" /> Example response (pre-written for this lab)
          </p>
          <div className="mt-2 space-y-1.5 rounded-xl border border-rule bg-surface p-3 text-[0.95rem]">
            {response.text.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-2 text-sm text-ink-2">
            <strong className="text-tangerine-ink">Why:</strong> {response.note}
            {strength > 0 && !active.goal && " Without a Goal, the AI still has to guess what you want."}
          </p>
        </div>
      </div>
    </DemoFrame>
  );
}
