import { ImageResponse } from "next/og";

/*
 * Generates the social-sharing preview image at build time (Next.js
 * built-in). Designed in code, like everything else on the site.
 */
export const alt = "Tokenline — The AI Learning Portal for high school students";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const lines = [
    { label: "Line 1 · AI Fundamentals", color: "#2b50d8" },
    { label: "Line 2 · AI Tools & Techniques", color: "#f2711c" },
    { label: "Line 3 · Ethical & Responsible AI", color: "#12976e" },
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f4ee",
          padding: 72,
          color: "#111a33",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4, color: "#3a4360" }}>TOKENLINE</div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, marginTop: 18, maxWidth: 900 }}>
            Learn how AI works. Then learn to use it well.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {lines.map((line) => (
            <div key={line.label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 220, height: 14, borderRadius: 7, background: line.color }} />
              <div style={{ width: 30, height: 30, borderRadius: 15, background: "#fff", border: `6px solid ${line.color}` }} />
              <div style={{ fontSize: 32, fontWeight: 700 }}>{line.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
