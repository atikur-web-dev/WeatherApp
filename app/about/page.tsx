import Link from "next/link";
import {
  CloudSun,
  Target,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: CloudSun,
    title: "Weather at a Glance",
    description:
      "View current temperature, humidity, wind speed, and weather conditions in one place.",
  },
  {
    icon: Zap,
    title: "Simple and Fast",
    description:
      "Enjoy a clean, responsive interface designed to make checking the weather effortless.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Data Source",
    description:
      "Get weather information powered by Open-Meteo, a weather API providing forecast data.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-linear-to-br from-blue-600 to-indigo-700 px-5 py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            About SkyCast
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Weather Made
            <span className="block text-blue-200">Simple for Everyone.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            SkyCast helps you stay informed about the weather with a simple,
            modern, and easy-to-use experience.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Target size={30} />
            </div>

            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Our Mission
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Our mission is to make weather information accessible and easy
              to understand. Whether you are planning your day, preparing for
              a journey, or simply checking the temperature, SkyCast aims to
              provide the information you need.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              We combine a clean interface with weather forecast data to
              create a useful everyday companion for people on the move.
            </p>

            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-800"
            >
              Explore Our Services
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <CloudSun size={36} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Your Everyday Weather Companion
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              From current weather conditions to hourly forecasts, SkyCast
              brings useful weather information together in one convenient
              place.
            </p>

            <div className="mt-8 rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-700">
                Our goal
              </p>

              <p className="mt-2 font-semibold text-slate-800">
                Less complexity. More clarity. Better planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Why SkyCast
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Designed Around Your Needs
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 p-7 transition-shadow hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
