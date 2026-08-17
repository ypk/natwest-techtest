import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home, { meta } from "./home";

vi.mock("~/components/search/Search", () => ({
  Search: () => <div>Weather search route content</div>,
}));

describe("home route", () => {
  it("returns page metadata", () => {
    expect(meta({} as Parameters<typeof meta>[0])).toEqual([
      { title: "NatWest Weather Dashboard" },
      { name: "description", content: "Search for current weather by city." },
    ]);
  });

  it("renders the weather search feature", () => {
    render(<Home />);

    expect(screen.getByText("Weather search route content")).toBeInTheDocument();
  });
});