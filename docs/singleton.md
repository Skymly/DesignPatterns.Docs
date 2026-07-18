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

## Async initialization

Set `InitializeAsync` to the name of a static initializer returning `Task` or
`ValueTask`. The generator validates the signature and emits
`GetInstanceAsync()` instead of the synchronous `Instance` property.

```csharp
[GenerateSingleton(InitializeAsync = nameof(InitializeAsync))]
public sealed partial class AppSettings
{
    public bool IsInitialized { get; private set; }

    public static ValueTask InitializeAsync(
        AppSettings instance,
        CancellationToken cancellationToken)
    {
        instance.IsInitialized = true;
        return ValueTask.CompletedTask;
    }
}

var settings = await AppSettings.GetInstanceAsync();
```

## Diagnostics

- **DP001** — type must be `partial`
- **DP002** — invalid target shape
- **DP067** — async initializer has an invalid signature
- **DP068** — generated Singleton is also registered as a DI Singleton
- **DP069** — non-thread-safe generated Singleton contains mutable instance state
- **DP070** — mutable static Singleton candidate
- **DP071** — mutable static Singleton is also registered as a DI Singleton

## Sample

[DesignPatterns.Samples.GenerateSingleton](https://github.com/Skymly/DesignPatterns.Samples/tree/main/DesignPatterns.Samples.GenerateSingleton)

## Maintainer notes

Full design doc (中文): [DesignPatterns/docs](https://github.com/Skymly/DesignPatterns/tree/main/docs) — see repository `README` for Singleton row in the patterns table.
