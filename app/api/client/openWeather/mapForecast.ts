import type { ForecastItem } from "~/types/weather";
import type { OpenWeatherForecastResponse } from "./openWeather.contracts";
import { getIconUrl } from "./openWeather.settings";

export function formatForecastDateTime(dt: number): string {
  const date = new Date(dt * 1000);
  const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
  const time = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${weekday}, ${time}`;
}

export function mapForecastFromOpenWeather(
  response: OpenWeatherForecastResponse
): ForecastItem[] {
  if (!response?.list || !Array.isArray(response.list)) {
    return [];
  }

  return response.list.map((item) => {
    const condition = item.weather?.[0];

    return {
      dt: item.dt,
      dateTimeText: formatForecastDateTime(item.dt),
      temperature: Math.round(item.main.temp),
      tempMin: Math.round(item.main.temp_min),
      tempMax: Math.round(item.main.temp_max),
      humidity: Math.round(item.main.humidity),
      windSpeed: Math.round(item.wind.speed * 10) / 10,
      condition: condition
        ? {
            description: condition.description,
            iconUrl: getIconUrl(condition.icon),
            main: condition.main,
          }
        : {
            description: "N/A",
            iconUrl: getIconUrl("01d"),
            main: "Clear",
          },
    };
  });
}
