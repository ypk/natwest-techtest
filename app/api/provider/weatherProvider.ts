import {
  fetchWeather,
  fetchForecast,
  fetchLocations,
} from "../client/openWeather";
import type { WeatherProvider } from "./weatherProvider.types";

const apiKey = (typeof process !== "undefined" && process.env ? process.env.OPENWEATHER_API_KEY : "") ?? "";

export const weatherProvider: WeatherProvider = {
  getCurrentWeather: (city, signal) => fetchWeather(city, apiKey, signal),
  getGeoLocations: (city, signal) => fetchLocations(city, apiKey, signal),
  getForecast: (city, signal) => fetchForecast(city, apiKey, signal),
};
