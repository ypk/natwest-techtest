import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ForecastItem } from "~/types/weather";
import { Panel } from "./Panel";

const mockItem: ForecastItem = {
  dt: 1700000000,
  dateTimeText: "Tue, 12:00 PM",
  temperature: 19,
  tempMin: 16,
  tempMax: 20,
  humidity: 65,
  windSpeed: 4.1,
  condition: {
    description: "light rain",
    iconUrl: "https://openweathermap.org/img/wn/10d@2x.png",
    main: "Rain",
  },
};

describe("Panel component", () => {
  it("renders panel fields correctly", () => {
    render(<Panel item={mockItem} />);

    const timeEl = screen.getByText("Tue, 12:00 PM");
    expect(timeEl).toBeInTheDocument();
    expect(timeEl).toHaveAttribute("title", "Forecast time");

    const tempEl = screen.getByText("19°C");
    expect(tempEl).toBeInTheDocument();
    expect(tempEl).toHaveAttribute("title", "Temperature");

    const humiditySpan = screen.getByLabelText("Humidity: 65%");
    expect(humiditySpan).toBeInTheDocument();
    expect(humiditySpan).toHaveAttribute("title", "Humidity");

    const windSpan = screen.getByLabelText("Wind speed: 4.1 meters per second");
    expect(windSpan).toBeInTheDocument();
    expect(windSpan).toHaveAttribute("title", "Wind speed");
    
    const weatherIcon = screen.getByRole("img", { name: "light rain" });
    expect(weatherIcon).toHaveAttribute("src", "https://openweathermap.org/img/wn/10d@2x.png");
    expect(weatherIcon).toHaveAttribute("title", "Rain");

    const humidityIcon = screen.getByRole("img", { name: "Humidity" });
    expect(humidityIcon).toHaveAttribute("src", "/humidity.svg");
    expect(humidityIcon).toHaveAttribute("title", "Humidity");

    const windIcon = screen.getByRole("img", { name: "Wind speed" });
    expect(windIcon).toHaveAttribute("src", "/windspeed.svg");
    expect(windIcon).toHaveAttribute("title", "Wind speed");
  });
});
