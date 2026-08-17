import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentWeather } from "~/api/weather";
import type { RootState } from "~/store/store";
import type { CurrentWeather } from "~/types/weather";

export const fetchWeatherThunk = createAsyncThunk<
  CurrentWeather,
  string,
  { state: RootState; rejectValue: string }
>("weather/fetchCurrentWeather", async (cityName, { getState, rejectWithValue, signal }) => {
  const normalizedKey = cityName.toLowerCase().trim();
  const cachedWeather = getState().weather?.cache?.[normalizedKey];

  if (cachedWeather) {
    return cachedWeather;
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
