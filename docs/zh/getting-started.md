# 快速开始

## 前置条件

- [.NET SDK 8](https://dotnet.microsoft.com/download)
- Git

## 克隆布局

建议 sibling 并列放置：

```
Skymly/
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

在实现类与 partial 注册表持有者上标记特性：

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

## NuGet（发布后）

元包 **`DesignPatterns`** 包含运行时 + 源生成器；**`DesignPatterns.Extensions.DependencyInjection`** 为独立 DI 扩展包。

正式发布前可使用 sibling `ProjectReference` 或本地 `dotnet pack`。

## 本地预览文档

```bash
cd DesignPatterns.Docs
npm install
npm run docs:dev
```
