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
