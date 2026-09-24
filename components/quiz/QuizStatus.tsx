"use client";

import { Trophy } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { challengeHref, getQuiz } from "@/lib/content";
import { isQuizPassed } from "@/lib/progress/selectors";
import { useHydrated, useProgress } from "@/lib/progress/store";
import { cn } from "@/lib/cn";

/** Best score / pass status for one quiz. `compact` = a single line of text. */
export function QuizStatus({ quizId, compact = false }: { quizId: string; compact?: boolean }) {
  const record = useProgress().quizzes[quizId];
  const hydrated = useHydrated();
  const quiz = getQuiz(quizId);
  if (!quiz) return null;

  const passed = isQuizPassed(record, quiz.passPercent);
  const text = !hydrated || !record ? "Not attempted yet" : `Best: ${record.bestScore}/${record.total}${passed ? " · Passed" : ""}`;

  if (compact) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-xs font-bold",
          hydrated && passed ? "bg-emerald-soft text-emerald-ink" : hydrated && record ? "bg-sun-soft" : "bg-paper-2 text-ink-2",
        )}
      >
        {text}
      </span>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-ink bg-surface p-4">
      <p className="eyebrow flex items-center gap-1.5 text-ink-3">
        <Trophy aria-hidden className="size-4" /> Line quiz
      </p>
      <p className="mt-1 font-display text-lg font-bold">{quiz.title}</p>
      <p className="text-sm text-ink-2">
        {quiz.questions.length} questions · pass at {quiz.passPercent}%
      </p>
      <p className="mt-2 text-sm font-bold">{text}</p>
      <ButtonLink href={challengeHref(quiz.id)} variant="secondary" size="sm" className="mt-3">
        {hydrated && record ? "Retake quiz" : "Take quiz"}
      </ButtonLink>
    </div>
  );
}
