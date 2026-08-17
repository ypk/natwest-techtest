import { useCallback, useEffect, useRef, useState } from "react";
import type { SubmitEventHandler } from "react";
import { useSearchParams } from "react-router";
import { fetchCurrentWeather } from "~/api/weather";
import type { CurrentWeather } from "~/features/weather/weatherTypes";

export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export function useWeatherSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.IDLE);
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchWeather = useCallback(async (cityName: string) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus(RequestStatus.LOADING);
    setError(null);

    try {
      const result = await fetchCurrentWeather(cityName, controller.signal);
      setWeather(result);
      setStatus(RequestStatus.SUCCESS);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Unable to fetch weather.");
      setStatus(RequestStatus.ERROR);
    }
  }, []);

  useEffect(() => {
    const initialCity = searchParams.get("city")?.trim();
    if (initialCity) {
      fetchWeather(initialCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const trimmed = city.trim();

    if (!trimmed) {
      setError("Please enter a city name.");
      setStatus(RequestStatus.ERROR);
      return;
    }

    setSearchParams({ city: trimmed });
    fetchWeather(trimmed);
  };

  function handleReset() {
    abortControllerRef.current?.abort();
    setCity("");
    setWeather(null);
    setError(null);
    setStatus(RequestStatus.IDLE);
    setSearchParams({});
  }

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
