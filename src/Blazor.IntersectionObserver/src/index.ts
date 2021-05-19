export interface DotNetObjectRef {
  invokeMethodAsync(methodName: string, ...args: any[]): Promise<any>;
}

export interface IntersectionObserverItemElement {
  element: Element;
  elementId: string;
}

export interface IntersectionObserverItem {
  dotnetRef: DotNetObjectRef;
  observer: IntersectionObserver;
  elements: IntersectionObserverItemElement[];
}

export type OnIntersectionUpdateFn = (
  entries: IntersectionObserverEntry[]
) => void;

export const OBSERVER_ID_PREFIX = "blazor_plugin_observer__";

let OBSERVER_ID = 1;

const observerItems = new Map<string, IntersectionObserverItem>();

/**
 * Reset the counter and the observer instances
 */
export function reset() {
  OBSERVER_ID = 0;
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
function getObserverElementId() {
  return `${OBSERVER_ID_PREFIX}${OBSERVER_ID++}`;
}

/**
 * Create a new intersection observer item.
 * @param {DotNetObjectRef} dotnetRef - The current dotnet blazor reference
 * @param {string} callbackId - The callback id for the blazor observer service
 * @param {globalThis.IntersectionObserverInit} options - The intersection options
 * @returns {IntersectionObserverItem} - The resize observer item
 */
function createObserverItem(
  dotnetRef: DotNetObjectRef,
  callbackId: string,
  options?: globalThis.IntersectionObserverInit
): IntersectionObserverItem {
  const onEntry = onEntryChange(callbackId);

  const observer = new IntersectionObserver(onEntry, options);

  observerItems.set(callbackId, { dotnetRef, observer, elements: [] });

  return observerItems.get(callbackId)!;
}

/**
 * Observe an element for the observer item
 * @param {string} callbackId - The callback id for the blazor observer service
 * @param {Element} element - The element to observe
 * @returns {string} - The observer element id
 */
export function observeElement(callbackId: string, element: Element): string {
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

/**
 * Create a intersection observer.
 * @param {IDotNetObjectRef} dotnetRef - The dotnet interop reference
 * @param {string} callbackId - The callback id for the blazor observer service
 * @param {globalThis.IntersectionObserverInit} options - The intersection observer options
 * @returns {ResizeObserverItem} - The observer item
 */
export function create(
  dotnetRef: DotNetObjectRef,
  callbackId: string,
  options?: globalThis.IntersectionObserverInit
) {
  return createObserverItem(dotnetRef, callbackId, options);
}

/**
 * Observe the target node using a new observer
 * @param {DotNetObjectRef} dotnetRef - The dotnet interop reference
 * @param {string} callbackId - The callback id for the blazor observer service
 * @param {Element} node - The node to observe
 * @param {globalThis.IntersectionObserverInit} options - The intersection observer options
 * @returns {string} - The observer element id
 */
export function observe(
  dotnetRef: DotNetObjectRef,
  callbackId: string,
  node: Element,
  options?: globalThis.IntersectionObserverInit
): string {
  console.log({ dotnetRef, callbackId, node })
  createObserverItem(dotnetRef, callbackId, options);
  return observeElement(callbackId, node);
}

/**
 * Unobserve the element for the observer item.
 * @param {string} id - The observer item id
 * @param {Element} element - The element to unobserve
 * @returns {boolean} - Whether the element has been unobserved
 */
export function unobserve(callbackId: string, element: Element): string {
  const item = observerItems.get(callbackId);

  if (item == null) {
    throw new Error(`Failed to unobserve element for key: ${callbackId} as the observer does not exist`);
  }

  const unobserveElementId = item.elements.find((record) => record.element == element)?.elementId;

  if (unobserveElementId == null) {
    console.warn(`BlazorResizeObserver: The record does not exist for observer: ${callbackId}`);
  }

  item.observer.unobserve(element);
  item.elements = item.elements.filter((record) => record.element != element);

  return unobserveElementId!;
}

/**
 * Disconnect the observered elements from the observer item.
 * @param {string} callbackId - The observer item id
 * @returns {boolean} - Whether the elements have
 * been removed from the observer item
 */
export function disconnect(callbackId: string): boolean {
  const item = observerItems.get(callbackId);

  if (item == null) {
    throw new Error(`Failed to disconnect for key: ${callbackId} as the observer does not exist`);
  }

  item.observer.disconnect();
  item.elements = [];

  return true;
}

/**
 * Remove the observer item.
 * @param {string} callbackId - The observer item id
 * @returns {boolean} - Whether the observer item has been
 * removed.
 */
export function remove(callbackId: string): boolean {
  if (disconnect(callbackId)) {
    return observerItems.delete(callbackId);
  }
  return false;
}

/**
 * Convert the observer entry to an object that
 * will be parsed to the callback.
 * @param {IntersectionObserverEntry} entry - The observer entry
 */
function toEntryObject(entry: IntersectionObserverEntry) {
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

/**
 * Returns a function that will be triggered when an
 * element has an resize update.
 * @param {string} callbackId - The observer item id
 * @returns {OnIntersectionUpdateFn} - The function triggered by an resize update
 */
function onEntryChange(callbackId: string): OnIntersectionUpdateFn {
  return (entries: readonly IntersectionObserverEntry[]) => {

    if (!observerItems.has(callbackId)) {
      return;
    }

    const { dotnetRef } = observerItems.get(callbackId)!;

    const mapped = entries.map((entry) => {
      const mappedEntry = toEntryObject(entry);
      return mappedEntry;
    });

    dotnetRef.invokeMethodAsync(
      "OnCallback",
      callbackId,
      mapped
    );
  };
}
