# State 转换表

命名空间：`DesignPatterns.Behavioral`

## 概览

用 **(当前状态, 触发器) → 下一状态** 描述有限状态图。可用手动 Builder，或用编译期 `[StateMachine]` / `[Transition]` 减少手写 `switch` 并在构建期发现非法边。

**不是**完整 UML 状态机框架（无层次状态、历史、持久化或 entry/exit 动作 DSL）。

## 运行时

- `ITransitionTable<TState, TTrigger>` — `TryTransition`、`GetAllowedTriggers`、`CanTransitionFrom`
- `TransitionTableBuilder<TState, TTrigger>` — `WithInitial`、`Add`、`Build`
- `Transition()` 扩展 — 非法边时抛 `InvalidTransitionException`

v1 要求 `TState`、`TTrigger` 均为 **enum**。

```csharp
var table = new TransitionTableBuilder<OrderStatus, OrderTrigger>()
    .WithInitial(OrderStatus.Draft)
    .Add(OrderStatus.Draft, OrderTrigger.Submit, OrderStatus.Submitted)
    .Add(OrderStatus.Submitted, OrderTrigger.Pay, OrderStatus.Paid)
    .Build();

table.TryTransition(OrderStatus.Draft, OrderTrigger.Submit, out var next);
```

## 源生成器

1. 分别定义 **state enum** 与 **trigger enum**。
2. 声明带 `[StateMachine(typeof(TState), typeof(TTrigger), Initial = ...)]` 的 **static partial** holder。
3. 在 holder 上标注一条或多条 `[Transition(from, trigger, to)]`。

```csharp
[StateMachine(typeof(OrderStatus), typeof(OrderTrigger), Initial = OrderStatus.Draft)]
[Transition(OrderStatus.Draft, OrderTrigger.Submit, OrderStatus.Submitted)]
[Transition(OrderStatus.Submitted, OrderTrigger.Pay, OrderStatus.Paid)]
public static partial class OrderMachine;

// 生成：OrderStatusTransitionTable.Instance
// holder：OrderMachine.TryTransition(...)、OrderMachine.InitialState
```

## 诊断

DP026–DP031 — 重复边、非法 enum 成员、非法 holder、孤立态等。见 [诊断](./diagnostics.md#state-转换表-dp026-dp031)。

## 示例

[DesignPatterns.Samples.State](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.State)

维护者文档：[docs/StateTransitionTable.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/StateTransitionTable.md)

英文完整版：[State transition table](../state-transition-table.md)
