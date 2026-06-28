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

DP010–DP015. DP040 for unregistered DI nodes. DP041 for visitor coverage.

## DI integration

When the `DesignPatterns.Extensions.DependencyInjection` package is referenced, the source generator emits a `RegisterDi(IServiceCollection, ServiceLifetime)` method for each contract. This registers all composite parts with the DI container and enables `BuildRoot(IServiceProvider)` to resolve nodes from the container.

```csharp
MenuNodeCompositeCatalog.RegisterDi(services);

var provider = services.BuildServiceProvider();
var root = MenuNodeCompositeCatalog.BuildRoot(provider);
```

Parts must be registered in the container before calling `BuildRoot(IServiceProvider)`. If a part is not registered, the generator reports **DP040** at compile time.

## Visitor generation

The source generator can optionally emit a visitor interface and `AcceptVisitor` extension methods for traversing composite trees with type-safe double dispatch.

For a contract `IMenuNode`, the generator emits:

- `IMenuNodeVisitor` — visitor interface with `Visit` methods for each concrete node type
- `AcceptVisitor<TVisitor>(this IMenuNode, TVisitor)` extension methods

```csharp
public class MenuPrinter : IMenuNodeVisitor
{
    public void Visit(HomeMenu node) => Console.WriteLine($"Home: {node.Title}");
    public void Visit(SettingsMenu node) => Console.WriteLine($"Settings: {node.Title}");
}

root.AcceptVisitor(new MenuPrinter());
```

If a node type is added but the visitor interface is not updated, the generator reports **DP041**.

## Sample

[DesignPatterns.Samples.Composite](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Composite) — generated `BuildForest()` + `TraverseForest`, `BuildRoot()` failure on multi-root catalog, and manual `CompositeTreeBuilder`.

Maintainer doc: [docs/Composite.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Composite.md) (中文).
