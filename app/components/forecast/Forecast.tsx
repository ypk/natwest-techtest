import { Toggle } from "~/components/toggle/Toggle";
import { Panel } from "~/components/panel/Panel";
import { Tabs } from "~/components/tabs/Tabs";
import { useTabs } from "~/hooks/useTabs";
import type { DailyForecastGroup } from "~/utils/date";
import { LAYOUTS, type LayoutMode } from "~/constants/layout";
import "./Forecast.css";

type ForecastProps = {
  forecast?: DailyForecastGroup[];
  defaultLayout?: LayoutMode;
};

const layoutOptions = [
  { value: LAYOUTS.LIST, label: "List" },
  { value: LAYOUTS.TABS, label: "Tabs" },
];

export function Forecast({ forecast, defaultLayout = LAYOUTS.LIST }: ForecastProps) {
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
        <Toggle
          options={layoutOptions}
          value={layout}
          onChange={(val) => setLayout(val as LayoutMode)}
          ariaLabel="Layout view selection"
        />
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
