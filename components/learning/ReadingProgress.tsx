"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A thin bar under the header that fills as the student scrolls through the
 * lesson. Purely visual (aria-hidden) — the real, saved progress is the
 * completion panel at the end of each lesson.
 */
export function ReadingProgress({ colorClass }: { colorClass: string }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setPercent(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 100);
    };
    // requestAnimationFrame keeps this to at most one update per frame.
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="sticky top-16 z-30 h-1.5 w-full bg-paper-2">
      <div className={cn("h-full", colorClass)} style={{ width: `${percent}%` }} />
    </div>
  );
}
