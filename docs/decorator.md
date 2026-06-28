# Decorator

Namespace: `DesignPatterns.Structural`

## Overview

Stack cross-cutting behaviors around a core service without subclass explosion.

## Runtime

- `IDecorator<T>` — decorator contract
- `IAsyncDecorator<T>` — async decorator contract (`DecorateAsync` with `CancellationToken`)
- `DecoratorStackBuilder<T>` — ordered composition; optional `Add(..., Func<bool>)` skips a decorator when the predicate is false at **build** time

### Conditional registration

```csharp
var enableMetrics = configuration.GetValue<bool>("Metrics:Enabled");

var service = new DecoratorStackBuilder<IPaymentService>()
    .Add<LoggingPaymentDecorator>()
    .Add<MetricsPaymentDecorator>(() => enableMetrics)
    .Build(new PaymentService());
```

Generated `{Contract}DecoratorStack.Build(core)` always includes every `[Decorator]` type; use the manual builder for runtime switches.

## Source generator

Mark each decorator with `[Decorator<TContract>(order)]` (or non-generic on netstandard2.0). The generator emits:

- `{Contract}DecoratorStack.Build(core)` — ordered stack
- `{Contract}DecoratorOrder` — `public const int` fields named after each decorator type

```csharp
[Decorator<IPaymentService>(10)]
public sealed class LoggingPaymentDecorator : IPaymentService, IDecorator<IPaymentService> { ... }

// Elsewhere (after generation):
Console.WriteLine(PaymentServiceDecoratorOrder.LoggingPaymentDecorator);
```

Lower order wraps closer to the core; outer decorators run first on the way in. Duplicate orders are reported as **DP016**.

## Diagnostics

DP016–DP019. DP042 for async signature validation. DP043 for DI resolvability.

## DI integration

When the `DesignPatterns.Extensions.DependencyInjection` package is referenced, the source generator emits a `RegisterDi(IServiceCollection, ServiceLifetime)` method for each service contract. This registers all decorators with the DI container and enables `Build(IServiceProvider, core)` to resolve decorators from the container.

```csharp
PaymentServiceDecoratorStack.RegisterDi(services);

var provider = services.BuildServiceProvider();
var core = new PaymentService();
var service = PaymentServiceDecoratorStack.Build(provider, core);
```

Decorators must be registered in the container before calling `Build(IServiceProvider, core)`. The core service itself is not registered automatically — you provide it explicitly to `Build`.

## Async variant

For asynchronous decoration scenarios, implement `IAsyncDecorator<T>` instead of `IDecorator<T>`. The async decorator uses `DecorateAsync` instead of `Decorate`:

```csharp
public interface IAsyncDecorator<TService>
{
    ValueTask<TService> DecorateAsync(TService inner, CancellationToken cancellationToken = default);
}

[Decorator<IPaymentService>(10)]
public sealed class AsyncCachingPaymentDecorator : IPaymentService, IAsyncDecorator<IPaymentService>
{
    public async ValueTask<IPaymentService> DecorateAsync(IPaymentService inner, CancellationToken ct = default)
    {
        await InitializeCacheAsync(ct);
        return this;
    }
}
```

The source generator validates async decorator signatures (DP042–DP043). Use `IAsyncDecorator<T>` when decorator initialization requires async work (loading configuration, warming caches, establishing connections). For simple synchronous wrapping, `IDecorator<T>` is sufficient.

## Sample

[DesignPatterns.Samples.Decorator](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Decorator) — generated stack + order constants, conditional `Add`, and core comparison.

Maintainer doc: [docs/Decorator.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Decorator.md) (中文).
