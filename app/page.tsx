import Link from "next/link";
import { ArrowRight, CloudSun, Wind, Droplets } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        {/* Left Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <CloudSun size={18} />
            Your Personal Weather Companion
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Understand the
            <span className="block text-blue-600">
              Weather Around You.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Stay informed about temperature, humidity, wind speed, and hourly
            forecasts with SkyCast. Your everyday weather companion, wherever
            you go.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#weather"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Explore Weather
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Weather Preview */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl sm:p-10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative">
            <p className="text-sm font-medium text-blue-100">
              Your Weather Dashboard
            </p>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-blue-100">Current Weather</p>
                <h2 className="mt-2 text-6xl font-bold">--°C</h2>
                <p className="mt-2 text-blue-100">
                  Live weather coming soon
                </p>
              </div>

              <CloudSun size={88} strokeWidth={1.3} />
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <Droplets size={24} />
                <p className="mt-3 text-sm text-blue-100">Humidity</p>
                <p className="mt-1 text-xl font-semibold">--%</p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <Wind size={24} />
                <p className="mt-3 text-sm text-blue-100">Wind Speed</p>
                <p className="mt-1 text-xl font-semibold">-- km/h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Section Placeholder */}
      <section id="weather" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Weather Forecast
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Know Before You Go
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            We are preparing your live weather dashboard. Soon, you will be
            able to explore current conditions and hourly forecasts powered
            by Open-Meteo.
          </p>
        </div>
      </section>
    </div>
  );
}
