using Blazor.IntersectionObserver.API;

namespace Blazor.IntersectionObserver
{
    public class IntersectionObserverContext
    {
        public IntersectionObserverEntry Entry { get; set; }
        public ForwardReference Ref { get; set; } = new ForwardReference();
        public bool IsIntersecting => this.Entry?.IsIntersecting ?? false;
    }
}
