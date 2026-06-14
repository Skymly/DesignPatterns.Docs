# Strategy

Namespace: `DesignPatterns.Behavioral`

## Overview

Register algorithm implementations by key at compile time. Avoid large `switch` blocks while keeping selection logic in your application code.

## Runtime

- `IStrategyRegistry<TKey, TStrategy>` — `Get` / `TryGet`
- `StrategyRegistryBuilder<TKey, TStrategy>` — manual registration

## Source generator

1. Declare a **partial** static registry holder.
2. Mark each implementation with `[RegisterStrategy(typeof(TContract), "key")]`.
3. Generator emits `{Name}Keys`, `Instance` (eager registry), and optional `RegisterDi`.

```csharp
[RegisterStrategy(typeof(IPaymentStrategy), "alipay")]
public sealed class AlipayPayment : IPaymentStrategy { ... }

public static partial class PaymentStrategyRegistry { }
```

Optional marker interfaces: `IStrategy<TIn, TOut>`, `IAsyncStrategy<TIn, TOut>` — not required by the generator.

## Async resolution

`IAsyncStrategy` contracts use the same Keys / Registry / `RegisterDi` pipeline. `StrategyRegistryExtensions` adds `ExecuteAsync` and `TryExecuteAsync`:

```csharp
public interface ITextProcessor : IAsyncStrategy<string, int> { }

// Registry value is IAsyncStrategy<TIn, TOut>
await registry.ExecuteAsync(key, input);

// Derived contract (specify TContract, TOutput, TInput)
await registry.ExecuteAsync<ITextProcessor, int, string>(TextProcessorKeys.Length, "hello");

// Equivalent
await registry.Get(TextProcessorKeys.Length).ExecuteAsync("hello");
```

## Diagnostics

DP003–DP007 — duplicate keys, contract mismatch, unregistered types (DP006 + CodeFix), missing ctor. [DP025](./diagnostics.md#registry-key-dp025) for unknown literal keys at lookup sites. See [Registry key conventions](./registry-key-conventions.md).

## Sample

[DesignPatterns.Samples.Strategy](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Strategy)

## DI

See [Dependency Injection](./dependency-injection.md) for `RegisterDi`.

Maintainer doc: [docs/Strategy.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Strategy.md) (中文).
