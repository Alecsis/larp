"use client";

import { BrainCircuit, RotateCcw } from "lucide-react";
import { useState } from "react";
import { AnswerFeedback, ChoiceQuestion } from "@/components/quiz/ChoiceQuestion";
import { Button } from "@/components/ui/Button";
import { answerCheck } from "@/lib/progress/actions";
import { useProgress } from "@/lib/progress/store";
import { XP_RULES } from "@/lib/progress/xp";
import type { Lesson, Question } from "@/types/content";

/**
 * A knowledge check inside a lesson. The first attempt is saved and can earn
 * XP; students can retry as many times as they like to learn from mistakes.
 */
export function KnowledgeCheck({
  question,
  lesson,
  number,
}: {
  question: Question;
  lesson: Pick<Lesson, "id" | "moduleId" | "title">;
  number: number;
}) {
  const saved = useProgress().checks[question.id];
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<boolean | null>(null);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setResult(answerCheck(question, selected, lesson));
  }

  function retry() {
    setSelected(null);
    setResult(null);
  }

  return (
    <section aria-labelledby={`${question.id}-title`} className="my-8 rounded-2xl border-2 border-ink bg-surface p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id={`${question.id}-title`} className="flex items-center gap-2 font-display text-base font-bold">
          <BrainCircuit aria-hidden className="size-5 text-cobalt-ink" />
          Knowledge check {number}
        </h2>
        <span className="rounded-full bg-sun-soft px-2.5 py-0.5 font-mono text-xs font-bold">
          {saved ? (saved.firstTryCorrect ? `+${XP_RULES.checkFirstTry} XP earned` : "Answered") : `+${XP_RULES.checkFirstTry} XP on first try`}
        </span>
      </div>

      <form onSubmit={submit}>
        <ChoiceQuestion
          question={question}
          name={question.id}
          selectedId={selected}
          onSelect={setSelected}
          revealed={result !== null}
        />
        <div aria-live="polite">
          {result !== null && <AnswerFeedback correct={result} explanation={question.explanation} />}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {result === null ? (
            <Button type="submit" disabled={!selected}>
              Check answer
            </Button>
          ) : (
            <Button variant="secondary" onClick={retry}>
              <RotateCcw aria-hidden className="size-4" /> Try again
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
