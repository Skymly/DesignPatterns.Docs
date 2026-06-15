# 诊断

DesignPatterns 源生成器与分析器发出的编译器诊断。ID 定义于 `DesignPatterns.Diagnostics.DiagnosticIds`。

IDE 帮助链接指向本页（`#dp###` 锚点）。

## Singleton（DP001–DP002）

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP001** | Error | `[GenerateSingleton]` 目标不是 `partial` |
| **DP002** | Error | 无效的单例目标 |

## Strategy（DP003–DP007）

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP003** | Error | 策略 Key 重复 |
| **DP004** | Error | 实现与策略契约不匹配 |
| **DP006** | Info | 实现类型未用 `[RegisterStrategy]` 注册 |
| **DP007** | Error | 缺少无参构造函数 |

## 责任链（DP005、DP008–DP009、DP024）

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP005** | Error | `[HandlerOrder]` 顺序重复 |
| **DP008** | Error | Handler 未实现管道契约 |
| **DP009** | Error | Handler 缺少无参构造函数 |
| **DP024** | Info | Handler 未用 `[HandlerOrder]` 注册 |

## Composite（DP010–DP015）

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP010** | Error | Composite 部件 Key 重复 |
| **DP011** | Error | 未知父 Key |
| **DP012** | Error | 树结构存在环 |
| **DP013** | Error | 部件与节点契约不匹配 |
| **DP014** | Error | 部件缺少无参构造函数 |
| **DP015** | Error | 注册表持有者缺少 `[CompositeBuildable]` |

## Decorator（DP016–DP019）

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP016** | Error | Decorator 顺序重复 |
| **DP017** | Error | Decorator 与契约不匹配 |
| **DP018** | Error | 未实现 `IDecorator<T>` |
| **DP019** | Error | Decorator 缺少无参构造函数 |

## Factory Registry（DP020–DP023）

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP020** | Error | Factory Key 重复 |
| **DP021** | Error | Factory 与产品契约不匹配 |
| **DP022** | Error | Factory 缺少无参构造函数 |
| **DP023** | Info | 产品类型未用 `[RegisterFactory]` 注册 |

## 注册表 Key（DP025） {#注册表-key-dp025}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP025** | Info | 传入生成 **Strategy** / **Factory** 注册表查找的字符串字面量 key 不在已注册列表中 |

**作用范围：** `IStrategyRegistry<,>` / `IFactoryRegistry<,>` 的 `Get` / `TryGet` / `Create` / `TryCreate`，且 key 参数为字符串字面量（非 `{Contract}Keys` 常量）。

**消息：** 包含契约类型与已注册 key 列表。

**修复：** 优先使用 `{Contract}Keys.*`。拼写接近已知 key 时，**CorrectRegistryKey** CodeFix 可替换为最近键。

另见 [注册表 Key 命名约定](./registry-key-conventions.md)。

## State 转换表（DP026–DP031） {#state-转换表-dp026-dp031}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP026** | Error | `(from state, trigger)` 边重复 |
| **DP027** | Error | `[Transition]` 的 state 非 enum 成员 |
| **DP028** | Error | trigger 非 enum 成员 |
| **DP029** | Error | `[StateMachine]` 的 `Initial` 非 state enum 成员 |
| **DP030** | Error | holder 不是 `static partial` class |
| **DP031** | Info | state enum 成员从未作为 `[Transition]` 的 from（终态提示） |

见 [State 转换表](./state-transition-table.md)。

## CodeFix

`DesignPatterns.CodeFixes` 随 **`Skymly.DesignPatterns`** 元包分发（`analyzers/dotnet/cs`）。下列诊断支持 IDE 一键修复（需 C# Workspaces）：

| 诊断 | CodeFix（摘要） |
|------|----------------|
| **DP006** | 添加 `[RegisterStrategy("key", typeof(TContract))]` |
| **DP023** | 添加 `[RegisterFactory("key", typeof(TContract))]` |
| **DP024** | 添加 `[HandlerOrder(order, typeof(TContext))]` |
| **DP025** | 将字面量替换为最近注册 key |
| DP001 | 添加 `partial` |
| DP015 | 添加 `[CompositeBuildable]` |
| DP004 / DP013 / DP017 / DP021 | 补全契约实现 |
| DP007 / DP009 / DP014 / DP019 / DP022 | 添加无参构造函数 |

生成器 Error（如 DP003、DP020 重复 key）需改 attribute 或类型；不提供 CodeFix。

类别前缀：**`DesignPatterns`**。

英文完整版：[Diagnostics](../diagnostics.md)
