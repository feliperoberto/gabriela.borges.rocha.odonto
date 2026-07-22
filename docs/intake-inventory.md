# Intake Inventory — Landing Page prototype

Source: `prototype/Landing Page.dc.html` (408 lines, single "design canvas" document —
an `x-dc` custom element rendered by `support.js`, with the actual state/data/behavior
defined in a `DCLogic` subclass at the bottom of the file). `prototype/Wireframes.dc.html`
is layout-only reference and is not ported. `prototype/uploads/` holds imagery (~2.0 MB
total) plus `anexos/branding-guide.md` (full visual identity) and `anexos/brand-context.md`.

Subject: a single scrolltelling landing page for **Dra. Gabriela Borges Rocha**,
cirurgiã-dentista, CRO-SP 176648, serving São José dos Campos and Mogi das Cruzes, SP.

## Routes

Exactly one route: `/`. In-page anchors `#sobre`, `#convenios`, `#unidades` are smooth-scroll
targets and must work as real deep links (`/#sobre` loads `/` and scrolls to the section).

## Sections (→ `components/landing/<Name>/`)

| # | Component | Prototype label | Notes |
|---|---|---|---|
| 1 | `SiteHeader` | (header) | Logo (`logo-gabriela.webp`) + "Agendar consulta" pill → WhatsApp |
| 2 | `Hero` | Hero | Staged word-by-word `h1` entrance (`gbUp` keyframes, staggered delays), floating blob (`gbFloat`), WhatsApp CTA (`#hero-cta`), 3 trust links (CRO / Convênios / Unidades) |
| 3 | `ChapterStory` | Capítulo 1 — Do outro lado da cadeira | Text + 3 value chips (acolhimento, esmero técnico, ética) |
| 4 | `ChapterToday` | Capítulo 2 — Hoje, cirurgiã-dentista | Photo (`fotopolimerizador.jpg`) + quote |
| 5 | `AboutSection` (`#sobre`) | Capítulo 3 — Sobre mim | Parallax portrait (`apresentacao-gabriela.jpg`, factor `-0.07`) + bio + CRO line |
| 6 | `TestimonialsSection` | Capítulo 4 — Depoimentos | Drag/snap horizontal carousel, 3 testimonials, right edge fade, "Arraste para o lado" hint |
| 7 | `ServicesExplorer` | Capítulo 5 — O que eu faço | 8 procedure toggle chips; selecting one shows a description panel below; re-click deselects/hides it; only one selected at a time |
| 8 | `LocationsSection` (`#unidades`) | Capítulo 6 — Onde você me encontra | City filter chips (Todas / São José dos Campos / Mogi das Cruzes) filtering a drag/snap carousel of clinic cards |
| 9 | `InsuranceSection` (`#convenios`) | Convênios | 3 partner logos + note about atendimento particular |
| 10 | `ContactFooter` | Contato | Headline, tel CTA, Instagram, e-mail, credentials line |
| 11 | `WhatsAppFab` | (fixed button) | Fixed bottom-right WhatsApp button, hidden until `#hero-cta` scrolls above the viewport (`getBoundingClientRect().bottom < 0`) |

## Cross-cutting behaviors (→ `hooks/`)

- **Reveal-on-scroll** (`useRevealOnScroll`): elements with `data-rv` start hidden
  (`opacity:0, translateY(28px)`), fade/slide in once `top < innerHeight * 0.9`, tracked via
  a `dataset.rvState` state machine (`undefined → hid → shown`). **Fail-open safety**: an
  8-second timer force-reveals anything still `hid` — a hidden element must never be
  permanent. Re-queries live nodes every pass rather than holding stale refs.
- **Parallax** (`useParallax`): `data-plx` elements translate by
  `(rectMiddle - viewportMiddle) * -0.07`, computed inside a `requestAnimationFrame`
  throttle, skipped entirely when the element is off-screen.
