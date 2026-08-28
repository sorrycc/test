/**
 * Return the first element of items, or undefined when items is empty.
 */
export function first<T>(items: readonly T[]): T | undefined {
  return items.length === 0 ? undefined : items[0];
}
