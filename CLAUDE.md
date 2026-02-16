# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Static export to /out
npm run lint     # ESLint (v9 flat config)
```

## Architecture

Static resume/portfolio site built with **Next.js 16** (App Router, static export) and **MUI v7**.

### Data Flow

All site content lives in `src/data/resumeData.ts` — this is the single source of truth. TypeScript interfaces are in `src/data/types.ts`. Data is passed to components via props.

### Component Organization

- `src/components/layout/` — Header, Footer, MobileDrawer, ThemeToggle
- `src/components/sections/` — Page-specific content components (ExperienceItem, SkillCategory, etc.)
- `src/components/common/` — Shared components (PageContainer wrapper, JsonLd structured data)

Components use `"use client"` only when they need interactivity (Header, ThemeToggle, MobileDrawer, OverviewCards). Section pages are server components.

### Theming

MUI v7 CSS Variables theming in `src/theme/theme.ts` with light/dark color schemes. Scheme switching is via the `data-mui-color-scheme` HTML attribute. Emotion is the CSS-in-JS engine (required by MUI). Styling uses MUI's `sx` prop throughout — no external CSS framework.

### Routing

File-based App Router pages under `src/app/`. Each resume section (experience, education, skills, projects, contact) has its own page directory. Metadata is exported per page via the Next.js Metadata API.

### SEO

JSON-LD structured data in `JsonLd.tsx`, dynamic sitemap (`sitemap.ts`), robots.txt (`robots.ts`), and OpenGraph/Twitter card metadata on all pages.

## Key Constraints

- **Static export only** (`output: "export"` in next.config.ts) — no API routes, no server-side rendering at request time
- **Images unoptimized** (required for static export)
- **TypeScript strict mode** enabled
- **Path alias**: `@/*` maps to `./src/*`
