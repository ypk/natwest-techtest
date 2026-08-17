import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentWeather } from "~/api/weather";
import type { CurrentWeather } from "~/types/weather";

export const fetchWeatherThunk = createAsyncThunk<
  CurrentWeather,
  string,
  { rejectValue: string }
>("weather/fetchCurrentWeather", async (cityName, { rejectWithValue, signal }) => {
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
