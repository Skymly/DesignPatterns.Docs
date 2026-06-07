# 责任链

命名空间：`DesignPatterns.Behavioral`

## 概述

有序 Handler 处理共享上下文，可短路或传递给下一个。

## 运行时

- `IHandler<TContext>` — `Handle(context, next)`
- `HandlerPipeline<TContext>` — 按序执行

## 源生成器

在 Handler 上使用 `[HandlerOrder(n)]`。生成器发出 `{Context}HandlerPipeline`。

## 诊断

DP005、DP008–DP009、DP024。

## 示例

[DesignPatterns.Samples.Chain](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Chain)

维护者文档：[docs/ChainOfResponsibility.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/ChainOfResponsibility.md)
