# Site screenshots

Current captures of the live layout, for LinkedIn Featured, career reports, and
design review. Regenerate these whenever the hero, selected work, or contact
sections change.

| File | Viewport | Section |
| --- | --- | --- |
| `home-hero-desktop.png` | 1440×900 | Home hero: identity, stats, CTAs |
| `selected-work-desktop.png` | 1440×900 | Selected work: flagship project cards |
| `contact-desktop.png` | 1440×900 | Contact CTA |
| `home-hero-mobile.png` | 390×844 | Home hero |
| `selected-work-mobile.png` | 390×844 | Selected work |
| `contact-mobile.png` | 390×844 | Contact CTA |

## How they were captured

Against a local **production** build (`npm run build && PORT=4321 npm start`),
not the dev server, so no dev overlay appears in frame. Captured with
`prefers-reduced-motion` forced on, which renders every reveal in its final
state — no half-finished entrance animations and no motion blur on the logo
ticker.

```bash
npm run build
PORT=4321 npm start

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --disable-backgrounding-occluded-windows --disable-renderer-backgrounding \
  --disable-features=CalculateNativeWinOcclusion \
  --force-prefers-reduced-motion \
  --virtual-time-budget=12000 --window-size=1440,900 \
  --screenshot=docs/screenshots/home-hero-desktop.png \
  "http://localhost:4321/"
```

Swap `--window-size=390,844` for the mobile set, and append `/#work` or
`/#contact` to the URL for the other two sections.
