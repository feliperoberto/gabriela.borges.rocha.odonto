# gabriela.borges.rocha.odonto

Production landing page for **Dra. Gabriela Borges Rocha**, cirurgiã-dentista in São José
dos Campos and Mogi das Cruzes, ported from `prototype/Landing Page.dc.html` to a Next.js
App Router app in `app/`. Front-end only — all content is mocked, loaded fetch-style, and
shared with the test suite (see `app/lib/content/`).

See `docs/intake-inventory.md` for the full route/section/data/token inventory this port
was built from, and `docs/adr/0001-framework-choice.md` for why Next.js was chosen over a
Preact/Vite alternative. Component and design conventions are documented in `app/DESIGN.md`.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Vitest** (unit + functional tests) and **Storybook 10** (component catalog, stories
  double as browser-mode tests via `@storybook/addon-vitest`)
- **Playwright** (e2e + a full screenshot matrix for visual review)
- Everything runs in **Docker** — there is no supported local (host) npm workflow. Every
  npm script in `app/` refuses to run outside a container (`app/scripts/assert-in-container.js`).

## Running it

All commands are run through `docker compose` from the repo root.

### Dev server (hot reload)

```sh
docker compose --profile dev up --build app-dev
```

Serves at http://localhost:3000. Bind-mounts `app/` so edits reload immediately.

### Storybook

```sh
docker compose --profile dev up --build storybook
```

Serves at http://localhost:6006.

### Validate (lint + type-check + unit tests)

```sh
docker compose build app
docker compose run --rm --no-deps -w /home/app app npm run validate
```

Or individually: `npm run lint`, `npm run type-check`, `npm run test`.

### Storybook build (static, for CI/deploy)

```sh
docker compose run --rm --no-deps -w /home/app app npm run build-storybook
```

### E2E + screenshot matrix

```sh
docker compose up -d app
docker compose --profile testing run --rm playwright
docker compose down
```

Generates `app/tests/playwright/screenshots/{mobile,desktop}/*.png` — every page state and
interaction (procedure selection, city filter, WhatsApp FAB visibility) at both viewports,
for fast human review against the prototype. **Never committed** (gitignored) — regenerate
locally whenever you want to check the current state visually.

Always rebuild the `app` image before running e2e after a code change — `docker compose up
app`/`docker compose run app` reuse an existing image unless rebuilt, so stale code can
silently get served and tested otherwise (this bit the initial build of this suite more
than once).

### Tear down

```sh
docker compose down
docker compose --profile testing down
```

Containers/services are only meant to be up while actively developing or testing — shut
them down afterward to release resources, per this project's optimization guidelines.

## Project structure

```
app/
├── app/                 # Next.js App Router: layout.tsx, page.tsx (assembly + metadata + JSON-LD)
├── components/
│   ├── ui/              # Reusable primitives (Chip, CtaLink, Carousel, SectionHeading, …)
│   └── landing/         # The 11 page sections (SiteHeader, Hero, ChapterStory, …)
├── hooks/               # Behavior hooks (useRevealOnScroll, useParallax, useDragScroll, …)
├── lib/content/         # Mock content client — client.ts (fs/fetch loader), derive.ts
│                        # (pure helpers safe for Client Components), types.ts
├── public/mocks/        # Canonical JSON fixtures — the single source of truth for content
├── public/images/       # Curated images actually used by the page
├── styles/tokens.css    # Design tokens (palette, type, radii, shadows, motion)
├── .storybook/          # Storybook config
└── tests/playwright/    # e2e specs: landing, interactions, screenshots
```

Every component ships with a Storybook story; components with behavior also ship a test.
No component reads data literally — all content flows through `lib/content`.

## Contributing / PR conventions

- Target **3–7 files, 200–350 changed lines** per PR. Lockfiles and binary assets (images,
  the committed prototype) are exempt from the line count — note the exemption in the PR
  description when it applies.
- Every issue carries a **persona** label (`persona:swe`, `persona:designer`,
  `persona:product-owner`, `persona:devops-sre`) via the issue forms in
  `.github/ISSUE_TEMPLATE/`.
- Follow the PR template's checklist (`.github/pull_request_template.md`): run validation
  in a container, cite the prototype behavior a new test asserts, confirm every new
  component has a story.
