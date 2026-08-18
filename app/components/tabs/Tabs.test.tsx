import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { TabDetail } from "~/hooks/useTabs";
import { Tabs } from "./Tabs";

const sampleTabs: TabDetail[] = [
  {
    dayLabel: "Tuesday 14 Nov",
    weekday: "Tue",
    dayMonth: "14 Nov",
    minTemp: 15,
    maxTemp: 19,
    items: [],
  },
  {
    dayLabel: "Wednesday 15 Nov",
    weekday: "Wed",
    dayMonth: "15 Nov",
    minTemp: 12,
    maxTemp: 17,
    items: [],
  },
];

describe("Tabs component", () => {
  it("renders tab headers with weekday, date, and temperature ranges", () => {
    const handleTabChange = vi.fn();
    render(
      <Tabs tabs={sampleTabs} activeTab="Tuesday 14 Nov" onTabChange={handleTabChange}>
        <div data-testid="active-content">Active Content Panel</div>
      </Tabs>
    );

    // Verify day tabs render correct info
    const tab1 = screen.getByRole("tab", { name: /tue.*14 nov/i });
    expect(tab1).toBeInTheDocument();
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("15° / 19°")).toBeInTheDocument();

    const tab2 = screen.getByRole("tab", { name: /wed.*15 nov/i });
    expect(tab2).toBeInTheDocument();
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("12° / 17°")).toBeInTheDocument();

    // Verify children render
    expect(screen.getByTestId("active-content")).toBeInTheDocument();
  });

  it("calls onTabChange when an inactive tab is clicked", async () => {
    const handleTabChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Tabs tabs={sampleTabs} activeTab="Tuesday 14 Nov" onTabChange={handleTabChange}>
        <div>Content</div>
      </Tabs>
    );

    await user.click(screen.getByRole("tab", { name: /wed.*15 nov/i }));

    expect(handleTabChange).toHaveBeenCalledWith("Wednesday 15 Nov");
  });
});
