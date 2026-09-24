"use client";

import { CalendarCheck, CircleSlash } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { DemoFrame, useDemoTracker } from "./DemoFrame";

/*
 * A fictional internship screener. It "learned" from 10 years of past picks
 * that mostly came from Northside High, so it rewards anything that looks
 * like Northside. Schools, zip codes and applicants are all invented.
 */
type School = "Northside" | "Southside";

interface Applicant {
  name: string;
  school: School;
  zip: string;
  /** Qualification score from coursework + projects — the thing that SHOULD matter. */
  qualifications: number;
}

const APPLICANTS: Applicant[] = [
  { name: "Ava R.", school: "Northside", zip: "40110", qualifications: 70 },
  { name: "Jordan M.", school: "Southside", zip: "40220", qualifications: 70 },
  { name: "Priya K.", school: "Northside", zip: "40110", qualifications: 78 },
  { name: "Marcus T.", school: "Southside", zip: "40220", qualifications: 78 },
  { name: "Lena O.", school: "Northside", zip: "40110", qualifications: 64 },
  { name: "Diego S.", school: "Southside", zip: "40220", qualifications: 64 },
];

const INTERVIEW_CUTOFF = 75;
/** How much the skewed training data taught the model to reward/penalize each school. */
const SCHOOL_SKEW: Record<School, number> = { Northside: 15, Southside: -10 };
/** Zip code is a *proxy*: it lines up with school, so the model can learn nearly the same skew from it. */
const ZIP_SKEW: Record<School, number> = { Northside: 12, Southside: -8 };

interface Settings {
  removeSchool: boolean;
  keepZip: boolean;
  balanced: boolean;
}

function scoreApplicant(applicant: Applicant, s: Settings): number {
  if (s.balanced) return applicant.qualifications;
  if (!s.removeSchool) return applicant.qualifications + SCHOOL_SKEW[applicant.school];
  return applicant.qualifications + (s.keepZip ? ZIP_SKEW[applicant.school] : 0);
}

function explain(s: Settings): string {
  if (s.balanced)
    return "Retrained on balanced data, the model has no skewed pattern to copy. Equal qualifications now get equal scores.";
  if (!s.removeSchool)
    return "The model copies the pattern in its training data: past picks were mostly from Northside, so Northside applicants get a boost even with identical qualifications.";
  if (s.keepZip)
    return "The school column is gone, but zip code still reveals which school each applicant attends. The model learned almost the same bias through this proxy.";
  return "With both school and zip code removed, scores depend only on qualifications. But hiding columns isn't a full fix — other proxies can hide in data, which is why retraining on better data and testing results matter.";
}

const TOGGLES: { key: keyof Settings; label: string; help: string }[] = [
  { key: "removeSchool", label: "Remove the school column", help: "Delete the school name from the data" },
  { key: "keepZip", label: "Zip code still included", help: "Leave the applicant's zip code in the data" },
  { key: "balanced", label: "Retrain on balanced data", help: "Use past picks from both schools equally" },
];

export function BiasScreeningDemo() {
  const markTried = useDemoTracker("bias-screening");
  const [settings, setSettings] = useState<Settings>({ removeSchool: false, keepZip: true, balanced: false });

  const results = APPLICANTS.map((applicant) => {
    const score = scoreApplicant(applicant, settings);
    return { applicant, score, invited: score >= INTERVIEW_CUTOFF };
  });
  const invitedFrom = (school: School) => results.filter((r) => r.applicant.school === school && r.invited).length;
  const perSchool = APPLICANTS.length / 2;

  function toggle(key: keyof Settings) {
    markTried();
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <DemoFrame
      title="Biased Screener"
      instructions="A fictional summer-internship screener was trained on 10 years of past picks — most came from Northside High. Each pair of applicants below has identical qualifications. Try the fixes and watch the scores."
      takeaway="Models copy patterns in their training data, including unfair ones. Deleting a column isn't enough when proxies like zip code carry the same information — better data and testing outcomes by group are what fix it."
    >
      <fieldset className="grid gap-2 sm:grid-cols-3">
        <legend className="eyebrow mb-2 text-ink-3">Try a fix</legend>
        {TOGGLES.map((toggleDef) => {
          const disabled = toggleDef.key === "keepZip" && (!settings.removeSchool || settings.balanced);
          return (
            <label
              key={toggleDef.key}
              className={cn(
                "flex cursor-pointer gap-2.5 rounded-xl border-2 bg-surface p-3 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt",
                settings[toggleDef.key] ? "border-ink" : "border-rule",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <input
                type="checkbox"
                checked={settings[toggleDef.key]}
                disabled={disabled}
                onChange={() => toggle(toggleDef.key)}
                className="mt-1 size-4 shrink-0 accent-ink"
              />
              <span>
                <span className="block text-sm font-bold">{toggleDef.label}</span>
                <span className="block text-xs text-ink-3">{toggleDef.help}</span>
              </span>
            </label>
          );
        })}
      </fieldset>

      <div role="region" aria-label="Applicant scores (scrollable table)" tabIndex={0} className="mt-4 overflow-x-auto rounded-xl border border-rule">
        <table className="w-full min-w-[30rem] border-collapse bg-surface text-sm">
          <caption className="sr-only">Screener scores for six fictional applicants</caption>
          <thead className="bg-paper-2 text-left">
            <tr>
              <th scope="col" className="px-3 py-2">Applicant</th>
              <th scope="col" className="px-3 py-2">School · Zip</th>
              <th scope="col" className="px-3 py-2">Qualifications</th>
              <th scope="col" className="px-3 py-2">Model score</th>
              <th scope="col" className="px-3 py-2">Decision</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ applicant, score, invited }) => (
              <tr key={applicant.name} className="border-t border-rule">
                <th scope="row" className="px-3 py-2 text-left font-bold">{applicant.name}</th>
                <td className="px-3 py-2 text-ink-2">
                  {applicant.school} · {applicant.zip}
                </td>
                <td className="px-3 py-2 font-mono">{applicant.qualifications}</td>
                <td className="px-3 py-2">
                  <span className="flex items-center gap-2">
                    <span className="w-7 font-mono font-bold">{score}</span>
                    <span className="hidden h-2 w-20 overflow-hidden rounded-full bg-paper-2 sm:block" aria-hidden>
                      <span
                        className={cn("block h-full rounded-full", applicant.school === "Northside" ? "bg-cobalt" : "bg-tangerine")}
                        style={{ width: `${score}%` }}
                      />
                    </span>
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className={cn("inline-flex items-center gap-1 font-bold", invited ? "text-emerald-ink" : "text-ink-3")}>
                    {invited ? <CalendarCheck aria-hidden className="size-4" /> : <CircleSlash aria-hidden className="size-4" />}
                    {invited ? "Interview" : "Rejected"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-3">Interview cutoff: score of {INTERVIEW_CUTOFF} or higher.</p>

      <div aria-live="polite" className="mt-4 rounded-xl bg-paper p-3 sm:p-4">
        <p className="font-display text-lg font-bold">
          Interviews: Northside {invitedFrom("Northside")}/{perSchool} · Southside {invitedFrom("Southside")}/{perSchool}
        </p>
        <p className="mt-1 text-[0.95rem] text-ink-2">{explain(settings)}</p>
      </div>
    </DemoFrame>
  );
}
