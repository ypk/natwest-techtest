import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./Toggle";

const mockOptions = [
  { value: "option1", label: "Option One" },
  { value: "option2", label: "Option Two" },
];

describe("Toggle component", () => {
  it("renders options and sets active attributes based on value prop", () => {
    const handleChange = vi.fn();
    render(<Toggle options={mockOptions} value="option2" onChange={handleChange} />);

    const opt1Btn = screen.getByRole("tab", { name: "Option One" });
    const opt2Btn = screen.getByRole("tab", { name: "Option Two" });

    expect(opt1Btn).toBeInTheDocument();
    expect(opt2Btn).toBeInTheDocument();

    expect(opt2Btn).toHaveClass("active");
    expect(opt2Btn).toHaveAttribute("aria-selected", "true");

    expect(opt1Btn).not.toHaveClass("active");
    expect(opt1Btn).toHaveAttribute("aria-selected", "false");
  });

  it("calls onChange callback when option is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle options={mockOptions} value="option2" onChange={handleChange} />);

    const opt1Btn = screen.getByRole("tab", { name: "Option One" });
    await user.click(opt1Btn);

    expect(handleChange).toHaveBeenCalledWith("option1");
  });
});
