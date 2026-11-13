// Poster illustrations, ported from the approved mockup. Each draws in a
// 300 x 425 box and works in both modes: pass mode="schematic" to get the
// same shapes as mint outlines (used on the back of posters whose
// architecture diagram Ben has not supplied yet).
import type { ReactNode } from "react";
import { Art, Cypress, FirRow, Halftone, ReflectionBars, Ridge, type ArtMode } from "@/components/kit";
import { buildCypress } from "@/components/kit/geometry";
import type { PosterArt as PosterArtKey, Schematic } from "@/content/projects";
import { n, rnd } from "@/lib/rand";

const MINT = "#5dffb0";

function FieldKit() {
  return (
    <>
      {/* Topographic contours. */}
      <g fill="none" stroke="#f6ecd4" strokeOpacity=".3" strokeWidth="1.2">
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse key={`a${i}`} cx="95" cy="250" rx={14 + i * 19} ry={9 + i * 13} transform="rotate(-20 95 250)" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={`b${i}`} cx="235" cy="330" rx={12 + i * 17} ry={8 + i * 12} transform="rotate(14 235 330)" />
        ))}
      </g>
      <Ridge width={300} y={372} amp={40} step={22} seed={41} bottom={425} floor={0.3} color="#081d1c" />
      {/* Dashed coral route to an X. */}
      <path d="M28,352 C70,300 96,318 118,270 S190,250 214,206" fill="none" stroke="#ee4e34" strokeWidth="3.5" strokeDasharray="9 7" strokeLinecap="round" />
      <path d="M206,198 l16,16 m0,-16 l-16,16" stroke="#ee4e34" strokeWidth="4" />
      {/* Yellow compass. */}
      <g transform="translate(96 252)">
        <circle r="50" fill="#ffcb05" />
        <circle r="41" fill="none" stroke="#0d2f2d" strokeWidth="2" />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} className="paint-only" y1="-41" y2={i % 4 ? -36 : -31} stroke="#0d2f2d" strokeWidth="2" transform={`rotate(${i * 22.5})`} />
        ))}
        <g transform="rotate(28)">
          <path d="M0,-30 L8,0 L0,30 L-8,0 Z" fill="#0d2f2d" />
          <path d="M0,-30 L8,0 L-8,0 Z" fill="#ee4e34" />
        </g>
        <circle className="paint-only" r="3.5" fill="#ffcb05" />
      </g>
    </>
  );
}

function Greenlit({ uid }: { uid: string }) {
  return (
    <>
      <defs>
        <Halftone id={`${uid}-dots`} color="#143a22" />
      </defs>
      <rect className="paint-only" width="300" height="425" fill="#eef6d6" />
      <rect className="paint-only" y="170" width="300" height="120" fill="#dcedbd" />
      {/* Green sun with halftone. */}
      <circle cx="150" cy="232" r="84" fill="#f6ecd4" />
      <circle cx="150" cy="232" r="60" fill="#35b45a" />
      <circle className="paint-only" cx="150" cy="232" r="60" fill={`url(#${uid}-dots)`} opacity=".18" />
      {/* Misty ridges, two rows of firs. */}
      <Ridge width={300} y={300} amp={60} step={26} seed={7} bottom={425} floor={0.3} color="#b5d6a0" />
      <Ridge width={300} y={330} amp={46} step={20} seed={19} bottom={425} floor={0.3} color="#7fb27a" />
      <rect className="paint-only" y="318" width="300" height="14" fill="#eef6d6" opacity=".6" />
      <FirRow width={300} b={372} count={11} h={90} w={13} color="#2f6b3f" seed={5} />
      <FirRow width={300} b={398} count={8} h={128} w={17} color="#143a22" seed={23} />
    </>
  );
}

function PlanWriter({ uid }: { uid: string }) {
  const r = rnd(66);
  return (
    <>
      <defs>
        <Halftone id={`${uid}-dots`} color="#0f1830" r={1.7} />
      </defs>
      {Array.from({ length: 34 }, (_, i) => (
        <circle key={i} className="paint-only" cx={n(r() * 300)} cy={n(150 + r() * 130)} r={n(0.6 + r() * 1.1)} fill="#f6ecd4" />
      ))}
      <circle cx="236" cy="206" r="27" fill="#f58a2c" />
      <Ridge width={300} y={318} amp={50} step={30} seed={13} bottom={425} floor={0.3} color="#2a3d6e" />
      {/* Night peak with a halftone shadow face and a snow cap. */}
      <path d="M20,400 L150,196 L290,400 Z" fill="#3d5a99" />
      <path className="paint-only" d="M150,196 L290,400 L170,400 L186,300 L160,262 Z" fill={`url(#${uid}-dots)`} opacity=".55" />
      <path d="M150,196 L124,238 L140,231 L150,246 L162,232 L177,240 Z" fill="#f6ecd4" />
      {/* Dashed route to a summit flag. */}
      <path d="M52,398 L96,352 L78,328 L128,300 L116,274 L146,246 L150,204" fill="none" stroke="#ee4e34" strokeWidth="3.2" strokeDasharray="8 6" strokeLinecap="round" />
      <path d="M150,198 v-26 l20,7 l-20,7" fill="#ffcb05" stroke="#f6ecd4" strokeWidth="2" />
      <FirRow width={300} b={400} count={9} h={64} w={12} color="#0f1830" seed={31} />
    </>
  );
}

