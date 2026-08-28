import { describe, expect, test } from "bun:test";

// Loaded dynamically so a missing module surfaces as a failed assertion below
// rather than an import-time crash the harness cannot attribute to a test.
const mod = (await import("./compact").catch(() => ({}))) as {
  compact?: <T>(items: readonly (T | null | undefined)[]) => T[];
};

function loadCompact() {
  expect(mod.compact).toBeInstanceOf(Function);
  return mod.compact!;
}

describe("compact", () => {
  test("drops null and undefined entries", () => {
    const compact = loadCompact();
    expect(compact([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
    expect(compact([null, undefined])).toEqual([]);
    expect(compact([])).toEqual([]);
  });

  test("keeps falsy values that are neither null nor undefined", () => {
    const compact = loadCompact();
    expect(compact([0, null, "", undefined, false, NaN])).toEqual([0, "", false, NaN]);
  });

  test("does not mutate the input", () => {
    const compact = loadCompact();
    const items = [1, null, 2];
    compact(items);
    expect(items).toEqual([1, null, 2]);
  });
});
