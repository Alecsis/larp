const FONT = "var(--font-atkinson), sans-serif";

interface Flow {
  x: number;
  title: string;
  inputs: [string, string];
  process: string;
  output: string;
  accent: string;
  soft: string;
}

const FLOWS: Flow[] = [
  { x: 10, title: "Traditional programming", inputs: ["Rules (by people)", "Data"], process: "Program runs", output: "Answers", accent: "#3a4360", soft: "#ece8dc" },
  { x: 330, title: "Machine learning", inputs: ["Data", "Answers (labels)"], process: "Training", output: "Rules (a model)", accent: "#2b50d8", soft: "#e2e8ff" },
];

function Box({ x, y, w, label, fill, stroke, bold, textFill = "#111a33" }: { x: number; y: number; w: number; label: string; fill: string; stroke: string; bold?: boolean; textFill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={48} rx={10} fill={fill} stroke={stroke} strokeWidth={2} />
      <text x={x + w / 2} y={y + 29} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={bold ? 700 : 400} fill={textFill}>
        {label}
      </text>
    </g>
  );
}

function Arrow({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <g stroke="#111a33" strokeWidth={2} fill="none">
      <line x1={x} y1={y1} x2={x} y2={y2 - 2} />
      <path d={`M ${x - 6} ${y2 - 9} L ${x} ${y2 - 1} L ${x + 6} ${y2 - 9}`} />
    </g>
  );
}

/** Side-by-side comparison: who writes the rules? */
export function RulesVsLearningDiagram() {
  return (
    <svg viewBox="0 0 640 340" className="h-auto w-full" role="img" aria-labelledby="rules-learning-title rules-learning-desc">
      <title id="rules-learning-title">Traditional programming compared with machine learning</title>
      <desc id="rules-learning-desc">
        In traditional programming, people write rules, the program applies them to data, and answers come out. In
        machine learning, data plus the correct answers (labels) go into training, and what comes out is a model — a
        set of learned rules.
      </desc>
      {FLOWS.map((flow) => {
        const mid = flow.x + 150;
        return (
          <g key={flow.title}>
            <rect x={flow.x} y={4} width={300} height={332} rx={16} fill="#ffffff" stroke="#d8d3c4" strokeWidth={1.5} />
            <text x={mid} y={36} textAnchor="middle" fontFamily={FONT} fontSize={17} fontWeight={700} fill={flow.accent}>
              {flow.title}
            </text>
            <Box x={flow.x + 8} y={56} w={132} label={flow.inputs[0]} fill={flow.soft} stroke={flow.accent} />
            <Box x={flow.x + 160} y={56} w={132} label={flow.inputs[1]} fill={flow.soft} stroke={flow.accent} />
            <text x={mid} y={85} textAnchor="middle" fontFamily={FONT} fontSize={16} fontWeight={700} fill="#111a33">
              +
            </text>
            <Arrow x={mid} y1={108} y2={150} />
            <Box x={flow.x + 60} y={152} w={180} label={flow.process} fill="#111a33" stroke="#111a33" textFill="#f6f4ee" bold />
            <Arrow x={mid} y1={204} y2={246} />
            <Box x={flow.x + 60} y={248} w={180} label={flow.output} fill="#fff3c4" stroke="#111a33" bold />
            <text x={mid} y={322} textAnchor="middle" fontFamily={FONT} fontSize={13} fill="#3a4360">
              {flow.x < 100 ? "People figure out the rules" : "The computer finds the rules"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
