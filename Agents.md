# AGENTS GUIDE

## Deployment & Hosting
This application is hosted at: **rakantutor.org**

## Key Navigation

### Rakan Tutor Pages
- **Home:** `/`
- **About:** `/about`
- **History:** `/history`
- **Impact:** `/impact`
- **News:** `/news`
- **Contact:** `/contact`
- **Terms & Conditions:** `/terms`
- **Privacy Policy:** `/privacy`

### NAIC Pages
- **NAIC Home:** `/naic`
- **Registration:** `/naic/register`
- **FAQ:** `/naic/faq`
- **Tracks:** `/naic/tracks`
- **Contact:** `/naic/contact`
- **Terms & Conditions:** `/naic/terms`
- **Privacy Policy:** `/naic/privacy`

## Branding & Context
- **Competition:** The National AI Competition 2026 (NAIC '26)
- **Organizers:** Rakan Tutor & Sunway University
- **Theme:** Cyberpunk / Modern AI

## Adding New Pages (Routes, SEO, OG)
When you add a new page/route, update all of these so OG/Twitter previews and favicons stay correct:

1) **Routing**
   - Add the new route in `src/App.tsx` under `<Routes>`.

2) **SEO/OG Tags (runtime)**
   - Add/adjust title + description in `src/components/Seo.tsx`:
     - `ROUTE_OVERRIDES` for the new path.
     - If it is a NAIC page, ensure the path starts with `/naic` prefix.

3) **SEO/OG Tags (build‑time prerender)**
   - Mirror the same route metadata in `scripts/prerender-seo.mjs`:
     - `ROUTE_OVERRIDES` for the new path.
     - If it is a NAIC page, ensure the path starts with `/naic` prefix.

4) **Vercel Rewrites (OG previews)**
   - Add a rewrite in `vercel.json` so `/your-path` serves `/your-path/index.html`.

5) **Default Meta**
   - The base fallback tags live in `index.html` (Rakan Tutor defaults). Keep these sane.
