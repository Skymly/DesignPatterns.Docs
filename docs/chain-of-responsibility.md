# Chain of Responsibility

Namespace: `DesignPatterns.Behavioral`

## Overview

Ordered handlers process a shared context. Each handler can short-circuit (skip calling `next`) or continue the pipeline. Async-first: `ValueTask` + `CancellationToken`.

## Runtime

| Type | Role |
|------|------|
| `IHandler<TContext>` | `InvokeAsync(context, next, cancellationToken)` |
| `HandlerPipelineBuilder<TContext>` | `Use(handler)` / `Use(delegate)`, then `Build()` |
| `HandlerPipeline<TContext>` | Immutable pipeline — `InvokeAsync`, `InvokeTracedAsync` |
| `HandlerPipelineTrace` | Per-invocation step list |
| `HandlerPipelineStep` | Index, handler display name, `HandlerPipelineStepStatus` |
| `HandlerPipelineStepStatus` | `Completed` / `ShortCircuited` / `NotReached` |

```csharp
var pipeline = new HandlerPipelineBuilder<RequestContext>()
    .Use(new LoggingHandler())
    .Use(new AuthorizationHandler())
    .Use(new ResourceHandler())
    .Build();

await pipeline.InvokeAsync(context, cancellationToken);
```

### Short-circuit

- Calls `await next(context, ct)` → later handlers run.
- Does **not** call `next` → remaining handlers are skipped.

### Traced invocation (`InvokeTracedAsync`)

Use when debugging auth blocks or early exits without adding a full middleware framework:

```csharp
var trace = await pipeline.InvokeTracedAsync(context, cancellationToken);

foreach (var step in trace.Steps)
{
    Console.WriteLine($"{step.Index}: {step.Name} → {step.Status}");
}
```

| Status | Meaning |
|--------|---------|
| **Completed** | Handler ran and called `next` |
| **ShortCircuited** | Handler ran but did **not** call `next` |
| **NotReached** | Handler never ran (an earlier handler short-circuited) |

`InvokeTracedAsync` does not change execution order or short-circuit rules — it only returns a trace. Delegate handlers appear as `"<delegate>"`.

## Source generator

Mark handlers with `[HandlerOrder(n, typeof(TContext))]` on a shared contract. The generator emits `{Context}HandlerPipeline` wiring handlers by order.

```csharp
[HandlerOrder(0, typeof(IRequestContext))]
public sealed class LoggingHandler : IRequestHandler { ... }

[HandlerOrder(1, typeof(IRequestContext))]
public sealed class AuthorizationHandler : IRequestHandler { ... }
```

## Diagnostics

DP005, DP008–DP009, DP024 (Info + CodeFix for missing `[HandlerOrder]`).

## Sample

[DesignPatterns.Samples.Chain](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Chain)

Maintainer doc: [docs/ChainOfResponsibility.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/ChainOfResponsibility.md) (中文).
