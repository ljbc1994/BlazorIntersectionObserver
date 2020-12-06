using Blazor.IntersectionObserver.API;
using Blazor.IntersectionObserver.Configuration;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blazor.IntersectionObserver
{
    public class IntersectionObserverService: IIntersectionObserverService, IAsyncDisposable
    {
        private readonly Task<IJSObjectReference> moduleTask;

        private DotNetObjectReference<IntersectionObserverService> objectRef;

        /// <summary>
        /// Contains a reference of observer instances and their ids.
        /// </summary>
        private readonly IDictionary<string, IntersectionObserver> observers = new Dictionary<string, IntersectionObserver>();


        public IntersectionObserverService(IJSRuntime jsRuntime)
        {
            this.moduleTask = jsRuntime.InvokeAsync<IJSObjectReference>("import", "/_content/BlazorIntersectionObserver/blazor-intersection-observer.js").AsTask();
            this.objectRef = DotNetObjectReference.Create(this);
        }

        /// <summary>
        /// Create an observer instance with a unique id, adding it
        /// to the list of observers.
        /// </summary>
        /// <param name="onIntersectUpdate">On an intersection update, pass the entries to the callback</param>
        /// <param name="options">The intersection observer options</param>
        /// <returns>The observer instance</returns>
        public async Task<IntersectionObserver> Create(
            Action<IList<IntersectionObserverEntry>> onIntersectUpdate,
            IntersectionObserverOptions options = null
        )
        {
            var module = await this.moduleTask;

            var callbackId = Guid.NewGuid().ToString();

            await module.InvokeAsync<object>(Constants.CREATE, this.objectRef, callbackId, options);

            return this.CreateObserver(callbackId, onIntersectUpdate);
        }

        /// <summary>
        /// Create an observer instance and immediately observe 
        /// the element.
        /// </summary>
        /// <param name="element">The element</param>
        /// <param name="onIntersectUpdate">On an intersection update, pass the entries</param>
        /// <param name="options">The intersection observer options</param>
        /// <returns></returns>
        public async Task<IntersectionObserver> Observe(
            ElementReference element,
            Action<IList<IntersectionObserverEntry>> onIntersectUpdate,
            IntersectionObserverOptions options = null
        )
        {
            var module = await this.moduleTask;

            var callbackId = Guid.NewGuid().ToString();

            await module.InvokeAsync<object>(Constants.OBSERVE, this.objectRef, callbackId, element, options);

            return this.CreateObserver(callbackId, onIntersectUpdate);
        }

        /// <summary>
        /// This is triggered in js when an intersection update
        /// has occurred.
        /// </summary>
        /// <param name="id">The observer id</param>
        /// <param name="entries">The intersection observer entries</param>
        [JSInvokable(nameof(OnCallback))]
        public void OnCallback(string id, IList<IntersectionObserverEntry> entries)
        {
            this.observers[id]?.OnIntersect(entries);
        }

        /// <summary>
        /// Create an observer, passing the service callbacks to trigger.
        /// </summary>
        /// <param name="observerId">The observer instance id</param>
        /// <param name="onIntersectUpdate">On intersection update, pass the entries</param>
        /// <returns>The observer instance</returns>
        private IntersectionObserver CreateObserver(string observerId, Action<IList<IntersectionObserverEntry>> onIntersectUpdate)
        {
            var observer = new IntersectionObserver(observerId, onIntersectUpdate, this.ObserveElement, this.Unobserve, this.Disconnect);

            this.observers.Add(observerId, observer);

            return observer;
        }

        /// <summary>
        /// Observe an element using an observer instance
        /// </summary>
        /// <param name="id">The observer instance id</param>
        /// <param name="element">The element to observe</param>
        private async ValueTask ObserveElement(string id, ElementReference element)
        {
            if (this.observers.ContainsKey(id))
            {
                var module = await this.moduleTask;

                await module.InvokeAsync<object>(Constants.OBSERVE_ELEMENT, id, element);
            }
        }

        /// <summary>
        /// Unobserve an element on an observer instance
        /// </summary>
        /// <param name="id">The observer instance id</param>
        /// <param name="element">The element to unobserve</param>
        private async ValueTask Unobserve(string id, ElementReference element)
        {
            var module = await this.moduleTask;

            var unobserved = await module.InvokeAsync<bool>(Constants.UNOBSERVE, id, element);

            if (unobserved)
            {
                this.observers.Remove(id);
            }
        }

        /// <summary>
        /// Disconnect the observer instance
        /// </summary>
        /// <param name="id">The observer instance id</param>
        private async ValueTask Disconnect(string id)
        {
            var module = await this.moduleTask;

            var disconnected = await module.InvokeAsync<bool>(Constants.DISCONNECT, id);

            if (disconnected)
            {
                this.observers.Remove(id);
            }
        }

        public async ValueTask DisposeAsync()
        {
            this.objectRef?.Dispose();

            var module = await this.moduleTask;

            await module.DisposeAsync();
        }
    }
}
