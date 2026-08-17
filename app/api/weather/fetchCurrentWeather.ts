import type { CurrentWeather, LocationSuggestion } from "~/types/weather";

export type WeatherSuccessResult = {
  weather: CurrentWeather;
  suggestions?: never;
};

export type WeatherSuggestionsResult = {
  suggestions: LocationSuggestion[];
  city: string;
  weather?: never;
};

export type FetchWeatherResult = WeatherSuccessResult | WeatherSuggestionsResult;

export async function fetchCurrentWeather(
  city: string,
  signal?: AbortSignal
): Promise<FetchWeatherResult> {
  const params = new URLSearchParams({ city });
  const response = await fetch(`/api/weather?${params.toString()}`, { signal });

  if (!response.ok) {
    const error = (await response.json()) as { message?: string };
    throw new Error(error.message || "Unable to fetch weather.");
  }

  const data = await response.json();

  if ("suggestions" in data && Array.isArray(data.suggestions)) {
    return { suggestions: data.suggestions as LocationSuggestion[], city: (data.city as string) || city };
  }

  return { weather: data as CurrentWeather };
}
