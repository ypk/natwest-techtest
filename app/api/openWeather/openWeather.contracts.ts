type OpenWeatherCondition = {
  description: string;
  icon: string;
  main: string;
};

export type OpenWeatherCurrentResponse = {
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
  weather: OpenWeatherCondition[];
};

export type OpenWeatherErrorResponse = {
  cod: string;
  message: string;
};