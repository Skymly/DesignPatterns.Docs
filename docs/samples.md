# Samples

Runnable console applications:

**[github.com/Skymly/DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples)**

## Run (local sibling, default)

Requires .NET 8 and a sibling `DesignPatterns` clone (`UseLocalDesignPatterns=true` by default in the samples repo).

```powershell
git clone https://github.com/Skymly/DesignPatterns.git
git clone https://github.com/Skymly/DesignPatterns.Samples.git
cd DesignPatterns.Samples
dotnet run --project DesignPatterns.Samples.Strategy -c Release
```

## Run all (CI)

```powershell
./build.ps1 --target Ci --configuration Release
```

The main [DesignPatterns](https://github.com/Skymly/DesignPatterns) CI checks out both repositories so the sibling path `../DesignPatterns` resolves.

## Projects

| Sample | Demonstrates |
|--------|--------------|
| **DesignPatterns.Samples.Strategy** | `[RegisterStrategy]` → Keys + static `Instance`; sync pay + async `ExecuteAsync` |
| **DesignPatterns.Samples.Chain** | `[HandlerOrder]` → handler pipeline |
| **DesignPatterns.Samples.Composite** | `[CompositePart]` → `BuildForest()` / `TraverseForest` (+ manual builder) |
| **DesignPatterns.Samples.Factory** | `[RegisterFactory]` generated registry |
| **DesignPatterns.Samples.RegisterFactory** | Manual `FactoryRegistryBuilder` |
| **DesignPatterns.Samples.Decorator** | `[Decorator]` stack + `DecoratorOrder` constants + conditional `Add` |
| **DesignPatterns.Samples.EventAggregator** | `IEventAggregator` pub/sub |
| **DesignPatterns.Samples.GenerateSingleton** | `[GenerateSingleton]` |
| **DesignPatterns.Samples.DependencyInjection** | `RegisterDi` for Strategy / Factory / Handler |
| **DesignPatterns.Samples.State** | Manual `TransitionTableBuilder` + `[StateMachine]` order lifecycle |

## NuGet consumption

Package **`Skymly.DesignPatterns` `0.2.2`** is on [nuget.org](https://www.nuget.org/packages/Skymly.DesignPatterns) (early preview). In the samples repo, switch off the sibling project reference:

```powershell
dotnet run --project DesignPatterns.Samples.Strategy -c Release -p:UseLocalDesignPatterns=false
```

Or set `UseLocalDesignPatterns` to `false` in `Directory.Build.props` / `Directory.Build.targets` when you only consume the published package.

::: info Deprecated package ID
Do not use the old GitHub-only ID `DesignPatterns` (`0.1.0-preview1` / `preview2`). Use **`Skymly.DesignPatterns`** on nuget.org.
:::

See [Getting started](./getting-started.md) for `PackageReference` and version pinning.
