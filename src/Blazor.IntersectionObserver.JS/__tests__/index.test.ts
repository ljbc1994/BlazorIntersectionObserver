import ObserverJS, { OnIntersectionUpdateFn, IntersectionObserverInstance } from "../src/index";
import { getMockElement } from "./utils/document";
import { getSetValueFirstOrDefault } from "./utils/iterable";
import { getObserverEntry } from "./data";
import { getObserverItemId } from "./utils/config";

declare var window: any;

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();
let onEntryChangeCallback: OnIntersectionUpdateFn | null;

const mockDotNetRef = {
    invokeMethodAsync: jest.fn()
};

window.IntersectionObserver = jest.fn(function(fn) {
    onEntryChangeCallback = fn;
    return {
        observe, 
        unobserve, 
        disconnect
    };
});

beforeEach(() => {
    ObserverJS.reset();
    observe.mockReset();
    unobserve.mockReset();
    disconnect.mockReset();
    mockDotNetRef.invokeMethodAsync.mockReset();
    onEntryChangeCallback = null;
});

describe("when creating an observer", () => {

    test("should create a new observer instance to a observer item", () => {
        const observerId = "1";
        const response = ObserverJS.create(mockDotNetRef, observerId, {});
        const elements = response.instance.elements.get(observerId);
        const instances = ObserverJS.getObserverItems();

        expect(instances.size).toBe(1);
        expect(elements).toBeDefined();
        !!elements && expect(elements.size).toBe(0);
    });
    
    test("should create new observer instances to a single observer item", () => {
        const observerIds = ["1", "2"];
        
        observerIds.forEach((id) => {
            ObserverJS.create(mockDotNetRef, id, {});
        });

        const items = ObserverJS.getObserverItems();
        const instance = items.get(getObserverItemId(observerIds[0]));

        expect(items.size).toBe(1);
        expect(instance).toBeDefined();
        !!instance && expect(instance.elements.size).toBe(2);
    });

    test("should create new observer instances to multiple observer items", () => {
        const observers: Array<{ id: string, options: IntersectionObserverInit }> = [
            { id: "1", options: { rootMargin: "10px" } },
            { id: "2", options: { rootMargin: "11px" } }
        ];

        observers.forEach(({ id, options }) => {
            ObserverJS.create(mockDotNetRef, id, options);
        });

        const items = ObserverJS.getObserverItems();
        
        expect(items.size).toBe(2);
    });
    
    test("should create a new observer instance with elements", () => {
        const observerId = "1";
        const mockDiv = getMockElement("div");
        const mockSpan = getMockElement("span");

        const item = ObserverJS.create(mockDotNetRef, observerId, {});

        ObserverJS.observeElement(observerId, mockDiv);
        ObserverJS.observeElement(observerId, mockDiv);
        ObserverJS.observeElement(observerId, mockSpan);
        const elements = item.instance.elements.get(observerId)

        expect(elements).toBeDefined();
        expect(observe).toBeCalledTimes(2);
        !!elements && expect(elements.has(mockDiv)).toBeTruthy();
        !!elements && expect(elements.has(mockSpan)).toBeTruthy();
    });

});

describe("when observing an element", () => {

    it("should create an observer instance and immediately observe the element", () => {
        const observerId = "1";
        const mockDiv = getMockElement("div");

        ObserverJS.observe(mockDotNetRef, observerId, mockDiv, {});

        const items = ObserverJS.getObserverItems();

        expect(items.size).toBe(1);
        expect(observe).toBeCalledTimes(1);
    });

    it("should create one observer instance and observe elements", () => {
        const observerId = "1";
        const observers: Array<{ id: string, el: HTMLElement, options: IntersectionObserverInit }> = [
            { id: observerId, el: document.createElement("div"), options: { rootMargin: "10px" } },
            { id: observerId, el: document.createElement("span"), options: { rootMargin: "10px" } }
        ];

        const instanceRef: IntersectionObserverInstance[] = [];

        observers.forEach(({ id, el, options }) => {
            const ref = ObserverJS.observe(mockDotNetRef, id, el, options);
            instanceRef.push(ref);
        });

        const items = ObserverJS.getObserverItems();
        const [lastInstance] = instanceRef;
        const lastInstanceElements = lastInstance.elements.get(observerId);

        expect(items.size).toBe(1);
        lastInstanceElements && expect(lastInstanceElements.size).toBe(2);
    });

});

describe("when unobserving an element", () => {

    it("should create an observer instance and unobserve an element", () => {
        const observerId = "1";
        const mockDiv = getMockElement("div");

        ObserverJS.observe(mockDotNetRef, observerId, mockDiv, {});
        const removed = ObserverJS.unobserve(observerId, mockDiv);

        const items = ObserverJS.getObserverItems();
        const instance = items.get(getObserverItemId(observerId));

        expect(unobserve).toHaveBeenCalledTimes(1);
        expect(removed).toBeTruthy();
        expect(items.size).toBe(1);
        expect(instance).toBeDefined();
        !!instance && expect(getSetValueFirstOrDefault(instance.elements).size).toBe(0);
    });

});

describe("when disconnecting an observer", () => {

    it("should disconnect an observer", () => {
        const observerId = "1";
        const mockDiv = getMockElement("div");
        
        ObserverJS.observe(mockDotNetRef, observerId, mockDiv, {});
        ObserverJS.disconnect(observerId);

        const items = ObserverJS.getObserverItems();

        expect(disconnect).toHaveBeenCalledTimes(1);
        expect(items.size).toBe(0);
    });

});

describe("when an element is intersecting", () => {

    it("should return a list of entries to the relevant observer instance", () => {
        const observerId = "1";
        const mockDiv = getMockElement("div");
        
        ObserverJS.observe(mockDotNetRef, observerId, mockDiv, {});        

        if (onEntryChangeCallback != null) {
            onEntryChangeCallback([
                getObserverEntry({ target: mockDiv })
            ]);
        }
        
        const [[arg1, arg2, arg3]] = mockDotNetRef.invokeMethodAsync.mock.calls;

        expect(arg1).toBe("OnCallback");
        expect(arg2).toBe(observerId);
        expect(arg3[0].Target).toBe(mockDiv);
    });

    it("should not return a list of entries if there are no observer instances", () => {
        const observerId = "1";
        const mockDiv = getMockElement("div");

        ObserverJS.observe(mockDotNetRef, observerId, mockDiv, {});
        ObserverJS.disconnect(observerId);

        if (onEntryChangeCallback != null) {
            onEntryChangeCallback([
                getObserverEntry({ target: mockDiv })
            ]);
        }

        expect(mockDotNetRef.invokeMethodAsync).toHaveBeenCalledTimes(0);
    });

});