# ADR 0001: Next.js App Router for the production app

## Status
Accepted

## Context
`prototype/Landing Page.dc.html` is a single-route (`/`) scrolltelling marketing page for a
dental clinic: 11 sections, ~6 distinct interaction behaviors (reveal-on-scroll, parallax,
drag/wheel carousels, reduced-motion gating, FAB visibility, toggle/filter chips), and 5
small static data collections. No backend exists; all data is mocked.

Two internal reference ports exist to copy/paste/modify from:
- `markdown` — Vite + Preact, no router, no Docker, no Storybook, no screenshot testing.
- `charity-cupom/pwa` — Next.js 16 App Router, path-based folder routes, Docker Compose
  (dev/testing profiles), Storybook 10, two-project Vitest, Playwright with a
  `screenshots.spec.ts` pattern, and a working CI pipeline.

## Decision
Use **Next.js App Router**, copying `charity-cupom/pwa`'s infrastructure.

Decision rule applied: if the app is SEO-critical (needs prerendered HTML, metadata,
JSON-LD) or is expected to grow into multiple content routes, **and** an existing internal
template already provides Docker + Storybook + Playwright + CI for that framework, choose
Next.js. Otherwise, for a pure client-side tool with no SEO need, choose Preact + Vite.

Rationale:
1. **SEO is real here.** The prototype ships a full `<head>` (title, description, OG tags,
   `theme-color`, `geo.region`) and a JSON-LD `Dentist` block listing all three clinic
   locations. Next's Metadata API and static prerendering (`next build`) produce this
   natively; Preact + Vite is client-side-rendered by default and would need a bespoke
   prerender step to match.
2. **App size does not favor either framework** — 1 route, 11 sections, ~6 behaviors is
   small enough for both. Size is not the differentiator.
3. **Infra reuse is decisive.** `charity-cupom/pwa` provides, nearly verbatim: the
   Dockerfile, docker-compose service topology (`app`/`app-dev`/`playwright`/`storybook`
   equivalents), `scripts/assert-in-container.js` guard, Storybook 10 config
   (`@storybook/nextjs-vite`), a two-project Vitest config (unit + Storybook browser-mode),
   a Playwright config with a screenshot-matrix pattern, and a CI pipeline. `markdown`
   provides none of Docker, Storybook, or screenshot testing — building those from scratch
   would cost far more than the port itself.
4. **Growth path.** A booking flow, blog, or per-city pages map directly onto additional
   App Router route folders.

No server-side data fetching or dynamic routes are used; the app remains a static export
candidate (`output: 'export'` stays viable) even though it's built as a standard Next app.

## Consequences
- One extra layer of framework (React 19 via Next) versus Preact's smaller footprint —
  accepted, since the reused infrastructure outweighs the bundle-size cost for a single
  marketing page.
- Testing follows `charity-cupom/pwa`'s pattern: Vitest (unit + Storybook-as-tests) and
  Playwright (functional + e2e + screenshots), run exclusively inside containers.
- No `admin`/`api` services are needed — the compose file is trimmed to `app`, `app-dev`,
  `playwright`, `storybook`.
