import { CloudSun, MapPin } from "lucide-react";
import { getWeatherDescription, type WeatherData } from "@/lib/weather";
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

  return (
    <section className="rounded-3xl bg-linear-to-br from-sky-500 to-blue-700 p-8 text-white shadow-xl sm:p-10">
      <div className="flex items-center gap-2 text-sm text-sky-100">
        <MapPin size={17} />

        <span>
          {cityName}
          {country ? `, ${country}` : ""}
        </span>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-8 sm:flex-row">
        <div>
          <p className="text-lg text-sky-100">Current Weather</p>

          <h2 className="mt-3 text-7xl font-bold tracking-tight">
            {Math.round(current.temperature_2m)}°
            <span className="text-5xl">C</span>
          </h2>

          <p className="mt-4 text-xl font-medium">
            {getWeatherDescription(current.weather_code)}
          </p>

          <p className="mt-2 text-sm text-sky-100">
            Feels like {Math.round(current.apparent_temperature)}°C
          </p>
        </div>

        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/15">
          <WeatherIcon
            code={current.weather_code}
            isDay={current.is_day}
            size={100}
          />
        </div>
      </div>

      <div className="mt-8 border-t border-white/20 pt-5 text-sm text-sky-100">
        Local time:{" "}
        {new Intl.DateTimeFormat("en-BD", {
          timeZone: weather.timezone,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())}
      </div>
    </section>
  );
}
