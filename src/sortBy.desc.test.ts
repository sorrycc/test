import { describe, expect, test } from "bun:test";
import { sortBy } from "./sortBy";

describe("sortBy with desc option", () => {
  test("sorts descending by numeric key", () => {
    const items = [{ n: 1 }, { n: 3 }, { n: 2 }];
    expect(sortBy(items, "n", { desc: true })).toEqual([{ n: 3 }, { n: 2 }, { n: 1 }]);
  });

  test("sorts descending by string key", () => {
    const items = [{ s: "a" }, { s: "c" }, { s: "b" }];
    expect(sortBy(items, "s", { desc: true })).toEqual([{ s: "c" }, { s: "b" }, { s: "a" }]);
  });

  test("does not mutate the input when desc is set", () => {
    const items = [{ n: 1 }, { n: 2 }];
    sortBy(items, "n", { desc: true });
    expect(items).toEqual([{ n: 1 }, { n: 2 }]);
  });
});
