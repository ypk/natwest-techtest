import { getCurrentWeatherFromOpenWeather } from "../client/openWeather";
import type { WeatherProvider } from "./weatherProvider.types";

export const weatherProvider: WeatherProvider = {
  getCurrentWeather: (city, signal) =>
    getCurrentWeatherFromOpenWeather(
      city,
      process.env.OPENWEATHER_API_KEY ?? "",
      signal
    ),
};
