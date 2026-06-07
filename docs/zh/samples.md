# 示例

可运行控制台示例：

**[github.com/Skymly/DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples)**

## 运行（默认 sibling 本地引用）

需要 .NET 8 与 sibling `DesignPatterns` 克隆（`UseLocalDesignPatterns=true`）。

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

## 项目一览

| 示例 | 演示内容 |
|------|----------|
| **DesignPatterns.Samples.Strategy** | `[RegisterStrategy]` → Keys + `Instance` |
| **DesignPatterns.Samples.Chain** | `[HandlerOrder]` 管道 |
| **DesignPatterns.Samples.Composite** | `[CompositePart]` + `BuildRoot()` |
| **DesignPatterns.Samples.Factory** | 生成器工厂注册表 |
| **DesignPatterns.Samples.RegisterFactory** | 手动 `FactoryRegistryBuilder` |
| **DesignPatterns.Samples.Decorator** | 装饰器栈 |
| **DesignPatterns.Samples.EventAggregator** | 事件聚合器 |
| **DesignPatterns.Samples.GenerateSingleton** | `[GenerateSingleton]` |
| **DesignPatterns.Samples.DependencyInjection** | Strategy / Factory / Handler 的 `RegisterDi` |

主仓 `DesignPatterns/samples/` 仍保留副本供主仓 CI 使用。

## 未来 NuGet 消费

包发布后可在示例仓设置 `-p:UseLocalDesignPatterns=false`。
