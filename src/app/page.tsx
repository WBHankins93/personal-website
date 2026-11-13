import BayouScene from "@/components/hero/BayouScene";
import Hero from "@/components/hero/Hero";
import ContactSign from "@/components/site/ContactSign";
import { featured } from "@/content/site";

// Order is fixed by the handoff (7): Hero, Ticker, Selected Work, The Trail,
// Off the Clock, Contact sign. Sections land milestone by milestone.
export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#contact">
        Skip to contact
      </a>
      <main>
        <Hero
          schematicScene={<BayouScene mode="schematic" />}
          paintedScene={<BayouScene mode="paint" />}
          featured={{ eyebrow: featured.eyebrow, title: featured.title, cta: featured.cta, href: "#work", external: false }}
        />
      </main>
      <ContactSign />
    </>
  );
}
