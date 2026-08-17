import type { Route } from "./+types/home";
import { Search } from "~/components/search/Search";

/**
 * returns document metadata for the index route.
 */
export function meta({}: Route.MetaArgs) {
  return [
    { title: "NatWest Weather Dashboard" },
    { name: "description", content: "Search for current weather by city." },
  ];
}

/**
 * Renders the index route for the weather search component.
 */
export default function Home() {
  return <Search />;
}
