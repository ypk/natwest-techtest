import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loadCachedWeather, saveCachedWeather } from "~/storage";
import { fetchWeatherThunk } from "./weatherThunks";
import { RequestStatus } from "./weatherTypes";
import type { WeatherState } from "./weatherTypes";

const initialState: WeatherState = {
  city: "",
  status: RequestStatus.IDLE,
  weather: null,
  error: null,
  cache: loadCachedWeather(),
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.status = RequestStatus.ERROR;
      state.error = action.payload;
    },
    resetSearch(state) {
      state.city = "";
      state.status = RequestStatus.IDLE;
      state.weather = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherThunk.pending, (state) => {
        state.status = RequestStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchWeatherThunk.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.weather = action.payload;
        state.error = null;

        const normalizedKey = action.payload.city.toLowerCase().trim();
        state.cache[normalizedKey] = action.payload;
        saveCachedWeather(state.cache);
      })
      .addCase(fetchWeatherThunk.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = RequestStatus.ERROR;
        state.error = action.payload ?? "Unable to fetch weather.";
      });
  },
});

export const { setCity, setError, resetSearch } = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
