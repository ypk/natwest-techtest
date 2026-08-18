import type { OpenWeatherCurrentResponse, OpenWeatherErrorResponse } from "../openWeather.contracts";
import { mapCurrentWeather } from "../mappers/mapCurrentWeather";
import { openWeatherSettings } from "../openWeather.settings";
import { openWeatherFetch } from "../openWeatherFetch";

export async function fetchWeather(
  city: string,
  apiKey: string,
  signal?: AbortSignal
) {
  if (!apiKey) {
    console.error(
      "[OPENWEATHER CLIENT ERROR] OpenWeather API key is empty or undefined."
    );
    throw new Error(
      "Something went wrong, please try again later.\nCode: ERR_CONFIG_MISSING"
    );
  }

  const result = await openWeatherFetch({
    path: openWeatherSettings.currentWeatherPath,
    params: { q: city, units: "metric" },
    tag: "OPENWEATHER",
    apiKey,
    signal,
    rethrowOnAbort: true,
  });

  if (!result.ok) {
    // openWeatherFetch already logged the HTTP error; attempt to surface
    // the API's own message (e.g. "city not found") for the user.
    let errorMessage = "Unable to fetch weather.";
    try {
      const parsed = JSON.parse(result.body ?? "") as OpenWeatherErrorResponse;
      errorMessage = parsed.message || errorMessage;
    } catch {
      // Keep default error message if body is unavailable or unparseable
    }
    throw new Error(errorMessage);
  }

  return mapCurrentWeather(result.json as OpenWeatherCurrentResponse);
}
