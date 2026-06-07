# Getting started

## Prerequisites

- [.NET SDK 8](https://dotnet.microsoft.com/download) — libraries and samples target `net8.0` (runtime also supports `netstandard2.0`)
- Git

## Clone layout

Place repositories as siblings under your workspace (same layout as [Observables](https://github.com/Skymly/Observables)):

```
Skymly/
  DesignPatterns/
  DesignPatterns.Samples/
  DesignPatterns.Docs/    ← this site
```

```powershell
git clone https://github.com/Skymly/DesignPatterns.git
git clone https://github.com/Skymly/DesignPatterns.Samples.git
```

## Build the generator solution

```powershell
cd DesignPatterns
./build.ps1 --target Ci --configuration Release
```

This runs unit tests, generator Verify snapshots, analyzer tests, and in-repo samples.

## First pattern: Strategy

Add a project reference to the **DesignPatterns** meta package (local pack or future NuGet). Mark implementations and a partial registry holder:

```csharp
public interface IPaymentStrategy
{
    string Pay(decimal amount);
}

[RegisterStrategy(typeof(IPaymentStrategy), "alipay")]
public sealed class AlipayPayment : IPaymentStrategy
{
    public string Pay(decimal amount) => $"Alipay:${amount}";
}

public static partial class PaymentStrategyRegistry
{
    // Generator emits Keys, Instance, and optional RegisterDi
}
```

Use the generated registry:

```csharp
var alipay = PaymentStrategyRegistry.Instance.Get(PaymentStrategyKeys.Alipay);
```

See [Strategy](./strategy.md) and [DesignPatterns.Samples.Strategy](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.Strategy).

## NuGet (when published)

The meta package **`DesignPatterns`** bundles runtime + source generator. **`DesignPatterns.Extensions.DependencyInjection`** is a separate package for MSDI integration.

Until packages appear on nuget.org, use sibling `ProjectReference` or local `dotnet pack` output from `DesignPatterns.Package`.

## Documentation site

```bash
cd DesignPatterns.Docs
npm install
npm run docs:dev
```
