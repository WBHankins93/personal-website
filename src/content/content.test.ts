import { postcards } from "./postcards";
import { getProject, labs, projects } from "./projects";
import { featured, navLinks, site, stack } from "./site";
import { trail } from "./trail";

describe("projects", () => {
  it("lists the four approved posters in wall order", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "pre-sales-field-kit",
      "greenlit",
      "business-plan-writer",
      "clipboard",
    ]);
  });

  it("uses unique, anchor-safe slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/));
  });

  it("keeps every public link on https", () => {
    const hrefs = [...projects.map((p) => p.link.href), ...labs.map((l) => l.href)].filter(
      (href): href is string => href !== null,
    );
    expect(hrefs.length).toBeGreaterThan(0);
    hrefs.forEach((href) => expect(new URL(href).protocol).toBe("https:"));
  });

  it("gives every poster a title, a footer and at least one fact", () => {
    projects.forEach((p) => {
      expect(p.titleLines.length).toBeGreaterThan(0);
      expect(p.footer.length).toBeGreaterThan(0);
      expect(p.bullets.length).toBeGreaterThanOrEqual(1);
      expect(p.bullets.length).toBeLessThanOrEqual(3);
      expect(p.screenshots.length).toBeLessThanOrEqual(3);
    });
  });

  it("describes every schematic in words and keeps its boxes on the poster", () => {
    projects.forEach((p) => {
      if (!p.schematic) return;
      expect(p.schematic.alt.length).toBeGreaterThan(80);
      p.schematic.nodes.forEach((node) => {
        expect(node.x).toBeGreaterThanOrEqual(0);
        expect(node.x + node.w).toBeLessThanOrEqual(300);
        expect(node.y + 26).toBeLessThanOrEqual(425);
      });
    });
  });

  it("only draws the Business Plan Writer architecture until Ben supplies the others", () => {
    expect(projects.filter((p) => p.schematic).map((p) => p.slug)).toEqual(["business-plan-writer"]);
  });

  it("points the hero's featured card at a real project", () => {
    expect(getProject(featured.project)).toBeDefined();
  });
});

describe("trail", () => {
  it("runs oldest to newest through six stops and ends at the summit", () => {
    expect(trail.map((s) => s.name)).toEqual([
      "General Assembly",
      "Kortivity",
      "IBM",
      "Prove AI",
      "Sproutflow Studio",
      "Next summit",
    ]);
    expect(trail.filter((s) => s.summit)).toHaveLength(1);
    expect(trail[trail.length - 1].summit).toBe(true);
    const years = trail.map((s) => Number(s.axisYear));
    expect([...years].sort((a, b) => a - b)).toEqual(years);
  });

  it("keeps detail cards to three bullets or fewer", () => {
    trail.forEach((s) => expect(s.bullets.length).toBeLessThanOrEqual(3));
  });

  it("says nothing about the summit beyond 'details soon'", () => {
    const summit = trail[trail.length - 1];
    expect(summit.bullets).toEqual([]);
    expect(summit.stack).toEqual([]);
    expect(summit.roleLong).toBe("New chapter, details soon");
  });

  it("keeps the résumé figures exactly as written", () => {
    const text = trail.flatMap((s) => s.bullets).join(" ");
    expect(text).toContain("from 2 to 49 OpenShift environments");
    expect(text).toContain("from a 34% baseline to a passed audit in six months");
    expect(text).toContain("4 Kubernetes clusters");
  });
});

describe("site copy", () => {
  it("has four postcards and four nav links", () => {
    expect(postcards.map((p) => p.title)).toEqual(["Hiking", "Marsh", "Festivals", "Golf"]);
    expect(navLinks.map((l) => l.label)).toEqual(["Work", "Trail", "Off the clock", "Contact"]);
  });

  it("uses the approved role line and ticker stack", () => {
    expect(`${site.role} · ${site.place}`).toBe("Full Stack Engineer · South Louisiana");
    expect(stack).toHaveLength(10);
  });
});
