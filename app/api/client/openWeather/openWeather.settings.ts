export const openWeatherSettings = {
  baseUrl: "https://api.openweathermap.org",
  currentWeatherPath: "/data/2.5/weather",
  forecastPath: "/data/2.5/forecast",
  geoPath: "/geo/1.0/direct",
  iconBaseUrl: "https://openweathermap.org/img/wn",
} as const;

export function getIconUrl(iconCode: string): string {
  return `${openWeatherSettings.iconBaseUrl}/${iconCode}@2x.png`;
}
