# UX / design audit log

A running log of design & UX improvements from walking through the prototype
flows. Screenshots are generated (see `CONTRIBUTING.md`); this file records the
*why*.

## 2026-07-01 — flow walkthrough pass 1

**Taxpayer Assistant (`ai-agent-chat/`)**
- Removed the exposed "Agent tools" left rail — listing the tools statically on
  the side read as strange/technical. Tools now surface **inline** as tool-call
  cards within the conversation (the "narrating each tool" idea), which is the
  point.
- Made the chat **full-width and minimalist**: dropped the bordered box, removed
  the grey canvas tint (bubbles read fine on white), aligned header/composer/
  messages to the page gutter, and capped message width for readability.

**Navigation — all pages**
- Replaced the prominent top "‹ All prototypes" link with a **subtle footer
  link**, consistently on every prototype page, so "get back" is always there
  but unobtrusive.

**Header omni-bar variants (`online-account-webapp-headerbar*.html`, V1/V2/V3)**
- **Fixed mobile masthead overflow.** At narrow widths the logo + full-width
  omni bar + account switcher didn't fit on one row, so the switcher was clipped
  off the right edge (text colliding / cut off). The masthead now **wraps**: logo
  + account switcher stay on row 1, the omni bar drops to its own full-width row.
  No more horizontal overflow.

## 2026-07-01 — flow walkthrough pass 2

- **Chevrons → SVG.** Replaced old-school glyph chevrons (⌄ ‹ ›) in page chrome
  (government-banner toggle, breadcrumb separators, back-links, account-switcher
  triggers) with the shared inline SVG chevron. (Carets baked into JS-rendered
  nav-tab labels are left as glyphs — injecting SVG markup into the double-quoted
  JS strings broke the scripts, so those are intentionally skipped.)
- **Removed the "|" divider** next to the IRS logo (the `.ctx` border-left).
- **Fixed mobile horizontal overflow.** On the app pages the utility links
  (`.util`) ran off the right edge; the masthead now wraps and `.util` drops to
  its own row. Verified: no page-level horizontal scroll at 390px on bta /
  webapp / refund / chat / headerbar.
- **Taxpayer Assistant:** removed the redundant breadcrumb + title + description
  intro; the IRS logo is now the clickable "home" affordance; chat is full-width
  and minimalist (no box, white canvas).
- Regenerated the omni gallery screenshots so they reflect the new chrome.

### Still to review
- Dense read-row key/value wrapping at mobile widths across wizards.
- Exploring the omni-bar-in-header (V3) as the shared masthead for other flows.

## 2026-08-25 — third-party payments feedback pass (#19)

**Guided wizard (`third-party-pay-v1/`)**
- **Constrained to the MVP:** one third party making one payment for one
  taxpayer. The generic "notice or form" reason step is now a choice between
  the two supported collection scenarios — **IRS levy** and **federal tax
  lien** — which drives which identifiers are collected.
- **Identifier reality per scenario:** the levy path asks for what a levy
  notice actually shows (TIN, taxpayer name, kind of tax, tax period(s),
  Form 668-A vs 668-W); the lien path is keyed by the **lien serial number**,
  since the TIN on lien paperwork may be masked.
- **No balance disclosure:** removed the "matched taxpayer" echo and every
  obligation/balance readback. Copy states the IRS doesn't display the
  taxpayer's account information or balance.
- **Lien balance is a filing-time snapshot:** the lien path carries a
  payoff-letter callout — request a lien payoff letter for the current amount
  before paying a lien off in full.
- **All amounts accepted:** verification tiers no longer carry dollar caps or
  block submission; they only decide immediate posting vs. held-for-review.
  No messaging confirms a balance or flags an overpayment.
- **No payment designation:** the "payment application instructions"
  (split/target periods) step is gone; the payment step states the IRS applies
  the payment as provided by law.