- **Drag-to-scroll carousels** (`useDragScroll`, applied to `[data-drag]`): mousedown+move+up
  drag scrolling with a 4px move threshold before engaging, snap-type suspended while
  dragging, then eased back to the nearest snap point over 260ms with a cubic ease-out.
  Also converts vertical wheel/trackpad input into horizontal scroll unless the carousel is
  already at an edge (in which case the page scrolls normally).
- **Reduced motion**: `prefers-reduced-motion: reduce` (or an explicit `animacoes: false`
  prop) disables reveal, parallax, and drag/wheel-conversion entirely — content is simply
  visible with no animation.
- **FAB visibility** (`useHeroFabVisibility`): visible only once `#hero-cta`'s bottom edge
  has scrolled above `y = 0`.
- **SEO head**: `<title>`, meta description, `og:*`, `theme-color`, `geo.region`, and a
  JSON-LD `@type: Dentist` block listing all 3 clinic locations — must be reproduced via
  Next.js Metadata API + a JSON-LD `<script>` in `app/page.tsx`.

## Data schemas (→ `public/mocks/*.json`, typed in `lib/content/types.ts`)

- **`procedures.json`** — `{ slug: string; nome: string; desc: string }[]`, 8 entries
  (Prevenção, Dentística restauradora, Profilaxia dental, Clareamento, Odontopediatria,
  Cirurgia, Urgência, Botox — exact copy in the prototype source).
- **`locations.json`** — `{ slug: string; bairro: string; cidade: string; foto: string; alt: string }[]`,
  3 entries (Parque Industrial/SJC, Parque Monte Líbano/Mogi, Centro/Mogi).
- **`testimonials.json`** — `{ texto: string; autor: string }[]`, 3 entries.
- **`insurances.json`** — `{ nome: string; logo: string; alt: string }[]`, 3 entries
  (Sempre Odonto, Ideal Odonto, Odont) — extracted from static markup, not the `DCLogic` class.
- **`profile.json`** — `{ nome, cro, tel, email, instagram, cities: string[], whatsapp: { phone, defaultMessage } }`.
  The WhatsApp URL (`https://wa.me/<phone>?text=<encoded message>`) and city-filter option
  list (`['Todas', ...cities]`) are **derived**, not stored — computed by `lib/content`
  helpers (`buildWaUrl`, `buildCityFilters`), matching the prototype's `renderVals()` logic.

## Design tokens (→ `styles/tokens.css`, `DESIGN.md`)

Primary: Blush `#F2DBCE`, Chocolate `#592A19`, Terracotta `#A6634B`. Secondary: Nude
`#D9A796`, Rose `#D98989`. Neutrals: Warm White `#FFFAF7`, Dark Espresso `#2E1A10`
(fine print). Accent (unused in this page but reserved): Sage `#8FA68B`, Soft Gold `#C4A77D`.
WhatsApp green `#25D366` / hover `#128C42`.

Fonts: **Cormorant Garamond** (display/headings, weights 400/500/600/700 + italic 500) and
**DM Sans** (body/UI, weights 400/500/600/700), self-hosted via `next/font/google`.

Contrast rules (from `branding-guide.md`, encode as lint-able guidance in `DESIGN.md`):
never Blush for body text; never Rose text on Blush; Chocolate-on-Blush and
Chocolate-on-WarmWhite are the two primary readable pairs; max 3 colors per composition;
warm white over pure white for backgrounds.

Motion: `gbUp` (fade + translateY(26px)→0 entrance) and `gbFloat` (±14px vertical float,
9s loop) keyframes, both gated behind `prefers-reduced-motion: no-preference`.

## Architecture decision

See `docs/adr/0001-framework-choice.md` — **Next.js App Router**, copying
`charity-cupom/pwa` as the infra template (Docker, Storybook, Vitest, Playwright, CI),
because this page needs prerendered HTML + metadata/JSON-LD for local-business SEO, which
Next provides natively.
