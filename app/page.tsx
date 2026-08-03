import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import SectionIcon from "@/components/SectionIcon";
import Reveal from "@/components/Reveal";
import { eventInfo } from "@/data/agenda";
import { necscInfo } from "@/data/necsc";
import { yaInfo } from "@/data/youthAmbassador";

const QUICK_LINKS = [
  { href: "/about", label: "About Us", desc: "Kenali lebih dekat Green Impact Festival" },
  { href: "/agenda", label: "Agenda", desc: "Lihat susunan acara lengkap" },
  {
    href: "/registration",
    label: "Registration",
    desc: "Daftar sebagai peserta atau ambassador",
  },
  {
    href: "/registration/necsc",
    label: "NECSC'26",
    desc: "Kompetisi artikel ilmiah nasional",
  },
  { href: "/faq", label: "FAQ", desc: "Pertanyaan yang sering ditanyakan" },
  {
    href: "/become-a-partner",
    label: "Become a Partner",
    desc: "Kolaborasi sebagai sponsor atau media partner",
  },
];

const HIGHLIGHTS = [
  {
    href: "/registration/necsc",
    title: necscInfo.code,
    subtitle: necscInfo.fullName,
    desc: `Total hadiah ${necscInfo.totalPrize} untuk kategori mahasiswa dan SMA/sederajat.`,
    cta: "Lihat detail kompetisi",
  },
  {
    href: "/registration/youth-ambassador",
    title: yaInfo.code,
    subtitle: "Reels Challenge",
    desc: "8 Youth Ambassador terpilih dari subtema Lifestyle, Community, dan Green Career.",
    cta: "Daftar jadi ambassador",
  },
];

// Kata kunci yang berjalan di bawah hero.
const MARQUEE_ITEMS = [
  "Renewable Energy",
  "Sustainable Agriculture",
  "Water & Climate Resilience",
  "Circular & Blue Economy",
  "Green Career",
  "Youth Movement",
  "Beyond Energy",
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Blob gradien yang bergerak pelan di latar */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-mint-500/20 blur-3xl animate-blob" />
          <div
            className="absolute top-10 right-10 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl animate-blob"
            style={{ animationDelay: "-7s" }}
          />
          <div
            className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-brand/20 blur-3xl animate-blob"
            style={{ animationDelay: "-13s" }}
          />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <p
            className="inline-flex items-center gap-2 rounded-full border border-mint-400/30 bg-night-900/40 px-4 py-1.5 text-xs font-medium text-mint-300 mb-6 animate-fade-up backdrop-blur"
            style={{ animationDelay: "60ms" }}
          >
            <SectionIcon className="h-4 w-4 animate-bounce-subtle" /> {eventInfo.tagline}
          </p>

          <h1
            className="text-4xl sm:text-6xl font-extrabold text-white leading-tight animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Green Impact <span className="text-shimmer animate-shimmer">Festival</span> 2026
          </h1>

          <p
            className="mt-6 text-mint-200/70 max-w-2xl mx-auto text-base sm:text-lg animate-fade-up"
            style={{ animationDelay: "280ms" }}
          >
            Bergabunglah dengan festival inovasi lingkungan terbesar di Indonesia. Jelajahi
            pembangunan berkelanjutan di era disrupsi AI bersama para pembicara ahli dan sesi
            interaktif.
          </p>

          <div
            className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-mint-200/60 animate-fade-up"
            style={{ animationDelay: "380ms" }}
          >
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} className="text-mint-400" /> {eventInfo.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-mint-400" /> {eventInfo.location}
            </span>
          </div>

          <div
            className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "480ms" }}
          >
            <Link
              href="/registration"
              className="btn-shine rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_16px_32px_-14px_rgba(61,220,132,0.9)]"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/agenda"
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-mint-100 transition-all duration-300 hover:-translate-y-1 hover:border-mint-400/50 hover:bg-white/5"
            >
              Lihat Agenda
            </Link>
          </div>
        </div>

        {/* Marquee kata kunci */}
        <div className="marquee-mask border-y border-white/5 bg-night-900/40 py-4">
          <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap px-4 text-sm font-medium text-mint-200/50"
              >
                <SectionIcon className="h-3.5 w-3.5 text-mint-400/70" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHT PROGRAM */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-8 grid gap-5 lg:grid-cols-2">
        {HIGHLIGHTS.map((item, i) => (
          <Reveal key={item.href} direction={i === 0 ? "left" : "right"} delay={i * 120}>
            <Link
              href={item.href}
              className="card-hover group relative block h-full overflow-hidden rounded-3xl border border-mint-400/30 bg-gradient-to-br from-mint-500/10 to-lime-300/5 p-8 hover:border-mint-400/70"
            >
              {/* Kilau lembut yang muncul saat hover */}
              <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-mint-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <p className="text-2xl font-extrabold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-mint-300">{item.subtitle}</p>
              <p className="mt-4 text-sm text-mint-200/60">{item.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-mint-400">
                {item.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* QUICK LINKS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((item, i) => (
          <Reveal key={item.href} delay={i * 80} className="h-full">
            <Link
              href={item.href}
              className="card-hover group block h-full rounded-3xl border border-lime-300/20 bg-night-900 p-6 hover:border-mint-400/60"
            >
              <p className="font-semibold text-mint-300 transition-colors group-hover:text-mint-200">
                {item.label}
              </p>
              <p className="text-sm text-mint-200/60 mt-2">{item.desc}</p>
            </Link>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
