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
| `HandlerPipelineStepStatus` | `Completed` / `ShortCircuited` / `NotReached` / `Skipped` / `Failed` |

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
| **Skipped** | Handler guard returned `false` — handler not invoked, pipeline continues |
| **Failed** | Handler (or its guard) threw an exception — captured in trace, then re-thrown |

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

DP005, DP008–DP009, DP024 (Info + CodeFix for missing `[HandlerOrder]`). DP050–DP052 for guard method validation.

## Guard predicates

Conditionally skip handlers at runtime using guard predicates. When a guard returns `false`, the handler is skipped and the pipeline continues to the next handler.

### Source generator

Use the `Guard` property on `[HandlerOrder]` to reference a static guard method:

```csharp
[HandlerOrder<RequestContext>(1, Guard = nameof(CanHandle))]
public sealed class AuthorizationHandler : IHandler<RequestContext>
{
    private static bool CanHandle(RequestContext ctx) => ctx.IsAuthenticated;
}
```

The generator validates the guard method signature (DP050–DP052).

### Traced invocation

When using `InvokeTracedAsync`, skipped handlers appear with status `Skipped`:

```csharp
var trace = await pipeline.InvokeTracedAsync(context, cancellationToken);

foreach (var step in trace.Steps)
{
    Console.WriteLine($"{step.Index}: {step.Name} → {step.Status}");
}
```

## Exception observability

Capture handler exceptions in traces and receive notifications for logging or metrics without changing handler implementations.

### Trace fields

`HandlerPipelineTrace` provides:

- `FailedHandlerIndex` — Zero-based index of the failing handler, or `-1` when no handler failed
- `Exception` — The exception thrown by the failing handler, or `null` when no handler failed

```csharp
var trace = await pipeline.InvokeTracedAsync(context, cancellationToken);

if (trace.FailedHandlerIndex >= 0)
{
    Console.WriteLine($"Handler {trace.FailedHandlerIndex} failed: {trace.Exception?.Message}");
}
```

### Observers

Implement `IHandlerExceptionObserver<TContext>` to receive callbacks when handlers throw:

```csharp
public sealed class LoggingExceptionObserver<TContext> : IHandlerExceptionObserver<TContext>
{
    public void OnHandlerException(TContext context, int handlerIndex, string handlerName, Exception exception)
        => Console.WriteLine($"Handler {handlerName} (index {handlerIndex}) failed: {exception.Message}");
}

var trace = await pipeline.InvokeTracedAsync(context, new LoggingExceptionObserver<RequestContext>(), cancellationToken);
```

Pass the observer to `InvokeTracedAsync` as the second parameter. The observer is notified before the exception is re-thrown.

## Sample

[DesignPatterns.Samples.Chain](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Chain)

Maintainer doc: [docs/ChainOfResponsibility.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/ChainOfResponsibility.md) (中文).
