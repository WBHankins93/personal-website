import Nav from "@/components/redesign/Nav";
import Hero from "@/components/redesign/Hero";
import ProjectBento from "@/components/projects/ProjectBento";
import Experience from "@/components/redesign/Experience";
import Contact from "@/components/redesign/Contact";
import Footer from "@/components/redesign/Footer";
import { buildJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <div className="editorial relative z-[1] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      <Nav />
      <main>
        <Hero />
        <ProjectBento />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
