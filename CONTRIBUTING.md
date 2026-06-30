# Contributing

This repository holds **design prototypes and concept explorations only**.

## Hard rules

- **No PII, ever.** Never commit real taxpayer data or any personally identifiable
  information — no real names, SSNs/ITINs, addresses, phone numbers, emails,
  account/EFT numbers, balances tied to a real person, screenshots of live
  signed-in sessions, API responses containing real data, tokens, or credentials.
- **Public information only.** Use only publicly available information and
  synthetic/sample/illustrative data that is helpful for prototyping IRS
  experiences. Personas and example values must be invented, not real.
- **Prototypes only.** This repo is for HTML/visual concepts and walkthroughs.
  It is not for production code, secrets, infrastructure, or anything that
  touches live taxpayer systems.
- **Follow the design system.** Every prototype — new or updated — must match
  [`DESIGN.md`](DESIGN.md), the IRS ODG (USWDS-based) styling standard. This is
  not optional: use its color tokens, Source Sans 3 type ramp, the expandable
  USWDS government banner, square containers/inputs (`4px` buttons), the
  blue/navy step indicators, and the disclaimer footer. Run the checklist at the
  bottom of `DESIGN.md` before committing. This applies equally to humans and to
  AI assistants working in this repo.

## Before you commit

- Double-check screenshots and HTML for any real data that may have leaked in
  (account bars, names, amounts, identifiers). When in doubt, redact or use
  obviously-fake placeholders.
- Keep prototypes self-contained (inline CSS/JS, local assets) so they open
  directly in a browser.
