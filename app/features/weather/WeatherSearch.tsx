import type { SubmitEventHandler } from "react";
import { WeatherForm } from "./WeatherForm";
import { WeatherIntro } from "./WeatherIntro";
import "./WeatherLayout.css";
import "./WeatherSearch.css";
import { WeatherStatusMessage } from "./WeatherStatusMessage";
import { WeatherSummary } from "./WeatherSummary";

type RequestStatus = "idle" | "loading" | "success" | "error";

export function WeatherSearch() {
  

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    return;
  };

  function handleReset() {
    return;
  }

  const isLoading = status === "loading";

  return (
    <main className="weather-page">
      <section className="container weather-layout" aria-labelledby="weather-title">
        <WeatherIntro />

        <section className="card weather-panel stack" aria-label="Weather search">
          <WeatherForm
            city={'London'}
            isLoading={isLoading}
            onCityChange={()=> {}}
            onSubmit={handleSubmit}
          />

          <WeatherStatusMessage error={'error'} status={'idle'} />

        </section>
      </section>
    </main>
  );
}