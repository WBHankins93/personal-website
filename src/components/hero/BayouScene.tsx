// The hero bayou, drawn twice from the same geometry: painted and schematic.
// Server component on purpose. The Hero client component receives both
// renders as props, so none of this SVG ships in the client bundle.
//
// Layers are grouped back to front and tagged with data-layer. Tier 2
// (Three.js) and any later illustrator pass replace art per layer, so keep
// this structure: sky, sun, ridges, far-trees, water, mid-trees, egret,
// foreground.
import { Art, Cypress, Moss, ReflectionBars, Ridge, type ArtMode } from "@/components/kit";
import { buildCypress } from "@/components/kit/geometry";
import { n, rnd } from "@/lib/rand";

const W = 1440;
const HEIGHT = 810;
const HORIZON = 540;
const SUN = { x: 940, y: HORIZON - 40 };
const MINT = "#5dffb0";

const SKY_BANDS = ["#f9d48f", "#f7bf73", "#f5a657", "#f28f43"];
const BIRDS: [number, number, number][] = [
  [610, 250, 1],
  [650, 232, 0.8],
  [700, 262, 0.7],
  [1010, 214, 0.9],
];
const MID_TREES: [number, number, number, number][] = [
  [250, 640, 330, 15],
  [600, 625, 290, 13],
  [1180, 650, 360, 16],
  [1340, 630, 300, 13],
];
// Playful and few: five at most (handoff 7.1).
const NODES: [number, number, string][] = [
  [940, 500, "sun.light  intensity 1.4"],
  [250, 318, "cypress_02  214 verts"],
  [1180, 296, "cypress_04  moss.strands 31"],
  [790, 610, "egret.spawn(1)"],
  [1120, 715, "water.plane  reflect: on"],
];

function SunRays() {
  const R = 1500;
  return (
    <>
      {Array.from({ length: 14 }, (_, i) => {
        const a = ((-176 + i * 13) * Math.PI) / 180;
        const b = ((-170 + i * 13) * Math.PI) / 180;
        return (
          <path
            key={i}
            d={`M${SUN.x},${SUN.y} L${n(SUN.x + R * Math.cos(a))},${n(SUN.y + R * Math.sin(a))} L${n(SUN.x + R * Math.cos(b))},${n(SUN.y + R * Math.sin(b))} Z`}
            fill="#fff3cf"
            opacity=".3"
          />
        );
      })}
    </>
  );
}

function WaterMesh() {
  const lines = [];
  for (let i = -14; i <= 14; i++) {
    lines.push(<line key={`v${i}`} className="keep" x1={SUN.x + i * 26} y1={HORIZON} x2={SUN.x + i * 190} y2={HEIGHT} stroke={MINT} strokeOpacity=".28" />);
  }
  for (let i = 1; i < 9; i++) {
    const y = n(HORIZON + Math.pow(i / 9, 1.8) * 270);
    lines.push(<line key={`h${i}`} className="keep" x1="0" y1={y} x2={W} y2={y} stroke={MINT} strokeOpacity=".28" />);
  }
  return <>{lines}</>;
}

