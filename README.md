# Ben Hankins: Personal Website

> Full Stack Engineer · South Louisiana

Live site: https://benhankins.dev

---

## Overview

Personal site for Ben Hankins. The idea behind the design: the landscape is
visibly engineered. A South Louisiana bayou loads as a schematic and gets
painted into a park-poster scene.

One page, in this order:

- **Hero** — the bayou, schematic to painted, with a drag handle between the two
- **Ticker** — the stack
- **Selected work** — posters that flip to an architecture diagram and unfold into details
- **The trail** — career as an elevation map, 2018 to now
- **Off the clock** — four postcards
- **Contact** — the park sign

`/projects`, `/about` and `/contact` permanently redirect into the matching
section, so old inbound links still work.

Copy and facts live in typed data files under `src/content/`.

---

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
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

See `CLAUDE.md` for architecture notes, `docs/DESIGN.md` for the design
system, and `docs/redesign-bayou/HANDOFF.md` for the redesign spec.

---

## License

MIT
