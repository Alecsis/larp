"use client";

import { getModules, lessonKey } from "@/lib/content";
import { useProgressStats } from "@/lib/progress/hooks";
import { useHydrated, useProgress } from "@/lib/progress/store";
import { LINE_STYLES } from "@/lib/line-colors";
import { cn } from "@/lib/cn";

/*
 * THE ROUTE MAP — Tokenline's signature graphic.
 * Three colored lines (modules) with one station per lesson, all meeting at
 * the "AI Scholar" terminal (the Final Challenge). Completed stations fill in
 * with the line color, so the map doubles as a progress display.
 *
 * Geometry: each line runs horizontally through its stations, then bends
 * toward the shared terminal on the right.
 */
const WIDTH = 720;
const HEIGHT = 330;
const TERMINAL = { x: 640, y: 165 };
const LANE_Y = [60, 165, 270];
const STATION_X0 = 70;
const STATION_GAP = 62;

export function RouteMap({ className, showYouAreHere = true }: { className?: string; showYouAreHere?: boolean }) {
  const modules = getModules();
  const progress = useProgress();
  const stats = useProgressStats();
  const hydrated = useHydrated();

  const summary = modules
    .map((module) => {
      const done = module.lessons.filter((lesson) => progress.lessons[lessonKey(lesson)]).length;
      return `${module.title}: ${done} of ${module.lessons.length} lessons complete`;
    })
    .join("; ");

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={`Route map of the three learning lines meeting at the AI Scholar final challenge. ${hydrated ? summary : ""}`}
    >
      {modules.map((module, lane) => {
        const y = LANE_Y[lane];
        const lastX = STATION_X0 + STATION_GAP * (module.lessons.length - 1);
        const bendX = lastX + 40;
        const path = `M 30 ${y} H ${bendX} L ${TERMINAL.x - 40} ${TERMINAL.y} H ${TERMINAL.x}`;
        const hex = LINE_STYLES[module.color].hex;
        return (
          <g key={module.id}>
            {/* soft "track bed" under the line */}
            <path d={path} fill="none" stroke="#ece8dc" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d={path}
              fill="none"
              stroke={hex}
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1200"
              className="motion-safe:animate-draw"
              style={{ animationDelay: `${lane * 180}ms` }}
            />
            {module.lessons.map((lesson, i) => {
              const done = hydrated && Boolean(progress.lessons[lessonKey(lesson)]);
              const isNext = hydrated && showYouAreHere && stats.nextLesson?.id === lesson.id;
              const x = STATION_X0 + STATION_GAP * i;
              return (
                <g key={lesson.id}>
                  {isNext && <circle cx={x} cy={y} r="20" fill="none" stroke="#ffd84d" strokeWidth="6" />}
                  <circle cx={x} cy={y} r="12" fill={done ? hex : "#ffffff"} stroke={done ? "#111a33" : hex} strokeWidth="4" />
                  {done && <path d={`M ${x - 5} ${y} l 3.5 3.5 l 6.5 -7`} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Terminal: AI Scholar */}
      <circle cx={TERMINAL.x} cy={TERMINAL.y} r="30" fill="#111a33" />
      <circle cx={TERMINAL.x} cy={TERMINAL.y} r="20" fill="#f6f4ee" stroke="#ffd84d" strokeWidth="6" />
      <path
        d={`M ${TERMINAL.x - 9} ${TERMINAL.y + 1} L ${TERMINAL.x} ${TERMINAL.y - 6} L ${TERMINAL.x + 9} ${TERMINAL.y + 1} M ${TERMINAL.x - 5} ${TERMINAL.y + 2} v 5 h 10 v -5`}
        fill="none"
        stroke="#111a33"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <text x={TERMINAL.x} y={TERMINAL.y + 56} textAnchor="middle" fontSize="17" fontWeight="700" fill="#111a33" fontFamily="var(--font-bricolage), sans-serif">
        AI Scholar
      </text>
      <text x={TERMINAL.x} y={TERMINAL.y + 76} textAnchor="middle" fontSize="13" fill="#3a4360" fontFamily="var(--font-atkinson), sans-serif">
        Final Challenge
      </text>
    </svg>
  );
}
