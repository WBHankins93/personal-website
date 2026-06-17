"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products, type Product } from "@/data/products";
import { STATUS_STYLE } from "@/lib/colors";

const GAP = 24; // px gap between cards

function ProductCard({ product }: { product: Product }) {
  const s = STATUS_STYLE[product.status];
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 md:p-9">
      {/* Status badge */}
      <div className="flex items-start justify-between gap-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.65rem] tracking-[0.08em] uppercase ${s.bg} ${s.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
          {product.status}
        </span>
      </div>

      {/* Name */}
      <h3 className="mt-5 font-heading font-bold text-ink tracking-tight text-[clamp(1.75rem,3vw,2.25rem)]">
        {product.name}
      </h3>

      {/* Problem */}
      <div className="mt-5">
        <p className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-ink-muted">
          Problem
        </p>
        <p className="mt-1.5 font-body text-ink-soft leading-relaxed">
          {product.problem}
        </p>
      </div>

      {/* Solution */}
      <div className="mt-4">
        <p className="font-mono text-[0.62rem] tracking-[0.12em] uppercase text-ink-muted">
          Solution
        </p>
        <p className="mt-1.5 font-body text-ink-soft leading-relaxed">
          {product.solution}
        </p>
      </div>

      {/* Stack */}
      <div className="mt-5 flex flex-wrap gap-2">
        {product.stack.map((t) => (
          <span
            key={t}
            className="rounded-md border border-line bg-paper-alt px-2.5 py-1 font-mono text-[0.7rem] text-ink-muted"
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA / note — pinned to bottom */}
      <div className="mt-auto pt-6">
        {product.cta ? (
          <a
            href={product.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-heading font-medium text-accent hover:text-accent-hover no-underline text-[0.95rem]"
          >
            {product.cta.label} <ArrowRight className="h-4 w-4" />
          </a>
        ) : product.note ? (
          <p className="font-mono text-[0.72rem] text-ink-muted">{product.note}</p>
        ) : null}
      </div>
    </article>
  );
}

export default function ProductCarousel() {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportW, setViewportW] = useState(0);
  const reduce = useFramerReducedMotion();

  const count = products.length;

  // Peek the next card: card occupies a fraction of the viewport width.
  const peek = viewportW >= 768 ? 0.82 : 0.86;
  const cardW = viewportW ? viewportW * peek : 0;
  const step = cardW + GAP;
  const maxIndex = count - 1;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewportW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(maxIndex, i)),
    [maxIndex]
  );
  const go = useCallback((i: number) => setIndex(clamp(i)), [clamp]);
  const prev = useCallback(() => setIndex((i) => clamp(i - 1)), [clamp]);
  const next = useCallback(() => setIndex((i) => clamp(i + 1)), [clamp]);

  return (
    <section id="products" className="px-6 md:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header + arrows */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-accent">
              Featured Products
            </p>
            <h2 className="mt-3 font-heading font-bold text-ink tracking-tight text-[clamp(1.75rem,3.5vw,2.5rem)]">
              Software I&apos;ve shipped.
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous product"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line-strong"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index === maxIndex}
              aria-label="Next product"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line-strong"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div ref={viewportRef} className="mt-10 overflow-hidden">
          <motion.div
            className="flex items-stretch"
            style={{ gap: GAP }}
            drag="x"
            dragConstraints={{ left: -step * maxIndex, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const threshold = cardW * 0.2;
              if (info.offset.x < -threshold || info.velocity.x < -400) next();
              else if (info.offset.x > threshold || info.velocity.x > 400) prev();
            }}
            animate={{ x: -index * step }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 32 }
            }
          >
            {products.map((p) => (
              <div
                key={p.name}
                className="shrink-0"
                style={{ width: cardW || "82%" }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {products.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to ${p.name}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-2 bg-line-strong hover:bg-ink-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
