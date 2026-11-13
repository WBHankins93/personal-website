# benhankins.dev redesign: build handoff for Claude Code

Date: 2026-11-13 · Owner: Ben Hankins · Status: design approved through mockup round 4, ready to build on a branch.

Read this whole file before writing code. The `reference/` folder holds the approved mockup (`index.html`, one self-contained page that draws everything with inline SVG) and screenshots of every section. Match the screenshots for look and layout. The mockup's code is a reference for shapes, colors and proportions, not production code.

---

## 1. Branch and release rules (non-negotiable)

1. Work in the existing benhankins.dev repo. Create `redesign/bayou` from the current `main`.
2. Every commit goes to `redesign/bayou`. Never commit to, push to, or merge into `main`.
3. Do not touch the production domain, DNS, or Vercel production settings.
4. Ben tests two ways: `npm run dev` locally, and the Vercel preview URL that the branch push creates.
5. When all milestones pass, open a pull request into `main` and stop. Ben merges it himself.
6. Small commits, one concern each. Push after each milestone so the preview stays current.
7. Before the first commit, read the repo's existing `AGENTS.md` / `CLAUDE.md` if present and follow it where it does not conflict with this file. Confirm plans with Ben before editing those files.

## 2. Why this redesign exists

The current site was built to win a Solutions Architect / Solutions Engineer job. That job search is over. Ben is now a Full Stack Engineer and wants the site to be his work and his personality together: loud, confident, bright, a nature person and a tech person in equal measure.

The central idea: **the landscape is visibly engineered.** A South Louisiana bayou appears first as a schematic (wireframe, node labels, a build log) and gets painted into a vintage park-poster scene. A visitor should never doubt that this is a software engineer's site.

Each theme has one job:

| Theme | Job |
|---|---|
| Nature (bayou, cypress, Spanish moss, firs, ridges) | The world: scenes and print style |
| Events (festivals, music, golf) | The energy: pink and yellow accents, motion, one postcard |
| Software | The structure: schematic twin of every picture, mono labels, real architecture |

## 3. Goals, non-goals, anti-goals

**Goals**
- A hero that sweeps from schematic to painted on load, then lets the visitor drag between the two.
- Selected Work shown as illustrated posters that flip to a real architecture diagram and unfold into real screenshots and links.
- Career shown as a trail map (elevation profile) using the dates in section 8.
- An "Off the clock" section with four illustrated postcards and one conservation line.
- Fast, accessible, and fully usable on phones.

**Non-goals (do not build now)**
- Any mention of Ben's new employer. He starts there shortly and asked to leave it off. The trail ends at a "Next summit" marker.
- A donation flow or named conservation partner. One line of text only.
- A blog, CMS, or contact form backend.
- Free-roam 3D navigation.

**Anti-goals (these make it a failure even if it works)**
- It reads as a nature or travel site. The role line, build log, schematic mode and architecture diagrams must stay prominent.
- The 3D hero stutters, delays first paint, or drains a laptop battery.
- Invented numbers, fake metrics, or inflated claims. Use only the facts in this file or supplied by Ben.
- Silent changes beyond this spec. If something here looks wrong, ask Ben.

## 4. Approaches considered

| | Approach | Trade-off | Decision |
|---|---|---|---|
| A | Full-page 3D bayou flyover, content as overlays | Biggest wow; heaviest assets, weak on phones, scenery competes with content | Rejected |
| B | Flat illustrated "field guide" site, no 3D | Fast and cheap; loses the interactive nature | Used for phones and as the fallback |
| C | One short 3D hero scene, then the poster-style page | Wow up front, calm stage for the work; more build effort than B | **Chosen for desktop, laptop, large tablet** |

Ben chose: C at 1024px and wider, B below that.

## 5. Stack and technical calls

Existing (keep): Next.js, TypeScript, Tailwind CSS, Framer Motion, Vercel.

Calls made by the designer (Ben has not weighed in on these; flag disagreement rather than silently changing them):

- **Hero is built in two tiers.** Tier 1 is pure SVG: two stacked copies of the scene (schematic and painted) with a CSS `clip-path` reveal. This is exactly how the mockup works and it ships first. Tier 2 adds Three.js on top for depth and motion. Tier 1 stays forever as the phone version and the fallback.
- **Three.js via `@react-three/fiber`**, loaded with `next/dynamic` and `ssr: false`, only at 1024px and wider, only when WebGL is available and reduced motion is off.
- **2.5D, not full 3D.** The scene is 6 to 8 flat illustrated layers placed at different depths (sky, sun and rays, far ridges, far trees, water, mid trees, egret, foreground trees and canopy). No modeled meshes, no GLTF downloads.
- **Fonts self-hosted** with `next/font/local` or `@fontsource`: Anton (display), JetBrains Mono (labels), Space Grotesk (body), DM Serif Display (tagline).
- **Content lives in typed data files**, not JSX: `content/projects.ts`, `content/trail.ts`, `content/postcards.ts`.
- **All illustration is SVG** generated by small React components (`<Cypress/>`, `<Fir/>`, `<Ridge/>`), ported from the generator functions in `reference/index.html`. Keep the seeded random helper so shapes are stable between renders and between server and client.

