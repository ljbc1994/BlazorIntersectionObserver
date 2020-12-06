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
> dotnet add package Blazor.IntersectionObserver
```

### 2. Register the service

Now you'll need to add the service to the service configuration.

```cs
using Blazor.IntersectionObserver;

public class Startup
{
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
@using Blazor.IntersectionObserver.Components

<IntersectionObserve>
    <div>
        Hey... look I'm @(context?.IsIntersecting ? "in view": "out of view")
    </div>
</IntersectionObserve>
```

*OR*

#### Service setup

To directly use the service, you just need to inject it and observe the element(s).

```razor
@using Blazor.IntersectionObserver
@inject IntersectionObserverService ObserverService

<img ref="ImageElement" src="@(IsIntersecting ? "https://www.placecage.com/g/500/500" : "")"/>

@functions {
    public ElementRef ImageElement { get; set; }
    public bool IsIntersecting { get; set; }
    
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender) 
        {
            SetupObserver();
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
var observer = ObserverService.Observe(ElementRef, (entries) => {
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
var observer = ObserverService.Create((entries) => {
    IsIntersecting = entries.FirstOrDefault().IsIntersecting;
    StateHasChanged();
}, options);

observer.Observe(FirstImage);
observer.Unobserve(FirstImage);
```

### `IntersectionObserver` Methods

#### `Observe` 

To observe an element, provide the element reference to the `IntersectionObserver` instance by calling `Observe`.

```cs
observer.Observe(ElementRef);
```

#### `Unobserve`
To unobserve an element, provide the element reference to the `IntersectionObserver` instance by calling `Unobserve`.

```cs
observer.Unobserve(ElementRef);
```

#### `Disconnect`
To disconnect the observer, call `Disconnect` on the `IntersectionObserver` instance.

```cs
observer.Disconnect();
```

This is a useful method to clean up observers when components are disposed of, i.e.

```razor
@using Blazor.IntersectionObserver
@implements IAsyncDisposable
@inject IntersectionObserverService ObserverService

<div ref="NicolasCageRef"></div>

@functions {
    private IntersectionObserver Observer;
    @* Code... *@

    public async ValueTask DisposeAsync()
    {
        if (this.Observer != null)
        {
            await this.Observer.Disconnect();
        }
    }
}

```

### Component

#### `<IntersectionObserve>`

Rather than directly interfacing with the service, you can use this convenience component for quick and easy observing. You can access the observer entry through the implicit `@context`!

```razor
@* Injecting service... *@

<IntersectionObserve>
    <div>
        Hey... look I'm @(context?.IsIntersecting ? "intersecting!": "not intersecting!")
    </div>
</IntersectionObserve>

@* Component code... *@
```

##### Props

- `OnChange` (`EventCallback<IntersectionObserverEntry>`) - When the intersection observer has a entry update.  
- `IsIntersecting` (`bool`) - Whether the element is intersecting - used for two-way binding.
- `Options` (`IntersectionObserverOptions`) - The options for the observer.
- `Once` (`bool`) - Only observe once for an intersection, then the instance disposes of itself.
- `Style` (`string`) - The style for the element.
- `Class` (`string`) - The class for the element.


## Implementation Detail
To avoid creating an unnecessary number of observers for every element being observed, if a `Blazor Observer` shares exactly the same options as another, they will both use the same `IntersectionObserver` instance in JS. As each `Blazor Observer` has a unique id and callback, the elements that are being observed will still be passed to their respective `Blazor Observer`.

## Feature Requests
There's so much that `IntersectionObserver` can do, so if you have any requests or you want better documentation and examples, feel free to make a pull request or create an issue!






