# 责任链

命名空间：`DesignPatterns.Behavioral`

## 概述

有序 Handler 处理共享上下文；可短路（不调用 `next`）或继续管道。异步优先：`ValueTask` + `CancellationToken`。

## 运行时

| 类型 | 说明 |
|------|------|
| `IHandler<TContext>` | `InvokeAsync(context, next, cancellationToken)` |
| `HandlerPipelineBuilder<TContext>` | `Use(handler)` / `Use(delegate)`，再 `Build()` |
| `HandlerPipeline<TContext>` | 不可变管道 — `InvokeAsync`、`InvokeTracedAsync` |
| `HandlerPipelineTrace` | 单次调用的步骤列表 |
| `HandlerPipelineStep` | 索引、显示名、`HandlerPipelineStepStatus` |
| `HandlerPipelineStepStatus` | `Completed` / `ShortCircuited` / `NotReached` |

### 短路

- 调用 `await next(context, ct)` → 后续 Handler 继续执行。
- **不**调用 `next` → 跳过后续 Handler。

### 可追踪调用（`InvokeTracedAsync`）

调试鉴权拦截、早退时，无需引入完整中间件框架：

```csharp
var trace = await pipeline.InvokeTracedAsync(context, cancellationToken);

foreach (var step in trace.Steps)
{
    Console.WriteLine($"{step.Index}: {step.Name} → {step.Status}");
}
```

| 状态 | 含义 |
|------|------|
| **Completed** | 已执行且调用了 `next` |
| **ShortCircuited** | 已执行但**未**调用 `next` |
| **NotReached** | 未执行（更早 Handler 短路） |

`InvokeTracedAsync` 不改变执行顺序与短路语义，仅返回 trace；委托 Handler 显示为 `"<delegate>"`。

## 源生成器

在 Handler 上使用 `[HandlerOrder(n, typeof(TContext))]`。生成器发出 `{Context}HandlerPipeline`。

## 诊断

DP005、DP008–DP009、DP024（未注册 Handler 为 Info + CodeFix）。

## 示例

[DesignPatterns.Samples.Chain](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Chain)

维护者文档：[docs/ChainOfResponsibility.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/ChainOfResponsibility.md)

英文版：[Chain of Responsibility](../chain-of-responsibility.md)
