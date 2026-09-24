const FONT = "var(--font-atkinson), sans-serif";

const LAYERS = [
  { x: 110, label: "Inputs", ys: [110, 185, 260], fill: "#e2e8ff", stroke: "#2b50d8" },
  { x: 320, label: "Hidden layer", ys: [80, 155, 230, 305], fill: "#ffffff", stroke: "#111a33" },
  { x: 530, label: "Output", ys: [150, 240], fill: "#d7f2e6", stroke: "#12976e" },
];

// Hand-picked example weights: sign sets the color, size sets the thickness.
const WEIGHTS_IN = [
  [2.5, -1, 0.6, 3],
  [-2, 1.5, 3.5, -0.8],
  [1, -3, -1.2, 2],
];
const WEIGHTS_OUT = [
  [3, -1.2],
  [-0.8, 2.4],
  [1.6, 1],
  [-2.6, 3.2],
];

function Connections({ from, to, weights }: { from: (typeof LAYERS)[number]; to: (typeof LAYERS)[number]; weights: number[][] }) {
  return (
    <g>
      {from.ys.map((y1, i) =>
        to.ys.map((y2, j) => {
          const w = weights[i][j];
          return (
            <line
              key={`${i}-${j}`}
              x1={from.x}
              y1={y1}
              x2={to.x}
              y2={y2}
              stroke={w >= 0 ? "#2b50d8" : "#f2711c"}
              strokeWidth={0.8 + Math.abs(w) * 1.3}
              strokeOpacity={0.75}
            />
          );
        }),
      )}
    </g>
  );
}

/** A tiny neural network: 3 inputs → 4 hidden neurons → 2 outputs. */
export function NeuralNetworkDiagram() {
  return (
    <svg viewBox="0 0 640 400" className="h-auto w-full" role="img" aria-labelledby="nn-title nn-desc">
      <title id="nn-title">A small neural network</title>
      <desc id="nn-desc">
        Three input neurons connect to four hidden-layer neurons, which connect to two output neurons. Every connecting
        line is a weight. Thicker lines are stronger weights; blue lines are positive and orange lines are negative.
        Training adjusts these weights.
      </desc>
      <Connections from={LAYERS[0]} to={LAYERS[1]} weights={WEIGHTS_IN} />
      <Connections from={LAYERS[1]} to={LAYERS[2]} weights={WEIGHTS_OUT} />
      {LAYERS.map((layer) => (
        <g key={layer.label}>
          <text x={layer.x} y={36} textAnchor="middle" fontFamily={FONT} fontSize={16} fontWeight={700} fill="#111a33">
            {layer.label}
          </text>
          {layer.ys.map((y) => (
            <circle key={y} cx={layer.x} cy={y} r={20} fill={layer.fill} stroke={layer.stroke} strokeWidth={2.5} />
          ))}
        </g>
      ))}
      <g fontFamily={FONT} fontSize={13} fill="#3a4360">
        <line x1={24} y1={360} x2={54} y2={360} stroke="#2b50d8" strokeWidth={4} />
        <text x={60} y={365}>positive weight</text>
        <line x1={180} y1={360} x2={210} y2={360} stroke="#f2711c" strokeWidth={4} />
        <text x={216} y={365}>negative weight</text>
        <text x={24} y={388}>Each line = a weight that gets adjusted during training. Thicker = stronger influence.</text>
      </g>
    </svg>
  );
}
