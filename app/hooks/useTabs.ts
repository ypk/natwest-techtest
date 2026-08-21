import { useState, useMemo } from "react";
import type { DailyForecastGroup } from "~/utils/date";
import { useToggle } from "~/hooks/useToggle";
import { LAYOUTS, LAYOUT_STORAGE_KEY, type LayoutMode } from "~/constants/layout";

export type TabDetail = {
  dayLabel: string;
  weekday: string;
  dayMonth: string;
  minTemp: number;
  maxTemp: number;
  items: DailyForecastGroup["items"];
};

export function useTabs(
  forecast: DailyForecastGroup[] = [],
  defaultLayout: LayoutMode = LAYOUTS.LIST
) {
  const [layout, setLayout] = useToggle(
    LAYOUT_STORAGE_KEY,
    defaultLayout
  ) as [LayoutMode, (val: LayoutMode) => void];
  const [activeTab, setActiveTab] = useState<string>("");

  // Memoize active tab validation and defaults
  const currentActiveTab = useMemo(() => {
    if (forecast.length === 0) return "";
    const isValid = forecast.some((g) => g.dayLabel === activeTab);
    return isValid ? activeTab : forecast[0].dayLabel;
  }, [forecast, activeTab]);

  // Memoize metadata calculations
  const tabDetails = useMemo<TabDetail[]>(() => {
    return forecast.map((group) => {
      const firstItem = group.items[0];
      const date = new Date(firstItem.dt * 1000);
      const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
      const dayMonth = date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

      const temps = group.items.map((item) => item.temperature);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));

      return {
        dayLabel: group.dayLabel,
        weekday,
        dayMonth,
        minTemp,
        maxTemp,
        items: group.items,
      };
    });
  }, [forecast]);

  const activeGroup = useMemo(() => {
    return forecast.find((group) => group.dayLabel === currentActiveTab);
  }, [forecast, currentActiveTab]);

  return {
    layout,
    setLayout,
    activeTab: currentActiveTab,
    setActiveTab,
    tabDetails,
    activeGroup,
  };
}
