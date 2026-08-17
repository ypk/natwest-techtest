import type { SubmitEventHandler } from "react";

type FormProps = {
  city: string;
  isLoading: boolean;
  onCityChange: (city: string) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
};

export function Form({
  city,
  isLoading,
  onCityChange,
  onSubmit,
}: FormProps) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="city">City name</label>
      <div className="form-row">
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