function Clipboard() {
  // One rng for the reflection bars and then the trees, as in the mockup.
  // The bars take 18 values; skip them here so the trees get the same ones.
  const r = rnd(88);
  for (let i = 0; i < 18; i++) r();
  const trees = [
    { g: buildCypress(52, 330, 210, 9, r), color: "#0b2423", moss: "#5f7d57" },
    { g: buildCypress(250, 318, 170, 7, r), color: "#0b2423", moss: "#5f7d57" },
    { g: buildCypress(196, 300, 96, 4, r), color: "#1f5a56", moss: "#6fa08b" },
  ];
  return (
    <>
      <rect className="paint-only" y="150" width="300" height="50" fill="#f6c25c" />
      <rect className="paint-only" y="200" width="300" height="50" fill="#f0a23a" />
      {/* Coral sun over bayou water, three cypress. */}
      <circle cx="150" cy="262" r="62" fill="#ee4e34" />
      <Ridge width={300} y={292} amp={26} step={16} seed={3} bottom={300} floor={0.3} color="#a8502f" />
      <rect y="292" width="300" height="140" fill="#12403e" />
      <ReflectionBars cx={150} y={300} count={9} gap={10} minW={30} spanW={120} jitter={16} height={4.5} color="#f3b23e" seed={88} fade={0.08} />
      {trees.map((t, i) => (
        <Cypress key={i} geometry={t.g} color={t.color} mossColor={t.moss} />
      ))}
    </>
  );
}

/** Fallback for a poster added to the data file before it has its own art. */
function Generic() {
  return (
    <>
      <circle cx="150" cy="240" r="58" fill="#f58a2c" />
      <Ridge width={300} y={310} amp={56} step={28} seed={17} bottom={425} floor={0.3} color="#2c6f66" />
      <Ridge width={300} y={340} amp={40} step={20} seed={29} bottom={425} floor={0.3} color="#12403e" />
      <FirRow width={300} b={400} count={9} h={84} w={14} color="#0b2423" seed={11} />
    </>
  );
}

const ART: Record<PosterArtKey, (props: { uid: string }) => ReactNode> = {
  "field-kit": FieldKit,
  greenlit: Greenlit,
  "plan-writer": PlanWriter,
  clipboard: Clipboard,
  generic: Generic,
};

export function PosterArt({ art, mode, uid }: { art: PosterArtKey; mode: ArtMode; uid: string }) {
  const Scene = ART[art] ?? Generic;
  return (
    <Art mode={mode}>
      <Scene uid={uid} />
    </Art>
  );
}

/** Mint grid behind every schematic side. */
export function SchematicGrid({ uid }: { uid: string }) {
  return (
    <>
      <defs>
        <pattern id={`${uid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={MINT} strokeOpacity=".14" />
        </pattern>
      </defs>
      <rect width="300" height="425" fill={`url(#${uid}-grid)`} />
    </>
  );
}

/** Box-and-line architecture diagram from content/projects.ts. */
export function SchematicDiagram({ schematic }: { schematic: Schematic }) {
  return (
    <g transform="translate(0 4)">
      <path d={schematic.wires} fill="none" stroke={MINT} strokeWidth="1.3" />
      {schematic.nodes.map((node) => (
        <g key={node.label}>
          <rect x={node.x} y={node.y} width={node.w} height="26" fill="#06120f" stroke={MINT} strokeWidth="1.4" />
          <text x={node.x + node.w / 2} y={node.y + 17} textAnchor="middle" fontSize="9.5" fill={MINT}>
            {node.label}
          </text>
        </g>
      ))}
      {schematic.notes.map((note) => (
        <text key={note.text.join(" ")} x={note.x} y={note.y} fontSize="8" fill={MINT} opacity=".8">
          {note.text.map((line, i) => (
            <tspan key={line} x={note.x} dy={i === 0 ? 0 : 11}>
              {line}
            </tspan>
          ))}
        </text>
      ))}
    </g>
  );
}
