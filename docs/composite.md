# Composite

Namespace: `DesignPatterns.Structural`

## Overview

Tree structures where leaves and composites share a node contract. The library helps catalog parts and build roots without deep inheritance.

## Runtime

- `ICompositeNode<TSelf>` — node contract with children
- `CompositeTraverser` — depth-first traversal
- `CompositeTreeBuilder<TNode>` — manual tree construction

## Source generator

`[CompositePart]` on implementations; `[CompositeBuildable]` on a partial catalog type. Generator emits keys, catalog, and `BuildRoot()`.

```csharp
[CompositePart("home", IsRoot = true)]
public sealed partial class HomeMenu : IMenuNode { ... }

[CompositePart("settings", ParentKey = "home")]
public sealed partial class SettingsMenu : IMenuNode { ... }
```

## Diagnostics

DP010–DP015.

## Sample

[DesignPatterns.Samples.Composite](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Composite) — compares generated catalog vs manual builder.

Maintainer doc: [docs/Composite.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Composite.md) (中文).
