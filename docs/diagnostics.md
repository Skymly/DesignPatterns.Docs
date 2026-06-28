# Diagnostics

Compiler diagnostics emitted by DesignPatterns source generators and analyzers. IDs are defined in `DesignPatterns.Diagnostics.DiagnosticIds`.

Help links in the IDE point to this page (`#dp###` anchors).

## Singleton (DP001–DP002)

| ID | Severity | When |
|----|----------|------|
| **DP001** | Error | `[GenerateSingleton]` target is not `partial` |
| **DP002** | Error | Invalid singleton target (must be sealed class with parameterless ctor) |

## Strategy (DP003–DP007)

| ID | Severity | When |
|----|----------|------|
| **DP003** | Error | Duplicate strategy key |
| **DP004** | Error | Implementation does not match strategy contract |
| **DP005** | — | *(reserved / handler overlap — see DP005 under Chain)* |
| **DP006** | Info | Implementation type not registered with `[RegisterStrategy]` |
| **DP007** | Error | Strategy implementation missing parameterless constructor |

## Chain of Responsibility (DP005, DP008–DP009, DP024)

| ID | Severity | When |
|----|----------|------|
| **DP005** | Error | Duplicate `[HandlerOrder]` value |
| **DP008** | Error | Handler does not implement the pipeline contract |
| **DP009** | Error | Handler missing parameterless constructor |
| **DP024** | Info | Handler type not registered with `[HandlerOrder]` |

## Composite (DP010–DP015)

| ID | Severity | When |
|----|----------|------|
| **DP010** | Error | Duplicate composite part key |
| **DP011** | Error | Unknown parent key |
| **DP012** | Error | Cycle in composite tree |
| **DP013** | Error | Part does not match node contract |
| **DP014** | Error | Part missing parameterless constructor |
| **DP015** | Error | Registry holder missing `[CompositeBuildable]` |

## Decorator (DP016–DP019)

| ID | Severity | When |
|----|----------|------|
| **DP016** | Error | Duplicate decorator order |
| **DP017** | Error | Decorator does not match contract |
| **DP018** | Error | Type does not implement `IDecorator<T>` |
| **DP019** | Error | Decorator missing parameterless constructor |

## Factory Registry (DP020–DP023)

| ID | Severity | When |
|----|----------|------|
| **DP020** | Error | Duplicate factory key |
| **DP021** | Error | Factory does not match product contract |
| **DP022** | Error | Factory missing parameterless constructor |
| **DP023** | Info | Product type not registered with `[RegisterFactory]` |

## Registry key (DP025) {#registry-key-dp025}

| ID | Severity | When |
|----|----------|------|
| **DP025** | Info | String literal key passed to a generated **Strategy** or **Factory** registry lookup is not among registered keys |

**Where it applies:** `Get` / `TryGet` / `Create` / `TryCreate` on `IStrategyRegistry<,>` / `IFactoryRegistry<,>` when the key argument is a string literal (not a `{Contract}Keys` constant).

**Message:** includes the contract type and the list of registered keys.

**Fix:** prefer `{Contract}Keys.*` constants. The **CorrectRegistryKey** CodeFix suggests the closest registered key when the typo is near a known key.

See also [Registry key conventions](./registry-key-conventions.md).

## Plugin assemblies (DP033) {#dp033}

| ID | Severity | When |
|----|----------|------|
| **DP033** | Error | The same **strategy key** for the same contract is registered in **more than one referenced provider assembly** |

**Where it applies:** host (or any) compilations that reference multiple plugin provider assemblies contributing `[RegisterStrategy]` / `[RegisterStrategy<TContract>]` for the same contract with an identical key string.

**Message:** includes the key, contract type, and conflicting assembly names.

**Fix:** use distinct keys per provider assembly, or reference only one provider per contract dimension. Duplicate keys within a **single** assembly remain **DP003** (generator).

See [Plugin assemblies sample](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.PluginAssemblies) and the main repo [PluginAssemblies.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/PluginAssemblies.md).

## State transition table (DP026–DP031) {#state-transition-table-dp026-dp031}

| ID | Severity | When |
|----|----------|------|
| **DP026** | Error | Duplicate `(from state, trigger)` edge |
| **DP027** | Error | `[Transition]` state value is not a declared enum member |
| **DP028** | Error | `[Transition]` trigger value is not a declared enum member |
| **DP029** | Error | `[StateMachine]` `Initial` is not a declared state enum member |
| **DP030** | Error | Holder class is not `static partial` |
| **DP031** | Info | State enum member never appears as a `[Transition]` source (terminal/reserved hint) |

See [State transition table](./state-transition-table.md).

