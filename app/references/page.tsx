import { BadgeCheck, CircleAlert, ExternalLink, FileWarning, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  CONTENT_SOURCES,
  FRAMEWORK_DECLARATION,
  MEDIA_CREDITS,
  PROJECT_SOURCES,
  TECHNOLOGIES,
  type Source,
} from "@/data/references";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "References",
  description: "Content sources, media credits, software and technologies, and the framework declaration for the Tokenline AI Learning Portal.",
};

const SECTIONS = [
  ["#framework-declaration", "Framework declaration"],
  ["#content-sources", "Content sources"],
  ["#media-sources", "Image / media sources"],
  ["#technologies", "Software / technologies"],
  ["#standards", "Standards & competition"],
] as const;

/** Formats a date like "24 Sept. 2026" (close to MLA 9 style). */
function formatAccessed(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  return `${d} ${months[m - 1]} ${y}`;
}

export default function ReferencesPage() {
  return (
    <>
      <PageHeader
        eyebrow="References"
        accent="bg-ink"
        title="Sources, credits & technology"
        description="Where our information comes from, what we built with, and our declaration of original design."
      >
        <nav aria-label="On this page">
          <ul className="flex flex-wrap gap-2 text-sm font-bold">
            {SECTIONS.map(([href, label]) => (
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
        {/* 1. Framework declaration — required by TSA */}
        <section id="framework-declaration" aria-labelledby="framework-title" className="on-dark rounded-2xl bg-ink p-6 text-paper sm:p-10">
          <p className="eyebrow flex items-center gap-2 text-sun">
            <ShieldCheck aria-hidden className="size-5" /> Framework declaration
          </p>
          <h2 id="framework-title" className="mt-2 text-display-md font-extrabold">
            Built from scratch — no templates, no themes
          </h2>
          <blockquote className="mt-5 border-l-4 border-sun pl-5 font-display text-xl leading-snug sm:text-2xl">
            {FRAMEWORK_DECLARATION}
          </blockquote>
          <ul className="mt-6 grid gap-3 text-sm text-paper/85 sm:grid-cols-3">
            <li className="rounded-xl border border-paper/20 p-4">
              <strong className="block text-paper">Original design system</strong>
              Our color tokens, typography scale, “transit line” theme, badge stamps and components were designed for this project.
            </li>
            <li className="rounded-xl border border-paper/20 p-4">
              <strong className="block text-paper">Hand-built visuals</strong>
              Every diagram, route map and illustration is original SVG/CSS. No stock photos, templates or pre-assembled UI kits.
            </li>
            <li className="rounded-xl border border-paper/20 p-4">
              <strong className="block text-paper">Libraries for primitives only</strong>
              Frameworks provide routing and styling tools; the icons come from the open-source Lucide set. Layouts are ours.
            </li>
          </ul>
        </section>

        {/* 2. Content sources */}
        <section id="content-sources" aria-labelledby="content-title">
          <SectionTitle id="content-title" eyebrow="Content sources" title="Where our facts come from" />
          <p className="mt-2 max-w-3xl text-ink-2">
            Lesson text, examples, quiz questions and interactive labs were written by our team. The sources below support the factual
            statements in the lessons; each lesson lists the sources it relies on. Citations follow MLA 9 style.
          </p>
          <StatusLegend />
          <ol className="mt-5 space-y-3">
            {CONTENT_SOURCES.map((source) => (
              <SourceItem key={source.id} source={source} />
            ))}
          </ol>
        </section>

        {/* 3. Media */}
        <section id="media-sources" aria-labelledby="media-title">
          <SectionTitle id="media-title" eyebrow="Image / media sources" title="Images, icons & fonts" />
          <div role="region" aria-label="Media credits (scrollable table)" tabIndex={0} className="mt-5 overflow-x-auto rounded-2xl border-2 border-ink bg-surface">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">Media credits</caption>
              <thead className="bg-paper-2 font-display">
                <tr>
                  <th scope="col" className="px-4 py-3">Asset</th>
                  <th scope="col" className="px-4 py-3">Creator</th>
                  <th scope="col" className="px-4 py-3">License</th>
                  <th scope="col" className="px-4 py-3">Used for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {MEDIA_CREDITS.map((credit) => (
                  <tr key={credit.name} className="align-top">
                    <th scope="row" className="px-4 py-3 font-bold">
                      {credit.url ? <ExternalA href={credit.url}>{credit.name}</ExternalA> : credit.name}
                    </th>
                    <td className="px-4 py-3">{credit.creator}</td>
                    <td className="px-4 py-3 font-mono">{credit.license}</td>
                    <td className="px-4 py-3 text-ink-2">{credit.usedFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Technology */}
        <section id="technologies" aria-labelledby="tech-title">
          <SectionTitle id="tech-title" eyebrow="Software / technologies" title="Technology & frameworks" />
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TECHNOLOGIES.map((tech) => (
              <li key={tech.name} className="flex flex-col rounded-2xl border-2 border-ink bg-surface p-4">
                <p className="flex items-baseline justify-between gap-2">
                  <ExternalA href={tech.url} className="font-display text-lg font-bold">
                    {tech.name}
                  </ExternalA>
                  <span className="font-mono text-xs text-ink-3">v{tech.version}</span>
                </p>
                <p className="mt-1 flex-1 text-sm text-ink-2">{tech.role}</p>
                <p className="mt-2 font-mono text-xs">License: {tech.license}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-ink-2">
            No external AI service or API is used. Every “AI” you see in the labs is a small, deterministic simulation written by our team so the
            site works offline and gives the same result every time.
          </p>
        </section>

        {/* 5. Standards & competition */}
        <section id="standards" aria-labelledby="standards-title">
          <SectionTitle id="standards-title" eyebrow="Standards & competition" title="Guidelines we followed" />
          <StatusLegend />
          <ol className="mt-5 space-y-3">
            {PROJECT_SOURCES.map((source) => (
              <SourceItem key={source.id} source={source} />
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}

function SectionTitle({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div>
      <p className="eyebrow text-ink-3">{eyebrow}</p>
      <h2 id={id} className="mt-1 text-display-md font-extrabold">
        {title}
      </h2>
    </div>
  );
}

function StatusLegend() {
  return (
    <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2">
      <span className="flex items-center gap-1.5">
        <BadgeCheck aria-hidden className="size-4 text-emerald-ink" /> Link checked on the date shown
      </span>
      <span className="flex items-center gap-1.5">
        <CircleAlert aria-hidden className="size-4 text-tangerine-ink" /> Team must confirm before submission
      </span>
    </p>
  );
}

function SourceItem({ source }: { source: Source }) {
  const status =
    source.status === "checked"
      ? { icon: <BadgeCheck aria-hidden className="size-4" />, text: `Checked ${source.accessed ? formatAccessed(source.accessed) : ""}`, cls: "bg-emerald-soft text-emerald-ink" }
      : source.status === "verify"
        ? { icon: <CircleAlert aria-hidden className="size-4" />, text: "Verify before submission", cls: "bg-tangerine-soft text-tangerine-ink" }
        : { icon: <FileWarning aria-hidden className="size-4" />, text: "SOURCE NEEDED", cls: "bg-danger-soft text-danger" };

  return (
    <li id={source.id} className="scroll-mt-24 rounded-2xl border-2 border-rule bg-surface p-4 target:border-ink target:bg-sun-soft sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-paper-2 px-2.5 py-0.5 font-mono text-xs font-bold">{source.kind}</span>
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold", status.cls)}>
          {status.icon}
          {status.text}
        </span>
      </div>
      {/* MLA-style citation */}
      <p className="mt-2 leading-relaxed">
        {source.creator}. “{source.title}.” {source.container && <i>{source.container}</i>}
        {source.year ? `, ${source.year}` : ""}
        {source.url && (
          <>
            , <ExternalA href={source.url} className="break-all">{source.url.replace(/^https?:\/\//, "")}</ExternalA>
          </>
        )}
        .{source.accessed && ` Accessed ${formatAccessed(source.accessed)}.`}
      </p>
      <p className="mt-1.5 text-sm text-ink-2">
        <strong className="text-ink">Used for:</strong> {source.usedFor}
      </p>
    </li>
  );
}

function ExternalA({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("text-cobalt-ink underline underline-offset-2 hover:text-ink", className)}>
      {children}
      <ExternalLink aria-hidden className="ml-1 inline size-3.5 align-baseline" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
