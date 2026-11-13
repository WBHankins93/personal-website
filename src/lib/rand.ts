// Seeded random helper ported from the approved mockup. Every illustration
// draws from one of these so shapes are identical on the server, on the
// client, and between renders. Never use Math.random() in illustration code.
export type Rng = () => number;

export function rnd(seed: number): Rng {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Round to one decimal so SVG markup stays small and stable. */
export const n = (v: number): number => Math.round(v * 10) / 10;
