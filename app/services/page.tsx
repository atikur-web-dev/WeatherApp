import Link from "next/link";
import {
  Thermometer,
  Droplets,
  Wind,
  Clock,
  Search,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Thermometer,
    title: "Current Temperature",
    description:
      "Check the current temperature and understand the weather conditions in your selected location.",
    number: "01",
  },
  {
    icon: Droplets,
    title: "Humidity Information",
    description:
      "View relative humidity to understand how much moisture is present in the air.",
    number: "02",
  },
  {
    icon: Wind,
    title: "Wind Speed",
    description:
      "Check wind speed and get a better understanding of the current outdoor conditions.",
    number: "03",
  },
  {
    icon: Clock,
    title: "Hourly Forecast",
    description:
      "Explore hourly weather forecasts to help you plan your activities throughout the day.",
    number: "04",
  },
  {
    icon: Search,
    title: "City Search",
    description:
      "Search for a city and explore weather information for your selected location.",
    number: "05",
  },
  {
    icon: CalendarDays,
    title: "Weather Overview",
    description:
      "Explore forecast information to make everyday planning more convenient.",
    number: "06",
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-linear-to-br from-blue-600 to-indigo-700 px-5 py-20 text-white md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Our Services
          </p>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl md:text-6xl">
            Everything You Need
            <span className="block text-blue-200">to Know the Weather.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-blue-100">
            Explore useful weather information designed to help you make
            informed decisions and plan your day with confidence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              What We Offer
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Weather Tools for Everyday Life
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              SkyCast brings important weather information together in a
              straightforward and accessible interface.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={28} />
                    </div>

                    <span className="text-sm font-semibold text-slate-300">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-3xl bg-blue-50 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Ready to Explore the Weather?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
              Visit our home page to explore the SkyCast weather dashboard.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Go to Home
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
