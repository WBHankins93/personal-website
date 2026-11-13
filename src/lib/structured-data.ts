// Schema.org JSON-LD for the homepage. Person + WebSite + ProfilePage in a
// single @graph, with the linked projects referenced as the person's works.
import { projects } from "@/content/projects";
import { SITE_URL, site } from "@/content/site";

const PERSON_ID = `${SITE_URL}/#person`;

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.name,
        url: SITE_URL,
        image: `${SITE_URL}/BH-headshot.png`,
        jobTitle: site.role,
        description: site.description,
        homeLocation: { "@type": "Place", name: "Metairie, Louisiana" },
        sameAs: [site.linkedin, site.github, "https://sproutflow-studio.com"],
        knowsAbout: ["TypeScript", "Next.js", "React", "Node", "Python", "Go", "Postgres", "Kubernetes", "Terraform", "AWS"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        publisher: { "@id": PERSON_ID },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${site.name}: ${site.role}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        hasPart: projects
          .filter((project) => project.link.href !== null)
          .map((project) => ({
            "@type": "SoftwareApplication",
            name: project.titleLines.join(" "),
            description: project.bullets[0],
            url: project.link.href,
            author: { "@id": PERSON_ID },
          })),
      },
    ],
  };
}
