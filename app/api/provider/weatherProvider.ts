import {
  fetchWeather,
  fetchForecast,
  fetchLocations,
} from "../client/openWeather";
import type { WeatherProvider } from "./weatherProvider.types";

export const weatherProvider: WeatherProvider = {
  getCurrentWeather: (city, signal) =>
    fetchWeather(
      city,
      process.env.OPENWEATHER_API_KEY ?? "",
      signal
    ),
  getGeoLocations: (city, signal) =>
    fetchLocations(
      city,
      process.env.OPENWEATHER_API_KEY ?? "",
      signal
    ),
  getForecast: (city, signal) =>
    fetchForecast(
      city,
      process.env.OPENWEATHER_API_KEY ?? "",
      signal
    ),
};
