namespace Ljbc1994.Blazor.IntersectionObserver.API
{
    public class IntersectionObserverEntry
    {
        public bool IsIntersecting { get; set; }

        public double IntersectionRatio { get; set; }

        public DOMRectReadOnly BoundingClientRect { get; set; }

        public DOMRectReadOnly RootBounds { get; set; }

        public bool IsVisible { get; set; }

        public double Time { get; set; }
    }
}
