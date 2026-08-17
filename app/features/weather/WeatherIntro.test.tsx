import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WeatherIntro } from "./WeatherIntro";

describe("WeatherIntro", () => {
  it("renders the weather page intro content", () => {
    render(<WeatherIntro />);

    expect(screen.getByText("Weather application")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /natwest weather dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/search by city/i)).toBeInTheDocument();
  });
});