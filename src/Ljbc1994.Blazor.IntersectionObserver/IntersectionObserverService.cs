using Ljbc1994.Blazor.IntersectionObserver.API;
using Ljbc1994.Blazor.IntersectionObserver.Configuration;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ljbc1994.Blazor.IntersectionObserver
{
    public class IntersectionObserverService: IIntersectionObserverService, IAsyncDisposable
    {
        private readonly string scriptPath = "/_content/BlazorIntersectionObserver/blazor-intersection-observer.min.js";

        private readonly Task<IJSObjectReference> moduleTask;

        private DotNetObjectReference<IntersectionObserverService> objectRef;

        /// <summary>
        /// Contains a reference of observer instances and their ids.
        /// </summary>
        private readonly ConcurrentDictionary<string, IntersectionObserver> observers = new ConcurrentDictionary<string, IntersectionObserver>();

        public IntersectionObserverService(IJSRuntime jsRuntime, NavigationManager navManager)
        {
            var path = navManager.ToAbsoluteUri(this.scriptPath);
            this.moduleTask = jsRuntime.InvokeAsync<IJSObjectReference>("import", path).AsTask();
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
            this.EnsureObserverExists(id);

            if (this.observers.TryGetValue(id, out var observer))
            {
                observer.OnIntersect(entries);
            }
        }

        /// <summary>
        /// Create an observer, passing the service callbacks to trigger.
        /// </summary>
        /// <param name="observerId">The observer instance id</param>
        /// <param name="onIntersectUpdate">On intersection update, pass the entries</param>
        /// <returns>The observer instance</returns>
        private IntersectionObserver CreateObserver(string observerId, Action<IList<IntersectionObserverEntry>> onIntersectUpdate)
        {
            var observer = new IntersectionObserver(
                observerId,
                onIntersectUpdate,
                this.ObserveElement,
                this.Unobserve,
                this.Disconnect,
                this.RemoveObserver
            );

            if (this.observers.TryAdd(observerId, observer))
            {
                return observer;
            }

            throw new Exception($"Failed to create observer for key: {observerId}");
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

            await module.InvokeAsync<bool>(Constants.UNOBSERVE, id, element);
        }

        /// <summary>
        /// Disconnect the observer instance
        /// </summary>
        /// <param name="id">The observer instance id</param>
        private async ValueTask<bool> Disconnect(string id)
        {
            var module = await this.moduleTask;

            return await module.InvokeAsync<bool>(Constants.DISCONNECT, id);
        }

        /// <summary>
        /// Disconnect the observer instance
        /// </summary>
        /// <param name="id">The observer instance id</param>
        private async ValueTask RemoveObserver(string id)
        {
            var module = await this.moduleTask;

            var disposed = await module.InvokeAsync<bool>(Constants.REMOVE, id);

            if (disposed)
            {
                this.observers.TryRemove(id, out _);
            }
        }

        private void EnsureObserverExists(string id)
        {
            if (!this.observers.ContainsKey(id))
            {
                throw new Exception($"There is no observer for key: {id}");
            }
        }

        public async ValueTask DisposeAsync()
        {
            this.objectRef?.Dispose();

            await Task.CompletedTask;
        }
    }
}
