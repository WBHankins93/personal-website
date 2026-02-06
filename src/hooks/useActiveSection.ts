import { useEffect, useState, useRef, useMemo } from 'react';

/**
 * Hook to track which section is currently active in viewport
 * Returns the active section ID for nav highlighting
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Map<string, Element | null>>(new Map());
  const inViewStates = useRef<Map<string, boolean>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px', // Section is active when in center 60% of viewport
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Find which section this entry belongs to
        const sectionId = Array.from(sectionRefs.current.entries()).find(
          ([, element]) => element === entry.target
        )?.[0];

        if (sectionId) {
          inViewStates.current.set(sectionId, entry.isIntersecting);
        }
      });

      // Find the first section that's in view
      const inViewSection = Array.from(inViewStates.current.entries()).find(
        ([, inView]) => inView
      );
      if (inViewSection) {
        setActiveSection(inViewSection[0]);
      }
    }, observerOptions);

    // Observe all currently registered section elements
    sectionRefs.current.forEach((element) => {
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds]);

  // Create ref callbacks for each section
  const getRef = (id: string) => (node: Element | null) => {
    if (node) {
      sectionRefs.current.set(id, node);
      // Observe the element when it's added
      if (observerRef.current) {
        observerRef.current.observe(node);
      }
    } else {
      const element = sectionRefs.current.get(id);
      if (element && observerRef.current) {
        observerRef.current.unobserve(element);
      }
      sectionRefs.current.delete(id);
      inViewStates.current.delete(id);
    }
  };

  const refs = useMemo(() => {
    const refMap: Record<string, (node?: Element | null) => void> = {};
    sectionIds.forEach((id) => {
      refMap[id] = getRef(id);
      inViewStates.current.set(id, false);
    });
    return refMap;
  }, [sectionIds]);

  return activeSection;
}

/**
 * Simplified hook that returns refs for each section
 */
export function useSectionRefs(sectionIds: string[]) {
  const sectionRefs = useRef<Map<string, Element | null>>(new Map());
  const [inViewStates, setInViewStates] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px',
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const newInViewStates: Record<string, boolean> = {};

      entries.forEach((entry) => {
        // Find which section this entry belongs to
        const sectionId = Array.from(sectionRefs.current.entries()).find(
          ([, element]) => element === entry.target
        )?.[0];

        if (sectionId) {
          newInViewStates[sectionId] = entry.isIntersecting;
        }
      });

      setInViewStates((prev) => ({ ...prev, ...newInViewStates }));
    }, observerOptions);

    // Observe all currently registered section elements
    sectionRefs.current.forEach((element) => {
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds]);

  // Create ref callbacks for each section
  const getRef = (id: string) => (node: Element | null) => {
    if (node) {
      sectionRefs.current.set(id, node);
      // Observe the element when it's added
      if (observerRef.current) {
        observerRef.current.observe(node);
      }
    } else {
      const element = sectionRefs.current.get(id);
      if (element && observerRef.current) {
        observerRef.current.unobserve(element);
      }
      sectionRefs.current.delete(id);
    }
  };

  const refs = useMemo(() => {
    const refMap: Record<string, (node?: Element | null) => void> = {};
    sectionIds.forEach((id) => {
      refMap[id] = getRef(id);
    });
    return refMap;
  }, [sectionIds]);

  return { refs, inViewStates };
}
