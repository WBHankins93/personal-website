import type { Metadata } from 'next';
import MatrixNav from '@/components/MatrixNav';
import AboutContent from '@/components/AboutContent';
import MatrixFooter from '@/components/MatrixFooter';

export const metadata: Metadata = {
  title: 'About | Ben Hankins',
  description:
    'Solutions engineer and full-stack developer based in New Orleans. Six years building cloud infrastructure, enterprise software, and AI tools.',
};

export default function AboutPage() {
  return (
    <main>
      <div className="relative z-[1]">
        <MatrixNav />
        <AboutContent />
        <MatrixFooter />
      </div>
    </main>
  );
}
