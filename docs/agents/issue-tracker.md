# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues on **`Skymly/DesignPatterns.Docs`**. Use the `gh` CLI for all operations.

## Conventions

- **Create**: `gh issue create --repo Skymly/DesignPatterns.Docs --title "..." --body "..."`
- **Read**: `gh issue view <n> --repo Skymly/DesignPatterns.Docs --comments`
- **List**: `gh issue list --repo Skymly/DesignPatterns.Docs --state open --json number,title,body,labels,comments`
- **Comment / label / close**: `gh issue comment` / `gh issue edit --add-label` / `gh issue close` with `--repo Skymly/DesignPatterns.Docs`

When cwd is this clone, `gh` may omit `--repo`; keep it when coordinating with siblings.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## When a skill says "publish to the issue tracker"

Create a GitHub issue **in this repo** for user-site work. Library / maintainer-doc / sample work must go to the owning sibling (below).

## Sibling issue routing

| Local path | GitHub repo | Owns |
|------------|-------------|------|
| `C:\Code\Skymly\DesignPatterns\DesignPatterns` | `Skymly/DesignPatterns` | Library + maintainer `docs/` (ADR, Design Doc, ROADMAP) |
| `C:\Code\Skymly\DesignPatterns\DesignPatterns.Docs` | `Skymly/DesignPatterns.Docs` | **This site** (VitePress `docs/`, `docs/zh/`) |
| `C:\Code\Skymly\DesignPatterns\DesignPatterns.Samples` | `Skymly/DesignPatterns.Samples` | Runnable samples |

**Rules**

- Execution issues for VitePress / user guides / diagnostics pages land **here**.
- Do **not** open library or sample execution issues in this tracker — use `--repo Skymly/DesignPatterns` or `Skymly/DesignPatterns.Samples`.
- Cross-feature work: prefer a parent/map on DesignPatterns with a checklist link to this issue; put `Relates to: https://github.com/Skymly/DesignPatterns/issues/N` (and `Blocked by:` when waiting on library merge) at the top of this issue's body.
- Do not dual-file full acceptance criteria in two repos.

## Wayfinding operations

Same label vocabulary as the core repo (`wayfinder:map`, `wayfinder:research`, `wayfinder:grilling`, `wayfinder:prototype`, `wayfinder:task`). Cross-repo children of a DesignPatterns map are linked by URL checklist + `Relates to`, not GitHub sub-issues.
