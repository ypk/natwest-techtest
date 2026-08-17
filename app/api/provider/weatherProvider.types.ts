import type { CurrentWeather, LocationSuggestion } from "~/types/weather";

export interface WeatherProvider {
  getCurrentWeather(
    city: string,
    signal?: AbortSignal
  ): Promise<CurrentWeather>;
  getGeoLocations?(
    city: string,
    signal?: AbortSignal
  ): Promise<LocationSuggestion[]>;
}
