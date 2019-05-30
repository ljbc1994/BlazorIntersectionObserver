
export function getSetValueFirstOrDefault<K, Y>(map: Map<K, Y>): Y {
    return map.values().next().value;
}