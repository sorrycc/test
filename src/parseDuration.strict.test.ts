import { describe, expect, test } from "bun:test";
import { parseDuration } from "./parseDuration";

describe("parseDuration strict validation", () => {
  test("rejects leading garbage", () => {
    expect(() => parseDuration("x30m")).toThrow(/invalid duration/);
  });
  test("rejects surrounding garbage", () => {
    expect(() => parseDuration("abc 5h!")).toThrow(/invalid duration/);
  });
  test("rejects negative sign", () => {
    expect(() => parseDuration("-5m")).toThrow(/invalid duration/);
  });
  test("rejects trailing garbage", () => {
    expect(() => parseDuration("30mx")).toThrow(/invalid duration/);
  });
  test("rejects empty string", () => {
    expect(() => parseDuration("")).toThrow(/invalid duration/);
  });
  test("sums all segments of a multi-segment duration", () => {
    expect(parseDuration("1h30m")).toBe(3600_000 + 30 * 60_000);
    expect(parseDuration("1h30m15s")).toBe(3600_000 + 30 * 60_000 + 15_000);
  });
});
