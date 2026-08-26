import { describe, expect, test } from "bun:test";
import { parseDuration } from "./parseDuration";

describe("parseDuration combined segments", () => {
  test("hours and minutes", () => {
    expect(parseDuration("1h30m")).toBe(5400_000);
  });
  test("minutes and seconds", () => {
    expect(parseDuration("2m30s")).toBe(150_000);
  });
  test("all three units", () => {
    expect(parseDuration("1h2m3s")).toBe(3600_000 + 120_000 + 3000);
  });
  test("repeated units accumulate", () => {
    expect(parseDuration("30m30m")).toBe(3600_000);
  });
  test("multi-digit segments after the first", () => {
    expect(parseDuration("1h120s")).toBe(3600_000 + 120_000);
  });
  test("rejects uppercase units", () => {
    expect(() => parseDuration("1H30M")).toThrow(/invalid duration/);
    expect(() => parseDuration("1h30M")).toThrow(/invalid duration/);
  });
  test("rejects trailing garbage instead of dropping it", () => {
    expect(() => parseDuration("1h30")).toThrow(/invalid duration/);
    expect(() => parseDuration("2h junk")).toThrow(/invalid duration/);
  });
});
