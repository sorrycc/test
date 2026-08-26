import { describe, expect, test } from "bun:test";
import { sortBy } from "./sortBy";

describe("sortBy", () => {
  test("sorts ascending by key", () => {
    const items = [{ n: 3 }, { n: 1 }, { n: 2 }];
    expect(sortBy(items, "n")).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }]);
  });
  test("does not mutate the input", () => {
    const items = [{ n: 2 }, { n: 1 }];
    sortBy(items, "n");
    expect(items).toEqual([{ n: 2 }, { n: 1 }]);
  });
  test("sorts strings", () => {
    expect(sortBy([{ s: "b" }, { s: "a" }], "s")).toEqual([{ s: "a" }, { s: "b" }]);
  });
});
