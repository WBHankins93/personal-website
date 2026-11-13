# Design system: bayou

The landscape is visibly engineered. A South Louisiana bayou appears first as a schematic and gets painted into a vintage park-poster scene. The full spec is `docs/redesign-bayou/HANDOFF.md`; this file is the working reference for tokens and treatments as built.

The previous field-journal system (paper, forest, rust; Old Standard TT, Work Sans, Space Mono) was removed on the `redesign/bayou` branch. It is in git history on `main`.

## Color tokens

Defined in `@theme` in `src/app/globals.css`. Values are fixed.

| Token | Hex | Use |
|---|---|---|
| `cream` | `#f6ecd4` | Page background, poster paper, text on dark |
| `ink` | `#0b2423` | Body text, hard shadows, outlines |
| `ink-deep` | `#081d1c` | Foreground trees, nav pill, switch |
| `teal` | `#12403e` | Mid trees, Off the Clock background |
| `teal-mid` | `#2c6f66` | Far trees, trail slope |
| `water` | `#1b5853` | Water |
| `moss` / `moss-light` | `#5f7d57` / `#8fae7a` | Spanish moss |
| `sun` | `#f58a2c` | Suns, warm sky |
| `coral` | `#ee4e34` | Trail line, heading offset ink, ribbons |
| `yellow` | `#ffcb05` | Primary buttons, Field Kit border, active switch |
| `pink` | `#ff3d8b` | Ticker band, flags, festival accents |
| `cyan` | `#37d6ff` | Festival accent only |
| `mint` | `#5dffb0` | Everything in schematic mode |
| `schematic-bg` | `#06120f` | Schematic background |
| `sign` | `#5b3a21` | Contact footer |
| `sand` | `#e9dcbc` | Trail section background |

Sky bands, top to bottom: `#fbe3ac`, `#f9d48f`, `#f7bf73`, `#f5a657`, `#f28f43` (`sky-1` to `sky-5`). Ridges: `#e2733a` (`ridge-far`), `#a8502f` (`ridge-near`).

One deviation from the handoff table: small mono labels on cream or sand use `#1f5a53`, a darker teal-mid, because `#2c6f66` at 11px falls short of WCAG AA on those backgrounds. `teal-mid` itself is unchanged.

## Type

| Role | Family | Notes |
|---|---|---|
| Display | Anton | Uppercase, line-height 0.92. Hero name `clamp(88px, min(14.86vw, 26svh), 214px)`. Section headings `clamp(58px, 6.67vw, 96px)` |
| Labels and UI | JetBrains Mono 500 | Uppercase, letter-spacing 0.08 to 0.14em, 11 to 14px |
| Body | Space Grotesk 400/700 | 15 to 21px |
| Tagline only | DM Serif Display | 27px desktop, 20px phone |

Fonts are self-hosted WOFF2 files in `src/app/fonts/` (latin subset, from @fontsource, SIL OFL), loaded with `next/font/local`.

## Print treatment

- Hard offset shadows, no blur: `8px 10px 0 ink` (`--shadow-print`, `.shadow-print`) on posters, cards and panels.
- Section headings carry an off-register second ink: `text-shadow: 5px 5px 0 coral`, ink on the teal and sign sections.
- Paper grain: an SVG `feTurbulence` overlay at `mix-blend-mode: multiply` through the `.grain` class. Painted surfaces only, never schematic ones. The host element must be positioned.
- Halftone dot fills (`<Halftone/>`) for shading inside illustrations.
- No gradients on painted surfaces except the phone hero scrim. No rounded cards, no glassmorphism, no drop-shadow blur.

## Illustration

All illustration is SVG drawn by components in `src/components/kit/`, seeded through `src/lib/rand.ts`. Open `/kit` in local dev or on a preview deployment to see every piece in both modes.

- **Paint mode**: flat fills in the tokens above.
- **Schematic mode**: the same shapes as 1.2px mint outlines on `schematic-bg`, applied by the `.bayou-schematic` class. A faint grid sits behind (48px in the hero, 20px on posters).

## Layout

- Desktop from 1024px: 44px gutters, 96px section padding.
- Phone below 1024px: 18px gutters, 56px section padding, no drag handle in the hero, a snap-scroll poster row, a vertical trail, postcards 2 × 2.

## Open items

- Text contrast over the painted hero has not been measured at every viewport size. The role line and tagline carry a hard ink outline as a stopgap; milestone 7 measures and settles it.
- The trail map scales its labels with the SVG, so at 1024px wide the 11px labels render near 8px. Milestone 7 should decide whether the phone trail takes over below about 1200px.
