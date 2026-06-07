# Composite

命名空间：`DesignPatterns.Structural`

## 概述

叶子与组合节点共享契约的树结构。库提供部件目录与 `BuildRoot()`，减少深层继承。

## 运行时

- `ICompositeNode<TSelf>`
- `CompositeTraverser` — 深度优先遍历
- `CompositeTreeBuilder<TNode>` — 手动建树

## 源生成器

`[CompositePart]` 标记实现；`[CompositeBuildable]` 标记 partial 目录类型。

## 诊断

DP010–DP015。

## 示例

[DesignPatterns.Samples.Composite](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Composite)

维护者文档：[docs/Composite.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Composite.md)
