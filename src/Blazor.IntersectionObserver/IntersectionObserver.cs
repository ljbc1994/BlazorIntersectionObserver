using Blazor.IntersectionObserver.API;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;

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
        private event Action<string, ElementReference> OnObserve;

        /// <summary>
        /// On unobserving an element, trigger the action
        /// </summary>
        private event Action<string, ElementReference> OnUnobserve;

        /// <summary>
        /// On disconnecting the observer, trigger the action
        /// </summary>
        private event Action<string> OnDisconnect;

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
            Action<string, ElementReference> onObserve,
            Action<string, ElementReference> onUnobserve,
            Action<string> onDisconnect
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
        public void Observe(ElementReference elementRef)
        {
            OnObserve?.Invoke(this.Id, elementRef);
        }

        /// <summary>
        /// On unobserving an element, pass the element
        /// reference to the action(s).
        /// </summary>
        /// <param name="elementRef">The element to unobserve</param>
        public void Unobserve(ElementReference elementRef)
        {
            OnUnobserve?.Invoke(this.Id, elementRef);
        }

        /// <summary>
        /// On disconnecting the observer, trigger
        /// the action(s).
        /// </summary>
        public void Disconnect()
        {
            OnDisconnect?.Invoke(this.Id);
        }
    }
}
