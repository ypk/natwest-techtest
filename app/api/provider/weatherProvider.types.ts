import type { CurrentWeather } from "~/features/weather/weatherTypes";

export type WeatherProvider = {
  getCurrentWeather: (
    city: string,
    signal?: AbortSignal
  ) => Promise<CurrentWeather>;
};
