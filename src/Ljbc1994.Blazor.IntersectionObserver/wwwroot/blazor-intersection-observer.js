const OBSERVER_ID_PREFIX = "blazor_plugin_observer__";
let OBSERVER_ID = 1;
const observerItems = new Map();
function reset() {
    OBSERVER_ID = 0;
    observerItems.clear();
}
function getObserverItems() {
    return observerItems;
}
function getObserverElementId() {
    return `${OBSERVER_ID_PREFIX}${OBSERVER_ID++}`;
}
function createObserverItem(dotnetRef, callbackId, options) {
    const onEntry = onEntryChange(callbackId);
    const observer = new IntersectionObserver(onEntry, options);
    observerItems.set(callbackId, { dotnetRef, observer, elements: [] });
    return observerItems.get(callbackId);
}
function observeElement(callbackId, element) {
    const item = observerItems.get(callbackId);
    if (item == null) {
        throw new Error(`Failed to observe element for key: ${callbackId} as the observer does not exist`);
    }
    if (item.elements.some(record => record.element == element)) {
        console.warn(`BlazorIntersectionObserver: The element is already being observed by observer for key ${callbackId}`);
        return "";
    }
    const elementId = getObserverElementId();
    item.observer.observe(element);
    item.elements.push({ elementId, element });
    return elementId;
}
function create(dotnetRef, callbackId, options) {
    return createObserverItem(dotnetRef, callbackId, options);
}
function observe(dotnetRef, callbackId, node, options) {
    createObserverItem(dotnetRef, callbackId, options);
    return observeElement(callbackId, node);
}
function unobserve(callbackId, element) {
    var _a;
    const item = observerItems.get(callbackId);
    if (item == null) {
        throw new Error(`Failed to unobserve element for key: ${callbackId} as the observer does not exist`);
    }
    const unobserveElementId = (_a = item.elements.find((record) => record.element == element)) === null || _a === void 0 ? void 0 : _a.elementId;
    if (unobserveElementId == null) {
        console.warn(`BlazorIntersectionObserver: The record does not exist for observer: ${callbackId}`);
    }
    item.observer.unobserve(element);
    item.elements = item.elements.filter((record) => record.element != element);
    return unobserveElementId;
}
function disconnect(callbackId) {
    const item = observerItems.get(callbackId);
    if (item == null) {
        throw new Error(`Failed to disconnect for key: ${callbackId} as the observer does not exist`);
    }
    item.observer.disconnect();
    item.elements = [];
    return true;
}
function remove(callbackId) {
    if (disconnect(callbackId)) {
        return observerItems.delete(callbackId);
    }
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
function onEntryChange(callbackId) {
    return (entries) => {
        if (!observerItems.has(callbackId)) {
            return;
        }
        const { dotnetRef } = observerItems.get(callbackId);
        const mapped = entries.map((entry) => {
            const mappedEntry = toEntryObject(entry);
            return mappedEntry;
        });
        dotnetRef.invokeMethodAsync("OnCallback", callbackId, mapped);
    };
}

export { OBSERVER_ID_PREFIX, create, disconnect, getObserverItems, observe, observeElement, remove, reset, unobserve };
