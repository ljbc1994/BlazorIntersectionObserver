using NUnit.Framework;
using Blazor.IntersectionObserver;
using Blazor.IntersectionObserver.API;
using Moq;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Blazor.IntersectionObserver.Test.Configuration;

namespace Tests
{
    [TestFixture]
    public class IntersectionObserverService_ObserverShould
    {
        [Test]
        public async Task UnobserveAnElementAndNotifyJSInterop()
        {
            var mockJsRuntime = new Mock<IJSRuntime>();

            mockJsRuntime
                .Setup(x => x.InvokeAsync<bool>(
                    Constants.UNOBSERVE,
                    It.IsAny<string>(),
                    It.IsAny<ElementRef>()
                ))
                .ReturnsAsync(true);

            var mockOptions = new IntersectionObserverOptions
            {
                RootMargin = "10px 10px 10px 10px",
                Threshold = new List<double> { 0.25, 0.5, 1 }
            };
            var testElementRef = new ElementRef();

            var observerService = new IntersectionObserverService(mockJsRuntime.Object);
            var observer = await observerService.Observe(
                testElementRef,
                It.IsAny<Action<IList<IntersectionObserverEntry>>>(),
                mockOptions
            );

            var observerId = observer.Id;

            observer.Unobserve(It.IsAny<ElementRef>());

            mockJsRuntime
                .Verify(v => v.InvokeAsync<bool>(
                    Constants.UNOBSERVE,
                    observerId,
                    testElementRef
                ), Times.Once());
        }

        [Test]
        public async Task DisconnectAnObserverCallbackAndNotifyJSInterop()
        {
            var mockJsRuntime = new Mock<IJSRuntime>();

            mockJsRuntime
                .Setup(x => x.InvokeAsync<bool>(
                    Constants.DISCONNECT,
                    It.IsAny<string>()
                ))
                .ReturnsAsync(true);

            var mockOptions = new IntersectionObserverOptions();

            var observerService = new IntersectionObserverService(mockJsRuntime.Object);
            var observer = await observerService.Observe(
                It.IsAny<ElementRef>(),
                It.IsAny<Action<IList<IntersectionObserverEntry>>>(),
                mockOptions
            );

            var observerId = observer.Id;

            observer.Disconnect();

            mockJsRuntime
                .Verify(v => v.InvokeAsync<bool>(
                    Constants.DISCONNECT,
                    observerId
                ), Times.Once());
        }

        [Test]
        public async Task FromJSInteropTriggerObserverCallback()
        {
            var mockJsRuntime = new Mock<IJSRuntime>();
            var mockOnIntersect = new Mock<Action<IList<IntersectionObserverEntry>>>();
            var testEntries = new List<IntersectionObserverEntry> {
                new IntersectionObserverEntry {
                    IsVisible = true
                },
                new IntersectionObserverEntry {
                    IsIntersecting = true,
                    IsVisible = true,
                    IntersectionRatio = 1.0,
                    BoundingClientRect = new DOMRectReadOnly(),
                    RootBounds = new DOMRectReadOnly(),
                    Target = new ElementRef()
                }
            };

            var mockOptions = new IntersectionObserverOptions();

            var observerService = new IntersectionObserverService(mockJsRuntime.Object);

            var observer = await observerService.Observe(
                It.IsAny<ElementRef>(),
                mockOnIntersect.Object,
                mockOptions
            );

            observerService.OnCallback(observer.Id, testEntries);

            mockOnIntersect
                .Verify(v => v.Invoke(testEntries), Times.Once());
        }
    }
}