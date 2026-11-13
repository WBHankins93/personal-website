import { n, rnd } from "./rand";
import { buildCypress, firPath, ridgePath } from "@/components/kit/geometry";

describe("seeded illustration helpers", () => {
  it("replays the same sequence for the same seed", () => {
    const a = rnd(77);
    const b = rnd(77);
    const seqA = Array.from({ length: 20 }, a);
    const seqB = Array.from({ length: 20 }, b);
    expect(seqA).toEqual(seqB);
    seqA.forEach((v) => {
      expect(v).toBeGreaterThan(0);
      expect(v).toBeLessThan(1);
    });
  });

  it("gives different sequences for different seeds", () => {
    expect(rnd(1)()).not.toEqual(rnd(2)());
  });

  it("rounds to one decimal", () => {
    expect(n(1.26)).toBe(1.3);
    expect(n(-0.04)).toBe(-0);
  });

  it("builds identical geometry on every call (server and client agree)", () => {
    expect(buildCypress(250, 640, 330, 15, rnd(202))).toEqual(
      buildCypress(250, 640, 330, 15, rnd(202)),
    );
    expect(ridgePath({ width: 1440, y: 540, amp: 80, step: 36, seed: 5 })).toBe(
      ridgePath({ width: 1440, y: 540, amp: 80, step: 36, seed: 5 }),
    );
    expect(firPath(30, 212, 120, 22)).toMatch(/^M30,92 /);
  });

  it("keeps a cypress to 3 or 4 limbs with 4 to 7 moss strands each", () => {
    const tree = buildCypress(600, 625, 290, 13, rnd(9));
    expect([3, 4]).toContain(tree.limbs.length);
    tree.limbs.forEach((limb) => {
      expect(limb.moss.length).toBeGreaterThanOrEqual(4);
      expect(limb.moss.length).toBeLessThanOrEqual(7);
    });
    expect(tree.knees).toHaveLength(3);
  });
});
