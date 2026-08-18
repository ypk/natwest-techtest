import { describe, expect, it } from "vitest";
import { mapForecastFromOpenWeather } from "./mapForecast";
import type { OpenWeatherForecastResponse } from "./openWeather.contracts";

describe("mapForecastFromOpenWeather", () => {
  it("returns empty array when list is missing or empty", () => {
    expect(mapForecastFromOpenWeather({} as OpenWeatherForecastResponse)).toEqual([]);
  });

  it("maps forecast items correctly with temperature rounding", () => {
    const rawResponse: OpenWeatherForecastResponse = {
      cod: "200",
      message: 0,
      cnt: 1,
      list: [
        {
          dt: 1700000000,
          dt_txt: "2023-11-14 22:13:20",
          main: {
            temp: 18.6,
            feels_like: 17.8,
            temp_min: 16.2,
            temp_max: 19.8,
            humidity: 65.4,
          },
          weather: [
            {
              main: "Rain",
              description: "light rain",
              icon: "10d",
            },
          ],
          wind: {
            speed: 4.12,
          },
        },
      ],
      city: {
        name: "London",
        country: "GB",
      },
    };

    const result = mapForecastFromOpenWeather(rawResponse);

    expect(result).toHaveLength(1);
    expect(result[0].temperature).toBe(19);
    expect(result[0].tempMin).toBe(16);
    expect(result[0].tempMax).toBe(20);
    expect(result[0].humidity).toBe(65);
    expect(result[0].windSpeed).toBe(4.1);
    expect(result[0].condition.description).toBe("light rain");
    expect(result[0].condition.icon).toBe("10d");
    expect(result[0].dateTimeText).toContain(",");
  });
});
