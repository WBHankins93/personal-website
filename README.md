# Ben Hankins — Personal Website

> 🤝 Solutions Engineer · Cloud Infrastructure Specialist · Customer Success Advocate

🌐 Live Site → [https://benhankins.vercel.app](https://benhankins.vercel.app)

---

## ✨ Overview

This is my personal website, built to showcase my background as a Solutions Engineer and infrastructure specialist. The site emphasizes customer engagement, technical problem-solving, and business impact alongside deep technical expertise.

It includes:
- Customer-focused journey and positioning
- Interactive experience timeline with business outcomes
- Technical capabilities with consultative approach
- Animated portfolio showcasing client work and open-source projects
- Modern, responsive design with smooth animations

Fork it if you like it — this site is open-source and ready to adapt.

---

## 🎯 Positioning

This site is designed to appeal to:
- **Solutions Engineering roles**: Emphasizes customer engagement, POC delivery, technical presentations
- **DevOps/SRE roles**: Showcases deep technical expertise in infrastructure and automation
- **Cloud Infrastructure roles**: Highlights multi-cloud architecture and platform engineering
- **Technical Account Manager roles**: Demonstrates stakeholder management and customer success

---

## 🛠️ Tech Stack

- [Next.js 14+ (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/) (deployment)
- [Lucide Icons](https://lucide.dev/)
- Google Fonts (`Titillium Web`, `Source Sans 3`, `Roboto Mono`)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- `@react-three/fiber` (3D word animation)

---

## 🚀 Features

- ✍️ Dynamic typing animation for multiple role titles
- 📈 Customer impact metrics with animated stats
- 📄 Modal-based CV viewer
- 🎨 Gradient backgrounds with layered blur effects
- 📱 Fully responsive design with clean mobile experience
- 🎯 Solutions Engineer positioning with customer-first narrative
- 💼 Interactive experience timeline with hover expansions
- 🔧 Technical capabilities presented through consultative lens

---

## 🧑‍💻 Getting Started (Local Development)

```bash
# 1. Clone the repo
git clone https://github.com/WBHankins93/personal-website.git
cd personal-website

# 2. Install dependencies
npm install       # or yarn or pnpm

# 3. Run local dev server
npm run dev       # or yarn dev or pnpm dev

# 4. Open in browser
http://localhost:3000
```

---

## 📝 Customization Guide

### Updating Content

**Hero Section** (`src/components/HeroSection.tsx`):
- Modify `roles` array to change typing animation text
- Update stats in the grid to reflect your metrics
- Change the main headline and description

**About Section** (`src/components/AboutSection.tsx`):
- Edit the journey narrative in the prose section
- Modify the "How I Work" principles to reflect your approach
- Update skills and capabilities with your expertise areas

**Experience Section** (`src/components/ExperienceSection.tsx`):
- Add/remove experiences in the `experiences` array
- Update achievements to emphasize customer outcomes
- Adjust technologies and highlights

**Projects Section** (`src/data/projects.ts`):
- Add your projects with detailed metadata
- Include customer context for client work
- Tag appropriately for filtering

### Styling

The site uses a carefully crafted color palette:
- Primary: Slate grays for professional feel
- Accents: Blue, emerald, amber for visual interest
- Backgrounds: Subtle gradients with transparency

Modify colors in:
- `src/app/globals.css` for theme variables
- `src/lib/colors.ts` for category-specific colors
- Individual components for specific elements

---

## 🎨 Design Philosophy

**Customer-First Narrative**: Every section leads with business impact and customer value before diving into technical details.

**Progressive Disclosure**: Core information is immediately visible, with deeper details revealed on interaction (hover, expand).

**Technical Credibility**: Deep technical expertise is showcased but framed as enabling customer success, not as an end itself.

**Visual Hierarchy**: Important information (customer impact, business metrics) uses larger type, prominent colors, and prime screen real estate.

---

## 📊 Key Metrics to Update

When customizing for your own use, update these key metrics throughout:
- Number of enterprise clients served
- Revenue influenced or generated
- Technical improvements (speed, efficiency, uptime)
- Years of experience in different domains
- Customer satisfaction or retention metrics

---

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to open an issue or submit a pull request!

---

## 📄 License

MIT License - feel free to use this as a template for your own portfolio site.

---

## 💡 Inspiration

This site is designed for technical professionals who want to position themselves for Solutions Engineering, Technical Account Management, or Customer-Facing Engineering roles while maintaining credibility for infrastructure and DevOps positions.

The key innovation is the **dual positioning**: leading with customer engagement and business impact while maintaining deep technical credibility through detailed project work and comprehensive capability showcases.

---

Built with Next.js, deployed on Vercel, and designed to help technical professionals tell their story effectively.