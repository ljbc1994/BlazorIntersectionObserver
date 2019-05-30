export interface IDotNetObjectRef {
    invokeMethodAsync(methodName: string, ...args: any[]): Promise<any>;
}

export interface IntersectionObserverItem {
    id: string;
    instance: IntersectionObserverInstance;
}

export interface IntersectionObserverInstance {
    dotnetRef: IDotNetObjectRef;
    observer: IntersectionObserver;
    options: IntersectionObserverInit;
    elements: Map<string, Set<Element>>;
}

export interface ElementInstance {
    observers: IntersectionObserverInstance[];
}

export type OnIntersectionUpdateFn = (entries: IntersectionObserverEntry[]) => any;

namespace BlazorIntersectionObserverJS {

    export const OBSERVER_ID_PREFIX = "blazor_plugin_observer__";

    let OBSERVER_ID = 1;

    const observerItems = new Map<string, IntersectionObserverInstance>();

    /**
     * Reset the counter and the observer instances
     */
    export function reset() {
        OBSERVER_ID = 1;
        observerItems.clear();
    }

    /**
     * Get the observer items
     */
    export function getObserverItems() {
        return observerItems;
    }

    /**
     * Generate a unique id for an observer item. 
     **/
    function createObserverItemId() {
        return `${OBSERVER_ID_PREFIX}${OBSERVER_ID++}`;
    }

    /**
     * Check whether the two options are the same.
     * @param {IntersectionObserverInit} a - An observer's options to compare 
     * @param {IntersectionObserverInit} b - An observer's options to compare
     * @returns {boolean} - Whether the two options are the same
     */
    function hasSameOptions(a: IntersectionObserverInit, b: IntersectionObserverInit): boolean {
        return (
            a.root === b.root &&
            a.rootMargin === b.rootMargin &&
            a.threshold === b.threshold
        );
    }

    /**
     * If there's an existing observer item, retrieve it given the same options.
     * @param {IntersectionObserverInit} options - The observer options
     * @returns {IntersectionObserverItem | null} - The observer item or nothing 
     */
    function getItemFromOptions(options: IntersectionObserverInit): IntersectionObserverItem | null {
        let itemFound: (IntersectionObserverItem | null) = null;

        for (const [id, instance] of observerItems) {
            if (hasSameOptions(options, instance.options)) {
                itemFound = { id, instance };
                break;
            }
        }

        return itemFound;
    }

    /**
     * Add an element to the observer instance.
     * @param {IntersectionObserverInstance} instance - The observer instance
     * @param {Element} element - The element to add to the instance
     * @param {string} observerId - The observer id
     * @returns {IntersectionObserverInstance} - The observer instance
     */
    function observeInstanceElement(instance: IntersectionObserverInstance, observerId: string, element: Element) {
        const { elements, observer } = instance;
        const observerElements = elements.get(observerId);

        if (observerElements != null) {
            observerElements.add(element);
        } else {
            elements.set(observerId, new Set<Element>([element]));
        }

        observer.observe(element);
        return instance;
    }

    /**
     * Create or use an existing intersection observer item.
     * @param {DotNetObjectRef} dotnetRef - The current dotnet blazor reference
     * @param {IntersectionObserverEntryInit} options - The observer options
     * @returns {IntersectionObserverItem} - The intersection observer item
     */
    function getObserverItem(dotnetRef: IDotNetObjectRef, options: IntersectionObserverInit): IntersectionObserverItem {
        if (options == null) {
            options = {};
        }

        const observerItem = getItemFromOptions(options);

        if (observerItem == null) {
            const id = createObserverItemId();
            const observer = new IntersectionObserver(onEntryChange(id), options);
            const elements = new Map<string, Set<Element>>();

            observerItems.set(id, { dotnetRef, options, observer, elements });

            return {
                id,
                instance: observerItems.get(id) as IntersectionObserverInstance
            };
        }

        return observerItem;
    }

    /**
     * Create a intersection observer.
     * @param {IDotNetObjectRef} dotnetRef - The dotnet interop reference
     * @param {string} id - The instance id of the "observer"
     * @param {IntersectionObserverInit} options - The intersection obsever options
     * @returns {IntersectionObserverItem} - The observer item
     */
    export function create(dotnetRef: IDotNetObjectRef, id: string, options: IntersectionObserverInit) {
      const item = getObserverItem(dotnetRef, options);
      const { instance } = item;
      instance.elements.set(id, new Set<Element>([]));
      return item;
    }

