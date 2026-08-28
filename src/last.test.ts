import { describe, expect, test } from "bun:test";

type Last = <T>(items: readonly T[]) => T | undefined;

// Resolved lazily so this file still reaches its assertions on a tree where
// src/last.ts is absent, instead of aborting at import time.
const mod = (await import("./last").catch(() => ({}))) as { last?: Last };
const last: Last =
  mod.last ??
  (() => {
    throw new Error("src/last.ts does not export last()");
  });

describe("last", () => {
  test("returns the final element", () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last(["only"])).toBe("only");
  });

  test("returns undefined for an empty array", () => {
    expect(last([])).toBeUndefined();
  });

  test("does not mutate the input", () => {
    const items = [1, 2, 3];
    last(items);
    expect(items).toEqual([1, 2, 3]);
  });

  test("preserves a falsy or nullish final element", () => {
    expect(last([1, 0])).toBe(0);
    expect(last(["a", ""])).toBe("");
    expect(last([1, undefined])).toBeUndefined();
  });
});

// E2E fixture (T5 AC4d): deliberately failing assertion pushed by the operator
// to drive CI red on a file that is inside this PR's diff.
test("E2E: deliberate failure", () => {
  expect(last([1, 2, 3])).toBe(99);
});
