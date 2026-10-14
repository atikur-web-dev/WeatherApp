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
    },
    {
      label: "Wind Speed",
      value: `${Math.round(current.wind_speed_10m)} km/h`,
      description: "Current wind speed",
      icon: Wind,
    },
    {
      label: "Wind Direction",
      value: `${Math.round(current.wind_direction_10m)}°`,
      description: "Direction from north",
      icon: Compass,
    },
    {
      label: "Precipitation",
      value: `${current.precipitation} mm`,
      description: "Current precipitation",
      icon: CloudRain,
    },
  ];

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold text-slate-900">
        Weather Details
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {details.map((detail) => {
          const Icon = detail.icon;

          return (
            <article
              key={detail.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-sky-100 p-3 text-sky-600">
                  <Icon size={23} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    {detail.label}
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {detail.value}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                {detail.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
