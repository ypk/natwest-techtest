import type { CurrentWeather } from "~/features/weather/weatherTypes";

import { openWeatherSettings } from "./openWeather.settings";
import type {
  OpenWeatherCurrentResponse,
  OpenWeatherErrorResponse,
} from "./openWeather.contracts";

export async function getCurrentWeatherFromOpenWeather(
  city: string,
  apiKey: string,
  signal?: AbortSignal
) {
  if (!apiKey) {
    throw new Error("OpenWeather API key is missing.");
  }

  const url = new URL(
    openWeatherSettings.currentWeatherPath,
    openWeatherSettings.baseUrl
  );

  url.search = new URLSearchParams({
    appid: apiKey,
    q: city,
    units: "metric",
  }).toString();

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = (await response.json()) as OpenWeatherErrorResponse;
    throw new Error(error.message || "Unable to fetch weather.");
  }

  const data = (await response.json()) as OpenWeatherCurrentResponse;

  return mapCurrentWeather(data);
}

function mapCurrentWeather(data: OpenWeatherCurrentResponse): CurrentWeather {
  const {
    main: { feels_like, humidity, temp },
    name,
    sys: { country },
    weather,
    wind: { speed },
  } = data;

  return {
    city: name,
    country,
    temperature: Math.round(temp),
    feelsLike: Math.round(feels_like),
    humidity,
    windSpeed: speed,
    condition: weather[0] ?? {
      description: "Weather conditions unavailable",
      icon: "",
      main: "Unknown",
    },
  };
}