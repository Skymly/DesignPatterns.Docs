---
layout: home

hero:
  name: DesignPatterns
  text: Compile-time design patterns for .NET
  tagline: Lightweight runtime primitives + Roslyn source generators — Singleton, Strategy, Chain, Composite, Factory, Decorator, Event Aggregator, and State Machine
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Skymly/DesignPatterns

features:
  - title: Composition over inheritance
    details: Small interfaces and builders instead of heavy base-class frameworks.
  - title: Source generators
    details: "Attributes like [RegisterStrategy] and [HandlerOrder] emit keys, registries, and pipelines at compile time."
  - title: Diagnostics
    details: DP001–DP071 catch duplicate keys, contract mismatches, missing registrations, guard signature errors, DI lifetime issues, and state or composite constraints before runtime.
  - title: Optional DI
    details: DesignPatterns.Extensions.DependencyInjection adds RegisterDi helpers when you use Microsoft.Extensions.DependencyInjection.
---

## Status

::: warning Early preview
Public APIs, generated code shapes, and diagnostic IDs are **not stable** yet. Install [`Skymly.DesignPatterns`](https://www.nuget.org/packages/Skymly.DesignPatterns) `0.2.3-preview1` from nuget.org, or use a sibling clone / pin a commit until a stability announcement.
:::

## Where to read next

| Page | Purpose |
|------|---------|
| [Getting started](./getting-started.md) | Clone layout, build, and first attribute |
| [Samples](./samples.md) | Runnable [DesignPatterns.Samples](https://github.com/Skymly/DesignPatterns.Samples) repo |
| [Diagnostics](./diagnostics.md) | DP### compiler messages |
| [Reference](./reference.md) | Repositories and packages |

Pattern guides live under **Patterns** in the sidebar.
