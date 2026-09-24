"use client";

import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Shared pattern for several labs: a list of items, the student picks one
 * option per item, then reveals the answers with explanations and a score.
 * Each item is a native radio group (fieldset + legend) so it works with a
 * keyboard and screen readers out of the box.
 */

export interface ChoiceOption {
  value: string;
  label: string;
}

export interface ChoiceItem {
  id: string;
  /** Short text used as the radio group's legend. */
  title: string;
  /** Optional extra content shown under the title (answer text, meters…). */
  body?: ReactNode;
  /** The value of the best option. */
  answer: string;
  /** Why that option is best — shown after revealing. */
  reason: string;
}

export function ChoiceSortList({
  items,
  options,
  onInteract,
  revealLabel = "Check my answers",
  groupName,
}: {
  items: ChoiceItem[];
  options: ChoiceOption[];
  /** Called on the first choice (used to record that the lab was tried). */
  onInteract: () => void;
  revealLabel?: string;
  /** Unique prefix so radio names don't clash with other labs on the page. */
  groupName: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);

  const answeredCount = items.filter((item) => answers[item.id]).length;
  const allAnswered = answeredCount === items.length;
  const score = items.filter((item) => answers[item.id] === item.answer).length;
  const labelFor = (value: string) => options.find((option) => option.value === value)?.label ?? value;

  function choose(itemId: string, value: string) {
    onInteract();
    setAnswers((prev) => ({ ...prev, [itemId]: value }));
  }

  function reset() {
    setAnswers({});
    setRevealed(false);
  }

  return (
    <div>
      <ol className="space-y-3">
        {items.map((item, index) => {
          const chosen = answers[item.id];
          const isRight = chosen === item.answer;
          return (
            <li
              key={item.id}
              className={cn(
                "rounded-xl border bg-surface p-3 sm:p-4",
                revealed ? (isRight ? "border-emerald" : "border-danger") : "border-rule",
              )}
            >
              <fieldset disabled={revealed}>
                <legend className="font-bold">
                  <span className="mr-1.5 font-mono text-sm text-ink-3">{index + 1}.</span>
                  {item.title}
                </legend>
                {item.body && <div className="mt-2 text-[0.95rem] text-ink-2">{item.body}</div>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {options.map((option) => {
                    const id = `${groupName}-${item.id}-${option.value}`;
                    const selected = chosen === option.value;
                    return (
                      <label
                        key={option.value}
                        htmlFor={id}
                        className={cn(
                          "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-sm font-bold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt",
                          selected ? "border-ink bg-ink text-paper" : "border-rule bg-paper hover:border-ink",
                          revealed && "cursor-default opacity-90",
                        )}
                      >
                        <input
                          id={id}
                          type="radio"
                          name={`${groupName}-${item.id}`}
                          value={option.value}
                          checked={selected}
                          onChange={() => choose(item.id, option.value)}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {revealed && (
                <div
                  className={cn(
                    "mt-3 flex gap-2 rounded-lg p-3 text-sm",
                    isRight ? "bg-emerald-soft text-ink" : "bg-danger-soft text-ink",
                  )}
                >
                  {isRight ? (
                    <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-ink" />
                  ) : (
                    <XCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-danger" />
                  )}
                  <p>
                    <strong>{isRight ? "Correct." : `Not quite — best answer: ${labelFor(item.answer)}.`}</strong>{" "}
                    {item.reason}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!revealed ? (
          <>
            <Button variant="primary" onClick={() => setRevealed(true)} disabled={!allAnswered}>
              {revealLabel}
            </Button>
            <p className="text-sm text-ink-3">
              {allAnswered ? "Ready when you are." : `Answered ${answeredCount} of ${items.length}`}
            </p>
          </>
        ) : (
          <Button variant="secondary" onClick={reset}>
            <RotateCcw aria-hidden className="size-4" /> Try again
          </Button>
        )}
      </div>

      <p aria-live="polite" className="mt-3 font-display text-lg font-bold">
        {revealed ? `You scored ${score} out of ${items.length}.` : ""}
      </p>
    </div>
  );
}
