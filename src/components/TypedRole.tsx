'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const phrases = [
  'customer-facing applications',
  'cloud infrastructure',
  'AI-native systems',
  'full-stack platforms',
  'vibe-coded applications',
];

export default function TypedRole() {
  const prefersReducedMotion = useReducedMotion();
  const spanRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [minWidth, setMinWidth] = useState<number>(0);

  // Measure longest phrase on mount and lock width
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    let maxW = 0;
    phrases.forEach((p) => {
      el.textContent = p;
      const w = el.scrollWidth;
      if (w > maxW) maxW = w;
    });
    setMinWidth(maxW);
    el.textContent = '';
  }, []);

  // Typing animation loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(phrases[0]);
      return;
    }

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeSpeed = 65;
    const deleteSpeed = 35;
    const pauseEnd = 2200;
    const pauseStart = 400;

    function tick() {
      const current = phrases[phraseIdx];
      if (!deleting) {
        setDisplayText(current.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === current.length) {
          timeoutId = setTimeout(() => {
            deleting = true;
            tick();
          }, pauseEnd);
          return;
        }
        timeoutId = setTimeout(tick, typeSpeed + Math.random() * 30);
      } else {
        setDisplayText(current.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          timeoutId = setTimeout(tick, pauseStart);
          return;
        }
        timeoutId = setTimeout(tick, deleteSpeed);
      }
    }

    timeoutId = setTimeout(tick, 1200);
    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  return (
    <span
      ref={spanRef}
      className="text-matrix-light font-medium inline-block text-left align-baseline border-r-2 border-matrix pr-1 animate-cursor-blink font-heading"
      style={{ minWidth: minWidth > 0 ? `${minWidth}px` : '10em' }}
    >
      {displayText}
    </span>
  );
}
