using NUnit.Framework;
using Blazor.IntersectionObserver;
using Blazor.IntersectionObserver.API;
using Moq;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace Tests
{
    [TestFixture]
    public class IntersectionObserverService_ObserveShould
    {
        [Test]
        public async Task ObserveAnElementAndNotifyJSInterop()
        {
            var mockJsRuntime = new Mock<IJSRuntime>();
            var mockOptions = new IntersectionObserverOptions
            {
                RootMargin = "10px 10px 10px 10px",
                Threshold = new List<double> { 0.25, 0.5, 1 }
            };

            var observerService = new IntersectionObserverService(mockJsRuntime.Object);
            var observer = await observerService.Observe(
                It.IsAny<ElementRef>(),
                It.IsAny<Action<IList<IntersectionObserverEntry>>>(),
                mockOptions
            );

            var observerId = observer.Id;

            mockJsRuntime
                .Verify(v => v.InvokeAsync<object>(
                    "BlazorIntersectionObserverJS.observe",
                    It.IsAny<DotNetObjectRef>(),
                    observerId,
                    It.IsAny<ElementRef>(),
                    mockOptions
                ), Times.Once());
        }

    }
}