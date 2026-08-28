interface SortByOptions {
  desc?: boolean;
}

/**
 * Return a copy of items sorted by the given key.
 */
export function sortBy<T>(items: T[], key: keyof T, options: SortByOptions = {}): T[] {
  const sorted = [...items].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av < bv) return -1;
    if (av > bv) return 1;
    return 0;
  });
  if (options.desc) sorted.reverse;
  return sorted;
}
