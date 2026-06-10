# Composite

Namespace: `DesignPatterns.Structural`

## Overview

Tree structures where leaves and composites share a node contract. The library catalogs parts at compile time and assembles single-root trees or multi-root forests at runtime.

## Runtime

- `ICompositeNode<TSelf>` — node contract with children
- `ICompositeBuildable<TNode>` — receives assembled children via `SetChildren`
- `CompositeCatalogAssembler.Assemble` / `AssembleForest` — build from flat catalog entries
- `CompositeTraverser.Traverse` / `TraverseForest` — depth-first (pre/post-order) and breadth-first traversal
- `CompositeTreeBuilder<TNode>` — manual tree construction

## Source generator

Mark each implementation with `[CompositePart]` (generic on .NET 7+). The generator emits `{Contract}CompositeKeys`, `{Contract}CompositeCatalog`, `BuildRoot()`, and `BuildForest()`.

```csharp
[CompositePart<IMenuNode>("root")]
public sealed class HomeMenu : IMenuNode, ICompositeBuildable<IMenuNode> { ... }

[CompositePart<IMenuNode>("admin", Order = 5)]
public sealed class AdminMenu : IMenuNode, ICompositeBuildable<IMenuNode> { ... }

[CompositePart<IMenuNode>("settings", ParentKey = "root", Order = 10)]
public sealed class SettingsMenu : IMenuNode, ICompositeBuildable<IMenuNode> { ... }

var root = MenuNodeCompositeCatalog.BuildRoot();           // exactly one ParentKey == null
var forest = MenuNodeCompositeCatalog.BuildForest();       // one or more roots

CompositeTraverser.TraverseForest(forest, (node, depth, rootIndex) => { ... });
```

| API | When to use |
|-----|-------------|
| `BuildRoot()` | Catalog has **exactly one** `ParentKey == null` entry |
| `BuildForest()` | Catalog has **one or more** roots (ordered by `Order`, then key) |

Multi-root catalogs: `BuildRoot()` throws `CompositeAssemblyException` at runtime.

## Diagnostics

DP010–DP015.

## Sample

[DesignPatterns.Samples.Composite](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Composite) — generated `BuildForest()` + `TraverseForest`, `BuildRoot()` failure on multi-root catalog, and manual `CompositeTreeBuilder`.

Maintainer doc: [docs/Composite.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Composite.md) (中文).