## 6. Design tokens

Add to the Tailwind theme. Names are suggestions; values are fixed.

| Token | Hex | Use |
|---|---|---|
| cream | `#f6ecd4` | Page background, poster paper, text on dark |
| ink | `#0b2423` | Body text, hard shadows, outlines |
| teal | `#12403e` | Mid trees, Off the clock background |
| teal-mid | `#2c6f66` | Far trees, trail slope, muted labels |
| water | `#1b5853` | Water |
| moss | `#5f7d57` / `#8fae7a` | Spanish moss |
| sun | `#f58a2c` | Suns, warm sky |
| coral | `#ee4e34` | Trail line, heading offset ink, ribbons |
| yellow | `#ffcb05` | Primary buttons, Field Kit border, active toggle |
| pink | `#ff3d8b` | Ticker band, flags, festival accents |
| cyan | `#37d6ff` | Festival accent only |
| mint | `#5dffb0` | Everything in schematic mode |
| schematic-bg | `#06120f` | Schematic background |
| sign | `#5b3a21` | Contact footer |
| sand | `#e9dcbc` | Trail section background |

Sky bands, top to bottom: `#fbe3ac`, `#f9d48f`, `#f7bf73`, `#f5a657`, `#f28f43`. Ridges: `#e2733a`, `#a8502f`.

**Type**
- Display: Anton, uppercase, line-height 0.92. Hero name about 214px at 1440 wide (use `clamp`). Section headings about 96px.
- Labels and UI: JetBrains Mono 500, uppercase, letter-spacing 0.08 to 0.14em, 11 to 14px.
- Body: Space Grotesk 400/700, 15 to 21px.
- Tagline only: DM Serif Display, about 27px.

**Print treatment**
- Hard offset shadows, no blur: `8px 10px 0 ink` on posters, cards and panels.
- Section headings carry an off-register second ink: `text-shadow: 5px 5px 0 coral` (ink on the teal section).
- Paper grain: an SVG `feTurbulence` noise overlay at `mix-blend-mode: multiply` on painted surfaces. Never on schematic surfaces.
- Halftone dot fills for shading inside illustrations.
- No gradients on painted surfaces except the phone hero scrim. No rounded cards. No glassmorphism. No drop-shadow blur.

## 7. Page structure

Order: Nav → Hero → Ticker → Selected Work → The Trail → Off the Clock → Contact sign.

Nav links: Work, Trail, Off the clock, Contact. Logo: the existing B circuit/node mark, top left. It needs a transparent-background version; the current PNG has a white box.

### 7.1 Hero (`reference/01`, `02`, `03`)

Full viewport height on desktop, about 700px on phones.

**Content**
- Name: "BEN HANKINS", two lines, starts about 118px from the top.
- Role line (mono): "Full Stack Engineer · South Louisiana".
- Tagline (serif). Placeholder: "I write software in South Louisiana, usually louder than necessary." `TODO(ben)`: confirm or replace.
- Buttons: "See the work →" (yellow, scrolls to Work) and "Walk the trail" (outline, scrolls to Trail).
- Featured card, lower right, painted mode only: yellow border, rotated 2deg, "Just shipped / Pre-Sales Field Kit / On Gumroad now →". Links to the Gumroad listing.
- Build log panel, upper right, schematic mode only: mono lines such as `> cypress.mesh ok`, `> moss.shader ok`, `> water.reflect ok`, `> paint 62%`. The paint percentage tracks the reveal position.
- Node labels on the schematic: `sun.light`, `cypress_02`, `egret.spawn(1)`, `water.plane`. Keep them playful and few (5 at most).

**Scene** (both modes draw the same shapes)
- Painted: banded dawn sky, sun on the horizon with a ring and poster-style rays, two ridge lines, a row of far cypress, water with sun reflection bars, four mid cypress with Spanish moss, an egret, two large foreground cypress framing left and right, a canopy branch across the top with hanging moss, a few birds.
- Schematic: the same shapes as 1.2px mint outlines with no fill on `#06120f`, a faint 48px grid, a perspective mesh on the water plane, node labels. A dark left-to-right fade sits behind the name so the mesh does not fight the text.

