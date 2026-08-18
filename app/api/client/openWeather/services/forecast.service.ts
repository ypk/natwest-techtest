import type { ForecastItem } from "~/types/weather";
import { mapForecastFromOpenWeather } from "../mappers/mapForecast";
import type { OpenWeatherForecastResponse } from "../openWeather.contracts";
import { openWeatherSettings } from "../openWeather.settings";
import { openWeatherFetch } from "../openWeatherFetch";

export async function fetchForecast(
  city: string,
  apiKey: string,
  signal?: AbortSignal
): Promise<ForecastItem[]> {
  if (!apiKey?.trim()) {
    return [];
  }

  const result = await openWeatherFetch({
    path: openWeatherSettings.forecastPath,
    params: { q: city.trim(), units: "metric" },
    tag: "OPENWEATHER FORECAST",
    apiKey,
    signal,
    rethrowOnAbort: true,
  });

  if (!result.ok) return [];

  return mapForecastFromOpenWeather(result.json as OpenWeatherForecastResponse);
}
