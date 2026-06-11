import { projects } from "../data/projects";

describe("projects data integrity", () => {
  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every project has a name, description, and technologies", () => {
    for (const p of projects) {
      expect(p.name).toBeTruthy();
      expect(p.description.length).toBeGreaterThan(20);
      expect(p.technologies.length).toBeGreaterThan(0);
    }
  });

  it("every project has a card image", () => {
    for (const p of projects) {
      expect(p.image_url).toMatch(/^\/projects\/.+\.(jpg|png|svg)$/);
    }
  });

  it("project links are well-formed urls", () => {
    for (const p of projects) {
      for (const url of [p.github_url, p.live_url]) {
        if (url) expect(url).toMatch(/^https:\/\//);
      }
    }
  });

  it("showcase projects are also featured", () => {
    for (const p of projects.filter((p) => p.showcase)) {
      expect(p.featured).toBe(true);
    }
  });
});
