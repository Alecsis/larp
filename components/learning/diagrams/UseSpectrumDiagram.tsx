import { CircleCheck, CircleX, TriangleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The AI-use "traffic light" for schoolwork. Built with HTML/CSS instead of
 * SVG so the text reflows and stays readable on phones.
 */
const ZONES: {
  label: string;
  heading: string;
  icon: LucideIcon;
  bar: string;
  tint: string;
  text: string;
  examples: string[];
}[] = [
  {
    label: "Green",
    heading: "Usually OK (check your class policy)",
    icon: CircleCheck,
    bar: "bg-emerald",
    tint: "bg-emerald-soft",
    text: "text-emerald-ink",
    examples: ["Brainstorming ideas", "Explaining a concept a new way", "Quizzing yourself before a test"],
  },
  {
    label: "Yellow",
    heading: "Ask first & disclose",
    icon: TriangleAlert,
    bar: "bg-sun",
    tint: "bg-sun-soft",
    text: "text-ink",
    examples: ["Editing suggestions on your writing", "Help building an outline", "Feedback on a draft"],
  },
  {
    label: "Red",
    heading: "Not OK",
    icon: CircleX,
    bar: "bg-danger",
    tint: "bg-danger-soft",
    text: "text-danger",
    examples: ["Submitting AI-written work as your own", "Making up or fabricating sources"],
  },
];

export function UseSpectrumDiagram() {
  return (
    <div role="group" aria-label="Traffic-light spectrum of AI use in schoolwork, from usually OK to not OK">
      <div aria-hidden className="flex h-3 overflow-hidden rounded-full border-2 border-ink">
        {ZONES.map((zone) => (
          <span key={zone.label} className={cn("flex-1", zone.bar)} />
        ))}
      </div>
      <div aria-hidden className="mt-1 flex justify-between text-xs font-bold text-ink-3">
        <span>More acceptable</span>
        <span>Less acceptable</span>
      </div>

      <ol className="mt-3 grid gap-3 sm:grid-cols-3">
        {ZONES.map((zone) => {
          const Icon = zone.icon;
          return (
            <li key={zone.label} className={cn("rounded-xl border-2 border-ink p-3 sm:p-4", zone.tint)}>
              <p className={cn("flex items-center gap-1.5 font-display text-lg font-bold", zone.text)}>
                <Icon aria-hidden className="size-5 shrink-0" />
                {zone.label}
              </p>
              <p className="mt-0.5 text-sm font-bold text-ink">{zone.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-2">
                {zone.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
