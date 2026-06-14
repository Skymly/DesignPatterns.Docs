# Factory Registry

Namespace: `DesignPatterns.Creational`

## Overview

Map keys to product factories — similar to Strategy but for **creating** instances (`Create()` / `IFactoryRegistry`).

## Runtime

- `IFactoryRegistry<TKey, TProduct>` — extends read-only registry with `Create`
- `FactoryRegistryBuilder<TKey, TProduct>` — fluent manual registration

## Source generator

`[RegisterFactory(typeof(TProduct), "key")]` on factory types; partial static registry holder.

```csharp
[RegisterFactory(typeof(IProduct), "standard")]
public sealed class StandardProductFactory : IProductFactory { ... }
```

## Diagnostics

DP020–DP023, [DP025](./diagnostics.md#registry-key-dp025) (unknown literal keys). See [Registry key conventions](./registry-key-conventions.md).

## Samples

| Sample | Focus |
|--------|-------|
| [Factory](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Factory) | Generated registry |
| [RegisterFactory](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.RegisterFactory) | Manual builder |

Maintainer doc: [docs/FactoryRegistry.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/FactoryRegistry.md) (中文).
