# Ben Hankins: Personal Website

> Customer-facing engineer by career. Product builder by practice.

Live site: https://benhankins.dev

---

## Overview

Personal portfolio site and career hub. It presents Ben Hankins as a
customer-facing engineer who builds, backed by proof across full-stack
development, cloud infrastructure, and AI engineering.

The site is a single editorial page plus per-project case studies:

- **Hero** — identity, headline metrics, and the enterprise accounts engaged
- **Selected work** — three flagship projects, each with a full case study
- **Experience** — timeline from IBM Client Engineering through Sproutflow Studio
- **Contact** — role targets and direct links

`/about` and `/contact` are permanent redirects into the corresponding
sections of the homepage, kept so inbound links and SEO equity survive the
consolidation to one page.

---

## Positioning

The site targets one narrative, not a list of every possible title:

- **Solutions Engineer**
- **Forward Deployed Engineer**
- **Implementation Engineer**
- Selective **Full Stack Engineer** roles

Consulting work runs through [Sproutflow Studio](https://sproutflow-studio.com).

Identity copy lives in three places that must stay in sync: the `Hero`
tagline, the `layout.tsx` description/metadata, and `opengraph-image.tsx`.

---

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide Icons
- Jest
- Vercel (deployment)

---

## Local Development

```bash
git clone https://github.com/WBHankins93/personal-website.git
cd personal-website
npm install
npm run dev
# Open http://localhost:3000
```

### Checks

```bash
npm run type-check   # TypeScript
npm test             # Jest
npm run build        # Production build
npm run build:check  # type-check + build, use before deploy
```

See `CLAUDE.md` for architecture notes and `docs/DESIGN.md` for the design
system. Current site screenshots live in `docs/screenshots/`.

---

## License

MIT
