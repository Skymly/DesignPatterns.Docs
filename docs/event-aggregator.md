# Event Aggregator

Namespace: `DesignPatterns.Behavioral`

## Overview

In-process pub/sub decoupling publishers from subscribers. No source generator — pure runtime API.

## Runtime

- `IEventAggregator` — `Publish`, `Subscribe`, `Unsubscribe`
- `IEventHandler<TEvent>` — typed handler
- Default implementation: thread-safe in-memory aggregator

```csharp
var aggregator = new EventAggregator();
aggregator.Subscribe<OrderPlaced>(new EmailHandler());
aggregator.Publish(new OrderPlaced(orderId, total));
```

## Sample

[DesignPatterns.Samples.EventAggregator](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.EventAggregator)

Maintainer doc: [docs/EventAggregator.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/EventAggregator.md) (中文).
