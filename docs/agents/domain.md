# Domain Docs

## Before exploring, read these

- **`AGENTS.md`** at the repo root.
- **`docs/agents/issue-tracker.md`** — where issues live and sibling routing.
- Live site: https://skymly.github.io/DesignPatterns.Docs/
- Library contract / diagnostics source of truth: sibling `../DesignPatterns/` (`AGENTS.md`, `docs/design/`, `docs/adr/`). Prefer reading those when documenting API or `DP###` behavior — do not invent semantics here.

## File structure

```
/
├── AGENTS.md
├── docs/                 ← VitePress English guides
│   ├── agents/           ← skills config
│   └── zh/               ← 简体中文 mirrors
└── …
```

## Language

User-facing docs: English under `docs/`, 简体中文 under `docs/zh/` (keep pairs in sync). Issue / PR / commit text: English.
