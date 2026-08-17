import type { CurrentWeather } from "~/types/weather";

export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface WeatherState {
  city: string;
  status: RequestStatus;
  weather: CurrentWeather | null;
  error: string | null;
  cache: Record<string, CurrentWeather>;
}
