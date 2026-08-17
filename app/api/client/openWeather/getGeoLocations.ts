import type { LocationSuggestion } from "~/types/weather";
import type { OpenWeatherGeoItem } from "./openWeather.contracts";
import { openWeatherSettings } from "./openWeather.settings";

export async function getGeoLocationsFromOpenWeather(
  city: string,
  apiKey: string,
  signal?: AbortSignal
): Promise<LocationSuggestion[]> {
  if (!apiKey || !city.trim()) {
    return [];
  }

  const url = new URL(
    openWeatherSettings.geoPath,
    openWeatherSettings.baseUrl
  );

  url.search = new URLSearchParams({
    appid: apiKey,
    q: city.trim(),
    limit: "5",
  }).toString();

  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (fetchErr) {
    const cause = fetchErr instanceof Error ? (fetchErr as unknown as Record<string, unknown>).cause : undefined;
    console.error("[OPENWEATHER GEO FETCH FAILED]", {
      url: url.toString().replace(apiKey, "[REDACTED]"),
      error: fetchErr instanceof Error ? fetchErr.message : fetchErr,
      cause: cause instanceof Error ? cause.message : cause,
    });
    return [];
  }

  if (!response.ok) {
    return [];
  }

  try {
    const items = (await response.json()) as OpenWeatherGeoItem[];
    if (!Array.isArray(items)) return [];

    const seen = new Set<string>();
    const suggestions: LocationSuggestion[] = [];

    for (const item of items) {
      const key = `${item.name.toLowerCase()}-${item.country.toLowerCase()}-${(item.state || "").toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        suggestions.push({
          name: item.name,
          country: item.country,
          state: item.state,
          query: `${item.name}, ${item.country}`,
        });
      }
    }

    return suggestions;
  } catch {
    return [];
  }
}
