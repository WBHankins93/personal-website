import { useEffect, useState } from 'react';

interface ScrollState {
  isScrolled: boolean;
  scrollDirection: 'up' | 'down' | null;
  scrollY: number;
}

/**
 * Hook to detect scroll position and direction
 * Returns scroll state including direction for hide/show nav behavior
 */
export function useScrollTrigger(threshold: number = 8): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    scrollDirection: null,
    scrollY: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollState({
        isScrolled: currentScrollY > threshold,
        scrollDirection: currentScrollY > threshold ? scrollDirection : null,
        scrollY: currentScrollY,
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollState;
}
