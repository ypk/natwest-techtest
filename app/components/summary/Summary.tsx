import { Forecast } from "~/components/forecast/Forecast";
import type { CurrentWeather } from "~/types/weather";

type SummaryProps = {
  weather: CurrentWeather;
  onReset: () => void;
};

export function Summary({ weather, onReset }: SummaryProps) {
  const {
    city,
    country,
    condition: { description },
    temperature,
    feelsLike,
    windSpeed,
    humidity,
    forecast,
  } = weather;

  return (
    <article className="summary" aria-label={`Current weather for ${city}`}>
      <div className="summary-header">
        <div>
          <p className="location">
            {city}, {country}
          </p>
          <p className="condition">{description}</p>
        </div>
        <button
          className="close-button"
          type="button"
          onClick={onReset}
          aria-label="Clear weather result"
        >
          ×
        </button>
      </div>

      <p className="temp">{temperature}°C</p>

      <dl className="stats">
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

      <Forecast forecast={forecast} />
    </article>
  );
}
