import { describe, expect, it } from "vitest";
import { convertTemp, convertWind } from "./unit";

describe("unit conversion utilities", () => {
  it("converts Celsius to Fahrenheit correctly", () => {
    expect(convertTemp(0, true)).toBe(32);
    expect(convertTemp(20, true)).toBe(68);
    expect(convertTemp(-10, true)).toBe(14);
    expect(convertTemp(100, true)).toBe(212);
  });

  it("leaves Celsius unchanged when isImperial is false", () => {
    expect(convertTemp(20, false)).toBe(20);
  });

  it("converts meters per second to miles per hour correctly", () => {
    expect(convertWind(0, true)).toBe(0);
    expect(convertWind(1, true)).toBe(2.2);
    expect(convertWind(5, true)).toBe(11.2);
  });

  it("leaves meters per second unchanged when isImperial is false", () => {
    expect(convertWind(5, false)).toBe(5);
  });
});
