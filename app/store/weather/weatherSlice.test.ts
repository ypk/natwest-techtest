import { describe, expect, it } from "vitest";
import type { CachedWeatherEntry, CurrentWeather } from "~/types/weather";
import { RequestStatus, resetSearch, setCity, weatherReducer } from "./index";
import type { WeatherState } from "./index";

const sampleWeather: CurrentWeather = {
  city: "London",
  country: "GB",
  temperature: 20,
  feelsLike: 19,
  humidity: 50,
  windSpeed: 3.5,
  condition: { description: "Sunny", icon: "01d", main: "Clear" },
};

const sampleEntry: CachedWeatherEntry = {
  weather: sampleWeather,
  timestamp: 1700000000000,
};

describe("weatherSlice", () => {
  const initialState: WeatherState = {
    city: "",
    status: RequestStatus.IDLE,
    weather: null,
    suggestions: null,
    error: null,
    cache: {},
  };

  it("returns the initial state", () => {
    expect(weatherReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("handles setCity action", () => {
    const nextState = weatherReducer(initialState, setCity("London"));
    expect(nextState.city).toBe("London");
  });

  it("handles resetSearch action without losing cache", () => {
    const populatedState: WeatherState = {
      city: "London",
      status: RequestStatus.SUCCESS,
      weather: sampleWeather,
      suggestions: null,
      error: null,
      cache: { london: sampleEntry },
    };

    const resetState = weatherReducer(populatedState, resetSearch());
    expect(resetState.city).toBe("");
    expect(resetState.status).toBe(RequestStatus.IDLE);
    expect(resetState.weather).toBeNull();
    expect(resetState.suggestions).toBeNull();
    expect(resetState.cache).toEqual({ london: sampleEntry });
  });
});
