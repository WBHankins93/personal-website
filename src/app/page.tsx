"use client";

import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
// import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />

      <section className="py-20">
        <HeroSection />
      </section>

      <section className="py-12">
        <AboutSection />
      </section>

      <section className="py-12">
        <ExperienceSection />
      </section>

      <section className="py-12">
        <ProjectsSection />
      </section>

      {/* <section className="py-12">
        <ContactSection />
      </section> */}

      <footer id="footer">
        <Footer />
      </footer>
    </main>
  );
}