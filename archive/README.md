# Archive

Retired prototype variants, kept for reference. Not listed on the prototype
index and not maintained — they may predate the current `DESIGN.md` rules
(e.g. they still use emoji/glyph icons instead of the inline SVG icon library).

## Contents

### `directpay-onbehalf/` — Direct Pay on-behalf flow (deferred design source)
The full Direct Pay "pay on behalf of a taxpayer" page (issue #9): notice and
general-payment modes, sign-in autofill, Direct Pay branding. The levy/lien
portion graduated to the active `third-party-pay/` MVP; the rest of this
page's design is kept here to merge into the MVP later. Earlier iterations of
this page live in `directpay-onbehalf-v1/…-v3/`.

### `third-party-pay-wizard-steps/` — stepped wizard (superseded)
The former `third-party-pay-v1` variant: the lien/levy pay-on-behalf flow as a
six-step wizard with show/hide steps. Superseded by the single active
`third-party-pay/` prototype — the same flow as one page with the form on the
left and a live payer-of-record summary on the right.

### `third-party-pay-dashboard/` — payer dashboard (superseded)
The former `third-party-pay-v3` variant (v1/v2 iterations): a returning
payer's history of payments made on others' behalf plus an identity-first
quick-pay rail. Retired when the third-party payment prototypes were
consolidated into the single `third-party-pay/` one-pager.

### `third-party-pay-bulk/` — bulk institution console (deferred)
The former `third-party-pay-v2` variant: a bank or business paying for many
taxpayers at once via CSV upload → validated review grid → one-declaration
batch submit. Retired when the third-party payments MVP was constrained to
**one third party making one payment for one taxpayer** (issue #19) — bulk /
batch flows are deferred, so the active variants (guided wizard + payer
dashboard) are single-payment only.

### `omnibar-in-app/` — earlier omni bar variants
The headerbar **v3** variant graduated to the active `omnibar-in-app/`
prototype at the repo root. These earlier explorations remain here:

- `index.html` — original walkthrough landing page (screenshots in `pngs/`)
- `online-account-webapp.html` — the original in-page omni bar prototype
- `online-account-webapp-banner.html` — banner variant
- `online-account-webapp-headerbar.html`, `-v2.html` — earlier masthead
  command-palette iterations
- `tools/shots.mjs` — screenshot generator for these pages
