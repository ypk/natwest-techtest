import "./welcome.css";

export function Welcome() {
  return (
    <main className="starter-page">
      <section className="card starter-panel stack" aria-labelledby="starter-title">
        <p className="starter-eyebrow">Weather application</p>
        <h1 id="starter-title" className="starter-title">
          NatWest weather dashboard
        </h1>
        <p className="starter-copy">
          Search for a location to view current conditions, wind speed,
          humidity, and a short forecast.
        </p>
        <div className="cluster">
          <a className="button" href="https://reactrouter.com/docs" target="_blank" rel="noreferrer">
            React Router docs
          </a>
          <a className="button button--secondary" href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer">
            CSS reference
          </a>
        </div>
      </section>
    </main>
  );
}
