# Weather Application

A weather dashboard built with React, React Router v7, Redux Toolkit, and TypeScript for the NatWest Front-End Coding Exercise.

## Features

This application lets users search for current weather conditions by city name or postcode. It fetches data from OpenWeather and displays temperature, conditions, feels-like temperature, wind speed, humidity, and an extended 5-day forecast.

Key features:
- **Search and URL sync**: Search terms sync to the URL (`?city=London`) for shareable links and browser history navigation.
- **Extended 5-Day Forecast Layouts**: Users can switch between a flat vertically stacked daily panel list and an interactive tabbed layout that maps weekdays, dates, and min/max temperatures.
- **Location Disambiguation**: Broad city searches (like `York` or `Paris`) detect multiple matching cities (such as `York, GB` and `York, US`) and present suggestion links to load the exact location.
- **Accessible Detail Panels**: Restructured details panels with customized SVGs, screen-reader `aria-label` tags, and hover tooltips (`title`) across all forecast details.
- **Two-level response caching**: Repeated city searches return instant results using in-memory Redux state and browser `sessionStorage` with a 10-minute expiration.
- **Request cancellation**: Active requests abort via `AbortController` when a user types a new search or resets the form.
- **Error handling**: Displays helpful messages for missing cities, network issues, and missing API keys (`ERR_CONFIG_MISSING`).
- **Responsive layout**: Mobile-first design that works across different screen sizes, with grid column safety overrides on tablets and desktops.

## Architecture

The project separates UI logic, data fetching, and state management:

- **UI Components** (`app/components/`): Presentational components located with their unit tests in dedicated subfolders (`disambiguation/`, `forecast/`, `form/`, `intro/`, `message/`, `panel/`, `search/`, `summary/`, `tabs/`).
- **Redux Store** (`app/store/`): Global state managed by Redux Toolkit.
  - `store.ts`: Store configuration.
  - `hooks.ts`: Typed Redux hooks (`useAppDispatch`, `useAppSelector`).
  - `weather/`: Weather store slice, thunks, types, and unit tests.
- **Storage Layer** (`app/storage/`): Provider pattern that supports browser storage engines (like `sessionStorage`, `localStorage`, or `cookieStorage`).
- **State Hooks** (`app/hooks/`):
  - `useWeatherSearch.ts`: Custom React hook that connects components to the Redux store and manages URL query parameter synchronization.
  - `useTabs.ts`: Custom React hook that groups forecasts, selects active tabs, and calculates daily min/max temperatures.
- **API Layer** (`app/api/`): Client mappers and services that fetch current weather, forecast, and geocoding data from OpenWeather. Components and routes only talk to `app/api/weather`.
- **Types** (`app/types/`): Shared TypeScript domain interfaces.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Environment Setup

The application uses the OpenWeather API. You need an API key to fetch live weather data.

1. Get an API key from [OpenWeather](https://openweathermap.org/api).
2. Create a `.env.local` file in the root directory:
   ```env
   OPENWEATHER_API_KEY=your_api_key_here
   ```

### Commands

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

Run tests:
```bash
npm test
```

Run TypeScript type check:
```bash
npm run typecheck
```

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm run start
```

Run in Docker:
```bash
docker build -t weather-app .
docker run -p 3000:3000 -e OPENWEATHER_API_KEY=your_api_key weather-app
```

## Testing

The codebase includes unit and integration tests written with Vitest and React Testing Library:
- **Extended Forecast**: Test coverage for client, mapper, and the forecast component.
- **Location Disambiguation**: Test coverage for the geocoding client, thunks, and disambiguation links.
- **Redux Store and Caching**: Test coverage for reducers, caching, and storage helper classes.
- **Components**: Test coverage for form inputs, user interaction, display states, and error layouts.
- **API and Mappers**: Test coverage for data conversion, rounding, and error reporting.
- **Routes and Handlers**: Test coverage for resource endpoints, metadata, and 404 routing.

## Key Decisions & Trade-offs

### 1. State Management: Redux Toolkit (RTK)
- **Decision**: Used Redux Toolkit to manage global search states, cached weather thunks, and geocoding suggestions.
- **Trade-off**: While React Query works well for server query cache state, RTK provides central client control over cache states, thunk status updates, and custom abort dispatches (`AbortController`). This keeps the presentation code separate from database and API logic.

### 2. Multi-Layer Caching (Redux + sessionStorage)
- **Decision**: Implemented client-side memory cache in the RTK store, backed by browser `sessionStorage` cache with a 10-minute expiration timestamp.
- **Trade-off**: This increases caching efficiency and reduces API requests. `sessionStorage` is preferred over `localStorage` because it automatically clears when the browser session ends.

### 3. Responsive Dual Layout
- **Decision**: Preserved the original flat day lists and added a tabbed layout, allowing users to switch dynamically.
- **Trade-off**: This increases CSS complexity, but it delivers a better user experience than a single static layout.

### Future Improvements
- **End-to-End Tests**: Set up integration tests with Playwright or Cypress for search scenarios.
- **Visual Regression Checks**: Integrate screenshot comparisons to verify UI stability across layout modes.
- **Accessibility Audits**: Run automated accessibility checks with axe-core to confirm contrast and screen-reader compliance.

