import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Summary } from "./Summary";
import type { CurrentWeather } from "~/types/weather";

const londonWeather: CurrentWeather = {
  city: "London",
  country: "GB",
  temperature: 18,
  feelsLike: 17,
  humidity: 63,
  windSpeed: 4.2,
  condition: {
    description: "light rain",
    icon: "10d",
    main: "Rain",
  },
};

describe("Summary", () => {
  it("renders the weather location", () => {
    render(
      <Summary weather={londonWeather} onReset={vi.fn()} />
    );

    expect(screen.getByText("London, GB")).toBeInTheDocument();
  });

  it("renders the weather condition description", () => {
    render(
      <Summary weather={londonWeather} onReset={vi.fn()} />
    );

    expect(screen.getByText("light rain")).toBeInTheDocument();
  });

  it("renders the current temperature", () => {
    render(
      <Summary weather={londonWeather} onReset={vi.fn()} />
    );

    expect(screen.getByText("18°C")).toBeInTheDocument();
  });

  it("renders the feels-like temperature", () => {
    render(
      <Summary weather={londonWeather} onReset={vi.fn()} />
    );

    expect(screen.getByText("17°C")).toBeInTheDocument();
  });

  it("renders the wind speed", () => {
    render(
      <Summary weather={londonWeather} onReset={vi.fn()} />
    );

    expect(screen.getByText("4.2 m/s")).toBeInTheDocument();
  });

  it("renders the humidity", () => {
    render(
      <Summary weather={londonWeather} onReset={vi.fn()} />
    );

    expect(screen.getByText("63%")).toBeInTheDocument();
  });

  it("calls onReset when the close button is clicked", async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();

    render(
      <Summary weather={londonWeather} onReset={handleReset} />
    );

    await user.click(screen.getByRole("button", { name: /clear weather result/i }));

    expect(handleReset).toHaveBeenCalledOnce();
  });

  it("renders the correct aria-label", () => {
    const { container } = render(
      <Summary weather={londonWeather} onReset={vi.fn()} />
    );

    const article = container.querySelector("article");
    expect(article).toHaveAttribute(
      "aria-label",
      "Current weather for London"
    );
  });
});
