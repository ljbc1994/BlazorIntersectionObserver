using Microsoft.AspNetCore.Components;
using System.Collections.Generic;

namespace Blazor.IntersectionObserver
{
    public class IntersectionObserverOptions
    {
        public ElementRef? Root { get; set; }

        public IList<double> Threshold { get; set; } = new List<double> { 1.0 };

        public string RootMargin { get; set; } = "0px";
    }
}