## State guard (DP032, DP034–DP035) {#dp032}

| ID | Severity | When |
|----|----------|------|
| **DP032** | Error | `[Transition(Guard = nameof(Method))]` guard method not found on holder class |
| **DP034** | Error | Guard method is not `static` (defensive — C# compiler rejects instance methods on static classes first) |
| **DP035** | Error | Guard method has wrong signature (must be `static bool Method(TState, TTrigger)`) |

## State literal edge (DP036) {#dp036}

| ID | Severity | When |
|----|----------|------|
| **DP036** | Info | `TryTransition` called with literal `(state, trigger)` arguments that do not match any declared `[Transition]` edge |

## State entry/exit actions (DP037–DP039) {#dp037}

| ID | Severity | When |
|----|----------|------|
| **DP037** | Error | `[Transition(OnEnter/OnExit = nameof(Method))]` action method not found on holder class |
| **DP038** | Error | Action method is not `static` (unreachable in practice — CS0708 fires first; retained for completeness) |
| **DP039** | Error | Action method has wrong signature (must be `static void Method(TState, TState, TTrigger)` or `static ValueTask Method(TState, TState, TTrigger, CancellationToken)`) |

## Composite DI + Visitor (DP040–DP041) {#dp040}

| ID | Severity | When |
|----|----------|------|
| **DP040** | Error | `BuildRoot(IServiceProvider)` called but a composite node is not registered in the container |
| **DP041** | Info | Generated `I{Contract}NodeVisitor` does not cover all node types (reserved — the C# compiler enforces full coverage via CS0535 when implementing the generated interface) |

## Decorator DI + async (DP042–DP043) {#dp042}

| ID | Severity | When |
|----|----------|------|
| **DP042** | Error | Async decorator method signature is incorrect (`DecorateAsync` must return `ValueTask<TService>`) |
| **DP043** | Error | Async decorator cannot be resolved from DI when using `Build(IServiceProvider, core)` |

## EventAggregator (DP044–DP046) {#dp044}

| ID | Severity | When |
|----|----------|------|
| **DP044** | Info | Type implements `IEventHandler<T>` but is not marked with `[RegisterEventHandler]` |
| **DP045** | Error | Duplicate `[RegisterEventHandler]` on the same handler for the same event type |
| **DP046** | Error | Type marked with `[RegisterEventHandler<T>]` but does not implement `IEventHandler<T>` |

## Strategy guard (DP047–DP049) {#dp047}

| ID | Severity | When |
|----|----------|------|
| **DP047** | Error | `[RegisterStrategy(Guard = nameof(Method))]` guard method not found on strategy class |
| **DP048** | Error | Guard method is not `static` |
| **DP049** | Error | Guard method has wrong signature (must be `static bool Method(TKey)`) |

## Handler guard (DP050–DP052) {#dp050}

| ID | Severity | When |
|----|----------|------|
| **DP050** | Error | `[HandlerOrder(Guard = nameof(Method))]` guard method not found on handler class |
| **DP051** | Error | Guard method is not `static` |
| **DP052** | Error | Guard method has wrong signature (must be `static bool Method(TContext)`) |

## Factory async + pooling (DP053–DP055) {#dp053}

| ID | Severity | When |
|----|----------|------|
| **DP053** | Error | `[RegisterFactory(IsAsync = true)]` but factory does not implement `IAsyncFactory<T>` |
| **DP054** | Error | `PoolSize` is negative (must be ≥ 0; 0 disables pooling) |
| **DP055** | Warning | `PoolSize` > 1024 (may cause excessive memory usage) |

## Code fixes

`DesignPatterns.CodeFixes` ships inside the **`Skymly.DesignPatterns`** meta package (`analyzers/dotnet/cs`). Selected diagnostics offer one-click fixes in the IDE (requires C# Workspaces):

| Diagnostic | Code fix (summary) |
|------------|-------------------|
| **DP006** | Add `[RegisterStrategy("key", typeof(TContract))]` |
| **DP023** | Add `[RegisterFactory("key", typeof(TContract))]` |
| **DP024** | Add `[HandlerOrder(order, typeof(TContext))]` |
| **DP025** | Replace literal with nearest registered key |
| DP001 | Add `partial` modifier |
| DP015 | Add `[CompositeBuildable]` |
| DP004 / DP013 / DP017 / DP021 | Add contract implementation |
| DP007 / DP009 / DP014 / DP019 / DP022 | Add parameterless constructor |

Generator errors (DP001–DP005, DP007–DP022) are fixed by correcting attributes or types; no CodeFix is provided for duplicate-key errors.

Category prefix: **`DesignPatterns`**.
