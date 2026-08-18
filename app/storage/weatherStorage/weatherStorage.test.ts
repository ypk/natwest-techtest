import { beforeEach, describe, expect, it } from "vitest";
import type { CachedWeatherEntry, CurrentWeather } from "~/types/weather";
import { clearCachedWeather, loadCachedWeather, saveCachedWeather } from "./weatherStorage";

const sampleWeather: CurrentWeather = {
  city: "London",
  country: "GB",
  temperature: 18,
  feelsLike: 17,
  humidity: 63,
  windSpeed: 4.2,
  condition: { description: "rain", icon: "10d", main: "Rain" },
};

const sampleEntry: CachedWeatherEntry = {
  weather: sampleWeather,
  timestamp: 1700000000000,
};

describe("weatherStorage facade", () => {
  beforeEach(() => {
    clearCachedWeather();
  });

  it("returns empty object when storage is empty", () => {
    expect(loadCachedWeather()).toEqual({});
  });

  it("saves and loads cached weather data", () => {
    const cache = { london: sampleEntry };
    saveCachedWeather(cache);

    expect(loadCachedWeather()).toEqual(cache);
  });

  it("clears cached weather data", () => {
    saveCachedWeather({ london: sampleEntry });
    clearCachedWeather();

    expect(loadCachedWeather()).toEqual({});
  });
});
