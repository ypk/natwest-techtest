import { openWeatherSettings } from "./openWeather.settings";

type FetchOptions = {
  path: string;
  params: Record<string, string>;
  tag: string;
  apiKey: string;
  signal?: AbortSignal;
  rethrowOnAbort?: boolean;
};

type FetchSuccess = {
  ok: true;
  json: unknown;
};

type FetchFailure = {
  ok: false;
  body?: string;
};

type FetchResult = FetchSuccess | FetchFailure;

function extractCause(err: unknown): string | undefined {
  if (!(err instanceof Error)) return undefined;
  const cause = (err as unknown as Record<string, unknown>).cause;
  return cause instanceof Error ? cause.message : undefined;
}

/**
 * A shared helper to fetch data from the OpenWeather API.
 * Returns `{ ok: true, json }` on success, or `{ ok: false }` on failure.
 *
 * If `rethrowOnAbort` is true, abort errors are thrown instead of caught.
 */
export async function openWeatherFetch(options: FetchOptions): Promise<FetchResult> {
  const { path, params, tag, apiKey, signal, rethrowOnAbort = false } = options;

  const url = new URL(path, openWeatherSettings.baseUrl);
  url.search = new URLSearchParams({ appid: apiKey, ...params }).toString();
  const safeUrl = url.toString().replace(apiKey, "[REDACTED]");

  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (fetchErr) {
    if (rethrowOnAbort && fetchErr instanceof DOMException && fetchErr.name === "AbortError") {
      throw fetchErr;
    }
    console.error(`[${tag} FETCH FAILED]`, {
      url: safeUrl,
      error: fetchErr instanceof Error ? fetchErr.message : fetchErr,
      cause: extractCause(fetchErr),
    });
    return { ok: false };
  }

  if (!response.ok) {
    const body = await response.text();
    console.error(`[${tag} HTTP ${response.status}]`, {
      url: safeUrl,
      status: response.status,
      statusText: response.statusText,
      body,
    });
    return { ok: false, body };
  }

  try {
    const json = await response.json();
    return { ok: true, json };
  } catch (parseErr) {
    console.error(`[${tag} PARSE ERROR]`, {
      url: safeUrl,
      error: parseErr instanceof Error ? parseErr.message : parseErr,
    });
    return { ok: false };
  }
}
