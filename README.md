# LLens

Interactive web tool for learning how LLMs work through hands-on chapters: tokenization, next-token prediction, and guided exploration.

## Project Overview

LLens is a React + TypeScript app built with Vite and Tailwind.

- Frontend: `React 18`, `TypeScript`, `React Router`
- Styling/UI: `Tailwind CSS`, `shadcn/ui`, Radix primitives
- Model runtime: browser-side worker using `@xenova/transformers`
- Analytics: `@vercel/analytics`

Main app flow:

- Start page: `/` or `/llens/start`
- Chapter 1: `/llens/chapter-1`
- Chapter 2: `/llens/chapter-2`
- Chapter 2 game: `/llens/chapter-2/game`
- Playground: `/llens`
- Conclusion: `/llens/conclusion`

## Continue Development

Useful locations in the codebase:

- Routes and app shell: `src/App.tsx`
- Start and chapter pages: `src/pages/llens/`
- Shared chapter components: `src/components/llens/`
- Worker + model singleton: `src/workers/`
- Runtime SEO tags: `src/components/Seo.tsx`
- Build-time SEO prerender script: `scripts/prerender-seo.mjs`
- Vercel rewrites: `vercel.json`

When adding or changing routes, keep these in sync:

1. `src/App.tsx` route declarations.
2. `src/components/Seo.tsx` route metadata (`ROUTE_OVERRIDES`).
3. `scripts/prerender-seo.mjs` route metadata (`ROUTE_OVERRIDES`).
4. `vercel.json` rewrites (for clean route handling and route-level HTML files).

## Run Locally

Requirements:

- Node.js 18+ (Node 20 LTS recommended)
- npm

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`).

Other useful scripts:

```bash
npm run lint      # ESLint checks
npm run build     # Production build + SEO prerender output
npm run preview   # Preview built output locally
```

## Deployment (Vercel)

This project is deployed on Vercel.

### How deployment works

- Build command: `npm run build`
- Output directory: `dist`
- `scripts/prerender-seo.mjs` runs after Vite build to generate route-level `index.html` files with route-specific SEO/OG tags.
- `vercel.json` rewrites map clean URLs (for example `/llens/chapter-1`) to the corresponding built HTML path.

### Typical Vercel setup

1. Import the repository into Vercel.
2. Framework preset: `Vite` (or leave auto-detected).
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy.

### Ongoing deploy workflow

- Push commits to your connected branch (commonly `main`).
- Vercel automatically builds and deploys.
- For metadata or route updates, ensure `Seo.tsx`, `prerender-seo.mjs`, and `vercel.json` are all updated together before pushing.