// Regenerate every screenshot shown on the omni-bar landing (index.html) by
// driving the prototypes — so the gallery is never stale.
//
//   npm i playwright && npx playwright install chromium   # one-time
//   node omnibar-in-app/tools/shots.mjs
//
// Screenshots are GENERATED, not hand-made. Re-run this whenever a prototype
// changes (see CONTRIBUTING.md). Output → omnibar-in-app/pngs/.
import { chromium } from "playwright";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, "..");           // omnibar-in-app/
const out = join(dir, "pngs");
const VP = { width: 1200, height: 840 };
const b = await chromium.launch();

async function shot(file, name, steps) {
  const ctx = await b.newContext({ viewport: VP, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto("file://" + join(dir, file), { waitUntil: "networkidle" });
  await p.waitForTimeout(450);
  if (steps) await steps(p);
  await p.waitForTimeout(300);
  await p.screenshot({ path: join(out, name + ".png") });
  await ctx.close();
  console.log("✓", name);
}
const fillOmni = q => async p => { await p.fill("#omni", q); };
const focusOmni = async p => { await p.focus("#omni"); };
const persona = k => async p => { await p.evaluate(key => document.dispatchEvent(new KeyboardEvent("keydown", { key })), k); };
const openAcct = async p => { await p.click("#acctBtn"); };

// Concept 1 — omni bar on the account home
await shot("online-account-webapp.html", "omni-1-home");
await shot("online-account-webapp.html", "omni-2-suggestions", focusOmni);
await shot("online-account-webapp.html", "omni-3-cantpay", fillOmni("can't pay"));
await shot("online-account-webapp.html", "omni-4-notice-cp523", fillOmni("CP523"));
await shot("online-account-webapp.html", "omni-5-pay-amount", fillOmni("pay 200"));
await shot("online-account-webapp.html", "omni-6-ein-external", fillOmni("start a business"));

// Concept 2 — omni bar in the header (command palette)
await shot("online-account-webapp-headerbar.html", "header-1-collapsed");
await shot("online-account-webapp-headerbar.html", "header-2-open-suggestions", focusOmni);
await shot("online-account-webapp-headerbar.html", "header-3-cantpay", fillOmni("can't pay"));
await shot("online-account-webapp-headerbar.html", "header-4-cp523", fillOmni("CP523"));

// Concept 2 — account switcher variants
await shot("online-account-webapp-headerbar.html", "headerbar-switcher-v1", openAcct);
await shot("online-account-webapp-headerbar-v2.html", "headerbar-switcher-v2", openAcct);
await shot("online-account-webapp-headerbar-v3.html", "headerbar-switcher-v3", openAcct);

// Concept 3 — top-of-page alert banner (persona-driven)
await shot("online-account-webapp-banner.html", "banner-1-annie-personalized", persona("1"));
await shot("online-account-webapp-banner.html", "banner-2-default-scams-only", persona("2"));
await shot("online-account-webapp-banner.html", "banner-3-carla-es", persona("3"));

await b.close();
console.log("done → omnibar-in-app/pngs/");
