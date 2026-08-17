import type { Metadata } from "next";
import Nav from "@/components/redesign/Nav";
import Footer from "@/components/redesign/Footer";
import ProjectBento from "@/components/projects/ProjectBento";

export const metadata: Metadata = {
  title: "Selected Projects",
  description:
    "Selected products, client work, and living technical systems by Ben Hankins.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="editorial min-h-screen">
      <Nav />
      <main className="pt-10">
        <ProjectBento compactHeader />
      </main>
      <Footer />
    </div>
  );
}
