# Singleton

命名空间：`DesignPatterns.Creational`

## 特性

在 **sealed partial 类**（含无参构造函数）上使用 `[GenerateSingleton]`。生成器发出 `Lazy<T>` 与静态 `Instance` 属性。

```csharp
[GenerateSingleton]
public sealed partial class AppSettings
{
    public string AppName { get; init; } = "Demo";
}
```

## 异步初始化

将 `InitializeAsync` 设置为静态初始化方法的名称。该方法必须返回
`Task` 或 `ValueTask`，并接收生成的实例与 `CancellationToken`。生成器会校验
签名，并生成 `GetInstanceAsync()`，不再生成同步的 `Instance` 属性。

```csharp
[GenerateSingleton(InitializeAsync = nameof(InitializeAsync))]
public sealed partial class AppSettings
{
    public bool IsInitialized { get; private set; }

    public static ValueTask InitializeAsync(
        AppSettings instance,
        CancellationToken cancellationToken)
    {
        instance.IsInitialized = true;
        return ValueTask.CompletedTask;
    }
}

var settings = await AppSettings.GetInstanceAsync();
```

## 诊断

DP001、DP002 — 见 [诊断](./diagnostics.md)。

Singleton 生命周期相关诊断：

- **DP067** — 异步初始化器签名无效
- **DP068** — 生成的 Singleton 同时注册为 DI Singleton
- **DP069** — 非线程安全的生成 Singleton 含可变实例状态
- **DP070** — 可变静态 Singleton 候选
- **DP071** — 可变静态 Singleton 同时注册为 DI Singleton

## 示例

[DesignPatterns.Samples.GenerateSingleton](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.GenerateSingleton)

维护者详细设计（中文）：[DesignPatterns/docs](https://github.com/Skymly/DesignPatterns/tree/main/docs)
