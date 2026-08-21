import { Link } from "react-router";
import "~/components/layout/Layout.css";
import "~/components/features/search/Search.css";

export async function loader() {
  return new Response("Not Found", { status: 404 });
}

export async function action() {
  return new Response("Not Found", { status: 404 });
}

export default function NotFound() {
  return (
    <main className="page">
      <section className="container layout" aria-labelledby="not-found-title">
        <div className="intro stack">
          <p className="eyebrow">404 Error</p>
          <h1 id="not-found-title">Page not found</h1>
          <p>The page you are looking for does not exist or has been moved.</p>
        </div>

        <section className="stack" aria-label="Page not found">
          <div style={{ padding: "1rem 0" }}>
            <Link to="/" className="button" style={{ display: "inline-block" }}>
              Back to Weather Dashboard
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
