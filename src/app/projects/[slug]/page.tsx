import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/redesign/Nav";
import Footer from "@/components/redesign/Footer";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import { featuredProjects, getProject } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}
export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} | Ben Hankins`,
      description: project.summary,
      type: "article",
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="editorial min-h-screen">
      <Nav />
      <main>
        <ProjectCaseStudy project={project} />
      </main>
      <Footer />
    </div>
  );
}
