using Blazor.IntersectionObserver.API;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blazor.IntersectionObserver
{
    public class IntersectionObserver
    {
        /// <summary>
        /// The identifier for the observer instance
        /// </summary>
        public string Id { get; private set; }

        /// <summary>
        /// On intersection updates, trigger the action
        /// </summary>
        private event Action<IList<IntersectionObserverEntry>> OnIntersectUpdate;

        /// <summary>
        /// On unobserving an element, trigger the action
        /// </summary>
        private event Func<string, ElementReference, ValueTask> OnObserve;

        /// <summary>
        /// On unobserving an element, trigger the action
        /// </summary>
        private event Func<string, ElementReference, ValueTask> OnUnobserve;

        /// <summary>
        /// On disconnecting the observer, trigger the action
        /// </summary>
        private event Func<string, ValueTask> OnDisconnect;

        /// <summary>
        /// Initialise the intersection observer with the
        /// actions that will be triggered.
        /// </summary>
        /// <param name="id">The observer id</param>
        /// <param name="onIntersectUpdate">On intersection updates</param>
        /// <param name="onUnobserve">Unobserving an element</param>
        /// <param name="onDisconnect">On disconnecting the observer</param>
        public IntersectionObserver(
            string id,
            Action<IList<IntersectionObserverEntry>> onIntersectUpdate,
            Func<string, ElementReference, ValueTask> onObserve,
            Func<string, ElementReference, ValueTask> onUnobserve,
            Func<string, ValueTask> onDisconnect
        )
        {
            this.Id = id;
            OnIntersectUpdate = onIntersectUpdate;
            OnObserve = onObserve;
            OnUnobserve = onUnobserve;
            OnDisconnect = onDisconnect;
        }

        /// <summary>
        /// On intersection, pass the entries
        /// to the actions(s).
        /// </summary>
        /// <param name="entries"></param>
        public void OnIntersect(IList<IntersectionObserverEntry> entries)
        {
            if (entries != null && entries.Any())
            {
                OnIntersectUpdate?.Invoke(entries);
            }
        }

        /// <summary>
        /// On observing an element, pass the element
        /// reference to the action(s).
        /// </summary>
        /// <param name="elementRef">The element to observe</param>
        public async ValueTask Observe(ElementReference elementRef)
        {
            await (OnObserve.Invoke(this.Id, elementRef));
        }

        /// <summary>
        /// On unobserving an element, pass the element
        /// reference to the action(s).
        /// </summary>
        /// <param name="elementRef">The element to unobserve</param>
        public async ValueTask Unobserve(ElementReference elementRef)
        {
            await (OnUnobserve.Invoke(this.Id, elementRef));
        }

        /// <summary>
        /// On disconnecting the observer, trigger
        /// the action(s).
        /// </summary>
        public async ValueTask Disconnect()
        {
            await (OnDisconnect.Invoke(this.Id));
        }
    }
}
