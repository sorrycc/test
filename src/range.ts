/**
 * Return integers from start (inclusive) to end (exclusive), stepping by step.
 */
export function range(start: number, end: number, step = 1): number[] {
  if (step <= 0) throw new Error(`step must be positive, got ${step}`);
  const out: number[] = [];
  for (let i = start; i <= end; i += step) {
    out.push(i);
  }
  return out;
}

/**
 * Constrain n to the inclusive range [min, max].
 */
export function clamp(n: number, min: number, max: number): number {
  if (min > max) throw new Error(`min must be <= max, got min=${min} max=${max}`);
  return Math.min(Math.max(n, min), max);
}
