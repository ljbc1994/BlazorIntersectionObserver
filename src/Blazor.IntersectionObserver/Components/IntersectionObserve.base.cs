using Blazor.IntersectionObserver.API;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.RenderTree;
using System;
using System.Linq;

namespace Blazor.IntersectionObserver.Components
{
    public class IntersectionObserveBase : ComponentBase, IDisposable
    {
        [Inject] private IntersectionObserverService ObserverService { get; set; }

        [Parameter] public string Class { get; set; }

        [Parameter] public string Style { get; set; }

        [Parameter] public RenderFragment<IntersectionObserverEntry> ChildContent { get; set; }

        [Parameter] public bool IsIntersecting { get; set; }

        [Parameter] private EventCallback<bool> IsIntersectingChanged { get; set; }

        [Parameter] public EventCallback<IntersectionObserverEntry> OnChange { get; set; }

        [Parameter] public IntersectionObserverOptions Options { get; set; }

        [Parameter] public bool Once { get; set; }

        public ElementRef Element { get; set; }

        public IntersectionObserverEntry Entry { get; set; }

        private IntersectionObserver Observer { get; set; }

        private bool Observing { get; set; }

        protected override void OnAfterRender()
        {
            if (!this.Observing)
            {
                this.InitialiseObserver();
                this.Observing = true;
            }
        }

        private async void InitialiseObserver()
        {
            this.Observer = await this.ObserverService.Observe(this.Element, async (entries) =>
            {
                var entry = entries.FirstOrDefault();

                if (entry != null)
                {
                    await this.IsIntersectingChanged.InvokeAsync(entry.IsIntersecting);
                    await this.OnChange.InvokeAsync(entry);
                    this.Entry = entry;
                    this.StateHasChanged();

                    if (this.Once && entry.IsIntersecting)
                    {
                        this.Observer?.Disconnect();
                        this.Observer = null;
                    }
                }
            }, this.Options);
        }

        public void Dispose()
        {
            this.Observer?.Disconnect();
        }
    }
}
