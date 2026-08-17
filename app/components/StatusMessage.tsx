import { RequestStatus } from "~/hooks/useWeatherSearch";

type StatusMessageProps = {
  error: string | null;
  status: RequestStatus;
};

export function WeatherStatusMessage({
  error,
  status,
}: StatusMessageProps) {
  if (status === RequestStatus.IDLE) {
    return <p className="weather-message">Enter a city to get started.</p>;
  }

  if (status === RequestStatus.ERROR && error) {
    return (
      <p className="weather-message weather-message--error" role="alert">
        {error}
      </p>
    );
  }

  return null;
}
