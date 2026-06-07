# Factory Registry

命名空间：`DesignPatterns.Creational`

## 概述

Key 映射到产品工厂 — 类似 Strategy，但用于 **创建** 实例（`Create()` / `IFactoryRegistry`）。

## 运行时

- `IFactoryRegistry<TKey, TProduct>`
- `FactoryRegistryBuilder<TKey, TProduct>` — 手动注册

## 源生成器

`[RegisterFactory(typeof(TProduct), "key")]` + partial 静态注册表持有者。

## 诊断

DP020–DP023。

## 示例

| 示例 | 重点 |
|------|------|
| [Factory](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Factory) | 生成器注册表 |
| [RegisterFactory](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.RegisterFactory) | 手动 Builder |

维护者文档：[docs/FactoryRegistry.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/FactoryRegistry.md)
