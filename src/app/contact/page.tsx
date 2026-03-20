import type { Metadata } from 'next';
import MatrixNav from '@/components/MatrixNav';
import ContactContent from '@/components/ContactContent';
import MatrixFooter from '@/components/MatrixFooter';

export const metadata: Metadata = {
  title: 'Contact | Ben Hankins',
  description:
    'Get in touch with Ben Hankins — open to full-stack, solutions engineering, and AI-focused roles.',
};

export default function ContactPage() {
  return (
    <main>
      <div className="relative z-[1]">
        <MatrixNav />
        <ContactContent />
        <MatrixFooter />
      </div>
    </main>
  );
}