    /**
     * Observe the target node using a new or existing observer
     * @param {IDotNetObjectRef} dotnetRef - The dotnet interop reference
     * @param {string} id - The instance id of the "observer"
     * @param {Element} node - The node to observe
     * @param {IntersectionObserverInit} options - The intersection observer options
     * @returns {IntersectionObserverInstance} - The observer instance
     */
    export function observe(dotnetRef: IDotNetObjectRef, id: string, node: Element, options: IntersectionObserverInit) {
        const { instance } = getObserverItem(dotnetRef, options);
        return observeInstanceElement(instance, id, node);
    }

    /**
     * Observe an element for the observer instance.
     * @param id - The observer id
     * @param element - The element to observe
     */
    export function observeElement(id: string, element: Element) {
        const instances = observerItems.values();

        for (const instance of instances) {
            const elements = instance.elements.get(id);
            
            if (elements != null && !elements.has(element)) {
                instance.observer.observe(element);
                elements.add(element);
                break;
            }
        }
    }

    /**
     * Remove the element from the observer instance and
     * unobserve the element.
     * @param {string} id - The observer id
     * @param {Element} element - The node to unobserve
     * @returns {boolean} - Whether the element has been unobserved
     */
    export function unobserve(id: string, element: Element) {
        const instances = observerItems.values();
        let removed = false;

        for (const instance of instances) {
            const elements = instance.elements.get(id);

            if (elements != null && elements.has(element)) {
                instance.observer.unobserve(element);
                elements.delete(element);
                removed = true;
                break;
            }
        }

        return removed;
    }

    /**
     * Delete the elements from the observer instance 
     * and trigger cleaning up the observers.
     * @param {string} id - The observer instance id
     * @returns {boolean} - Whether the elements have
     * been removed from the observer instance
     */
    export function disconnect(id: string) {
        const observers = observerItems.entries();
        let disconnected = false;

        for (const [instanceId, instance] of observers) {
            if (instance.elements.get(id)) {
                instance.elements.delete(id);
                cleanupObserver(instanceId, instance);
                disconnected = true;
                break;
            }
        }

        return disconnected;
    }

    /**
     * If there are no elements in the observer
     * instance, disconnect the observer and remove
     * it from the observer instances.
     * @param {string} itemId - The observer item id
     * @param {IntersectionObserverInstance} instance - The instance to remove
     * @returns {boolean} - Whether the instance has been removed
     */
    function cleanupObserver(itemId: string, instance: IntersectionObserverInstance) {
        let instanceRemoved = false;

        if (instance.elements.size === 0) {
            instance.observer.disconnect();
            observerItems.delete(itemId);
            instanceRemoved = true;
        }

        return instanceRemoved;
    }

    /**
     * Returns a function that will be triggered when an
     * element has an intersection update.
     * @param {string} observerInstanceId - The instance id
     * @returns {OnIntersectionUpdateFn} - The function triggered by an intersection update
     */
    function onEntryChange(observerInstanceId: string): OnIntersectionUpdateFn {
        return (entries: IntersectionObserverEntry[]) => {
            if (!observerItems.has(observerInstanceId)) {
                return;
            }

            const { dotnetRef, elements } = observerItems.get(observerInstanceId) as IntersectionObserverInstance;

            const observerEntries = entries.reduce((batched, entry) => {
                for (const [id, item] of elements) {
                    if (item.has(entry.target)) {
                        batched[id] = (batched[id] || []).concat(entry);
                    }
                }
                return batched;
            }, {});

            Object.keys(observerEntries).forEach((observerId) => {
                const batch = observerEntries[observerId] as IntersectionObserverEntry[];
                dotnetRef.invokeMethodAsync("OnCallback", observerId, batch.map(toEntryObject));
            });
        }
    }

    /**
     * Convert the observer entry to an object that
     * will be parsed to the callback.
     * @param {IntersectionObserverEntry} entry - The observer entry
     */
    function toEntryObject(entry: IntersectionObserverEntry) {
        function toRectReadOnlyObject(obj: DOMRectReadOnly) {
            return {
                X: obj.x,
                Y: obj.y,
                Width: obj.width,
                Height: obj.height,
                Top: obj.top,
                Left: obj.left,
                Bottom: obj.bottom,
                Right: obj.right
            };
        }

        return {
            Target: entry.target,
            IsIntersecting: entry.isIntersecting,
            IntersectionRatio: entry.intersectionRatio,
            Time: entry.time,
            BoundingClientRect: toRectReadOnlyObject(entry.boundingClientRect as DOMRectReadOnly),
            IntersectionRect: toRectReadOnlyObject(entry.intersectionRect as DOMRectReadOnly),
            RootBounds: toRectReadOnlyObject(entry.rootBounds as DOMRectReadOnly)
          };
    }
}

if (typeof window !== "undefined") {
    window["BlazorIntersectionObserverJS"] = BlazorIntersectionObserverJS;
}

export default BlazorIntersectionObserverJS;