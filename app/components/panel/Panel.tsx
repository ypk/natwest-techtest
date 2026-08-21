import type { ForecastItem } from "~/types/weather";
import { Icon } from "~/components/icon/Icon";
import "./Panel.css";

type DetailItemProps = {
  iconSrc: string;
  label: string;
  value: string | number;
  ariaLabel: string;
  title: string;
};

function DetailItem({ iconSrc, label, value, ariaLabel, title }: DetailItemProps) {
  return (
    <span className="detail-item" aria-label={ariaLabel} title={title}>
      <Icon src={iconSrc} title={title} description={label} size={16} />
      <span className="detail-label">{label}</span> {value}
    </span>
  );
}

type PanelWeatherProps = {
  description: string;
  iconUrl: string;
  mainCondition: string;
  temperature: number;
  tempUnit: string;
};

function PanelWeather({
  description,
  iconUrl,
  mainCondition,
  temperature,
  tempUnit,
}: PanelWeatherProps) {
  return (
    <div className="panel-weather">
      <div className="weather-text">{description.toUpperCase()}</div>
      <div className="weather-meta">
        <Icon src={iconUrl} title={mainCondition} description={description} />
        <span className="temp" title="Temperature">{temperature}{tempUnit}</span>
      </div>
    </div>
  );
}

type PanelProps = {
  item: ForecastItem;
  units?: string;
};

export function Panel({ item, units = "metric" }: PanelProps) {
  const { dateTimeText, temperature, humidity, windSpeed, condition } = item;

  const isImperial = units === "imperial";
  const tempUnit = isImperial ? "°F" : "°C";
  const windUnit = isImperial ? "mph" : "m/s";
  const windLabel = isImperial ? "miles per hour" : "meters per second";

  return (
    <article className="panel">
      <div className="panel-info">
        <time className="timestamp" title="Forecast time">{dateTimeText}</time>
        <div className="details">
          <DetailItem
            iconSrc="/humidity.svg"
            label="Humidity"
            value={`${humidity}%`}
            ariaLabel={`Humidity: ${humidity}%`}
            title="Humidity"
          />
          <DetailItem
            iconSrc="/windspeed.svg"
            label="Wind speed"
            value={`${windSpeed} ${windUnit}`}
            ariaLabel={`Wind speed: ${windSpeed} ${windLabel}`}
            title="Wind speed"
          />
        </div>
      </div>
      <PanelWeather
        description={condition.description}
        iconUrl={condition.iconUrl}
        mainCondition={condition.main}
        temperature={temperature}
        tempUnit={tempUnit}
      />
    </article>
  );
}
