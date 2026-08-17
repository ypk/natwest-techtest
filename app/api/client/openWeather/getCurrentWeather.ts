import { openWeatherSettings } from "./openWeather.settings";
import type { OpenWeatherErrorResponse } from "./openWeather.contracts";
import { mapCurrentWeather } from "./mapCurrentWeather";

export async function getCurrentWeatherFromOpenWeather(
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

  const url = new URL(
    openWeatherSettings.currentWeatherPath,
    openWeatherSettings.baseUrl
  );

  url.search = new URLSearchParams({
    appid: apiKey,
    q: city,
    units: "metric",
  }).toString();

  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (fetchErr) {
    const cause = fetchErr instanceof Error ? (fetchErr as unknown as Record<string, unknown>).cause : undefined;
    console.error("[OPENWEATHER FETCH FAILED]", {
      url: url.toString().replace(apiKey, "[REDACTED]"),
      error: fetchErr instanceof Error ? fetchErr.message : fetchErr,
      cause: cause instanceof Error ? cause.message : cause,
    });
    throw fetchErr;
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[OPENWEATHER HTTP ${response.status}]`, {
      url: url.toString().replace(apiKey, "[REDACTED]"),
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });

    let errorMessage = "Unable to fetch weather.";
    try {
      const errorJson = JSON.parse(errorText) as OpenWeatherErrorResponse;
      errorMessage = errorJson.message || errorMessage;
    } catch {
      // Keep default error message if JSON parsing fails
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();

  return mapCurrentWeather(data);
}
