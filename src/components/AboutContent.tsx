'use client';

import { motion } from 'framer-motion';

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay },
  };
}

const timeline = [
  {
    period: '2018',
    role: 'Software Engineering Bootcamp',
    company: 'General Assembly',
    detail:
      'Learned to code late at night, shipped my first real project, and realized I actually loved this. Went from zero to employed in under a year.',
  },
  {
    period: 'Jan 2019 – June 2019',
    role: 'Web Developer',
    company: 'Kortivity',
    detail:
      'First job out of bootcamp. Built a Vue/SQL-powered web extension for candidate sourcing. Contributed to 2 client closes before the contract ended. Owned the full SDLC from day one.',
  },
  {
    period: 'Dec 2019 – Aug 2024',
    role: 'Solutions Engineer → Senior SE',
    company: 'IBM — Client Engineering',
    detail:
      "Promoted to Senior SE in 14 months. Led technical engagements for 12 enterprise customers — NBC Universal, Citibank, AT&T, CenterPoint Energy. Designed multi-cloud Kubernetes solutions across AWS, GCP, and IBM Cloud. POC close rate of 70%. Directly contributed to a $10.1M SAP RISE deal by automating Terraform environments from 2 to 49, cutting provisioning from 2+ weeks to under 3 hours.",
  },
  {
    period: 'Jan 2025 – Sept 2025',
    role: 'Site Reliability Engineer',
    company: 'Prove AI',
    detail:
      "Startup pace after four years of enterprise. Owned production infrastructure across 4 Kubernetes clusters. Maintained 99.9% uptime, reduced deploy times by 80% through GitHub Actions automation, and led SOC 2 Type II readiness from 34% to 100%.",
  },
  {
    period: 'Oct 2025 – Present',
    role: 'Founder & Full-Stack Developer',
    company: 'Sproutflow Studio',
    detail:
      "Five client apps shipped end-to-end — telehealth platforms, e-commerce stores, event booking. Lead technical discovery, scope architecture, build, and deploy. No handoffs. Small businesses deserve software that actually works.",
  },
];

