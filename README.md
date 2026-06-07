# DesignPatterns.Docs

Static documentation for **[Skymly/DesignPatterns](https://github.com/Skymly/DesignPatterns)**, built with **[VitePress](https://vitepress.dev/)** (local search, English + 简体中文).

## Live site

**https://skymly.github.io/DesignPatterns.Docs/**

Deployed from `main` via the **GitHub Pages** workflow (`build_type: workflow`).

## Prerequisites

- **Node.js 22** (see [`.nvmrc`](.nvmrc))

## Local development

```bash
npm install
npm run docs:dev
```

Default dev URL: `http://localhost:5173/DesignPatterns.Docs/`

## Build and preview

```bash
npm run docs:build
npm run docs:preview
```

Production output: `.vitepress/dist`

## Repository layout

| Path | Purpose |
|------|---------|
| `docs/` | English Markdown |
| `docs/zh/` | 简体中文 Markdown |
| `.vitepress/config.mts` | Site config, `base`, i18n, sidebar |
| `.github/workflows/github-pages.yml` | CI build and GitHub Pages deploy |

## Related

| Link | Description |
|------|-------------|
| [DesignPatterns](https://github.com/Skymly/DesignPatterns) | Runtime, source generators, tests |
| [DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples) | Runnable console samples |

## License

MIT — see [LICENSE](LICENSE).
