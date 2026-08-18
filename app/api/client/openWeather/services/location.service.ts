import type { LocationSuggestion } from "~/types/weather";
import type { OpenWeatherGeoItem } from "../openWeather.contracts";
import { openWeatherSettings } from "../openWeather.settings";
import { openWeatherFetch } from "../openWeatherFetch";

export async function fetchLocations(
  city: string,
  apiKey: string,
  signal?: AbortSignal
): Promise<LocationSuggestion[]> {
  if (!apiKey || !city.trim()) {
    return [];
  }

  const result = await openWeatherFetch({
    path: openWeatherSettings.geoPath,
    params: { q: city.trim(), limit: "5" },
    tag: "OPENWEATHER GEO",
    apiKey,
    signal,
  });

  if (!result.ok) return [];

  const items = result.json as OpenWeatherGeoItem[];
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
}