const values = [
  {
    icon: '⟡',
    title: 'I share everything',
    body: 'Most of my work is open source. If I figured something out, somebody else should be able to skip that part.',
  },
  {
    icon: '</>',
    title: 'Depth over breadth',
    body: "I'd rather really understand one thing than know the surface of twenty. But I'm also genuinely curious about almost everything.",
  },
  {
    icon: '⚡',
    title: 'Build first, theorize second',
    body: "The best way to understand a thing is to make it. I reach for running code before I reach for frameworks.",
  },
  {
    icon: '◎',
    title: 'People are the hard part',
    body: "Six years in enterprise taught me that the technical problems are rarely the hardest ones. Communication, trust, and alignment matter more than most engineers want to admit.",
  },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">

      {/* ─── HEADER ─────────────────────────────────────────────────── */}
      <motion.div className="mb-20 max-w-[760px]" {...fadeUp(0)}>
        <div className="font-mono text-[0.65rem] text-matrix tracking-[0.2em] uppercase mb-3">
          About
        </div>
        <h1 className="font-heading text-[clamp(2.2rem,5vw,3.8rem)] font-semibold tracking-tight text-mtext-primary leading-[1.1] mb-6">
          Hey, I&apos;m Ben.
        </h1>
        <p className="font-body text-[clamp(1rem,1.6vw,1.2rem)] text-mtext-light leading-relaxed">
          I&apos;m a software engineer and solutions architect based in New Orleans. I build full-stack applications,
          cloud infrastructure, and AI-native tools — mostly because I can&apos;t stop thinking about how things could work better.
        </p>
      </motion.div>

      {/* ─── ORIGIN STORY ───────────────────────────────────────────── */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mb-24" {...fadeUp(0.1)}>
        <div>
          <div className="font-mono text-[0.65rem] text-matrix tracking-[0.2em] uppercase mb-5">
            The honest version
          </div>
          <div className="space-y-5 font-body text-[1rem] text-mtext-dim leading-relaxed">
            <p>
              I didn&apos;t grow up wanting to be an engineer. I found my way into tech through General Assembly in 2018 — took the bootcamp, built some things, stayed up too late debugging, and somewhere along the way got genuinely hooked. First job out of bootcamp was at Kortivity in Austin, building a candidate sourcing tool. Owned the full stack from day one.
            </p>
            <p>
              IBM was my proving ground. Almost five years — started as a Solutions Engineer in December 2019, promoted to Senior SE in 14 months. Worked with 12 enterprise customers, ran POCs with a 70% close rate, and served as the technical lead on a $10.1M SAP RISE deal for CenterPoint Energy. Learned how large organizations think, what makes technical trust hard to earn, and how to translate between business and engineering in both directions.
            </p>
            <p>
              Prove AI was the opposite energy. January to September 2025. Startup pace, real ownership. I ran SRE across 4 production Kubernetes clusters, maintained 99.9% uptime, cut deploy times by 80%, and took SOC 2 Type II readiness from 34% to 100%. That nine months confirmed what I suspected: I work best when I have genuine responsibility for what I build.
            </p>
            <p>
              Sproutflow Studio started in October 2025. It&apos;s the consultancy I&apos;d been wanting to build — shipping real products for real people. Five client apps in production. Telehealth platforms, e-commerce stores, event booking. No handoffs. I lead discovery, scope architecture, build, and deploy.
            </p>
            <p>
              Alongside Sproutflow, I&apos;m deep in AI tooling. Greenlit started as something I built for my own job search. The prompt engineering framework started as notes I was keeping for myself. That&apos;s usually how the best stuff starts.
            </p>
          </div>
        </div>

        {/* Sidebar stats */}
        <motion.div className="flex flex-col gap-5" {...fadeUp(0.2)}>
          {[
            { num: '$10.1M', label: 'Enterprise deal contributed', detail: 'IBM SAP RISE' },
            { num: '99.9%', label: 'Uptime maintained', detail: 'Production infra at Prove AI' },
            { num: '5+', label: 'Client apps shipped', detail: 'Sproutflow Studio' },
            { num: '6+', label: 'Years in the field', detail: '2019 – present' },
          ].map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-[14px] border border-mborder-subtle"
              style={{ background: 'rgba(10,10,10,0.75)' }}
            >
              <div className="font-heading text-[2rem] font-semibold text-matrix-light tracking-tight leading-none mb-1">
                {s.num}
              </div>
              <div className="font-heading text-[0.85rem] text-mtext-primary mb-0.5">{s.label}</div>
              <div className="font-mono text-[0.6rem] text-mtext-muted tracking-[0.08em] uppercase">{s.detail}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ─── TIMELINE ───────────────────────────────────────────────── */}
      <motion.div className="mb-24" {...fadeUp(0.15)}>
        <div className="font-mono text-[0.65rem] text-matrix tracking-[0.2em] uppercase mb-8">
          How I got here
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, rgba(0,255,65,0.3), transparent)' }}
          />
          <div className="space-y-10 md:pl-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[13px] top-1 w-2 h-2 rounded-full bg-matrix hidden md:block"
                  style={{ boxShadow: '0 0 8px rgba(0,255,65,0.5)' }}
                />
                <div className="font-mono text-[0.6rem] text-matrix tracking-[0.12em] uppercase mb-1">
                  {item.period} · {item.company}
                </div>
                <div className="font-heading text-[1.05rem] font-semibold text-mtext-primary mb-1.5">
                  {item.role}
                </div>
                <p className="font-body text-[0.9rem] text-mtext-muted leading-relaxed max-w-[640px]">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── VALUES / HOW I WORK ─────────────────────────────────────── */}
      <motion.div className="mb-24" {...fadeUp(0.2)}>
        <div className="font-mono text-[0.65rem] text-matrix tracking-[0.2em] uppercase mb-8">
          How I work
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-6 rounded-[14px] border border-mborder-subtle"
              style={{ background: 'rgba(10,10,10,0.75)' }}
            >
              <div className="w-8 h-8 rounded-lg border border-mborder-hover flex items-center justify-center font-mono text-[0.85rem] text-matrix mb-4">
                {v.icon}
              </div>
              <h3 className="font-heading text-[0.95rem] font-semibold text-mtext-primary mb-2">
                {v.title}
              </h3>
              <p className="font-body text-[0.85rem] text-mtext-muted leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── OUTSIDE OF WORK ─────────────────────────────────────────── */}
      <motion.div className="mb-24 max-w-[680px]" {...fadeUp(0.25)}>
        <div className="font-mono text-[0.65rem] text-matrix tracking-[0.2em] uppercase mb-5">
          Outside of work
        </div>
        <div className="space-y-4 font-body text-[1rem] text-mtext-dim leading-relaxed">
          <p>
            New Orleans is a weird and wonderful place to live, and it suits me. There&apos;s something about a city that runs on music, food, and stubborn creativity that I find hard to leave.
          </p>
          <p>
            I explore a lot — new tech, new tools, new ways of thinking about old problems. I&apos;ve been building in public lately because I think the practice of explaining what you&apos;re doing forces you to understand it better.
          </p>
          <p>
            I spend a lot of time thinking about how to make AI useful for people who aren&apos;t engineers — not just impressive, but actually helpful. That&apos;s the thread connecting most of what I build right now.
          </p>
          <p>
            If you want to compare notes on any of this, I&apos;m usually reachable.
          </p>
        </div>
      </motion.div>

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <motion.div
        className="pt-12 border-t border-mborder-rule flex flex-wrap gap-4 items-center"
        {...fadeUp(0.3)}
      >
        <a
          href="/contact"
          className="font-heading text-[0.85rem] font-medium tracking-[0.04em] text-mbg-primary bg-matrix py-3 px-7 rounded-[4px] no-underline inline-flex items-center gap-2 relative transition-all duration-300 hover:bg-matrix-light"
        >
          <span
            className="absolute -inset-1.5 rounded-[10px] -z-[1]"
            style={{ background: 'radial-gradient(circle, rgba(0,255,65,0.15) 0%, transparent 70%)' }}
          />
          Get In Touch <span>→</span>
        </a>
        <a
          href="/projects"
          className="font-heading text-[0.85rem] text-mtext-dim py-3 px-7 border border-mborder-hover rounded-[4px] no-underline transition-all duration-300 hover:text-mtext-primary hover:border-mglow-borderHover"
        >
          See My Work
        </a>
        <a
          href="https://github.com/WBHankins93"
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-[0.85rem] text-mtext-dim no-underline transition-colors duration-300 hover:text-matrix ml-2"
        >
          GitHub →
        </a>
      </motion.div>
    </div>
  );
}