**Behavior**
1. On load the page shows schematic. After about 400ms a diagonal reveal line (mint, with a soft glow, tilted as in `02`) sweeps left to right over about 3 seconds and paints the scene.
2. The line parks at the right edge with a round yellow handle. Dragging the handle moves the reveal anywhere between fully schematic and fully painted.
3. A two-button switch, bottom right: "Schematic | Painted". Each animates the reveal to that end in about 600ms.
4. Name and text change with the reveal: mint outline in schematic, solid cream with an ink offset shadow in painted. Simplest correct approach: render the text block twice and clip each copy with the same reveal shape.
5. Scrolling is never hijacked. The hero does not react to scroll.
6. Reduced motion: no sweep. Start painted. Switch and handle still work, with instant changes.
7. Phones (below 1024px): no drag handle. Painted still image by default with the switch swapping to the schematic still. A dark top fade sits behind the text (see `08`).

**Tier 2 additions (Three.js, desktop only)**
- Layers sit at increasing depth. Pointer movement shifts the camera a few units for parallax. Clamp it; keep it subtle.
- Slow idle motion: moss strands sway, reflection bars shimmer, the egret shifts weight now and then. All of it stops when the tab is hidden or the hero is off screen.
- The reveal becomes one shader uniform (`uReveal`, 0 to 1) shared by all layers: one side of the diagonal renders line material, the other renders flat fill. Handle, switch and auto-sweep all drive that one value.
- If WebGL context creation fails or the frame rate holds below about 40fps for two seconds, unmount the canvas and show Tier 1.

### 7.2 Ticker (`reference/04`)

A full-width pink band, ink borders top and bottom, Anton, scrolling left slowly: TypeScript ✦ Next.js ✦ React ✦ Node ✦ Python ✦ Go ✦ Postgres ✦ Kubernetes ✦ Terraform ✦ AWS. Separators in yellow. Pauses on hover and under reduced motion. `aria-hidden`, since the same stack appears in project details.

### 7.3 Selected Work (`reference/05`)

Eyebrow: "Selected work · click a poster to unfold it". Heading: "Things I built".

**Poster wall:** four posters in a row on desktop (3 : 4.25 ratio); a horizontal snap-scroll row on phones showing about 1.3 posters.

| Poster | Paper and border | Scene | Footer strip |
|---|---|---|---|
| Pre-Sales Field Kit | Dark teal, 16px yellow border, coral "NEW" corner ribbon | Topographic contours, dashed coral route to an X, yellow compass | Sproutflow · on Gumroad now |
| Greenlit | Pale green, cream mat with ink keyline | Green sun with halftone, misty ridges, two rows of firs | AI resume scoring and coaching |
| Business Plan Writer | Navy, cream mat | Night peak with halftone shadow face, dashed route to a summit flag, stars | Investor-ready plans, generated |
| ClipBoard | Amber, cream mat | Coral sun over bayou water, three cypress | SaaS operations platform |

Each poster has a mono masthead line with a rule under it, the title in Anton, and an ink footer strip.

**Interaction**
- Hover or keyboard focus: the poster flips (Framer Motion 3D flip, about 450ms) to its **schematic side**: `#06120f`, mint grid, the product's architecture as a box-and-line diagram, mint footer listing the stack. The Business Plan Writer diagram is final (section 8). The other three are `TODO(ben)`; until supplied, show the poster outlines in mint with "schematic coming" and no invented architecture.
- Click or Enter: the poster **unfolds** into a panel below the wall (see `05`): the poster at left, then title, three short bullets (what it is, who it is for, what shipped in the latest upgrade), stack chips, one primary link button, and a screenshot grid (one large, two small). One panel open at a time. Opening scrolls it into view.
- Phones: tap flips, a "Details" button on the back unfolds.
- Screenshots are real product screenshots supplied by Ben, served with `next/image`. Until supplied, show the striped placeholder slots.

**Open source and labs:** a quiet row of mono link chips under the panel: solutions-playbook, hiddenlayer-litellm-pii-guardrail, "more on GitHub".

A slot for a fifth poster (Treehouse) must be possible by adding one entry to the data file. `TODO(ben)`: include it or not.

### 7.4 The Trail (`reference/06`)

Eyebrow: "The trail · 2018 to now". Heading: "How I got here". Background sand.

