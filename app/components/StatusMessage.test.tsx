import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RequestStatus } from "~/hooks/useWeatherSearch";
import { WeatherStatusMessage } from "./StatusMessage";

describe("WeatherStatusMessage", () => {
  it("renders the initial guidance message", () => {
    render(<WeatherStatusMessage error={null} status={RequestStatus.IDLE} />);

    expect(screen.getByText(/enter a city to get started/i)).toBeInTheDocument();
  });

  it("renders an alert when there is an error", () => {
    render(<WeatherStatusMessage error="city not found" status={RequestStatus.ERROR} />);

    expect(screen.getByRole("alert")).toHaveTextContent("city not found");
  });

  it("renders nothing when status has no message", () => {
    const { container } = render(
      <WeatherStatusMessage error={null} status={RequestStatus.LOADING} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
