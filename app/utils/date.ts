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
