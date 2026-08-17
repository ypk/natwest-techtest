export type WeatherCondition = {
  description: string;
  icon: string;
  main: string;
};

export type CurrentWeather = {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: WeatherCondition;
};