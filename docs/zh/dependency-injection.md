# 依赖注入

包：**`Skymly.DesignPatterns.Extensions.DependencyInjection`**

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

核心元包 **`Skymly.DesignPatterns`** **不包含** DI / Autofac 扩展。请从 nuget.org 单独安装：

- [`Skymly.DesignPatterns.Extensions.DependencyInjection`](https://www.nuget.org/packages/Skymly.DesignPatterns.Extensions.DependencyInjection)
- [`Skymly.DesignPatterns.Extensions.Autofac`](https://www.nuget.org/packages/Skymly.DesignPatterns.Extensions.Autofac)

Autofac 扩展提供与 `RegisterDi` 对称的 `RegisterAutofac(ContainerBuilder)` / `Create(ILifetimeScope)`。可与 MSDI 扩展并存；二者均不包含在元包中。
