const UNIT_MS: Record<string, number> = { h: 3600_000, m: 60_000, s: 1000 };

/**
 * Parse a duration string like "2h", "30m", "45s" or "1h30m" into milliseconds.
 */
export function parseDuration(input: string): number {
  const segments = input.match(/\d+[hms]/);
  if (!segments) throw new Error(`invalid duration: ${input}`);
  let total = 0;
  for (const seg of segments) {
    const n = Number(seg.slice(0, -1));
    total += n * UNIT_MS[seg.slice(-1)];
  }
  return total;
}
