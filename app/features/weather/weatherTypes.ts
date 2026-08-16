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

export type OpenWeatherResponse = {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: WeatherCondition[];
};

export type OpenWeatherErrorResponse = {
  cod: string;
  message: string;
};