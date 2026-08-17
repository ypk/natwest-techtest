import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getCurrentWeather } from "~/api/weatherClient";
import { WeatherSearch } from "./WeatherSearch";
import type { CurrentWeather } from "./weatherTypes";

vi.mock("~/api/weatherClient", () => ({
  getCurrentWeather: vi.fn(),
}));

const mockedGetCurrentWeather = vi.mocked(getCurrentWeather);

const londonWeather: CurrentWeather = {
  city: "London",
  country: "GB",
  temperature: 18,
  feelsLike: 17,
  humidity: 63,
  windSpeed: 4.2,
  condition: {
    description: "light rain",
    icon: "10d",
    main: "Rain",
  },
};

describe("WeatherSearch", () => {
  beforeEach(() => {
    mockedGetCurrentWeather.mockReset();
    window.history.pushState({}, "", "/");
  });

  function renderWeatherSearch(route = "/") {
    window.history.pushState({}, "", route);

    return render(
      <BrowserRouter>
        <WeatherSearch />
      </BrowserRouter>
    );
  }

  it("shows an initial empty state", () => {
    renderWeatherSearch();

    expect(screen.getByRole("heading", { name: /natwest weather dashboard/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/city name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a city to get started/i)).toBeInTheDocument();
  });

  it("validates empty submissions", async () => {
    const user = userEvent.setup();
    renderWeatherSearch();

    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/enter a city name/i);
    expect(mockedGetCurrentWeather).not.toHaveBeenCalled();
  });

  it("renders weather returned from the client", async () => {
    const user = userEvent.setup();
    mockedGetCurrentWeather.mockResolvedValue(londonWeather);

    renderWeatherSearch();

    await user.type(screen.getByLabelText(/city name/i), "London");
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(window.location.search).toBe("?city=London");
    expect(mockedGetCurrentWeather).toHaveBeenCalledWith("London", expect.any(AbortSignal));
    expect(await screen.findByText("London, GB")).toBeInTheDocument();
    expect(screen.getByText("18°C")).toBeInTheDocument();
    expect(screen.getByText(/light rain/i)).toBeInTheDocument();
    expect(screen.getByText("63%")).toBeInTheDocument();
  });

  it("shows client errors", async () => {
    const user = userEvent.setup();
    mockedGetCurrentWeather.mockRejectedValue(new Error("city not found"));

    renderWeatherSearch();

    await user.type(screen.getByLabelText(/city name/i), "Nope");
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("city not found");
  });

  it("clears the result when the reset button is clicked", async () => {
    const user = userEvent.setup();
    mockedGetCurrentWeather.mockResolvedValue(londonWeather);

    renderWeatherSearch();

    await user.type(screen.getByLabelText(/city name/i), "London");
    await user.click(screen.getByRole("button", { name: /search/i }));
    await screen.findByText("London, GB");

    await user.click(screen.getByRole("button", { name: /clear weather result/i }));

    expect(screen.queryByText("London, GB")).not.toBeInTheDocument();
    expect(window.location.search).toBe("");
    expect(screen.getByLabelText(/city name/i)).toHaveValue("");
    expect(screen.getByText(/enter a city to get started/i)).toBeInTheDocument();
  });

  it("loads weather from the city query parameter", async () => {
    mockedGetCurrentWeather.mockResolvedValue(londonWeather);

    renderWeatherSearch("/?city=London");

    expect(screen.getByLabelText(/city name/i)).toHaveValue("London");
    expect(mockedGetCurrentWeather).toHaveBeenCalledWith("London", expect.any(AbortSignal));
    expect(await screen.findByText("London, GB")).toBeInTheDocument();
  });
});