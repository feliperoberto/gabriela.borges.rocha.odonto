# Design system — Dra. Gabriela Borges Rocha landing page

## Purpose

A single warm, editorial landing page for a dental clinic, built to convert visitors into
WhatsApp bookings while communicating the brand's core story: "12+ years living dentistry
from the inside, now as the dentist herself." The design system exists so every component —
present and future — draws from one consistent, accessible set of tokens instead of
reintroducing colors, type, or spacing ad hoc.

Source of truth: `prototype/uploads/anexos/branding-guide.md` (full visual identity) and
`prototype/Landing Page.dc.html` (as-built reference). Tokens live in `styles/tokens.css`;
fonts are wired through `styles/fonts.ts` (`next/font/google`, self-hosted).

## Brand personality

Warm & welcoming · confident & experienced · modern & fresh · feminine without being fragile.
Voice: first person, warm, educational, empathetic, never overly clinical.

## Color

| Token | Hex | Role |
|---|---|---|
| `--color-blush` | `#F2DBCE` | Backgrounds, large areas, breathing space |
| `--color-chocolate` | `#592A19` | Primary text, logo, headings |
| `--color-terracotta` | `#A6634B` | Accents, CTAs, secondary headings, links |
| `--color-nude` | `#D9A796` | Borders, subtle highlights, card outlines |
| `--color-rose` | `#D98989` | Accent details, emphasis (quote marks) — never as text on Blush |
| `--color-warm-white` | `#FFFAF7` | Page background (warm, never pure white) |
| `--color-espresso` | `#2E1A10` | Fine print / small text needing extra contrast |
| `--color-sage` / `--color-gold` | `#8FA68B` / `#C4A77D` | Reserved extended palette — not used on this page |
| `--color-whatsapp` / `--color-whatsapp-hover` | `#25D366` / `#128C42` | WhatsApp CTAs only |

### Usage rules (do / don't)

- **Do** use Chocolate-on-Blush or Chocolate-on-WarmWhite as the two primary readable
  pairs — both are the highest-contrast combinations in the palette.
- **Do** cap any single composition at 3 colors: one dominant, one supporting, one accent.
- **Do** prefer `--color-warm-white` over pure white for backgrounds.
- **Don't** set body text in Blush — insufficient contrast.
- **Don't** set Rose text on a Blush background — fails WCAG AA.
- **Don't** introduce a new hex value anywhere in component CSS. If a color is missing,
  add it as a token first.

## Typography

- **Display / headings** — Cormorant Garamond, weight 500–600, italic for emphasis words.
- **Body / UI** — DM Sans, weight 400–600.
- Never mix in a third font family.
- Line-height: 1.6–1.7 for body copy, 1.12–1.2 for headings.
- Letter-spacing: +0.5px (uppercase eyebrow labels use +2.5px per the prototype), 0 on body.
- Minimum body size: 16px.

| Element | Font | Weight | Size |
|---|---|---|---|
| H1 — Hero | Cormorant Garamond | 600 | `clamp(42px, 8vw, 76px)` |
| H2 — Section | Cormorant Garamond | 500 | `clamp(32px, 5vw, 44px)` |
| Eyebrow label | DM Sans | 600 | 12.5–13px, uppercase, +2.5px tracking |
| Body | DM Sans | 400 | 16–17px |
| Caption | DM Sans | 400–500 | 13–15px |
| Button | DM Sans | 600 | 14–16px |

## Shape & elevation

- Pills (`--radius-pill: 999px`) for every button and chip.
- Cards use `--radius-card` (20px) or `--radius-card-lg` (24px) for photo cards.
- Shadows are warm-toned (`rgba(89, 42, 25, …)`), never neutral gray — see
  `--shadow-card`, `--shadow-card-lg`, `--shadow-cta`, `--shadow-cta-whatsapp`.

## Motion

- `gb-up`: fade + translateY(26px→0) entrance, staggered per element.
- `gb-float`: ±14px vertical float loop, 9s, used only on the hero's background blob.
- **Every** animation, parallax, and drag/wheel-to-horizontal conversion must be disabled
  under `prefers-reduced-motion: reduce` — content must simply be visible with no motion,
  never removed or replaced. See `hooks/useReducedMotion.ts` (added with the interaction
  hooks) for the shared check every animated hook consumes.

## Component inventory

| Layer | Location | Examples |
|---|---|---|
| Primitives | `components/ui/` | Chip, CtaLink, SectionHeading, TestimonialCard, LocationCard, Carousel |
| Sections | `components/landing/` | SiteHeader, Hero, ChapterStory, ChapterToday, AboutSection, TestimonialsSection, ServicesExplorer, LocationsSection, InsuranceSection, ContactFooter, WhatsAppFab |
| Behavior hooks | `hooks/` | useRevealOnScroll, useParallax, useDragScroll, useHeroFabVisibility, useReducedMotion |

Every component at every layer ships with a Storybook story (`*.stories.tsx`) alongside
its implementation and CSS module; components with behavior also ship a test
(`*.test.tsx`). No component may read data literals directly — all content flows through
`lib/content` (see that module's own documentation).

## Accessibility

- Contrast pairs above are chosen to meet WCAG AA at their documented usage (body text,
  buttons, links).
- Interactive elements (chips, carousel cards, CTAs) keep a minimum 44×44px hit target,
  matching the prototype's `min-height` values.
- All animated behavior respects `prefers-reduced-motion`.
- Storybook's `@storybook/addon-a11y` runs against every story to catch violations early.
