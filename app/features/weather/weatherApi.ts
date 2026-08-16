import type {
  CurrentWeather,
  OpenWeatherErrorResponse,
  OpenWeatherResponse,
} from "./weatherTypes";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

export async function getCurrentWeather(city: string, signal?: AbortSignal) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeather API key is missing.");
  }

  const params = new URLSearchParams({
    appid: apiKey,
    q: city,
    units: "metric",
  });

  const response = await fetch(`${baseUrl}?${params.toString()}`, { signal });

  if (!response.ok) {
    const error = (await response.json()) as OpenWeatherErrorResponse;
    throw new Error(error.message || "Unable to fetch weather.");
  }

  const data = (await response.json()) as OpenWeatherResponse;

  return mapCurrentWeather(data);
}

function mapCurrentWeather(data: OpenWeatherResponse): CurrentWeather {
  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    condition: data.weather[0] ?? {
      description: "Weather conditions unavailable",
      icon: "",
      main: "Unknown",
    },
  };
}