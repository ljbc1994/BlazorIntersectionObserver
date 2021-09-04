using Ljbc1994.Blazor.IntersectionObserver.API;

namespace Ljbc1994.Blazor.IntersectionObserver
{
    public class IntersectionObserverContext
    {
        public IntersectionObserverEntry Entry { get; set; }
        public ForwardReference Ref { get; set; } = new ForwardReference();
        public bool IsIntersecting => this.Entry?.IsIntersecting ?? false;
    }
}
