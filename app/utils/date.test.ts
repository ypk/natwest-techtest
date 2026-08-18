import { describe, expect, it } from "vitest";
import { formatForecastDateTime, groupForecastByDay } from "./date";
import type { ForecastItem } from "~/types/weather";

describe("formatForecastDateTime", () => {
  it("formats Unix timestamps to short readable date/time string in en-GB format", () => {
    // 1700000000 corresponds to Tuesday, 14 November 2023 22:13:20 GMT
    const result = formatForecastDateTime(1700000000);
    
    expect(result).toBe("Tue, 10:13 pm");
  });
});

describe("groupForecastByDay", () => {
  it("groups forecast items by calendar day in chronological order", () => {
    const items: ForecastItem[] = [
      {
        dt: 1700000000, // Tue, 14 Nov 2023
        dateTimeText: "Tue, 10:13 pm",
        temperature: 15,
        tempMin: 15,
        tempMax: 15,
        humidity: 60,
        windSpeed: 3.5,
        condition: { description: "clear", iconUrl: "", main: "Clear" },
      },
      {
        dt: 1700010800, // Tue, 14 Nov 2023 (+3 hours)
        dateTimeText: "Wed, 1:13 am", // Wait, 1700010800 is Wednesday in UK (approx +3 hours is Wed 1am)
        temperature: 14,
        tempMin: 14,
        tempMax: 14,
        humidity: 65,
        windSpeed: 3.2,
        condition: { description: "clear", iconUrl: "", main: "Clear" },
      },
      {
        dt: 1700097200, // Thu, 16 Nov 2023 (approx +24 hours)
        dateTimeText: "Thu, 1:13 am",
        temperature: 12,
        tempMin: 12,
        tempMax: 12,
        humidity: 70,
        windSpeed: 2.8,
        condition: { description: "clouds", iconUrl: "", main: "Clouds" },
      },
    ];

    const grouped = groupForecastByDay(items);

    expect(grouped).toHaveLength(3);
    
    // Check first day (Tue, 14 Nov)
    expect(grouped[0].dayLabel).toBe("Tuesday 14 Nov");
    expect(grouped[0].items).toHaveLength(1);
    expect(grouped[0].items[0].dt).toBe(1700000000);

    // Check second day (Wed, 15 Nov)
    expect(grouped[1].dayLabel).toBe("Wednesday 15 Nov");
    expect(grouped[1].items).toHaveLength(1);
    
    // Check third day (Thu, 16 Nov)
    expect(grouped[2].dayLabel).toBe("Thursday 16 Nov");
    expect(grouped[2].items).toHaveLength(1);
  });
});
