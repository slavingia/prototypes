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

### Still to review
- `bta-94x-pin` mobile masthead (context label wraps tightly) and the section-nav
  tab row overflow on narrow screens.
- `online-account-webapp` / `-banner` mobile mastheads (utility links).
- Dense read-row key/value wrapping at mobile widths across wizards.
