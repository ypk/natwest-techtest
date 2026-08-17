import { weatherService } from "./weatherService";

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
        const weather = await weatherService.getCurrentWeather(
            city,
            request.signal
        );

        return Response.json(weather);
    } catch (error) {
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