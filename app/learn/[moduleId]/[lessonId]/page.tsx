import { ArrowLeft, ArrowRight, BookOpenCheck, Clock, Sparkles, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonBlocks } from "@/components/learning/LessonBlocks";
import { LessonCompletePanel } from "@/components/learning/LessonCompletePanel";
import { LessonRouteRail } from "@/components/learning/LessonRouteRail";
import { ReadingProgress } from "@/components/learning/ReadingProgress";
import { getSource } from "@/data/references";
import { cn } from "@/lib/cn";
import { challengeHref, getAdjacentLessons, getLesson, getLessonChecks, getModule, getModules, lessonHref, moduleHref } from "@/lib/content";
import { LINE_STYLES } from "@/lib/line-colors";

type Params = { moduleId: string; lessonId: string };

/** Pre-render every lesson page at build time. Unknown URLs → 404. */
export function generateStaticParams(): Params[] {
  return getModules().flatMap((module) => module.lessons.map((lesson) => ({ moduleId: module.id, lessonId: lesson.id })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { moduleId, lessonId } = await params;
  const lesson = getLesson(moduleId, lessonId);
  const learningModule = getModule(moduleId);
  if (!lesson || !learningModule) return {};
  return {
    title: `${lesson.title} — ${learningModule.title}`,
    description: lesson.summary,
    openGraph: { title: lesson.title, description: lesson.summary },
  };
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { moduleId, lessonId } = await params;
  const learningModule = getModule(moduleId);
  const lesson = getLesson(moduleId, lessonId);
  if (!learningModule || !lesson) notFound();

  const line = LINE_STYLES[learningModule.color];
  const index = learningModule.lessons.findIndex((item) => item.id === lesson.id);
  const { previous, next } = getAdjacentLessons(lesson);
  const checks = getLessonChecks(lesson);
  const sources = (lesson.sourceIds ?? []).map((id) => getSource(id)).filter((source) => source !== undefined);
  const afterLesson = next
    ? { href: lessonHref(next), label: "Next station" }
    : { href: challengeHref(learningModule.quizId), label: "Take the line quiz" };

  return (
    <>
      <ReadingProgress colorClass={line.bg} />

      {/* Lesson header */}
      <header className={cn("border-b-2 border-ink", line.soft)}>
        <div className="container-page py-8 sm:py-10">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-1.5 text-ink-2">
              <li>
                <Link href="/learn" className="underline-offset-2 hover:underline">
                  Learn
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={moduleHref(learningModule.id)} className="underline-offset-2 hover:underline">
                  {learningModule.title}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-bold text-ink">
                Station {index + 1}
              </li>
            </ol>
          </nav>
          <p className={cn("eyebrow mt-5", line.text)}>
            {learningModule.lineLabel} · Station {index + 1} of {learningModule.lessons.length}
          </p>
          <h1 className="mt-2 max-w-3xl text-display-lg font-extrabold">{lesson.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-2">{lesson.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm font-bold">
            <MetaPill icon={<Clock aria-hidden className="size-4" />}>{lesson.minutes} min</MetaPill>
            <MetaPill icon={<Sparkles aria-hidden className="size-4" />}>+{lesson.xp} XP</MetaPill>
            <MetaPill icon={<BookOpenCheck aria-hidden className="size-4" />}>{checks.length} knowledge checks</MetaPill>
          </ul>
        </div>
      </header>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12 lg:py-12">
        <aside>
          <LessonRouteRail
            lessons={learningModule.lessons.map(({ id, moduleId: m, title, minutes }) => ({ id, moduleId: m, title, minutes }))}
            currentId={lesson.id}
            color={learningModule.color}
            lineLabel={learningModule.lineLabel}
            moduleTitle={learningModule.title}
          />
        </aside>

        <article className="max-w-[46rem] min-w-0">
          <section aria-labelledby="objectives-title" className="rounded-2xl border-2 border-ink bg-surface p-5">
            <h2 id="objectives-title" className="flex items-center gap-2 font-display text-lg font-bold">
              <Target aria-hidden className={cn("size-5", line.text)} /> By the end of this station, you can:
            </h2>
            <ul className="mt-3 space-y-1.5">
              {lesson.objectives.map((objective) => (
                <li key={objective} className="flex gap-2.5">
                  <span aria-hidden className={cn("mt-2.5 h-1 w-3 shrink-0 rounded-full", line.bg)} />
                  {objective}
                </li>
              ))}
            </ul>
          </section>

          <LessonBlocks lesson={lesson} color={learningModule.color} />

          {sources.length > 0 && (
            <section aria-labelledby="sources-title" className="mt-10 border-t-2 border-rule pt-5">
              <h2 id="sources-title" className="eyebrow text-ink-3">
                Sources for this lesson
              </h2>
              <ul className="mt-2 space-y-1 text-sm text-ink-2">
                {sources.map((source) => (
                  <li key={source.id}>
                    {source.creator}. <cite>{source.title}</cite>
                    {source.year ? `, ${source.year}` : ""}.{" "}
                    <Link href={`/references#${source.id}`} className="font-bold text-cobalt-ink underline underline-offset-2">
                      Full citation
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <LessonCompletePanel
            lesson={{ id: lesson.id, moduleId: lesson.moduleId, title: lesson.title, xp: lesson.xp }}
            checkIds={checks.map((check) => check.id)}
            next={afterLesson}
          />

          <nav aria-label="Lesson navigation" className="mt-8 grid gap-3 sm:grid-cols-2">
            {previous ? (
              <PagerLink href={lessonHref(previous)} direction="previous" title={previous.title} />
            ) : (
              <PagerLink href={moduleHref(learningModule.id)} direction="previous" title={`${learningModule.title} overview`} />
            )}
            {next ? (
              <PagerLink href={lessonHref(next)} direction="next" title={next.title} />
            ) : (
              <PagerLink href={challengeHref(learningModule.quizId)} direction="next" title={`${learningModule.lineLabel} quiz`} />
            )}
          </nav>
        </article>
      </div>
    </>
  );
}

function MetaPill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-surface px-3 py-1">
      {icon}
      {children}
    </li>
  );
}

function PagerLink({ href, direction, title }: { href: string; direction: "previous" | "next"; title: string }) {
  const isNext = direction === "next";
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-xl border-2 border-ink bg-surface p-4 transition-transform hover:-translate-y-0.5 hover:shadow-pop-sm",
        isNext && "sm:col-start-2 sm:flex-row-reverse sm:text-right",
      )}
    >
      {isNext ? <ArrowRight aria-hidden className="size-5 shrink-0" /> : <ArrowLeft aria-hidden className="size-5 shrink-0" />}
      <span>
        <span className="eyebrow block text-ink-3">{isNext ? "Next" : "Previous"}</span>
        <span className="font-display font-bold">{title}</span>
      </span>
    </Link>
  );
}
