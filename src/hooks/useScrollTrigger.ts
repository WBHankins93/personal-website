import { useEffect, useState } from 'react';

interface ScrollState {
  isScrolled: boolean;
  scrollDirection: 'up' | 'down' | null;
}

/**
 * Hook to detect scroll position and direction.
 *
 * Reads scroll inside a rAF tick and only commits state when one of the two
 * discrete values actually changes, so scrolling does not re-render the
 * consumer on every frame. For a continuous scroll value, use framer-motion's
 * `useScroll` instead: it drives a motion value without rendering React at all.
 */
export function useScrollTrigger(threshold: number = 8): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    scrollDirection: null,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      ticking = false;
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > threshold;

      let scrollDirection: ScrollState['scrollDirection'] = null;
      if (isScrolled && currentScrollY !== lastScrollY) {
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      }
      lastScrollY = currentScrollY;

      setScrollState((prev) =>
        prev.isScrolled === isScrolled && prev.scrollDirection === scrollDirection
          ? prev
          : { isScrolled, scrollDirection }
      );
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Sync once on mount so a restored scroll position is reflected immediately.
    updateScrollState();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollState;
}
