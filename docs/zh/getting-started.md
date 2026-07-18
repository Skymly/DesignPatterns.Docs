# 快速开始

## 前置条件

- [.NET SDK 8](https://dotnet.microsoft.com/download)
- Git

## 从 NuGet 安装（预览）

元包在 [nuget.org](https://www.nuget.org/packages/Skymly.DesignPatterns) 上的 ID 为 **`Skymly.DesignPatterns`**。C# 命名空间仍为 `DesignPatterns.*`。

```xml
<PackageReference Include="Skymly.DesignPatterns" Version="0.2.3-preview1" />
```

也可以使用命令行安装：

```powershell
dotnet add package Skymly.DesignPatterns --version 0.2.3-preview1
```

::: warning 早期预览
公共 API、生成代码与 `DP###` 诊断**尚未稳定**。在稳定公告前请固定包版本或 Git commit。
:::

**可选 DI：** DI 集成作为独立包发布，不包含在元包中：

```powershell
dotnet add package Skymly.DesignPatterns.Extensions.DependencyInjection --version 0.2.3-preview1
# 或使用 Autofac：
dotnet add package Skymly.DesignPatterns.Extensions.Autofac --version 0.2.3-preview1
```

见[依赖注入](./dependency-injection.md)。

## 克隆布局（贡献者）

建议并列放置于 **DesignPatterns** 项目目录下：

```
<workspace-root>/
  Skymly/
    DesignPatterns/
      DesignPatterns/
      DesignPatterns.Samples/
      DesignPatterns.Docs/    ← 本站
```

```powershell
git clone https://github.com/Skymly/DesignPatterns.git
git clone https://github.com/Skymly/DesignPatterns.Samples.git
```

## 构建生成器解决方案

```powershell
cd DesignPatterns
./build.ps1 --target Ci --configuration Release
```

## 第一个模式：Strategy

引用 **`Skymly.DesignPatterns`**（NuGet）或本地 pack / 项目引用。在实现类与 partial 注册表持有者上标记特性：

```csharp
[RegisterStrategy(typeof(IPaymentStrategy), "alipay")]
public sealed class AlipayPayment : IPaymentStrategy { ... }

public static partial class PaymentStrategyRegistry { }
```

使用生成的注册表：

```csharp
var alipay = PaymentStrategyRegistry.Instance.Get(PaymentStrategyKeys.Alipay);
```

详见 [Strategy](./strategy.md) 与示例仓库。

## 本地预览文档

```bash
cd DesignPatterns.Docs
npm install
npm run docs:dev
```
