"use client";

import { Check, X } from "lucide-react";
import type { Question } from "@/types/content";
import { cn } from "@/lib/cn";
import { seededShuffle } from "@/lib/shuffle";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/**
 * A single multiple-choice question. Used by BOTH lesson knowledge checks and
 * full quizzes, so every question on the site looks and behaves the same.
 *
 * Accessibility: real radio inputs inside a <fieldset>/<legend>, so arrow
 * keys, screen readers and form semantics all work without extra ARIA.
 * After answering, correct/incorrect is shown with icons + text, not just color.
 */
export function ChoiceQuestion({
  question,
  name,
  selectedId,
  onSelect,
  revealed,
  legendPrefix,
}: {
  question: Question;
  /** Unique radio-group name. */
  name: string;
  selectedId: string | null;
  onSelect: (optionId: string) => void;
  /** True once the answer has been checked. Locks the options. */
  revealed: boolean;
  legendPrefix?: string;
}) {
  const options = seededShuffle(question.options, `order:${question.id}`, (option) => option.id);
  return (
    <fieldset className="min-w-0">
      <legend className="w-full">
        {legendPrefix && <span className="eyebrow block text-ink-3">{legendPrefix}</span>}
        {question.scenario && (
          <span className="mt-2 block rounded-lg border-l-4 border-sun bg-sun-soft px-3 py-2 text-[0.95rem] text-ink-2">
            <span className="font-bold text-ink">Scenario: </span>
            {question.scenario}
          </span>
        )}
        <span className="mt-2 block font-display text-lg leading-snug font-bold sm:text-xl">{question.prompt}</span>
      </legend>

      <div className="mt-4 grid gap-2.5">
        {options.map((option, index) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.id === question.correctOptionId;
          const showCorrect = revealed && isCorrect;
          const showWrong = revealed && isSelected && !isCorrect;
          return (
            <label key={option.id} className={cn("block", revealed ? "cursor-default" : "cursor-pointer")}>
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={isSelected}
                disabled={revealed}
                onChange={() => onSelect(option.id)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex items-start gap-3 rounded-xl border-2 px-3 py-3 transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt sm:px-4",
                  !revealed && !isSelected && "border-rule bg-surface hover:border-ink",
                  !revealed && isSelected && "border-ink bg-cobalt-soft",
                  showCorrect && "border-emerald bg-emerald-soft",
                  showWrong && "animate-shake border-danger bg-danger-soft",
                  revealed && !showCorrect && !showWrong && "border-rule bg-surface opacity-70",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-md border-2 font-mono text-sm font-bold",
                    isSelected && !revealed ? "border-ink bg-ink text-paper" : "border-ink/30 bg-paper",
                    showCorrect && "border-emerald bg-emerald text-white",
                    showWrong && "border-danger bg-danger text-white",
                  )}
                >
                  {showCorrect ? <Check className="size-4" /> : showWrong ? <X className="size-4" /> : LETTERS[index]}
                </span>
                <span className="pt-0.5">
                  {option.text}
                  {showCorrect && <span className="ml-2 text-sm font-bold text-emerald-ink">Correct answer</span>}
                  {showWrong && <span className="ml-2 text-sm font-bold text-danger">Your answer</span>}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** The explanation panel shown after answering. */
export function AnswerFeedback({ correct, explanation }: { correct: boolean; explanation: string }) {
  return (
    <div
      className={cn(
        "mt-4 flex animate-rise gap-3 rounded-xl border-2 p-4",
        correct ? "border-emerald bg-emerald-soft" : "border-tangerine bg-tangerine-soft",
      )}
    >
      <span
        aria-hidden="true"
        className={cn("grid size-8 shrink-0 place-items-center rounded-full text-white", correct ? "bg-emerald" : "bg-tangerine-ink")}
      >
        {correct ? <Check className="size-5" /> : <X className="size-5" />}
      </span>
      <div>
        <p className="font-display font-bold">{correct ? "Correct!" : "Not quite."}</p>
        <p className="mt-1 text-[0.95rem] text-ink-2">{explanation}</p>
      </div>
    </div>
  );
}
