import { weatherProvider } from "../provider/weatherProvider";

export async function getCurrentWeather(request: Request) {
  const url = new URL(request.url);
  const city = url.searchParams.get("city")?.trim();

  if (!city) {
    return Response.json(
      { message: "City query parameter is required." },
      { status: 400 }
    );
  }

  try {
    if (!city.includes(",") && weatherProvider.getGeoLocations) {
      const suggestions = await weatherProvider.getGeoLocations(
        city,
        request.signal
      );
      if (suggestions.length > 1) {
        return Response.json({ suggestions, city });
      }
    }

    const weather = await weatherProvider.getCurrentWeather(
      city,
      request.signal
    );

    return Response.json(weather);
  } catch (error) {
    const cause = error instanceof Error ? (error as unknown as Record<string, unknown>).cause : undefined;
    console.error("[API WEATHER ERROR]", {
      city,
      error: error instanceof Error ? error.message : error,
      cause: cause instanceof Error ? cause.message : cause,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch weather.",
      },
      { status: 502 }
    );
  }
}
