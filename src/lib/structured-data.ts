// src/lib/structured-data.ts
// Schema.org JSON-LD for the homepage. Person + WebSite + ProfilePage in a
// single @graph, with the curated work referenced as the person's works.
import { featuredProjects } from "@/data/projects";

const SITE_URL = "https://www.benhankins.dev";
const PERSON_ID = `${SITE_URL}/#person`;

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Ben Hankins",
        url: SITE_URL,
        image: `${SITE_URL}/BH-headshot.png`,
        jobTitle: "Solutions Engineer",
        description:
          "Solutions Engineer who builds production software: 7+ years across solutions engineering, cloud infrastructure, and full-stack product development.",
        sameAs: [
          "https://www.linkedin.com/in/ben-hankins/",
          "https://github.com/WBHankins93",
          "https://sproutflow-studio.com",
        ],
        knowsAbout: [
          "Solutions Engineering",
          "Cloud Infrastructure",
          "Kubernetes",
          "Platform Engineering",
          "AI Engineering",
          "Technical Pre-Sales",
          "Next.js",
          "TypeScript",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Sproutflow Studio",
          url: "https://sproutflow-studio.com",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Ben Hankins",
        publisher: { "@id": PERSON_ID },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: "Ben Hankins: Solutions Engineer & Software Builder",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        hasPart: featuredProjects.map((project) => ({
          "@type": project.slug === "living-playbooks" ? "CreativeWork" : "SoftwareApplication",
          name: project.name,
          description: project.summary,
          url: `${SITE_URL}/projects/${project.slug}`,
          sameAs: project.links.map((link) => link.href),
          author: { "@id": PERSON_ID },
        })),
      },
    ],
  };
}
