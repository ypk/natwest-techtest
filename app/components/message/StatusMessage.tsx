import { Disambiguation } from "~/components/disambiguation/Disambiguation";
import { RequestStatus } from "~/hooks/useWeatherSearch";
import type { LocationSuggestion } from "~/types/weather";

type StatusMessageProps = {
  error: string | null;
  status: RequestStatus;
  suggestions?: LocationSuggestion[] | null;
  city?: string;
};

export function StatusMessage({
  error,
  status,
  suggestions,
  city,
}: StatusMessageProps) {
  if (status === RequestStatus.IDLE) {
    return <p className="message">Enter a city to get started.</p>;
  }

  if (status === RequestStatus.DISAMBIGUATION && suggestions && suggestions.length > 0) {
    return <Disambiguation city={city} suggestions={suggestions} />;
  }

  if (status === RequestStatus.ERROR && error) {
    const lines = error.split("\n");

    return (
      <div className="message message--error" role="alert">
        {lines.map((line, index) =>
          line ? (
            <p
              key={index}
              className={line.startsWith("Code:") ? "message-code" : "message-line"}
            >
              {line}
            </p>
          ) : null
        )}
      </div>
    );
  }

  return null;
}
