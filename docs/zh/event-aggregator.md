# Event Aggregator

命名空间：`DesignPatterns.Behavioral`

## 概述

进程内发布/订阅，解耦发布者与订阅者。纯运行时 API，无源生成器。

## 运行时

- `IEventAggregator` — `Publish`、`Subscribe`、`Unsubscribe`
- `IEventHandler<TEvent>` — 类型化处理器

```csharp
var aggregator = new EventAggregator();
aggregator.Subscribe<OrderPlaced>(new EmailHandler());
aggregator.Publish(new OrderPlaced(orderId, total));
```

## 示例

[DesignPatterns.Samples.EventAggregator](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.EventAggregator)

维护者文档：[docs/EventAggregator.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/EventAggregator.md)
