import { describe, expect, test } from "bun:test";
import { parseDuration } from "./parseDuration";

describe("parseDuration", () => {
  test("hours", () => {
    expect(parseDuration("2h")).toBe(2 * 3600_000);
  });
  test("minutes", () => {
    expect(parseDuration("30m")).toBe(30 * 60_000);
  });
  test("seconds", () => {
    expect(parseDuration("45s")).toBe(45_000);
  });
  test("rejects garbage", () => {
    expect(() => parseDuration("soon")).toThrow(/invalid duration/);
  });
});
