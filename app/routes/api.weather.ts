import { getCurrentWeather } from "~/api/weather";

/**
 * Server-side resource route to forward requests to 
 * the weather controller on the server.
 */
export async function loader({ request }: { request: Request }) {
  return getCurrentWeather(request);
}