# Direct Pay v4 — issue #32

Updated September 9, 2026. This is a self-contained design prototype with
synthetic fixtures only. There are no payment, authentication, email, or ITIS
network calls. Do not enter real personal, taxpayer, or bank information.

## Scope and public references

The issue's corrected target is `directpay-v4/index.html`. The separate
lien/levy MVP in `third-party-pay/` is unchanged.

The catalog covers all individual Direct Pay form/tax types and payment reasons
listed in the public sources below, including income tax, both Form 5329
categories, health care, civil penalties, estate/gift/other individual forms,
offer-in-compromise subtypes, offshore payments, IRC 965 and BBA payments.
Selecting a form filters reasons; changing either clears the payment period.
Income-tax estimated, amended and extension reasons resolve to Forms 1040-ES,
1040-X and 4868 in review. Other extensions identify 4768, 7004 or 8892.

- [Individual payment types and periods](https://www.irs.gov/payments/types-of-payments-available-to-individuals-through-direct-pay)
- [Direct Pay help: verification, scheduling, limits and confirmation](https://www.irs.gov/payments/direct-pay-help)
- [Direct Pay tax information](https://directpay.irs.gov/directpay/payment)

Consulted September 9, 2026. The public tip sheet summarizes reason/form mappings;
it is not an authoritative service schema. It also describes the Form 1040
extension window in general terms. The prototype uses the regular April 15
cutoff and does not model holiday, disaster, overseas or other special extension
rules. Other-form extensions use the published current-year rule. These
form/period rules require business-owner confirmation against the production
catalog before implementation. CT-2 presents calendar quarters rather than an
annual-only period. Separate business return payments link to the business flow.

The payment journey includes taxpayer verification, domestic/foreign address
entry, bank and amount confirmation, dates through 365 days ahead, optional
email confirmation, review and authorization, and a receipt. During the same
page session a future payment can be changed or canceled if at least two weekdays
remain. Holiday calendars and cross-session payment lookup require authoritative
payment services and are not implemented. The receipt confirms submission,
not successful settlement. Email is only mentioned when requested.

## Draft continuity and taxpayer/payer separation

Sign-in opens a dialog over the existing form. Continue, cancel, Escape, and
sign-out preserve every draft field and checkbox. Sign-in changes only the payer
session state. It never substitutes taxpayer or bank data and never marks a
payee as verified. Saved identity and bank details require separate explicit
buttons; those buttons explain that they replace their respective fields.
The identity button is unavailable when paying for someone else.

The taxpayer is the entity receiving credit; the bank account holder and signer
are the payer. A signed-in payer does not establish the taxpayer's identity.
Changing any verification input or who the payment is for invalidates the match.
A revision counter ignores asynchronous responses for an older identity.
Changing payment details clears authorization, and every edit requires a new
review and authorization.

The draft lives only in page memory. No localStorage, sessionStorage, URLs,
analytics payloads, or logs receive taxpayer/bank data. Closing or reloading
clears it. A real external sign-in redirect needs a short-lived encrypted
server-side draft tied to the pre-auth session and protected against session
fixation/CSRF; only an opaque one-time continuation reference should travel in
the redirect. Session binding, expiry, restoration and deletion must be designed
with the authentication team. This prototype demonstrates continuity with an
in-page sign-in transition, not a production redirect implementation.

## ITIS integration boundary

`entityValidator.validateTaxpayer(snapshot)` is a local adapter seam. Its
`verified`, `mismatch`, and `unavailable` values are **prototype application
states, not a claimed ITIS API contract**. No public ITIS interface specification
or service credentials were supplied. There is no invented endpoint, network
connection, or assertion that a production entity has been validated.

The backend integration must confirm with the ITIS owner:

- The supported entity types, required identifiers, tax-return attributes, and
  form/account relationships (including estate and other EIN entities).
- How a match is established, authorized, bound to this taxpayer, and invalidated.
- The real response schema, retry policy, rate limits, availability behavior,
  and permitted disclosure of mismatch details.
- How authenticated payer identity and authority to submit for another taxpayer
  are handled separately from payee/entity matching.
- Where the draft, validation receipt and payment authorization are stored,
  protected, expired and deleted.

A length-valid TIN is insufficient. The local adapter succeeds only on complete
synthetic fixture matches. Errors and outages keep submission blocked and retain
the draft; there is no bypass through sign-in. The frontend status is only a
walkthrough control. A production server must revalidate and bind the match at
submission rather than trust a browser flag.

## Fictional QA personas

The SSNs use an invalid 900 prefix and the EIN an invalid 00 prefix. All values
are invented. Do not substitute real data. Individual fixtures use verification
year = current calendar year minus one, Single filing status, U.S. address
`100 Example Avenue`, `Example City`, `VA`, `00000`.

| Scenario | Name | SSN / EIN | Date of birth |
|---|---|---|---|
| Saved individual | Jordan Rivera | 900001001 | 1986-04-12 |
| Another individual | Casey Morgan | 900001002 | 1979-06-20 |
| Estate/entity | Estate of Avery Example | 000000001 | Not used |
| Service unavailable | Any complete individual fixture with this SSN | 900009999 | As above |
| No match | Change any required match attribute | Any other 9-digit value | As above |

The saved fictional bank account is `0000007740`, checking, with routing
`071000013` (a public checksum-valid routing format) and holder Jordan Rivera.
The sign-in flow plus **Use my taxpayer details** and **Use saved bank account**
provides a quick successful walkthrough. For third-party or entity scenarios,
enter the corresponding fixture and press **Verify taxpayer**. Foreign addresses
are captured and retained but have no successful local fixture.

## Validation and generated screenshots

Use a separately installed Playwright package so this static repository does not
need a package manifest:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/node_modules/playwright \
  node directpay-v4/tools/check.mjs --shots
python3 scripts/check_fourth_wall.py
```

The script exercises all form/reason options, period boundaries, third-party
and partial-draft sign-in, canceled sign-in and sign-out, saved-data selection,
matching/mismatch/unavailable entity states, stale verification responses,
strict amount/bank/date validation, escaping, review/consent, receipts,
scheduled modifications, cancellation, and mobile overflow. With `--shots`,
it regenerates the five current screenshots in `.shots/32/`. Earlier `.shots/11`
images are historical snapshots from issue #11 and are not presented as the
current design. The root gallery points to the current generated screenshot.
