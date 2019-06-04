import ObserverJS from "../../src/index";

export function getObserverItemId(id: string) {
    return `${ObserverJS.OBSERVER_ID_PREFIX}${id}`;
}