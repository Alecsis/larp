"use client";

import { Info } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

/**
 * A simplified, rule-based imitation of subword tokenization.
 * Real tokenizers are learned from data; this one uses a few hand-written
 * rules so students can see the *idea*: common words stay whole, long or
 * rare words get split into pieces, and spaces/punctuation count too.
 */

const DEFAULT_TEXT = "Tokenization is unbelievably important for understanding chatbots!";

const COMMON = new Set([
  "the", "a", "an", "is", "are", "was", "to", "and", "of", "in", "it", "you", "that", "for", "on", "with", "as",
  "this", "be", "at", "or", "how", "what", "why", "ai", "learn", "model", "school", "student", "students",
  "important", "because", "people", "computer", "question", "answer", "about", "think", "write", "study",
  "always", "never", "every", "their", "there", "which", "would", "could", "should", "really", "things", "answers",
]);
const PREFIXES = ["inter", "over", "pre", "dis", "un", "re"];
const SUFFIXES = ["ization", "tion", "ness", "ment", "able", "ably", "ing", "est", "ly", "ed", "er", "s"];

function splitWord(word: string): string[] {
  const lower = word.toLowerCase();
  if (word.length <= 5 || COMMON.has(lower)) return [word];

  let rest = word;
  let prefix = "";
  for (const p of PREFIXES) {
    if (lower.startsWith(p) && word.length - p.length >= 4) {
      prefix = word.slice(0, p.length);
      rest = word.slice(p.length);
      break;
    }
  }
  let suffix = "";
  for (const s of SUFFIXES) {
    if (rest.toLowerCase().endsWith(s) && rest.length - s.length >= 3) {
      suffix = rest.slice(rest.length - s.length);
      rest = rest.slice(0, rest.length - s.length);
      break;
    }
  }
  const middle: string[] = [];
  if (rest.length <= 6 || COMMON.has(rest.toLowerCase())) middle.push(rest);
  else for (let i = 0; i < rest.length; i += 4) middle.push(rest.slice(i, i + 4));

  return [prefix, ...middle, suffix].filter(Boolean);
}

export function tokenize(text: string): string[] {
  const pieces = text.match(/\s*[A-Za-z]+|\s*\d{1,3}|\s*[^\sA-Za-z\d]|\s+/g) ?? [];
  return pieces.flatMap((piece) => {
    const match = piece.match(/^(\s*)([A-Za-z]+)$/);
    if (!match) return [piece];
    const parts = splitWord(match[2]);
    parts[0] = match[1] + parts[0];
    return parts;
  });
}

/** Deterministic "token ID" (FNV-1a hash) — real IDs come from a vocabulary list. */
function tokenId(token: string): number {
  let hash = 2166136261;
  for (let i = 0; i < token.length; i++) {
    hash ^= token.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % 50000;
}

const CHIP_COLORS = [
  "bg-cobalt-soft border-cobalt",
  "bg-tangerine-soft border-tangerine",
  "bg-emerald-soft border-emerald",
  "bg-sun-soft border-ink-3",
];

const showSpaces = (token: string) => token.replace(/ /g, "·").replace(/\n/g, "↵").replace(/\t/g, "→");

export function TokenizerDemo() {
  const markTried = useDemoTracker("tokenizer");
  const id = useId();
  const [text, setText] = useState(DEFAULT_TEXT);
  const [showIds, setShowIds] = useState(false);

  const tokens = tokenize(text);
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <DemoFrame
      title="Token Vision"
      instructions="Type anything in the box. Each colored chip is one token — the chunk a language model actually reads. A “·” marks a space that belongs to the token."
      takeaway="Language models don't read letters or whole words — they read tokens, and each token is really a number. Common words are usually one token; long or unusual words get split into pieces."
    >
      <label htmlFor={`${id}-text`} className="text-sm font-bold">
        Your text
      </label>
      <textarea
        id={`${id}-text`}
        value={text}
        maxLength={280}
        rows={3}
        onChange={(e) => {
          markTried();
          setText(e.target.value);
        }}
        className="mt-1 w-full resize-y rounded-lg border-2 border-ink bg-surface p-3 text-base"
      />

      <dl aria-live="polite" className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Characters", value: text.length },
          { label: "Words", value: words },
          { label: "Tokens", value: tokens.length },
        ].map((stat) => (
          <div key={stat.label} className={cn("rounded-lg border p-2", stat.label === "Tokens" ? "border-ink bg-sun-soft" : "border-rule bg-paper")}>
            <dt className="eyebrow text-ink-3">{stat.label}</dt>
            <dd className="font-display text-2xl font-bold">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow text-ink-3">{showIds ? "What the model receives" : "Tokens"}</p>
        <button
          type="button"
          aria-pressed={showIds}
          onClick={() => {
            markTried();
            setShowIds((v) => !v);
          }}
          className={cn(
            "min-h-9 rounded-lg border-2 px-3 text-sm font-bold transition-colors",
            showIds ? "border-ink bg-ink text-paper" : "border-ink bg-surface text-ink hover:bg-paper-2",
          )}
        >
          Show token IDs
        </button>
      </div>

      <ol aria-label="Tokens" className="mt-2 flex min-h-12 flex-wrap gap-1.5 rounded-lg border border-rule bg-paper p-3">
        {tokens.length === 0 && <li className="text-sm text-ink-3">Type something to see its tokens.</li>}
        {tokens.map((token, i) => (
          <li
            key={i}
            className={cn("rounded-md border px-1.5 py-0.5 font-mono text-sm whitespace-pre", CHIP_COLORS[i % CHIP_COLORS.length])}
          >
            {showIds ? tokenId(token) : showSpaces(token)}
          </li>
        ))}
      </ol>

      <p className="mt-3 flex gap-2 text-sm text-ink-2">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
        <span>
          Real models use tokenizers learned from huge amounts of text; this is a simplified imitation. The token IDs here
          are made up too, but the idea is real: to a model, your sentence is a list of numbers.
        </span>
      </p>
    </DemoFrame>
  );
}
