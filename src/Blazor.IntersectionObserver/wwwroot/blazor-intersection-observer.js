const OBSERVER_ID_PREFIX = "blazor_plugin_observer__";
let OBSERVER_ID = 1;
const observerItems = new Map();
function reset() {
    OBSERVER_ID = 1;
    observerItems.clear();
}
function getObserverItems() {
    return observerItems;
}
function createObserverItemId() {
    return `${OBSERVER_ID_PREFIX}${OBSERVER_ID++}`;
}
function hasSameOptions(a, b) {
    return (a.root === b.root &&
        a.rootMargin === b.rootMargin &&
        a.threshold === b.threshold);
}
function getItemFromOptions(options) {
    let itemFound = null;
    for (const [id, instance] of observerItems) {
        if (hasSameOptions(options, instance.options)) {
            itemFound = { id, instance };
            break;
        }
    }
    return itemFound;
}
function observeInstanceElement(instance, observerId, element) {
    const { elements, observer } = instance;
    const observerElements = elements.get(observerId);
    if (observerElements != null) {
        observerElements.add(element);
    }
    else {
        elements.set(observerId, new Set([element]));
    }
    observer.observe(element);
    return instance;
}
function getObserverItem(dotnetRef, options) {
    if (options == null) {
        options = {};
    }
    const observerItem = getItemFromOptions(options);
    if (observerItem == null) {
        const id = createObserverItemId();
        const observer = new IntersectionObserver(onEntryChange(id), options);
        const elements = new Map();
        observerItems.set(id, { dotnetRef, options, observer, elements });
        return {
            id,
            instance: observerItems.get(id),
        };
    }
    return observerItem;
}
function create(dotnetRef, id, options) {
    const item = getObserverItem(dotnetRef, options);
    const { instance } = item;
    instance.elements.set(id, new Set([]));
    return item;
}
function observe(dotnetRef, id, node, options) {
    const { instance } = getObserverItem(dotnetRef, options);
    return observeInstanceElement(instance, id, node);
}
function observeElement(id, element) {
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
function cleanupObserver(itemId, instance) {
    let instanceRemoved = false;
    if (instance.elements.size === 0) {
        instance.observer.disconnect();
        observerItems.delete(itemId);
        instanceRemoved = true;
    }
    return instanceRemoved;
}
function unobserve(id, element) {
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
function disconnect(id) {
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
function toEntryObject(entry) {
    function toRectReadOnlyObject(obj) {
        return {
            X: obj.x,
            Y: obj.y,
            Width: obj.width,
            Height: obj.height,
            Top: obj.top,
            Left: obj.left,
            Bottom: obj.bottom,
            Right: obj.right,
        };
    }
    return {
        IsIntersecting: entry.isIntersecting,
        IntersectionRatio: entry.intersectionRatio,
        Time: entry.time,
        BoundingClientRect: toRectReadOnlyObject(entry.boundingClientRect),
        IntersectionRect: toRectReadOnlyObject(entry.intersectionRect),
        RootBounds: toRectReadOnlyObject(entry.rootBounds),
    };
}
function onEntryChange(observerInstanceId) {
    return (entries) => {
        if (!observerItems.has(observerInstanceId)) {
            return;
        }
        const { dotnetRef, elements } = observerItems.get(observerInstanceId);
        const observerEntries = entries.reduce((batched, entry) => {
            for (const [id, item] of elements) {
                if (item.has(entry.target)) {
                    batched[id] = (batched[id] || []).concat(entry);
                }
            }
            return batched;
        }, {});
        Object.keys(observerEntries).forEach((observerId) => {
            const batch = observerEntries[observerId];
            dotnetRef.invokeMethodAsync("OnCallback", observerId, batch.map(toEntryObject));
        });
    };
}

export { OBSERVER_ID_PREFIX, create, disconnect, getObserverItems, observe, observeElement, reset, unobserve };
