# DesignPatterns.Docs

VitePress user documentation site for [Skymly/DesignPatterns](https://github.com/Skymly/DesignPatterns) (live at https://skymly.github.io/DesignPatterns.Docs/). Library code, ADRs, and maintainer design docs belong in `Skymly/DesignPatterns`; sample apps belong in [Skymly/DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples).

## Build & Verify

```bash
npm install
npm run docs:dev
npm run docs:build
```

## Docs & Agent Config

- Keep user-facing guides paired in sync between English (`docs/`) and Simplified Chinese (`docs/zh/`).
- Issue routing and triage labels: [`docs/agents/`](docs/agents/). File execution issues in the repository where the change lands and link cross-repo dependencies via URLs (`Related:` / `Blocked by:`).

## Conventions

- Commit messages, issues, and PR text: **English**.
- Do not commit or push unless explicitly requested.
