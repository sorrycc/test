import { describe, expect, test } from "bun:test";
// Namespace import so this file loads on trees where clamp is not exported
// yet and fails with assertion errors rather than a module link error.
import * as rangeModule from "./range";

const { clamp } = rangeModule as typeof rangeModule & {
  clamp: (n: number, min: number, max: number) => number;
};

describe("clamp", () => {
  test("is exported from range", () => {
    expect(typeof clamp).toBe("function");
  });
  test("returns n when within [min, max]", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, -10, 10)).toBe(-3);
  });
  test("clamps to min when n is below", () => {
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(-20, -10, 10)).toBe(-10);
  });
  test("clamps to max when n is above", () => {
    expect(clamp(11, 0, 10)).toBe(10);
    expect(clamp(0.5, 0, 0.25)).toBe(0.25);
  });
  test("returns boundary values unchanged", () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
    expect(clamp(3, 3, 3)).toBe(3);
  });
  test("rejects min greater than max", () => {
    expect(() => clamp(5, 10, 0)).toThrow("min must be <= max");
  });
});
