# Getting started

## Prerequisites

- [.NET SDK 8](https://dotnet.microsoft.com/download) — libraries and samples target `net8.0` (runtime also supports `netstandard2.0`)
- Git

## Install from NuGet (preview)

The meta package is published as **`Skymly.DesignPatterns`** on [nuget.org](https://www.nuget.org/packages/Skymly.DesignPatterns). C# namespaces remain `DesignPatterns.*`.

```xml
<PackageReference Include="Skymly.DesignPatterns" Version="0.2.0-preview2" />
```

::: warning Early preview
Public APIs, generated code, and `DP###` diagnostics are **not stable** yet. Pin the package version or a Git commit until a stability announcement.
:::

**Optional DI:** `DesignPatterns.Extensions.DependencyInjection` is **not** included in the meta package — use a sibling project reference from the main repo until a separate package is published. See [Dependency injection](./dependency-injection.md).

## Clone layout (contributors)

Place repositories as siblings under the **DesignPatterns** project folder:

```
<workspace-root>/
  Skymly/
    DesignPatterns/
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

This runs unit tests, generator Verify snapshots, analyzer tests, and sibling Samples in CI.

## First pattern: Strategy

Reference **`Skymly.DesignPatterns`** (NuGet) or a local pack / project reference. Mark implementations and a partial registry holder:

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

## Documentation site

```bash
cd DesignPatterns.Docs
npm install
npm run docs:dev
```
