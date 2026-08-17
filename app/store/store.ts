import { configureStore } from "@reduxjs/toolkit";
import { weatherReducer } from "./weather";

export function createStore() {
  return configureStore({
    reducer: {
      weather: weatherReducer,
    },
  });
}

export const store = createStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
