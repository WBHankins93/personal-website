import type { Metadata } from 'next';
import MatrixNav from '@/components/MatrixNav';
import ProjectsGrid from '@/components/ProjectsGrid';
import MatrixFooter from '@/components/MatrixFooter';

export const metadata: Metadata = {
  title: 'Projects | Ben Hankins',
  description:
    'Full-stack, AI engineering, infrastructure, and client work projects by Ben Hankins.',
};

export default function ProjectsPage() {
  return (
    <main>
      <div className="relative z-[1]">
        <MatrixNav />
        <ProjectsGrid />
        <MatrixFooter />
      </div>
    </main>
  );
}
