import Nav from "@/components/redesign/Nav";
import Hero from "@/components/redesign/Hero";
import WhatIBuild from "@/components/redesign/WhatIBuild";
import ProductCarousel from "@/components/redesign/ProductCarousel";
import Experience from "@/components/redesign/Experience";
import Labs from "@/components/redesign/Labs";
import Contact from "@/components/redesign/Contact";
import Footer from "@/components/redesign/Footer";

export default function HomePage() {
  return (
    <div className="editorial relative z-[1] min-h-screen">
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
