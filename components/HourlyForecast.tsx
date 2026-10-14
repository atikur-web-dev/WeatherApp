import WeatherIcon from "@/components/WeatherIcon";

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

  // Find the current hour using the selected city's local time.
  const currentHour = `${current.time.slice(0, 13)}:00`;

  let startIndex = hourly.time.findIndex(
    (time) => time >= currentHour,
  );

  if (startIndex === -1) {
    startIndex = 0;
  }

  // Prepare the next six hours of forecast data.
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
        isDay: hourly.is_day[actualIndex],
      };
    });

  // Format the API's local-time string without browser timezone conversion.
  function formatLocalHour(time: string): string {
    const hour = Number(time.slice(11, 13));

    const displayHour = hour % 12 || 12;
    const period = hour >= 12 ? "PM" : "AM";

    return `${displayHour} ${period}`;
  }

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
              {formatLocalHour(item.time)}
            </p>

            <div className="my-4 flex justify-center text-sky-500">
              <WeatherIcon
                code={item.weatherCode}
                isDay={item.isDay}
                size={35}
              />
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
