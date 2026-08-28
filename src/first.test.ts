import { describe, expect, test } from "bun:test";
import { first } from "./first";

describe("first", () => {
  test("returns the first element", () => {
    expect(first([1, 2, 3])).toBe(1);
    expect(first(["a"])).toBe("a");
  });
  test("returns undefined for an empty array", () => {
    expect(first([])).toBeUndefined();
  });
  test("returns a stored undefined rather than skipping it", () => {
    expect(first([undefined, 1])).toBeUndefined();
  });
  test("does not mutate the input", () => {
    const items = [1, 2, 3];
    first(items);
    expect(items).toEqual([1, 2, 3]);
  });
});
