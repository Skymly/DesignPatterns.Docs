# Diagnostics

Compiler diagnostics emitted by DesignPatterns source generators and analyzers. IDs are defined in `DesignPatterns.Diagnostics.DiagnosticIds`.

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
| **DP006** | Warning | Implementation type not registered with `[RegisterStrategy]` |
| **DP007** | Error | Strategy implementation missing parameterless constructor |

## Chain of Responsibility (DP005, DP008–DP009, DP024)

| ID | Severity | When |
|----|----------|------|
| **DP005** | Error | Duplicate `[HandlerOrder]` value |
| **DP008** | Error | Handler does not implement the pipeline contract |
| **DP009** | Error | Handler missing parameterless constructor |
| **DP024** | Warning | Handler type not registered with `[HandlerOrder]` |

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
| **DP023** | Warning | Product type not registered with `[RegisterFactory]` |

## Code fixes

`DesignPatterns.CodeFixes` provides fixes for selected warnings (e.g. DP024 handler registration). Enable the analyzer package alongside the generator in IDE scenarios.

Category prefix: **`DesignPatterns`**.
