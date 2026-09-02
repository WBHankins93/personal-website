---
version: 1.0
revision: v3
name: benhankins-dev-specimen-signal
archetype: specimen-and-signal
description: "An antique naturalist field guide running on a terminal. The palette is now built FROM the live site's own colors — deepened cream/parchment, dark forest green, terracotta/rust — instead of an invented jungle-and-amber system. Extends the live site's own FIG./NO. specimen-numbering language instead of replacing it. Built to fix seven confirmed AI-slop defaults from the live site's DOM (see Migration Notes) at the same time as the visual refresh."
status: approved-for-build
supersedes: "v2 (jungle green #1f5c3f + amber/brass terminal-glow) — walked back by Ben: he flagged that a saturated green-dominant palette reads as redundant next to Sproutflow's own brand, which is also green-forward ('Woods & Waters,' Reseda Green #5F755E primary). He also said directly he likes the color usage already live on benhankins.dev and wants it de-sloppified, not replaced with an invented system. v1 (Warm Minimal Refined + ember accent) was superseded earlier for being too muted."
depends_on:
  - Slop Audit (live-site DOM findings, see Migration Notes below)
  - Sproutflow_Brand_Playbook.docx (differentiation check, see Colors > Why this isn't Sproutflow's palette)

colors:
  paper: "#f6f1e7"
  paper-deep: "#c7baa0"
  plate: "#fbf6ec"
  line: "#d8c7a4"
  ink: "#211c15"
  ink-muted: "#6b5f4a"
  forest: "#183f2a"
  forest-deep: "#0f2b1c"
  rust: "#9a4e27"
  rust-bright: "#b85a2c"
  teal: "#1f6b5c"

typography:
  display-xl:
    fontFamily: "Old Standard TT"
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: 0
  display-lg:
    fontFamily: "Old Standard TT"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: 0
  display-md:
    fontFamily: "Old Standard TT"
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: 0
  display-italic-accent:
    fontFamily: "Old Standard TT"
    fontSize: 22px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.3
  card-title:
    fontFamily: "Old Standard TT"
    fontSize: 19px
    fontWeight: 700
    lineHeight: 1.25
  body-lg:
    fontFamily: "Work Sans"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Work Sans"
    fontSize: 15.5px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Work Sans"
    fontSize: 13.5px
    fontWeight: 400
    lineHeight: 1.55
  eyebrow:
    fontFamily: "Space Mono"
    fontSize: 12px
    fontWeight: 400
    letterSpacing: 0.1em
    textTransform: uppercase
  data:
    fontFamily: "Space Mono"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.7
  button:
    fontFamily: "Work Sans"
    fontSize: 14px
    fontWeight: 600

rounded:
  none: 0px
  xs: 2px
  sm: 3px
  md: 6px
  pill: 9999px
  circle: 50%

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 18px
  lg: 28px
  xl: 40px
  section: 64px

components:
  plate-frame:
    backgroundColor: "{colors.plate}"
    border: "1.5px solid {colors.ink}"
    rounded: "{rounded.xs}"
    cornerBrackets: "16px ink-muted corner brackets, 55% opacity, top-left and bottom-right only"
  fig-tag:
    backgroundColor: "{colors.forest-deep}"
    textColor: "{colors.plate}"
    typography: "{typography.data}"
    padding: "4px 10px"
  stat-block:
    borderTop: "1px solid {colors.line}"
    dividers: "1px solid {colors.line} between each stat"
    numberTypography: "{typography.display-md}"
    numberColor: "{colors.forest-deep}"
    labelTypography: "{typography.data}"
    labelColor: "{colors.ink-muted}"
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.plate}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "12px 22px"
    hover: "background darkens to {colors.forest-deep}"
  rotated-stamp:
    border: "1.5px solid {colors.rust}"
    textColor: "{colors.rust}"
    typography: "{typography.data}"
    rounded: "{rounded.circle}"
    rotation: "-8deg to -12deg, vary per instance"
    maxPerPage: 1
  work-card:
    backgroundColor: "{colors.plate}"
    border: "1px solid {colors.ink}"
    rounded: "{rounded.xs}"
    hover: "translateY(-3px) rotate(-0.3deg), 180ms ease"
    iconRule: "hand-drawn linework SVG specific to the product, 1.5-1.6px stroke, currentColor — NEVER a Lucide/stock icon at this size (see Migration Notes #2)"
  terminal-moment:
    backgroundColor: "{colors.forest-deep}"
    textColor: "{colors.plate}"
    cursorColor: "{colors.rust-bright}"
    typography: "{typography.data}"
    maxPerPage: 1
    cursorBlink: "1.1s steps(1) infinite, respects prefers-reduced-motion"
  nav:
    note: "Keep the live site's existing nav structure and the scroll-synced index rail (01-04) as-is — both are genuinely good and not part of any finding."
