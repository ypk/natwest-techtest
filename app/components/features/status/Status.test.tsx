import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { Status } from "./Status";
import { RequestStatus } from "~/hooks/useWeatherSearch";

describe("Status", () => {
  it("renders the initial guidance message", () => {
    render(<Status error={null} status={RequestStatus.IDLE} />);

    expect(screen.getByText(/enter a city to get started/i)).toBeInTheDocument();
  });

  it("renders an alert when there is an error", () => {
    render(<Status error="city not found" status={RequestStatus.ERROR} />);

    expect(screen.getByRole("alert")).toHaveTextContent("city not found");
  });

  it("renders multiple location suggestion links when status is DISAMBIGUATION", () => {
    const suggestions = [
      { name: "York", country: "GB", state: "England", query: "York, GB" },
      { name: "York", country: "US", state: "Pennsylvania", query: "York, US" },
    ];

    render(
      <BrowserRouter>
        <Status
          error={null}
          status={RequestStatus.DISAMBIGUATION}
          suggestions={suggestions}
          city="York"
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/multiple locations found for "york"/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /york, england, gb/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /york, pennsylvania, us/i })).toBeInTheDocument();
  });

  it("renders nothing when status has no message", () => {
    const { container } = render(
      <Status error={null} status={RequestStatus.LOADING} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
