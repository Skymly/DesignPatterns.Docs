# 参考与链接

## 仓库

| 仓库 | 角色 |
|------|------|
| [DesignPatterns](https://github.com/Skymly/DesignPatterns) | 运行时、Roslyn 生成器、测试 |
| [DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples) | 可运行示例 |
| [DesignPatterns.Docs](https://github.com/Skymly/DesignPatterns.Docs) | 本站 |

## NuGet 包

| 包 ID | 预览版本 | 内容 |
|-------|----------|------|
| [`Skymly.DesignPatterns`](https://www.nuget.org/packages/Skymly.DesignPatterns) | `0.1.0-preview3` | 元包 — 运行时 + 源生成器 + Analyzer + CodeFix |
| `DesignPatterns.Extensions.DependencyInjection` | —（尚未发 NuGet） | MSDI + `RegisterDi` 生成 |

```xml
<PackageReference Include="Skymly.DesignPatterns" Version="0.1.0-preview3" />
```

::: info 已弃用的 GitHub 包 ID
请勿再使用 GitHub Packages 上的旧 ID `DesignPatterns`（`0.1.0-preview1` / `preview2`）。请改用 nuget.org 上的 **`Skymly.DesignPatterns`**。
:::

## 诊断

见 [诊断](./diagnostics.md)（DP001–DP025）。

## 维护者文档

主仓中文设计文档：

- [docs/DEVELOPMENT.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/DEVELOPMENT.md)
- [docs/ROADMAP.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/ROADMAP.md)
- `DesignPatterns/docs/*.md` 各模式详细设计
