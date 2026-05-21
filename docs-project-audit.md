# Project Portfolio Audit (May 21, 2026)

## GitHub: New/Recently Updated Repositories to Consider Adding
Based on your GitHub repositories page sorted by **Last updated** on **May 21, 2026**, these repos appear recently active and are not currently represented in `src/data/projects.ts`:

- `hiddenlayer-litellm-pii-guardrail` (updated May 21, 2026)
- `interview-question-generator` (updated May 8, 2026)
- `react-post-hog` (updated May 7, 2026)
- `welding-business` (updated Apr 18, 2026)
- `nps` (updated Feb 5, 2026)
- `stock-rocket` (updated Jan 23, 2026)
- `cluster-guardians` (updated Jan 6, 2026)
- `umbrella` (updated Dec 2, 2025)
- `WBHankins93` profile repository (updated Apr 20, 2026)

## Image Recommendations (Minimal, fast-to-produce)
Recommended style baseline for consistency:
- 1200x630 PNG (also works as Open Graph fallback)
- Dark slate background, 1 accent color per category
- Center icon + short project label + subtle gradient/noise

### Existing portfolio projects and minimal image concept
1. `greenlit` — Personal SaaS resume coaching platform (`greenlit.cv`)
   - Image: resume card + AI spark icon
   - Accent: emerald/teal

2. `ai-business-plan-generator`
   - Image: document + upward chart line icon
   - Accent: blue

3. `prompt-library`
   - Image: stacked cards / prompt blocks icon
   - Accent: violet

4. `job-extractor`
   - Image: funnel + briefcase icon
   - Accent: amber

5. `terraform-infra-platform`
   - Image: cloud + Terraform hex-style glyph
   - Accent: purple

6. `devops-studio`
   - Image: CI pipeline nodes with checkmark
   - Accent: cyan

7. `implementation-studio`
   - Image: blueprint grid + wrench icon
   - Accent: indigo

8. `solutions-playbook`
   - Image: playbook/book + route arrows
   - Accent: orange

9. `nealy-event-decor`
   - Image: calendar + confetti burst icon
   - Accent: pink

10. `python-go-sre-utilities`
    - Image: terminal prompt + Python/Go split circles
    - Accent: yellow/blue duo

11. `mlops-sre-mini`
    - Image: model node + heartbeat/monitor line
    - Accent: lime

12. `sproutflow-flagship`
    - Image: leaf + browser window icon
    - Accent: green

13. `second-line-psychiatry`
    - Image: medical cross + chat bubble
    - Accent: sky blue

14. `big-butt-association` (Bekky)
    - Image: storefront bag + minimalist badge
    - Accent: rose

15. `personal-website`
    - Image: monogram "BH" + cursor arrow
    - Accent: electric blue

16. `terraform-aws-modules`
    - Image: module blocks + cloud ring
    - Accent: orange/purple

17. `gcp-gke-gitops`
    - Image: Kubernetes wheel + git branch icon
    - Accent: cobalt

18. `deployment-patterns`
    - Image: branching path diagram
    - Accent: steel blue

19. `helm-charts`
    - Image: ship helm + package box
    - Accent: navy

20. `github-action-templates`
    - Image: workflow node graph + bolt
    - Accent: black/green

21. `platform-engineering-lab`
    - Image: lab flask + server rack
    - Accent: violet

22. `automated-vpc-deployment-centerpoint`
    - Image: network mesh + lock
    - Accent: cyan

23. `enterprise-cloud-delivery-ibm`
    - Image: cloud layers + enterprise building glyph
    - Accent: IBM blue

24. `att-watsonxai-integration`
    - Image: API plugs connecting 2 nodes + AI chip
    - Accent: blue/white

## Suggested implementation path
1. Add `public/project-images/` and store one static PNG per project id.
2. Set each `image_url` in `src/data/projects.ts` to `/project-images/<project-id>.png`.
3. Start with 6 highest-traffic projects first:
   - `ai-business-plan-generator`
   - `prompt-library`
   - `job-extractor`
   - `solutions-playbook`
   - `sproutflow-flagship`
   - `personal-website`

