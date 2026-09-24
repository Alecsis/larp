"use client";

import { AlertTriangle, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

/**
 * "Leaf Doctor": a pretend plant-disease spotter. Each training dataset the
 * student includes adds (or removes) simulated accuracy for each kind of
 * test photo. The numbers are hand-picked to illustrate the idea — they are
 * not from a real model.
 */

type Group = "daylight" | "lowLight" | "blurry" | "varieties";

const GROUPS: { id: Group; name: string }[] = [
  { id: "daylight", name: "Bright daylight photos" },
  { id: "lowLight", name: "Low-light photos" },
  { id: "blurry", name: "Blurry phone photos" },
  { id: "varieties", name: "Unfamiliar plant varieties" },
];

interface Dataset {
  id: string;
  name: string;
  detail: string;
  photos: number;
  effect: Record<Group, number>;
  warning?: boolean;
}

const DATASETS: Dataset[] = [
  { id: "daylight", name: "Sunny garden photos", detail: "Clear, well-lit leaves", photos: 1200, effect: { daylight: 38, lowLight: 8, blurry: 6, varieties: 5 } },
  { id: "lowLight", name: "Indoor & evening photos", detail: "Dim, shadowy lighting", photos: 500, effect: { daylight: 4, lowLight: 34, blurry: 4, varieties: 2 } },
  { id: "blurry", name: "Quick phone snapshots", detail: "Shaky and out of focus", photos: 400, effect: { daylight: 2, lowLight: 4, blurry: 32, varieties: 2 } },
  { id: "varieties", name: "Plants from other regions", detail: "Many different leaf shapes", photos: 600, effect: { daylight: 4, lowLight: 3, blurry: 3, varieties: 33 } },
  { id: "duplicates", name: "Copies of the sunny photos", detail: "Same pictures, saved twice", photos: 1200, effect: { daylight: 1, lowLight: 0, blurry: 0, varieties: 0 } },
  { id: "mislabeled", name: "Rushed batch (many wrong labels)", detail: "Sick leaves marked “healthy”", photos: 300, effect: { daylight: -12, lowLight: -12, blurry: -12, varieties: -12 }, warning: true },
];

const BASELINE = 50; // two answers (healthy / sick) → guessing is right about half the time

function accuracyFor(selected: Set<string>, group: Group): number {
  if (selected.size === 0) return BASELINE;
  const total = DATASETS.filter((d) => selected.has(d.id)).reduce((sum, d) => sum + d.effect[group], BASELINE);
  return Math.max(BASELINE - 10, Math.min(97, total));
}

function barColor(value: number) {
  if (value >= 85) return "bg-emerald";
  if (value >= 70) return "bg-sun";
  return "bg-danger";
}

export function TrainingDataDemo() {
  const markTried = useDemoTracker("training-data");
  const [selected, setSelected] = useState<Set<string>>(() => new Set(["daylight"]));

  function toggle(id: string) {
    markTried();
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const results = GROUPS.map((g) => ({ ...g, value: accuracyFor(selected, g.id) }));
  const overall = Math.round(results.reduce((sum, r) => sum + r.value, 0) / results.length);
  const photos = DATASETS.filter((d) => selected.has(d.id)).reduce((sum, d) => sum + d.photos, 0);
  const weakest = [...results].sort((a, b) => a.value - b.value)[0];

  let feedback: string;
  if (selected.size === 0) feedback = "No training data at all — the model can only guess, so it's right about half the time.";
  else if (selected.has("mislabeled")) feedback = "Wrong labels teach the model wrong lessons. Every group got worse, even though you added more photos.";
  else if (weakest.value < 70) feedback = `Weak spot: ${weakest.name.toLowerCase()} (${weakest.value}%). The model has barely seen photos like these.`;
  else feedback = "Nice coverage! The model has seen every kind of photo it will be tested on.";

  return (
    <DemoFrame
      title="Data Diet"
      instructions="You're training “Leaf Doctor,” an app that spots sick plants from photos. Choose which datasets go into its training data and watch how well it does on each kind of test photo."
      takeaway="More photos isn't automatically better. Duplicates add nothing new, wrong labels make things worse, and any situation missing from the training data becomes a blind spot."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <fieldset>
          <legend className="eyebrow text-ink-3">Training datasets</legend>
          <ul className="mt-2 space-y-2">
            {DATASETS.map((d) => {
              const on = selected.has(d.id);
              return (
                <li key={d.id}>
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 transition-colors",
                      on ? "border-ink bg-cobalt-soft" : "border-rule bg-surface hover:border-ink-3",
                    )}
                  >
                    <input type="checkbox" checked={on} onChange={() => toggle(d.id)} className="mt-1 size-4 accent-cobalt" />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2 font-bold">
                        {d.name}
                        {d.warning && <AlertTriangle aria-label="Low quality" className="size-4 text-danger" />}
                      </span>
                      <span className="block text-sm text-ink-2">
                        {d.detail} · {d.photos.toLocaleString("en-US")} photos
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div>
          <p className="eyebrow text-ink-3">Test results (simulated)</p>
          <ul className="mt-2 space-y-3">
            {results.map((r) => (
              <li key={r.id}>
                <div className="flex justify-between gap-2 text-sm">
                  <span>{r.name}</span>
                  <span className="font-mono font-bold">{r.value}%</span>
                </div>
                <div aria-hidden className="mt-1 h-3 overflow-hidden rounded-full border border-ink bg-paper">
                  <div className={cn("h-full transition-[width] duration-500", barColor(r.value))} style={{ width: `${r.value}%` }} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-baseline justify-between rounded-lg border-2 border-ink bg-surface px-3 py-2">
            <span className="font-bold">Overall accuracy</span>
            <span className="font-display text-2xl font-bold">{overall}%</span>
          </div>
          <p className="mt-1 text-sm text-ink-3">{photos.toLocaleString("en-US")} training photos selected</p>

          <p aria-live="polite" className="mt-3 flex gap-2 rounded-lg bg-paper p-3 text-sm">
            {weakest.value >= 70 && !selected.has("mislabeled") && selected.size > 0 ? (
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-ink" />
            ) : (
              <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-tangerine-ink" />
            )}
            <span>{feedback}</span>
          </p>
        </div>
      </div>
    </DemoFrame>
  );
}
