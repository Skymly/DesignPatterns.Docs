# 注册表 Key 命名约定

适用于 **`[RegisterFactory]`**、**`[RegisterStrategy]`** 的字符串 key，以及生成器产出的 `{Contract}Keys` 常量。**不**适用于 `[HandlerOrder]` / `[Decorator]` / `[CompositePart]`（整数顺序）或 `[GenerateSingleton]`。

维护者详细说明：[FactoryKeyConventions.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/FactoryKeyConventions.md)（中文）。

## 基本规则

| 维度 | 规则 |
|------|------|
| **大小写** | 推荐 `kebab-case` 或 `lower_snake_case`。[DP025](./diagnostics.md#注册表-key-dp025) 对字面量做**精确**匹配；大小写不一致视为未知 key。 |
| **字符集** | 仅 `[a-z0-9_-]`，避免空白、点号、斜杠、Unicode。 |
| **前缀** | 跨模块共享 key 空间时加短前缀（如 `payment-refund` 与 `billing-refund`）。 |
| **稳定性** | key 即公共契约；改名按 breaking change 处理（SemVer）。 |
| **唯一性** | 同一契约下 key 不可重复（DP003 / DP020）。 |

示例：`"format:json"`、`"image:convert"`、`"http-client-retry"`。

## 复合 key（`outer:inner`）

两层语义（工具 + 能力、租户 + 策略等）用**单层字符串**表达，推荐 `"{outer}:{inner}"`：

```csharp
[RegisterFactory<ITextFormatter>("format:json")]
public sealed class JsonTextFormatter : ITextFormatter { ... }

[RegisterStrategy<IPricingStrategy>("tenant-acme:standard")]
public sealed class AcmeStandardPricing : IPricingStrategy { ... }
```

应用层可按 `:` 前缀分组；生成器与 [DP025](./diagnostics.md#注册表-key-dp025) 仍按扁平 key 列表校验。

## 优先使用生成常量

调用 `Get` / `TryGet` / `Create` / `TryCreate` 时使用 `{Contract}Keys.*`，避免裸字符串字面量：

```csharp
registry.Create(PaymentStrategyKeys.Card);  // 推荐

registry.Create("cardd");  // 易触发 DP025
```

DP025 会列出已注册 key，并在拼写接近时提供**最近键 CodeFix**。

## 相关诊断

| ID | 说明 |
|----|------|
| DP003 / DP020 | 策略 / 工厂 key 重复（生成器 Error） |
| DP006 / DP023 | 实现未注册（Analyzer Info + CodeFix） |
| **DP025** | 未知字面量 key（Analyzer Info + CodeFix） |

完整列表见 [诊断](./diagnostics.md)。

## 库侧不提供

- 原生二维 attribute。
- enum / `Type` 作为 key（当前仅 string）。
- 运行时 key 别名或自动前缀注入。

## 示例

- [DesignPatterns.Samples.Factory](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Factory)
- [DesignPatterns.Samples.Strategy](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Strategy)

英文版：[Registry key conventions](../registry-key-conventions.md)
