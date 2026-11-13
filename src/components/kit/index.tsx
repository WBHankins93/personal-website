// Illustration kit. Every piece draws in two modes from the same geometry:
// "paint" (flat poster fills) and "schematic" (1.2px mint outlines, no fill).
// The schematic look is applied by the .bayou-schematic class in globals.css,
// so a whole scene can switch modes by setting the class once at its root.
//
// These are plain SVG fragments with no hooks. Render them inside an <svg>.
import type { ReactNode } from "react";
import { n, rnd, type Rng } from "@/lib/rand";
import {
  buildCypress,
  firPath,
  firRow,
  mossCurtain,
  ridgePath,
  type CypressGeometry,
  type MossOptions,
  type RidgeOptions,
} from "./geometry";

export type ArtMode = "paint" | "schematic";

export const modeClass = (mode: ArtMode | undefined): string | undefined =>
  mode === "schematic" ? "bayou-schematic" : mode === "paint" ? "bayou-paint" : undefined;

/** Wrap any group of shapes to set (or switch) its drawing mode. */
export function Art({ mode, children, layer }: { mode?: ArtMode; children: ReactNode; layer?: string }) {
  return (
    <g className={modeClass(mode)} data-layer={layer}>
      {children}
    </g>
  );
}

interface CypressProps {
  /** Trunk centre, base line, height and trunk half-width in SVG units. */
  x?: number;
  base?: number;
  h?: number;
  w?: number;
  color: string;
  mossColor: string;
  /** Seed for a standalone tree. */
  seed?: number;
  /**
   * Pre-built geometry. Scenes that draw several trees from one shared rng
   * call buildCypress() themselves, in order, and pass the result here.
   */
  geometry?: CypressGeometry;
  mode?: ArtMode;
}

export function Cypress({ x = 0, base = 0, h = 100, w = 6, color, mossColor, seed = 1, geometry, mode }: CypressProps) {
  const g = geometry ?? buildCypress(x, base, h, w, rnd(seed));
  return (
    <g className={modeClass(mode)}>
      <path d={g.trunk} fill={color} />
      {g.limbs.map((l, i) => (
        <g key={i}>
          <path d={l.limb} fill={color} />
          <ellipse cx={l.pad.cx} cy={l.pad.cy} rx={l.pad.rx} ry={l.pad.ry} fill={color} />
          {l.moss.map((d, j) => (
            <path key={j} className="moss" d={d} stroke={mossColor} strokeWidth={g.mossWidth} strokeLinecap="round" fill="none" />
          ))}
        </g>
      ))}
      {g.knees.map((d, i) => (
        <path key={i} d={d} fill={color} />
      ))}
    </g>
  );
}

export function Fir({ x, b, h, w, color, mode }: { x: number; b: number; h: number; w: number; color: string; mode?: ArtMode }) {
  return <path className={modeClass(mode)} d={firPath(x, b, h, w)} fill={color} />;
}

export function FirRow({
  width,
  b,
  count,
  h,
  w,
  color,
  seed,
  mode,
}: {
  width: number;
  b: number;
  count: number;
  h: number;
  w: number;
  color: string;
  seed: number;
  mode?: ArtMode;
}) {
  return (
    <g className={modeClass(mode)}>
      {firRow(width, b, count, h, w, seed).map((f, i) => (
        <path key={i} d={firPath(f.x, f.b, f.h, f.w)} fill={color} />
      ))}
    </g>
  );
}

export function Ridge({ color, mode, ...options }: RidgeOptions & { color: string; mode?: ArtMode }) {
  return <path className={modeClass(mode)} d={ridgePath(options)} fill={color} />;
}

export function Moss({ color, mode, ...options }: MossOptions & { color: string; mode?: ArtMode }) {
  return (
    <g className={modeClass(mode)}>
      {mossCurtain(options).map((s, i) => (
        <path key={i} className="moss" d={s.d} stroke={color} strokeWidth={s.width} strokeLinecap="round" fill="none" />
      ))}
    </g>
  );
}

/** Halftone dot pattern. Put it in <defs> and fill a shape with url(#id). */
export function Halftone({ id, color, r = 1.4 }: { id: string; color: string; r?: number }) {
  return (
    <pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
      <circle className="keep" cx="3.5" cy="3.5" r={r} fill={color} />
    </pattern>
  );
}

/** Sun reflection bars on water, widest scatter at the top. */
export function ReflectionBars({
  cx,
  y,
  count,
  gap,
  minW,
  spanW,
  jitter,
  height,
  color,
  seed,
  rng,
  fade,
  startOpacity = 1,
}: {
  cx: number;
  y: number;
  count: number;
  gap: number;
  minW: number;
  spanW: number;
  jitter: number;
  height: number;
  color: string;
  seed?: number;
  rng?: Rng;
  fade: number;
  startOpacity?: number;
}) {
  const r = rng ?? rnd(seed ?? 1);
  const bars = [];
  for (let i = 0; i < count; i++) {
    const w = minW + r() * spanW;
    bars.push(
      <rect
        key={i}
        className="paint-only"
        x={n(cx - w / 2 + (r() - 0.5) * jitter)}
        y={n(y + i * gap)}
        width={n(w)}
        height={height}
        rx={height / 2}
        fill={color}
        opacity={n(startOpacity - i * fade)}
      />,
    );
  }
  return <>{bars}</>;
}

/**
 * Paper grain. Add the `grain` class to any painted surface instead of using
 * this when you can; this component exists for surfaces that already use
 * their ::after. Never put grain on a schematic surface.
 */
export function Grain() {
  return <span aria-hidden className="grain-layer" />;
}
