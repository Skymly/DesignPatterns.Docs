# Reference & links

## Repositories

| Repository | Role |
|------------|------|
| [DesignPatterns](https://github.com/Skymly/DesignPatterns) | Runtime, Roslyn generators, analyzers, tests |
| [DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples) | Runnable console samples |
| [DesignPatterns.Docs](https://github.com/Skymly/DesignPatterns.Docs) | This documentation site |

## NuGet packages (planned)

| Package ID | Contents |
|------------|----------|
| `DesignPatterns` | Meta package — runtime + source generator |
| `DesignPatterns.Extensions.DependencyInjection` | MSDI extensions + `RegisterDi` generation |

::: info Early preview
Packages may not be on [nuget.org](https://www.nuget.org) yet. Use local `dotnet pack` from `DesignPatterns.Package` or sibling project references.
:::

## Solution layout (generator repo)

| Project | Role |
|---------|------|
| `DesignPatterns` | Runtime primitives |
| `DesignPatterns.SourceGenerators` | Incremental generators |
| `DesignPatterns.Analyzers` / `DesignPatterns.CodeFixes` | DP006, DP023, DP024 |
| `DesignPatterns.Diagnostics` | DP### ID constants |
| `DesignPatterns.Extensions.DependencyInjection` | MSDI + DI targets |
| `DesignPatterns.Package` | NuGet meta package |

## Diagnostics

See [Diagnostics](./diagnostics.md) (DP001–DP024).

## Contributor docs

Deep design notes remain in the main repo:

- [docs/DEVELOPMENT.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/DEVELOPMENT.md)
- [docs/ROADMAP.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/ROADMAP.md)
- Per-pattern markdown under `DesignPatterns/docs/` (Chinese, maintainer-oriented)
