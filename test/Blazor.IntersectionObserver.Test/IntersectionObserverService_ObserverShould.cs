using NUnit.Framework;
using Blazor.IntersectionObserver;
using Blazor.IntersectionObserver.API;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Blazor.IntersectionObserver.Test.Wrappers;

namespace Tests
{
    [TestFixture]
    public class IntersectionObserverService_ObserverShould
    {
        [Test]
        public async Task CreateObserver()
        {
            var jsRuntime = new JSRuntimeWrapper();
            var mockOnIntersect = new Mock<Action<IList<IntersectionObserverEntry>>>();

            var mockOptions = new IntersectionObserverOptions
            {
                RootMargin = "10px 10px 10px 10px",
                Threshold = new List<double> { 0.25, 0.5, 1 }
            };
            
            var observerService = new IntersectionObserverService(jsRuntime);

            var observer = await observerService.Create(mockOnIntersect.Object, mockOptions);

            Assert.IsNotNull(observer);
            Assert.IsNotNull(observer.Id);
        }

        [Test]
        public async Task CreateAndObserveObserver()
        {
            var jsRuntime = new JSRuntimeWrapper();
            var mockOnIntersect = new Mock<Action<IList<IntersectionObserverEntry>>>();

            var mockOptions = new IntersectionObserverOptions
            {
                RootMargin = "10px 10px 10px 10px",
                Threshold = new List<double> { 0.25, 0.5, 1 }
            };

            var elementRef = new ElementReference();

            var observerService = new IntersectionObserverService(jsRuntime);

            var observer = await observerService.Observe(elementRef, mockOnIntersect.Object, mockOptions);

            Assert.IsNotNull(observer);
            Assert.IsNotNull(observer.Id);
        }

        [Test]
        public async Task FromJSInteropTriggerObserverCallback()
        {
            var mockJsRuntime = new JSRuntimeWrapper();
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
                    Target = new ElementReference()
                }
            };

            var mockOptions = new IntersectionObserverOptions();

            var observerService = new IntersectionObserverService(mockJsRuntime);

            var observer = await observerService.Observe(
                It.IsAny<ElementReference>(),
                mockOnIntersect.Object,
                mockOptions
            );

            observerService.OnCallback(observer.Id, testEntries);

            mockOnIntersect
                .Verify(v => v.Invoke(testEntries), Times.Once());
        }
    }
}