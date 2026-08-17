import { Form } from "~/components/form/Form";
import { Intro } from "~/components/intro/Intro";
import "~/components/layout/Layout.css";
import "./Search.css";
import { StatusMessage } from "~/components/message/StatusMessage";
import { Summary } from "~/components/summary/Summary";
import { useWeatherSearch, RequestStatus } from "~/hooks/useWeatherSearch";

export function Search() {
  const { city, weather, status, error, isLoading, setCity, handleSubmit, handleReset } =
    useWeatherSearch();

  return (
    <main className="page">
      <section className="container layout" aria-labelledby="weather-title">
        <Intro />

        <section className="card panel stack" aria-label="Weather search">
          <Form
            city={city}
            isLoading={isLoading}
            onCityChange={setCity}
            onSubmit={handleSubmit}
          />

          <StatusMessage error={error} status={status} />

          {status === RequestStatus.SUCCESS && weather && (
            <Summary weather={weather} onReset={handleReset} />
          )}
        </section>
      </section>
    </main>
  );
}
