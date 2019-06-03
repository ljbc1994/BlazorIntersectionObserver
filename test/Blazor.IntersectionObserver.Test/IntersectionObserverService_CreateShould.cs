using NUnit.Framework;
using Blazor.IntersectionObserver;
using Blazor.IntersectionObserver.API;
using Moq;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Components;

namespace Tests
{
    [TestFixture]
    public class IntersectionObserverService_CreateShould
    {
        [Test]
        public async Task CreateAnObserverAndNotifyJSInterop()
        {
            var mockJsRuntime = new Mock<IJSRuntime>();

            var testOptions = new IntersectionObserverOptions {
                RootMargin = "10px 10px 10px 10px",
                Threshold = new List<double> { 0.25, 0.5, 1 }
            };

            var observerService = new IntersectionObserverService(mockJsRuntime.Object);
            var observer = await observerService.Create(
                It.IsAny<Action<IList<IntersectionObserverEntry>>>(),
                testOptions
            );

            mockJsRuntime
                .Verify(v => v.InvokeAsync<object>(
                    "BlazorIntersectionObserverJS.create",
                    It.IsAny<DotNetObjectRef>(),
                    It.IsAny<string>(),
                    testOptions
                ), Times.Once());
        }

        [Test]
        public async Task CreateAnObserverAndObserveMultipleElements()
        {
            var mockJsRuntime = new Mock<IJSRuntime>();

            var testOptions = new IntersectionObserverOptions
            {
                RootMargin = "10px 10px 10px 10px"
            };
            var testElement = new ElementRef();

            var observerService = new IntersectionObserverService(mockJsRuntime.Object);
            var observer = await observerService.Create(
                It.IsAny<Action<IList<IntersectionObserverEntry>>>(),
                testOptions
            );

            var observerId = observer.Id;

            observer.Observe(testElement);

            mockJsRuntime
                .Verify(v => v.InvokeAsync<object>(
                    "BlazorIntersectionObserverJS.create",
                    It.IsAny<DotNetObjectRef>(),
                    It.IsAny<string>(),
                    testOptions
                ), Times.Once());

            mockJsRuntime
                .Verify(v => v.InvokeAsync<object>(
                    "BlazorIntersectionObserverJS.observeElement",
                    observerId,
                    testElement
                ), Times.Once());
        }

        [Test]
        public async Task CreateMultipleObserversAndNotifyJSInterop()
        {
            var mockJsRuntime = new Mock<IJSRuntime>();
            var testOptions = new List<IntersectionObserverOptions>
            {
                new IntersectionObserverOptions { Threshold = new List<double> { 0.25 } },
                new IntersectionObserverOptions { Threshold = new List<double> { 0.1 } }
            };

            var observerService = new IntersectionObserverService(mockJsRuntime.Object);

            var createTasks = testOptions.Select(option =>
            {
                return observerService.Create(
                    It.IsAny<Action<IList<IntersectionObserverEntry>>>(),
                    option
                );
            });

            await Task.WhenAll(createTasks);

            mockJsRuntime
                .Verify(v => v.InvokeAsync<object>(
                    "BlazorIntersectionObserverJS.create",
                    It.IsAny<DotNetObjectRef>(),
                    It.IsAny<string>(),
                    It.IsAny<IntersectionObserverOptions>()
                ), Times.Exactly(2));
        }
    }
}