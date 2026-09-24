/**
 * Small building blocks shared by our hand-made SVG diagrams:
 * a labeled box, an arrow, and the color palette (matches app/globals.css).
 */

export const C = {
  ink: "#111a33",
  ink2: "#3a4360",
  ink3: "#5a627a",
  paper: "#f6f4ee",
  surface: "#ffffff",
  rule: "#d8d3c4",
  cobalt: "#2b50d8",
  cobaltSoft: "#e2e8ff",
  tangerine: "#f2711c",
  tangerineSoft: "#ffe8d4",
  emerald: "#12976e",
  emeraldSoft: "#d7f2e6",
  sun: "#ffd84d",
  sunSoft: "#fff3c4",
  danger: "#b42318",
  dangerSoft: "#fde6e3",
} as const;

export const FONT = "var(--font-atkinson), ui-sans-serif, system-ui, sans-serif";
export const DISPLAY_FONT = "var(--font-bricolage), ui-sans-serif, system-ui, sans-serif";

/** A rounded box with 1+ centered lines of text. */
export function Box({
  x,
  y,
  w,
  h,
  lines,
  fill = C.surface,
  stroke = C.ink,
  textColor = C.ink,
  fontSize = 15,
  bold = false,
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  lines: string[];
  fill?: string;
  stroke?: string;
  textColor?: string;
  fontSize?: number;
  bold?: boolean;
  dashed?: boolean;
}) {
  const lineHeight = fontSize * 1.25;
  const startY = y + h / 2 - ((lines.length - 1) * lineHeight) / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
        strokeDasharray={dashed ? "6 5" : undefined}
      />
      <text
        x={x + w / 2}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={fontSize}
        fontWeight={bold ? 700 : 400}
        fill={textColor}
      >
        {lines.map((line, i) => (
          // 0.35em nudges text down so it looks vertically centered in every browser
          <tspan key={`${i}-${line}`} x={x + w / 2} y={startY + i * lineHeight + fontSize * 0.35}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

/** Arrowhead marker definition — give each SVG its own unique id. */
export function ArrowMarker({ id, color = C.ink }: { id: string; color?: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill={color} />
    </marker>
  );
}

export function Arrow({
  d,
  markerId,
  color = C.ink,
  dashed = false,
}: {
  /** SVG path, e.g. "M10,10 L100,10". */
  d: string;
  markerId: string;
  color?: string;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeDasharray={dashed ? "5 6" : undefined}
      markerEnd={`url(#${markerId})`}
    />
  );
}
