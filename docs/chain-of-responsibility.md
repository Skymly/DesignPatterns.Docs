# Chain of Responsibility

Namespace: `DesignPatterns.Behavioral`

## Overview

Ordered handlers process a shared context. Each handler can short-circuit or pass to the next.

## Runtime

- `IHandler<TContext>` — `Handle(TContext context, HandlerDelegate<TContext> next)`
- `HandlerPipeline<TContext>` — runs ordered handlers

## Source generator

Mark handlers with `[HandlerOrder(n)]` on a shared contract. Generator emits `{Context}HandlerPipeline` wiring handlers by order.

```csharp
[HandlerOrder(0)]
public sealed class LoggingHandler : IRequestHandler { ... }

[HandlerOrder(1)]
public sealed class AuthorizationHandler : IRequestHandler { ... }
```

## Diagnostics

DP005, DP008–DP009, DP024.

## Sample

[DesignPatterns.Samples.Chain](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Chain)

Maintainer doc: [docs/ChainOfResponsibility.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/ChainOfResponsibility.md) (中文).
