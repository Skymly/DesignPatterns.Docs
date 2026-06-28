# Factory Registry

Namespace: `DesignPatterns.Creational`

## Overview

Map keys to product factories — similar to Strategy but for **creating** instances (`Create()` / `IFactoryRegistry`).

## Runtime

- `IFactoryRegistry<TKey, TProduct>` — extends read-only registry with `Create`
- `IAsyncFactoryRegistry<TKey, TProduct>` — async variant with `CreateAsync`
- `IPooledFactoryRegistry<TKey, TProduct>` — pooled variant with `RentAsync` / `Return` (backed by `ArrayPool<T>`)
- `FactoryRegistryBuilder<TKey, TProduct>` — fluent manual registration
- `AsyncFactoryRegistryBuilder<TKey, TProduct>` — fluent manual async/pooled registration

## Source generator

`[RegisterFactory(typeof(TProduct), "key")]` on factory types; partial static registry holder. Optional `IsAsync = true` for async factories and `PoolSize = N` for pooled factories.

```csharp
[RegisterFactory(typeof(IProduct), "standard")]
public sealed class StandardProductFactory : IProductFactory { ... }

[RegisterFactory(typeof(IProduct), "premium", IsAsync = true)]
public sealed class PremiumProductFactory : IAsyncFactory<IProduct> { ... }

[RegisterFactory(typeof(IProduct), "buffer", PoolSize = 16)]
public sealed class BufferProductFactory : IAsyncFactory<IProduct> { ... }
```

When `IsAsync = true` or the factory implements `IAsyncFactory<TProduct>`, the generator emits an `IAsyncFactoryRegistry` in addition to the sync registry. When `PoolSize > 0`, the generator emits an `IPooledFactoryRegistry`.

## Async factory registry

For asynchronous product creation, use `IAsyncFactoryRegistry<TKey, TProduct>`:

```csharp
var registry = new AsyncFactoryRegistryBuilder<string, IProduct>()
    .Register("premium", ct => CreatePremiumAsync(ct))
    .Build();

var product = await registry.CreateAsync("premium");
```

## Pooled factory registry

For reusable product instances with per-key object pooling, use `IPooledFactoryRegistry<TKey, TProduct>`:

```csharp
var registry = new AsyncFactoryRegistryBuilder<string, IProduct>()
    .Register("buffer", () => new BufferProduct())
    .WithPooling(poolSize: 16)
    .Build();

var buffer = await registry.RentAsync("buffer");
// ... use buffer
registry.Return("buffer", buffer);
```

If a product implements `IResettable`, `Reset()` is called before returning it to the pool.

## Diagnostics

DP020–DP023, [DP025](./diagnostics.md#registry-key-dp025) (unknown literal keys). DP053–DP055 for async signature and pool size validation. See [Registry key conventions](./registry-key-conventions.md).

## Samples

| Sample | Focus |
|--------|-------|
| [Factory](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Factory) | Generated registry |
| [RegisterFactory](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.RegisterFactory) | Manual builder |

Maintainer doc: [docs/FactoryRegistry.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/FactoryRegistry.md) (中文).
