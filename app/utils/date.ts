import type { ForecastItem } from "~/types/weather";

export type DailyForecastGroup = {
  dayLabel: string;
  items: ForecastItem[];
};

/**
 * Formats a Unix timestamp (in seconds) to a short display string (e.g., "Tue, 12:00 PM").
 */
export function formatForecastDateTime(dt: number): string {
  const date = new Date(dt * 1000);
  const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
  const time = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${weekday}, ${time}`;
}

/**
 * Groups an array of forecast items by their calendar day.
 */
export function groupForecastByDay(forecast: ForecastItem[]): DailyForecastGroup[] {
  const groupsMap = new Map<string, ForecastItem[]>();

  for (const item of forecast) {
    const date = new Date(item.dt * 1000);
    const dayLabel = date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });

    const list = groupsMap.get(dayLabel) || [];
    list.push(item);
    groupsMap.set(dayLabel, list);
  }

  return Array.from(groupsMap.entries()).map(([dayLabel, items]) => ({
    dayLabel,
    items,
  }));
}
