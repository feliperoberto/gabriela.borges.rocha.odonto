# Brand Context — Dental Practice Visual Identity
 
> **Purpose:** This document provides the foundational brand context for any LLM-assisted visual identity generation. It must be included as system context or prepended to any design prompt. Runtime inputs (name, tagline, specialties, etc.) will override or extend the placeholders marked with `{{variable}}`.
 
---
 
## Brand Profile
 
- **Owner:** {{owner_name}} — Female dentist, 30 years old
- **Experience:** 12+ years as dental auxiliary before graduating as a dentist
- **Location:** São José dos Campos, SP, Brazil
- **Practice Name:** {{practice_name}}
- **Tagline:** {{tagline}}
- **Specialties:** {{specialties}}
- **Target Audience:** {{target_audience}}
- **CRO/SP Number:** {{cro_number}}
## Brand Personality
 
The brand sits at the intersection of **warmth and expertise**. It is:
 
- **Warm, not cute** — approachable but never infantile or cartoonish
- **Feminine, not fragile** — elegant strength, not pastel weakness
- **Modern, not trendy** — timeless foundations with contemporary polish
- **Experienced, not old** — 12+ years of hands-on knowledge in a young professional
- **Human, not clinical** — dental care framed as self-care, not medical procedure
## Brand Story (Core Narrative)
 
The dentist spent over 12 years on the other side of the chair — assisting, observing, learning every detail of patient care from the inside. Now, as a graduated dentist, she brings a rare combination: the technical eye of a clinician and the empathetic understanding of someone who has lived every step of the patient journey. This is not a fresh graduate. This is someone who chose dentistry after *deeply knowing it*.
 
## Color Palette
 
### Primary Colors
 
| Name | Hex | RGB | Role |
|---|---|---|---|
| Blush | `#F2DBCE` | 242, 219, 206 | Backgrounds, large surfaces, breathing space |
| Chocolate | `#592A19` | 89, 42, 25 | Primary text, logo, headings, anchoring elements |
| Terracotta | `#A6634B` | 166, 99, 75 | Accents, secondary headings, CTAs, icon strokes |
 
### Secondary Colors
 
| Name | Hex | RGB | Role |
|---|---|---|---|
| Nude | `#D9A796` | 217, 167, 150 | Borders, subtle highlights, cards, soft fills |
| Rose | `#D98989` | 217, 137, 137 | Emphasis details, accent highlights, decorative fills |
 
### Supporting Colors
 
| Name | Hex | RGB | Role |
|---|---|---|---|
| Warm White | `#FFFAF7` | 255, 250, 247 | Page/canvas backgrounds (never use pure #FFFFFF) |
| Deep Espresso | `#2E1A10` | 46, 26, 16 | Fine print, small text requiring high contrast |
 
### Color Rules
 
- The palette is warm-toned. **Never introduce cold blues, grays, or pure whites.**
- Maximum 3 colors per single composition: 1 dominant, 1 supporting, 1 accent.
- Chocolate on Warm White = highest contrast pair (primary readable combo).
- Chocolate on Blush = secondary readable combo.
- Rose and Nude are **never** used for text — only for decorative/fill elements.
- Blush is **never** used for text — insufficient contrast on any background.
## Typography
 
### Font Pairing (Google Fonts)
 
| Role | Font | Weights | Usage |
|---|---|---|---|
| **Display / Headings** | Cormorant Garamond | 400, 500, 600, 700 | Logo wordmark base, H1, H2, hero text |
| **Body / UI** | DM Sans | 400, 500, 600, 700 | Body text, captions, buttons, navigation |
 
### Type Rules
 
- Headings: Cormorant Garamond, color `#592A19`, line-height 1.2
- Body: DM Sans, color `#592A19`, line-height 1.6–1.7, minimum 16px
- Uppercase labels: DM Sans 600, letter-spacing +0.5px, color `#A6634B`
- Never use more than these 2 font families in any single output
- Never use generic system fonts (Arial, Helvetica, Times New Roman)
## Visual Tone Keywords
 
When generating any visual element, the output should evoke these words:
 
`warm` · `organic` · `refined` · `soft` · `confident` · `clean` · `minimal` · `feminine` · `modern` · `natural light` · `terracotta tones` · `matte finish`
 
## Absolute Avoidances
 
- ❌ Cartoon or clip-art style teeth, toothbrushes, or dental tools
- ❌ Generic dental crosses or medical symbols
- ❌ Cold clinical white/blue/silver palettes
- ❌ Overly playful or childish elements (unless targeting pediatric — specified at runtime)
- ❌ Stock photo aesthetics (forced smiles, white coats, blue gloves clichés)
- ❌ Neon, gradient meshes, glassmorphism, or tech-startup aesthetics
- ❌ Before/after patient imagery (CFO compliance — Brazilian dental advertising law)
- ❌ Price mentions or result guarantees in any marketing material
## Regulatory Notes (Brazil — CFO)
 
All materials must comply with the Código de Ética Odontológica:
 
- CRO number (`{{cro_number}}`) must appear on all professional materials
- No before/after clinical photos without specific CFO requirements
- No guarantees of treatment outcomes
- No sensationalist or misleading claims
- No pricing in public-facing advertising (social media, signage)
- The term "Cirurgiã-Dentista" is the correct professional title
---
 
> **Usage:** Load this file as persistent context. Then use the individual prompt templates from `prompts-design-tasks.md` for specific generation tasks, injecting runtime variables as needed.
