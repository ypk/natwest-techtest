import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fetchCurrentWeather } from "./fetchCurrentWeather";

const mockFetch = vi.fn();

describe("fetchCurrentWeather", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed weather on a successful response", async () => {
    const weather = { city: "London", temperature: 18 };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(weather),
    });

    const result = await fetchCurrentWeather("London");

    expect(result).toEqual(weather);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/weather?city=London",
      { signal: undefined }
    );
  });

  it("throws with the server error message on a failed response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: "city not found" }),
    });

    await expect(fetchCurrentWeather("Nope")).rejects.toThrow("city not found");
  });

  it("throws a generic message when the server provides none", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({}),
    });

    await expect(fetchCurrentWeather("Nope")).rejects.toThrow(
      "Unable to fetch weather."
    );
  });

  it("passes the abort signal to fetch", async () => {
    const controller = new AbortController();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ city: "London" }),
    });

    await fetchCurrentWeather("London", controller.signal);

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/weather?city=London",
      { signal: controller.signal }
    );
  });
});
