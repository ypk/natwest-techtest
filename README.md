# Weather Application

A weather dashboard built with React, React Router v7, Redux Toolkit, and TypeScript for the NatWest Front-End Coding Exercise.

## What It Does

This application lets users search for current weather conditions by city name or postcode. It fetches data from OpenWeather and displays temperature, conditions, feels-like temperature, wind speed, and humidity.

Key highlights:
- **Search and URL sync**: Search terms sync directly to the URL (`?city=London`), allowing shareable links and browser history navigation.
- **Two-level response caching**: Repeating city searches return instant results (0ms latency) via in-memory Redux state and browser `sessionStorage` persistence.
- **Request cancellation**: In-flight requests automatically abort via `AbortController` when a user types a new search or resets the form.
- **Error handling**: Gracefully handles missing cities, network issues, and missing API keys with helpful error codes (`ERR_CONFIG_MISSING`).
- **Responsive layout**: Mobile-first design tailored to work across mobile, tablet, and desktop viewports.

## Architecture

The project is structured to keep UI logic separate from data fetching and state management:

- **UI Components** (`app/components/`): Presentational components co-located with their unit tests in dedicated subfolders (`form/`, `intro/`, `message/`, `search/`, `summary/`).
- **Redux Store** (`app/store/`): Global application state managed by Redux Toolkit (`@reduxjs/toolkit` and `react-redux`).
  - `store.ts`: Store configuration (`configureStore`).
  - `hooks.ts`: Typed Redux hooks (`useAppDispatch`, `useAppSelector`).
  - `weather/`: Modular weather store module with `weatherSlice`, `weatherThunks` (`fetchWeatherThunk`), `weatherTypes`, and unit tests.
- **Cache and Storage Utilities** (`app/utils/weatherStorage.ts`): Browser `sessionStorage` helpers for caching search results across page reloads.
- **State Hook** (`app/hooks/useWeatherSearch.ts`): Custom React hook connecting components to the Redux store while managing URL query parameter synchronization.
- **API Layer** (`app/api/`): Built using a Facade/Provider pattern. Components and routes only talk to `app/api/weather`. The facade delegates to `weatherProvider`, which calls the OpenWeather client. This makes it straightforward to swap out OpenWeather for WeatherAPI or a mock data source without touching UI code.
- **Types** (`app/types/`): Shared TypeScript domain interfaces (`CurrentWeather`, `WeatherCondition`).

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Environment Setup

The application uses the OpenWeather API (`/data/2.5/weather`). You need an API key to fetch live weather data.

1. Get a free API key from [OpenWeather](https://openweathermap.org/api).
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

Run tests in watch mode:
```bash
npx vitest
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

The codebase includes 49 unit and integration tests written with Vitest and React Testing Library across 14 test files:
- **Redux Store and Caching**: Reducers, thunks, in-memory cache, and `sessionStorage` helpers.
- **Components**: Form inputs, user events, loading/error states, and display logic.
- **API and Mappers**: Metric rounding, data mapping, missing key behavior, and error code outputs.
- **Routes and Handlers**: Document metadata, API resource endpoints, and 404 wildcard fallback routing.
