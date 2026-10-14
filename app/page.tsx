"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

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

// Default location
const INITIAL_CITY: City = {
  id: 1185241,
  name: "Dhaka",
  latitude: 23.8103,
  longitude: 90.4125,
  country: "Bangladesh",
  timezone: "Asia/Dhaka",
};

export default function HomePage() {
  // Selected city and weather
  const [city, setCity] = useState<City>(INITIAL_CITY);

  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Search states
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Weather loading and error states
  const [loading, setLoading] = useState(true);
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
        "Unable to load weather data. Please check your internet connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Load the initial city's weather.
  useEffect(() => {
    const timer = setTimeout(() => {
      void loadWeather(INITIAL_CITY);
    }, 0);

    return () => clearTimeout(timer);
  }, [loadWeather]);

  // Search for cities as the user types.
  useEffect(() => {
    const trimmedQuery = query.trim();

    let active = true;

    if (trimmedQuery.length < 2) {
      return () => {
        active = false;
      };
    }

    const timer = setTimeout(async () => {
      try {
        const results = await searchCities(trimmedQuery);

        if (active) {
          setSuggestions(results);

          if (results.length === 0) {
            setSearchError("No matching cities found.");
          } else {
            setSearchError("");
          }
        }
      } catch {
        if (active) {
          setSuggestions([]);

          setSearchError(
            "City search failed. Please check your internet connection.",
          );
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

  // Handle search input changes.
  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setQuery(value);
    setSuggestions([]);
    setSearchError("");

    setSearching(value.trim().length >= 2);
  }

  // Select a city from the suggestions.
  function handleCitySelect(selectedCity: City) {
    setQuery("");
    setSuggestions([]);
    setSearchError("");
    setSearching(false);

    void loadWeather(selectedCity);
  }

  // Handle form submission.
  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searching) {
      return;
    }

    if (suggestions.length > 0) {
      handleCitySelect(suggestions[0]);
      return;
    }

    if (query.trim().length >= 2) {
      setSearchError("Please select a city from the suggestions.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-sky-100 via-slate-50 to-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 shadow-sm">
              <MapPin size={16} />
              Your weather, your world
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Weather made <span className="text-sky-600">simple.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Get current weather conditions and hourly forecasts for cities
              around the world.
            </p>

            {/* City Search */}
            <div className="relative mx-auto mt-8 max-w-xl text-left">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-sky-900/5 focus-within:border-sky-400"
              >
                <Search className="ml-3 shrink-0 text-slate-400" size={21} />

                <input
                  type="search"
                  role="combobox"
                  value={query}
                  onChange={handleQueryChange}
                  placeholder="Search a city, e.g. London..."
                  aria-label="Search city"
                  aria-expanded={query.trim().length >= 2}
                  aria-controls="city-suggestions"
                  aria-autocomplete="list"
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

              {/* Search Suggestions */}
              {query.trim().length >= 2 && (
                <div
                  id="city-suggestions"
                  className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                >
                  {searching ? (
                    <div className="flex items-center gap-3 px-5 py-4 text-sm text-slate-500">
                      <LoaderCircle
                        className="animate-spin text-sky-600"
                        size={18}
                      />
                      Searching cities...
                    </div>
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
                            {[suggestion.admin1, suggestion.country]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </span>
                      </button>
                    ))
                  ) : (
                    <p
                      role="status"
                      className="px-5 py-4 text-sm text-slate-500"
                    >
                      {searchError ||
                        "No matching cities found. Try another name."}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Weather Overview */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-sky-600">LIVE WEATHER</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Weather Overview
            </h2>
          </div>

          {weather && (
            <p className="text-sm text-slate-500">
              Showing weather for {city.name}
              {city.country ? `, ${city.country}` : ""}
            </p>
          )}
        </div>

        {/* Weather Error */}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <p>{error}</p>

            <button
              type="button"
              onClick={() => void loadWeather(city)}
              className="mt-3 rounded-lg bg-red-100 px-4 py-2 font-semibold transition hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Initial Loading */}
        {loading && !weather ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <LoaderCircle className="animate-spin text-sky-600" size={38} />

            <p className="mt-4 text-slate-600">Loading weather data...</p>
          </div>
        ) : weather ? (
          <div className="space-y-10">
            {/* Updating Indicator */}
            {loading && (
              <div
                role="status"
                className="flex items-center gap-2 text-sm text-sky-600"
              >
                <LoaderCircle className="animate-spin" size={16} />
                Updating weather...
              </div>
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
          !error && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-600">
                Weather information is not available right now.
              </p>

              <button
                type="button"
                onClick={() => void loadWeather(city)}
                className="mt-4 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
              >
                Try Again
              </button>
            </div>
          )
        )}
      </section>
    </main>
  );
}
