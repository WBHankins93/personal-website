import Nav from "@/components/redesign/Nav";
import Hero from "@/components/redesign/Hero";
import WhatIBuild from "@/components/redesign/WhatIBuild";
import ProductCarousel from "@/components/redesign/ProductCarousel";
import Experience from "@/components/redesign/Experience";
import Labs from "@/components/redesign/Labs";
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
        <WhatIBuild />
        <ProductCarousel />
        <Experience />
        <Labs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
