import { Link } from "react-router";
import type { LocationSuggestion } from "~/types/weather";

type DisambiguationProps = {
  city?: string;
  suggestions: LocationSuggestion[];
};

export function Disambiguation({ city, suggestions }: DisambiguationProps) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="message message--info" role="region" aria-label="Multiple locations found">
      <p className="message-line">
        Multiple locations found for "{city}". Did you mean:
      </p>
      <ul className="suggestions-list">
        {suggestions.map((item, index) => (
          <li key={index} className="suggestion-item">
            <Link to={`/?city=${encodeURIComponent(item.query)}`} className="suggestion-link">
              {item.name}, {item.state ? `${item.state}, ` : ""}{item.country}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
