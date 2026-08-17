import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatusMessage } from "./StatusMessage";
import { RequestStatus } from "~/hooks/useWeatherSearch";

describe("StatusMessage", () => {
  it("renders the initial guidance message", () => {
    render(<StatusMessage error={null} status={RequestStatus.IDLE} />);

    expect(screen.getByText(/enter a city to get started/i)).toBeInTheDocument();
  });

  it("renders an alert when there is an error", () => {
    render(<StatusMessage error="city not found" status={RequestStatus.ERROR} />);

    expect(screen.getByRole("alert")).toHaveTextContent("city not found");
  });

  it("renders nothing when status has no message", () => {
    const { container } = render(
      <StatusMessage error={null} status={RequestStatus.LOADING} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
