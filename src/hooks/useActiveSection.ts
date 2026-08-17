import { useEffect, useMemo, useState } from 'react';

/**
 * Tracks which section is currently under a reading band near the middle of the
 * viewport.
 *
 * Uses a single IntersectionObserver rather than a scroll listener, so it costs
 * nothing per frame and only renders when the active section actually changes.
 * The root is inset to a ~10vh band so exactly one section qualifies at a time
 * and the active state flips at a predictable point rather than on first pixel.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const key = ids.join('|');
  const sectionIds = useMemo(() => key.split('|').filter(Boolean), [key]);
  const [active, setActive] = useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
