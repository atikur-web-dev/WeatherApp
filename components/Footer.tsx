import Link from "next/link";
import { CloudSun, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:px-8">
        {/* Brand and navigation */}
        <div className="flex flex-col items-center justify-between gap-7 md:flex-row md:gap-6">
          <Link
            href="/"
            aria-label="SkyCast home"
            className="group flex items-center gap-2.5 rounded-xl"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-blue-700 text-white transition-transform duration-300 group-hover:scale-105">
              <CloudSun size={25} strokeWidth={1.8} aria-hidden="true" />
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              Sky<span className="text-blue-600">Cast</span>
            </span>
          </Link>

          {/* Footer navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-4"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:bg-sky-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-100 pt-6 sm:mt-9">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs leading-5 text-slate-500 sm:text-sm">
              © 2026 SkyCast. All rights reserved.
            </p>

            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md text-xs text-slate-500 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:text-sm"
            >
              Weather data by Open-Meteo
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}