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

  const { city, status, weather, error } = useAppSelector((state) => state.weather);

  const setCity = useCallback(
    (cityName: string) => {
      dispatch(setCityAction(cityName));
    },
    [dispatch]
  );

  const fetchWeather = useCallback(
    (cityName: string) => {
      dispatch(fetchWeatherThunk(cityName));
    },
    [dispatch]
  );

  useEffect(() => {
    const initialCity = searchParams.get("city")?.trim();
    if (initialCity) {
      setCity(initialCity);
      fetchWeather(initialCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmed = city.trim();

    if (!trimmed) {
      dispatch(setErrorAction("Please enter a city name."));
      return;
    }

    setSearchParams({ city: trimmed });
    fetchWeather(trimmed);
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
    error,
    isLoading,
    handleSubmit,
    handleReset,
  };
}
