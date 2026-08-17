import type { CurrentWeather } from "~/types/weather";

type SummaryProps = {
  weather: CurrentWeather;
  onReset: () => void;
};

export function WeatherSummary({ weather, onReset }: SummaryProps) {
  const {
    city,
    country,
    condition: { description },
    temperature,
    feelsLike,
    windSpeed,
    humidity,
  } = weather;

  return (
    <article className="weather-summary" aria-label={`Current weather for ${city}`}>
      <div className="weather-summary-header">
        <div>
          <p className="weather-location">
            {city}, {country}
          </p>
          <p className="weather-condition">{description}</p>
        </div>
        <button
          className="weather-close-button"
          type="button"
          onClick={onReset}
          aria-label="Clear weather result"
        >
          ×
        </button>
      </div>

      <p className="weather-temp">{temperature}°C</p>

      <dl className="weather-stats">
        <div>
          <dt>Feels like</dt>
          <dd>{feelsLike}°C</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{windSpeed} m/s</dd>
        </div>
        <div>
          <dt>Humidity</dt>
          <dd>{humidity}%</dd>
        </div>
      </dl>
    </article>
  );
}
