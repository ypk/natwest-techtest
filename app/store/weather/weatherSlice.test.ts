import { describe, expect, it } from "vitest";
import { RequestStatus, resetSearch, setCity, weatherReducer } from "./index";
import type { WeatherState } from "./index";

describe("weatherSlice", () => {
  const initialState: WeatherState = {
    city: "",
    status: RequestStatus.IDLE,
    weather: null,
    error: null,
  };

  it("returns the initial state", () => {
    expect(weatherReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("handles setCity action", () => {
    const nextState = weatherReducer(initialState, setCity("London"));
    expect(nextState.city).toBe("London");
  });

  it("handles resetSearch action", () => {
    const populatedState: WeatherState = {
      city: "London",
      status: RequestStatus.SUCCESS,
      weather: {
        city: "London",
        country: "GB",
        temperature: 20,
        feelsLike: 19,
        humidity: 50,
        windSpeed: 3.5,
        condition: { description: "Sunny", icon: "01d", main: "Clear" },
      },
      error: null,
    };

    const resetState = weatherReducer(populatedState, resetSearch());
    expect(resetState).toEqual(initialState);
  });
});
