import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Form } from "./Form";

describe("Form", () => {
  it("renders the provided city value", () => {
    render(
      <Form
        city="London"
        isLoading={false}
        onCityChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/city name/i)).toHaveValue("London");
    expect(screen.getByRole("button", { name: /search/i })).toBeEnabled();
  });

  it("calls onCityChange when the city input changes", async () => {
    const user = userEvent.setup();
    const handleCityChange = vi.fn();

    render(
      <Form
        city=""
        isLoading={false}
        onCityChange={handleCityChange}
        onSubmit={vi.fn()}
      />
    );

    await user.type(screen.getByLabelText(/city name/i), "York");

    expect(handleCityChange).toHaveBeenCalledTimes(4);
    expect(handleCityChange).toHaveBeenNthCalledWith(1, "Y");
    expect(handleCityChange).toHaveBeenNthCalledWith(4, "k");
  });

  it("calls onSubmit when the form is submitted", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn((event) => event.preventDefault());

    render(
      <Form
        city="York"
        isLoading={false}
        onCityChange={vi.fn()}
        onSubmit={handleSubmit}
      />
    );

    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(handleSubmit).toHaveBeenCalledOnce();
  });

  it("disables the submit button while loading", () => {
    render(
      <Form
        city="York"
        isLoading={true}
        onCityChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /searching/i })).toBeDisabled();
  });
});
