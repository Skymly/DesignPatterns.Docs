# Event Aggregator

Namespace: `DesignPatterns.Behavioral`

## Overview

In-process pub/sub decoupling publishers from subscribers. Supports a source generator for auto-subscription, configurable error handling, and publish tracing.

## Runtime

- `IEventAggregator` — `PublishAsync`, `Subscribe`, `Unsubscribe`
- `IEventHandler<TEvent>` — typed handler
- `EventPublishErrorHandling` — `StopOnError` / `ContinueOnError` / `AggregateErrors`
- Default implementation: thread-safe in-memory aggregator

```csharp
var aggregator = new EventAggregator();
aggregator.Subscribe<OrderPlaced>(new EmailHandler());
await aggregator.PublishAsync(new OrderPlaced(orderId, total));
```

## Source generator

Mark event handlers with `[RegisterEventHandler<TEvent>]` (generic on .NET 7+, non-generic on netstandard2.0). The generator groups handlers by event type and emits a `{Event}EventHandlerRegistry` static class with subscription helpers.

```csharp
public record OrderPlacedEvent(string OrderId, decimal Total);

[RegisterEventHandler<OrderPlacedEvent>]
public sealed class EmailNotificationHandler : IEventHandler<OrderPlacedEvent>
{
    public ValueTask HandleAsync(OrderPlacedEvent evt, CancellationToken ct = default)
    {
        Console.WriteLine($"Email sent for order {evt.OrderId}");
        return default;
    }
}

var aggregator = new EventAggregator();
OrderPlacedEventHandlerRegistry.SubscribeAll(aggregator);
await aggregator.PublishAsync(new OrderPlacedEvent("ORD-001", 99.99m));
```

The generated registry provides:

- `SubscribeAll(IEventAggregator)` — instantiates handlers with public parameterless constructors and subscribes them
- `RegisterDi(IServiceCollection, ServiceLifetime)` — registers handlers in the DI container (when `DesignPatterns.EnableDiIntegration=true`)
- `SubscribeAll(IEventAggregator, IServiceProvider)` — resolves handlers from DI and subscribes them

### Diagnostics

| ID | Severity | When |
|----|----------|------|
| **DP044** | Info | Type implements `IEventHandler<T>` but is not marked with `[RegisterEventHandler]` |
| **DP045** | Error | Duplicate `[RegisterEventHandler]` on the same handler for the same event type |
| **DP046** | Error | Type marked with `[RegisterEventHandler<T>]` but does not implement `IEventHandler<T>` |

## Error isolation

By default, if one handler throws an exception during `PublishAsync`, the exception propagates immediately and subsequent handlers are not called. To isolate handler failures, configure `EventPublishErrorHandling`:

```csharp
var aggregator = new EventAggregator(errorHandling: EventPublishErrorHandling.ContinueOnError);
```

Available modes:

| Mode | Behavior |
|------|----------|
| `StopOnError` (default) | First exception propagates immediately; remaining handlers skipped |
| `ContinueOnError` | All handlers execute; exceptions captured and available in the trace |
| `AggregateErrors` | All handlers execute; exceptions aggregated into `AggregateException` |

## Publish tracing

To observe publication behavior and capture per-handler outcomes, use `PublishTracedAsync`:

```csharp
var trace = await aggregator.PublishTracedAsync(new OrderPlacedEvent("ORD-001", 99.99m));

foreach (var step in trace.Steps)
{
    Console.WriteLine($"{step.Index}: {step.HandlerName} → {step.Status}");
}
```

`EventPublicationTrace` provides:

- `Steps` — list of `EventPublicationStep` (Index, HandlerName, Status, Exception?)
- `FailedCount` — number of handlers that threw exceptions

### Observers

Implement `IEventPublicationObserver<TEvent>` to receive callbacks for side-effects like logging or metrics:

```csharp
public class PublicationLogger : IEventPublicationObserver<OrderPlacedEvent>
{
    public void OnPublicationCompleted(OrderPlacedEvent evt, EventPublicationTrace trace)
        => Console.WriteLine($"Event {typeof(OrderPlacedEvent).Name}: {trace.HandlerCount} handlers, {trace.FailedCount} failed");
}
```

## Sample

[DesignPatterns.Samples.EventAggregator](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.EventAggregator)

Maintainer doc: [docs/EventAggregator.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/EventAggregator.md) (中文).
