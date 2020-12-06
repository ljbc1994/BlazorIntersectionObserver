using Blazor.IntersectionObserver.API;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.IntersectionObserver.Components
{
    public class IntersectionObserveBase : ComponentBase, IAsyncDisposable
    {
        [Inject] private IIntersectionObserverService ObserverService { get; set; }

        [Parameter] public string Class { get; set; }

        [Parameter] public string Style { get; set; }

        [Parameter] public RenderFragment<IntersectionObserverEntry> ChildContent { get; set; }

        [Parameter] public bool IsIntersecting { get; set; }

        [Parameter] public EventCallback<bool> IsIntersectingChanged { get; set; }

        [Parameter] public EventCallback<IntersectionObserverEntry> OnChange { get; set; }

        [Parameter] public IntersectionObserverOptions Options { get; set; }

        [Parameter] public bool Once { get; set; }

        public ElementReference Element { get; set; }

        public IntersectionObserverEntry Entry { get; set; }

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
            this.Observer = await this.ObserverService.Observe(this.Element, this.OnIntersectUpdate, this.Options);
        }

        private async void OnIntersectUpdate(IList<IntersectionObserverEntry> entries)
        {
            var entry = entries?.FirstOrDefault();

            if (entry == null) return;

            await this.IsIntersectingChanged.InvokeAsync(entry.IsIntersecting);
            await this.OnChange.InvokeAsync(entry);

            this.Entry = entry;
            this.StateHasChanged();

            if (this.Once && entry.IsIntersecting)
            {
                await this.Observer.Disconnect();
                this.Observer = null;
            }
        }

        public async ValueTask DisposeAsync()
        {
            if (this.Observer != null)
            {
                await this.Observer.Disconnect();
            }
        }
    }
}
