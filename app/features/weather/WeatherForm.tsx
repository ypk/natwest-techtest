import type { SubmitEventHandler } from "react";

type WeatherFormProps = {
  city: string;
  isLoading: boolean;
  onCityChange: (city: string) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
};

export function WeatherForm({
  city,
  isLoading,
  onCityChange,
  onSubmit,
}: WeatherFormProps) {
  return (
    <form className="weather-form" onSubmit={onSubmit}>
      <label htmlFor="city">City name</label>
      <div className="weather-form-row">
        <input
          id="city"
          name="city"
          type="search"
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          placeholder="e.g. London"
          autoComplete="address-level2"
        />
        <button className="button" type="submit" disabled={isLoading}>
          {isLoading ? "Searching" : "Search"}
        </button>
      </div>
    </form>
  );
}