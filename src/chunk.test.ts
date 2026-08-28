import { describe, expect, test } from "bun:test";
import { chunk } from "./chunk";

describe("chunk", () => {
  test("splits into consecutive chunks of the given size", () => {
    expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    expect(chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });
  test("last chunk may be shorter", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk(["a", "b", "c", "d"], 3)).toEqual([["a", "b", "c"], ["d"]]);
  });
  test("size of 1 yields one element per chunk", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });
  test("size larger than the input yields a single chunk", () => {
    expect(chunk([1, 2], 10)).toEqual([[1, 2]]);
  });
  test("empty input yields no chunks", () => {
    expect(chunk([], 3)).toEqual([]);
  });
  test("rejects non-positive sizes", () => {
    expect(() => chunk([1, 2], 0)).toThrow(/positive integer/);
    expect(() => chunk([1, 2], -1)).toThrow(/positive integer/);
  });
  test("rejects fractional sizes", () => {
    expect(() => chunk([1, 2], 1.5)).toThrow(/positive integer/);
    expect(() => chunk([1, 2], NaN)).toThrow(/positive integer/);
  });
  test("does not mutate the input", () => {
    const items = [1, 2, 3, 4, 5];
    chunk(items, 2);
    expect(items).toEqual([1, 2, 3, 4, 5]);
  });
  test("chunks are copies, not views onto the input", () => {
    const items = [1, 2, 3, 4];
    const chunks = chunk(items, 2);
    chunks[0]![0] = 99;
    expect(items).toEqual([1, 2, 3, 4]);
  });
});
