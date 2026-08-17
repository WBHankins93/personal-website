"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/animation-configs/ease";

const EMAIL = "benhankins.work@gmail.com";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const washYRaw = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const washY = useSpring(washYRaw, { stiffness: 100, damping: 28, mass: 0.35 });

  return (
    <section ref={sectionRef} id="contact" className="inverse-ledger relative overflow-hidden bg-accent px-6 py-20 text-paper md:px-8 md:py-28">
      <motion.svg
        viewBox="0 0 600 600"
        fill="none"
        className="tree-ring-field pointer-events-none absolute -right-28 top-0 hidden h-full w-[62%] text-paper md:block"
        style={reduce ? undefined : { y: washY }}
        aria-hidden
      >
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M299 32C391 24 493 77 548 161C596 235 582 342 548 421C510 510 421 566 322 575C225 584 120 549 67 468C16 390 20 286 54 202C89 115 196 42 299 32Z" />
          <path d="M303 76C386 68 464 108 512 175C554 234 546 321 517 390C484 468 410 522 326 530C239 538 153 508 105 439C59 373 62 289 91 218C122 141 218 84 303 76Z" />
          <path d="M298 121C371 112 432 145 474 200C511 250 502 316 479 370C450 437 393 480 324 488C253 496 185 470 145 416C108 365 106 301 130 243C157 177 228 130 298 121Z" />
          <path d="M301 162C358 153 410 181 441 225C469 265 463 319 443 359C419 409 375 442 321 447C264 453 211 431 180 390C151 351 151 304 169 260C190 210 243 171 301 162Z" />
          <path d="M302 207C348 199 382 220 407 252C427 280 421 318 408 347C390 382 357 402 319 407C279 411 244 396 221 367C200 340 198 307 211 277C226 242 262 214 302 207Z" />
          <path d="M301 250C330 245 356 257 371 278C386 298 379 326 369 342C356 362 338 372 315 373C291 375 270 365 258 347C247 329 246 308 255 291C265 271 278 255 301 250Z" />
          <path d="M304 286C321 283 337 291 343 305C350 318 343 334 334 342C325 350 310 350 299 345C287 339 282 326 285 314C288 301 293 289 304 286Z" />
          <path d="M303 306L247 227M307 309L362 227M308 313L409 307M306 316L362 391M302 315L233 374M300 311L175 303" opacity=".72" />
          <path d="M258 142C267 164 271 183 268 208M418 187C394 199 377 213 367 233M470 393C441 384 418 377 396 380M172 439C196 421 214 405 225 385" opacity=".55" />
        </g>
      </motion.svg>
      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? { opacity: 1, y: 0 } : undefined}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE.easeOut }}
      >
        <div className="mb-5 flex items-center justify-center gap-3 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-paper/70">
          <span className="h-px w-8 bg-paper/30" />
          <span className="text-[#F3B18C]">No. 04</span>
          <span>Contact</span>
          <span className="h-px w-8 bg-paper/30" />
        </div>
        <h2 className="font-heading text-[clamp(2.25rem,5.5vw,3.5rem)] font-bold tracking-tight text-paper">
          Let&apos;s build something.
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] font-body text-[1.05rem] leading-relaxed text-paper/75">
          {/* TODO: Confirm whether GTM Engineer should remain, or be replaced with Solutions Architect. */}
          Open to Solutions Engineer and GTM Engineer roles. Also available for
          consulting through{" "}
          <a
            href="https://sproutflow-studio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-paper underline decoration-paper/45 underline-offset-4 transition-colors hover:decoration-paper"
          >
            Sproutflow Studio
          </a>
          .
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-md bg-paper px-5 py-3 font-heading text-[0.95rem] font-medium text-accent no-underline transition-colors hover:bg-paper-alt"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
          <a
            href="https://www.linkedin.com/in/ben-hankins/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-paper/35 px-5 py-3 font-heading text-[0.95rem] font-medium text-paper no-underline transition-colors hover:border-paper hover:bg-paper/10"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href="https://github.com/WBHankins93"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-paper/35 px-5 py-3 font-heading text-[0.95rem] font-medium text-paper no-underline transition-colors hover:border-paper hover:bg-paper/10"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
