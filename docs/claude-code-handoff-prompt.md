# Claude Code handoff prompt — benhankins.dev v3

Paste this into Claude Code, run from the root of the benhankins.dev repo (`personal-website/`). `DESIGN.md` is already in place at `docs/DESIGN.md`, alongside the existing `docs/role-targeting-copy-fix-2026-08-30.md`.

---

I'm implementing a visual and copy refresh of this site (Next.js + Tailwind, confirmed via `tailwind.config.js`). This is **not a rebuild** — the structure, content, and information architecture all stay. Read `docs/DESIGN.md` in full before touching anything; it's the complete spec (color tokens with verified WCAG contrast, typography, component definitions, and eight ranked Migration Notes). Everything below sequences that spec into an actual work order.

**Before writing any code:** extend the Tailwind theme with DESIGN.md's color and spacing tokens rather than hardcoding hex values inline. Check how fonts are currently loaded (likely `next/font`) and match that pattern for the Old Standard TT / Space Mono swap. Also skim this repo's own `CLAUDE.md` at the root first — if it documents styling or component conventions, follow those over guessing.

## Work order

**1. Fix the two critical/high DOM bugs first (Migration Notes #1–#2)** — these are actively breaking the live experience regardless of the visual refresh:
- 13 text elements currently sit at `opacity:0` waiting on a scroll-reveal trigger. This is causing near-invisible hero text on load and a blank gap mid-scroll before the Experience section. Scope any reveal animation to the hero only, or remove it entirely — everything below the fold should be visible by default.
- 32 of 35 SVGs are unmodified Lucide icons. Leave Lucide on true utility chrome (nav arrows, external-link glyphs). The three work-card icons (Greenlit, Business Plan Writer, Living Playbooks) need hand-drawn linework specific to each product — see `work-card.iconRule` in DESIGN.md for stroke weight and style.

**2. Apply the v3 color system.** Full token set and every verified contrast ratio are in DESIGN.md's Colors section. Key rule: `rust-bright` (`#b85a2c`) is decorative/large-text/cursor only — it fails normal-text contrast on both paper and forest-deep, verified. Don't use it for body-size text anywhere.

**3. Apply the type swap (Migration Note #3).** Space Grotesk → Old Standard TT for display type. Keep Source Sans 3 or swap to Work Sans for body (optional polish, not a fix — deprioritize if short on time). Space Mono stays for data/terminal text.

**4. Rebuild the three work-card headers (Migration Note #4).** Replace the mint/blue/mauve pastel tints with the plate/paper system. If color-coding status is still wanted, tie it to actual status language (live/beta/internal) rather than an arbitrary per-card hue.

**5. Apply the component system from DESIGN.md**, in this order since later ones depend on earlier ones existing:
- `plate-frame` (base card/hero treatment — ink border, sharp corners, ink-muted corner brackets)
- `fig-tag` (forest-deep pill, half-overlapping each plate-frame's top edge)
- `stat-block` (the $13M / 12 / 80% row — add hairline dividers)
- `button-primary` (forest fill → forest-deep hover)
- `rotated-stamp` (rust circle, one per page max)
- `work-card` (hover: translateY(-3px) rotate(-0.3deg), 180ms ease)
- `terminal-moment` (forest-deep bg, plate-colored text, rust-bright blinking cursor — **hero only**, do not repeat elsewhere on the page)

**6. Fix the radius scale (Migration Note #5).** Replace uniform `rounded-xl`/`rounded-full`/`shadow-sm` with `rounded.sm` (3px) on cards and buttons. Reserve pill radius for the nav and true pill controls only.

**7. Fix the H1 accessible name (Migration Note #6).** The DOM currently renders "Ben" and "Hankins" as two block-level spans with no space between them, so `textContent` reads `"BenHankins."` Add a literal space or visually-hidden space.

**8. Add real alt text (Migration Note #7).** Both current images (including the headshot) have empty/missing `alt`. Write a real description for the headshot; mark anything purely decorative `alt=""` explicitly.

**9. Apply the three copy fixes (Migration Note #8), all approved, no further sign-off needed:**
- Hero subhead: change `"...full-stack product development—with production software to show for it."` to `"...full-stack product development, with production software to show for it."` (em dash → comma)
- Greenlit card: change `"...what is weakening their application—and what to improve next."` to `"...what is weakening their application, and what to improve next."` (em dash → comma)
- Experience section "THROUGHLINE" line: replace `"Discover the problem. Design the system. Own the outcome."` with `"Find the real problem, design the system for it, and stay until it's actually running."`

## Guardrails

- Do not touch the nav or the scroll-synced index rail (01–04) — both already work and aren't part of any finding.
- Respect `prefers-reduced-motion` on the terminal-moment cursor blink.
- Don't add a second terminal-moment or a second rotated-stamp anywhere on the page.
- Don't introduce a fourth accent hue. The palette is deliberately three families (parchment neutral / forest / rust) plus one sparing tertiary (teal).
- Grid-paper texture, section rhythm, and overall layout are unchanged from the live site — this is a recolor and de-slop, not a redesign.

## Known gaps — don't treat these as solved

- **Mobile responsive behavior is an unverified starting spec**, not confirmed against the live site's actual breakpoint behavior. Test on a real narrow viewport before treating the Responsive Behavior table in DESIGN.md as final.
- **Logo is unchanged for now** — a new one is coming separately later; don't block on it.
- Component paddings and type sizes in DESIGN.md are first-pass, derived from a mockup, not pixel-measured against a working build. Expect minor adjustment once this is actually rendering.

## When done

Spot-check contrast for any color pairing not explicitly covered in DESIGN.md's tables using the same WCAG relative-luminance method (paper `#f6f1e7`, ink `#211c15`, forest `#183f2a`, rust `#9a4e27` are the load-bearing tokens). Take a screenshot of the hero and the work-card grid to confirm the scroll-reveal fix actually resolved the invisible-text issue, since that was the highest-severity finding.
