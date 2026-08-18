import type { CurrentWeather } from "~/types/weather";
import type { OpenWeatherCurrentResponse } from "../openWeather.contracts";
import { getIconUrl } from "../openWeather.settings";

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
    condition: weather[0]
      ? {
          description: weather[0].description,
          iconUrl: getIconUrl(weather[0].icon),
          main: weather[0].main,
        }
      : {
          description: "Weather conditions unavailable",
          iconUrl: "",
          main: "Unknown",
        },
  };
}
