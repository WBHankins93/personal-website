# Role-targeting copy fix — confirmed 2026-08-30

Source: two-lens site review, decision item #1. Ben confirmed the lane directly:
"I am actively pursuing Solutions Engineer roles and Sales Engineer roles, while
also open to Forward Deployed Engineer. I realized that I am still a reach away
from solutions architect roles so leaving that off the table for now." This also
matches the targeting already recorded 2026-08-27 (SE / Sales Engineer / FDE only,
Solutions Architect and SWE deliberately dropped as resume tracks).

## What's live now (wrong)

Two files carry an unresolved `// TODO: Confirm whether GTM Engineer should
remain, or be replaced with Solutions Architect.` and both currently ship
"GTM Engineer" to production:

1. `src/app/layout.tsx` — SEO `keywords` array includes `"GTM Engineer"`.
2. `src/components/redesign/Contact.tsx` — visible copy reads:
   "Open to Solutions Engineer and GTM Engineer roles. Also available for
   consulting through Sproutflow Studio."

## What it should say

Confirmed targets: **Solutions Engineer, Sales Engineer, and Forward Deployed
Engineer.** Solutions Architect and GTM Engineer are both off the table —
GTM Engineer should be removed outright, not swapped for Solutions Architect.

### Contact.tsx

Replace the roles sentence. Suggested (Ben should sign off on exact wording,
this preserves the existing sentence structure and the Sproutflow mention):

> Open to Solutions Engineer, Sales Engineer, and Forward Deployed Engineer
> roles. Also available for consulting through Sproutflow Studio.

Remove the `// TODO` comment above it — the decision is made.

### layout.tsx

In the `keywords` array, replace `"GTM Engineer"` with `"Sales Engineer"` and
`"Forward Deployed Engineer"` (both are real search terms recruiters use, so
this is additive, not just a swap). Remove the `// TODO` comment.

## Not in scope for this fix

Two other items from the same review were surfaced and explicitly deferred by
Ben, not folded into this fix:

- **CI gap** (no `.github/workflows`, typecheck/lint/test only run locally) —
  skipped for now.
- **`receipt.html`** (orphaned file at repo root, not wired to any route) —
  left as-is for now, no action taken.

Full review with grounded typecheck/lint/test results:
https://claude.ai/code/artifact/cbeaa504-a991-48fa-8803-fc505101aa81
