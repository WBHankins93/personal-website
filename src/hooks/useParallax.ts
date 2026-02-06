import { useEffect, useState } from 'react';

interface ParallaxOptions {
  speed?: number; // 0-1, where 0.5 means element moves at half scroll speed
  offset?: number; // Initial offset
}

/**
 * Hook to calculate parallax offset based on scroll position
 * Returns transform value for parallax effect
 */
export function useParallax(options: ParallaxOptions = {}): number {
  const { speed = 0.5, offset = 0 } = options;
  const [parallaxOffset, setParallaxOffset] = useState(offset);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setParallaxOffset(offset + scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset]);

  return parallaxOffset;
}
