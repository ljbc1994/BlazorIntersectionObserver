using Blazor.IntersectionObserver.API;
using Blazor.IntersectionObserver.Configuration;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blazor.IntersectionObserver
{
    public class IntersectionObserverService
    {
        private readonly IJSRuntime jsRuntime;

        private DotNetObjectRef dotnetObjRef;

        /// <summary>
        /// Contains a reference of observer instances and their ids.
        /// </summary>
        private readonly IDictionary<string, IntersectionObserver> observers = new Dictionary<string, IntersectionObserver>();

        public IntersectionObserverService(IJSRuntime jsRuntime)
        {
            this.jsRuntime = jsRuntime;
            this.dotnetObjRef = new DotNetObjectRef(this);
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
            var callbackId = Guid.NewGuid().ToString();

            await this.jsRuntime.InvokeAsync<object>(Constants.CREATE, this.dotnetObjRef, options);

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
            ElementRef element,
            Action<IList<IntersectionObserverEntry>> onIntersectUpdate,
            IntersectionObserverOptions options = null
        )
        {
            var callbackId = Guid.NewGuid().ToString();

            await this.jsRuntime.InvokeAsync<object>(Constants.OBSERVE, this.dotnetObjRef, callbackId, element, options);

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
        private async void ObserveElement(string id, ElementRef element)
        {
            if (this.observers.ContainsKey(id))
            {
                await this.jsRuntime.InvokeAsync<object>(Constants.OBSERVE_ELEMENT, id, element);
            }
        }

        /// <summary>
        /// Unobserve an element on an observer instance
        /// </summary>
        /// <param name="id">The observer instance id</param>
        /// <param name="element">The element to unobserve</param>
        private async void Unobserve(string id, ElementRef element)
        {
            await this.jsRuntime.InvokeAsync<bool>(Constants.UNOBSERVE, id, element);
        }

        /// <summary>
        /// Disconnect the observer instance
        /// </summary>
        /// <param name="id">The observer instance id</param>
        private async void Disconnect(string id)
        {
            var disconnected = await this.jsRuntime.InvokeAsync<bool>(Constants.DISCONNECT, id);

            if (disconnected)
            {
                this.observers.Remove(id);
            }
        }
    }
}
