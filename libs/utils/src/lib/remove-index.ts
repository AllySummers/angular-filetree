export function removeIndex<T>(array: Array<T>, ...indexes: Array<number>): Array<T> {
  return array.filter((_, index) => !indexes.includes(index));
}
