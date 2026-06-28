# State transition table

Namespace: `DesignPatterns.Behavioral`

## Overview

Model finite state graphs as **(current state, trigger) → next state**. Use a manual builder or compile-time `[StateMachine]` / `[Transition]` attributes to avoid hand-written `switch` blocks and catch invalid edges at build time.

This is **not** a full UML state-machine framework (no hierarchical states or history). It does support guard delegates, entry/exit actions, and an instance wrapper with `CurrentState` tracking.

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

DP026–DP031 — duplicate edges, invalid enum members, invalid holder, isolated states. DP032/DP034/DP035 for guard method validation. DP036 for literal edge validation. DP037–DP039 for entry/exit action validation. See [Diagnostics](./diagnostics.md#state-transition-table-dp026-dp031).

## Guard predicates

Guards are optional predicates that determine whether a transition is allowed at runtime. When a guard returns `false`, the transition is treated as if it does not exist.

### Runtime API

```csharp
var table = new TransitionTableBuilder<OrderStatus, OrderTrigger>()
    .WithInitial(OrderStatus.Draft)
    .Add(OrderStatus.Draft, OrderTrigger.Submit, OrderStatus.Submitted,
         guard: (state, trigger) => !string.IsNullOrEmpty(orderId))
    .Build();
```

### Source generator

Use the `Guard` property on `[Transition]` to specify a static method on the holder class:

```csharp
[StateMachine(typeof(OrderStatus), typeof(OrderTrigger), Initial = OrderStatus.Draft)]
[Transition(OrderStatus.Draft, OrderTrigger.Submit, OrderStatus.Submitted, Guard = nameof(CanSubmit))]
public static partial class OrderMachine
{
    public static bool CanSubmit(OrderStatus state, OrderTrigger trigger) => true;
}
```

Guard methods must be `static` with signature `bool Method(TState, TTrigger)`. Diagnostics: DP032, DP034, DP035.

## Entry/exit actions

Entry and exit actions are optional side-effect hooks that execute during async transitions. Actions run only via `TryTransitionAsync` (not the synchronous `TryTransition`).

### Execution order

For `TryTransitionAsync`: guard → OnExit (sync → async) → OnEnter (sync → async) → return result.

### Source generator

Use `OnEnter` and `OnExit` properties on `[Transition]`:

```csharp
[StateMachine(typeof(OrderStatus), typeof(OrderTrigger), Initial = OrderStatus.Draft)]
[Transition(OrderStatus.Draft, OrderTrigger.Submit, OrderStatus.Submitted,
    OnEnter = nameof(OnSubmitted), OnExit = nameof(OnLeaveDraft))]
public static partial class OrderMachine
{
    public static void OnSubmitted(OrderStatus from, OrderStatus to, OrderTrigger trigger) { }
    public static void OnLeaveDraft(OrderStatus from, OrderStatus to, OrderTrigger trigger) { }
}
```

Action methods must be `static` with signature `void Method(TState from, TState to, TTrigger trigger)` (sync) or `ValueTask Method(TState from, TState to, TTrigger trigger, CancellationToken)` (async). Diagnostics: DP037, DP038, DP039.

## IStateMachine instance wrapper

`IStateMachine<TState, TTrigger>` is a stateful wrapper around a transition table that automatically tracks `CurrentState` and updates it after each successful transition.

```csharp
var machine = new StateMachine<OrderStatus, OrderTrigger>(table);
// machine.CurrentState == table.InitialState

if (machine.TryTransition(OrderTrigger.Submit, out var next))
{
    // machine.CurrentState == OrderStatus.Submitted
}
```

> **Thread safety**: `StateMachine<TState,TTrigger>` is not thread-safe. Synchronize externally or use a separate instance per thread for multi-threaded scenarios.

## TransitionTrace

`TryTransitionTracedAsync` returns a `TransitionTrace<TState>` that provides detailed execution progress when entry/exit actions are involved. Unlike `TryTransitionAsync`, action exceptions are caught and recorded in the trace instead of propagating.

```csharp
var trace = await table.TryTransitionTracedAsync(current, trigger, cancellationToken);

if (!trace.Succeeded && trace.Exception is not null)
{
    if (trace.OnExitCompleted && !trace.OnEnterCompleted)
    {
        // OnExit ran, OnEnter failed — compensate
    }
}
```

The trace includes: `Succeeded`, `NextState`, `OnExitCompleted`, `OnEnterCompleted`, `Exception`.

## DI integration

### Generated `RegisterDi` method

When your project references `DesignPatterns.Extensions.DependencyInjection`, the source generator emits a `RegisterDi` method on the generated state machine class:

```csharp
OrderStatusStateMachine.RegisterDi(services);
```

This registers both the transition table (`ITransitionTable<TState,TTrigger>`) and the state machine wrapper (`IStateMachine<TState,TTrigger>`).

### Manual registration extensions

```csharp
services.AddTransitionTable(OrderStatusTransitionTable.Instance);
services.AddStateMachine<OrderStatus, OrderTrigger>();
```

`AddTransitionTable` uses `TryAdd` semantics. Use `ServiceLifetime.Transient` for `AddStateMachine` when each consumer needs its own state tracking.

## Sample

[DesignPatterns.Samples.State](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.State)

Maintainer doc: [docs/StateTransitionTable.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/StateTransitionTable.md) (中文).
