import type { TabDetail } from "~/hooks/useTabs";
import "./Tabs.css";

type TabsProps = {
  tabs: TabDetail[];
  activeTab: string;
  onTabChange: (dayLabel: string) => void;
  children: React.ReactNode;
};

export function Tabs({ tabs, activeTab, onTabChange, children }: TabsProps) {
  return (
    <div className="tabs-container">
      <div className="tabs-bar" role="tablist" aria-label="Forecast days">
        {tabs.map((tab) => (
          <button
            key={tab.dayLabel}
            className={`tab-btn ${activeTab === tab.dayLabel ? "active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.dayLabel}
            onClick={() => onTabChange(tab.dayLabel)}
          >
            <span className="tab-day">{tab.weekday}</span>
            <span className="tab-date">{tab.dayMonth}</span>
            <span className="tab-temp">{tab.minTemp}&deg; / {tab.maxTemp}&deg;</span>
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children}
      </div>
    </div>
  );
}
