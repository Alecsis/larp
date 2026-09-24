"use client";

import { Plus, RotateCcw } from "lucide-react";
import { useId, useMemo, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

/**
 * A k-nearest-neighbors classifier for songs (tempo × energy).
 * The model "predicts" a label by letting the 3 closest labeled examples vote.
 */

type Label = "workout" | "chill";
interface Point {
  x: number; // tempo 0–10
  y: number; // energy 0–10
  label: Label;
}

const LABELS: Record<Label, { name: string; fill: string; soft: string; text: string }> = {
  workout: { name: "Workout", fill: "#f2711c", soft: "#ffe8d4", text: "text-tangerine-ink" },
  chill: { name: "Chill", fill: "#2b50d8", soft: "#e2e8ff", text: "text-cobalt-ink" },
};

const SEED: Point[] = [
  { x: 8, y: 8.5, label: "workout" },
  { x: 7, y: 9, label: "workout" },
  { x: 9, y: 7, label: "workout" },
  { x: 2, y: 2, label: "chill" },
  { x: 3, y: 1, label: "chill" },
  { x: 1.5, y: 4, label: "chill" },
];

const K = 3;
const MAX = 10;
const SIZE = 300;
const GRID = 20;
const toSvgX = (x: number) => (x / MAX) * SIZE;
const toSvgY = (y: number) => SIZE - (y / MAX) * SIZE;
const snap = (v: number) => Math.min(MAX, Math.max(0, Math.round(v * 2) / 2));

function classify(points: Point[], x: number, y: number) {
  if (points.length === 0) return null;
  const nearest = points
    .map((p, i) => ({ p, i, d: (p.x - x) ** 2 + (p.y - y) ** 2 }))
    .sort((a, b) => a.d - b.d || a.i - b.i)
    .slice(0, K);
  const workoutVotes = nearest.filter((n) => n.p.label === "workout").length;
  const label: Label =
    workoutVotes * 2 > nearest.length ? "workout" : workoutVotes * 2 < nearest.length ? "chill" : nearest[0].p.label;
  return { label, votes: nearest.filter((n) => n.p.label === label).length, k: nearest.length };
}

export function ClassifierDemo() {
  const markTried = useDemoTracker("classifier");
  const id = useId();
  const [points, setPoints] = useState<Point[]>(SEED);
  const [label, setLabel] = useState<Label>("workout");
  const [probe, setProbe] = useState({ x: 5, y: 5 });

  const cells = useMemo(() => {
    const step = MAX / GRID;
    const out: { x: number; y: number; label: Label }[] = [];
    for (let gx = 0; gx < GRID; gx++) {
      for (let gy = 0; gy < GRID; gy++) {
        const result = classify(points, gx * step + step / 2, gy * step + step / 2);
        if (result) out.push({ x: gx * step, y: (gy + 1) * step, label: result.label });
      }
    }
    return out;
  }, [points]);

  const prediction = classify(points, probe.x, probe.y);

  function addPoint(x: number, y: number) {
    markTried();
    setPoints((prev) => [...prev, { x, y, label }]);
  }

  function handlePlotClick(event: MouseEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = snap(((event.clientX - rect.left) / rect.width) * MAX);
    const y = snap((1 - (event.clientY - rect.top) / rect.height) * MAX);
    addPoint(x, y);
  }

  function moveProbe(axis: "x" | "y", value: number) {
    markTried();
    setProbe((prev) => ({ ...prev, [axis]: value }));
  }

  return (
    <DemoFrame
      title="Train a Classifier"
      instructions="Pick a label, then click the chart (or use the sliders and “Add example”) to add labeled songs. The shaded background shows what the model would predict everywhere."
      takeaway="The model never learned a rule like “fast = workout.” It only compares new songs to the labeled examples you gave it — so adding examples, or mislabeling some, changes every prediction nearby."
    >
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)]">
        <div>
          <div className="flex gap-2">
            <p className="eyebrow self-center text-ink-3 [writing-mode:vertical-rl] rotate-180">Energy →</p>
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="h-auto w-full max-w-md cursor-crosshair touch-manipulation rounded-lg border-2 border-ink bg-surface"
              role="img"
              aria-label={`Scatter chart with ${points.length} labeled songs. Shaded regions show the model's predictions.`}
              onClick={handlePlotClick}
            >
              {cells.map((c) => (
                <rect
                  key={`${c.x}-${c.y}`}
                  x={toSvgX(c.x)}
                  y={toSvgY(c.y)}
                  width={SIZE / GRID + 0.5}
                  height={SIZE / GRID + 0.5}
                  fill={LABELS[c.label].soft}
                />
              ))}
              <line x1={toSvgX(probe.x)} x2={toSvgX(probe.x)} y1={0} y2={SIZE} stroke="#111a33" strokeDasharray="4 4" strokeOpacity={0.5} />
              <line y1={toSvgY(probe.y)} y2={toSvgY(probe.y)} x1={0} x2={SIZE} stroke="#111a33" strokeDasharray="4 4" strokeOpacity={0.5} />
              {points.map((p, i) =>
                p.label === "workout" ? (
                  <circle key={i} cx={toSvgX(p.x)} cy={toSvgY(p.y)} r={7} fill={LABELS.workout.fill} stroke="#111a33" strokeWidth={1.5} />
                ) : (
                  <rect key={i} x={toSvgX(p.x) - 6.5} y={toSvgY(p.y) - 6.5} width={13} height={13} fill={LABELS.chill.fill} stroke="#111a33" strokeWidth={1.5} />
                ),
              )}
              <g transform={`translate(${toSvgX(probe.x)} ${toSvgY(probe.y)})`}>
                <circle r={11} fill="#ffd84d" stroke="#111a33" strokeWidth={2} />
                <text textAnchor="middle" dy="4.5" fontSize="13" fontWeight="700" fill="#111a33" fontFamily="var(--font-atkinson), sans-serif">
                  ?
                </text>
              </g>
            </svg>
          </div>
          <p className="eyebrow mt-2 pl-7 text-ink-3">Tempo →</p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 pl-7 text-sm text-ink-2">
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="inline-block size-3 rounded-full border border-ink bg-tangerine" /> Workout example
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="inline-block size-3 border border-ink bg-cobalt" /> Chill example
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="inline-block size-3 rounded-full border border-ink bg-sun" /> Mystery song
            </span>
          </p>
        </div>

        <div className="space-y-4">
          <fieldset>
            <legend className="eyebrow text-ink-3">Label for new examples</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(Object.keys(LABELS) as Label[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={label === key}
                  onClick={() => setLabel(key)}
                  className={cn(
                    "min-h-10 rounded-lg border-2 px-3 text-sm font-bold transition-colors",
                    label === key ? "border-ink bg-ink text-paper" : "border-rule bg-surface text-ink hover:border-ink",
                  )}
                >
                  {LABELS[key].name}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="space-y-3">
            {(["x", "y"] as const).map((axis) => (
              <div key={axis}>
                <label htmlFor={`${id}-${axis}`} className="flex justify-between text-sm font-bold">
                  <span>Mystery song {axis === "x" ? "tempo" : "energy"}</span>
                  <span className="font-mono">{probe[axis].toFixed(1)}</span>
                </label>
                <input
                  id={`${id}-${axis}`}
                  type="range"
                  min={0}
                  max={MAX}
                  step={0.5}
                  value={probe[axis]}
                  onChange={(e) => moveProbe(axis, Number(e.target.value))}
                  className="mt-1 w-full accent-cobalt"
                />
              </div>
            ))}
            <Button variant="secondary" size="sm" className="w-full" onClick={() => addPoint(probe.x, probe.y)}>
              <Plus aria-hidden className="size-4" /> Add {LABELS[label].name} example at the “?”
            </Button>
          </div>

          <div aria-live="polite" className="rounded-lg border border-rule bg-paper p-3">
            <p className="eyebrow text-ink-3">Model prediction</p>
            {prediction ? (
              <p className="mt-1 text-sm">
                The mystery song looks like{" "}
                <strong className={cn("text-base", LABELS[prediction.label].text)}>{LABELS[prediction.label].name}</strong> —{" "}
                {prediction.votes} of {prediction.k} nearest examples agree
                {prediction.votes === prediction.k ? " (confident)." : " (unsure)."}
              </p>
            ) : (
              <p className="mt-1 text-sm">No examples yet — the model has nothing to compare against.</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-ink-2">{points.length} training examples</p>
            <Button variant="ghost" size="sm" onClick={() => setPoints(SEED)}>
              <RotateCcw aria-hidden className="size-4" /> Reset examples
            </Button>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
