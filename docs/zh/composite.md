# Composite

命名空间：`DesignPatterns.Structural`

## 概述

叶子与组合节点共享契约的树结构。库在编译期登记部件，运行时可装配单根树或多根森林。

## 运行时

- `ICompositeNode<TSelf>` — 节点契约（含 `Children`）
- `ICompositeBuildable<TNode>` — 通过 `SetChildren` 接收子节点
- `CompositeCatalogAssembler.Assemble` / `AssembleForest` — 从 flat catalog 装配
- `CompositeTraverser.Traverse` / `TraverseForest` — 深度优先（前/后序）与广度优先遍历
- `CompositeTreeBuilder<TNode>` — 手动建树

## 源生成器

在实现类上使用 `[CompositePart]`（.NET 7+ 可用泛型特性）。生成器产出 `{Contract}CompositeKeys`、`{Contract}CompositeCatalog`、`BuildRoot()` 与 `BuildForest()`。

```csharp
[CompositePart<IMenuNode>("root")]
public sealed class HomeMenu : IMenuNode, ICompositeBuildable<IMenuNode> { ... }

[CompositePart<IMenuNode>("admin", Order = 5)]
public sealed class AdminMenu : IMenuNode, ICompositeBuildable<IMenuNode> { ... }

var forest = MenuNodeCompositeCatalog.BuildForest();
CompositeTraverser.TraverseForest(forest, (node, depth, rootIndex) => { ... });
```

| API | 适用场景 |
|-----|----------|
| `BuildRoot()` | catalog 中**恰好一个** `ParentKey == null` |
| `BuildForest()` | **一个或多个**根（按 `Order` 再 key 排序） |

多根 catalog 调用 `BuildRoot()` 会在运行时抛 `CompositeAssemblyException`。

## 诊断

DP010–DP015。

## 示例

[DesignPatterns.Samples.Composite](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Composite) — `BuildForest()` / `TraverseForest`、多根时 `BuildRoot()` 失败演示，以及手动 `CompositeTreeBuilder`。

维护者文档：[docs/Composite.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Composite.md)
