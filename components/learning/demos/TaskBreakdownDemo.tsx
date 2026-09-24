"use client";

import { ArrowDown, ArrowUp, Bot, CheckCircle2, RotateCcw, User, XCircle } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

interface Step {
  id: string;
  text: string;
  /** Who should do the heavy lifting on this step. */
  owner: "ai" | "you";
  why: string;
}

/** Listed in the CORRECT order. */
const STEPS: Step[] = [
  { id: "rubric", text: "Read the assignment rubric and list the requirements", owner: "you", why: "Only you know exactly what your teacher asked for." },
  { id: "brainstorm", text: "Brainstorm possible angles (solar, wind, costs, local projects)", owner: "ai", why: "AI is great at generating lots of options quickly — you choose." },
  { id: "focus", text: "Choose your focus and main message", owner: "you", why: "This is the core thinking of the project — it should be yours." },
  { id: "research", text: "Find and read reliable sources, and take notes", owner: "you", why: "AI can suggest search terms, but you must find and check real sources." },
  { id: "outline", text: "Outline your slides from your notes", owner: "ai", why: "Ask AI for feedback on YOUR outline: what's missing, what's unclear." },
  { id: "notes", text: "Write speaker notes in your own words", owner: "you", why: "You're the one presenting — the words and understanding need to be yours." },
  { id: "practice", text: "Rehearse, with AI acting as a mock audience asking questions", owner: "ai", why: "A low-stakes way to practice answering questions before the real thing." },
];

const SCRAMBLED = ["research", "rubric", "notes", "brainstorm", "practice", "focus", "outline"];
const byId = (id: string) => STEPS.find((step) => step.id === id)!;

export function TaskBreakdownDemo() {
  const markTried = useDemoTracker("task-breakdown");
  const [order, setOrder] = useState<string[]>(SCRAMBLED);
  const [checked, setChecked] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const buttonRefs = useRef(new Map<string, HTMLButtonElement | null>());

  const correctCount = order.filter((id, index) => STEPS[index].id === id).length;

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    markTried();
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    setChecked(false);
    const moved = byId(order[index]);
    setAnnouncement(`Moved "${moved.text}" to position ${target + 1}.`);

    // Keep keyboard focus on the item that moved (on whichever arrow is still usable).
    const atEdge = target === 0 || target === next.length - 1;
    const key = `${moved.id}-${atEdge ? (target === 0 ? "down" : "up") : direction === -1 ? "up" : "down"}`;
    requestAnimationFrame(() => buttonRefs.current.get(key)?.focus());
  }

  function reset() {
    setOrder(SCRAMBLED);
    setChecked(false);
    setAnnouncement("Steps reset to the starting order.");
  }

  return (
    <DemoFrame
      title="Task Splitter"
      instructions="Big task: Create a 5-minute presentation on renewable energy for science class. Put the steps in a sensible order using the arrow buttons, then check your plan."
      takeaway="Breaking a big task into steps shows you exactly where AI can help (brainstorming, feedback, practice) and where the thinking has to be yours (choosing, researching, writing)."
    >
      <ol className="space-y-2">
        {order.map((id, index) => {
          const step = byId(id);
          const inPlace = STEPS[index].id === id;
          const correctPosition = STEPS.findIndex((s) => s.id === id) + 1;
          return (
            <li
              key={id}
              className={cn(
                "flex gap-3 rounded-xl border-2 bg-surface p-3",
                checked ? (inPlace ? "border-emerald" : "border-danger") : "border-rule",
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm font-bold text-paper">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold leading-snug">{step.text}</p>
                {checked && (
                  <div className="mt-2 space-y-1.5 text-sm">
                    <p className={cn("flex items-center gap-1.5 font-bold", inPlace ? "text-emerald-ink" : "text-danger")}>
                      {inPlace ? <CheckCircle2 aria-hidden className="size-4" /> : <XCircle aria-hidden className="size-4" />}
                      {inPlace ? "Right spot" : `Better as step ${correctPosition}`}
                    </p>
                    <p className="flex flex-wrap items-center gap-2 text-ink-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold",
                          step.owner === "ai" ? "bg-tangerine-soft text-tangerine-ink" : "bg-cobalt-soft text-cobalt-ink",
                        )}
                      >
                        {step.owner === "ai" ? <Bot aria-hidden className="size-3.5" /> : <User aria-hidden className="size-3.5" />}
                        {step.owner === "ai" ? "Good use of AI" : "Your job"}
                      </span>
                      {step.why}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button
                  type="button"
                  ref={(el) => {
                    buttonRefs.current.set(`${id}-up`, el);
                  }}
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move "${step.text}" up`}
                  className="grid size-9 place-items-center rounded-lg border-2 border-rule bg-paper hover:border-ink disabled:opacity-30"
                >
                  <ArrowUp aria-hidden className="size-4" />
                </button>
                <button
                  type="button"
                  ref={(el) => {
                    buttonRefs.current.set(`${id}-down`, el);
                  }}
                  onClick={() => move(index, 1)}
                  disabled={index === order.length - 1}
                  aria-label={`Move "${step.text}" down`}
                  className="grid size-9 place-items-center rounded-lg border-2 border-rule bg-paper hover:border-ink disabled:opacity-30"
                >
                  <ArrowDown aria-hidden className="size-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="primary"
          onClick={() => {
            markTried();
            setChecked(true);
            setAnnouncement(`${correctCount} of ${STEPS.length} steps are in a good position.`);
          }}
        >
          Check order
        </Button>
        <Button variant="secondary" onClick={reset}>
          <RotateCcw aria-hidden className="size-4" /> Reset
        </Button>
      </div>

      {checked && (
        <p className="mt-3 font-display text-lg font-bold">
          {correctCount === STEPS.length
            ? "Perfect plan! Every step is in a sensible order."
            : `${correctCount} of ${STEPS.length} steps in a good spot. Adjust and check again.`}
        </p>
      )}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </DemoFrame>
  );
}
