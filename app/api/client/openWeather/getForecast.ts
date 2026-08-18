import type { ForecastItem } from "~/types/weather";
import { mapForecastFromOpenWeather } from "./mapForecast";
import type { OpenWeatherForecastResponse } from "./openWeather.contracts";
import { openWeatherSettings } from "./openWeather.settings";

export async function getForecastFromOpenWeather(
  city: string,
  apiKey: string,
  signal?: AbortSignal
): Promise<ForecastItem[]> {
  if (!apiKey || !apiKey.trim()) {
    return [];
  }

  const url = new URL(
    openWeatherSettings.forecastPath,
    openWeatherSettings.baseUrl
  );

  url.search = new URLSearchParams({
    appid: apiKey,
    q: city.trim(),
    units: "metric",
  }).toString();

  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (fetchErr) {
    if (fetchErr instanceof DOMException && fetchErr.name === "AbortError") {
      throw fetchErr;
    }
    const cause = fetchErr instanceof Error ? (fetchErr as unknown as Record<string, unknown>).cause : undefined;
    console.error("[OPENWEATHER FORECAST FETCH FAILED]", {
      url: url.toString().replace(apiKey, "[REDACTED]"),
      error: fetchErr instanceof Error ? fetchErr.message : fetchErr,
      cause: cause instanceof Error ? cause.message : cause,
    });
    return [];
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[OPENWEATHER FORECAST HTTP ${response.status}]`, {
      url: url.toString().replace(apiKey, "[REDACTED]"),
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    return [];
  }

  try {
    const data = (await response.json()) as OpenWeatherForecastResponse;
    return mapForecastFromOpenWeather(data);
  } catch (parseErr) {
    console.error("[OPENWEATHER FORECAST PARSE ERROR]", {
      url: url.toString().replace(apiKey, "[REDACTED]"),
      error: parseErr instanceof Error ? parseErr.message : parseErr,
    });
    return [];
  }
}
