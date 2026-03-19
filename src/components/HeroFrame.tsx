'use client';

/**
 * Decorative green border frame with corner accents for the hero section.
 * Purely visual — pointer-events: none.
 */
export default function HeroFrame() {
  return (
    <div className="absolute pointer-events-none z-[1]" style={{ inset: '6rem 2rem 2rem' }}>
      {/* Horizontal lines */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.10) 20%, rgba(0,255,65,0.30) 50%, rgba(0,255,65,0.10) 80%, transparent)',
        }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.10) 20%, rgba(0,255,65,0.30) 50%, rgba(0,255,65,0.10) 80%, transparent)',
        }}
      />
      {/* Vertical lines */}
      <div
        className="absolute top-0 bottom-0 left-0 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0,255,65,0.10) 20%, rgba(0,255,65,0.30) 50%, rgba(0,255,65,0.10) 80%, transparent)',
        }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0,255,65,0.10) 20%, rgba(0,255,65,0.30) 50%, rgba(0,255,65,0.10) 80%, transparent)',
        }}
      />

      {/* Corner accents — 12px cross marks */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => {
        const isTop = pos.includes('t');
        const isLeft = pos.includes('l');
        return (
          <div
            key={pos}
            className="absolute w-3 h-3"
            style={{
              [isTop ? 'top' : 'bottom']: '-6px',
              [isLeft ? 'left' : 'right']: '-6px',
            }}
          >
            {/* Horizontal bar */}
            <div
              className="absolute bg-matrix-dim"
              style={{
                width: '12px',
                height: '1px',
                [isTop ? 'top' : 'bottom']: 0,
                [isLeft ? 'left' : 'right']: 0,
              }}
            />
            {/* Vertical bar */}
            <div
              className="absolute bg-matrix-dim"
              style={{
                width: '1px',
                height: '12px',
                [isTop ? 'top' : 'bottom']: 0,
                [isLeft ? 'left' : 'right']: 0,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
