// Pure path builders for the illustration kit, ported from the generator
// functions in the approved mockup (docs/redesign-bayou/reference/index.html).
// The order of rng() calls matches the mockup exactly, so the same seeds draw
// the same trees.
import { n, rnd, type Rng } from "@/lib/rand";

export interface CypressLimb {
  limb: string;
  pad: { cx: number; cy: number; rx: number; ry: number };
  moss: string[];
}

export interface CypressGeometry {
  trunk: string;
  limbs: CypressLimb[];
  knees: string[];
  mossWidth: number;
}

/** Bald cypress: flared trunk, 3 to 4 limbs with flat canopy pads, hanging moss, knees. */
export function buildCypress(x: number, base: number, h: number, w: number, r: Rng): CypressGeometry {
  const top = base - h;
  const fl = w * 1.9;
  const trunk =
    `M${n(x - fl)},${n(base)} C${n(x - w * 0.9)},${n(base - h * 0.1)} ${n(x - w * 0.55)},${n(base - h * 0.22)} ${n(x - w * 0.42)},${n(top + h * 0.18)} ` +
    `L${n(x - w * 0.3)},${n(top)} L${n(x + w * 0.3)},${n(top)} L${n(x + w * 0.42)},${n(top + h * 0.18)} ` +
    `C${n(x + w * 0.55)},${n(base - h * 0.22)} ${n(x + w * 0.9)},${n(base - h * 0.1)} ${n(x + fl)},${n(base)} Z`;

  const limbs: CypressLimb[] = [];
  const count = 3 + Math.floor(r() * 2);
  for (let i = 0; i < count; i++) {
    const by = top + h * (0.04 + i * 0.11);
    const dir = i % 2 ? 1 : -1;
    const len = w * (3.2 + r() * 3.2);
    const ex = x + dir * len;
    const ey = by - h * (0.03 + r() * 0.05);
    const limb =
      `M${n(x)},${n(by + w * 0.25)} Q${n(x + dir * len * 0.5)},${n(by - w * 0.2)} ${n(ex)},${n(ey)} ` +
      `L${n(ex)},${n(ey - w * 0.22)} Q${n(x + dir * len * 0.5)},${n(by - w * 0.7)} ${n(x)},${n(by - w * 0.2)} Z`;
    const pad = {
      cx: n(ex - dir * len * 0.2),
      cy: n(ey - w * 0.55),
      rx: n(len * 0.62),
      ry: n(w * (0.9 + r() * 0.5)),
    };
    const moss: string[] = [];
    const k = 4 + Math.floor(r() * 4);
    for (let j = 0; j < k; j++) {
      const t = 0.25 + (0.75 * j) / k;
      const mx = x + dir * len * t;
      const my = by - (by - ey) * t + 2;
      const ml = h * (0.07 + r() * 0.14);
      moss.push(`M${n(mx)},${n(my)} q${n((r() - 0.5) * 6)},${n(ml * 0.5)} ${n((r() - 0.5) * 4)},${n(ml)}`);
    }
    limbs.push({ limb, pad, moss });
  }

  const knees: string[] = [];
  for (let i = 0; i < 3; i++) {
    const kx = x + (r() - 0.5) * fl * 3.4;
    const kh = h * (0.025 + r() * 0.03);
    knees.push(`M${n(kx - 4)},${n(base)} Q${n(kx)},${n(base - kh * 2)} ${n(kx + 4)},${n(base)} Z`);
  }

  return { trunk, limbs, knees, mossWidth: n(Math.max(1.6, w * 0.16)) };
}

/** Three-tier fir silhouette. x is the centre, b the base line. */
export function firPath(x: number, b: number, h: number, w: number): string {
  return (
    `M${n(x)},${n(b - h)} L${n(x + w * 0.5)},${n(b - h * 0.6)} L${n(x + w * 0.28)},${n(b - h * 0.6)} ` +
    `L${n(x + w * 0.72)},${n(b - h * 0.28)} L${n(x + w * 0.4)},${n(b - h * 0.28)} L${n(x + w)},${n(b)} ` +
    `L${n(x - w)},${n(b)} L${n(x - w * 0.4)},${n(b - h * 0.28)} L${n(x - w * 0.72)},${n(b - h * 0.28)} ` +
    `L${n(x - w * 0.28)},${n(b - h * 0.6)} L${n(x - w * 0.5)},${n(b - h * 0.6)} Z`
  );
}

export interface FirSpec {
  x: number;
  b: number;
  h: number;
  w: number;
}

/** A row of firs with seeded jitter in position and height. */
export function firRow(width: number, b: number, count: number, h: number, w: number, seed: number): FirSpec[] {
  const r = rnd(seed);
  const out: FirSpec[] = [];
  for (let i = 0; i < count; i++) {
    const x = ((i + 0.5) * width) / count + (r() - 0.5) * 10;
    const base = b + r() * 8;
    out.push({ x, b: base, h: h * (0.65 + r() * 0.5), w });
  }
  return out;
}

export interface RidgeOptions {
  width: number;
  /** Baseline the peaks rise from. */
  y: number;
  amp: number;
  step: number;
  seed: number;
  /** Where the shape closes. Defaults to the baseline. */
  bottom?: number;
  /** Lowest peak as a share of amp. The hero uses 0.35, posters 0.3. */
  floor?: number;
}

/** Jagged ridge line closed into a fillable shape. */
export function ridgePath({ width, y, amp, step, seed, bottom, floor = 0.35 }: RidgeOptions): string {
  const r = rnd(seed);
  const bot = bottom ?? y;
  let d = bottom === undefined ? `M0,${n(y)}` : `M0,${n(bot)} L0,${n(y)}`;
  for (let x = 0; x <= width; x += step) {
    d += ` L${x},${n(y - amp * (floor + r() * (1 - floor)))}`;
  }
  return `${d} L${width},${n(bot)} Z`;
}

export interface MossStrand {
  d: string;
  width: number;
}

export interface MossOptions {
  count: number;
  seed: number;
  /** x of strand i before jitter. */
  x: (i: number) => number;
  /** y where a strand at x attaches. */
  top: (x: number) => number;
  /** [min, extra] strand length at x. */
  length: (x: number) => [number, number];
}

/** A curtain of Spanish moss hanging from a branch line. */
export function mossCurtain({ count, seed, x, top, length }: MossOptions): MossStrand[] {
  const r = rnd(seed);
  const out: MossStrand[] = [];
  for (let i = 0; i < count; i++) {
    const mx = x(i) + r() * 10;
    const y = top(mx);
    const [min, extra] = length(mx);
    const ml = min + r() * extra;
    const d = `M${n(mx)},${n(y)} q${n((r() - 0.5) * 14)},${n(ml * 0.5)} ${n((r() - 0.5) * 8)},${n(ml)}`;
    out.push({ d, width: n(3 + r() * 3) });
  }
  return out;
}
