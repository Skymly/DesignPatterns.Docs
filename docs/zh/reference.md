# 参考与链接

## 仓库

| 仓库 | 角色 |
|------|------|
| [DesignPatterns](https://github.com/Skymly/DesignPatterns) | 运行时、Roslyn 生成器、测试 |
| [DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples) | 可运行示例 |
| [DesignPatterns.Docs](https://github.com/Skymly/DesignPatterns.Docs) | 本站 |

## NuGet 包

| 包 ID | 版本 | 内容 |
|-------|----------|------|
| [`Skymly.DesignPatterns`](https://www.nuget.org/packages/Skymly.DesignPatterns) | `0.2.3-preview2` | 元包 — 运行时 + 源生成器 + Analyzer + CodeFix |
| [`Skymly.DesignPatterns.Extensions.DependencyInjection`](https://www.nuget.org/packages/Skymly.DesignPatterns.Extensions.DependencyInjection) | `0.2.3-preview2` | MSDI + `RegisterDi` 生成 |
| [`Skymly.DesignPatterns.Extensions.Autofac`](https://www.nuget.org/packages/Skymly.DesignPatterns.Extensions.Autofac) | `0.2.3-preview2` | Autofac + `RegisterAutofac` 生成 |
| [`Skymly.DesignPatterns.Extensions.Configuration`](https://www.nuget.org/packages/Skymly.DesignPatterns.Extensions.Configuration) | `0.2.3-preview2` | `IConfiguration` → strategy `RegistryConfiguration` |

```xml
<PackageReference Include="Skymly.DesignPatterns" Version="0.2.3-preview2" />
```

::: info 已弃用的 GitHub 包 ID
请勿再使用 GitHub Packages 上的旧 ID `DesignPatterns`（`0.1.0-preview1` / `preview2`）。请改用 nuget.org 上的 **`Skymly.DesignPatterns`**。
:::

## 诊断

见[诊断](./diagnostics.md)（DP001–DP071）。

## 维护者文档

主仓中文设计文档：

- [docs/README.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/README.md) — 内部文档索引
- [docs/DEVELOPMENT.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/DEVELOPMENT.md)
- [docs/PUBLISHING.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/PUBLISHING.md)
- [docs/Configuration.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Configuration.md)
- [docs/PluginAssemblies.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/PluginAssemblies.md)
- [docs/FactoryKeyConventions.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/FactoryKeyConventions.md)
- [docs/ROADMAP.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/ROADMAP.md)
- `DesignPatterns/docs/*.md` 各模式详细设计
