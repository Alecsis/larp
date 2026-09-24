import { Accessibility, BookOpen, FlaskConical, HardDrive, Map, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader, SectionHeading } from "@/components/ui/PageHeader";
import { getAllLessons, getModules, getQuizzes } from "@/lib/content";
import { DEMOS } from "@/data/demos";
import { ACHIEVEMENTS } from "@/data/achievements";

export const metadata: Metadata = {
  title: "About",
  description: "Why we built Tokenline, how the AI learning portal works, and the design decisions behind it.",
};

const LOOP = [
  { icon: BookOpen, title: "Learn", body: "Short lessons with diagrams, examples, myth-vs-fact and key terms." },
  { icon: FlaskConical, title: "Experiment", body: "Interactive labs let you poke at simplified AI systems and see cause and effect." },
  { icon: Trophy, title: "Prove it", body: "Knowledge checks inside lessons, then quizzes and scenario challenges." },
  { icon: Map, title: "Track it", body: "XP, levels, badges and a dashboard show exactly how far you've come." },
];

export default function AboutPage() {
  const modules = getModules();
  const stats = [
    { value: modules.length, label: "learning lines" },
    { value: getAllLessons().length, label: "lessons" },
    { value: DEMOS.length, label: "interactive labs" },
    { value: getQuizzes().length, label: "challenges" },
    { value: ACHIEVEMENTS.length, label: "badges" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="About the project"
        title={
          <>
            AI is already in your classroom. <span className="highlight">Let&apos;s understand it.</span>
          </>
        }
        description="Tokenline is an AI learning portal for high school students, created for the 2026–2027 TSA Webmaster theme: Artificial Intelligence Learning Portal."
      />

      <div className="container-page space-y-16 py-12">
        <section aria-labelledby="why-title" className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading id="why-title" eyebrow="Our purpose" title="Why we built it" />
            <div className="mt-4 space-y-4 text-lg text-ink-2">
              <p>
                Students are surrounded by AI — in search results, recommendation feeds, writing tools and chatbots — but most of us were never
                taught how it works or when to trust it. Some students avoid AI completely; others lean on it without checking its answers.
              </p>
              <p>We wanted a place where a high schooler could, in a few short sessions, learn to do three things:</p>
            </div>
            <ol className="mt-5 space-y-3">
              {modules.map((module, i) => (
                <li key={module.id} className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm font-bold text-paper">{i + 1}</span>
                  <span>
                    <Link href={`/learn/${module.id}`} className="font-bold underline underline-offset-2">
                      {module.title}
                    </Link>{" "}
                    — {module.tagline.toLowerCase()}.
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <dl className="grid grid-cols-2 gap-3 self-start sm:grid-cols-3 lg:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border-2 border-ink bg-surface p-4">
                <dt className="text-sm text-ink-2">{stat.label}</dt>
                <dd className="font-display text-4xl font-extrabold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="loop-title">
          <SectionHeading id="loop-title" eyebrow="How it works" title="Learn → experiment → prove it → track it" />
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LOOP.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border-2 border-ink bg-surface p-5">
                <span className="font-mono text-sm font-bold text-ink-3">0{i + 1}</span>
                <step.icon aria-hidden className="mt-2 size-8" />
                <h3 className="mt-2 font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-1 text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="design-title" className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-3">
            <SectionHeading id="design-title" eyebrow="Design decisions" title="Why it looks and works the way it does" />
          </div>
          <article className="rounded-2xl bg-cobalt-soft p-5">
            <Map aria-hidden className="size-7 text-cobalt-ink" />
            <h3 className="mt-2 font-display text-lg font-bold">A transit map for learning</h3>
            <p className="mt-1 text-ink-2">
              Each module is a colored “line” and each lesson is a “station.” It makes a long course feel like a route you can see and finish,
              and every completed station fills in on the map.
            </p>
          </article>
          <article className="rounded-2xl bg-emerald-soft p-5">
            <Accessibility aria-hidden className="size-7 text-emerald-ink" />
            <h3 className="mt-2 font-display text-lg font-bold">Accessible by default</h3>
            <p className="mt-1 text-ink-2">
              Body text uses Atkinson Hyperlegible, a typeface designed for low-vision readers. Every control works with a keyboard, colors meet
              contrast guidelines, and animations switch off if your device asks for reduced motion.
            </p>
          </article>
          <article className="rounded-2xl bg-tangerine-soft p-5">
            <HardDrive aria-hidden className="size-7 text-tangerine-ink" />
            <h3 className="mt-2 font-display text-lg font-bold">Private by design</h3>
            <p className="mt-1 text-ink-2">
              No accounts, no tracking, no AI API. Your progress is saved only in your own browser, and the labs are simulations that run
              entirely on your device.
            </p>
          </article>
        </section>

        <section aria-labelledby="team-title" className="rounded-2xl border-2 border-dashed border-ink/50 p-6">
          <SectionHeading id="team-title" eyebrow="The team" title="Created by our TSA chapter" />
          <p className="mt-3 max-w-3xl text-ink-2">
            This portal was researched, written, designed and developed by our team for the TSA Webmaster competition. See our{" "}
            <Link href="/references" className="font-bold text-cobalt-ink underline underline-offset-2">
              References page
            </Link>{" "}
            for sources, credits and our framework declaration.
          </p>
          {/* TEAM TODO: add your chapter/team ID exactly as TSA guidelines allow (many events prohibit student names on entries). */}
          <p className="mt-3 font-mono text-sm">Team ID: [add team ID per TSA guidelines]</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink href="/learn">Explore the lessons</ButtonLink>
            <ButtonLink href="/references" variant="secondary">
              View references
            </ButtonLink>
          </div>
        </section>
      </div>
    </>
  );
}
