import { Panel } from "~/components/panel/Panel";
import type { DailyForecastGroup } from "~/utils/date";
import "./Forecast.css";

type ForecastProps = {
  forecast?: DailyForecastGroup[];
};

export function Forecast({ forecast }: ForecastProps) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <section className="forecast" aria-label="Extended 5-day forecast">
      <h3 className="title">5-Day / 3-Hour Forecast</h3>
      <div className="day-groups">
        {forecast.map((group) => (
          <div key={group.dayLabel} className="day-group">
            <h4 className="day-title">{group.dayLabel}</h4>
            <div className="track" role="region" aria-label={`Forecast for ${group.dayLabel}`}>
              {group.items.map((item) => (
                <Panel key={item.dt} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
