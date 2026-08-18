export type WeatherCondition = {
  description: string;
  iconUrl: string;
  main: string;
};

export type ForecastItem = {
  dt: number;
  dateTimeText: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  condition: WeatherCondition;
};

export type CurrentWeather = {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: WeatherCondition;
  forecast?: ForecastItem[];
};

export type LocationSuggestion = {
  name: string;
  country: string;
  state?: string;
  query: string;
};

export type CachedWeatherEntry = {
  weather: CurrentWeather;
  timestamp: number;
};
