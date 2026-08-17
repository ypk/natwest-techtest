# Weather Application

A weather dashboard built with React, React Router v7, and TypeScript for the NatWest Front-End Coding Exercise.

## What It Does

This application lets users search for current weather conditions by city name or postcode. It fetches data from OpenWeather and displays temperature, conditions, feels-like temperature, wind speed, and humidity.

Key highlights:
- **Search & URL Sync**: Search terms sync directly to the URL (`?city=London`), allowing shareable links and browser history navigation.
- **Request Cancellation**: In-flight requests automatically abort via `AbortController` when a user types a new search or resets the form.
- **Error Handling**: Gracefully handles missing cities, network issues, and missing API keys with helpful messages and error codes for debugging (`ERR_CONFIG_MISSING`).
- **Responsive Layout**: Mobile-first design tailored to work cleanly on mobile, tablet, and desktop viewports.

## Architecture

The project is structured to keep UI logic separate from data fetching and state management:

- **UI Components (`app/components/`)**: Presentational components co-located with their unit tests in dedicated subfolders (`form/`, `intro/`, `message/`, `search/`, `summary/`).
- **State Management (`app/hooks/useWeatherSearch.ts`)**: Custom hook managing search state, validation, request cancellation, and URL query params.
- **API Layer (`app/api/`)**: Built using a Facade/Provider pattern. Components and routes only talk to `app/api/weather`. The facade delegates to `weatherProvider`, which calls the OpenWeather client. This makes it straightforward to swap out OpenWeather for WeatherAPI or a mock data source without touching UI code.
- **Types (`app/types/`)**: Shared TypeScript interfaces (`CurrentWeather`, `WeatherCondition`).

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Environment Setup

The application uses the OpenWeather API (`/data/2.5/weather`). You'll need an API key to fetch live weather data.

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

The codebase includes 43 unit and integration tests written with Vitest and React Testing Library across 12 test files:
- **Components**: Form inputs, user events, loading/error states, and display logic.
- **API & Mappers**: Metric rounding, data mapping, missing key behavior, and error code outputs.
- **Routes & Handlers**: Document metadata, API resource endpoints, and 404 wildcard fallback routing.
