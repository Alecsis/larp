import { ExternalLink, ListChecks } from "lucide-react";
import type { Metadata } from "next";
import { Glossary } from "@/components/learning/Glossary";
import { PageHeader, SectionHeading } from "@/components/ui/PageHeader";
import { AI_CHECKLIST, RESOURCE_GROUPS, type ResourceGroup } from "@/data/resources";
import { cn } from "@/lib/cn";
import { getGlossary, lessonHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description: "Hand-picked AI learning resources, a searchable glossary of every key term, and a checklist for using AI responsibly at school.",
};

const GROUP_STYLES: Record<ResourceGroup["color"], string> = {
  cobalt: "bg-cobalt",
  tangerine: "bg-tangerine",
  emerald: "bg-emerald",
  sun: "bg-sun",
};

export default function ResourcesPage() {
  const glossary = getGlossary().map((entry) => ({
    term: entry.term,
    definition: entry.definition,
    lessonTitle: entry.lesson.title,
    href: lessonHref(entry.lesson),
  }));

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        accent="bg-emerald"
        title={
          <>
            Keep learning <span className="highlight">beyond the line.</span>
          </>
        }
        description="Trusted places to go deeper, a glossary of every term from our lessons, and a checklist to use before you use AI on schoolwork."
      >
        <nav aria-label="On this page">
          <ul className="flex flex-wrap gap-2 text-sm font-bold">
            {[
              ["#checklist", "AI checklist"],
              ["#links", "External resources"],
              ["#glossary", "Glossary"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="inline-block rounded-full border-2 border-ink bg-surface px-3 py-1 hover:bg-sun-soft">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="container-page space-y-14 py-10">
        <section id="checklist" aria-labelledby="checklist-title" className="grid gap-6 rounded-2xl border-2 border-ink bg-sun-soft p-5 sm:p-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <ListChecks aria-hidden className="size-10" />
            <h2 id="checklist-title" className="mt-3 text-display-md font-extrabold">
              Before you use AI on an assignment
            </h2>
            <p className="mt-2 text-ink-2">Six questions that sum up everything in Lines 2 and 3. If any answer is “no,” pause and rethink.</p>
          </div>
          <ol className="space-y-2.5">
            {AI_CHECKLIST.map((item, i) => (
              <li key={item} className="flex gap-3 rounded-xl border-2 border-ink bg-surface p-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm font-bold text-paper">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="links" aria-labelledby="links-title">
          <SectionHeading id="links-title" eyebrow="Hand-picked" title="External resources" intro="Free, reputable resources. Links open on other websites." />
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            {RESOURCE_GROUPS.map((group) => (
              <section key={group.id} aria-labelledby={`${group.id}-title`}>
                <div className="flex items-center gap-3">
                  <span aria-hidden className={cn("h-2 w-8 rounded-full", GROUP_STYLES[group.color])} />
                  <h3 id={`${group.id}-title`} className="font-display text-xl font-bold">
                    {group.title}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-ink-2">{group.intro}</p>
                <ul className="mt-3 divide-y divide-rule rounded-2xl border-2 border-ink bg-surface">
                  {group.resources.map((resource) => (
                    <li key={resource.url}>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="group block p-4 hover:bg-paper">
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-bold group-hover:underline">{resource.title}</span>
                          <ExternalLink aria-hidden className="mt-1 size-4 shrink-0 text-ink-3" />
                        </span>
                        <span className="block text-sm text-ink-3">
                          {resource.by} · {resource.format}
                        </span>
                        <span className="mt-1 block text-sm text-ink-2">{resource.description}</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section id="glossary" aria-labelledby="glossary-title">
          <SectionHeading id="glossary-title" eyebrow="A–Z" title="Glossary" intro="Every key term from every lesson, in one searchable list." />
          <div className="mt-5">
            <Glossary entries={glossary} />
          </div>
        </section>
      </div>
    </>
  );
}
