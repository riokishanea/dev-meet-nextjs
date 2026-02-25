# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start the Next.js dev server (hot-reloading at http://localhost:3000)
- `npm run build` — Production build
- `npm run start` — Run the production build
- `npm run lint` — Run ESLint (eslint-config-next with core-web-vitals + TypeScript rules)

No test framework is currently configured.

## Architecture

This is a **Next.js 16 App Router** project (React 19) for a developer events discovery platform ("Dev Meet"). It uses the `app/` directory for routing (no `src/` folder).

### Key Layers

- **`app/`** — App Router pages and layouts. Single-page app currently (root `page.tsx` is a client component). `layout.tsx` is a server component that provides fonts, the `Navbar`, and the `LightRays` WebGL background.
- **`components/`** — React components. Most are `'use client'` components because they use PostHog event capture or browser APIs.
- **`lib/constants.ts`** — Static event data (`EventItem[]` type). Static fallback; live data is now served via Mongoose models in `database/`.
- **`lib/utils.ts`** — Tailwind utility (`cn`) from shadcn/ui.

### Styling

- **Tailwind CSS v4** with `tw-animate-css`. All custom theme variables and component styles live in `app/globals.css`.
- Custom Tailwind utilities: `flex-center`, `text-gradient`, `glass`, `card-shadow` (defined via `@utility` and `@layer` in globals.css).
- Component-scoped styles use ID selectors (`#event-card`, `#explore-btn`, `#book-event`, `#event`) in globals.css `@layer components` — new components should follow this pattern.
- **shadcn/ui** (new-york style) is configured via `components.json`. UI primitives go in `components/ui/`. Add new components with `npx shadcn add <component>`.
- Fonts: **Schibsted Grotesk** (body, `--font-schibsted-grotesk`) and **Martian Mono** (mono, `--font-martian-mono`) loaded via `next/font/google`.

### Analytics (PostHog)

- PostHog is initialized in `instrumentation-client.ts` (Next.js 15.3+ pattern) — do **not** add a `PostHogProvider` or any other client-side init.
- PostHog API calls are proxied through Next.js rewrites (`/ingest/*` → `us.i.posthog.com`) configured in `next.config.ts`.
- Import `posthog` directly from `"posthog-js"` in client components and call `posthog.capture()` in event handlers. Do not capture analytics in `useEffect` — use event handlers.
- The PostHog key is stored in `NEXT_PUBLIC_POSTHOG_KEY` (in `.env.local`, gitignored).

### Visual Effects

- `LightRays` component renders a full-screen WebGL shader background using the **ogl** library. It uses `IntersectionObserver` for visibility-based lazy initialization and cleans up WebGL contexts on unmount.

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`). Always use `@/components/...`, `@/lib/...` etc. for imports.
