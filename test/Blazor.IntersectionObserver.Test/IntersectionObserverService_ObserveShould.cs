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
    public class IntersectionObserverService_ObserveShould
    {
        [Test]
        public async Task ObserveAnElementAndNotifyJSInterop()
        {
            var mockJsRuntime = new Mock<IJSRuntime>();
            var testOptions = new IntersectionObserverOptions
            {
                RootMargin = "10px 10px 10px 10px",
                Threshold = new List<double> { 0.25, 0.5, 1 }
            };
            var testElementRef = new ElementRef();

            var observerService = new IntersectionObserverService(mockJsRuntime.Object);
            var observer = await observerService.Observe(
                testElementRef,
                It.IsAny<Action<IList<IntersectionObserverEntry>>>(),
                testOptions
            );

            var observerId = observer.Id;

            mockJsRuntime
                .Verify(v => v.InvokeAsync<object>(
                    Constants.OBSERVE,
                    It.IsAny<DotNetObjectRef>(),
                    observerId,
                    testElementRef,
                    testOptions
                ), Times.Once());
        }

    }
}