"use client";

import MatrixNav from "@/components/MatrixNav";
import MatrixHero from "@/components/MatrixHero";
import TechTicker from "@/components/TechTicker";
import BentoGrid from "@/components/BentoGrid";
import Divider from "@/components/Divider";
import MatrixProjects from "@/components/MatrixProjects";
import MatrixFooter from "@/components/MatrixFooter";

export default function HomePage() {
  return (
    <main>
      <div className="relative z-[1]">
        <MatrixNav />
        <MatrixHero />
        <TechTicker />
        <BentoGrid />
        <Divider />
        <MatrixProjects />
        <Divider />
        <MatrixFooter />
      </div>
    </main>
  );
}
