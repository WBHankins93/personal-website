import type { Project } from '@/data/projects';

export const categoryLabel: Record<string, string> = {
  'web-dev': 'Full-Stack',
  'ai-engineering': 'AI Engineering',
  python: 'Python',
  infrastructure: 'Infrastructure',
  'ci-cd': 'CI/CD',
  education: 'Education',
  'client-work': 'Client Work',
  monitoring: 'Monitoring',
  security: 'Security',
  automation: 'Automation',
};

export function statusColor(status: Project['status']): string {
  switch (status) {
    case 'Active':
    case 'Maintained':
      return '#00FF41';
    case 'Live Beta':
      return 'rgba(255,180,0,0.85)';
    case 'Complete':
    case 'Archived':
      return 'rgba(255,255,255,0.35)';
    default:
      return '#999';
  }
}

export function projectLink(project: Project): { href: string; label: string } {
  if (project.live_url) return { href: project.live_url, label: 'Visit Site →' };
  if (project.github_url) return { href: project.github_url, label: 'GitHub →' };
  return { href: '/contact', label: 'Get in touch to learn more →' };
}
