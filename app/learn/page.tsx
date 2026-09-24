import { ArrowRight, Clock, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContinueCard, LessonStatusIcon, ModuleProgressSummary, ModuleStartButton } from "@/components/learning/ProgressBits";
import { RouteMap } from "@/components/learning/RouteMap";
import { PageHeader } from "@/components/ui/PageHeader";
import { cn } from "@/lib/cn";
import { challengeHref, getModules, lessonHref, lessonKey, moduleHref } from "@/lib/content";
import { LINE_STYLES } from "@/lib/line-colors";

export const metadata: Metadata = {
  title: "Learning Hub",
  description: "Three learning lines — AI Fundamentals, AI Tools & Techniques, and Ethical & Responsible AI — with 18 interactive lessons.",
};

export default function LearnHubPage() {
  const modules = getModules();
  const totalMinutes = modules.flatMap((module) => module.lessons).reduce((sum, lesson) => sum + lesson.minutes, 0);

  return (
    <>
      <PageHeader
        eyebrow="Learning hub"
        title={
          <>
            Three lines. <span className="highlight">One destination.</span>
          </>
        }
        description={`Each line is a module and each station is a short, interactive lesson. Ride them in any order — about ${Math.round(totalMinutes / 60 * 10) / 10} hours of learning in total.`}
      />

      <section aria-labelledby="map-title" className="container-page grid gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="rounded-2xl border-2 border-ink bg-surface p-4 sm:p-6">
          <h2 id="map-title" className="font-display text-xl font-bold">
            Your route map
          </h2>
          <p className="text-sm text-ink-2">Filled stations are lessons you&apos;ve completed. The yellow ring marks your next stop.</p>
          <RouteMap className="mt-4" />
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
            {modules.map((module) => (
              <li key={module.id} className="flex items-center gap-2">
                <span aria-hidden className={cn("h-2 w-6 rounded-full", LINE_STYLES[module.color].bg)} />
                {module.lineLabel}: {module.title}
              </li>
            ))}
          </ul>
        </div>
        <ContinueCard />
      </section>

      <div className="container-page space-y-8 pb-14">
        {modules.map((module) => {
          const line = LINE_STYLES[module.color];
          const minutes = module.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
          return (
            <section
              key={module.id}
              aria-labelledby={`${module.id}-title`}
              className="grid grid-cols-1 overflow-hidden rounded-2xl border-2 border-ink bg-surface md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            >
              <div className={cn("flex flex-col gap-4 border-b-2 border-ink p-5 sm:p-6 md:border-r-2 md:border-b-0", line.soft)}>
                <div>
                  <p className={cn("eyebrow", line.text)}>{module.lineLabel}</p>
                  <h2 id={`${module.id}-title`} className="mt-1 text-display-md font-extrabold">
                    <Link href={moduleHref(module.id)} className="hover:underline">
                      {module.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-ink-2">{module.description}</p>
                </div>
                <p className="flex items-center gap-1.5 text-sm font-bold text-ink-2">
                  <Clock aria-hidden className="size-4" /> {module.lessons.length} lessons · about {minutes} min
                </p>
                <ModuleProgressSummary moduleId={module.id} />
                <div className="mt-auto flex flex-wrap gap-2">
                  <ModuleStartButton moduleId={module.id} />
                  <Link
                    href={challengeHref(module.quizId)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 font-bold underline-offset-2 hover:underline"
                  >
                    <Trophy aria-hidden className="size-4" /> Line quiz
                  </Link>
                </div>
              </div>

              <ol className="divide-y divide-rule">
                {module.lessons.map((lesson, index) => (
                  <li key={lesson.id}>
                    <Link href={lessonHref(lesson)} className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-paper sm:px-6">
                      <span className={cn("w-6 shrink-0 font-mono text-sm font-bold", line.text)}>{String(index + 1).padStart(2, "0")}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold group-hover:underline">{lesson.title}</span>
                        <span className="block truncate text-sm text-ink-3">{lesson.summary}</span>
                      </span>
                      <span className="hidden shrink-0 text-sm text-ink-3 sm:block">{lesson.minutes} min</span>
                      <LessonStatusIcon storageKey={lessonKey(lesson)} />
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}

        <section aria-labelledby="final-title" className="on-dark flex flex-col gap-4 rounded-2xl bg-ink p-6 text-paper sm:flex-row sm:items-center sm:p-8">
          <div className="flex-1">
            <p className="eyebrow text-sun">Terminal station</p>
            <h2 id="final-title" className="mt-1 text-display-md font-extrabold">
              The AI Scholar Final Challenge
            </h2>
            <p className="mt-2 max-w-2xl text-paper/80">
              Twelve questions that pull ideas from all three lines. Pass it after completing every lesson to earn the AI Scholar badge.
            </p>
          </div>
          <Link
            href={challengeHref("final-challenge")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-sun bg-sun px-5 font-bold text-ink transition-transform hover:-translate-y-0.5"
          >
            View the challenge <ArrowRight aria-hidden className="size-5" />
          </Link>
        </section>
      </div>
    </>
  );
}
