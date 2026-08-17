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

    setSearchParams({ city: trimmed });
  };

  const handleReset = () => {
    dispatch(resetSearch());
    setSearchParams({});
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
  };
}
