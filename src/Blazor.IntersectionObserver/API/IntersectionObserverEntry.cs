using Microsoft.AspNetCore.Components;

namespace Blazor.IntersectionObserver.API
{
    public class IntersectionObserverEntry
    {
        public ElementRef Target { get; set; }

        public bool IsIntersecting { get; set; }

        public double IntersectionRatio { get; set; }

        public DOMRectReadOnly BoundingClientRect { get; set; }

        public DOMRectReadOnly RootBounds { get; set; }

        public bool IsVisible { get; set; }

        public double Time { get; set; }
    }
}