export default function BayouScene({ mode }: { mode: ArtMode }) {
  const paint = mode === "paint";

  // Each group of trees shares one rng. Geometry is built here, in order,
  // rather than during child render, so the sequence never depends on
  // React's render order.
  const farRng = rnd(31);
  const farTrees = Array.from({ length: 9 }, (_, i) => {
    const x = 80 + i * 170 + farRng() * 60;
    const h = 150 + farRng() * 70;
    return buildCypress(x, HORIZON + 4, h, 7, farRng);
  }).map((g, i) => <Cypress key={i} geometry={g} color="#2c6f66" mossColor="#6fa08b" />);
  const midRng = rnd(202);
  const midTrees = MID_TREES.map(([x, base, h, w]) => buildCypress(x, base, h, w, midRng)).map((g, i) => (
    <Cypress key={i} geometry={g} color="#12403e" mossColor="#8fae7a" />
  ));
  const foreRng = rnd(404);
  const foreTrees = [buildCypress(70, 830, 720, 34, foreRng), buildCypress(1420, 840, 780, 36, foreRng)].map((g, i) => (
    <Cypress key={i} geometry={g} color="#081d1c" mossColor="#5f7d57" />
  ));

  const ripples = [];
  if (paint) {
    // Same rng as the reflection bars, continued, as in the mockup.
    const r = rnd(12);
    for (let i = 0; i < 32; i++) r();
    for (let i = 0; i < 22; i++) {
      ripples.push(
        <rect key={i} x={n(r() * W)} y={n(HORIZON + 20 + r() * 250)} width={n(40 + r() * 160)} height="4" rx="2" fill="#2c7a70" />,
      );
    }
  }

  return (
    <svg
      className={`hero-scene ${paint ? "bayou-paint" : "bayou-schematic"}`}
      viewBox={`0 0 ${W} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <Art layer="sky">
        {paint ? (
          <>
            <rect width={W} height={HEIGHT} fill="#fbe3ac" />
            {SKY_BANDS.map((c, i) => (
              <rect key={c} y={250 + i * 72} width={W} height="80" fill={c} />
            ))}
          </>
        ) : (
          <>
            <defs>
              <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path className="keep" d="M48 0H0V48" fill="none" stroke={MINT} strokeOpacity=".13" />
              </pattern>
            </defs>
            <rect className="keep" width={W} height={HEIGHT} fill="#06120f" />
            <rect className="keep" width={W} height={HEIGHT} fill="url(#hero-grid)" />
            <WaterMesh />
          </>
        )}
      </Art>

      <Art layer="sun">
        {paint && <SunRays />}
        {paint &&
          BIRDS.map(([x, y, s], i) => (
            <path
              key={i}
              d={`M${x},${y} q${n(9 * s)},${n(-9 * s)} ${n(18 * s)},0 q${n(9 * s)},${n(-9 * s)} ${n(18 * s)},0`}
              fill="none"
              stroke="#0b2423"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        <circle cx={SUN.x} cy={SUN.y} r="150" fill="#fff3cf" />
        {paint && <circle cx={SUN.x} cy={SUN.y} r="188" fill="none" stroke="#fff3cf" strokeWidth="5" />}
      </Art>

      <Art layer="ridges">
        <Ridge width={W} y={HORIZON} amp={80} step={36} seed={5} color="#e2733a" />
        <Ridge width={W} y={HORIZON} amp={46} step={24} seed={9} color="#a8502f" />
      </Art>

      <Art layer="far-trees">{farTrees}</Art>

      <Art layer="water">
        <rect x="0" y={HORIZON} width={W} height={HEIGHT - HORIZON} fill="#1b5853" />
        {paint && (
          <>
            <ReflectionBars cx={SUN.x} y={HORIZON + 10} count={16} gap={17} minW={60} spanW={240} jitter={40} height={6} color="#f7bf73" seed={12} startOpacity={0.9} fade={0.045} />
            {ripples}
          </>
        )}
      </Art>

      <Art layer="mid-trees">{midTrees}</Art>

      <Art layer="egret">
        <path d="M770,668 q-6,-34 10,-52 q10,-10 6,-22 l20,6 l-16,2 q8,12 -4,24 q-10,14 -4,42 Z" fill="#fff7e2" />
        <path d="M774,668 l-2,26 M782,668 l2,26" stroke="#fff7e2" strokeWidth="2" fill="none" />
      </Art>

      <Art layer="foreground">
        {foreTrees}
        <path d="M0,790 Q300,760 520,800 L520,810 L0,810 Z" fill="#081d1c" />
        <path d="M0,34 Q720,-34 1440,44 L1440,74 Q720,-2 0,62 Z" fill="#081d1c" />
        <Moss
          color="#5f7d57"
          count={46}
          seed={909}
          x={(i) => 130 + i * 27}
          top={(mx) => 58 - Math.sin((mx / W) * Math.PI) * 40}
          length={(mx) => (mx > 980 ? [26, 30] : [60, 150])}
        />
      </Art>

      {!paint && (
        <g className="hero-nodes" data-layer="labels">
          {NODES.map(([x, y, label]) => (
            <g key={label}>
              <circle className="keep" cx={x} cy={y} r="5" fill="#06120f" stroke={MINT} strokeWidth="1.5" />
              <line className="keep" x1={x + 6} y1={y} x2={x + 34} y2={y - 18} stroke={MINT} />
              <text x={x + 38} y={y - 20}>
                {label}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
