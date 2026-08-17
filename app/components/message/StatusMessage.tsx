import { RequestStatus } from "~/hooks/useWeatherSearch";

type StatusMessageProps = {
  error: string | null;
  status: RequestStatus;
};

export function StatusMessage({
  error,
  status,
}: StatusMessageProps) {
  if (status === RequestStatus.IDLE) {
    return <p className="message">Enter a city to get started.</p>;
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
