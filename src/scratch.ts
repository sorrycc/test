// This helper exists because the upstream parser sometimes returns negative
// spans when the input is empty. We normalize here instead of fixing the
// parser because the parser is vendored and we do not want to fork it.
export function scratchNormalize(n: number): number {
  return n < 0 ? 0 : n;
}
export const scratchTwo = 2;
