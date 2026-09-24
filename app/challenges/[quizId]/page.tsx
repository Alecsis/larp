import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { PageHeader } from "@/components/ui/PageHeader";
import { getModule, getQuiz, getQuizzes, moduleHref } from "@/lib/content";
import { LINE_STYLES } from "@/lib/line-colors";

type Params = { quizId: string };

export function generateStaticParams(): Params[] {
  return getQuizzes().map((quiz) => ({ quizId: quiz.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const quiz = getQuiz((await params).quizId);
  if (!quiz) return {};
  return { title: quiz.title, description: quiz.description };
}

export default async function ChallengePage({ params }: { params: Promise<Params> }) {
  const quiz = getQuiz((await params).quizId);
  if (!quiz) notFound();
  const learningModule = quiz.moduleId ? getModule(quiz.moduleId) : undefined;
  const accent = learningModule ? LINE_STYLES[learningModule.color].bg : quiz.kind === "final" ? "bg-ink" : "bg-sun";
  const eyebrow = quiz.kind === "final" ? "Final challenge" : quiz.kind === "scenario" ? "Scenario challenge" : `${learningModule?.lineLabel} quiz`;

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={quiz.title} description={quiz.description} accent={accent}>
        <nav aria-label="Breadcrumb" className="text-sm text-ink-2">
          <Link href="/challenges" className="underline underline-offset-2">
            All challenges
          </Link>
          {learningModule && (
            <>
              {" · "}
              <Link href={moduleHref(learningModule.id)} className="underline underline-offset-2">
                Review {learningModule.title}
              </Link>
            </>
          )}
        </nav>
      </PageHeader>
      <div className="container-page py-10">
        <div className="mx-auto max-w-3xl">
          <QuizRunner quiz={quiz} />
        </div>
      </div>
    </>
  );
}
