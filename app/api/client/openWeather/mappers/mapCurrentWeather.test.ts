import { describe, expect, it } from "vitest";

import type { OpenWeatherCurrentResponse } from "../openWeather.contracts";
import { mapCurrentWeather } from "./mapCurrentWeather";

const fullResponse: OpenWeatherCurrentResponse = {
  name: "London",
  sys: { country: "GB" },
  main: { temp: 18.4, feels_like: 16.8, humidity: 63 },
  wind: { speed: 4.2 },
  weather: [{ description: "light rain", icon: "10d", main: "Rain" }],
};

describe("mapCurrentWeather", () => {
  it("maps an OpenWeather response to CurrentWeather", () => {
    const result = mapCurrentWeather(fullResponse);

    expect(result).toEqual({
      city: "London",
      country: "GB",
      temperature: 18,
      feelsLike: 17,
      humidity: 63,
      windSpeed: 4.2,
      condition: { description: "light rain", iconUrl: "https://openweathermap.org/img/wn/10d@2x.png", main: "Rain" },
    });
  });

  it("rounds temperature values", () => {
    const response = {
      ...fullResponse,
      main: { temp: 18.6, feels_like: 16.2, humidity: 50 },
    };

    const result = mapCurrentWeather(response);

    expect(result.temperature).toBe(19);
    expect(result.feelsLike).toBe(16);
  });

  it("falls back when weather conditions are empty", () => {
    const response = { ...fullResponse, weather: [] };

    const result = mapCurrentWeather(response);

    expect(result.condition).toEqual({
      description: "Weather conditions unavailable",
      iconUrl: "",
      main: "Unknown",
    });
  });
});
