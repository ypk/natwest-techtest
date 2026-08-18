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
      <time className="timestamp">{dateTimeText}</time>
      <Icon src={condition.iconUrl} description={condition.description} />
      <span className="temp">{temperature}°C</span>
      <span className="condition">{condition.main}</span>
      <div className="details">
        <span>{humidity}%</span>
        <span>{windSpeed} m/s</span>
      </div>
    </article>
  );
}
