"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

type Entry = { term: string; definition: string; lessonTitle: string; href: string };

/** Searchable glossary built from every lesson's "Key terms" block. */
export function Glossary({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const q = query.trim().toLowerCase();
  const results = q ? entries.filter((e) => e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q)) : entries;

  return (
    <div>
      <label htmlFor={inputId} className="font-bold">
        Search {entries.length} terms
      </label>
      <div className="relative mt-1.5 max-w-md">
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-ink-3" />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="e.g. token, bias, hallucination"
          className="min-h-12 w-full rounded-xl border-2 border-ink bg-surface pr-3 pl-10 placeholder:text-ink-3"
        />
      </div>
      <p className="mt-2 text-sm text-ink-2" aria-live="polite">
        {q ? `${results.length} matching term${results.length === 1 ? "" : "s"}` : ""}
      </p>
      <dl className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {results.map((entry) => (
          <div key={entry.term} className="rounded-xl border border-rule bg-surface p-4">
            <dt className="font-display text-lg font-bold">{entry.term}</dt>
            <dd className="mt-1 text-[0.95rem] text-ink-2">
              {entry.definition}{" "}
              <Link href={entry.href} className="text-sm font-bold text-cobalt-ink underline underline-offset-2">
                From: {entry.lessonTitle}
              </Link>
            </dd>
          </div>
        ))}
      </dl>
      {results.length === 0 && <p className="mt-4 text-ink-2">No terms match “{query}”. Try a shorter word.</p>}
    </div>
  );
}
