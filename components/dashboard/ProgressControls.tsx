"use client";

import { Database, RotateCcw, TriangleAlert } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { loadSampleProgress, resetAllProgress } from "@/lib/progress/actions";

/**
 * Demo tools for judges and presenters:
 *  - load a realistic "mid-journey" student to show a filled-in dashboard
 *  - reset everything back to zero
 * Both ask for confirmation with a native <dialog>, which handles focus
 * trapping and the Escape key for us in every modern browser.
 */
export function ProgressControls() {
  const resetDialog = useRef<HTMLDialogElement>(null);
  const sampleDialog = useRef<HTMLDialogElement>(null);

  return (
    <section aria-labelledby="controls-title" className="rounded-2xl border-2 border-dashed border-ink/50 bg-paper p-5">
      <h2 id="controls-title" className="font-display text-xl font-bold">
        Progress tools
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-ink-2">
        Progress is saved in this browser only (localStorage) — no account needed. Presenting the site? Load sample progress to see every
        widget filled in, then reset when you&apos;re done.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => sampleDialog.current?.showModal()}>
          <Database aria-hidden className="size-4" /> Load sample progress
        </Button>
        <Button variant="secondary" onClick={() => resetDialog.current?.showModal()} className="hover:bg-danger-soft">
          <RotateCcw aria-hidden className="size-4" /> Reset progress
        </Button>
      </div>

      <ConfirmDialog
        dialogRef={resetDialog}
        title="Reset all progress?"
        body="This permanently clears your XP, completed lessons, quiz scores, badges and activity from this browser."
        confirmLabel="Yes, reset everything"
        onConfirm={resetAllProgress}
      />
      <ConfirmDialog
        dialogRef={sampleDialog}
        title="Load sample progress?"
        body="This replaces your current progress with a sample student who has finished Line 1 and part of Line 2. You can reset it afterwards."
        confirmLabel="Load sample"
        onConfirm={loadSampleProgress}
      />
    </section>
  );
}

function ConfirmDialog({
  dialogRef,
  title,
  body,
  confirmLabel,
  onConfirm,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  title: string;
  body: string;
  confirmLabel: string;
  onConfirm: () => void;
}) {
  const titleId = `${confirmLabel.replace(/\W+/g, "-").toLowerCase()}-title`;
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="m-auto w-[min(28rem,calc(100vw-2rem))] rounded-2xl border-2 border-ink bg-surface p-0 text-ink shadow-pop"
    >
      <form method="dialog" className="p-6">
        <p className="flex items-center gap-2">
          <TriangleAlert aria-hidden className="size-6 text-tangerine-ink" />
          <span id={titleId} className="font-display text-xl font-bold">
            {title}
          </span>
        </p>
        <p className="mt-2 text-ink-2">{body}</p>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          {/* Buttons inside <form method="dialog"> close the dialog automatically */}
          <Button type="submit" variant="ghost" autoFocus>
            Cancel
          </Button>
          <Button type="submit" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
