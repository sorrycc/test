import { describe, expect, test } from "bun:test";

type Unique = <T>(items: T[]) => T[];

// Loaded lazily so a missing module fails these assertions, not the file load.
const { unique } = (await import("./unique").catch(() => ({}))) as { unique: Unique };

describe("unique", () => {
  test("is exported", () => {
    expect(typeof unique).toBe("function");
  });

  test("removes duplicates, preserving first-seen order", () => {
    expect(unique([3, 1, 3, 2, 1])).toEqual([3, 1, 2]);
    expect(unique(["b", "a", "b", "c", "a"])).toEqual(["b", "a", "c"]);
  });

  test("leaves duplicate-free input unchanged", () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    expect(unique([])).toEqual([]);
  });

  test("returns a new array and does not mutate the input", () => {
    const items = [1, 1, 2];
    const out = unique(items);
    expect(out).not.toBe(items);
    expect(items).toEqual([1, 1, 2]);
  });

  test("collapses repeated NaN", () => {
    expect(unique([NaN, NaN, 1])).toEqual([NaN, 1]);
  });

  test("compares by identity, not by contents", () => {
    const a = { n: 1 };
    const b = { n: 1 };
    const out = unique([a, b, a]);
    expect(out).toHaveLength(2);
    expect(out[0]).toBe(a);
    expect(out[1]).toBe(b);
  });
});