One wide SVG trail map:
- Two tan ridge layers behind, with snow caps.
- A teal slope rising left to right with contour lines parallel to its surface and scattered firs.
- A dashed coral trail along the slope through six markers.
- Each marker: a cream circle with ink outline and a label card (years in mono, name in Anton, role in mono).
- The last marker is yellow with a pink flag: "Next summit".
- An ink axis band along the bottom with the year under each marker and a dotted drop line to it.
- A compass rose and a legend card in the lower right.

**Interaction**
- On entering the viewport the trail draws left to right (stroke-dashoffset) and markers pop in order. Once only. Skipped under reduced motion.
- Hover, focus or tap on a marker opens a detail card: 2 to 3 bullets and stack chips from `content/trail.ts`.
- Phones: a vertical dashed trail, newest at the top, details expand in place (see `08`).

### 7.5 Off the Clock (`reference/07`)

Eyebrow: "Off the clock · field notes". Heading: "Outside the editor". Background teal.

Four postcards in a row (2 × 2 on phones). Cream card, illustrated scene, title in Anton, mono caption, hard shadow, each tilted 1 to 2 degrees in alternating directions. Hover straightens and lifts the card.

| Card | Scene | Caption (placeholder, `TODO(ben)`) |
|---|---|---|
| Hiking | Layered ridges, firs, dashed trail, sun | Ridge days |
| Marsh | Low sun, water, pirogue with a poler, egret, marsh grass | Bayou mornings |
| Festivals | Night stage with pink, yellow and cyan beams, ferris wheel, crowd | Front of house |
| Golf | Rolling green at sunrise, pin with pink flag, bunker, pines | Early tee times |

Below, one line with a yellow left rule: "Working to partner with a local wildlife conservation group. More here soon." No link, no logo, no donate button yet.

### 7.6 Contact sign

A brown park-sign footer. Left: "Say hey." in Anton. Right, in mono: name and title, "29.98°N 90.15°W · Metairie, Louisiana", then Email, GitHub, LinkedIn links carried over from the current site. Keep the résumé PDF link from the current site here too.

## 8. Content (facts only)

**Trail data**

| Years | Name | Role | Detail bullets (from résumé) |
|---|---|---|---|
| 2018 | General Assembly | Software Engineering Bootcamp · trailhead | |
| 2019 | Kortivity | Front End Developer (contract) | Vue-based Chrome extension for recruiters |
| 2019 to 2024 | IBM | Client Engineering · 3 roles | Client Technical Specialist (Dec 2019 to Jan 2021), Cloud Engineer (Feb 2021 to Mar 2023), Cloud Infrastructure Engineer (Apr 2023 to Aug 2024); Terraform and OpenShift automation; scaled a utility deployment from 2 to 49 OpenShift environments |
| 2025 | Prove AI | Site Reliability Engineer | SOC 2 Type II from a 34% baseline to a passed audit in six months; 4 Kubernetes clusters; CI/CD with GitHub Actions and Helm |
| 2025 to now | Sproutflow Studio | Founder | Next.js sites and production support for New Orleans small businesses |
| 2026 | Next summit | New chapter, details soon | none |

`TODO(ben)`: approve the detail bullets before they ship. Do not add client names or figures beyond these without his sign-off.

**Projects**

| Project | Facts available | Link |
|---|---|---|
| Pre-Sales Field Kit | Launched recently on Gumroad under Sproutflow | `TODO(ben)`: Gumroad URL |
| Greenlit | Live AI resume scoring and coaching SaaS; deterministic ATS analyzer plus an AI narrative layer; Stripe checkout; Next.js 15, TypeScript, Vercel Postgres, Gemini | https://greenlit.cv |
| Business Plan Writer | Five-agent pipeline: validation → market and financial analysis in parallel → drafting → critique; per-step model routing across Groq, Anthropic and OpenAI; FastAPI, Next.js, Supabase, Stripe | `TODO(ben)` |
| ClipBoard | Multi-tenant SaaS operations platform | `TODO(ben)` |

Both Greenlit and Business Plan Writer have had recent functional and design upgrades. Their unfolded panels lead with the new UI screenshots.

## 9. Performance and accessibility requirements

**Performance**
- Largest Contentful Paint under 2.5s on a mid-range laptop over fast 4G throttling. The Tier 1 SVG hero is the LCP element and must not wait for Three.js.
- Three.js and R3F load in a separate chunk after first paint. Budget: about 200KB gzipped for that chunk.
- No layout shift when the canvas mounts over the SVG (CLS under 0.05).
- Cap device pixel ratio at 2. Pause the render loop when the hero is off screen or the tab is hidden.
- Lighthouse on the preview URL: Performance 90+ on desktop, 80+ on mobile; Accessibility 95+.

