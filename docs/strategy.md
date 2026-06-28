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

DP003–DP007 — duplicate keys, contract mismatch, unregistered types (DP006 + CodeFix), missing ctor. [DP025](./diagnostics.md#registry-key-dp025) for unknown literal keys at lookup sites. DP047–DP049 for guard method validation. See [Registry key conventions](./registry-key-conventions.md).

## Guard predicates

Conditionally enable or disable strategies at resolution time using guard predicates.

### Runtime API

`TryGetWithGuard` evaluates a guard predicate when resolving a strategy. When the guard returns `false`, the strategy is treated as unregistered:

```csharp
var builder = new StrategyRegistryBuilder<string, IPaymentStrategy>()
    .Register("alipay", new AlipayPayment(), guard: key => IsPaymentEnabled("alipay"));
var registry = builder.Build();

if (registry.TryGetWithGuard("alipay", out var strategy))
{
    await strategy.ProcessAsync(payment);
}
```

**Design constraint**: Guard signatures are `Func<TKey, bool>` (key only), not `Func<TInput, bool>`. The registry layer does not know `TInput` (strategies are not required to implement `IStrategy<TInput, TOutput>`), so input-based dynamic routing is business logic outside this library's scope.

### Source generator

Use the `Guard` property on `[RegisterStrategy]` to reference a static guard method:

```csharp
[RegisterStrategy<IPaymentStrategy>("alipay", Guard = nameof(IsEnabled))]
public sealed class AlipayPayment : IPaymentStrategy
{
    private static bool IsEnabled(string key) => IsPaymentEnabled(key);
}
```

The generator validates the guard method signature (DP047–DP049).

## Execution tracing

Trace strategy execution outcomes for debugging, logging, or metrics without changing your strategy implementations.

`ExecuteTracedAsync` extension methods return a `StrategyExecutionTrace<TOutput>` containing:

- `Key` — The strategy key requested
- `Status` — Execution outcome (see below)
- `Output` — Strategy output when successful
- `Exception` — Exception when failed
- `ElapsedMilliseconds` — Resolution and execution time

```csharp
var trace = await registry.ExecuteTracedAsync("double", 5);
```

### Status values

| `StrategyExecutionStepStatus` | Meaning |
|------------------------------|---------|
| **Executed** | Strategy resolved and executed successfully |
| **KeyNotFound** | Strategy key not found in registry |
| **GuardRejected** | Strategy found but guard predicate returned `false` |
| **Failed** | Strategy resolved but threw an exception during execution |

### Observers

Implement `IStrategyExecutionObserver<TInput, TOutput>` to receive callbacks for side-effects like logging or metrics:

```csharp
public sealed class LoggingObserver<TInput, TOutput> : IStrategyExecutionObserver<TInput, TOutput>
{
    public void OnExecutionCompleted(string key, TInput input, TOutput output, long elapsedMs)
        => Console.WriteLine($"Strategy {key} succeeded in {elapsedMs}ms");

    public void OnExecutionFailed(string key, TInput input, StrategyExecutionTrace<TOutput> trace)
        => Console.WriteLine($"Strategy {key} failed: {trace.Exception?.Message}");
}

var trace = await registry.ExecuteTracedAsync("double", 5, new LoggingObserver<int, int>());
```

## Sample

[DesignPatterns.Samples.Strategy](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Strategy) — sync payment strategies plus async `IRefundProcessor` with `ExecuteAsync` (`RefundProcessors.cs`).

## DI

See [Dependency Injection](./dependency-injection.md) for `RegisterDi`.

Maintainer doc: [docs/Strategy.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Strategy.md) (中文).
