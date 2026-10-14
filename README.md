# SkyCast — Weather App

SkyCast is a responsive weather application built with Next.js and TypeScript. It allows users to search for cities, check current weather conditions, and explore hourly forecasts.

**Live Demo:** https://weatherapp-zeta-pink.vercel.app/

## Features

- Search for cities around the world
- View current weather conditions and temperature
- Check humidity, wind speed, and other weather details
- Explore hourly weather forecasts
- Display weather icons based on current conditions
- Use Dhaka as the default location
- Handle loading states and API errors
- Retry requests when weather data cannot be retrieved
- Responsive layout for desktop, tablet, and mobile devices
- Separate About, Services, and Contact pages

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Open-Meteo Weather API
- Open-Meteo Geocoding API

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed on your machine.

### Installation

Clone the repository:

```bash
git clone https://github.com/atikur-web-dev/WeatherApp.git
```

Navigate to the project directory:

```bash
cd WeatherApp
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## API Integration

SkyCast uses Open-Meteo to retrieve weather forecasts and search for locations.

- Weather API: https://open-meteo.com/en/docs
- Geocoding API: https://open-meteo.com/en/docs/geocoding-api

The current implementation does not require an API key.

## Project Structure

```text
WeatherApp/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── WeatherCard.tsx
│   ├── WeatherDetails.tsx
│   ├── HourlyForecast.tsx
│   └── WeatherIcon.tsx
├── lib/
│   └── weather.ts
├── public/
├── package.json
└── README.md
```

## Production Build

To create a production build, run:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Deployment

The application is deployed on Vercel.

**Live Application:** https://weatherapp-zeta-pink.vercel.app/

## Purpose

This project was developed to practice Next.js, TypeScript, reusable React components, API integration, asynchronous data fetching, error handling, and responsive web design.

## Author

**Atikur Rahman**

- GitHub: https://github.com/atikur-web-dev
- LinkedIn: https://www.linkedin.com/in/atikur-rahman-0475b438
- Portfolio: https://personal-portfolio-one-nu-58.vercel.app