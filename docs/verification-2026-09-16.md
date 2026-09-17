# Portfolio verification — 2026-09-16

Verification pass against the handoff brief. Production was compared with
`main`, every route and link was checked, and only the defects found here were
fixed.

- **Production URL:** https://benhankins.dev (apex 307s to `https://www.benhankins.dev`)
- **Branch:** `verify/portfolio-proof-capture`, branched from `main` at `7aa3e23`
- **Deployed commit matched `main`:** yes — the merged customer-facing
  positioning from PR #22 is live.

## Routes checked

All returned the expected status from production:

| Route | Result |
| --- | --- |
| `/` | 200 |
| `/projects` | 200 |
| `/projects/greenlit` | 200 |
| `/projects/business-plan-writer` | 200 |
| `/projects/living-playbooks` | 200 |
| `/about` | 308 → `/#experience` |
| `/contact` | 308 → `/#contact` |
| `/Ben_Hankins_SE_Resume.pdf` | 200, `application/pdf`, 106 KB |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |
| `/opengraph-image` | 200, `image/png` |
| unknown route | 404 |

## Links checked

Every outbound link resolves:

- greenlit.cv — 200
- business-plan-writer-chi.vercel.app — 200
- wbhankins93.github.io/solutions-playbook — 200
- github.com/WBHankins93/solutions-playbook — 200
- sproutflow-studio.com — 200
- github.com/WBHankins93 — 200
- linkedin.com/in/ben-hankins — returns LinkedIn's `999` bot challenge to
  command-line requests; loads normally in a browser. Not a broken link.
- `mailto:benhankins.work@gmail.com` — present on the contact CTA.

## Resume

The served PDF is byte-identical to `public/Ben_Hankins_SE_Resume.pdf`
(sha256 `075650c9…`) and was last updated in `2eafde9`, the same commit as the
customer-facing positioning work — so it is the approved Solutions Engineer
version, not stale. Its facts match the site: $13M pipeline, 12 named accounts,
~80% faster deploys, SOC 2 from a 34% Vanta baseline, 4 Kubernetes clusters,
and CenterPoint's $10.1M SAP RISE engagement expanding 2 environments to 52.

## Fixes made

1. **Hero was invisible under `prefers-reduced-motion`** (`Hero.tsx`,
   `globals.css`). The reveal props branched on `useReducedMotion`, which can
   only report the real preference after mount, so the server always rendered
   `opacity: 0` and the branch raced the mount animation. When the effect
   landed first the element stayed stranded — reproduced on live production
   with the whole hero text column blank: no name, no tagline, no CTAs.
   Reduced motion is now handled in CSS, where `.motion-reveal` is pinned to
   its final state from the first paint and never depends on JS.

2. **Same defect on the three case-study pages** (`ProjectCaseStudy.tsx`). The
   header — project title, stage, and the live "Visit …" links — used the same
   pattern. Fixed the same way and verified.

3. **Open Graph card carried the old tagline** (`opengraph-image.tsx`). The
   live share card still read "Solutions Engineer by career. Builder by
   default." — the pre-PR#22 line — and used an off-brand blue/white palette.
   Now reads "Customer-facing engineer by career. Product builder by
   practice." on the field-journal palette, with the bottom rule changed from
   "Enterprise architecture · Cloud · AI · Product" to "Solutions engineering ·
   Cloud · Full-stack · AI" so the card does not lean architect.

4. **JSON-LD description was narrower than the site** (`structured-data.ts`).
   Now matches the customer-facing line used in `layout.tsx`.

5. **README led with older positioning** (`README.md`). Rewritten to lead with
   the current identity and the four role targets, and corrected: the stack
   listed Next.js 14 and `@react-three/fiber`, which is no longer a dependency.

## Verification results

`npm run type-check`, `npm run lint`, `npm test -- --runInBand` (7/7), and
`npm run build` all pass. Metadata was re-checked after the changes: titles,
descriptions, canonicals, OG/Twitter tags, and JSON-LD are consistent across
`/`, `/projects`, and all three case studies.

## Screenshots

Six current captures in `docs/screenshots/` — home hero, selected work, and
contact CTA at 1440×900 and 390×844. See that folder's README for how they
were produced.

## Follow-up changes

- **Contact copy trimmed to the four role targets.** "Customer Engineer" was
  removed from the contact section and the metadata keywords — it overlaps
  with Solutions Engineer, so it added length without adding a distinct target.
- **`CLAUDE.md` rewritten** to match the current codebase. It described a
  Matrix green theme, a `src/components/ui/` directory, `src/lib/colors.ts`, a
  `cn()` helper, Radix UI, and Three.js, none of which exist now.

## Open items (not changed)

- **`receipt.html`** remains an orphaned file at the repo root, as recorded in
  `docs/role-targeting-copy-fix-2026-08-30.md`.
