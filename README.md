# Buffalo Stays — Website

Lightweight Next.js + Tailwind website for Buffalo Stays. This repo contains the marketing site and a simple spaces listing with WhatsApp contact integration.

## Tech

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- lucide-react (icons)

## Quick start

Prerequisites: Node.js (18+ recommended)

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

3. Build for production

```bash
npm run build
npm run start
```

## Environment

- Use `.env.local` for secrets and environment overrides. Example variables used by the site (add as needed):

```
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
```

- The WhatsApp number is read from `NEXT_PUBLIC_WHATSAPP_NUMBER` at build time.
- Digits only also work because the app strips spaces, dashes, and `+` signs before creating the link.
- After changing the Vercel env var, redeploy so Next.js rebuilds with the new value.

Note: Do not commit `.env.local` — it's included in `.gitignore`.

## Project structure

- `app/` — Next.js app routes & pages (uses App Router)
- `components/` — shared React components (Navbar, Footer, FAB, FAQ)
- `lib/` — constants and helpers (WhatsApp link generator, sample data)
- `public/` — static assets (logo, images)
- `app/globals.css` — global styles and Tailwind imports

## Adding content

- Add new routes under `app/` as folders with `page.tsx` (e.g., `app/privacy/page.tsx`).
- Add images to `public/` and reference with `/image-name.png` in `next/image`.

## Scripts

- `npm run dev` — run Next dev server
- `npm run build` — build production app
- `npm run start` — run production server
- `npm run lint` — run Next.js ESLint rules

## Notes

- The site centralizes WhatsApp messaging in `lib/constants.ts` — update `NEXT_PUBLIC_WHATSAPP_NUMBER` in your env or redeploy after changing it in Vercel.
- Accessibility: focus-visible outlines and prefers-reduced-motion fallbacks are included.

If you'd like, I can add deployment instructions (Vercel, Netlify) or add CI workflows next.
..
