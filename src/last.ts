/**
 * Return the final element of items, or undefined when items is empty.
 */
export function last<T>(items: readonly T[]): T | undefined {
  return items[items.length - 1];
}
