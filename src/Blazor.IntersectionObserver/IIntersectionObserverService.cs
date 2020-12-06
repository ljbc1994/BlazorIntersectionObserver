using Blazor.IntersectionObserver.API;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.IntersectionObserver
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
