# Decorator

Namespace: `DesignPatterns.Structural`

## Overview

Stack cross-cutting behaviors around a core service without subclass explosion.

## Runtime

- `IDecorator<T>` — decorator contract
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

DP016–DP019.

## Sample

[DesignPatterns.Samples.Decorator](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Decorator) — generated stack + order constants, conditional `Add`, and core comparison.

Maintainer doc: [docs/Decorator.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Decorator.md) (中文).
