import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Intro } from "./Intro";

describe("Intro", () => {
  it("renders the page intro content", () => {
    render(<Intro />);

    expect(screen.getByText("Weather application")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /natwest weather dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/search by city/i)).toBeInTheDocument();
  });
});