---

## Overview

This is not a rebuild. The live site's structure — real stats, the FIG./NO. specimen numbering already in the copy, the scroll-synced index rail, the grid-paper texture — is confirmed good and stays. The color system in this revision is not a new invention either: it's the live site's own cream/parchment, dark forest green, and terracotta/rust — the colors Ben confirmed he already likes — deepened and applied with discipline instead of spread thin across pastel per-card tints. Type pairing moves off the two most common AI-default faces, icons become hand-drawn instead of stock, and seven specific DOM-verified defects get fixed as part of the same pass (Migration Notes).

**Concept:** a field guide, running on a terminal. Antique naturalist illustration (specimen plates, FIG. tags, corner brackets) crossed with circuit/terminal tech (monospace data, one blinking-cursor moment). The terminal-glow moment no longer needs a fourth invented hue (amber/brass) to read as "tech" — plate-colored monospace on forest-deep, with a rust-bright cursor, does the job using colors already in the system.

## Colors

### Why this isn't Sproutflow's palette

Sproutflow's brand playbook specifies "Woods & Waters": Reseda Green `#5F755E` as the primary color, alongside Ebony, Ash Gray, Alabaster, Feldgrau, Payne's Gray, Dutch White, Satin Sheen Gold, and Platinum. That's a mid-tone, desaturated sage-green system — this site's `forest` (`#183f2a`) is a near-black, cold forest green with roughly a quarter of Reseda Green's luminance (relative luminance 0.039 vs. 0.16 — a 2.35:1 contrast between the two greens on their own). They share a hue family in the loose sense that "forest" and "sage" are both green, but they don't read as siblings: one is a soft muted accent color, the other is a saturated near-black anchor color used for buttons, headline color, and dark panels. The bigger differentiator is that this site's dominant *energy* color is rust/terracotta (`#9a4e27`), a hue Sproutflow's palette doesn't use at all — their warm accent is Satin Sheen Gold, a different family entirely. If the two sites are ever seen side by side, the personal site should read as darker, warmer, and rust-forward; Sproutflow should read as lighter and sage-forward. Keep it that way as both systems evolve — don't let benhankins.dev's forest green drift lighter/warmer toward Reseda Green territory.

### Text-safe on `{colors.paper}` (verified, WCAG contrast)

| Token | Hex | Ratio on paper | Verdict |
|---|---|---|---|
| ink | `#211c15` | 15.02 | AAA — default text |
| forest | `#183f2a` | 10.46 | AAA — headline color, primary buttons, footer bg |
| ink-muted | `#6b5f4a` | 5.55 | AA — secondary text |
| teal | `#1f6b5c` | 5.63 | AA — safe for text, use sparingly (tertiary accent only) |
| rust | `#9a4e27` | 5.34 | AA — safe for text, but budget it: stamp + one hover state, same discipline as before |
| rust-bright | `#b85a2c` | 4.11 | **AA-large only** (≥24px) or decorative — not body text on paper |

### On `{colors.plate}` (card surface — nearly identical to paper, listed separately since it's a distinct token)

| Token | Hex | Ratio on plate | Verdict |
|---|---|---|---|
| ink | `#211c15` | 15.70 | AAA |
| forest | `#183f2a` | 10.93 | AAA |
| ink-muted | `#6b5f4a` | 5.80 | AA |
| teal | `#1f6b5c` | 5.88 | AA |
| rust | `#9a4e27` | 5.58 | AA |

### On `{colors.forest-deep}` (dark panels — footer, terminal moment)

| Token | Hex | Ratio on forest-deep | Verdict |
|---|---|---|---|
| paper | `#f6f1e7` | ~14 (derived, same family as plate below) | AAA |
| plate | `#fbf6ec` | 14.10 | AAA — this is the terminal-moment text color |
| rust-bright | `#b85a2c` | 3.28 | **AA-large / decorative only** — this is the terminal cursor color, not body text, so this is fine |

