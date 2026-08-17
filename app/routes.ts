import { type RouteConfig, index, route } from "@react-router/dev/routes";

/**
 * route map for React Router framework.
 */
export default [
	index("routes/home.tsx"),
	route("api/weather", "routes/api.weather.ts"),
] satisfies RouteConfig;
