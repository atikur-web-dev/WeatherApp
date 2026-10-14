import Link from "next/link";
import { CloudSun } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 shadow-sm shadow-slate-900/2 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="SkyCast home"
          className="group flex shrink-0 items-center gap-2.5 rounded-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-blue-700 text-white shadow-md shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
            <CloudSun size={26} strokeWidth={1.8} aria-hidden="true" />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Sky<span className="text-blue-600">Cast</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2 text-xs font-medium text-slate-600 transition-colors duration-200 hover:bg-sky-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:px-3 sm:text-sm md:px-4"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}