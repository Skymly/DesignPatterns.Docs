# 示例

可运行控制台示例：

**[github.com/Skymly/DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples)**

## 运行（默认 sibling 本地引用）

需要 .NET 8 与 sibling `DesignPatterns` 克隆（示例仓默认 `UseLocalDesignPatterns=true`）。

```powershell
git clone https://github.com/Skymly/DesignPatterns.git
git clone https://github.com/Skymly/DesignPatterns.Samples.git
cd DesignPatterns.Samples
dotnet run --project DesignPatterns.Samples.Strategy -c Release
```

## 运行全部（CI）

```powershell
./build.ps1 --target Ci --configuration Release
```

主仓 [DesignPatterns](https://github.com/Skymly/DesignPatterns) CI 会 checkout 两个仓库，使 sibling 路径 `../DesignPatterns` 可用。

## 项目一览

| 示例 | 演示内容 |
|------|----------|
| **DesignPatterns.Samples.Strategy** | `[RegisterStrategy]` → Keys + `Instance`；同步支付 + 异步 `ExecuteAsync` |
| **DesignPatterns.Samples.Chain** | `[HandlerOrder]` 管道 |
| **DesignPatterns.Samples.Composite** | `[CompositePart]` + `BuildForest()` / `TraverseForest`（含手动 builder） |
| **DesignPatterns.Samples.Factory** | 生成器工厂注册表 |
| **DesignPatterns.Samples.RegisterFactory** | 手动 `FactoryRegistryBuilder` |
| **DesignPatterns.Samples.Decorator** | `[Decorator]` 栈 + `DecoratorOrder` 常量 + 条件 `Add` |
| **DesignPatterns.Samples.EventAggregator** | 事件聚合器 |
| **DesignPatterns.Samples.GenerateSingleton** | `[GenerateSingleton]` |
| **DesignPatterns.Samples.DependencyInjection** | Strategy / Factory / Handler 的 `RegisterDi` |
| **DesignPatterns.Samples.State** | 手动 `TransitionTableBuilder` + `[StateMachine]` 订单生命周期 |

## NuGet 消费

**`Skymly.DesignPatterns` `0.2.2`** 已发布至 [nuget.org](https://www.nuget.org/packages/Skymly.DesignPatterns)（早期预览）。在示例仓关闭 sibling 项目引用：

```powershell
dotnet run --project DesignPatterns.Samples.Strategy -c Release -p:UseLocalDesignPatterns=false
```

或在 `Directory.Build.props` / `Directory.Build.targets` 中将 `UseLocalDesignPatterns` 设为 `false`。

::: info 已弃用包 ID
勿使用旧 GitHub 包 ID `DesignPatterns`（`0.1.0-preview1` / `preview2`）。请使用 nuget.org 上的 **`Skymly.DesignPatterns`**。
:::

安装说明见 [快速开始](./getting-started.md)。

英文版：[Samples](../samples.md)
