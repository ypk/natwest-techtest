import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getGeoLocationsFromOpenWeather } from "./getGeoLocations";

const mockFetch = vi.fn();

describe("getGeoLocationsFromOpenWeather", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns empty array when apiKey or city is empty", async () => {
    expect(await getGeoLocationsFromOpenWeather("", "test-key")).toEqual([]);
    expect(await getGeoLocationsFromOpenWeather("London", "")).toEqual([]);
  });

  it("fetches location suggestions for York", async () => {
    const geoItems = [
      { name: "York", country: "GB", state: "England", lat: 53.95, lon: -1.08 },
      { name: "York", country: "US", state: "Pennsylvania", lat: 39.96, lon: -76.72 },
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(geoItems),
    });

    const suggestions = await getGeoLocationsFromOpenWeather("York", "test-key");

    expect(suggestions).toHaveLength(2);
    expect(suggestions[0]).toEqual({
      name: "York",
      country: "GB",
      state: "England",
      query: "York, GB",
    });
    expect(suggestions[1]).toEqual({
      name: "York",
      country: "US",
      state: "Pennsylvania",
      query: "York, US",
    });
  });

  it("handles fetch failure gracefully", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));
    const suggestions = await getGeoLocationsFromOpenWeather("York", "test-key");
    expect(suggestions).toEqual([]);
  });
});
