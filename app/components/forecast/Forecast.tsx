import { Panel } from "~/components/panel/Panel";
import { Tabs } from "~/components/tabs/Tabs";
import { useTabs } from "~/hooks/useTabs";
import type { DailyForecastGroup } from "~/utils/date";
import "./Forecast.css";

type ForecastProps = {
  forecast?: DailyForecastGroup[];
  defaultLayout?: "list" | "tabs";
};

export function Forecast({ forecast, defaultLayout = "list" }: ForecastProps) {
  const {
    layout,
    setLayout,
    activeTab,
    setActiveTab,
    tabDetails,
    activeGroup,
  } = useTabs(forecast || [], defaultLayout);

  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <section className="forecast" aria-label="Extended 5-day forecast">
      <div className="forecast-header">
        <h3 className="title">5-Day / 3-Hour Forecast</h3>
        <div className="layout-toggle" role="tablist" aria-label="Layout view selection">
          <button
            className={`toggle-btn ${layout === "list" ? "active" : ""}`}
            type="button"
            role="tab"
            aria-selected={layout === "list"}
            onClick={() => setLayout("list")}
          >
            List
          </button>
          <button
            className={`toggle-btn ${layout === "tabs" ? "active" : ""}`}
            type="button"
            role="tab"
            aria-selected={layout === "tabs"}
            onClick={() => setLayout("tabs")}
          >
            Tabs
          </button>
        </div>
      </div>

      {layout === "tabs" ? (
        <Tabs tabs={tabDetails} activeTab={activeTab} onTabChange={setActiveTab}>
          {activeGroup && (
            <div className="track" role="region" aria-label={`Forecast items for ${activeGroup.dayLabel}`}>
              {activeGroup.items.map((item) => (
                <Panel key={item.dt} item={item} />
              ))}
            </div>
          )}
        </Tabs>
      ) : (
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
      )}
    </section>
  );
}
