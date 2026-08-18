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

export type OpenWeatherGeoItem = {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
};

export type OpenWeatherForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: OpenWeatherCondition[];
  wind: {
    speed: number;
  };
  dt_txt: string;
};

export type OpenWeatherForecastResponse = {
  cod: string;
  message: number | string;
  cnt: number;
  list: OpenWeatherForecastItem[];
  city: {
    name: string;
    country: string;
  };
};
