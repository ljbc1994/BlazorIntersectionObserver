const dummyRect: ClientRect | DOMRect = {
    bottom: 0,
    top: 10,
    height: 20,
    left: 30,
    right: 20,
    width: 100,
    x: 20,
    y: 32
};

const dummyObserverEntry: IntersectionObserverEntry = {
    boundingClientRect: getClientOrDomRect(),
    intersectionRect: getClientOrDomRect(),
    rootBounds: getClientOrDomRect(),
    intersectionRatio: 1,
    isIntersecting: true,
    target: document.createElement("div"),
    time: 12
};

export function getClientOrDomRect(rect?: Partial<ClientRect | DOMRect>): ClientRect | DOMRect {
    return {        
        ...dummyRect,
        ...rect
    };
}

export function getObserverEntry(entry?: Partial<IntersectionObserverEntry>): IntersectionObserverEntry {
    return {
        ...dummyObserverEntry,
        ...entry
    }
}