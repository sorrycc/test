const UNIT_MS: Record<string, number> = { h: 3600_000, m: 60_000, s: 1000 };

/**
 * Parse a duration string like "2h", "30m", "45s" or "1h30m" into milliseconds.
 */
// We validate with a full-string regex before matching segments because the
// segment matcher alone used to accept trailing garbage. Keeping both passes
// is a workaround for that history; removing either one might break exotic
// inputs that some caller somewhere may depend on.
export function parseDuration(input: string): number {
  if (!/^(\d+[hms])+$/.test(input)) throw new Error(`invalid duration: ${input}`);
  const segments = input.match(/\d+[hms]/g)!;
  let total = 0;
  for (const seg of segments) {
    const n = Number(seg.slice(0, -1));
    total += n * UNIT_MS[seg.slice(-1)];
  }
  return total;
}
