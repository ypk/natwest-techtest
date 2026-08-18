import type { ForecastItem } from "~/types/weather";
import type { OpenWeatherForecastResponse } from "../openWeather.contracts";
import { getIconUrl } from "../openWeather.settings";
import { formatForecastDateTime } from "~/utils/date";

export function mapForecastFromOpenWeather(
  response: OpenWeatherForecastResponse
): ForecastItem[] {
  if (!response?.list || !Array.isArray(response.list)) {
    return [];
  }

  return response.list.map(({ dt, main, wind, weather }) => {
    const condition = weather?.[0];

    return {
      dt,
      dateTimeText: formatForecastDateTime(dt),
      temperature: Math.round(main.temp),
      tempMin: Math.round(main.temp_min),
      tempMax: Math.round(main.temp_max),
      humidity: Math.round(main.humidity),
      windSpeed: Math.round(wind.speed * 10) / 10,
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
