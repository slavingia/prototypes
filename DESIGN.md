# Design System — IRS ODG (USWDS-based)

The styling standard for every prototype in this repo. It follows the IRS Online
Design Guidelines, which are built on the U.S. Web Design System (USWDS). New
prototypes should start from these rules; existing ones should match them.

Prototypes stay self-contained (inline CSS/JS, local assets) so they open
directly in a browser — so this is a spec to copy, not a shared stylesheet.

---

## Core principles

1. **Square corners.** Containers, panels, cards, and inputs have no
   border-radius. Buttons and small icon tiles use `4px`. Only true indicators
   (step circles, status dots, the success ring) stay circular.
2. **USWDS government banner.** Every page opens with the full expandable
   official-government banner — US-flag SVG, "Here's how you know" toggle, and
   the `.gov` / HTTPS-lock guidance, wired with `aria-label`, `aria-controls`,
   and `aria-expanded`.
3. **Bolder labels, plain values.** Keys/labels are dark (`#1b1b1b`) and bold
   (`700`); the values they describe are plain weight.
4. **Left-aligned key/value.** In read rows, the key takes `50%` width and both
   key and value are left-aligned (no `space-between`, no right-aligned values).
5. **Larger base text.** Labels, hints, buttons, and panel hints are `16px`.
6. **Lighter UI weight.** Interactive/structural text (buttons, field labels,
   step titles) is weight `500`, not `700`.
7. **Step indicators.** Pending = white fill with a `1px #5B616B` outline;
   done = solid blue `#00599C`; current = solid navy `#002D62`. Never green.
8. **Tighter spacing.** Prefer compact gaps (e.g. layout columns `24px`).
9. **No red text.** Never color balances, amounts, or body text red. A balance
   owed is plain dark `--ink`, like any other amount. Red is reserved for
   error-alert accents (left rule / icon) — never for numbers or text.
10. **No emoji. No glyph icons.** Emoji (🏦 ✓ ⏳ …) and icon-glyphs
    (`›`, `‹`, `⌄`, `✕`, `➤`, arrows used as icons) are never used in UI.
    Every pictograph is an inline SVG from the icon library below — one
    consistent stroke style, colored via `currentColor`, sized via `1em`.
    Typographic arrows inside running prose (e.g. "upload → review") are
    fine; the ban is on glyphs doing an icon's job.

---

## Color tokens

```css
:root{
  --irs-blue:#004c97;  --irs-navy:#002d5c;
  --ink:#1b1b1b;       --muted:#5c5c5c;     --link:#0050a0;
  --line:#d6d7d9;      --bg:#fff;
  --green:#1a7f4b;     --amber:#8a6d00;     --red:#b50909;
  --teal:#00687d;      --violet:#5b3fa0;
}
```

Step-indicator colors are used directly: pending outline `#5B616B`,
done `#00599C`, current `#002D62`. Borders/dividers use `#D6D7D9`; secondary
text on light backgrounds uses `#5b616b`.

---

## Typography

- **Font:** `"Source Sans 3"` loaded via Google Fonts with `preconnect`, falling
  back to `"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif`.

  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;0,900&display=swap" rel="stylesheet">
  ```
- **Body:** `font-size:16px`; use the browser default line-height (do not set
  `line-height:1.5` on `body`).
- **Base UI text:** `16px` for field labels, hints, buttons, and panel hints.

---

## Components

### Government banner
Full expandable USWDS banner: flag SVG + "An official website of the United
States government" + a "Here's how you know" `<button>` that toggles the
`.gov` / HTTPS guidance. Accessibility attributes are required
(`aria-label`, `aria-controls`, `aria-expanded`).

### Border radius
| Element | Radius |
|---|---|
| Containers — `.bizchip`, `.steps`, `.panel`, `.attest`, `.nextcard`, `.route`, `.formopt`, `.pinbox` | none |
| Inputs — `.field input` | `0` |
| Buttons — `.btn` | `4px` |
| Small icon tiles — `.nextcard .ni`, `.route .dot`, `.bizchip .bi` | `4px` |
| Indicators — step `.num`, success `.ring` | circular (`50%`) |

### Wizard step sidebar
- `.steps li` — `align-items:center`.
- `.steps li .num` (pending) — `background:#fff; color:#5B616B; border:1px solid #5B616B`.
- `.steps li.done .num` — `background:#00599C; color:#fff; border-color:#00599C`.
- `.steps li.current .num` — `background:#002D62; color:#fff; border-color:#002D62`.
- `.steps li .st` (title) — `font-weight:500`.

### Read rows (key/value)
- `.readrow` — `justify-content:flex-start; border-bottom:1px solid #D6D7D9`.
- `.readrow .k` — `color:#1b1b1b; font-weight:700; width:50%`.
- `.readrow .v` — `text-align:left` (plain weight).

