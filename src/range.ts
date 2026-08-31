/**
 * Return integers from start (inclusive) to end (exclusive), stepping by step.
 */
export function range(start: number, end: number, step = 1): number[] {
  if (step <= 0) throw new Error(`step must be positive, got ${step}`);
  const out: number[] = [];
  for (let i = start; i < end; i += step) {
    out.push(i);
  }
  return out;
}
