"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, MapPin, LoaderCircle } from "lucide-react";

import WeatherCard from "@/components/WeatherCard";
import WeatherDetails from "@/components/WeatherDetails";
import HourlyForecast from "@/components/HourlyForecast";

import {
  getWeather,
  searchCities,
  type City,
  type WeatherData,
} from "@/lib/weather";

export default function HomePage() {
  const [city, setCity] = useState<City>({
    id: 1185241,
    name: "Dhaka",
    latitude: 23.8103,
    longitude: 90.4125,
    country: "Bangladesh",
    timezone: "Asia/Dhaka",
  });

  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  // Fetch weather for the selected city.
  const loadWeather = useCallback(async (selectedCity: City) => {
    setLoading(true);
    setError("");

    try {
      const data = await getWeather(
        selectedCity.latitude,
        selectedCity.longitude,
      );

      setCity(selectedCity);
      setWeather(data);
    } catch {
      setError(
        "Weather data load kora jacche na. Internet connection check kore abar try koro.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Load Dhaka weather when the homepage first opens.
  // Load initial weather without calling the state-setting
// function directly inside the effect body.
useEffect(() => {
  const initialCity: City = {
    id: 1185241,
    name: "Dhaka",
    latitude: 23.8103,
    longitude: 90.4125,
    country: "Bangladesh",
    timezone: "Asia/Dhaka",
  };

  const timer = setTimeout(() => {
    void loadWeather(initialCity);
  }, 0);

  return () => clearTimeout(timer);
}, [loadWeather]);

  // Search for cities as the user types.
  useEffect(() => {
    const trimmedQuery = query.trim();

   if (trimmedQuery.length < 2) {
  return;
}

    let active = true;

    const timer = setTimeout(async () => {
      setSearching(true);

      try {
        const results = await searchCities(trimmedQuery);

        if (active) {
          setSuggestions(results);
        }
      } catch {
        if (active) {
          setSuggestions([]);
        }
      } finally {
        if (active) {
          setSearching(false);
        }
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  function handleCitySelect(selectedCity: City) {
    setQuery("");
    setSuggestions([]);
    void loadWeather(selectedCity);
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (suggestions.length > 0) {
      handleCitySelect(suggestions[0]);
      return;
    }

    if (query.trim().length >= 2) {
      setError(
        "City suggestion theke ekta location select koro. Proyojone aro specific city name likho.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-linear-to-b from-sky-100 via-slate-50 to-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 shadow-sm">
              <MapPin size={16} />
              Your weather, your world
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Weather made{" "}
              <span className="text-sky-600">simple.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Get current weather conditions and hourly forecasts
              for cities around the world.
            </p>

            {/* City search */}
            <div className="relative mx-auto mt-8 max-w-xl text-left">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-sky-900/5 focus-within:border-sky-400"
              >
                <Search
                  className="ml-3 shrink-0 text-slate-400"
                  size={21}
                />

                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search a city, e.g. London..."
                  aria-label="Search city"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
                />

                <button
                  type="submit"
                  disabled={searching || query.trim().length < 2}
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {searching ? (
                    <LoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <Search size={18} />
                  )}

                  <span className="hidden sm:inline">Search</span>
                </button>
              </form>

              {query.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  {searching ? (
                    <p className="px-5 py-4 text-sm text-slate-500">
                      Searching cities...
                    </p>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion) => (
                      <button
                        key={`${suggestion.id}-${suggestion.latitude}-${suggestion.longitude}`}
                        type="button"
                        onClick={() => handleCitySelect(suggestion)}
                        className="flex w-full items-start gap-3 border-b border-slate-100 px-5 py-4 text-left transition last:border-b-0 hover:bg-sky-50"
                      >
                        <MapPin
                          className="mt-0.5 shrink-0 text-sky-600"
                          size={18}
                        />

                        <span>
                          <span className="block font-medium text-slate-900">
                            {suggestion.name}
                          </span>

                          <span className="mt-1 block text-sm text-slate-500">
                            {[
                              suggestion.admin1,
                              suggestion.country,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="px-5 py-4 text-sm text-slate-500">
                      No matching cities found. Try another name.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Weather results */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-sky-600">
              LIVE WEATHER
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Weather Overview
            </h2>
          </div>

          {weather && !loading && (
            <p className="text-sm text-slate-500">
              Showing weather for {city.name}
              {city.country ? `, ${city.country}` : ""}
            </p>
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {loading && !weather ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <LoaderCircle
              className="animate-spin text-sky-600"
              size={38}
            />

            <p className="mt-4 text-slate-600">
              Loading weather data...
            </p>
          </div>
        ) : weather ? (
          <div className="space-y-10">
            {loading && (
              <p className="text-sm text-sky-600">
                Updating weather...
              </p>
            )}

            <WeatherCard
              weather={weather}
              cityName={city.name}
              country={city.country}
            />

            <WeatherDetails weather={weather} />

            <HourlyForecast weather={weather} />
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">
              Weather information is not available right now.
            </p>

            <button
              type="button"
              onClick={() => void loadWeather(city)}
              className="mt-4 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
            >
              Try Again
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
