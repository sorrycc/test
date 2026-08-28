/**
 * Return a copy of items with every null and undefined entry removed.
 */
export function compact<T>(items: readonly (T | null | undefined)[]): T[] {
  return items.filter((item): item is T => item != null);
}
