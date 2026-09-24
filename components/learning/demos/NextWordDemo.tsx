"use client";

import { FastForward, RotateCcw, Wand2 } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { DemoFrame, useDemoTracker } from "./DemoFrame";
import { HIGH_TEMPERATURE_RANKS, PROMPT, candidatesFor, isFinished } from "./data/next-word";

type Temperature = "low" | "high";

const joinWords = (words: string[]) =>
  words.reduce((text, word) => (word === "." || word === "!" ? text + word : `${text} ${word}`), "");

export function NextWordDemo() {
  const markTried = useDemoTracker("next-word");
  const headingId = useId();
  const [words, setWords] = useState<string[]>([]);
  const [temperature, setTemperature] = useState<Temperature>("low");
  const [autoPicks, setAutoPicks] = useState(0);
  const [lastPickNote, setLastPickNote] = useState("");

  const finished = isFinished(words);
  const candidates = finished ? [] : candidatesFor(words);

  function choose(word: string, note: string) {
    markTried();
    setWords((prev) => [...prev, word]);
    setLastPickNote(note);
  }

  /** Pick the next word automatically, following the temperature setting. */
  function pickNext(current: string[], pickIndex: number): { word: string; rank: number } | null {
    if (isFinished(current)) return null;
    const list = candidatesFor(current);
    if (list.length === 0) return null;
    const wanted = temperature === "low" ? 0 : HIGH_TEMPERATURE_RANKS[pickIndex % HIGH_TEMPERATURE_RANKS.length];
    const rank = Math.min(wanted, list.length - 1);
    return { word: list[rank][0], rank };
  }

  function autoPick() {
    const pick = pickNext(words, autoPicks);
    if (!pick) return;
    setAutoPicks((n) => n + 1);
    choose(pick.word, pick.rank === 0 ? `Picked the most likely word: “${pick.word}”.` : `Picked a less likely word (#${pick.rank + 1} choice): “${pick.word}”.`);
  }

  function finishSentence() {
    markTried();
    let current = words;
    let picks = autoPicks;
    for (let guard = 0; guard < 12; guard++) {
      const pick = pickNext(current, picks);
      if (!pick) break;
      current = [...current, pick.word];
      picks += 1;
    }
    setWords(current);
    setAutoPicks(picks);
    setLastPickNote("Finished the sentence one word at a time.");
  }

  function reset() {
    setWords([]);
    setAutoPicks(0);
    setLastPickNote("");
  }

  return (
    <DemoFrame
      title="Next-Word Predictor"
      instructions="The model sees the prompt and scores possible next words. Click a word to add it, or let the model auto-pick. Try “high temperature” to see less likely choices."
      takeaway="An LLM writes by repeatedly choosing a likely next token — it doesn't check facts along the way. That's why answers can sound smooth and confident but still be wrong, and why the same prompt can give different answers."
    >
      <div aria-live="polite" className="rounded-xl border-2 border-ink bg-surface p-4">
        <p className="eyebrow text-ink-3">Text so far</p>
        <p className="mt-1 text-lg leading-relaxed">
          <span className="text-ink-2">{PROMPT}</span>
          {words.length > 0 && <mark className="rounded bg-cobalt-soft px-1 text-ink">{joinWords(words).trimStart()}</mark>}
          {!finished && <span aria-hidden className="ml-1 inline-block h-5 w-0.5 translate-y-1 animate-pulse bg-ink" />}
          {finished && words[words.length - 1] !== "." && words[words.length - 1] !== "!" && "…"}
        </p>
        {lastPickNote && <p className="mt-2 text-sm text-ink-2">{lastPickNote}</p>}
      </div>

      <div className="mt-4">
        <p id={headingId} className="eyebrow text-ink-3">
          {finished ? "Sentence complete" : "Next-word candidates (illustrative probabilities)"}
        </p>
        {!finished && (
          <ul aria-labelledby={headingId} className="mt-2 grid gap-2 sm:grid-cols-2">
            {candidates.map(([word, p], rank) => (
              <li key={word}>
                <button
                  type="button"
                  onClick={() => choose(word, `You chose “${word}” (#${rank + 1} choice).`)}
                  className="group w-full rounded-lg border-2 border-rule bg-surface p-2.5 text-left transition-colors hover:border-ink"
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-mono font-bold">{word}</span>
                    <span className="font-mono text-sm text-ink-2">{Math.round(p * 100)}%</span>
                  </span>
                  <span aria-hidden className="mt-1.5 block h-2 overflow-hidden rounded-full bg-paper-2">
                    <span
                      className={cn("block h-full rounded-full", rank === 0 ? "bg-cobalt" : "bg-ink-3")}
                      style={{ width: `${Math.max(3, p * 100)}%` }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Temperature" className="inline-flex rounded-lg border-2 border-ink p-0.5">
          {(["low", "high"] as const).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={temperature === t}
              onClick={() => {
                markTried();
                setTemperature(t);
              }}
              className={cn(
                "min-h-8 rounded-md px-3 text-sm font-bold",
                temperature === t ? "bg-ink text-paper" : "text-ink hover:bg-paper-2",
              )}
            >
              {t === "low" ? "Low temperature" : "High temperature"}
            </button>
          ))}
        </div>
        <Button size="sm" variant="secondary" onClick={autoPick} disabled={finished}>
          <Wand2 aria-hidden className="size-4" /> Auto-pick next word
        </Button>
        <Button size="sm" variant="secondary" onClick={finishSentence} disabled={finished}>
          <FastForward aria-hidden className="size-4" /> Finish sentence
        </Button>
        <Button size="sm" variant="ghost" onClick={reset} disabled={words.length === 0}>
          <RotateCcw aria-hidden className="size-4" /> Reset
        </Button>
      </div>
      <p className="mt-2 text-sm text-ink-3">
        {temperature === "low"
          ? "Low temperature: the model always takes its top-scoring word — predictable, sometimes bland."
          : "High temperature: the model sometimes takes less likely words — more variety, more chance of nonsense."}
      </p>
    </DemoFrame>
  );
}
