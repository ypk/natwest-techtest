import { useCallback, useEffect } from "react";
import type { SubmitEventHandler } from "react";
import { useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import {
  RequestStatus,
  fetchWeatherThunk,
  resetSearch,
  setCity as setCityAction,
  setError as setErrorAction,
} from "~/store/weather";

import { UNITS_STORAGE_KEY } from "~/constants/layout";

export { RequestStatus };

export function useWeatherSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const { city, status, weather, suggestions, error } = useAppSelector((state) => state.weather);

  const setCity = useCallback(
    (cityName: string) => {
      dispatch(setCityAction(cityName));
    },
    [dispatch]
  );

  const urlCity = searchParams.get("city")?.trim() || "";

  // Retrieve initial units from URL or fallback to localStorage
  const urlUnits = (() => {
    const param = searchParams.get("units")?.trim();
    if (param === "metric" || param === "imperial") {
      return param;
    }
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(UNITS_STORAGE_KEY);
      if (stored === "metric" || stored === "imperial") {
        return stored;
      }
    }
    return "metric";
  })();

  // Synchronize URL units query parameter if missing
  useEffect(() => {
    if (!searchParams.has("units")) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("units", urlUnits);
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams, urlUnits]);

  useEffect(() => {
    if (urlCity) {
      dispatch(setCityAction(urlCity));
      dispatch(fetchWeatherThunk(urlCity));
    }
  }, [urlCity, dispatch]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmed = city.trim();

    if (!trimmed) {
      dispatch(setErrorAction("Please enter a city name."));
      return;
    }

    setSearchParams({ city: trimmed, units: urlUnits });
  };

  const handleReset = () => {
    dispatch(resetSearch());
    setSearchParams({ units: urlUnits });
  };

  const handleUnitChange = (newUnits: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(UNITS_STORAGE_KEY, newUnits);
    }
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("units", newUnits);
    setSearchParams(nextParams);
  };

  const isLoading = status === RequestStatus.LOADING;

  return {
    city,
    setCity,
    status,
    weather,
    suggestions,
    error,
    isLoading,
    handleSubmit,
    handleReset,
    units: urlUnits,
    handleUnitChange,
  };
}
