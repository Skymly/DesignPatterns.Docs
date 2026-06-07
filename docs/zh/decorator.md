# Decorator

命名空间：`DesignPatterns.Structural`

## 概述

在不产生子类爆炸的前提下，为核心服务叠加横切行为。

## 运行时

- `IDecorator<T>`
- `DecoratorStackBuilder<T>` — 有序组合

## 源生成器

`[Decorator(typeof(TContract), order)]`。生成器发出 `{Contract}DecoratorStack.Build(...)`。

顺序越小越靠近核心；外层 Decorator 先执行入站逻辑。

## 诊断

DP016–DP019。

## 示例

[DesignPatterns.Samples.Decorator](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Decorator)

维护者文档：[docs/Decorator.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Decorator.md)
