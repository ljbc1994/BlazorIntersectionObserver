using Ljbc1994.Blazor.IntersectionObserver.API;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ljbc1994.Blazor.IntersectionObserver.Components
{
    public class IntersectionObserve : ComponentBase, IAsyncDisposable
    {
        private const string NO_ELEMENT_MESSAGE = "The element reference to observe is required, for example: @ref=\"Context.Ref.Current\" must be provided on the element";

        [Inject] private IIntersectionObserverService ObserverService { get; set; }

        [Parameter] public RenderFragment<IntersectionObserverContext> ChildContent { get; set; }

        [Parameter] public bool IsIntersecting { get; set; }

        [Parameter] public EventCallback<bool> IsIntersectingChanged { get; set; }

        [Parameter] public EventCallback<IntersectionObserverEntry> OnChange { get; set; }

        [Parameter] public EventCallback OnDisposed { get; set; }

        [Parameter] public IntersectionObserverOptions Options { get; set; }

        [Parameter] public bool Once { get; set; }

        public IntersectionObserverContext IntersectionObserverContext { get; set; } = new IntersectionObserverContext();

        private IntersectionObserver Observer { get; set; }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await this.InitialiseObserver();
            }
        }

        private async Task InitialiseObserver()
        {
            var elementReference = this.IntersectionObserverContext?.Ref?.Current;

            if (elementReference == null || Equals(elementReference, default(ElementReference)))
            {
                throw new Exception(NO_ELEMENT_MESSAGE);
            }

            this.Observer = await this.ObserverService.Observe(elementReference.Value, this.OnIntersectUpdate, this.Options);
        }

        private async void OnIntersectUpdate(IList<IntersectionObserverEntry> entries)
        {
            var entry = entries?.FirstOrDefault();

            if (entry == null) return;

            await this.IsIntersectingChanged.InvokeAsync(entry.IsIntersecting);
            await this.OnChange.InvokeAsync(entry);

            this.IntersectionObserverContext.Entry = entry;
            this.StateHasChanged();

            if (this.Once && entry.IsIntersecting)
            {
                await this.Observer.Dispose();
                this.Observer = null;
            }
        }

        public async ValueTask DisposeAsync()
        {
            var observer = this.Observer;

            if (observer == null) return;

            this.Observer = null;
            await observer.Dispose();
            await this.OnDisposed.InvokeAsync();
        }

        protected override void BuildRenderTree(RenderTreeBuilder builder)
        {
            if (this.ChildContent == null)
            {
                throw new Exception($"No element found to observe. {NO_ELEMENT_MESSAGE}");
            }
            this.ChildContent(this.IntersectionObserverContext)(builder);
        }
    }
}