### Form fields
- Label — `font-size:16px; font-weight:500`.
- Hint — `font-size:14px; color:#5b616b; font-weight:500; display:block`
  (block, not inline).
- Input — `border-radius:0`.

### Buttons
- `font-size:16px; font-weight:500; border-radius:4px`.

### Panel & cards
- `.panel .phint` — `font-size:16px`.
- `.nextcard .ni` — `font-size:16px`.
- `.nextcard .nt` — `font-size:16px`.
- `.route .dot` — `font-size:16px; font-weight:700`.

### Layout spacing
- `.shell` column gap — `24px`.
- `.formopt` gap — `12px`.

### Required page furniture
- A **footer** carrying the project disclaimer (personal hobby project; not
  official/affiliated; mock data only).
- The **banner toggle JS** for the expandable government banner.

---

## Iconography (inline SVG library)

All pictographs are inline SVGs — never emoji, never glyph characters. One
shared style: `viewBox="0 0 16 16"`, `fill="none"`, `stroke="currentColor"`,
`stroke-width="1.6"`, round caps/joins. Icons inherit text color via
`currentColor` and size via `1em`.

Base CSS (include in every prototype):

```css
.ic{width:1em;height:1em;vertical-align:-0.125em;display:inline-block}
```

Usage rules:
- Static HTML: paste the SVG inline with `aria-hidden="true"` (icons are
  decorative; adjacent text carries meaning).
- JS-generated markup: define each icon **once** as a `const` template
  literal (`const IC_CHECK = `<svg …>`;`) and interpolate — never rebuild
  SVG strings ad hoc, and never use single/double-quoted JS strings for SVG
  (attribute quotes will collide).
- Recolor with `color:` on the icon or parent; resize with `font-size`.

### The set

```html
<!-- chevron-right (breadcrumbs, forward affordance) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>

<!-- chevron-left (back links) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3.5 5.5 8 10 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>

<!-- chevron-down (expand/collapse) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>

<!-- arrow-right (call-to-action "continue") -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>

<!-- arrow-left (back buttons) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>

<!-- arrow-up / arrow-down (kbd hints, sort) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13.5v-11M3.5 7 8 2.5 12.5 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>

<!-- check (done, verified, success) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>

<!-- close / clear -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>

<!-- person (individual payer) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="5.2" r="2.7"/><path d="M3 13.5a5 5 0 0 1 10 0"/></g></svg>

<!-- building (business) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="2.5" width="9" height="11"/><path d="M6 5.5h1M9 5.5h1M6 8h1M9 8h1M7 13.5v-2.5h2v2.5"/></g></svg>

<!-- bank (financial institution) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6 8 2.5 13.5 6z"/><path d="M4 8.5v3M6.7 8.5v3M9.3 8.5v3M12 8.5v3M2.5 13.5h11"/></g></svg>

<!-- landmark (government banner icon) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 5.5 8 2.5l5.5 3M3 5.5h10M4.2 8v3.5M8 8v3.5M11.8 8v3.5M2.5 13.5h11"/></g></svg>

<!-- lock (secure) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="7" width="9" height="6.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/></g></svg>

<!-- clock (pending / in review — replaces ⏳) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="5.5"/><path d="M8 4.8V8l2.3 1.6"/></g></svg>

<!-- upload -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 10.5v-8M4.5 6 8 2.5 11.5 6M3 13.5h10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>

<!-- package (shipment/refund tracker) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 5 8 2l5.5 3v6L8 14l-5.5-3z"/><path d="M2.5 5 8 8l5.5-3M8 8v6"/></g></svg>

<!-- envelope (mail/notice) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3.5" width="12" height="9"/><path d="m2.5 4.5 5.5 4 5.5-4"/></g></svg>

<!-- warning (alert) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5 14.5 13.5H1.5z" fill="none"/><path d="M8 6.8v2.7"/></g><circle cx="8" cy="11.6" r=".9" fill="currentColor"/></svg>

<!-- gear (tool call / settings) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8" cy="8" r="2.2"/><path d="M8 1.8v2M8 12.2v2M1.8 8h2M12.2 8h2M3.7 3.7l1.4 1.4M10.9 10.9l1.4 1.4M12.3 3.7l-1.4 1.4M5.1 10.9l-1.4 1.4"/></g></svg>

<!-- fax / printer -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="11" height="5.5"/><path d="M5 6V2.5h6V6M5 11.5v2h6v-2"/></g><circle cx="11.3" cy="8.2" r=".9" fill="currentColor"/></svg>

<!-- send (paper plane) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8 13.5 2.5 11 13.5 7.5 9.5z"/><path d="M7.5 9.5 13.5 2.5"/></g></svg>

<!-- pen (sign) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13.5l.8-2.8 7.5-7.5a1.4 1.4 0 0 1 2 2l-7.5 7.5z"/><path d="M10.3 4.2l2 2"/></g></svg>

<!-- refresh (refund / status cycle) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13.2 8a5.2 5.2 0 1 1-1.6-3.8"/><path d="M13.5 2.5v2.2h-2.2"/></g></svg>

<!-- list (roster / dashboard) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 4h7.5M6 8h7.5M6 12h7.5"/></g><circle cx="3" cy="4" r=".9" fill="currentColor"/><circle cx="3" cy="8" r=".9" fill="currentColor"/><circle cx="3" cy="12" r=".9" fill="currentColor"/></svg>

<!-- dot (current-state marker inside step/timeline indicators) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="4" fill="currentColor"/></svg>

<!-- external-link (opens on another site) -->
<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3h7v7M13 3 6.5 9.5M7 4H3v9h9V9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>

<!-- keyboard-key symbols (⌘, ↵, kbd arrows) inside a <kbd>/.kbd element are typography, not icons — allowed.
     wave / greeting: DO NOT replace 👋 🙂 👇 with an icon — cut the emoji and let the words carry the tone -->
```