**Rule that matters most:** the old `amber-glow` dark-background rule is gone because amber is gone. `rust-bright` fills the "glow" role but only as the cursor accent — actual terminal text is `plate` on `forest-deep` (14.10:1), not `rust-bright` on `forest-deep` (3.28:1, fails for body-size text). Don't flip that.

## Typography

Three families, each with one job:
- **Old Standard TT** (display) — genuine 19th-century encyclopedia serif. Headlines, card titles, the italic accent word. This replaces Space Grotesk, which was one of two default AI-tool display faces found on the live site (Migration Notes #3).
- **Space Mono** (data) — anything metadata-shaped: eyebrows, stat labels, the terminal moment, FIG. tags. Keep the live site's existing JetBrains Mono usage if it's already wired up elsewhere and swapping is high-effort — the *role* (mono for data) matters more than the exact typeface match, but Space Mono is the spec default for new work.
- **Work Sans** (body) — replaces Source Sans 3. Both are fine, safe humanist sans; this swap is optional polish, not a fix — deprioritize it if time is short.

| Token | Size | Weight | Use |
|---|---|---|---|
| display-xl | 52px | 700 | Hero name |
| display-lg | 36px | 700 | Section headlines |
| display-md | 26px | 700 | Sub-section / stat numbers |
| display-italic-accent | 22px | 400 italic | One whimsical line per page, max |
| card-title | 19px | 700 | Work card titles |
| body-lg | 17px | 400 | Hero sub-copy |
| body | 15.5px | 400 | Default |
| body-sm | 13.5px | 400 | Card copy |
| eyebrow | 12px | 400, +0.1em, upper | Section labels |
| data | 13px | 400 | Stat labels, terminal text, FIG. tags |

## Layout

Unchanged from the live site: max-width content column, full-bleed grid-paper background, scroll-synced index rail fixed right. Section rhythm stays at `{spacing.section}` (64px) between major blocks — this is a smaller number than a typical marketing site on purpose; the live site's density is part of what makes it read as a working system rather than a landing page, and that should stay.

## Components

**`plate-frame`** — every card and the hero itself sits in a bordered plate: 1.5px ink border, sharp corners (`{rounded.xs}`), ink-muted corner brackets top-left and bottom-right at 16px, 55% opacity. This is the extension of the live site's existing "FIG. 01" tag on the headshot — commit it to every card, not just the photo. (Corner brackets were brass in the prior revision; ink-muted keeps the same quiet "hardware" read without adding a color the rest of the system doesn't use.)

**`fig-tag`** — small forest-deep pill, plate-colored monospace text, sits half-overlapping the top edge of a plate-frame (`transform: translateY(-50%)`). Use real labels: `FIG. 02 · REVISION`, `NO. 03 · WORK`, etc. — these should mean something (a real sequence), not decorate.

**`stat-block`** — the existing $13M / 12 / 80% row. Add hairline dividers (`{colors.line}`) between stats, forest-deep numbers in display-md, monospace labels in ink-muted. No card wrapper per stat — it's one row with internal rules, not three separate cards.

