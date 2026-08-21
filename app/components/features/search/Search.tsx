import { Form } from "~/components/form/Form";
import { Intro } from "~/components/intro/Intro";
import "~/components/layout/Layout.css";
import "./Search.css";
import { Status } from "~/components/features/status/Status";
import { Summary } from "~/components/features/summary/Summary";
import { useWeatherSearch, RequestStatus } from "~/hooks/useWeatherSearch";

export function Search() {
  const {
    city,
    weather,
    suggestions,
    status,
    error,
    isLoading,
    setCity,
    handleSubmit,
    handleReset,
    units,
    handleUnitChange,
  } = useWeatherSearch();

  return (
    <main className="page">
      <section className="container layout" aria-labelledby="weather-title">
        <Intro />

        <section className="card search-panel stack" aria-label="Weather search">
          <Form
            city={city}
            isLoading={isLoading}
            onCityChange={setCity}
            onSubmit={handleSubmit}
          />

          <Status error={error} status={status} suggestions={suggestions} city={city} />

          {status === RequestStatus.SUCCESS && weather && (
            <Summary weather={weather} onReset={handleReset} units={units} onUnitChange={handleUnitChange} />
          )}
        </section>
      </section>
    </main>
  );
}
