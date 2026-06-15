# State transition table

Namespace: `DesignPatterns.Behavioral`

## Overview

Model finite state graphs as **(current state, trigger) → next state**. Use a manual builder or compile-time `[StateMachine]` / `[Transition]` attributes to avoid hand-written `switch` blocks and catch invalid edges at build time.

This is **not** a full UML state-machine framework (no hierarchical states, history, persistence, or entry/exit action DSL).

## Runtime

- `ITransitionTable<TState, TTrigger>` — `TryTransition`, `GetAllowedTriggers`, `CanTransitionFrom`
- `TransitionTableBuilder<TState, TTrigger>` — `WithInitial`, `Add`, `Build`
- `Transition()` extension — throws `InvalidTransitionException` on invalid edges

`TState` and `TTrigger` must be **enums** (v1).

```csharp
var table = new TransitionTableBuilder<OrderStatus, OrderTrigger>()
    .WithInitial(OrderStatus.Draft)
    .Add(OrderStatus.Draft, OrderTrigger.Submit, OrderStatus.Submitted)
    .Add(OrderStatus.Submitted, OrderTrigger.Pay, OrderStatus.Paid)
    .Build();

table.TryTransition(OrderStatus.Draft, OrderTrigger.Submit, out var next);
```

## Source generator

1. Define separate **state** and **trigger** enums.
2. Declare a **static partial** holder class with `[StateMachine(typeof(TState), typeof(TTrigger), Initial = ...)]`.
3. Add one or more `[Transition(from, trigger, to)]` attributes on the holder.

```csharp
[StateMachine(typeof(OrderStatus), typeof(OrderTrigger), Initial = OrderStatus.Draft)]
[Transition(OrderStatus.Draft, OrderTrigger.Submit, OrderStatus.Submitted)]
[Transition(OrderStatus.Submitted, OrderTrigger.Pay, OrderStatus.Paid)]
public static partial class OrderMachine;

// Generated: OrderStatusTransitionTable.Instance
// Holder:    OrderMachine.TryTransition(...), OrderMachine.InitialState
```

## Diagnostics

DP026–DP031 — duplicate edges, invalid enum members, invalid holder, isolated states. See [Diagnostics](./diagnostics.md#state-transition-table-dp026-dp031).

## Sample

[DesignPatterns.Samples.State](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.State)

Maintainer doc: [docs/StateTransitionTable.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/StateTransitionTable.md) (中文).
