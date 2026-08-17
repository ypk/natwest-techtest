import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import NotFound, { action, loader } from "./notFound";

describe("notFound route", () => {
  it("returns 404 response from loader and action", async () => {
    const loaderRes = await loader();
    expect(loaderRes.status).toBe(404);

    const actionRes = await action();
    expect(actionRes.status).toBe(404);
  });

  it("renders 404 heading component with back button", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to weather dashboard/i })).toBeInTheDocument();
  });
});