**Payer dashboard (`third-party-pay-v3/v2/`)**
- Quick-pay panel reworked to reason (levy/lien) + reference (levy identifiers
  or lien serial number); removed the obligation/period selector.
- History column "Obligation" → "Reference" with levy/lien references, no
  balance-type strings.
- Fixed the footer "All prototypes" link (pointed at the redirect page).

**Bulk console (`third-party-pay-v2/` → `archive/third-party-pay-bulk/`)**
- Bulk/batch is deferred out of the MVP, so the institution CSV console moved
  to the archive.

### Prototype test cases to walk (not scope)
- Partial or outdated lien information; taxpayer name variations vs. the name
  printed on the levy/lien; multiple liens for one taxpayer; concurrent levy
  payments from multiple financial institutions.

## 2026-08-25 — one-page layout + screenshot audit (#19)

**Third-party payments consolidated (`third-party-pay/`)**
- The versioned variants are gone from the active tree — one current
  prototype remains. The stepped wizard became a **single page**: all five
  form sections (payer type, reason, taxpayer identifiers, payment details,
  payer identity) stacked on the left, with a **sticky live payer-of-record
  summary** on the right that carries the attestation and submit. No
  show/hide steps; the receipt renders after submitting.
- Retired to `archive/`: `third-party-pay-wizard-steps` (the stepped flow)
  and `third-party-pay-dashboard` (the payer dashboard variant), joining
  `third-party-pay-bulk`. Their asset/footer paths were fixed for the new
  depth.

**Screenshot audit**
- **Dead PR images (fixed):** PR #18 and PR #20 embedded screenshots via
  their branch URLs; both branches were deleted on merge, so every image
  404'd. Both PR bodies now pin images to the merge-commit SHA, and
  CONTRIBUTING.md documents the rule.
- `.shots/19/onepage-*` added for the current one-page design (levy, lien,
  receipt, dark, mobile at 390px — no horizontal scroll).
- Historical note: shots under `.shots/7–12` predate the 2026-07-08
  design-system passes (dark mode, SVG icon library, gov-banner flag), so
  they depict the older chrome. They are point-in-time PR records; no living
  page embeds them. The archive gallery's images depict the archived pages
  themselves and still match.

## 2026-08-25 — rebase third-party payments onto the approved base (#19)

**Wrong base caught.** The #19 feedback rounds had been applied to the old
issue-#7 `third-party-pay` lineage — which still carried the verification-tier
concept that was already dropped when the flow moved to `directpay-onbehalf`
v3 (issue #9, the most recent approved on-behalf prototype: one page,
left/right with a sticky payment summary, posting forecast instead of tiers,
"account balances are never shown"). The just-built `third-party-pay/`
one-pager was removed; `directpay-onbehalf` is the single current prototype
(v3 hoisted to `directpay-onbehalf/index.html`, v1/v2 subdirs removed —
history keeps them).

**#19 feedback applied to the right base:**
- "Levy or lien payment" now really has a **lien branch**: choose notice of
  levy vs. federal tax lien; the lien path is keyed by the **lien serial
  number** and carries the payoff-letter callout (filed amount is a
  snapshot).
- **No TIN needed for a lien** — a lien payer often doesn't have one. In lien
  mode, step 3 asks only for the name as printed on the lien (+ optional
  address); verification becomes "Match lien record" against the serial
  number and name. No SSN/ITIN/EIN field at all.
- **Tax periods removed everywhere** — the general-payment mode's optional
  "Tax period" input is gone; the payment is applied to the correct period on
  the account after it's received.
- Summary and receipt carry the lien serial and "applied as provided by law";
  levy-response receipt steps only appear for actual levies; recurring
  schedule stays levy-only (668-W).
- `.shots/19/onbehalf-*` regenerated for this design; the `onepage-*` shots
  of the removed wrong-base page were dropped from main (PR #21's body links
  them by pinned SHA, so its history still renders).
