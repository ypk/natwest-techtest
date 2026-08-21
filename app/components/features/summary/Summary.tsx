import { Forecast } from "~/components/features/forecast/Forecast";
import { groupForecastByDay } from "~/utils/date";
import type { CurrentWeather } from "~/types/weather";
import { Toggle } from "~/components/toggle/Toggle";
import { convertTemp, convertWind } from "~/utils/unit";

type SummaryProps = {
  weather: CurrentWeather;
  onReset: () => void;
  units?: string;
  onUnitChange?: (units: string) => void;
};

export function Summary({ weather, onReset, units = "metric", onUnitChange }: SummaryProps) {
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

  const isImperial = units === "imperial";
  const tempUnit = isImperial ? "°F" : "°C";
  const windUnit = isImperial ? "mph" : "m/s";

  const displayTemp = convertTemp(temperature, isImperial);
  const displayFeelsLike = convertTemp(feelsLike, isImperial);
  const displayWind = convertWind(windSpeed, isImperial);

  const convertedForecast = (forecast || []).map((item) => ({
    ...item,
    temperature: convertTemp(item.temperature, isImperial),
    windSpeed: convertWind(item.windSpeed, isImperial),
  }));

  const groupedForecast = groupForecastByDay(convertedForecast);

  return (
    <article className="summary" aria-label={`Current weather for ${city}`}>
      <div className="summary-header">
        <div>
          <p className="location">
            {city}, {country}
          </p>
          <p className="condition">{description}</p>
        </div>
        <div className="summary-actions">
          {onUnitChange && (
            <Toggle
              options={[
                { value: "metric", label: "Metric" },
                { value: "imperial", label: "Imperial" },
              ]}
              value={units}
              onChange={onUnitChange}
              ariaLabel="Temperature unit selection"
            />
          )}
          <button
            className="close-button"
            type="button"
            onClick={onReset}
            aria-label="Clear weather result"
          >
            &times;
          </button>
        </div>
      </div>

      <p className="temp">{displayTemp}{tempUnit}</p>

      <dl className="stats">
        <div>
          <dt>Feels like</dt>
          <dd>{displayFeelsLike}{tempUnit}</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{displayWind} {windUnit}</dd>
        </div>
        <div>
          <dt>Humidity</dt>
          <dd>{humidity}%</dd>
        </div>
      </dl>

      <Forecast forecast={groupedForecast} units={units} />
    </article>
  );
}
