
import type { CurrentWeather } from "~/features/weather/weatherTypes";

import { getCurrentWeatherFromOpenWeather } from "./openWeather/openWeather.service";

type WeatherService = {
  getCurrentWeather: (
    city: string,
    signal?: AbortSignal
  ) => Promise<CurrentWeather>;
};

export const weatherService = {
  getCurrentWeather: (city, signal) =>
    getCurrentWeatherFromOpenWeather(
      city,
      process.env.OPENWEATHER_API_KEY ?? "",
      signal
    ),
} satisfies WeatherService;