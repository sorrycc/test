import { describe, expect, test } from "bun:test";
import { range } from "./range";

describe("range", () => {
  test("steps from start", () => {
    expect(range(1, 10, 4)).toEqual([1, 5, 9]);
    expect(range(0, 7, 3)).toEqual([0, 3, 6]);
  });
  test("large step yields only the start", () => {
    expect(range(0, 3, 5)).toEqual([0]);
  });
  test("rejects non-positive steps", () => {
    expect(() => range(0, 5, 0)).toThrow();
    expect(() => range(0, 5, -1)).toThrow();
  });
});
