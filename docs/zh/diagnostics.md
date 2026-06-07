# 诊断

DesignPatterns 源生成器与分析器发出的编译器诊断。ID 定义于 `DesignPatterns.Diagnostics.DiagnosticIds`。

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
| **DP006** | Warning | 实现类型未用 `[RegisterStrategy]` 注册 |
| **DP007** | Error | 缺少无参构造函数 |

## 责任链（DP005、DP008–DP009、DP024）

| ID | 级别 | 触发条件 |
|----|------|----------|
| **DP005** | Error | `[HandlerOrder]` 顺序重复 |
| **DP008** | Error | Handler 未实现管道契约 |
| **DP009** | Error | Handler 缺少无参构造函数 |
| **DP024** | Warning | Handler 未用 `[HandlerOrder]` 注册 |

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
| **DP023** | Warning | 产品类型未用 `[RegisterFactory]` 注册 |

## CodeFix

`DesignPatterns.CodeFixes` 为部分警告（如 DP024）提供修复。类别前缀：**`DesignPatterns`**。

英文完整版：[Diagnostics](../diagnostics.md)
