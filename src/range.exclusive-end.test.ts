import { describe, expect, test } from "bun:test";
import { range } from "./range";

describe("range end is exclusive", () => {
  test("range(0, 5) stops before the end value", () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });
  test("range(3, 3) is empty", () => {
    expect(range(3, 3)).toEqual([]);
  });
  test("stepped range excludes an end it lands on exactly", () => {
    expect(range(0, 6, 2)).toEqual([0, 2, 4]);
  });
});
