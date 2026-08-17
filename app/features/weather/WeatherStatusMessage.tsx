type WeatherStatusMessageProps = {
  error: string | null;
  status: "idle" | "loading" | "success" | "error";
};

export function WeatherStatusMessage({
  error,
  status,
}: WeatherStatusMessageProps) {
  if (status === "idle") {
    return <p className="weather-message">Enter a city to get started.</p>;
  }

  if (status === "error" && error) {
    return (
      <p className="weather-message weather-message--error" role="alert">
        {error}
      </p>
    );
  }

  return null;
}