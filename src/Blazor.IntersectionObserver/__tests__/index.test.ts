import * as ObserverJS from "../src/index";
import { getObserverEntry } from "./data/index";

declare var window: any;

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();
let onEntryChangeCallback: ObserverJS.OnIntersectionUpdateFn | null;
let observerOptions: IntersectionObserverInit | null;

const mockDotNetRef = {
  invokeMethodAsync: jest.fn(),
};

window.IntersectionObserver = jest.fn(function (fn, options) {
  onEntryChangeCallback = fn;
  observerOptions = options;
  return {
    observe,
    unobserve,
    disconnect,
  };
});

beforeEach(() => {
  ObserverJS.reset();
  observe.mockReset();
  unobserve.mockReset();
  disconnect.mockReset();
  mockDotNetRef.invokeMethodAsync.mockReset();
  onEntryChangeCallback = null;
  observerOptions = null;
});

describe("when creating an observer", () => {
  it("should create a new observer item", () => {
    const callbackId = "1";

    ObserverJS.create(mockDotNetRef, callbackId);

    const items = ObserverJS.getObserverItems();

    expect(items.size).toBe(1);
  });

  it("should create multiple observer items", () => {
    const callbackIds = ["1", "2"];

    callbackIds.forEach((id) => ObserverJS.create(mockDotNetRef, id));

    const items = ObserverJS.getObserverItems();

    expect(items.size).toBe(2);
  });

  it("should create an observer item and observe elements", () => {
    const callbackId = "1";

    ObserverJS.create(mockDotNetRef, callbackId);

    const mockDiv = document.createElement("div");
    const mockSpan = document.createElement("span");

    const observeElementId1 = ObserverJS.observeElement(callbackId, mockDiv);
    const observeElementId2 = ObserverJS.observeElement(callbackId, mockSpan);

    expect(observe).toBeCalledTimes(2);
    expect(observeElementId1).toBe(`${ObserverJS.OBSERVER_ID_PREFIX}0`);
    expect(observeElementId2).toBe(`${ObserverJS.OBSERVER_ID_PREFIX}1`);
  });
});

describe("when observing an element", () => {
  it("should create an observer item and immediately observe the element", () => {
    const callbackId = "1";
    const mockDiv = document.createElement("div");

    const observeElementId = ObserverJS.observe(
      mockDotNetRef,
      callbackId,
      mockDiv
    );

    const items = ObserverJS.getObserverItems();

    expect(items.size).toBe(1);
    expect(observe).toBeCalledTimes(1);
    expect(observeElementId).toBe(`${ObserverJS.OBSERVER_ID_PREFIX}0`);
  });

  it("should observe the element within a threshold", () => {
    const callbackId = "1";
    const mockDiv = document.createElement("div");
    const definedOptions = { threshold: 0.5 };

    ObserverJS.observe(mockDotNetRef, callbackId, mockDiv, definedOptions);

    const items = ObserverJS.getObserverItems();

    expect(items.size).toBe(1);
    expect(observe).toBeCalledTimes(1);
    expect(observerOptions).toBe(definedOptions);
  });

  it("should throw an error if the observer item does not exist", () => {
    const callbackId = "1";
    const mockDiv = document.createElement("div");

    expect(() => {
      ObserverJS.observeElement(callbackId, mockDiv);
    }).toThrowError();
  });
});

describe("when unobserving an element", () => {
  it("should unobserve an element for an observer item", () => {
    const callbackId = "1";
    const mockDiv = document.createElement("div");

    ObserverJS.observe(mockDotNetRef, callbackId, mockDiv);
    const removedElementId = ObserverJS.unobserve(callbackId, mockDiv);

    const items = ObserverJS.getObserverItems();
    const instance = items.get(callbackId);

    expect(unobserve).toHaveBeenCalledTimes(1);
    expect(items.size).toBe(1);
    expect(instance).toBeDefined();
    expect(removedElementId).toBe(`${ObserverJS.OBSERVER_ID_PREFIX}0`);
  });

  it("should throw an error if the observer item does not exist", () => {
    const callbackId = "1";
    const mockDiv = document.createElement("div");

    expect(() => {
      ObserverJS.unobserve(callbackId, mockDiv);
    }).toThrowError();
  });
});

describe("when disconnecting an observer", () => {
  it("should disconnect an observer for observer item", () => {
    const callbackId = "1";
    const mockDiv = document.createElement("div");

    ObserverJS.observe(mockDotNetRef, callbackId, mockDiv);
    ObserverJS.disconnect(callbackId);

    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if the observer item does not exist", () => {
    const callbackId = "1";

    expect(() => {
      ObserverJS.disconnect(callbackId);
    }).toThrowError();
  });
});

describe("when removing an observer item", () => {
  it("should remove the observer item from the observer items", () => {
    const callbackId = "1";
    const mockDiv = document.createElement("div");

    ObserverJS.observe(mockDotNetRef, callbackId, mockDiv);
    ObserverJS.remove(callbackId);

    const items = ObserverJS.getObserverItems();

    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(items.size).toBe(0);
  });

  it("should throw an error if the observer item does not exist", () => {
    const callbackId = "1";

    expect(() => {
      ObserverJS.remove(callbackId);
    }).toThrowError();
  });
});

describe("when an element is intersecting", () => {
  it("should return a list of entries to the observer instance dotnet reference", () => {
    const callbackId = "1";
    const mockDiv = document.createElement("div");

    ObserverJS.observe(mockDotNetRef, callbackId, mockDiv);

    const entry = getObserverEntry({ target: mockDiv });

    onEntryChangeCallback!([entry]);

    const [[arg1, arg2, [passedEntry]]] =
      mockDotNetRef.invokeMethodAsync.mock.calls;

    expect(arg1).toBe("OnCallback");
    expect(arg2).toBe(callbackId);
  });

  it("should not return a list of entries if the observer item does not exist", () => {
    const callbackId = "1";
    const mockDiv = document.createElement("div");

    ObserverJS.observe(mockDotNetRef, callbackId, mockDiv);
    ObserverJS.remove(callbackId);

    onEntryChangeCallback!([getObserverEntry()]);

    expect(mockDotNetRef.invokeMethodAsync).toHaveBeenCalledTimes(0);
  });
});
