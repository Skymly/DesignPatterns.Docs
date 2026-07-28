# DesignPatterns.Docs — AI agent notes

## Scope

Documentation site only (VitePress). Generator and API changes belong in [DesignPatterns](https://github.com/Skymly/DesignPatterns). Sample apps belong in [DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples).

Live site: https://skymly.github.io/DesignPatterns.Docs/

## Agent skills

Config: [`docs/agents/`](docs/agents/) (`issue-tracker.md`, `triage-labels.md`, `domain.md`).

| Change lands in… | File execution issue on… | Local path |
|------------------|--------------------------|------------|
| This VitePress site | **`Skymly/DesignPatterns.Docs`** (this repo) | `C:\Code\Skymly\DesignPatterns\DesignPatterns.Docs` |
| Library / maintainer docs (ADR, Design Doc) | `Skymly/DesignPatterns` | `C:\Code\Skymly\DesignPatterns\DesignPatterns` |
| Samples | `Skymly/DesignPatterns.Samples` | `C:\Code\Skymly\DesignPatterns\DesignPatterns.Samples` |

Cross-feature: parent/map may live on DesignPatterns; link with `Relates to` / `Blocked by` URLs. Do not dual-file full acceptance criteria.

## Commands

```bash
npm install
npm run docs:dev
npm run docs:build
```

## Language

- User-facing docs: English under `docs/`, 简体中文 under `docs/zh/` (keep pairs in sync when editing guides).
- Commit messages and GitHub Issue/PR text: **English**.
- User chat: 简体中文 (unless requested otherwise).

## Git

- Do not commit or push unless the user asks.
