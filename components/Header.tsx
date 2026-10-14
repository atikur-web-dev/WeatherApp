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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <CloudSun size={25} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Sky<span className="text-blue-600">Cast</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 sm:text-base"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
