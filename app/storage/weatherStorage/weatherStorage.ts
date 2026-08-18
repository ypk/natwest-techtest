import type { CachedWeatherEntry } from "~/types/weather";
import { storageProvider } from "../provider/storageProvider";

const WEATHER_CACHE_KEY = "natwest_weather_cache";

export function loadCachedWeather(): Record<string, CachedWeatherEntry> {
  const raw = storageProvider.getItem(WEATHER_CACHE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, CachedWeatherEntry>;
  } catch (err) {
    console.warn("[WEATHER_STORAGE PARSE ERROR]", err);
    return {};
  }
}

export function saveCachedWeather(cache: Record<string, CachedWeatherEntry>): void {
  try {
    storageProvider.setItem(WEATHER_CACHE_KEY, JSON.stringify(cache));
  } catch (err) {
    console.warn("[WEATHER_STORAGE SAVE ERROR]", err);
  }
}

export function clearCachedWeather(): void {
  storageProvider.removeItem(WEATHER_CACHE_KEY);
}
