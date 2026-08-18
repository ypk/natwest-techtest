import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchWeather } from "./weather.service";

const mockFetch = vi.fn();

describe("fetchWeather", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws when the API key is missing", async () => {
    await expect(
      fetchWeather("London", "")
    ).rejects.toThrow(
      "Something went wrong, please try again later.\nCode: ERR_CONFIG_MISSING"
    );
  });

  it("fetches weather from the OpenWeather API", async () => {
    const apiResponse = {
      name: "London",
      sys: { country: "GB" },
      main: { temp: 18, feels_like: 17, humidity: 63 },
      wind: { speed: 4.2 },
      weather: [{ description: "light rain", icon: "10d", main: "Rain" }],
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(apiResponse),
    });

    const result = await fetchWeather("London", "test-key");

    expect(result.city).toBe("London");
    expect(result.temperature).toBe(18);

    const [calledUrl] = mockFetch.mock.calls[0];
    expect(calledUrl.toString()).toContain("q=London");
    expect(calledUrl.toString()).toContain("appid=test-key");
    expect(calledUrl.toString()).toContain("units=metric");
  });

  it("throws with the API error message on a failed response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      text: () => Promise.resolve(JSON.stringify({ cod: "404", message: "city not found" })),
    });

    await expect(
      fetchWeather("Nope", "test-key")
    ).rejects.toThrow("city not found");
  });

  it("passes the abort signal to fetch", async () => {
    const controller = new AbortController();

    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          name: "London",
          sys: { country: "GB" },
          main: { temp: 18, feels_like: 17, humidity: 63 },
          wind: { speed: 4.2 },
          weather: [{ description: "clear", icon: "01d", main: "Clear" }],
        }),
    });

    await fetchWeather("London", "test-key", controller.signal);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({ signal: controller.signal })
    );
  });
});
