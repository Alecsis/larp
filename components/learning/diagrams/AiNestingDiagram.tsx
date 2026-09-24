const FONT = "var(--font-atkinson), sans-serif";

const LAYERS = [
  { x: 8, y: 8, w: 624, h: 384, fill: "#f6f4ee", stroke: "#111a33", title: "Artificial Intelligence", example: "Any technique for “smart” tasks — e.g. a rule-based game opponent" },
  { x: 36, y: 84, w: 568, h: 292, fill: "#e2e8ff", stroke: "#2b50d8", title: "Machine Learning", example: "Learns patterns from data — e.g. spam filters" },
  { x: 64, y: 160, w: 512, h: 200, fill: "#ffe8d4", stroke: "#f2711c", title: "Deep Learning", example: "Many-layered neural networks — e.g. face unlock" },
  { x: 92, y: 236, w: 456, h: 108, fill: "#d7f2e6", stroke: "#12976e", title: "Generative AI", example: "Creates new content — e.g. LLM chatbots, image generators" },
];

/** AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI */
export function AiNestingDiagram() {
  return (
    <svg viewBox="0 0 640 400" className="h-auto w-full" role="img" aria-labelledby="ai-nesting-title ai-nesting-desc">
      <title id="ai-nesting-title">How AI, machine learning, deep learning and generative AI fit together</title>
      <desc id="ai-nesting-desc">
        Four nested boxes. Artificial intelligence is the largest. Inside it is machine learning, inside that is deep
        learning, and inside that is generative AI, which includes large language models.
      </desc>
      {LAYERS.map((layer) => (
        <g key={layer.title}>
          <rect x={layer.x} y={layer.y} width={layer.w} height={layer.h} rx={18} fill={layer.fill} stroke={layer.stroke} strokeWidth={2.5} />
          <text x={layer.x + 20} y={layer.y + 32} fontFamily={FONT} fontSize={20} fontWeight={700} fill="#111a33">
            {layer.title}
          </text>
          <text x={layer.x + 20} y={layer.y + 55} fontFamily={FONT} fontSize={14} fill="#3a4360">
            {layer.example}
          </text>
        </g>
      ))}
    </svg>
  );
}
