import { ArrowRight, Award, CheckCircle2, CircleSlash, FlaskConical, Map, Sparkles, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { BadgeStamp } from "@/components/gamification/BadgeStamp";
import { MiniTokenizer } from "@/components/home/MiniTokenizer";
import { ContinueCard } from "@/components/learning/ProgressBits";
import { RouteMap } from "@/components/learning/RouteMap";
import { ButtonLink } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeading } from "@/components/ui/PageHeader";
import { ACHIEVEMENTS } from "@/data/achievements";
import { DEMOS } from "@/data/demos";
import { cn } from "@/lib/cn";
import { getAllLessons, getModules, getQuizzes, lessonHref, moduleHref } from "@/lib/content";
import { LINE_STYLES } from "@/lib/line-colors";
import { LEVELS, XP_RULES } from "@/lib/progress/xp";

export default function HomePage() {
  const modules = getModules();
  const lessonCount = getAllLessons().length;
  const firstLesson = modules[0].lessons[0];

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section aria-labelledby="hero-title" className="graph-paper border-b-2 border-ink">
        <div className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:py-16">
          <div className="animate-rise">
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border-2 border-ink bg-surface px-3 py-1">
              <span aria-hidden className="size-2 rounded-full bg-emerald" /> AI learning portal · Grades 9–12
            </p>
            <h1 id="hero-title" className="mt-5 text-display-xl font-extrabold">
              Learn how AI works. <span className="highlight">Then learn to use it well.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-2 sm:text-xl">
              Ride three learning lines — from how machines learn, to prompting like a pro, to using AI with integrity. Short lessons, hands-on
              labs, and XP for every station you finish.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={lessonHref(firstLesson)} size="lg">
                Start Line 1 <ArrowRight aria-hidden className="size-5" />
              </ButtonLink>
              <ButtonLink href="/learn" size="lg" variant="secondary">
                <Map aria-hidden className="size-5" /> See the route map
              </ButtonLink>
            </div>
            <dl className="mt-8 grid max-w-lg grid-cols-4 gap-2 border-t-2 border-ink pt-5">
              {[
                [lessonCount, "lessons"],
                [DEMOS.length, "labs"],
                [getQuizzes().length, "challenges"],
                [ACHIEVEMENTS.length, "badges"],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col">
                  <dt className="text-sm text-ink-2">{label}</dt>
                  <dd className="order-first font-display text-3xl font-extrabold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border-2 border-ink bg-surface p-4 shadow-pop sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-lg font-bold">Your route to AI Scholar</p>
              <p className="eyebrow text-ink-3">3 lines · {lessonCount} stations</p>
            </div>
            <RouteMap className="mt-3" />
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              {modules.map((module) => (
                <li key={module.id}>
                  <Link href={moduleHref(module.id)} className="flex items-center gap-2 rounded-lg p-1 font-bold hover:bg-paper">
                    <span aria-hidden className={cn("h-2 w-5 shrink-0 rounded-full", LINE_STYLES[module.color].bg)} />
                    {module.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- AI IN 30 SECONDS ---------------- */}
      <section aria-labelledby="intro-title" className="container-page grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading id="intro-title" eyebrow="AI in 30 seconds" title="Three ideas that change how you see AI" />
          <ol className="mt-6 space-y-5">
            {[
              ["AI is a toolbox, not a brain.", "Artificial intelligence is a broad field of systems that do tasks we connect with human intelligence — each one built for specific jobs."],
              ["Most modern AI learns from examples.", "Machine learning finds patterns in huge amounts of data instead of following only hand-written rules."],
              ["It predicts. It doesn't “know.”", "A chatbot generates likely next words. That makes it fluent — and sometimes confidently wrong. Checking its work is your job."],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span className="font-display text-4xl leading-none font-extrabold text-cobalt">{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-bold">{title}</h3>
                  <p className="mt-1 text-ink-2">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <MiniTokenizer />
      </section>

      {/* ---------------- THREE LINES ---------------- */}
      <section aria-labelledby="lines-title" className="border-y-2 border-ink bg-surface py-16">
        <div className="container-page">
          <SectionHeading
            id="lines-title"
            eyebrow="The learning path"
            title="Three lines. Eighteen stations. One destination."
            intro="Each line is a module of six short lessons. Take them in order or jump to what you need."
          />
          <div className="mt-10 space-y-10">
            {modules.map((module, index) => {
              const line = LINE_STYLES[module.color];
              return (
                <article key={module.id} aria-labelledby={`home-${module.id}`} className="grid gap-5 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-10">
                  <div>
                    <p className={cn("font-display text-6xl leading-none font-extrabold", line.text)}>0{index + 1}</p>
                    <p className={cn("eyebrow mt-2", line.text)}>{module.lineLabel}</p>
                    <h3 id={`home-${module.id}`} className="mt-1 font-display text-2xl font-extrabold">
                      {module.title}
                    </h3>
                    <p className="mt-1 font-bold text-ink-2">{module.tagline}</p>
                  </div>
                  <div>
                    <p className="text-ink-2">{module.description}</p>
                    {/* The line itself, with a station per lesson */}
                    <div className="relative mt-6">
                      <span aria-hidden className={cn("absolute top-[11px] right-2 left-2 hidden h-2 rounded-full sm:block", line.bg)} />
                      <ol className="relative grid gap-3 sm:grid-cols-6 sm:gap-2">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
                            <span aria-hidden className={cn("size-[30px] shrink-0 rounded-full border-[5px] bg-surface", line.border)} />
                            <Link href={lessonHref(lesson)} className="text-sm leading-snug font-bold hover:underline">
                              {lesson.title}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <Link href={moduleHref(module.id)} className={cn("mt-5 inline-flex items-center gap-1.5 font-bold underline underline-offset-4", line.text)}>
                      Explore {module.lineLabel} <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- GAMIFICATION + DASHBOARD PREVIEW ---------------- */}
      <section aria-labelledby="progress-title" className="container-page grid gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <SectionHeading
            id="progress-title"
            eyebrow="Progress that means something"
            title="Earn XP for real learning — not just clicking"
            intro="Lessons unlock completion only after you answer their knowledge checks. Only first-try answers and best quiz scores earn XP, so the numbers reflect what you actually know."
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              [<Sparkles key="i" aria-hidden className="size-5" />, `+${XP_RULES.lessonDefault} XP`, "per completed lesson"],
              [<CheckCircle2 key="i" aria-hidden className="size-5" />, `+${XP_RULES.checkFirstTry} XP`, "per knowledge check right on the first try"],
              [<FlaskConical key="i" aria-hidden className="size-5" />, `+${XP_RULES.demoFirstTry} XP`, "for each new lab you explore"],
              [<Award key="i" aria-hidden className="size-5" />, `${ACHIEVEMENTS.length} badges`, `and ${LEVELS.length} levels to climb`],
            ].map(([icon, value, label]) => (
              <li key={String(label)} className="flex items-center gap-3 rounded-xl border-2 border-ink bg-surface p-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sun">{icon}</span>
                <span>
                  <span className="block font-display text-lg font-extrabold">{value}</span>
                  <span className="text-sm text-ink-2">{label}</span>
                </span>
              </li>
            ))}
          </ul>
          <ButtonLink href="/dashboard" variant="secondary" className="mt-6">
            Open your dashboard <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>

        {/* A static example of the dashboard (labeled so it isn't confused with real progress) */}
        <figure className="relative rotate-1 rounded-2xl border-2 border-ink bg-paper-2 p-4 shadow-pop sm:p-5">
          <figcaption className="eyebrow absolute -top-3.5 left-4 rounded-full border-2 border-ink bg-sun px-2.5 py-0.5">Example dashboard</figcaption>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-ink bg-cobalt-soft p-4">
              <p className="eyebrow text-ink-3">Level 4</p>
              <p className="font-display text-xl font-bold">{LEVELS[3].name}</p>
              <p className="mt-1 font-display text-3xl font-extrabold">540 XP</p>
              <ProgressBar value={36} label="Example level progress" className="mt-2" />
            </div>
            <div className="rounded-xl border-2 border-ink bg-surface p-4">
              <p className="eyebrow text-ink-3">Line progress</p>
              <ul className="mt-2 space-y-2.5">
                {modules.map((module, i) => (
                  <li key={module.id}>
                    <p className="text-xs font-bold">{module.title}</p>
                    <ProgressBar value={[100, 50, 17][i]} label={`Example ${module.title} progress`} color={module.color} size="sm" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-ink bg-surface p-4 sm:col-span-2">
              <p className="eyebrow text-ink-3">Badges</p>
              <ul className="mt-2 flex flex-wrap gap-3">
                {ACHIEVEMENTS.slice(0, 6).map((badge, i) => (
                  <li key={badge.id} className="flex w-16 flex-col items-center text-center">
                    <BadgeStamp badge={badge} unlocked={i < 4} size="sm" />
                    <span className="mt-1 text-[0.7rem] leading-tight font-bold">{badge.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </figure>
      </section>

      {/* ---------------- ETHICS EMPHASIS ---------------- */}
      <section aria-labelledby="ethics-title" className="on-dark bg-ink py-16 text-paper">
        <div className="container-page">
          <p className="eyebrow text-sun">Line 3 · Ethical & Responsible AI</p>
          <h2 id="ethics-title" className="mt-2 max-w-3xl text-display-lg font-extrabold">
            Using AI well means using it honestly.
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-paper/80">
            Every line comes back to one question: is AI helping you learn, or doing the learning for you? Always follow your teacher&apos;s AI
            policy — here&apos;s how we think about it.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: CheckCircle2, tone: "border-emerald", label: "Usually helpful", items: ["Explaining a confusing concept", "Quizzing yourself before a test", "Brainstorming ideas you then choose from"] },
              { icon: TriangleAlert, tone: "border-sun", label: "Ask first & disclose", items: ["Feedback on your draft", "Help outlining a project", "Debugging code you wrote"] },
              { icon: CircleSlash, tone: "border-tangerine", label: "Not okay", items: ["Submitting AI writing as your own", "Citing sources you never checked", "Sharing private info with a chatbot"] },
            ].map((group) => (
              <li key={group.label} className={cn("rounded-2xl border-2 border-t-8 bg-paper/5 p-5", group.tone)}>
                <p className="flex items-center gap-2 font-display text-lg font-bold">
                  <group.icon aria-hidden className="size-5" /> {group.label}
                </p>
                <ul className="mt-3 space-y-1.5 text-paper/85">
                  {group.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Link href={moduleHref("ai-ethics")} className="mt-8 inline-flex items-center gap-2 font-bold text-sun underline underline-offset-4">
            Explore Ethical & Responsible AI <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section aria-labelledby="cta-title" className="container-page grid gap-6 py-16 md:grid-cols-[minmax(0,1fr)_22rem] md:items-center">
        <div>
          <h2 id="cta-title" className="text-display-lg font-extrabold">
            Your first station is <span className="highlight">{firstLesson.minutes} minutes</span> away.
          </h2>
          <p className="mt-3 max-w-xl text-lg text-ink-2">No sign-up. No downloads. Your progress saves automatically in this browser.</p>
        </div>
        <ContinueCard />
      </section>
    </>
  );
}
