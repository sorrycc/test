const UNIT_MS: Record<string, number> = { h: 3600_000, m: 60_000, s: 1000 };

/**
 * Parse a duration string like "2h", "30m", "45s" or "1h30m" into milliseconds.
 */
export function parseDuration(input: string): number {
  if (!/^(?:\d+[hms])+$/.test(input)) {
    throw new Error(`invalid duration: ${input}`);
  }
  let total = 0;
  for (const [, digits, unit] of input.matchAll(/(\d+)([hms])/g)) {
    total += Number(digits) * UNIT_MS[unit];
  }
  return total;
}
