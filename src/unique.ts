/**
 * Return a copy of items with duplicate values removed, keeping the first
 * occurrence of each value. Values are compared like Set does: NaN equals NaN,
 * and objects are compared by identity.
 */
export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}
