import { CloudSun } from "lucide-react";

import {
  getWeatherDescription,
  type WeatherData,
} from "@/lib/weather";

interface HourlyForecastProps {
  weather: WeatherData;
}

export default function HourlyForecast({
  weather,
}: HourlyForecastProps) {
  const { hourly, current } = weather;

  const currentHour = Math.floor(
    new Date(current.time).getTime() / 3_600_000,
  );

  let startIndex = hourly.time.findIndex((time) => {
    return (
      Math.floor(new Date(time).getTime() / 3_600_000) >=
      currentHour
    );
  });

  if (startIndex === -1) {
    startIndex = 0;
  }

  const forecast = hourly.time
    .slice(startIndex, startIndex + 6)
    .map((time, index) => {
      const actualIndex = startIndex + index;

      return {
        time,
        temperature: hourly.temperature_2m[actualIndex],
        weatherCode: hourly.weather_code[actualIndex],
        precipitation:
          hourly.precipitation_probability[actualIndex],
      };
    });

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold text-slate-900">
        Hourly Forecast
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {forecast.map((item) => (
          <article
            key={item.time}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {new Intl.DateTimeFormat("en-BD", {
                timeZone: weather.timezone,
                hour: "numeric",
                hour12: true,
              }).format(new Date(item.time))}
            </p>

            <div className="my-4 flex justify-center text-sky-500">
              <CloudSun size={35} strokeWidth={1.5} />
            </div>

            <p className="text-2xl font-bold text-slate-900">
              {Math.round(item.temperature)}°C
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {getWeatherDescription(item.weatherCode)}
            </p>

            <p className="mt-3 text-xs text-sky-600">
              Rain chance: {item.precipitation ?? 0}%
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
