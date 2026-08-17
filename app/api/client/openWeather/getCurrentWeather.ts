import { openWeatherSettings } from "./openWeather.settings";
import type { OpenWeatherErrorResponse } from "./openWeather.contracts";
import { mapCurrentWeather } from "./mapCurrentWeather";

export async function getCurrentWeatherFromOpenWeather(
  city: string,
  apiKey: string,
  signal?: AbortSignal
) {
  if (!apiKey) {
    throw new Error("OpenWeather API key is missing.");
  }

  const url = new URL(
    openWeatherSettings.currentWeatherPath,
    openWeatherSettings.baseUrl
  );

  url.search = new URLSearchParams({
    appid: apiKey,
    q: city,
    units: "metric",
  }).toString();

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = (await response.json()) as OpenWeatherErrorResponse;
    throw new Error(error.message || "Unable to fetch weather.");
  }

  const data = await response.json();

  return mapCurrentWeather(data);
}
