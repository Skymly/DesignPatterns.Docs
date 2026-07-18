---
layout: home

hero:
  name: DesignPatterns
  text: .NET 编译期设计模式工具库
  tagline: 轻量运行时 primitives + Roslyn 源生成器 — Singleton、Strategy、责任链、Composite、Factory、Decorator、Event Aggregator 与 State Machine
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/Skymly/DesignPatterns

features:
  - title: 组合优于继承
    details: 小接口与 Builder，而非厚重基类框架。
  - title: 源生成器
    details: "[RegisterStrategy]、[HandlerOrder] 等在编译期生成 Key、注册表与管道。"
  - title: 诊断
    details: DP001–DP071 在编译期发现重复 Key、契约不匹配、未注册、guard 签名错误、DI 生命周期问题以及状态和 Composite 约束。
  - title: 可选 DI
    details: DesignPatterns.Extensions.DependencyInjection 提供 RegisterDi 与 MSDI 扩展。
---

## 项目状态

::: warning 早期预览
公共 API、生成代码形态与诊断 ID **尚未稳定**。请从 nuget.org 安装 [`Skymly.DesignPatterns`](https://www.nuget.org/packages/Skymly.DesignPatterns) `0.2.2`，或使用 sibling 克隆 / 固定 commit，直至稳定公告。
:::

## 下一步

| 页面 | 说明 |
|------|------|
| [快速开始](./getting-started.md) | 克隆布局、构建与首个特性 |
| [示例](./samples.md) | 可运行 [DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples) |
| [诊断](./diagnostics.md) | DP### 编译器消息 |
| [参考与链接](./reference.md) | 仓库与包 |

模式指南见侧栏 **设计模式**。
