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

## 插件程序集（DP033） {#dp033}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP033** | Error | 同一契约的相同 **strategy key** 在**多个被引用的供应商程序集**中重复注册 |

**作用范围：** 宿主编译引用多个插件供应商程序集，且对同一契约使用了相同的 `[RegisterStrategy]` key。

**消息：** 包含 key、契约类型与冲突程序集名称。

**修复：** 各供应商使用不同 key，或每个契约维度只引用一个供应商。单程序集内重复 key 仍由 **DP003**（生成器）报告。

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

## State guard（DP032、DP034–DP035） {#dp032}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP032** | Error | `[Transition(Guard = nameof(Method))]` guard 方法在 holder 类上未找到 |
| **DP034** | Error | guard 方法非 `static`（防御性 — C# 编译器先于生成器拒绝 static 类的实例方法） |
| **DP035** | Error | guard 方法签名错误（须为 `static bool Method(TState, TTrigger)`） |

## State 字面量边（DP036） {#dp036}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP036** | Info | `TryTransition` 以字面量 `(state, trigger)` 调用，但未匹配任何 `[Transition]` 声明的边 |

## State entry/exit action（DP037–DP039） {#dp037}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP037** | Error | `[Transition(OnEnter/OnExit = nameof(Method))]` action 方法在 holder 类上未找到 |
| **DP038** | Error | action 方法非 `static`（实际不可达 — CS0708 先触发；保留供完整性） |
| **DP039** | Error | action 方法签名错误（须为 `static void Method(TState, TState, TTrigger)` 或 `static ValueTask Method(TState, TState, TTrigger, CancellationToken)`） |

## Composite DI + Visitor（DP040–DP041） {#dp040}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP040** | Error | `BuildRoot(IServiceProvider)` 调用时 composite 节点未注册到容器 |
| **DP041** | Info | 生成的 `I{Contract}NodeVisitor` 未覆盖所有节点类型（保留 ID — C# 编译器通过接口实现 CS0535 自动强制覆盖，诊断不实际触发） |

## Decorator DI + async（DP042–DP043） {#dp042}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP042** | Error | async decorator 方法签名错误（`DecorateAsync` 须返回 `ValueTask<TService>`） |
| **DP043** | Error | async decorator 在 `Build(IServiceProvider, core)` 时无法从 DI 解析 |

## EventAggregator（DP044–DP046） {#dp044}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP044** | Info | 类型实现 `IEventHandler<T>` 但未标注 `[RegisterEventHandler]` |
| **DP045** | Error | 同一 handler 对同一 event type 重复标注 `[RegisterEventHandler]` |
| **DP046** | Error | 类型标注了 `[RegisterEventHandler<T>]` 但未实现 `IEventHandler<T>` |

## Strategy guard（DP047–DP049） {#dp047}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP047** | Error | `[RegisterStrategy(Guard = nameof(Method))]` guard 方法在策略类上未找到 |
| **DP048** | Error | guard 方法非 `static` |
| **DP049** | Error | guard 方法签名错误（须为 `static bool Method(TKey)`） |

## Handler guard（DP050–DP052） {#dp050}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP050** | Error | `[HandlerOrder(Guard = nameof(Method))]` guard 方法在 handler 类上未找到 |
| **DP051** | Error | guard 方法非 `static` |
| **DP052** | Error | guard 方法签名错误（须为 `static bool Method(TContext)`） |

## Factory async + 池化（DP053–DP055） {#dp053}

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP053** | Error | `[RegisterFactory(IsAsync = true)]` 但工厂未实现 `IAsyncFactory<T>` |
| **DP054** | Error | `PoolSize` 为负数（须 ≥ 0；0 禁用池化） |
| **DP055** | Warning | `PoolSize` > 1024（可能导致内存占用过高） |

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
