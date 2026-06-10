# Samples

Runnable console applications:

**[github.com/Skymly/DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples)**

## Run (local sibling, default)

Requires .NET 8 and a sibling `DesignPatterns` clone (`UseLocalDesignPatterns=true` by default).

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

CI checks out both repositories so the sibling path `../DesignPatterns` resolves.

## Projects

| Sample | Demonstrates |
|--------|--------------|
| **DesignPatterns.Samples.Strategy** | `[RegisterStrategy]` → Keys + static `Instance` |
| **DesignPatterns.Samples.Chain** | `[HandlerOrder]` → handler pipeline |
| **DesignPatterns.Samples.Composite** | `[CompositePart]` → `BuildForest()` / `TraverseForest` (+ manual builder) |
| **DesignPatterns.Samples.Factory** | `[RegisterFactory]` generated registry |
| **DesignPatterns.Samples.RegisterFactory** | Manual `FactoryRegistryBuilder` |
| **DesignPatterns.Samples.Decorator** | `[Decorator]` decorator stack |
| **DesignPatterns.Samples.EventAggregator** | `IEventAggregator` pub/sub |
| **DesignPatterns.Samples.GenerateSingleton** | `[GenerateSingleton]` |
| **DesignPatterns.Samples.DependencyInjection** | `RegisterDi` for Strategy / Factory / Handler |

In-repo copies also exist under `DesignPatterns/samples/` for the main repository CI.

## Future NuGet consumption

When `DesignPatterns` is published, set `-p:UseLocalDesignPatterns=false` in the samples repo.
