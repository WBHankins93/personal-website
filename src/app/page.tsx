import ContactSign from "@/components/site/ContactSign";

// Order is fixed by the handoff (7): Hero, Ticker, Selected Work, The Trail,
// Off the Clock, Contact sign. Sections land milestone by milestone.
export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#contact">
        Skip to contact
      </a>
      <main />
      <ContactSign />
    </>
  );
}