If a prototype needs an icon that isn't here, draw it in the same style
(16-grid, 1.6 stroke, round caps, `currentColor`) and **add it to this file**
in the same PR.

---

## Dark mode

Every prototype supports dark mode via **`prefers-color-scheme` only** — the
page follows the OS/browser setting. **No manual toggle**, no JS, no
localStorage: it's pure CSS.

Required plumbing:

```html
<meta name="color-scheme" content="light dark">
```

```css
:root{color-scheme:light dark}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#14171a;        /* page background */
    --surface:#1e2328;   /* cards, panels, dropdowns */
    --surface-2:#262c33; /* nested / tinted panels (was #f5f9fd etc.) */
    --ink:#e8eaed;       --muted:#9aa1a9;
    --line:#3d4551;      --link:#79b4e6;
    --green:#55b685;     --amber:#d9ae4a;  --red:#f2857f;
    --teal:#57bfd4;      --violet:#ab96ee;
  }
}
```

Rules:
1. **Everything through tokens.** Dark mode only works if surfaces and text
   use `var(--bg)`, `var(--surface)`, `var(--ink)`, etc. Replace literal
   `background:#fff` on the page/panels with tokens (add `--bg:#fff` and
   `--surface:#fff`-family tokens to the light `:root` first). Literal light
   tints (`#f5f9fd`, `#e7f0fa`, `#eef3f9`, `#f0f0f0`…) become `--surface-2`
   or a `color-mix(in srgb, var(--irs-blue) 12%, var(--surface))`.
2. **The masthead stays IRS blue** in both schemes (white text on `--irs-blue`
   passes in both). The gov banner strip becomes `--surface-2` in dark.
3. **Accent text colors must use the dark-tuned tokens** — the light-mode
   `#1a7f4b` green / `#8a6d00` amber fail contrast on dark surfaces; the
   `@media` block above retunes them. Anything written as `var(--green)` etc.
   inherits the fix for free.
4. **Shadows:** keep them, but they may need more opacity on dark to read.
   Borders (`--line`) carry most separation in dark mode.
5. **Form controls & scrollbars** follow automatically via `color-scheme`.
6. **Contrast floor still applies** in dark: 4.5:1 body text, 3:1 large text.
   Spot-check status chips, `.oicon`-style tinted tiles (use
   `color-mix(... 25%, var(--surface))` backgrounds with the tuned accent as
   text), and anything with a hardcoded hex.
7. **Images/screenshots** get no filter — leave them as-is.

---

## Checklist for a new prototype
- [ ] Source Sans 3 loaded via Google Fonts (with `preconnect`); no body `line-height:1.5`.
- [ ] Full expandable USWDS government banner with ARIA attributes.
- [ ] Square containers/inputs; `4px` buttons & icon tiles; circular indicators only.
- [ ] Bold dark keys, plain values, left-aligned, key at `50%`.
- [ ] `16px` labels/hints/buttons; weight `500` for buttons, labels, step titles.
- [ ] Step indicators: outlined pending, blue done, navy current.
- [ ] Color tokens from this file; dividers `#D6D7D9`.
- [ ] No emoji or glyph icons — all pictographs are inline SVGs from the icon library (`.ic`, `currentColor`, 16-grid / 1.6 stroke).
- [ ] Dark mode via `prefers-color-scheme` (meta + token overrides); no toggle.
- [ ] Disclaimer footer present.
- [ ] Mock data only — no PII (see `CONTRIBUTING.md`).