**`button-primary`** — forest fill, plate text, `{rounded.sm}` (3px — NOT rounded-full, NOT rounded-xl; both were overused on the live site per Migration Notes #5). Hover darkens to forest-deep.

**`rotated-stamp`** — one per page maximum. Rust circle outline, rust monospace text, rotated -8° to -12°. Use for real status language already in your copy: "OPEN TO OPPORTUNITIES," "EST. 2018," "LIVE · CONTINUOUSLY MAINTAINED." This is a direct, disciplined replacement for the live site's plain rounded-pill status badges — same information, more character. Unchanged from the prior revision — rust was already grounded in the live site.

**`work-card`** — plate background, ink border, sharp corners. On hover: lift 3px and rotate -0.3deg (subtle — this is the site's one "whimsy" hover, don't add more). Icon is hand-drawn per product (see Migration Notes #2), not a stock glyph.

**`terminal-moment`** — forest-deep background, plate-colored monospace text, one blinking rust-bright cursor. **Hero only.** Do not repeat this pattern elsewhere on the page — Migration Notes #1 is about removing over-applied animation, and a second terminal moment would reintroduce the same problem.

**`nav` / index rail** — no changes. Both already work and aren't part of any finding.

## Do's and Don'ts

### Do
- Let forest carry real weight — button fills, headline color, plate borders — not just a hairline accent. It's already the live site's footer/Experience-section color; extend it, don't replace it.
- Draw every card icon to the specific product it represents.
- Keep rust-bright strictly for large/decorative use (cursor, hover glow) — use plain rust for any text-sized rust usage.
- Extend the FIG./NO. numbering system to every card, consistently.
- Keep the existing index rail and grid-paper texture exactly as they are.
- Periodically eyeball this palette next to Sproutflow's live site — if the two start looking like siblings, push forest darker/cooler and lean harder on rust, don't lighten toward sage.

### Don't
- Don't use `rounded-full` or `rounded-xl` on cards or buttons — this system uses `{rounded.sm}` (3px) or sharp corners, on purpose, as a break from the shadcn-default look the audit flagged.
- Don't add a second terminal-moment or a second rotated-stamp on the same page — each is punctuation, not a pattern to repeat.
- Don't put rust-bright body text on paper or forest-deep — it fails normal-text contrast on both (4.11:1 and 3.28:1). Large/decorative only.
- Don't reach for Lucide (or any stock icon set) for anything larger than a 16px utility glyph (external-link arrows, chevrons are fine to leave as-is).
- Don't re-introduce scroll-reveal-on-everything. If motion is wanted, apply it once, deliberately, not as a blanket utility.
- Don't add a fourth accent hue "to add more energy." The discipline of three families (neutral parchment, forest, rust) plus one sparing tertiary (teal) is the point — more hues is what made the live site's pastel-card treatment read as unconsidered in the first place.

## Migration Notes — fixes to apply in the same pass

These came from a DOM-level audit of the live site (see the "Slop Audit" report) and are independent of the visual direction above — do them regardless, but this is the natural moment since the affected components are being touched anyway.

1. **[Critical] Kill or restrict the scroll-reveal opacity animation.** 13 text elements currently sit at `opacity:0` waiting on an intersection-observer trigger. This is the root cause of the near-invisible hero text on load and a large blank gap mid-scroll before the Experience section. Scope any reveal animation to the hero only, or remove it — everything below the fold should be visible by default.
2. **[High] Replace stock Lucide icons at card-header size.** 32 of 35 SVGs on the live site are unmodified Lucide icons. Leave Lucide on true utility chrome (nav arrows, external-link glyphs). Replace the icons inside Greenlit / Business Plan Writer / Living Playbooks cards with hand-drawn linework specific to each product — see `work-card.iconRule` above.
3. **[High] Font swap.** Space Grotesk → Old Standard TT for display (see Typography). This is the highest-leverage single change for memorability.
4. **[High] Replace the three unrelated pastel card tints** (mint/blue/mauve — `rgb(216,238,229)`, `rgb(220,231,247)`, `rgb(237,220,227)`) with the plate/paper system above. If color-coding status is still wanted, tie it to actual status language (live/beta/internal), not an arbitrary per-card hue.
5. **[Medium] Fix the radius scale.** Replace uniform `rounded-xl` / `rounded-full` / `shadow-sm` with `{rounded.sm}` (3px) on cards and buttons. Reserve `rounded-pill` for the nav and true pill-shaped controls only.
6. **[Medium] Fix the H1 accessible name.** The live DOM renders "Ben" and "Hankins" as two block-level spans with no space between them — `textContent` reads `"BenHankins."` Add a literal space or visually-hidden space so the accessible name and any copy-pasted text read correctly.
7. **[Medium] Add real alt text.** Both current images (including the headshot) have empty/missing `alt`. Give the headshot a real description; mark anything purely decorative `alt=""` explicitly.
8. **[Low] Copy-level slop, separate from the DOM audit above.** The original Slop Audit only checked structure and visuals — it never checked the actual written copy against Ben's own writing rules (no em dashes, no mechanical parallel-fragment tricolons, ground everything in specifics). Pulled the live copy directly and checked it: no banned words anywhere, and the numbers throughout ($13M pipeline, 12 named accounts, 80% faster deploys, 111 resources, SOC 2 from a 34% baseline to passed, $10.1M SAP RISE engagement) are already doing real work — that part is not a problem. Three specific spots are:
   - Hero subhead has an em dash: "...full-stack product development—with production software to show for it." → change to a comma: "...full-stack product development, with production software to show for it."
   - Greenlit card has an em dash: "...what is weakening their application—and what to improve next." → comma: "...what is weakening their application, and what to improve next."
   - Experience section's "THROUGHLINE" line is three separate fragment-sentences in a row — "Discover the problem. Design the system. Own the outcome." — which is close to the exact parallel-fragment tricolon pattern Ben's writing rules ban. Punctuation alone won't fix this one since the mechanical cadence comes from three isolated sentences, not the wording. Proposed rewrite, folding it into one sentence: "Find the real problem, design the system for it, and stay until it's actually running." Flagged as a genuine rewrite, not a safe drop-in like the two above — worth Ben reading it aloud once before it ships.

## Responsive Behavior

**Not verified against the live site this session** — browser tooling here couldn't force a real narrow viewport against benhankins.dev, so treat this table as a reasonable starting spec, not a confirmed fix.

| Breakpoint | Width | Changes |
|---|---|---|
| Desktop | ≥1200px | Full layout as specified |
| Tablet | 768–1199px | Work-card grid 3-up → 2-up; index rail stays |
| Mobile | ≤767px | Work-card grid → 1-up; display-xl 52→38px; index rail either hides or collapses to a slim edge marker; nav collapses to whatever pattern the live site already uses (unchanged) |

Confirm actual mobile behavior on a real device before treating this section as done — the live site's existing responsive pattern (whatever it is) should be preserved unless it's independently broken.

## Agent Prompt Guide

**Quick reference:** paper `#f6f1e7` · plate `#fbf6ec` · ink `#211c15` · ink-muted `#6b5f4a` · forest `#183f2a` · forest-deep `#0f2b1c` · rust `#9a4e27` · rust-bright (large/decorative only) `#b85a2c` · teal (sparing) `#1f6b5c`.

> Apply the specimen-and-signal system to [SECTION] of benhankins.dev. Warm parchment `#f6f1e7` canvas, plate cards `#fbf6ec` with 1.5px ink `#211c15` borders and sharp `{rounded.sm}` (3px) corners — never rounded-full or rounded-xl. Dark forest green `#183f2a` carries real weight: button fills, headline color, borders — not a hairline accent, and it's darker/cooler than a typical sage — don't let it drift lighter. Terracotta rust `#9a4e27` is the site's energy color: rotated stamp badges, hover states, used deliberately rather than everywhere. Old Standard TT for display type (700 weight, headlines only), Space Mono for anything data-shaped (stat labels, FIG. tags, eyebrows), Work Sans for body. One `fig-tag` pill per card (forest-deep bg, plate text, half-overlapping the top edge). At most one rotated rust stamp badge and one forest-deep terminal moment with plate-colored text and a blinking rust-bright `#b85a2c` cursor per page. Icons are hand-drawn linework specific to the actual content, never a stock icon-library glyph at card-header size. Do not add scroll-reveal animation beyond the hero. Do not introduce a fourth accent hue.

## Known Gaps

- **Logo:** the live site's green rounded-square "B" mark is used as-is in this spec. Ben is designing a new logo separately and will provide it later — don't block implementation on it. Worth a quick gut-check once the new logo exists: make sure its green reads closer to `forest` (`#183f2a`) than to Sproutflow's Reseda Green, for the same differentiation reason covered above.
- **VitePress ecosystem amber collision — resolved by removal.** The prior revision's `amber`/`amber-glow` tokens risked colliding with devops-studio's amber assignment in Ben's VitePress portfolio (solutions-playbook/teal, ai-engineering-studio/purple, devops-studio/amber, implementation-studio/blue). This revision drops amber entirely, so the collision risk is moot — no further check needed here.
- **Sproutflow differentiation is a judgment call, not a hard rule.** The contrast math above (2.35:1 between the two greens) shows they're distinguishable, but "distinguishable in a spec" and "reads as clearly different when someone has both tabs open" aren't automatically the same thing. Worth a real side-by-side check once both sites are live in their current form.
- **Mobile responsive behavior unverified** (see Responsive Behavior above).
- Type sizes and component paddings above are a first-pass spec derived from the mockup, not pixel-measured against a working build — expect minor adjustment once it's actually in code.
