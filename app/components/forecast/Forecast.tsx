import type { ForecastItem } from "~/types/weather";
import { Card } from "~/components/card/Card";
import "./Forecast.css";

type ForecastProps = {
  forecast?: ForecastItem[];
};

export function Forecast({ forecast }: ForecastProps) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <section className="forecast" aria-label="Extended 5-day forecast">
      <h3 className="title">5-Day / 3-Hour Forecast</h3>
      <div className="track" role="region" aria-label="Forecast items">
        {forecast.map((item) => (
          <Card key={item.dt} item={item} />
        ))}
      </div>
    </section>
  );
}
