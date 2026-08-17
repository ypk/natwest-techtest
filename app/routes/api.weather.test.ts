import { describe, expect, it, vi } from "vitest";

import { getCurrentWeather } from "~/api/weatherController";
import { loader } from "./api.weather";

vi.mock("~/api/weatherController", () => ({
  getCurrentWeather: vi.fn(),
}));

const mockedGetCurrentWeather = vi.mocked(getCurrentWeather);

describe("api.weather route", () => {
  it("delegates GET requests to the weather controller", async () => {
    const request = new Request("http://localhost/api/weather?city=London");
    const response = Response.json({ city: "London" });

    mockedGetCurrentWeather.mockResolvedValue(response);

    await expect(loader({ request })).resolves.toBe(response);
    expect(mockedGetCurrentWeather).toHaveBeenCalledWith(request);
  });
});