import type { CurrentWeather } from "~/features/weather/weatherTypes";
import type { OpenWeatherCurrentResponse } from "./openWeather.contracts";

export function mapCurrentWeather(data: OpenWeatherCurrentResponse): CurrentWeather {
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
