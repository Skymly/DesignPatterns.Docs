# Dependency Injection

Package: **`Skymly.DesignPatterns.Extensions.DependencyInjection`**

## Overview

Optional Microsoft.Extensions.DependencyInjection integration. Does not replace container lifetime rules — it registers generated registries and resolves implementations from `IServiceProvider`.

## Manual registration

Extension methods such as:

- `AddStrategyRegistry<TKey, TStrategy>(...)`
- `AddFactoryRegistry<TKey, TProduct>(...)`
- `AddAsyncFactoryRegistry<TKey, TProduct>(...)`
- `AddPooledFactoryRegistry<TKey, TProduct>(..., poolSize)`
- `AddHandlerPipeline<TContext>(...)`
- `AddTransitionTable<TState, TTrigger>(...)`
- `AddStateMachine<TState, TTrigger>(...)`

### Async factory registry

```csharp
services.AddAsyncFactoryRegistry<string, IProduct>(builder =>
{
    builder.Register("standard", ct => new ValueTask<IProduct>(new StandardProduct()));
});
```

### Pooled factory registry

```csharp
services.AddPooledFactoryRegistry<string, IProduct>(builder =>
{
    builder.Register("buffer", () => new BufferProduct());
}, poolSize: 16);
```

### State machine

```csharp
services.AddTransitionTable<OrderStatus, OrderTrigger>();
services.AddStateMachine<OrderStatus, OrderTrigger>();
```

Use `ServiceLifetime.Transient` for `AddStateMachine` when each consumer needs its own state tracking.

## Generated `RegisterDi`

When the DI package (or its MSBuild targets) is referenced, Strategy / Factory / Handler / State / Composite / Decorator / EventAggregator generators emit:

```csharp
PaymentStrategyRegistry.RegisterDi(services);
OrderStatusStateMachine.RegisterDi(services);
MenuNodeCompositeCatalog.RegisterDi(services);
PaymentServiceDecoratorStack.RegisterDi(services);
OrderPlacedEventHandlerRegistry.RegisterDi(services);
```

Registries register as singletons by default. **Factory** registries default to `Transient` for implementation types (matching factory semantics — each `Create` returns a new instance).

## Project setup

Reference `DesignPatterns.Extensions.DependencyInjection` and import its targets (see package / sibling project `build/DesignPatterns.Extensions.DependencyInjection.targets`).

Set `DesignPatternsSampleKind=DependencyInjection` in sample projects for the shared MSBuild imports in DesignPatterns.Samples.

## Sample

[DesignPatterns.Samples.DependencyInjection](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.DependencyInjection)

## Note on meta package

The core **`Skymly.DesignPatterns`** NuGet meta package does **not** include DI or Autofac extensions. Install them separately from nuget.org:

- [`Skymly.DesignPatterns.Extensions.DependencyInjection`](https://www.nuget.org/packages/Skymly.DesignPatterns.Extensions.DependencyInjection)
- [`Skymly.DesignPatterns.Extensions.Autofac`](https://www.nuget.org/packages/Skymly.DesignPatterns.Extensions.Autofac)

## Autofac integration

The **`Skymly.DesignPatterns.Extensions.Autofac`** package provides Autofac integration symmetric to the MSDI `RegisterDi` pattern. When referenced, the source generator emits `RegisterAutofac(ContainerBuilder)` and `Create(ILifetimeScope)` methods for Strategy, Factory, Handler, and State registries.

```csharp
var builder = new ContainerBuilder();
PaymentStrategyRegistry.RegisterAutofac(builder);

using var container = builder.Build();
var registry = container.Resolve<IStrategyRegistry<string, IPaymentStrategy>>();
```

`RegisterAutofac` accepts optional parameters:
- `sharing` — `InstanceSharing.Shared` (default, `SingleInstance()`) or `InstanceSharing.None` (`InstancePerDependency()`)
- `serviceKey` — optional key for keyed registration

The Autofac extension can be referenced alongside `Skymly.DesignPatterns.Extensions.DependencyInjection` — both `RegisterDi` and `RegisterAutofac` methods are generated. The Autofac extension is **not** included in the meta package; reference it separately.
