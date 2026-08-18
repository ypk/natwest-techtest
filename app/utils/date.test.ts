import { describe, expect, it } from "vitest";
import { formatForecastDateTime } from "./date";

describe("formatForecastDateTime", () => {
  it("formats Unix timestamps to short readable date/time string in en-GB format", () => {
    // 1700000000 corresponds to Tuesday, 14 November 2023 22:13:20 GMT
    const result = formatForecastDateTime(1700000000);
    
    expect(result).toBe("Tue, 10:13 pm");
  });
});
