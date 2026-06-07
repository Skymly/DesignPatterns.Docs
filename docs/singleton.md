# Singleton

Namespace: `DesignPatterns.Creational`

## Attribute

`[GenerateSingleton]` on a **sealed partial class** with a parameterless constructor. The generator emits `Lazy<T>` backing and a static `Instance` property.

```csharp
[GenerateSingleton]
public sealed partial class AppSettings
{
    public string AppName { get; init; } = "Demo";
}

// Generated: AppSettings.Instance
```

## Diagnostics

- **DP001** — type must be `partial`
- **DP002** — invalid target shape

## Sample

[DesignPatterns.Samples.GenerateSingleton](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.GenerateSingleton)

## Maintainer notes

Full design doc (中文): [DesignPatterns/docs](https://github.com/Skymly/DesignPatterns/tree/main/docs) — see repository `README` for Singleton row in the patterns table.
