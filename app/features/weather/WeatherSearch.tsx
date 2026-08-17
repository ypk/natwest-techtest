import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router";

import { getCurrentWeather } from "~/api/weatherClient";
import type { CurrentWeather } from "./weatherTypes";
import "./WeatherSearch.css";

type RequestStatus = "idle" | "loading" | "success" | "error";

export function WeatherSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const cityFromUrl = searchParams.get("city")?.trim() ?? "";

  useEffect(() => {
    if (!cityFromUrl) {
      return;
    }

    const abortController = new AbortController();

    setCity(cityFromUrl);
    setStatus("loading");
    setError(null);

    getCurrentWeather(cityFromUrl, abortController.signal)
      .then((currentWeather) => {
        setWeather(currentWeather);
        setStatus("success");
      })
      .catch((fetchError) => {
        if (abortController.signal.aborted) {
          return;
        }

        setStatus("error");
        setWeather(null);
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to fetch weather. Try another city."
        );
      });

    return () => {
      abortController.abort();
    };
  }, [cityFromUrl]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchTerm = city.trim();

    if (!searchTerm) {
      setStatus("error");
      setError("Enter a city name to search for weather.");
      return;
    }

    setSearchParams({ city: searchTerm });
  }

  function handleReset() {
    setCity("");
    setWeather(null);
    setStatus("idle");
    setError(null);
    setSearchParams({});
  }

  const isLoading = status === "loading";

  return (
    <main className="weather-page">
      <section className="container weather-layout" aria-labelledby="weather-title">
        <div className="weather-intro stack">
          <p className="weather-eyebrow">Weather application</p>
          <h1 id="weather-title">NatWest weather dashboard</h1>
          <p>
            Search by city to view current temperature, conditions, wind speed,
            and humidity.
          </p>
        </div>

        <section className="card weather-panel stack" aria-label="Weather search">
          <form className="weather-form" onSubmit={handleSubmit}>
            <label htmlFor="city">City name</label>
            <div className="weather-form-row">
              <input
                id="city"
                name="city"
                type="search"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="e.g. London"
                autoComplete="address-level2"
              />
              <button className="button" type="submit" disabled={isLoading}>
                {isLoading ? "Searching" : "Search"}
              </button>
            </div>
          </form>

          {status === "idle" && (
            <p className="weather-message">Enter a city to get started.</p>
          )}

          {status === "error" && error && (
            <p className="weather-message weather-message--error" role="alert">
              {error}
            </p>
          )}

          {status === "success" && weather && (
            <WeatherSummary weather={weather} onReset={handleReset} />
          )}
        </section>
      </section>
    </main>
  );
}

function WeatherSummary({
  weather,
  onReset,
}: {
  weather: CurrentWeather;
  onReset: () => void;
}) {
  return (
    <article className="weather-summary" aria-label={`Current weather for ${weather.city}`}>
      <div className="weather-summary-header">
        <div>
          <p className="weather-location">
            {weather.city}, {weather.country}
          </p>
          <p className="weather-condition">{weather.condition.description}</p>
        </div>
        <button
          className="weather-close-button"
          type="button"
          onClick={onReset}
          aria-label="Clear weather result"
        >
          ×
        </button>
      </div>

      <p className="weather-temp">{weather.temperature}°C</p>

      <dl className="weather-stats">
        <div>
          <dt>Feels like</dt>
          <dd>{weather.feelsLike}°C</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{weather.windSpeed} m/s</dd>
        </div>
        <div>
          <dt>Humidity</dt>
          <dd>{weather.humidity}%</dd>
        </div>
      </dl>
    </article>
  );
}