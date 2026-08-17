import type { CurrentWeather } from "~/features/weather/weatherTypes";

type WeatherClientError = {
	message?: string;
};

export async function getCurrentWeather(city: string, signal?: AbortSignal) {
	const params = new URLSearchParams({ city });
	const response = await fetch(`/api/weather?${params.toString()}`, { signal });

	if (!response.ok) {
		const error = (await response.json()) as WeatherClientError;
		throw new Error(error.message || "Unable to fetch weather.");
	}

	return (await response.json()) as CurrentWeather;
}