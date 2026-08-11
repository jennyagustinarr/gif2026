"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/agenda", label: "Agenda" },
];

const REGISTRATION_LINKS = [
  { href: "/registration", label: "All Programs" },
  { href: "/registration/youth-ambassador", label: "Youth Ambassador" },
  { href: "/registration/necsc", label: "NECSC" },
  { href: "/registration/campus-roadshow", label: "Campus Roadshow" },
  { href: "/registration/seminar", label: "High Level Dialogue" },
];

const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/sre-website-a43e8.appspot.com/o/greenimpact-festival-2025%2Fimages%2Fgreenimpactfest-logo.png?alt=media&token=ebdc6d50-9033-4bd4-901e-5a60ad9cc5de";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Navbar menyusut dan memunculkan garis batas begitu halaman di-scroll.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu mobile setiap kali pindah halaman.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function linkClass(href: string) {
    const active = pathname === href;
    return `relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
      active
        ? "bg-mint-400/15 text-mint-300"
        : "text-mint-200/90 hover:bg-mint-400/10 hover:text-mint-300"
    }`;
  }

  const registrationActive = pathname.startsWith("/registration");

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur transition-all duration-300 ${
        scrolled
          ? "bg-night-950/90 border-b border-mint-400/10 shadow-lg shadow-black/30"
          : "bg-night-950/70 border-b border-transparent"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <img
            src={LOGO_URL}
            alt="Green Impact Festival Logo"
            className="h-10 w-10 rounded-full object-cover transition-transform duration-500 group-hover:rotate-[14deg] group-hover:scale-110"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-night-900/60 px-2 py-2 transition-colors duration-300 hover:border-mint-400/25">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}

          {/* Dropdown murni CSS (group-hover / focus-within) supaya tetap
              berfungsi walau JavaScript bermasalah. Judulnya link asli,
              jadi diklik langsung menuju /registration. */}
          <div className="group relative">
            <Link
              href="/registration"
              className={`flex items-center gap-1 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                registrationActive
                  ? "bg-mint-400/15 text-mint-300"
                  : "text-mint-200/90 hover:bg-mint-400/10 hover:text-mint-300"
              }`}
            >
              Registration
              <ChevronDown
                size={16}
                className="transition-transform duration-300 group-hover:rotate-180"
              />
            </Link>

            <div className="invisible absolute left-0 top-full w-64 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="rounded-2xl border border-white/10 bg-night-900/95 p-2 shadow-xl shadow-black/50 backdrop-blur">
                {REGISTRATION_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm text-mint-200/90 transition-all duration-200 hover:translate-x-1 hover:bg-mint-400/10 hover:text-mint-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/faq" className={linkClass("/faq")}>
            FAQ
          </Link>
        </nav>

        <Link
          href="/become-a-partner"
          className="btn-shine hidden lg:inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-mint-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint-400/50 hover:bg-white/5"
        >
          Partner Inquiries
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-mint-200 transition-transform duration-300 active:scale-90"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile nav — tinggi dianimasikan lewat grid-rows biar mulus */}
      <div
        className={`lg:hidden grid overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="border-t border-white/10 bg-night-950 px-4 pb-6 pt-2 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-4 py-3 text-sm text-mint-200/90 transition-all duration-200 hover:translate-x-1 hover:bg-mint-400/10"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="px-4 pt-2 pb-1 text-xs uppercase tracking-wide text-mint-200/50">
              Registration
            </div>
            {REGISTRATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-4 py-3 text-sm text-mint-200/90 transition-all duration-200 hover:translate-x-1 hover:bg-mint-400/10"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/faq"
              className="block rounded-xl px-4 py-3 text-sm text-mint-200/90 transition-all duration-200 hover:translate-x-1 hover:bg-mint-400/10"
              onClick={() => setMobileOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/become-a-partner"
              className="block rounded-xl px-4 py-3 mt-2 text-center text-sm font-medium border border-white/20 text-mint-100 transition-colors hover:border-mint-400/50 hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              Partner Inquiries
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
