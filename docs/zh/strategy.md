# Strategy

命名空间：`DesignPatterns.Behavioral`

## 概述

按 Key 在编译期注册算法实现，避免大型 `switch`，选择逻辑仍由业务代码决定。

## 运行时

- `IStrategyRegistry<TKey, TStrategy>` — `Get` / `TryGet`
- `StrategyRegistryBuilder<TKey, TStrategy>` — 手动注册

## 源生成器

1. 声明 **partial** 静态注册表持有者。
2. 在实现类上标记 `[RegisterStrategy(typeof(TContract), "key")]`。
3. 生成器发出 `{Name}Keys`、`Instance` 及可选 `RegisterDi`。

可选标记接口：`IStrategy<TIn, TOut>`、`IAsyncStrategy<TIn, TOut>` — 生成器不强制要求。

## 诊断

DP003–DP007 — 见 [诊断](./diagnostics.md)。

## 示例

[DesignPatterns.Samples.Strategy](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Strategy)

## DI

见 [依赖注入](./dependency-injection.md)。

维护者文档：[docs/Strategy.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Strategy.md)
