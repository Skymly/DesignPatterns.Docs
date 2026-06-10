# Decorator

命名空间：`DesignPatterns.Structural`

## 概述

在不产生子类爆炸的前提下，为核心服务叠加横切行为。

## 运行时

- `IDecorator<T>`
- `DecoratorStackBuilder<T>` — 有序组合；`Add(..., Func<bool>)` 在 **Build** 时按谓词决定是否套用装饰器

### 条件装饰

```csharp
var enableMetrics = configuration.GetValue<bool>("Metrics:Enabled");

var service = new DecoratorStackBuilder<IPaymentService>()
    .Add<LoggingPaymentDecorator>()
    .Add<MetricsPaymentDecorator>(() => enableMetrics)
    .Build(new PaymentService());
```

生成器产出的 `{Contract}DecoratorStack.Build(core)` 仍包含全部 `[Decorator]`；运行时开关请用手动 builder。

## 源生成器

在装饰器类型上使用 `[Decorator<TContract>(order)]`（netstandard2.0 可用非泛型）。生成器产出：

- `{Contract}DecoratorStack.Build(core)` — 有序栈
- `{Contract}DecoratorOrder` — 以装饰器类型名命名的 `public const int` 常量

```csharp
[Decorator<IPaymentService>(10)]
public sealed class LoggingPaymentDecorator : IPaymentService, IDecorator<IPaymentService> { ... }

// 其他代码中引用（生成后）：
Console.WriteLine(PaymentServiceDecoratorOrder.LoggingPaymentDecorator);
```

顺序越小越靠近核心；外层 Decorator 先执行入站逻辑。重复 Order 由 **DP016** 报告。

## 诊断

DP016–DP019。

## 示例

[DesignPatterns.Samples.Decorator](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Decorator) — 生成栈与 Order 常量、条件 `Add`、与 core 对比。

维护者文档：[docs/Decorator.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Decorator.md)