**Accessibility**
- The reveal handle is a real slider: `role="slider"`, `aria-valuemin/max/now`, labelled "Schematic to painted", arrow keys move 5%, Home and End jump to the ends.
- The switch is two buttons with `aria-pressed`.
- Posters are buttons. Flip on focus, unfold on Enter or Space, Escape closes the panel. The schematic diagram has a text alternative describing the architecture.
- Trail markers are focusable; details are reachable by keyboard and screen reader.
- All decorative SVG is `aria-hidden`. The hero has one real `h1`.
- Text contrast meets WCAG AA in both hero modes and over every illustration.
- `prefers-reduced-motion` disables the sweep, ticker, trail draw, flips (cross-fade instead) and idle motion.

## 10. Milestones

Push after each one. Each ends with something Ben can open on the preview URL.

1. **Foundation.** Branch, tokens, fonts, grain and shadow utilities, page shell, nav, contact sign. Old sections removed on the branch.
2. **Illustration kit.** `<Cypress/>`, `<Fir/>`, `<Ridge/>`, `<Moss/>`, halftone and grain, with a paint mode and a schematic mode each. A `/kit` dev-only route showing them.
3. **Hero, Tier 1.** SVG scene in both modes, auto-sweep, drag handle, switch, text treatment, featured card, build log, phone version, reduced motion.
4. **Selected Work.** Poster wall, flip to schematic, unfold panel, data file, placeholders for missing assets, phone row.
5. **Trail and Off the Clock.** Trail map with draw-in and detail cards, phone trail, postcards, conservation line, ticker.
6. **Hero, Tier 2.** R3F layers, parallax, idle motion, shared reveal uniform, fallback logic.
7. **Hardening.** Performance and accessibility pass against section 9, cross-browser check (Chrome, Safari, Firefox, iOS Safari, Android Chrome), 404 and metadata, Open Graph image made from the painted hero.
8. **Review.** Walk through with Ben on the preview URL, fix his notes, open the pull request. Do not merge.

If Tier 2 cannot meet the performance budget, ship Tier 1 on desktop and report why. Tier 1 is an acceptable finished state.

## 11. Verification before calling a milestone done

- `npm run build` and the linter pass with no new warnings.
- The section matches its reference screenshot at 1440 and at 390 wide. Take your own screenshots and compare.
- Keyboard-only pass through every interactive element in the section.
- Reduced-motion pass.
- No console errors on load or interaction.
- State what was verified and what was not in the commit or PR description.

## 12. Still needed from Ben

1. Confirm which repo and that `main` is the right base.
2. Screenshots: Greenlit, Business Plan Writer, Pre-Sales Field Kit, ClipBoard.
3. Gumroad URL for the Field Kit; live links for Business Plan Writer and ClipBoard.
4. Architecture notes for Greenlit, ClipBoard and the Field Kit (for the schematic sides).
5. Treehouse poster: yes or no.
6. Hero tagline: keep the draft or replace it.
7. Postcard captions and trail detail bullets: approve or rewrite.
8. A transparent-background version of the B logo.

None of these block milestones 1 to 3. Use the placeholders and mark each with `TODO(ben)`.

## 13. Parked for later

- **Employer block.** A night-festival styled "Now" section directly under the hero (deep indigo, pink, yellow and cyan stage beams, a wristband graphic carrying the role, a logo slot), plus the employer name on the trail summit. Build the page so this section can be inserted between the ticker and Selected Work without layout changes. Add only when Ben says so, with his employer's approval for logo use.
- **Conservation partner.** Planned model: a stated share of product sales goes to a Louisiana wetlands group. Needs a partner chosen and their sign-off before any name or logo appears.
- **Final illustration.** The code-drawn SVG scenes set the style. A later pass by an illustrator can replace the hero and poster art without code changes if the layer structure in milestone 2 is respected.

## 14. Reference files

| File | Shows |
|---|---|
| `reference/index.html` | Mockup source. Open with `?hero=wire`, `?hero=mid`, `?hero=done`, and add `&m=1` for the phone layout. Fonts load from `node_modules/@fontsource/*`. |
| `reference/01-hero-wire.png` | Hero, schematic (page load) |
| `reference/02-hero-mid.png` | Hero, mid-sweep with drag handle |
| `reference/03-hero-done.png` | Hero, painted, handle parked |
| `reference/04-ticker.png` | Stack ticker |
| `reference/05-selected-work.png` | Poster wall, schematic side, unfolded panel |
| `reference/06-trail.png` | Trail map |
| `reference/07-off-the-clock.png` | Postcards and conservation line |
| `reference/08-phone-full.png` | Full phone layout |
| `reference/blogo.png` | Current B logo |
