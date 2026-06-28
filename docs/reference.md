# Reference & links

## Repositories

| Repository | Role |
|------------|------|
| [DesignPatterns](https://github.com/Skymly/DesignPatterns) | Runtime, Roslyn generators, analyzers, tests |
| [DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples) | Runnable console samples |
| [DesignPatterns.Docs](https://github.com/Skymly/DesignPatterns.Docs) | This documentation site |

## NuGet packages

| Package ID | Version (preview) | Contents |
|------------|-------------------|----------|
| [`Skymly.DesignPatterns`](https://www.nuget.org/packages/Skymly.DesignPatterns) | `0.2.0-preview3` | Meta package — runtime + source generator + analyzers + code fixes |
| `DesignPatterns.Extensions.DependencyInjection` | — (not on NuGet yet) | MSDI extensions + `RegisterDi` generation |
| `DesignPatterns.Extensions.Autofac` | — (not on NuGet yet) | Autofac extensions + `RegisterAutofac` generation |

```xml
<PackageReference Include="Skymly.DesignPatterns" Version="0.2.0-preview3" />
```

::: info Deprecated GitHub-only IDs
Do not use the old GitHub Packages ID `DesignPatterns` (`0.1.0-preview1` / `preview2`). Use **`Skymly.DesignPatterns`** on nuget.org instead.
:::

## Solution layout (generator repo)

| Project | Role |
|---------|------|
| `DesignPatterns` | Runtime primitives |
| `DesignPatterns.SourceGenerators` | Incremental generators |
| `DesignPatterns.Analyzers` / `DesignPatterns.CodeFixes` | DP006, DP023, DP024, DP025, DP033, DP036, DP044 |
| `DesignPatterns.Diagnostics` | DP### ID constants |
| `DesignPatterns.Extensions.DependencyInjection` | MSDI + DI targets |
| `DesignPatterns.Package` | NuGet meta package (`PackageId=Skymly.DesignPatterns`) |
| `eng/nuget-smoke/MetaPackage.Consumer` | End-to-end NuGet consumer smoke test |

## Diagnostics

See [Diagnostics](./diagnostics.md) (DP001–DP055).

## Contributor docs

Deep design notes remain in the main repo:

- [docs/README.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/README.md) — internal doc index
- [docs/DEVELOPMENT.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/DEVELOPMENT.md)
- [docs/PUBLISHING.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/PUBLISHING.md)
- [docs/FactoryKeyConventions.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/FactoryKeyConventions.md)
- [docs/ROADMAP.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/ROADMAP.md)
- Per-pattern markdown under `DesignPatterns/docs/` (Chinese, maintainer-oriented)
