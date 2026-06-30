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

## Checklist for a new prototype
- [ ] Source Sans 3 loaded via Google Fonts (with `preconnect`); no body `line-height:1.5`.
- [ ] Full expandable USWDS government banner with ARIA attributes.
- [ ] Square containers/inputs; `4px` buttons & icon tiles; circular indicators only.
- [ ] Bold dark keys, plain values, left-aligned, key at `50%`.
- [ ] `16px` labels/hints/buttons; weight `500` for buttons, labels, step titles.
- [ ] Step indicators: outlined pending, blue done, navy current.
- [ ] Color tokens from this file; dividers `#D6D7D9`.
- [ ] Disclaimer footer present.
- [ ] Mock data only — no PII (see `CONTRIBUTING.md`).
