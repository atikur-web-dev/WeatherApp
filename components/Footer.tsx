import Link from "next/link";
import { CloudSun } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <CloudSun size={28} className="text-blue-600" />

            <span className="text-xl font-bold text-slate-900">
              Sky<span className="text-blue-600">Cast</span>
            </span>
          </Link>

          {/* Footer Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 transition-colors hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © 2026 SkyCast. Weather information powered by Open-Meteo.
          </p>
        </div>
      </div>
    </footer>
  );
}
