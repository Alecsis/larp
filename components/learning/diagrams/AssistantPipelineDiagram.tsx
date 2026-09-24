import { Arrow, ArrowMarker, Box, C, DISPLAY_FONT, FONT } from "./svg-parts";

/**
 * How an AI assistant turns your message into a reply.
 * Two layouts: wide (tablet/desktop) and tall (phones), so text stays readable.
 */
const DESC =
  "Three inputs — system instructions from the app, the conversation so far, and your prompt — are split into tokens. The model then predicts the next token again and again to build a response. Some apps let the model use tools such as web search. Always review the output.";

const TOKENS = ["Why", " is", " the", " sky", " blue", "?"];

/** Chip widths and x-offsets, calculated once (widths scale with token length). */
const CHIP_WIDTHS = TOKENS.map((token) => token.length * 7.2 + 10);

function TokenChips({ x, y, gap = 4 }: { x: number; y: number; gap?: number }) {
  return (
    <g>
      {TOKENS.map((token, i) => {
        const w = CHIP_WIDTHS[i];
        const left = x + CHIP_WIDTHS.slice(0, i).reduce((sum, width) => sum + width + gap, 0);
        return (
          <g key={token}>
            <rect x={left} y={y} width={w} height={22} rx={5} fill={i % 2 ? C.cobaltSoft : C.sunSoft} stroke={C.ink2} strokeWidth={1} />
            <text x={left + w / 2} y={y + 15.5} textAnchor="middle" fontFamily="var(--font-atkinson-mono), monospace" fontSize={12} fill={C.ink}>
              {token.replace(" ", "·")}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Wide() {
  return (
    <svg viewBox="0 0 760 320" className="hidden h-auto w-full sm:block" role="img" aria-labelledby="pipe-wide-title pipe-wide-desc">
      <title id="pipe-wide-title">How an AI assistant answers you</title>
      <desc id="pipe-wide-desc">{DESC}</desc>
      <defs>
        <ArrowMarker id="pipe-wide-arrow" />
      </defs>

      <Box x={10} y={20} w={170} h={50} lines={["System instructions", "(set by the app)"]} fill={C.paper} fontSize={13} />
      <Box x={10} y={85} w={170} h={50} lines={["Conversation so far"]} fill={C.paper} fontSize={13} />
      <Box x={10} y={150} w={170} h={50} lines={["Your prompt"]} fill={C.cobaltSoft} bold />
      <Arrow d="M185,110 L232,110" markerId="pipe-wide-arrow" />

      <Box x={240} y={60} w={235} h={100} lines={[]} fill={C.surface} />
      <text x={357} y={88} textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight={700} fontSize={16} fill={C.ink}>
        1. Split into tokens
      </text>
      <TokenChips x={248} y={112} gap={3} />
      <Arrow d="M480,110 L512,110" markerId="pipe-wide-arrow" />

      <Box x={520} y={60} w={130} h={100} lines={["2. Model predicts", "the next token…", "again and again"]} fill={C.tangerineSoft} fontSize={13} bold />
      <Arrow d="M552,58 C552,20 618,20 618,56" markerId="pipe-wide-arrow" color={C.tangerine} />
      <text x={585} y={16} textAnchor="middle" fontFamily={FONT} fontSize={12} fill={C.ink2}>
        loop
      </text>
      <Arrow d="M654,110 L675,110" markerId="pipe-wide-arrow" />

      <Box x={682} y={70} w={74} h={80} lines={["3.", "Response"]} fill={C.emeraldSoft} bold fontSize={14} />

      <Arrow d="M585,165 L585,222" markerId="pipe-wide-arrow" color={C.ink3} dashed />
      <Box x={460} y={230} w={250} h={48} lines={["May use tools like web search —", "only if the app supports it"]} dashed fill={C.surface} stroke={C.ink3} fontSize={13} />

      <rect x={10} y={250} width={300} height={44} rx={10} fill={C.sun} stroke={C.ink} strokeWidth={2} />
      <text x={160} y={277} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={15} fill={C.ink}>
        Always review the output ✓
      </text>
    </svg>
  );
}

function Tall() {
  return (
    <svg viewBox="0 0 360 600" className="h-auto w-full sm:hidden" role="img" aria-labelledby="pipe-tall-title pipe-tall-desc">
      <title id="pipe-tall-title">How an AI assistant answers you</title>
      <desc id="pipe-tall-desc">{DESC}</desc>
      <defs>
        <ArrowMarker id="pipe-tall-arrow" />
      </defs>

      <Box x={10} y={10} w={165} h={52} lines={["System instructions", "(set by the app)"]} fill={C.paper} fontSize={14} />
      <Box x={185} y={10} w={165} h={52} lines={["Conversation", "so far"]} fill={C.paper} fontSize={14} />
      <Box x={60} y={74} w={240} h={48} lines={["Your prompt"]} fill={C.cobaltSoft} bold fontSize={17} />
      <Arrow d="M180,126 L180,152" markerId="pipe-tall-arrow" />

      <Box x={20} y={160} w={320} h={100} lines={[]} />
      <text x={180} y={190} textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight={700} fontSize={18} fill={C.ink}>
        1. Split into tokens
      </text>
      <TokenChips x={68} y={214} gap={4} />
      <Arrow d="M180,264 L180,290" markerId="pipe-tall-arrow" />

      <Box x={40} y={298} w={280} h={90} lines={["2. Model predicts the", "next token… again", "and again"]} fill={C.tangerineSoft} bold fontSize={17} />
      <Arrow d="M322,318 C352,318 352,368 324,368" markerId="pipe-tall-arrow" color={C.tangerine} />
      <Arrow d="M180,392 L180,418" markerId="pipe-tall-arrow" />

      <Box x={80} y={426} w={200} h={50} lines={["3. Response"]} fill={C.emeraldSoft} bold fontSize={18} />

      <Box x={20} y={490} w={320} h={46} lines={["May use tools like web search —", "only if the app supports it"]} dashed stroke={C.ink3} fontSize={14} />
      <rect x={20} y={548} width={320} height={44} rx={10} fill={C.sun} stroke={C.ink} strokeWidth={2} />
      <text x={180} y={576} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={17} fill={C.ink}>
        Always review the output ✓
      </text>
    </svg>
  );
}

export function AssistantPipelineDiagram() {
  return (
    <>
      <Wide />
      <Tall />
    </>
  );
}
