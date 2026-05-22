# Adamas Gold — Design Guide

## Brand in One Sentence
Dark luxury jewellery brand. Deep near-black backgrounds, antique gold accents, serif display type paired with a clean geometric sans. Everything should feel like a high-end print catalogue that happens to be on screen.

---

## Color System

All colors are defined as CSS custom properties in `styles.css :root`.

| Token | Hex / Value | Use |
|---|---|---|
| `--bg` | `#0b0b08` | Page background (deepest layer) |
| `--bg-card` | `#131310` | Card backgrounds |
| `--bg-elevated` | `#1b1b15` | Dropdowns, inputs, slightly raised surfaces |
| `--bg-header` | `rgba(10,10,7,0.96)` | Fixed header with blur |
| `--gold` | `#D99D2C` | Primary accent — prices, active states, CTA borders |
| `--gold-light` | `#e8b44e` | Gold on hover |
| `--gold-dim` | `rgba(217,157,44,0.18)` | Subtle gold tints, background washes |
| `--text-primary` | `#f0ead6` | Headings and important body copy |
| `--text-sec` | `#8e8372` | Secondary copy, nav links |
| `--text-muted` | `#565044` | Captions, metadata, footer copy |
| `--border` | `#222219` | Section dividers |
| `--border-card` | `#1e1e17` | Card and input borders |

**Rules:**
- Never introduce a new color outside this palette. Derive tints with `rgba(217,157,44,X)` for gold-adjacent uses.
- Gold is reserved for interactive feedback and data that needs emphasis (price, active filter). Do not use it decoratively for body text.

---

## Typography

| Role | Font | Fallback |
|---|---|---|
| Display / headings | `Playfair Display` (serif) | `Georgia, serif` |
| Body / UI | `Manrope` (geometric sans) | `system-ui, sans-serif` |

Both fonts load via Google Fonts (declared in `index.html`).

**Scale & usage:**

| Element | Size | Weight | Notes |
|---|---|---|---|
| Hero title | `clamp(42px, 5vw, 68px)` | 900 | letter-spacing `-0.01em`, line-height `1.03` |
| Section heading | `~32–40px` | 700–900 | Playfair Display |
| Card title | `13.5px` | 600 | Manrope |
| Nav link | `12px` | 600 | ALL CAPS, tracking `0.07em` |
| Body / description | `13.5px` | 400 | line-height `1.78` |
| Small meta / label | `11–12px` | 400–600 | ALL CAPS where used as labels |
| Footer copy | `10.5–12.5px` | 400–700 | |

**Rules:**
- Playfair Display for anything that reads as a headline or product name at large size.
- Manrope for all UI chrome: nav, buttons, filters, labels, body paragraphs.
- Tight tracking (`-0.01em` to `-0.03em`) on large display type. Generous tracking (`+0.07em` to `+0.12em`) on ALL-CAPS micro labels.

---

## Layout

| Token | Value |
|---|---|
| Max content width | `1320px` (centered, `margin: 0 auto`) |
| Horizontal gutter | `48px` desktop padding |
| Header height | `62px` (fixed, `margin-top: 62px` on first section) |
| Border radius | `--radius: 5px` (cards, inputs); `100px` (pill buttons) |

**Grid:**
- Product grid: `repeat(3, 1fr)`, gap `18px`
- Footer: `220px repeat(3, 1fr) 48px`, gap `32px 40px`
- Hero: `1fr 1fr`, no gap

---

## Surface / Depth System

Three distinct z-layers. Never collapse them.

| Layer | Background | Border | Usage |
|---|---|---|---|
| Base | `--bg` `#0b0b08` | — | Page, hero |
| Elevated | `--bg-card` `#131310` | `--border-card` | Cards, card image wells |
| Floating | `--bg-elevated` `#1b1b15` | `--border-card` | Dropdowns, sort select |

Header sits above all layers using `backdrop-filter: blur(16px)` + semi-transparent `--bg-header`.

---

## Shadows

Always color-tinted, never flat grey:

```css
/* Card hover — standard */
box-shadow:
  0 12px 40px rgba(0, 0, 0, 0.5),
  0 2px 8px rgba(201, 168, 76, 0.06);
```

The gold tint in the secondary shadow is subtle (0.06 opacity) but gives warmth. Keep the same pattern on any new elevated elements.

---

## Grain / Texture

A repeating SVG fractalNoise overlay at `opacity: 0.025` sits on the hero via `::after`. Copy the same pattern on any new full-bleed sections:

```css
section::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size: 300px 300px;
  z-index: 3;
}
```

---

## Interactive States

Every clickable element must have all three:

| State | Treatment |
|---|---|
| `:hover` | Gold border tint or `color: var(--gold)`, subtle background wash |
| `:focus-visible` | `outline: 2px solid var(--gold); outline-offset: 2px;` |
| `:active` | Slightly stronger background wash, e.g. `rgba(217,157,44,0.08)` |

---

## Animations

- Only animate `transform` and `opacity`. Never `transition-all`.
- Default duration: `0.2s` for colour/border changes; `0.3s–0.45s` for transforms.
- Card entry animation:

```css
@keyframes cardIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* apply: animation: cardIn 0.4s ease both; */
```

- Image zoom on card hover: `transform: scale(1.06)` with `transition: transform 0.45s ease`.

---

## Buttons

### Primary (Gold fill)
Active filter state — gold background, dark text.
```css
background: var(--gold);
border: 1px solid var(--gold);
color: #0b0b08;
/* hover: --gold-light */
```

### Secondary (Ghost)
Load-more, inactive filters.
```css
background: transparent;
border: 1px solid var(--border-card);
color: var(--text-sec);
/* hover: border-color var(--gold); color var(--gold); background rgba(217,157,44,0.04) */
```

---

## Images

- Product renders: square `aspect-ratio: 1/1`, `object-fit: cover`, dark background `#0f0f0c`.
- Hero image: covers right half of the hero grid, `object-position: center 30%`. Left edge fades to `--bg` via gradient overlay (see `.hero-image-fade` in `styles.css`).
- Logo: always rendered with `filter: brightness(0) invert(1)` so it appears white on dark.

---

## Assets

Located in `assets/`:

| File | Use |
|---|---|
| `Logo.png` | Site logo — invert to white in CSS |
| `hero-image.png` | Catalog page hero right panel |
| `UI-Reference.png` | Visual reference for the catalog layout |
| `renders/` | Product render images (PNG, named by model ID) |

Product thumbnail paths follow the pattern: `assets/renders/renders_thumbs/model{ID}.webp`.

---

## File Structure

```
index.html       — Catalog page markup
styles.css       — All styles (no framework, plain CSS with custom properties)
catalog.js       — Filter, sort, render logic for the product grid
products.js      — Product data array
assets/          — Brand assets and renders
serve.mjs        — Dev server (localhost:3000)
screenshot.mjs   — Puppeteer screenshot helper
```

---

## Do / Don't

| Do | Don't |
|---|---|
| Use `var(--gold)` for interactive accents | Use Tailwind default blue/indigo |
| Keep new surfaces within the 3-layer depth system | Introduce new background colors |
| Use Playfair Display for headings | Use Manrope for display/hero headings |
| Animate only `transform` / `opacity` | Use `transition-all` |
| Add grain texture to full-bleed sections | Leave large sections completely flat |
| Test every interactive element has hover + focus + active | Ship elements with only a hover state |
