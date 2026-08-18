import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { DailyForecastGroup } from "~/utils/date";
import { Forecast } from "./Forecast";

const sampleForecast: DailyForecastGroup[] = [
  {
    dayLabel: "Tuesday, 14 November 2023",
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
];

describe("Forecast component", () => {
  it("renders null when forecast is missing or empty", () => {
    const { container } = render(<Forecast forecast={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders forecast cards with datetime, temperature, and details", () => {
    render(<Forecast forecast={sampleForecast} />);

    expect(screen.getByRole("heading", { name: /5-day \/ 3-hour forecast/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tuesday, 14 November 2023" })).toBeInTheDocument();
    expect(screen.getByText("Tue, 12:00 PM")).toBeInTheDocument();
    expect(screen.getByText("19°C")).toBeInTheDocument();
    
    expect(screen.getByLabelText("Humidity: 65%")).toBeInTheDocument();
    expect(screen.getByLabelText("Wind speed: 4.1 meters per second")).toBeInTheDocument();
    
    const icon = screen.getByRole("img", { name: "light rain" });
    expect(icon).toHaveAttribute("title", "Rain");
  });
});
