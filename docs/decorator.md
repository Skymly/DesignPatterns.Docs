# Decorator

Namespace: `DesignPatterns.Structural`

## Overview

Stack cross-cutting behaviors around a core service without subclass explosion.

## Runtime

- `IDecorator<T>` — decorator contract
- `DecoratorStackBuilder<T>` — ordered composition

## Source generator

`[Decorator(typeof(TContract), order)]` on decorator types. Generator emits `{Contract}DecoratorStack.Build(...)`.

```csharp
[Decorator(typeof(IPaymentService), order: 0)]
public sealed class LoggingPaymentDecorator : IDecorator<IPaymentService> { ... }
```

Lower order wraps closer to the core; outer decorators run first on the way in.

## Diagnostics

DP016–DP019.

## Sample

[DesignPatterns.Samples.Decorator](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Decorator)

Maintainer doc: [docs/Decorator.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Decorator.md) (中文).
