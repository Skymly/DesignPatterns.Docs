# 配置桥接

包：**`Skymly.DesignPatterns.Extensions.Configuration`**

将 **`IConfiguration`** 字符串映射到 **`IStrategyRegistry<string, TContract>`** 查找 — 适合宿主按配置键选择 strategy 实现，而不是手写 `switch`。

配合 `[RegisterStrategy]` 生成的 `{Contract}Registry` / `{Contract}Keys` 使用（见 [Strategy](./strategy.md)）。

## 安装

不包含在 `Skymly.DesignPatterns` 元包中：

```powershell
dotnet add package Skymly.DesignPatterns.Extensions.Configuration --version 0.2.3-preview2
```

```xml
<PackageReference Include="Skymly.DesignPatterns.Extensions.Configuration" Version="0.2.3-preview2" />
```

目标框架：`netstandard2.0` 与 `net8.0`。依赖 `Microsoft.Extensions.Configuration.Abstractions`。

## API

```csharp
using DesignPatterns.Extensions.Configuration;
using Microsoft.Extensions.Configuration;

IConfiguration configuration = /* 宿主配置 */;

// 无法解析时抛出 RegistryConfigurationException。
var card = RegistryConfiguration.ResolveConfigured(
    CardMotionRegistry.Instance,
    configuration,
    configurationKey: "Card",
    defaultKey: CardMotionKeys.Alpha);

// 非抛出变体。
if (RegistryConfiguration.TryResolveConfigured(
        CardMotionRegistry.Instance,
        configuration,
        "Card",
        out var motion,
        defaultKey: CardMotionKeys.Alpha))
{
    // 使用 motion
}
```

### 解析顺序

1. 读取 `IConfiguration[configurationKey]`。
2. 值为缺失或空白时，若提供了 `defaultKey` 则使用它。
3. 调用 `registry.TryGet(strategyKey, out implementation)`。

`defaultKey` 优先使用 `{Contract}Keys` 常量，以便调用点保持 DP025 安全。

### 失败信息

`RegistryConfigurationException` 会包含配置键、配置值（或默认键）以及注册表 `Keys` 列表：

```text
Configuration key 'Card' has value 'beta' which is not registered. Registered keys: alpha, gamma.
```

## 宿主示例

```csharp
using DesignPatterns.Extensions.Configuration;
using Microsoft.Extensions.Configuration;

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

var card = RegistryConfiguration.ResolveConfigured(
    CardMotionRegistry.Instance,
    configuration,
    "Card",
    defaultKey: CardMotionKeys.Alpha);
```

## 遗留 App.config 宿主

**没有**单独的 `ConfigurationManager.AppSettings` 扩展包。请在宿主内把 AppSettings 适配为 `IConfiguration`（对 `RegistryConfiguration` 而言，索引器适配器即可），再调用同一 API。

最小适配器见 [PluginAssemblies 示例 Host](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.PluginAssemblies/Host)；NuGet / sibling 消费方式见[示例](./samples.md)。

## 相关

- [Strategy](./strategy.md)
- [依赖注入](./dependency-injection.md)（Autofac / MSDI）
- [诊断](./diagnostics.md)（DP025、DP033）
- 维护者文档：[Configuration.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Configuration.md)、[PluginAssemblies.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/PluginAssemblies.md)
