import type { CurrentWeather } from "~/types/weather";

export type WeatherProvider = {
  getCurrentWeather: (
    city: string,
    signal?: AbortSignal
  ) => Promise<CurrentWeather>;
};
