# James Neely — Personal Site

Static resume and portfolio site built with **Next.js 16** (App Router, static export) and **MUI v7**.

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero section and navigation cards |
| `/experience` | Work experience timeline |
| `/education` | Education history |
| `/skills` | Technical skills by category |
| `/projects` | Projects and initiatives |
| `/tools` | Browser-based web tools (AI Context Calculator) |
| `/contact` | Contact information (hCaptcha-protected) |

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: MUI v7 with Emotion CSS-in-JS
- **Language**: TypeScript (strict mode)
- **Theming**: Light/dark mode via MUI CSS Variables
- **SEO**: JSON-LD structured data, dynamic sitemap, robots.txt, OpenGraph metadata
- **PWA**: Service worker with offline support

## Getting Started

```bash
npm install
npm run dev      # Start dev server (localhost:3000)
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build (static export to /out)
npm run lint     # ESLint
```

## Project Structure

```
src/
├── app/                  # File-based routing (one directory per page)
├── components/
│   ├── common/           # Shared components (PageContainer, JsonLd)
│   ├── layout/           # Header, Footer, MobileDrawer, ThemeToggle
│   └── sections/         # Page-specific content components
├── data/                 # Resume data and TypeScript interfaces
├── theme/                # MUI theme configuration
└── utils/                # Utility functions
```

All resume content lives in `src/data/resumeData.ts` as the single source of truth. The tools page (`/tools`) contains self-contained interactive components that don't use the resume data layer.

## Deployment

The site is configured for static export (`output: "export"` in `next.config.ts`). Run `npm run build` to generate the static files in `/out`.
