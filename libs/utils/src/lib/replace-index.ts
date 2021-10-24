export function replaceIndex<T>(array: Array<T>, index: number, replacement: T): Array<T> {
  return [
    ...array.slice(0, index),
    replacement,
    ...array.slice(index + 1)
  ];
}
