import { Clock, FlaskConical, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeStatusCard } from "@/components/gamification/BadgeStatusCard";
import { LessonStatusIcon, ModuleProgressSummary, ModuleStartButton } from "@/components/learning/ProgressBits";
import { QuizStatus } from "@/components/quiz/QuizStatus";
import { getDemo } from "@/data/demos";
import { cn } from "@/lib/cn";
import { getModule, getModules, lessonHref, lessonKey } from "@/lib/content";
import { LINE_STYLES } from "@/lib/line-colors";

type Params = { moduleId: string };

export function generateStaticParams(): Params[] {
  return getModules().map((module) => ({ moduleId: module.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const learningModule = getModule((await params).moduleId);
  if (!learningModule) return {};
  return {
    title: learningModule.title,
    description: learningModule.description,
    openGraph: { title: `${learningModule.lineLabel}: ${learningModule.title}`, description: learningModule.description },
  };
}

export default async function ModulePage({ params }: { params: Promise<Params> }) {
  const learningModule = getModule((await params).moduleId);
  if (!learningModule) notFound();

  const line = LINE_STYLES[learningModule.color];
  const minutes = learningModule.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
  const xp = learningModule.lessons.reduce((sum, lesson) => sum + lesson.xp, 0);
  const labCount = learningModule.lessons.flatMap((lesson) => lesson.blocks.filter((block) => block.type === "demo")).length;

  return (
    <>
      <header className={cn("border-b-2 border-ink", line.soft)}>
        <div className="container-page grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_18rem] md:items-end">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-ink-2">
              <Link href="/learn" className="underline-offset-2 hover:underline">
                Learn
              </Link>{" "}
              / <span aria-current="page">{learningModule.title}</span>
            </nav>
            <p className={cn("eyebrow mt-5", line.text)}>
              {learningModule.lineLabel} · {learningModule.tagline}
            </p>
            <h1 className="mt-2 text-display-lg font-extrabold">{learningModule.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-ink-2">{learningModule.description}</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
              <li className="flex items-center gap-1.5">
                <Clock aria-hidden className="size-4" /> About {minutes} minutes
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles aria-hidden className="size-4" /> {xp} lesson XP
              </li>
              <li className="flex items-center gap-1.5">
                <FlaskConical aria-hidden className="size-4" /> {labCount} interactive labs
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-ink bg-surface p-4">
            <ModuleProgressSummary moduleId={learningModule.id} />
            <div className="mt-4">
              <ModuleStartButton moduleId={learningModule.id} />
            </div>
          </div>
        </div>
      </header>

      <div className="container-page grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="stations-title">
          <h2 id="stations-title" className="text-display-md font-extrabold">
            Stations on this line
          </h2>
          {/* Vertical transit line with one station per lesson */}
          <div className="relative mt-6">
            <span aria-hidden className={cn("absolute top-6 bottom-6 left-[19px] w-1.5 rounded-full", line.bg)} />
            <ol className="relative space-y-4">
              {learningModule.lessons.map((lesson, index) => {
                const labs = lesson.blocks.flatMap((block) => (block.type === "demo" ? [getDemo(block.demo)?.title ?? block.demo] : []));
                return (
                  <li key={lesson.id} className="relative pl-14">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-4 left-0 grid size-11 place-items-center rounded-full border-4 bg-surface font-mono text-sm font-bold",
                        line.border,
                      )}
                    >
                      {index + 1}
                    </span>
                    <Link
                      href={lessonHref(lesson)}
                      className="group block rounded-2xl border-2 border-ink bg-surface p-4 transition-transform hover:-translate-y-0.5 hover:shadow-pop sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-xl font-bold group-hover:underline">{lesson.title}</h3>
                          <p className="mt-1 text-ink-2">{lesson.summary}</p>
                        </div>
                        <LessonStatusIcon storageKey={lessonKey(lesson)} />
                      </div>
                      <ul className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                        <li className="rounded-full bg-paper-2 px-2.5 py-1">{lesson.minutes} min</li>
                        <li className="rounded-full bg-sun-soft px-2.5 py-1">+{lesson.xp} XP</li>
                        {labs.map((lab) => (
                          <li key={lab} className={cn("rounded-full px-2.5 py-1", line.soft, line.text)}>
                            Lab: {lab}
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <BadgeStatusCard badgeId={learningModule.badgeId} />
          <QuizStatus quizId={learningModule.quizId} />
        </aside>
      </div>
    </>
  );
}
