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

## 诊断

DP001、DP002 — 见 [诊断](./diagnostics.md)。

## 示例

[DesignPatterns.Samples.GenerateSingleton](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.GenerateSingleton)

维护者详细设计（中文）：[DesignPatterns/docs](https://github.com/Skymly/DesignPatterns/tree/main/docs)
