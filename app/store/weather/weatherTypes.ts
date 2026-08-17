import type { CurrentWeather, LocationSuggestion } from "~/types/weather";

export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  DISAMBIGUATION = "disambiguation",
}

export interface WeatherState {
  city: string;
  status: RequestStatus;
  weather: CurrentWeather | null;
  suggestions: LocationSuggestion[] | null;
  error: string | null;
  cache: Record<string, CurrentWeather>;
}
