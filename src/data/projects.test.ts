import {
  featuredProjects,
  getProject,
  playbookBranches,
  projects,
  sproutflow,
  supportingWork,
} from "./projects";

describe("project registry", () => {
  it("contains the three flagship projects in editorial order", () => {
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      "greenlit",
      "business-plan-writer",
      "living-playbooks",
    ]);
    expect(projects.every((project) => project.featured)).toBe(true);
  });

  it("uses unique, route-safe slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/));
  });

  it("keeps all public project links secure", () => {
    projects.flatMap((project) => project.links).forEach((link) => {
      expect(new URL(link.href).protocol).toBe("https:");
    });
  });

  it("keeps every case study complete", () => {
    projects.forEach((project) => {
      expect(project.caseStudy.challenge.length).toBeGreaterThan(80);
      expect(project.caseStudy.system.length).toBeGreaterThanOrEqual(3);
      expect(project.caseStudy.decisions.length).toBeGreaterThanOrEqual(3);
      expect(project.caseStudy.evidence.length).toBeGreaterThanOrEqual(3);
      expect(project.caseStudy.walkthrough).toHaveLength(5);
      expect(project.caseStudy.lessons.length).toBeGreaterThanOrEqual(3);
      expect(getProject(project.slug)).toBe(project);
    });
  });

  it("keeps supporting work out of the flagship registry", () => {
    const flagshipNames = new Set(projects.map((project) => project.name));
    supportingWork.forEach((work) => expect(flagshipNames.has(work.name)).toBe(false));
  });

  it("groups AI Engineering Studio with the living playbooks", () => {
    expect(playbookBranches).toContain("AI Engineering Studio");
    expect(supportingWork.map((work) => work.name)).not.toContain("AI Engineering Studio");
  });

  it("keeps Sproutflow separate and publicly linked", () => {
    expect(sproutflow.href).toBe("https://sproutflow-studio.com");
    expect(supportingWork.map((work) => work.name)).not.toContain(sproutflow.name);
  });
});
