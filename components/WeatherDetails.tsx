import {
  Droplets,
  Wind,
  Compass,
  CloudRain,
} from "lucide-react";

import type { WeatherData } from "@/lib/weather";

interface WeatherDetailsProps {
  weather: WeatherData;
}

export default function WeatherDetails({
  weather,
}: WeatherDetailsProps) {
  const current = weather.current;

  const details = [
    {
      label: "Humidity",
      value: `${current.relative_humidity_2m}%`,
      description: "Relative humidity",
      icon: Droplets,
      iconStyle: "bg-sky-50 text-sky-600",
      accent: "from-sky-500 to-cyan-400",
    },
    {
      label: "Wind Speed",
      value: `${Math.round(current.wind_speed_10m)} km/h`,
      description: "Current wind speed",
      icon: Wind,
      iconStyle: "bg-emerald-50 text-emerald-600",
      accent: "from-emerald-500 to-teal-400",
    },
    {
      label: "Wind Direction",
      value: `${Math.round(current.wind_direction_10m)}°`,
      description: "Direction from north",
      icon: Compass,
      iconStyle: "bg-violet-50 text-violet-600",
      accent: "from-violet-500 to-purple-400",
    },
    {
      label: "Precipitation",
      value: `${current.precipitation} mm`,
      description: "Current precipitation",
      icon: CloudRain,
      iconStyle: "bg-blue-50 text-blue-600",
      accent: "from-blue-500 to-indigo-400",
    },
  ];

  return (
    <section aria-labelledby="weather-details-heading">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
          Weather at a glance
        </p>

        <h2
          id="weather-details-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Weather Details
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Key measurements for the current conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {details.map((detail) => {
          const Icon = detail.icon;

          return (
            <article
              key={detail.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-900/5 sm:p-6"
            >
              {/* Decorative accent */}
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${detail.accent} opacity-80 transition-opacity group-hover:opacity-100`}
              />

              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {detail.label}
                  </p>

                  <p className="mt-3 wrap-break-word text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {detail.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${detail.iconStyle} transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                  {detail.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
