using Ljbc1994.Blazor.IntersectionObserver.API;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ljbc1994.Blazor.IntersectionObserver
{
    public interface IIntersectionObserverService
    {
        Task<IntersectionObserver> Create(
            Action<IList<IntersectionObserverEntry>> onIntersectUpdate,
            IntersectionObserverOptions options = null
        );

        Task<IntersectionObserver> Observe(
           ElementReference element,
           Action<IList<IntersectionObserverEntry>> onIntersectUpdate,
           IntersectionObserverOptions options = null
       );

       void OnCallback(string id, IList<IntersectionObserverEntry> entries);
    }
}
