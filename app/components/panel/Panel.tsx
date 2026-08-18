import type { ForecastItem } from "~/types/weather";
import { Icon } from "~/components/icon/Icon";
import "./Panel.css";

type PanelProps = {
  item: ForecastItem;
};

export function Panel({ item }: PanelProps) {
  const { dateTimeText, temperature, humidity, windSpeed, condition } = item;

  return (
    <article className="panel">
      <time className="timestamp" title="Forecast time">{dateTimeText}</time>
      <Icon src={condition.iconUrl} title={condition.main} description={condition.description} />
      <span className="temp" title="Temperature">{temperature}°C</span>
      <div className="details">
        <span className="detail-item" aria-label={`Humidity: ${humidity}%`} title="Humidity">
          <Icon src="/humidity.svg" title="Humidity" description="Humidity" size={16} />
          {humidity}%
        </span>
        <span className="detail-item" aria-label={`Wind speed: ${windSpeed} meters per second`} title="Wind speed">
          <Icon src="/windspeed.svg" title="Wind speed" description="Wind speed" size={16} />
          {windSpeed} m/s
        </span>
      </div>
    </article>
  );
}
