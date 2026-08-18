import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentWeather } from "~/api/weather/fetchCurrentWeather";
import type { FetchWeatherResult } from "~/api/weather/fetchCurrentWeather";
import type { RootState } from "~/store/store";

export const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export const fetchWeatherThunk = createAsyncThunk<
  FetchWeatherResult,
  string,
  { state: RootState; rejectValue: string }
>("weather/fetchCurrentWeather", async (cityName, { getState, rejectWithValue, signal }) => {
  const normalizedKey = cityName.toLowerCase().trim();
  const cachedEntry = getState().weather?.cache?.[normalizedKey];

  if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL_MS) {
    return { weather: cachedEntry.weather };
  }

  try {
    return await fetchCurrentWeather(cityName, signal);
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw err;
    }
    const message = err instanceof Error ? err.message : "Unable to fetch weather.";
    return rejectWithValue(message);
  }
});
