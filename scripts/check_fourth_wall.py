#!/usr/bin/env python3
"""
Fourth-wall linter for slavingia/prototypes.

Prototypes must read as real, shipping IRS products. This checks every
prototype's index.html for user-visible copy that breaks the fourth wall —
referring to itself as a prototype/demo/reskin, comparing to "the live site",
or explaining what was changed/why.

It deliberately IGNORES:
  - HTML/JS/CSS comments (<!-- ... -->, // ..., /* ... */)
  - the permitted footer disclaimer line (hobby project / mock data / not affiliated)
  - <title> is checked (it's user-visible in the tab)
  - the archive/ directory (retired prototypes)

Exit code 0 = clean, 1 = violations found (prints them). Used by CI and locally.
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# Phrases that break the fourth wall when they appear in visible copy.
# Case-insensitive, matched against text nodes / visible strings only.
VIOLATION_PATTERNS = [
    r"\breskin(ned|ning)?\b",
    r"\bredesign(ed|ing)?\b",
    r"this is a (prototype|mockup|mock-up|demo|concept|reskin|redesign)",
    r"\bin this (prototype|mockup|demo)\b",
    r"\ben este prototipo\b",
    r"\bfor this demo\b",
    r"\bdemo only\b",
    r"\bdemo confirmation\b",
    r"\bthe live (site|directpay|version|page)\b",
    r"\bon the live\b",
    r"\bcurrent (site|page|version)\b",
    r"\bthe old (version|site|page)\b",
    r"\bthe original (site|page|version)\b",
    r"\bno money moves\b",
    r"\bno real (payment|money)\b",
    r"\bsubmission is simulated\b",
    r"\bwe (rebuilt|redesigned|reskinned|improved|changed)\b",
    r"\brebuilt to\b",
    r"\bthis is the differentiator\b",
    r"\bfull version\b",
    r"\bwould load\b",
    r"\bshown here for (flow )?context\b",
    r"\bfocus of this (reskin|prototype|redesign)\b",
    r"\bcryptic (stacked )?dropdowns\b",
    r"\bdesign guidelines\b(?!.*DESIGN\.md)",
    r"\bbefore/after\b",
]

# Lines/fragments that are explicitly allowed even if they contain trigger words.
# The footer disclaimer + any "illustrative"/mock-data notes are permitted.
ALLOW_SUBSTR = [
    "personal hobby",
    "hobby project",
    "fictional mock",
    "mock data",
    "not affiliated",
    "not an official",
    "illustrative",
    "for illustrative",
    "All prototypes",   # the gallery back-link
    "placeholder=",     # input placeholder attribute is fine
]

COMPILED = [re.compile(p, re.IGNORECASE) for p in VIOLATION_PATTERNS]


def strip_comments(text: str) -> str:
    text = re.sub(r"<!--.*?-->", " ", text, flags=re.DOTALL)   # HTML comments
    text = re.sub(r"/\*.*?\*/", " ", text, flags=re.DOTALL)     # CSS/JS block comments
    text = re.sub(r"(?m)^\s*//.*$", " ", text)                  # JS line comments (start of line)
    return text


def visible_strings(text: str):
    """Yield (approx_line, snippet) for visible text: text nodes + quoted JS UI strings."""
    for i, raw in enumerate(text.splitlines(), 1):
        line = raw.strip()
        if not line:
            continue
        # skip pure comment lines
        if line.startswith("//") or line.startswith("*") or line.startswith("<!--"):
            continue
        yield i, raw


def check_file(path: Path):
    src = path.read_text(encoding="utf-8", errors="replace")
    cleaned = strip_comments(src)
    violations = []
    for lineno, raw in visible_strings(cleaned):
        low = raw.lower()
        if any(a.lower() in low for a in ALLOW_SUBSTR):
            # Allowed context (disclaimer/mock-data note) — but still flag if a
            # hard self-reference like "reskin"/"prototype demo" appears alongside.
            if not re.search(r"\b(reskin|redesign|demo only|in this prototype|the live)\b", low):
                continue
        for rx in COMPILED:
            m = rx.search(raw)
            if m:
                violations.append((lineno, m.group(0), raw.strip()[:140]))
                break
    return violations


def main():
    # Only check active prototypes: top-level */index.html, excluding archive/ and dot dirs.
    targets = []
    for p in sorted(REPO.glob("*/index.html")):
        rel = p.relative_to(REPO)
        top = rel.parts[0]
        if top.startswith(".") or top in {"archive", "assets", "docs", "node_modules"}:
            continue
        targets.append(p)
    # NOTE: the root index.html is the gallery/catalog page — it legitimately
    # describes the prototypes (that's its job), so it is NOT fourth-wall-policed.
    # Only individual prototype UIs must stay in-world.

    total = 0
    for path in targets:
        v = check_file(path)
        if v:
            total += len(v)
            rel = path.relative_to(REPO)
            print(f"\n✗ {rel}")
            for lineno, hit, snippet in v:
                print(f"    line {lineno}: matched {hit!r}")
                print(f"      → {snippet}")

    if total:
        print(f"\n❌ Fourth-wall check FAILED: {total} violation(s) across "
              f"{sum(1 for p in targets if check_file(p))} file(s).")
        print("Prototypes must read as real IRS products. Remove the meta copy "
              "(see CONTRIBUTING.md 'Never break the fourth wall').")
        return 1

    print(f"✓ Fourth-wall check passed — {len(targets)} prototype(s) clean.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
