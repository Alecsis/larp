"use client";

import { ArrowRight, Check, ListChecks, Play, RotateCcw, Trophy, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import { recordQuizResult } from "@/lib/progress/actions";
import { isQuizPassed } from "@/lib/progress/selectors";
import { useHydrated, useProgress } from "@/lib/progress/store";
import { XP_RULES } from "@/lib/progress/xp";
import type { Quiz } from "@/types/content";
import { AnswerFeedback, ChoiceQuestion } from "./ChoiceQuestion";

type Phase = "intro" | "question" | "results";

/**
 * Runs a quiz from start to finish:
 *   intro → one question at a time (instant feedback + explanation) → results.
 * The finished score is saved with recordQuizResult(), which awards XP only
 * when a new best score is reached, so retakes are always allowed.
 */
export function QuizRunner({ quiz }: { quiz: Quiz }) {
  const saved = useProgress().quizzes[quiz.id];
  const hydrated = useHydrated();

  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<{ xpGained: number; isNewBest: boolean } | null>(null);

  // Move keyboard/screen-reader focus to the new question or results heading.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  useEffect(() => {
    if (shouldFocus.current) {
      headingRef.current?.focus();
      shouldFocus.current = false;
    }
  }, [phase, index]);

  const question = quiz.questions[index];
  const total = quiz.questions.length;
  const correctCount = answers.filter((answer, i) => answer === quiz.questions[i].correctOptionId).length;
  const maxXp = total * XP_RULES.quizCorrect + XP_RULES.quizPerfectBonus;

  function start() {
    setPhase("question");
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setAnswers([]);
    setOutcome(null);
    shouldFocus.current = true;
  }

  function check(event: React.FormEvent) {
    event.preventDefault();
    if (!selected || revealed) return;
    setRevealed(true);
    setAnswers((prev) => [...prev, selected]);
  }

  function next() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      const finalCorrect = answers.filter((answer, i) => answer === quiz.questions[i].correctOptionId).length;
      setOutcome(recordQuizResult(quiz, finalCorrect));
      setPhase("results");
    }
    shouldFocus.current = true;
  }

  /* ---------- Intro ---------- */
  if (phase === "intro") {
    return (
      <section aria-labelledby="quiz-intro-title" className="rounded-2xl border-2 border-ink bg-surface p-5 shadow-pop sm:p-8">
        <h2 id="quiz-intro-title" className="font-display text-2xl font-extrabold">
          Ready?
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Questions" value={String(total)} />
          <Stat label="Pass mark" value={`${quiz.passPercent}%`} />
          <Stat label="Max XP" value={String(maxXp)} />
          <Stat label="Your best" value={hydrated && saved ? `${saved.bestScore}/${saved.total}` : "—"} />
        </dl>
        <ul className="mt-5 space-y-1.5 text-ink-2">
          <li>• One question at a time, with an explanation after every answer.</li>
          <li>• {XP_RULES.quizCorrect} XP per correct answer, +{XP_RULES.quizPerfectBonus} XP bonus for a perfect score.</li>
          <li>• Retake any time — only your best score counts, so you can never lose XP.</li>
        </ul>
        <Button size="lg" variant="sun" className="mt-6" onClick={start}>
          <Play aria-hidden className="size-5" /> {hydrated && saved ? "Retake challenge" : "Start challenge"}
        </Button>
      </section>
    );
  }

  /* ---------- Results ---------- */
  if (phase === "results") {
    const percent = Math.round((correctCount / total) * 100);
    const passed = percent >= quiz.passPercent;
    const record = saved;
    return (
      <section aria-labelledby="quiz-results-title" className="space-y-6">
        <div className={cn("rounded-2xl border-2 border-ink p-5 shadow-pop sm:p-8", passed ? "bg-emerald-soft" : "bg-tangerine-soft")}>
          <p className="eyebrow text-ink-2">Results</p>
          <h2 id="quiz-results-title" ref={headingRef} tabIndex={-1} className="mt-1 font-display text-3xl font-extrabold focus:outline-none">
            {correctCount}/{total} correct · {percent}%
          </h2>
          <p className="mt-2 text-lg" aria-live="polite">
            {passed ? "Passed! " : `Not passed yet — you need ${quiz.passPercent}%. `}
            {outcome && outcome.xpGained > 0 ? `You earned ${outcome.xpGained} XP.` : "No new XP this time — beat your best score to earn more."}
          </p>
          {record && isQuizPassed(record, quiz.passPercent) && !passed && (
            <p className="mt-1 text-sm text-ink-2">Your best score of {record.bestScore}/{record.total} still counts as a pass.</p>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            <Button onClick={start}>
              <RotateCcw aria-hidden className="size-4" /> Retake
            </Button>
            <ButtonLink href="/challenges" variant="secondary">
              All challenges
            </ButtonLink>
            <ButtonLink href="/dashboard" variant="ghost">
              View dashboard <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-display text-xl font-bold">
            <ListChecks aria-hidden className="size-5" /> Review your answers
          </h3>
          <ol className="mt-3 space-y-3">
            {quiz.questions.map((q, i) => {
              const answer = answers[i];
              const right = answer === q.correctOptionId;
              const correctText = q.options.find((option) => option.id === q.correctOptionId)?.text;
              const yourText = q.options.find((option) => option.id === answer)?.text;
              return (
                <li key={q.id} className="rounded-xl border-2 border-rule bg-surface p-4">
                  <p className="flex gap-2 font-bold">
                    {right ? (
                      <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-emerald-ink" />
                    ) : (
                      <X aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />
                    )}
                    <span>
                      <span className="sr-only">{right ? "Correct: " : "Incorrect: "}</span>
                      {i + 1}. {q.prompt}
                    </span>
                  </p>
                  {!right && <p className="mt-2 pl-7 text-sm text-danger">Your answer: {yourText}</p>}
                  <p className="mt-1 pl-7 text-sm text-emerald-ink">Correct answer: {correctText}</p>
                  <p className="mt-2 pl-7 text-sm text-ink-2">{q.explanation}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    );
  }

  /* ---------- Question ---------- */
  const answeredCorrectly = revealed && selected === question.correctOptionId;
  return (
    <section aria-labelledby="quiz-q-title" className="rounded-2xl border-2 border-ink bg-surface p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold">
        <h2 id="quiz-q-title" ref={headingRef} tabIndex={-1} className="focus:outline-none">
          Question {index + 1} of {total}
        </h2>
        <span className="flex items-center gap-1.5 font-mono">
          <Trophy aria-hidden className="size-4" /> Score: {correctCount}
        </span>
      </div>
      <ProgressBar value={((index + (revealed ? 1 : 0)) / total) * 100} label="Quiz progress" color="ink" size="sm" className="mt-3" />

      <form onSubmit={check} className="mt-6">
        <ChoiceQuestion
          key={question.id}
          question={question}
          name={`${quiz.id}-${question.id}`}
          selectedId={selected}
          onSelect={setSelected}
          revealed={revealed}
        />
        <div aria-live="polite">{revealed && <AnswerFeedback correct={answeredCorrectly} explanation={question.explanation} />}</div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {!revealed ? (
            <Button type="submit" disabled={!selected}>
              Check answer
            </Button>
          ) : (
            <Button onClick={next} variant="sun">
              {index + 1 < total ? "Next question" : "See results"} <ArrowRight aria-hidden className="size-4" />
            </Button>
          )}
          <Link href="/challenges" className="text-sm font-bold text-ink-2 underline underline-offset-2">
            Quit
          </Link>
        </div>
      </form>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper p-3">
      <dt className="eyebrow text-ink-3">{label}</dt>
      <dd className="font-display text-2xl font-extrabold">{value}</dd>
    </div>
  );
}
