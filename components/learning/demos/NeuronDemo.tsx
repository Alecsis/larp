"use client";

import { CheckCircle2, CircleDashed } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

/**
 * One artificial neuron: multiply each input (1 = yes, 0 = no) by its weight,
 * add them up, and "fire" if the total reaches the threshold.
 */

const INPUTS = [
  { id: "homework", question: "Homework done?" },
  { id: "friend", question: "Friend going?" },
  { id: "rain", question: "Is it raining?" },
] as const;

const START_WEIGHTS = [3, 2, -4];
const START_THRESHOLD = 4;

// Goal: go ONLY when homework is done and it's not raining (friend doesn't matter).
const COMBOS = Array.from({ length: 8 }, (_, n) => [(n >> 2) & 1, (n >> 1) & 1, n & 1]);
const goalWants = (x: number[]) => x[0] === 1 && x[2] === 0;

const weightedSum = (inputs: number[], weights: number[]) => inputs.reduce((sum, x, i) => sum + x * weights[i], 0);
const signed = (n: number) => (n < 0 ? `(−${Math.abs(n)})` : String(n));

export function NeuronDemo() {
  const markTried = useDemoTracker("neuron");
  const id = useId();
  const [inputs, setInputs] = useState([1, 1, 0]);
  const [weights, setWeights] = useState(START_WEIGHTS);
  const [threshold, setThreshold] = useState(START_THRESHOLD);

  const sum = weightedSum(inputs, weights);
  const fires = sum >= threshold;
  const goalMatches = COMBOS.filter((combo) => (weightedSum(combo, weights) >= threshold) === goalWants(combo)).length;

  function toggleInput(i: number) {
    markTried();
    setInputs((prev) => prev.map((v, j) => (j === i ? 1 - v : v)));
  }

  function setWeight(i: number, value: number) {
    markTried();
    setWeights((prev) => prev.map((w, j) => (j === i ? value : w)));
  }

  return (
    <DemoFrame
      title="Build a Neuron"
      instructions="Flip the inputs and drag the weight sliders. The neuron multiplies each input by its weight, adds them up, and says “Go” if the total reaches the threshold."
      takeaway="A neuron is just arithmetic: weights decide how much each input matters. When a network “learns,” it nudges thousands or millions of weights like these automatically, based on its mistakes."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
        <div className="space-y-3">
          {INPUTS.map((input, i) => (
            <div key={input.id} className="grid gap-3 rounded-lg border border-rule bg-paper p-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center">
              <div>
                <p id={`${id}-q${i}`} className="text-sm font-bold">
                  {input.question}
                </p>
                <button
                  id={`${id}-b${i}`}
                  type="button"
                  role="switch"
                  aria-checked={inputs[i] === 1}
                  aria-labelledby={`${id}-q${i} ${id}-b${i}`}
                  onClick={() => toggleInput(i)}
                  className={cn(
                    "mt-1 min-h-9 w-24 rounded-lg border-2 border-ink text-sm font-bold transition-colors",
                    inputs[i] ? "bg-ink text-paper" : "bg-surface text-ink",
                  )}
                >
                  {inputs[i] ? "Yes (1)" : "No (0)"}
                </button>
              </div>
              <div>
                <label htmlFor={`${id}-w${i}`} className="flex justify-between text-sm">
                  <span>Weight</span>
                  <span className="font-mono font-bold">{weights[i]}</span>
                </label>
                <input
                  id={`${id}-w${i}`}
                  type="range"
                  min={-5}
                  max={5}
                  step={1}
                  value={weights[i]}
                  onChange={(e) => setWeight(i, Number(e.target.value))}
                  className="w-full accent-cobalt"
                />
              </div>
            </div>
          ))}
          <div className="rounded-lg border border-rule bg-paper p-3">
            <label htmlFor={`${id}-t`} className="flex justify-between text-sm font-bold">
              <span>Threshold (total needed to say “Go”)</span>
              <span className="font-mono">{threshold}</span>
            </label>
            <input
              id={`${id}-t`}
              type="range"
              min={-5}
              max={10}
              step={1}
              value={threshold}
              onChange={(e) => {
                markTried();
                setThreshold(Number(e.target.value));
              }}
              className="w-full accent-tangerine"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div aria-live="polite" className="rounded-xl border-2 border-ink bg-surface p-4">
            <p className="eyebrow text-ink-3">Weighted sum</p>
            <p className="mt-1 font-mono text-sm break-words">
              {inputs.map((x, i) => `(${x} × ${signed(weights[i])})`).join(" + ")} = <strong className="text-base">{sum}</strong>
            </p>
            <p className="mt-1 font-mono text-sm">
              {sum} {fires ? "≥" : "<"} {threshold}
            </p>
            <p
              className={cn(
                "mt-3 rounded-lg px-3 py-2 text-center font-display text-xl font-bold",
                fires ? "bg-emerald-soft text-emerald-ink" : "bg-paper-2 text-ink-2",
              )}
            >
              {fires ? "Fires → Go to the game!" : "Doesn't fire → Stay home"}
            </p>
          </div>

          <div className="rounded-xl border border-rule bg-sun-soft p-4">
            <p className="eyebrow text-ink-2">Training challenge</p>
            <p className="mt-1 text-sm">
              Adjust the weights and threshold so the neuron says “Go” <strong>only</strong> when homework is done and it&apos;s not raining — whether or not your friend goes.
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-bold">
              {goalMatches === 8 ? (
                <CheckCircle2 aria-hidden className="size-5 text-emerald-ink" />
              ) : (
                <CircleDashed aria-hidden className="size-5 text-tangerine-ink" />
              )}
              {goalMatches === 8
                ? "8 of 8 situations correct — you trained it by hand!"
                : `${goalMatches} of 8 situations correct — keep adjusting.`}
            </p>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
