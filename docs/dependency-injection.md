# Dependency Injection

Package: **`DesignPatterns.Extensions.DependencyInjection`**

## Overview

Optional Microsoft.Extensions.DependencyInjection integration. Does not replace container lifetime rules — it registers generated registries and resolves implementations from `IServiceProvider`.

## Manual registration

Extension methods such as:

- `AddStrategyRegistry<TKey, TStrategy>(...)`
- `AddFactoryRegistry<TKey, TProduct>(...)`
- `AddHandlerPipeline<TContext>(...)`

## Generated `RegisterDi`

When the DI package (or its MSBuild targets) is referenced, Strategy / Factory / Handler generators can emit:

```csharp
PaymentStrategyRegistry.RegisterDi(services);
```

Handlers and strategies resolve from DI; registries register as singletons by default (see sample for transient factory behavior).

## Project setup

Reference `DesignPatterns.Extensions.DependencyInjection` and import its targets (see package / sibling project `build/DesignPatterns.Extensions.DependencyInjection.targets`).

Set `DesignPatternsSampleKind=DependencyInjection` in sample projects for the shared MSBuild imports in DesignPatterns.Samples.

## Sample

[DesignPatterns.Samples.DependencyInjection](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.DependencyInjection)

## Note on meta package

The core **`DesignPatterns`** NuGet meta package does **not** include the DI extension; reference it separately when needed.
