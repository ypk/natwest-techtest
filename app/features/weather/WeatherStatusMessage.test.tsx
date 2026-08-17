import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WeatherStatusMessage } from "./WeatherStatusMessage";

describe("WeatherStatusMessage", () => {
  it("renders the initial guidance message", () => {
    render(<WeatherStatusMessage error={null} status="idle" />);

    expect(screen.getByText(/enter a city to get started/i)).toBeInTheDocument();
  });

  it("renders an alert when there is an error", () => {
    render(<WeatherStatusMessage error="city not found" status="error" />);

    expect(screen.getByRole("alert")).toHaveTextContent("city not found");
  });

  it("renders nothing when status has no message", () => {
    const { container } = render(
      <WeatherStatusMessage error={null} status="loading" />
    );

    expect(container).toBeEmptyDOMElement();
  });
});