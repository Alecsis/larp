import { ArrowRight, Compass, GraduationCap, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { QuizStatus } from "@/components/quiz/QuizStatus";
import { PageHeader, SectionHeading } from "@/components/ui/PageHeader";
import { cn } from "@/lib/cn";
import { challengeHref, getModule, getQuizzes } from "@/lib/content";
import { LINE_STYLES } from "@/lib/line-colors";
import { XP_RULES } from "@/lib/progress/xp";
import type { Quiz } from "@/types/content";

export const metadata: Metadata = {
  title: "Challenges",
  description: "Quizzes and real-world scenario challenges with instant feedback, explanations, XP rewards and unlimited retakes.",
};

export default function ChallengesPage() {
  const quizzes = getQuizzes();
  const lineQuizzes = quizzes.filter((quiz) => quiz.kind === "module");
  const scenario = quizzes.find((quiz) => quiz.kind === "scenario");
  const finalQuiz = quizzes.find((quiz) => quiz.kind === "final");

  return (
    <>
      <PageHeader
        eyebrow="Challenges"
        accent="bg-tangerine"
        title={
          <>
            Test what you know. <span className="highlight">Then prove it.</span>
          </>
        }
        description="Every question comes with an explanation, so wrong answers still teach you something. Only your best score counts — retake as often as you like."
      >
        <ul className="flex flex-wrap gap-2 text-sm font-bold">
          <li className="rounded-full border-2 border-ink bg-surface px-3 py-1">{XP_RULES.quizCorrect} XP per correct answer</li>
          <li className="rounded-full border-2 border-ink bg-surface px-3 py-1">+{XP_RULES.quizPerfectBonus} XP perfect-score bonus</li>
          <li className="rounded-full border-2 border-ink bg-surface px-3 py-1">Unlimited retakes</li>
        </ul>
      </PageHeader>

      <div className="container-page space-y-12 py-10">
        <section aria-labelledby="line-quizzes">
          <SectionHeading id="line-quizzes" eyebrow="One per line" title="Line quizzes" intro="Eight questions each. Pass all three to earn the Module Master badge." />
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {lineQuizzes.map((quiz) => (
              <li key={quiz.id}>
                <LineQuizCard quiz={quiz} />
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          {scenario && (
            <FeatureCard
              quiz={scenario}
              icon={<Compass aria-hidden className="size-6" />}
              label="Scenario challenge"
              className="bg-sun-soft"
            />
          )}
          {finalQuiz && (
            <FeatureCard
              quiz={finalQuiz}
              icon={<GraduationCap aria-hidden className="size-6" />}
              label="Final challenge · all three lines"
              className="on-dark bg-ink text-paper"
              dark
            />
          )}
        </div>
      </div>
    </>
  );
}

function LineQuizCard({ quiz }: { quiz: Quiz }) {
  const learningModule = quiz.moduleId ? getModule(quiz.moduleId) : undefined;
  const line = learningModule ? LINE_STYLES[learningModule.color] : LINE_STYLES.cobalt;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-surface">
      <div className={cn("h-2", line.bg)} />
      <div className="flex flex-1 flex-col p-5">
        <p className={cn("eyebrow", line.text)}>{learningModule?.lineLabel}</p>
        <h3 className="mt-1 font-display text-xl font-bold">{quiz.title}</h3>
        <p className="mt-2 flex-1 text-sm text-ink-2">{quiz.description}</p>
        <p className="mt-3 text-sm font-bold">
          {quiz.questions.length} questions · pass at {quiz.passPercent}%
        </p>
        <div className="mt-2">
          <QuizStatus quizId={quiz.id} compact />
        </div>
        <Link
          href={challengeHref(quiz.id)}
          className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg border-2 border-ink px-3 py-2 font-bold transition-colors hover:bg-ink hover:text-paper"
        >
          <Trophy aria-hidden className="size-4" /> Open quiz <span className="sr-only">: {quiz.title}</span>
        </Link>
      </div>
    </article>
  );
}

function FeatureCard({
  quiz,
  icon,
  label,
  className,
  dark = false,
}: {
  quiz: Quiz;
  icon: React.ReactNode;
  label: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section aria-labelledby={`${quiz.id}-title`} className={cn("flex flex-col rounded-2xl border-2 border-ink p-6 sm:p-8", className)}>
      <span className={cn("grid size-12 place-items-center rounded-full border-2", dark ? "border-sun text-sun" : "border-ink bg-surface")}>{icon}</span>
      <p className={cn("eyebrow mt-4", dark ? "text-sun" : "text-ink-2")}>{label}</p>
      <h2 id={`${quiz.id}-title`} className="mt-1 text-display-md font-extrabold">
        {quiz.title}
      </h2>
      <p className={cn("mt-2 flex-1", dark ? "text-paper/80" : "text-ink-2")}>{quiz.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          href={challengeHref(quiz.id)}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-lg border-2 px-4 font-bold transition-transform hover:-translate-y-0.5",
            dark ? "border-sun bg-sun text-ink" : "border-ink bg-ink text-paper",
          )}
        >
          Open challenge <ArrowRight aria-hidden className="size-4" />
          <span className="sr-only">: {quiz.title}</span>
        </Link>
        <span className={dark ? "rounded-full bg-paper" : ""}>
          <QuizStatus quizId={quiz.id} compact />
        </span>
      </div>
    </section>
  );
}
