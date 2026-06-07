# 依赖注入

包：**`DesignPatterns.Extensions.DependencyInjection`**

## 概述

可选的 Microsoft.Extensions.DependencyInjection 集成。不替代容器生命周期规则 — 注册生成器产出的注册表，并从 `IServiceProvider` 解析实现。

## 手动注册

扩展方法例如：

- `AddStrategyRegistry<TKey, TStrategy>(...)`
- `AddFactoryRegistry<TKey, TProduct>(...)`
- `AddHandlerPipeline<TContext>(...)`

## 生成的 RegisterDi

引用 DI 包（或其 MSBuild targets）后，Strategy / Factory / Handler 生成器可发出：

```csharp
PaymentStrategyRegistry.RegisterDi(services);
```

## 示例

[DesignPatterns.Samples.DependencyInjection](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.DependencyInjection)

## 说明

核心元包 **`DesignPatterns`** **不包含** DI 扩展；需要时请单独引用。
