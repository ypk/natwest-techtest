import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchForecast } from "./forecast.service";

const mockFetch = vi.fn();

describe("fetchForecast", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns empty array when apiKey is missing", async () => {
    expect(await fetchForecast("London", "")).toEqual([]);
  });

  it("returns mapped forecast data on successful response", async () => {
    const rawResponse = {
      cod: "200",
      list: [
        {
          dt: 1700000000,
          main: { temp: 18, feels_like: 17, temp_min: 16, temp_max: 20, humidity: 60 },
          weather: [{ description: "sunny", icon: "01d", main: "Clear" }],
          wind: { speed: 3.5 },
          dt_txt: "2023-11-14 22:00:00",
        },
      ],
      city: { name: "London", country: "GB" },
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(rawResponse),
    });

    const result = await fetchForecast("London", "test-key");

    expect(result).toHaveLength(1);
    expect(result[0].temperature).toBe(18);
    expect(result[0].condition.description).toBe("sunny");
  });

  it("handles fetch errors gracefully by returning empty array", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));
    expect(await fetchForecast("London", "test-key")).toEqual([]);
  });
});
