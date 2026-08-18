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

    expect(screen.getByText("Tue, 12:00 PM")).toBeInTheDocument();
    expect(screen.getByText("19°C")).toBeInTheDocument();
    expect(screen.getByText("Rain")).toBeInTheDocument();
    expect(screen.getByText("65%")).toBeInTheDocument();
    expect(screen.getByText("4.1 m/s")).toBeInTheDocument();
    
    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("src", "https://openweathermap.org/img/wn/10d@2x.png");
    expect(icon).toHaveAttribute("alt", "light rain");
  });
});
