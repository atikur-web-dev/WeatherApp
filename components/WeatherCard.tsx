import { MapPin, Clock3, Thermometer } from "lucide-react";

import {
  getWeatherDescription,
  type WeatherData,
} from "@/lib/weather";

import WeatherIcon from "@/components/WeatherIcon";

interface WeatherCardProps {
  weather: WeatherData;
  cityName: string;
  country?: string;
}

export default function WeatherCard({
  weather,
  cityName,
  country,
}: WeatherCardProps) {
  const current = weather.current;

  // Format the API-provided local time consistently on server and client.
  function formatLocalTime(timeString: string): string {
    const timePart = timeString.split("T")[1];

    if (!timePart) {
      return "--:--";
    }

    const [hours, minutes] = timePart.split(":");
    const hour = Number(hours);

    if (!Number.isFinite(hour) || !minutes) {
      return "--:--";
    }

    const displayHour = hour % 12 || 12;
    const period = hour >= 12 ? "PM" : "AM";

    return `${displayHour}:${minutes} ${period}`;
  }

  const localTime = formatLocalTime(current.time);

  return (
    <section className="relative isolate overflow-hidden rounded-4xl bg-linear-to-br from-sky-500 via-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-900/10 sm:p-9 lg:p-10">
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl"
      />

      {/* Location */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
            <MapPin size={19} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-100">
              Current Location
            </p>

            <h2 className="mt-1 wrap-break-word text-lg font-semibold sm:text-xl">
              {cityName}
              {country ? `, ${country}` : ""}
            </h2>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-sky-50 backdrop-blur-sm sm:text-sm">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]"
          />

          Live Weather
        </div>
      </div>

      {/* Main weather information */}
      <div className="mt-10 grid items-center gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-4">
        <div className="order-2 text-center sm:order-1 sm:text-left">
          <p className="text-sm font-medium text-sky-100 sm:text-base">
            Current Weather
          </p>

          <div className="mt-2 flex items-start justify-center sm:justify-start">
            <span className="text-7xl font-bold leading-none tracking-[-0.07em] sm:text-8xl lg:text-9xl">
              {Math.round(current.temperature_2m)}
            </span>

            <span className="ml-1 mt-1 text-3xl font-medium text-sky-100 sm:text-4xl">
              °C
            </span>
          </div>

          <p className="mt-5 text-xl font-semibold sm:text-2xl">
            {getWeatherDescription(current.weather_code)}
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-sky-50">
            <Thermometer size={17} aria-hidden="true" />

            Feels like{" "}
            <span className="font-semibold text-white">
              {Math.round(current.apparent_temperature)}°C
            </span>
          </div>
        </div>

        {/* Weather icon */}
        <div className="order-1 flex justify-center sm:order-2 sm:justify-end">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm sm:h-48 sm:w-48 lg:h-56 lg:w-56">
            <div
              aria-hidden="true"
              className="absolute inset-3 rounded-full border border-white/10"
            />

            <WeatherIcon
              code={current.weather_code}
              isDay={current.is_day}
              size={112}
            />
          </div>
        </div>
      </div>

      {/* Local time */}
      <div className="mt-9 border-t border-white/20 pt-5 sm:mt-10">
        <div className="flex items-center gap-2 text-sm text-sky-100">
          <Clock3 size={17} aria-hidden="true" />

          <span>Local time</span>

          <span className="font-semibold text-white">
            {localTime}
          </span>
        </div>
      </div>
    </section>
  );
}