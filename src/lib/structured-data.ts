// src/lib/structured-data.ts
// Schema.org JSON-LD for the homepage. Person + WebSite + ProfilePage in a
// single @graph, with shipped products referenced as the person's works.
import { products } from "@/data/products";

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
          "Solutions Engineer who builds production software — 7+ years across enterprise architecture, cloud infrastructure, and customer-facing engineering.",
        sameAs: [
          "https://www.linkedin.com/in/ben-hankins/",
          "https://github.com/WBHankins93",
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
        name: "Ben Hankins — Solutions Engineer & Software Builder",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        hasPart: products.map((p) => ({
          "@type": "SoftwareApplication",
          name: p.name,
          applicationCategory: "BusinessApplication",
          description: p.solution,
          ...(p.cta ? { url: p.cta.href } : {}),
          author: { "@id": PERSON_ID },
        })),
      },
    ],
  };
}
