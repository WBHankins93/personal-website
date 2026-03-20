'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

const lookingForOptions = [
  'Full-time role',
  'Freelance project',
  'Just connecting',
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/WBHankins93',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ben-hankins/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/benhankins_/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

interface FormData {
  name: string;
  email: string;
  lookingFor: string;
  message: string;
}

export default function ContactContent() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    lookingFor: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `${form.lookingFor || 'Contact'} — ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nLooking for: ${form.lookingFor}\n\n${form.message}`
    );

    window.location.href = `mailto:benhankins.work@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClasses =
    'w-full bg-[rgba(10,10,10,0.75)] border border-mborder-subtle rounded-[6px] px-4 py-3 font-body text-[0.9rem] text-mtext-primary placeholder:text-mtext-muted outline-none transition-colors duration-200 focus:border-matrix-dim focus:ring-1 focus:ring-matrix-dim/30';

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      {/* Section header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="font-mono text-[0.65rem] text-matrix tracking-[0.2em] uppercase mb-2">
          Contact
        </div>
        <h1 className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-tight text-mtext-primary">
          Let&apos;s build something.
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {submitted && (
            <div className="font-mono text-[0.8rem] text-matrix bg-[rgba(0,255,65,0.05)] border border-matrix-dim rounded-[6px] p-4">
              Your email client should have opened. If not, email me directly at{' '}
              <a href="mailto:benhankins.work@gmail.com" className="underline">
                benhankins.work@gmail.com
              </a>
            </div>
          )}

          <div>
            <label className="block font-mono text-[0.7rem] text-mtext-muted tracking-[0.08em] uppercase mb-2">
              Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block font-mono text-[0.7rem] text-mtext-muted tracking-[0.08em] uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block font-mono text-[0.7rem] text-mtext-muted tracking-[0.08em] uppercase mb-2">
              What are you looking for?
            </label>
            <select
              value={form.lookingFor}
              onChange={(e) => setForm({ ...form, lookingFor: e.target.value })}
              className={`${inputClasses} appearance-none`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' fill='none' stroke='%23999' stroke-width='1.5'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
              }}
            >
              <option value="">Select...</option>
              {lookingForOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-mono text-[0.7rem] text-mtext-muted tracking-[0.08em] uppercase mb-2">
              Message
            </label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project or what you have in mind..."
              rows={6}
              className={`${inputClasses} resize-y`}
            />
          </div>

          <button
            type="submit"
            className="font-heading text-[0.85rem] font-medium tracking-[0.04em] text-mbg-primary bg-matrix py-3.5 px-8 rounded-[4px] inline-flex items-center gap-2 transition-all duration-300 hover:bg-matrix-light cursor-pointer border-none self-start relative"
          >
            <span
              className="absolute -inset-1.5 rounded-[10px] -z-[1]"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,255,65,0.15) 0%, transparent 70%)',
              }}
            />
            Send Message <span>→</span>
          </button>
        </motion.form>

        {/* Sidebar */}
        <motion.aside
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Email */}
          <div>
            <div className="font-mono text-[0.65rem] text-mtext-muted tracking-[0.1em] uppercase mb-2">
              Email
            </div>
            <a
              href="mailto:benhankins.work@gmail.com"
              className="font-heading text-[0.95rem] text-matrix no-underline hover:text-matrix-light transition-colors duration-200"
            >
              benhankins.work@gmail.com
            </a>
          </div>

          {/* Location */}
          <div>
            <div className="font-mono text-[0.65rem] text-mtext-muted tracking-[0.1em] uppercase mb-2">
              Location
            </div>
            <p className="font-heading text-[0.95rem] text-mtext-dim">
              New Orleans, LA
            </p>
          </div>

          {/* Socials */}
          <div>
            <div className="font-mono text-[0.65rem] text-mtext-muted tracking-[0.1em] uppercase mb-3">
              Socials
            </div>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mtext-muted transition-colors duration-200 hover:text-matrix-light"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mt-4 p-5 rounded-[14px] border border-mglow-border"
            style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(0,255,65,0.03) 100%)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-matrix rounded-full animate-pulse-glow" />
              <span className="font-mono text-[0.65rem] text-matrix tracking-[0.1em] uppercase">
                Open to Opportunities
              </span>
            </div>
            <p className="font-body text-[0.8rem] text-mtext-muted leading-relaxed">
              Currently open to full-stack, solutions engineering, and AI-focused roles.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
