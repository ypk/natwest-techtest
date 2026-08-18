import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { DailyForecastGroup } from "~/utils/date";
import { useTabs } from "./useTabs";

const sampleForecast: DailyForecastGroup[] = [
  {
    dayLabel: "Tuesday 14 Nov",
    items: [
      {
        dt: 1700000000,
        dateTimeText: "Tue, 12:00 PM",
        temperature: 19,
        tempMin: 16,
        tempMax: 20,
        humidity: 65,
        windSpeed: 4.1,
        condition: { description: "light rain", iconUrl: "https://openweathermap.org/img/wn/10d@2x.png", main: "Rain" },
      },
    ],
  },
  {
    dayLabel: "Wednesday 15 Nov",
    items: [
      {
        dt: 1700086400,
        dateTimeText: "Wed, 12:00 PM",
        temperature: 15,
        tempMin: 12,
        tempMax: 17,
        humidity: 70,
        windSpeed: 3.5,
        condition: { description: "cloudy", iconUrl: "https://openweathermap.org/img/wn/03d@2x.png", main: "Clouds" },
      },
    ],
  },
];

describe("useTabs hook", () => {
  it("initializes with layout default list (panels), active tab first day, and calculates details", () => {
    const { result } = renderHook(() => useTabs(sampleForecast));

    expect(result.current.layout).toBe("list");
    expect(result.current.activeTab).toBe("Tuesday 14 Nov");
    expect(result.current.tabDetails).toHaveLength(2);
    
    // Check Tuesday calculation
    expect(result.current.tabDetails[0].weekday).toBe("Tue");
    expect(result.current.tabDetails[0].dayMonth).toBe("14 Nov");
    expect(result.current.tabDetails[0].minTemp).toBe(19);
    expect(result.current.tabDetails[0].maxTemp).toBe(19);
    
    expect(result.current.activeGroup?.dayLabel).toBe("Tuesday 14 Nov");
  });

  it("can be initialized with tabs layout explicitly", () => {
    const { result } = renderHook(() => useTabs(sampleForecast, "tabs"));
    expect(result.current.layout).toBe("tabs");
  });

  it("switches active tab and updates activeGroup", () => {
    const { result } = renderHook(() => useTabs(sampleForecast));

    act(() => {
      result.current.setActiveTab("Wednesday 15 Nov");
    });

    expect(result.current.activeTab).toBe("Wednesday 15 Nov");
    expect(result.current.activeGroup?.dayLabel).toBe("Wednesday 15 Nov");
  });

  it("switches layout when setLayout is called", () => {
    const { result } = renderHook(() => useTabs(sampleForecast));

    act(() => {
      result.current.setLayout("list");
    });

    expect(result.current.layout).toBe("list");
  });
});
