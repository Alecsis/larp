"use client";

import { useId, useState } from "react";
import { tokenize } from "@/components/learning/demos/TokenizerDemo";
import { cn } from "@/lib/cn";

const CHIP_COLORS = ["bg-cobalt-soft", "bg-tangerine-soft", "bg-emerald-soft", "bg-sun-soft"];

/** A tiny "see what a language model sees" teaser for the home page. */
export function MiniTokenizer() {
  const [text, setText] = useState("Chatbots predict words. Unbelievably fluent ≠ always right!");
  const id = useId();
  const tokens = tokenize(text.slice(0, 160));

  return (
    <div className="rounded-2xl border-2 border-ink bg-surface p-4 shadow-pop sm:p-5">
      <label htmlFor={id} className="eyebrow text-ink-2">
        Type anything — see it the way a language model does
      </label>
      <input
        id={id}
        value={text}
        maxLength={160}
        onChange={(event) => setText(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-lg border-2 border-ink bg-paper px-3 font-mono"
      />
      <p className="mt-3 flex flex-wrap gap-1" aria-label={`${tokens.length} tokens`}>
        {tokens.map((token, i) => (
          <span key={i} className={cn("rounded-md border border-ink/20 px-1.5 py-0.5 font-mono text-sm whitespace-pre", CHIP_COLORS[i % CHIP_COLORS.length])}>
            {token.replace(/ /g, "·")}
          </span>
        ))}
      </p>
      <p className="mt-3 text-sm text-ink-2" aria-live="polite">
        <strong className="text-ink">{tokens.length} tokens</strong> from {text.trim() ? text.trim().split(/\s+/).length : 0} words. Models
        read and write in these chunks, not whole words. <span className="text-ink-3">(Simplified imitation.)</span>
      </p>
    </div>
  );
}
