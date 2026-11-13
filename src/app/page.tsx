import BayouScene from "@/components/hero/BayouScene";
import Hero from "@/components/hero/Hero";
import ContactSign from "@/components/site/ContactSign";
import SelectedWork from "@/components/work/SelectedWork";
import { getProject } from "@/content/projects";
import { featured } from "@/content/site";
import { buildJsonLd } from "@/lib/structured-data";

// Order is fixed by the handoff (7): Hero, Ticker, Selected Work, The Trail,
// Off the Clock, Contact sign.
export default function HomePage() {
  const featuredLink = getProject(featured.project)?.link.href ?? null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
      <a className="skip-link" href="#work">
        Skip to the work
      </a>
      <main>
        <Hero
          schematicScene={<BayouScene mode="schematic" />}
          paintedScene={<BayouScene mode="paint" />}
          featured={{
            eyebrow: featured.eyebrow,
            title: featured.title,
            cta: featured.cta,
            // Until Ben supplies the Gumroad URL the card scrolls to the poster.
            href: featuredLink ?? "#work",
            external: featuredLink !== null,
          }}
        />
        {/* Parked: the employer "Now" section slots in here (handoff 13). */}
        <SelectedWork />
      </main>
      <ContactSign />
    </>
  );
}
