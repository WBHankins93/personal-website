'use client';

const items = [
  'TypeScript', 'React', 'Next.js', 'Kubernetes', 'AWS', 'GCP',
  'Terraform', 'Python', 'LLM Architecture', 'CI/CD', 'Node.js', 'Supabase',
];

export default function TechTicker() {
  return (
    <div className="overflow-hidden relative py-6 border-t border-b border-mglow-borderHover"
      style={{ background: 'rgba(0,255,65,0.02)', backdropFilter: 'blur(10px)' }}
    >
      {/* Left fade */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[140px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #060606 20%, transparent)' }}
      />
      {/* Right fade */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[140px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #060606 20%, transparent)' }}
      />

      <div className="flex animate-ticker-scroll w-max">
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-[0.8rem] font-normal tracking-[0.18em] uppercase text-matrix-dim whitespace-nowrap px-10 flex items-center gap-10"
            style={{ textShadow: '0 0 15px rgba(0,255,65,0.2)' }}
          >
            {item}
            <span
              className="w-1 h-1 bg-matrix rounded-full inline-block"
              style={{ boxShadow: '0 0 8px #00FF41, 0 0 16px rgba(0,255,65,0.15)' }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
