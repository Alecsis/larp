"use client";

import { FlaskConical, Lightbulb } from "lucide-react";
import { useCallback, useRef, type ReactNode } from "react";
import { recordDemoTry } from "@/lib/progress/actions";
import type { DemoId } from "@/types/content";

/**
 * The shared "lab bench" wrapper around every interactive demo, so all labs
 * look and behave the same: a header, instructions, the lab itself, and a
 * "what to notice" takeaway.
 */
export function DemoFrame({
  title,
  instructions,
  takeaway,
  children,
}: {
  title: string;
  instructions: string;
  takeaway: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={`Interactive lab: ${title}`}
      className="not-prose my-8 overflow-hidden rounded-2xl border-2 border-ink bg-surface shadow-pop"
    >
      <header className="border-b-2 border-ink bg-sun-soft px-4 py-3 sm:px-5">
        <p className="eyebrow flex items-center gap-1.5 text-ink-2">
          <FlaskConical aria-hidden className="size-4" /> Interactive lab
        </p>
        <h3 className="mt-1 text-xl font-bold">{title}</h3>
        <p className="mt-1 text-[0.95rem] text-ink-2">{instructions}</p>
      </header>
      <div className="p-4 sm:p-5">{children}</div>
      <footer className="flex gap-2 border-t border-rule bg-paper px-4 py-3 text-sm text-ink-2 sm:px-5">
        <Lightbulb aria-hidden className="mt-0.5 size-4 shrink-0 text-tangerine-ink" />
        <p>
          <strong className="text-ink">What to notice:</strong> {takeaway}
        </p>
      </footer>
    </section>
  );
}

/**
 * Returns a function to call on the student's first real interaction with a
 * lab. It awards "lab explored" XP once (repeat calls do nothing).
 */
export function useDemoTracker(demoId: DemoId): () => void {
  const done = useRef(false);
  return useCallback(() => {
    if (done.current) return;
    done.current = true;
    recordDemoTry(demoId);
  }, [demoId]);
}
