using Microsoft.AspNetCore.Components;

namespace Blazor.IntersectionObserver.API
{
    public class ForwardReference
    {
        private ElementReference current;

        public ElementReference Current
        {
            get => this.current;
            set => this.Set(value);
        }

        public void Set(ElementReference value)
        {
            this.current = value;
        }
    }
}
