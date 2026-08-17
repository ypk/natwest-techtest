import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchWeatherThunk } from "./weatherThunks";
import { RequestStatus } from "./weatherTypes";
import type { WeatherState } from "./weatherTypes";

const initialState: WeatherState = {
  city: "",
  status: RequestStatus.IDLE,
  weather: null,
  error: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
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
      })
      .addCase(fetchWeatherThunk.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.status = RequestStatus.ERROR;
        state.error = action.payload ?? "Unable to fetch weather.";
      });
  },
});

export const { setCity, resetSearch } = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
