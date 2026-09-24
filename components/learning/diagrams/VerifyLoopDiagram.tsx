import { Arrow, ArrowMarker, Box, C, DISPLAY_FONT, FONT } from "./svg-parts";

/** The verification loop, with the SIFT moves (Stop, Investigate, Find, Trace) marked on it. */
export function VerifyLoopDiagram() {
  return (
    <svg
      viewBox="0 0 400 440"
      className="mx-auto h-auto w-full max-w-[34rem]"
      role="img"
      aria-labelledby="verify-loop-title verify-loop-desc"
    >
      <title id="verify-loop-title">The verification loop</title>
      <desc id="verify-loop-desc">
        A loop of six steps: get an AI answer and stop before trusting it; pick out the claims; investigate the source;
        find better coverage from a second reliable source; trace claims to the original; then keep, fix, or drop each
        claim and repeat for the next one.
      </desc>
      <defs>
        <ArrowMarker id="verify-loop-arrow" />
      </defs>

      <Box x={130} y={30} w={140} h={50} lines={["AI answer", "S: Stop first"]} fill={C.cobaltSoft} fontSize={14} bold />
      <Box x={251} y={105} w={140} h={50} lines={["Pick out", "the claims"]} fontSize={14} />
      <Box x={251} y={255} w={140} h={50} lines={["I: Investigate", "the source"]} fill={C.tangerineSoft} fontSize={14} />
      <Box x={130} y={330} w={140} h={50} lines={["F: Find better", "coverage"]} fill={C.tangerineSoft} fontSize={14} />
      <Box x={9} y={255} w={140} h={50} lines={["T: Trace claims", "to the original"]} fill={C.tangerineSoft} fontSize={14} />
      <Box x={9} y={105} w={140} h={50} lines={["Keep, fix,", "or drop"]} fill={C.emeraldSoft} fontSize={14} bold />

      <Arrow d="M272,55 Q321,55 321,101" markerId="verify-loop-arrow" />
      <Arrow d="M321,157 L321,251" markerId="verify-loop-arrow" />
      <Arrow d="M321,307 Q321,355 274,355" markerId="verify-loop-arrow" />
      <Arrow d="M126,355 Q79,355 79,309" markerId="verify-loop-arrow" />
      <Arrow d="M79,253 L79,159" markerId="verify-loop-arrow" />
      <Arrow d="M79,103 Q79,55 126,55" markerId="verify-loop-arrow" />

      <text x={200} y={196} textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight={700} fontSize={17} fill={C.ink}>
        Repeat for
      </text>
      <text x={200} y={218} textAnchor="middle" fontFamily={DISPLAY_FONT} fontWeight={700} fontSize={17} fill={C.ink}>
        every claim
      </text>
      <text x={200} y={244} textAnchor="middle" fontFamily={FONT} fontSize={22} fill={C.tangerine}>
        ↻
      </text>

      <text x={200} y={420} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={C.ink2}>
        SIFT: Stop · Investigate · Find better coverage · Trace
      </text>
    </svg>
  );
}
