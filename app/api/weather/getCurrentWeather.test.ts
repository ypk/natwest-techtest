import { beforeEach, describe, expect, it, vi } from "vitest";

import { getCurrentWeather } from "./getCurrentWeather";

vi.mock("../provider/weatherProvider", () => ({
  weatherProvider: {
    getCurrentWeather: vi.fn(),
  },
}));

import { weatherProvider } from "../provider/weatherProvider";

const mockedProvider = vi.mocked(weatherProvider);

describe("getCurrentWeather", () => {
  beforeEach(() => {
    mockedProvider.getCurrentWeather.mockReset();
  });

  it("returns 400 when city parameter is missing", async () => {
    const request = new Request("http://localhost/api/weather");
    const response = await getCurrentWeather(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      message: "City query parameter is required.",
    });
  });

  it("returns 400 when city parameter is empty", async () => {
    const request = new Request("http://localhost/api/weather?city=");
    const response = await getCurrentWeather(request);

    expect(response.status).toBe(400);
  });

  it("returns weather data on success", async () => {
    const weather = { city: "London", temperature: 18 };
    mockedProvider.getCurrentWeather.mockResolvedValue(weather as any);

    const request = new Request("http://localhost/api/weather?city=London");
    const response = await getCurrentWeather(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(weather);
    expect(mockedProvider.getCurrentWeather).toHaveBeenCalledWith(
      "London",
      request.signal
    );
  });

  it("returns 502 when the provider throws", async () => {
    mockedProvider.getCurrentWeather.mockRejectedValue(
      new Error("city not found")
    );

    const request = new Request("http://localhost/api/weather?city=Nope");
    const response = await getCurrentWeather(request);

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ message: "city not found" });
  });

  it("returns a generic message for non-Error exceptions", async () => {
    mockedProvider.getCurrentWeather.mockRejectedValue("something broke");

    const request = new Request("http://localhost/api/weather?city=Nope");
    const response = await getCurrentWeather(request);

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      message: "Unable to fetch weather.",
    });
  });
});
