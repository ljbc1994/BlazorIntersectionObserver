# BlazorIntersectionObserver

[![Package Version](https://img.shields.io/nuget/v/BlazorIntersectionObserver.svg)](https://www.nuget.org/packages/BlazorIntersectionObserver)
[![NuGet Downloads](https://img.shields.io/nuget/dt/BlazorIntersectionObserver.svg)](https://www.nuget.org/packages/BlazorIntersectionObserver)
[![License](https://img.shields.io/github/license/ljbc1994/BlazorIntersectionObserver.svg)](https://github.com/ljbc1994/BlazorIntersectionObserver/blob/master/LICENCE)
[![Build Status](https://dev.azure.com/ljbc94/BlazorIntersectionObserver/_apis/build/status/ljbc1994.BlazorIntersectionObserver?branchName=master)](https://dev.azure.com/ljbc94/BlazorIntersectionObserver/_build/latest?definitionId=1&branchName=master)

> A comprehensive wrapper around the Intersection Observer API, giving you all the goodness of observing intersections in a performant way.

This is a wrapper around the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) so that you can use it in `Blazor` for .NET 5. It has the same API structure with convenience methods and components for a better dev experience. It works with both Blazor WebAssembly and Blazor Server. 

## Get Started

### 1. Installation

Install `BlazorIntersectionObserver` through NuGet.

```bash
> dotnet add package BlazorIntersectionObserver
```

### 2. Register the service

Now you'll need to add the service to the service configuration.

#### WebAssembly (Program.cs)

```cs
public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebAssemblyHostBuilder.CreateDefault(args);
        builder.Services.AddIntersectionObserver();
    }
}
```

*OR*

#### Server (Startup.cs)

```cs
public class Startup {
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddIntersectionObserver();
    }
}
```

### 3. Use it!

For the quickest setup, use the `IntersectionObserve` component. This provides an implicit context
object which contains the observer entry! Easy!

#### Component setup

```razor
@using Blazor.IntersectionObserver

<IntersectionObserve>
    <div @ref="context.Ref.Current">
        Hey... I'm @(context.IsIntersecting ? "in view": "out of view")
    </div>
</IntersectionObserve>
```

*OR*

#### Service setup

To directly use the service, you just need to inject it and observe the element(s).

```razor
@using Blazor.IntersectionObserver
@inject IIntersectionObserverService ObserverService

<img @ref="ImageElement" src="@(IsIntersecting ? "https://www.placecage.com/g/500/500" : "")"/>

@functions {
    public ElementReference ImageElement { get; set; }
    public bool IsIntersecting { get; set; }
    
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender) 
        {
            await SetupObserver();
        }
    }

    public async void SetupObserver()
    {
        await ObserverService.Observe(ImageElement, (entries) =>
        {
            var entry = entries.FirstOrDefault();
            IsIntersecting = entry.IsIntersecting;
            StateHasChanged();
        });
    }
}
```

## Documentation and Usage

### Options

You can pass through `options` to the `ObserverService` methods, these are the same as the Intersection Observer API options.

#### Example

```cs
var options = new IntersectionObserverOptions {
    Root = BodyRef, 
    Threshold = new List<double> { 0.25, 0.5, 1 },
    RootMargin = "10px 10px 10px 10px"
};
```

### Service Methods

#### `Observe`

This a shorthand way of observing an element by providing:
- The element you want to observe.
- The callback to trigger on an intersection update.
- The intersection observer options.

This returns an `IntersectionObserver` instance, allowing you to `disconnect` the observer or `unobserve` an element. Or if you wish, observe additional elements.

```cs
var observer = await ObserverService.Observe(ElementRef, (entries) => {
    IsIntersecting = entries.FirstOrDefault().IsIntersecting;
    StateHasChanged();
}, options);
```

#### `Create`

The `Create` method follows the same approach as the Intersection Observer API, you create the observer and then pass elements you wish to observe by calling the `Observe` method on the observer instance. To create the observer, provide the following:

- The callback to trigger on an intersection update.
- The intersection observer options.

This returns an `IntersectionObserver` instance, allowing you to `Observe` elements. This also provides the ability to `disconnect` or `unobserve` the element.

```cs
var observer = await ObserverService.Create((entries) => {
    IsIntersecting = entries.FirstOrDefault().IsIntersecting;
    StateHasChanged();
}, options);

await observer.Observe(FirstImage);
await observer.Unobserve(FirstImage);
```

### `IntersectionObserver` Methods

#### `Observe` 

To observe an element, provide the element reference to the `IntersectionObserver` instance by calling `Observe`.

```cs
observer.Observe(ElementReference);
```

#### `Unobserve`
To unobserve an element, provide the element reference to the `IntersectionObserver` instance by calling `Unobserve`.

```cs
observer.Unobserve(ElementReference);
```

#### `Disconnect`
To disconnect the observer, call `Disconnect` on the `IntersectionObserver` instance.

```cs
observer.Disconnect();
```

This will remove all the observed elements from the observer, i.e.

```razor
@using Blazor.IntersectionObserver
@implements IAsyncDisposable
@inject IIntersectionObserverService ObserverService

<div @ref="ImageRef"></div>

@functions {
    private IntersectionObserver Observer;
    @* Code... *@

    public async ValueTask DisconnectAll()
    {
        if (this.Observer != null)
        {
            await this.Observer.Disconnect();
        }
    }
}

```

#### `Dispose`
To remove the observer, call `Dispose` on the `IntersectionObserver` instance.

```cs
observer.Dispose();
```

This is a useful method to clean up observers when components are disposed of, i.e.

```razor
@using Blazor.IntersectionObserver
@implements IAsyncDisposable
@inject IIntersectionObserverService ObserverService

<div @ref="ImageRef"></div>

@functions {
    private IntersectionObserver Observer;
    @* Code... *@

    public async ValueTask DisposeAsync()
    {
        if (this.Observer != null)
        {
            await this.Observer.Dispose();
        }
    }
}

```

### Component

#### `<IntersectionObserve>`

Rather than directly interfacing with the service, you can use this convenience component for quick and easy observing. You can access the observer entry through the implicit `@context`!

You need to make sure to provide the reference of the element you want to observe, this is done by passing the element reference to the context reference.

```razor
@* Injecting service... *@

<IntersectionObserve>
    <div @ref="context.Ref.Current">
        Hey... look I'm @(context.IsIntersecting ? "intersecting!": "not intersecting!")
    </div>
</IntersectionObserve>

@* Component code... *@
```

##### Props

- `OnChange` (`EventCallback<IntersectionObserverEntry>`) - When the intersection observer has a entry update.  
- `IsIntersecting` (`bool`) - Whether the element is intersecting - used for two-way binding.
- `Options` (`IntersectionObserverOptions`) - The options for the observer.
- `Once` (`bool`) - Only observe once for an intersection, then the instance disposes of itself.

#### Context 
The context is the `IntersectionObserverContext` object, with the following signature:

```cs
public class IntersectionObserverContext 
{
    public IntersectionObserverEntry Entry { get; set; }
    public ForwardReference Ref { get; set; } = new ForwardReference();
    public bool IsIntersecting => this.Entry?.IsIntersecting ?? false;
}

public class IntersectionObserverEntry
{
    public bool IsIntersecting { get; set; }

    public double IntersectionRatio { get; set; }

    public DOMRectReadOnly BoundingClientRect { get; set; }

    public DOMRectReadOnly RootBounds { get; set; }

    public bool IsVisible { get; set; }

    public double Time { get; set; }
}
```

## Feature Requests
There's so much that `IntersectionObserver` can do, so if you have any requests or you want better documentation and examples, feel free to make a pull request or create an issue!






