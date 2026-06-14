# Registry key conventions

Applies to string keys on **`[RegisterFactory]`**, **`[RegisterStrategy]`**, and the keys those generators emit as `{Contract}Keys` constants. Does **not** apply to `[HandlerOrder]` / `[Decorator]` / `[CompositePart]` (integer order) or `[GenerateSingleton]`.

Maintainer detail (中文): [FactoryKeyConventions.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/FactoryKeyConventions.md).

## Basic rules

| Topic | Rule |
|-------|------|
| **Case** | Prefer `kebab-case` or `lower_snake_case`. [DP025](./diagnostics.md#registry-key-dp025) matches **exact** string literals; mixed case is treated as an unknown key. |
| **Charset** | `[a-z0-9_-]` only — no spaces, dots, slashes, or Unicode. |
| **Prefix** | Use a short domain prefix when keys are shared across modules (e.g. `payment-refund` vs `billing-refund`). |
| **Stability** | A key on `[RegisterFactory]` / `[RegisterStrategy]` is part of your **public contract**. Renaming a key is a breaking change (SemVer). |
| **Uniqueness** | Duplicate keys for the same contract are errors (DP003 / DP020). |

Examples: `"format:json"`, `"image:convert"`, `"http-client-retry"`.

## Composite keys (`outer:inner`)

When you have a natural two-level lookup (tool + capability, tenant + strategy, route + handler), **do not** introduce a second dimension inside the library API. Use a **single string key** with a delimiter, typically `"{outer}:{inner}"`:

```csharp
[RegisterFactory<ITextFormatter>("format:json")]
public sealed class JsonTextFormatter : ITextFormatter { ... }

[RegisterStrategy<IPricingStrategy>("tenant-acme:standard")]
public sealed class AcmeStandardPricing : IPricingStrategy { ... }
```

Group by prefix in your app if needed (e.g. split on `:`). The generators and [DP025](./diagnostics.md#registry-key-dp025) still see one flat key list per contract.

## Prefer generated constants

Always resolve through `{Contract}Keys.*` (or variables/constants derived from them) instead of raw string literals at call sites:

```csharp
// Good
registry.Create(PaymentStrategyKeys.Card);

// Risky — DP025 if typo or unknown key
registry.Create("cardd");
```

DP025 lists registered keys in the message and offers a **nearest-key CodeFix** when the literal is close to a known key.

## Related diagnostics

| ID | Role |
|----|------|
| DP003 / DP020 | Duplicate strategy / factory key (generator, Error) |
| DP006 / DP023 | Implementation missing registration attribute (Analyzer, Info + CodeFix) |
| **DP025** | Unknown literal key on registry lookup (Analyzer, Info + CodeFix) |

See [Diagnostics](./diagnostics.md) for the full DP001–DP025 table.

## What the library does not do

- Native two-dimensional attributes (`[RegisterFactory<Outer, Inner, T>]`).
- Enum or `Type` keys (string only today).
- Runtime key aliasing or automatic prefix injection.

## Samples

- [DesignPatterns.Samples.Factory](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Factory) — generated `{Product}Keys`
- [DesignPatterns.Samples.Strategy](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Strategy) — `{Strategy}Keys` + async execution
