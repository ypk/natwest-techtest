import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { Disambiguation } from "./Disambiguation";

describe("Disambiguation component", () => {
  it("renders null when suggestions array is empty", () => {
    const { container } = render(<Disambiguation suggestions={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders location suggestion links", () => {
    const suggestions = [
      { name: "York", country: "GB", state: "England", query: "York, GB" },
      { name: "York", country: "US", state: "Pennsylvania", query: "York, US" },
    ];

    render(
      <BrowserRouter>
        <Disambiguation city="York" suggestions={suggestions} />
      </BrowserRouter>
    );

    expect(screen.getByText(/multiple locations found for "york"/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /york, england, gb/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /york, pennsylvania, us/i })).toBeInTheDocument();
  });
});
