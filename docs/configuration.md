# Configuration

Package: **`Skymly.DesignPatterns.Extensions.Configuration`**

Maps **`IConfiguration`** string values to **`IStrategyRegistry<string, TContract>`** lookups — useful when a host selects a strategy implementation by configuration key instead of a hand-written `switch`.

Works with generated `{Contract}Registry` / `{Contract}Keys` from `[RegisterStrategy]` (see [Strategy](./strategy.md)).

## Install

Not included in the `Skymly.DesignPatterns` meta package:

```powershell
dotnet add package Skymly.DesignPatterns.Extensions.Configuration --version 0.2.3-preview2
```

```xml
<PackageReference Include="Skymly.DesignPatterns.Extensions.Configuration" Version="0.2.3-preview2" />
```

Targets: `netstandard2.0` and `net8.0`. Depends on `Microsoft.Extensions.Configuration.Abstractions`.

## API

```csharp
using DesignPatterns.Extensions.Configuration;
using Microsoft.Extensions.Configuration;

IConfiguration configuration = /* host configuration */;

// Throws RegistryConfigurationException when the key cannot be resolved.
var card = RegistryConfiguration.ResolveConfigured(
    CardMotionRegistry.Instance,
    configuration,
    configurationKey: "Card",
    defaultKey: CardMotionKeys.Alpha);

// Non-throwing variant.
if (RegistryConfiguration.TryResolveConfigured(
        CardMotionRegistry.Instance,
        configuration,
        "Card",
        out var motion,
        defaultKey: CardMotionKeys.Alpha))
{
    // use motion
}
```

### Resolution order

1. Read `IConfiguration[configurationKey]`.
2. When the value is missing or whitespace, use `defaultKey` when provided.
3. Call `registry.TryGet(strategyKey, out implementation)`.

Prefer `{Contract}Keys` constants for `defaultKey` so call sites stay DP025-safe.

### Failure messages

`RegistryConfigurationException` includes the configuration key, the configured value (or default), and the registry `Keys` list:

```text
Configuration key 'Card' has value 'beta' which is not registered. Registered keys: alpha, gamma.
```

## Host example

```csharp
using DesignPatterns.Extensions.Configuration;
using Microsoft.Extensions.Configuration;

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

var card = RegistryConfiguration.ResolveConfigured(
    CardMotionRegistry.Instance,
    configuration,
    "Card",
    defaultKey: CardMotionKeys.Alpha);
```

## Legacy App.config hosts

There is **no** dedicated `ConfigurationManager.AppSettings` extension package. Map AppSettings into `IConfiguration` in the host (an indexer adapter is enough for `RegistryConfiguration`), then call the same API.

See the [PluginAssemblies sample host](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.PluginAssemblies/Host) for a minimal adapter, and [Samples](./samples.md) for NuGet vs sibling consumption.

## Related

- [Strategy](./strategy.md)
- [Dependency injection](./dependency-injection.md) (Autofac / MSDI)
- [Diagnostics](./diagnostics.md) (DP025, DP033)
- Maintainer notes: [Configuration.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/Configuration.md), [PluginAssemblies.md](https://github.com/Skymly/DesignPatterns/blob/main/docs/PluginAssemblies.md)
