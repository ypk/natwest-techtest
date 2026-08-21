import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { DailyForecastGroup } from "~/utils/date";
import { Forecast } from "./Forecast";

const sampleForecast: DailyForecastGroup[] = [
  {
    dayLabel: "Tuesday 14 Nov",
    items: [
      {
        dt: 1700000000,
        dateTimeText: "Tue, 12:00 PM",
        temperature: 19,
        tempMin: 16,
        tempMax: 20,
        humidity: 65,
        windSpeed: 4.1,
        condition: { description: "light rain", iconUrl: "https://openweathermap.org/img/wn/10d@2x.png", main: "Rain" },
      },
    ],
  },
  {
    dayLabel: "Wednesday 15 Nov",
    items: [
      {
        dt: 1700086400,
        dateTimeText: "Wed, 12:00 PM",
        temperature: 15,
        tempMin: 12,
        tempMax: 17,
        humidity: 70,
        windSpeed: 3.5,
        condition: { description: "cloudy", iconUrl: "https://openweathermap.org/img/wn/03d@2x.png", main: "Clouds" },
      },
    ],
  },
];

describe("Forecast component", () => {
  it("renders null when forecast is missing or empty", () => {
    const { container } = render(<Forecast forecast={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders tabs layout when defaultLayout is set to tabs and switches tabs on click", async () => {
    const user = userEvent.setup();
    render(<Forecast forecast={sampleForecast} defaultLayout="tabs" />);

    // Assert main header
    expect(screen.getByRole("heading", { name: /5-day \/ 3-hour forecast/i })).toBeInTheDocument();

    // Assert day tabs exist (weekday & dayMonth text)
    expect(screen.getByRole("tab", { name: /tue.*14 nov/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /wed.*15 nov/i })).toBeInTheDocument();

    // Default active tab should be Tuesday
    expect(screen.getByText("Tue, 12:00 PM")).toBeInTheDocument();
    expect(screen.queryByText("Wed, 12:00 PM")).not.toBeInTheDocument();

    // Click Wednesday tab
    await user.click(screen.getByRole("tab", { name: /wed.*15 nov/i }));

    // Wednesday should now be active
    expect(screen.getByText("Wed, 12:00 PM")).toBeInTheDocument();
    expect(screen.queryByText("Tue, 12:00 PM")).not.toBeInTheDocument();
  });

  it("renders list layout by default (panels) and can toggle to tabs layout", async () => {
    const user = userEvent.setup();
    render(<Forecast forecast={sampleForecast} />);

    // Both days should render headings and timeslots vertically by default
    expect(screen.getByRole("heading", { name: "Tuesday 14 Nov" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Wednesday 15 Nov" })).toBeInTheDocument();
    expect(screen.getByText("Tue, 12:00 PM")).toBeInTheDocument();
    expect(screen.getByText("Wed, 12:00 PM")).toBeInTheDocument();

    // Toggle to Tabs layout
    const tabsToggle = screen.getByRole("tab", { name: "Tabs" });
    await user.click(tabsToggle);

    // Should now show tabs instead of headings list
    expect(screen.getByRole("tab", { name: /tue.*14 nov/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /wed.*15 nov/i })).toBeInTheDocument();
  });
});
