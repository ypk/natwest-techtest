import type { ForecastItem } from "~/types/weather";
import { Icon } from "~/components/icon/Icon";

type CardProps = {
  item: ForecastItem;
};

export function Card({ item }: CardProps) {
  const { dateTimeText, temperature, humidity, windSpeed, condition } = item;

  return (
    <article className="card">
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
