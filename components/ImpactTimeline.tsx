import { CalendarDays, Camera, MapPin, Sparkles, Trophy } from "lucide-react";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import SectionIcon from "@/components/SectionIcon";
import { impactIntro, impactYears, type ImpactYear } from "@/data/impact";

function PhotoStrip({ entry }: { entry: ImpactYear }) {
  // Selalu tampilkan dua kotak: foto asli kalau ada, placeholder kalau belum.
  const slots = entry.photos.length > 0 ? entry.photos : [null, null];

  return (
    <div className="grid grid-cols-2 gap-3">
      {slots.map((photo, i) => (
        <div
          key={photo?.src ?? i}
          className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-night-800"
        >
          {photo ? (
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-night-800 to-night-900 text-mint-200/30">
              <Camera size={22} />
              <span className="px-3 text-center text-[10px] leading-tight">
                Foto {entry.year} menyusul
              </span>
            </div>
          )}

          {/* Gradasi bawah supaya foto menyatu dengan tema gelap */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night-950/80 to-transparent" />
        </div>
      ))}
    </div>
  );
}

function YearCard({ entry }: { entry: ImpactYear }) {
  return (
    <div className="card-hover rounded-3xl border border-lime-300/25 bg-night-900 p-6 hover:border-mint-400/50 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-gradient-to-r from-mint-500/25 to-lime-300/10 px-4 py-1 text-sm font-extrabold text-mint-200">
          {entry.year}
        </span>
        <p className="text-lg font-bold text-white">{entry.title}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-mint-200/50">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={14} className="text-mint-400" /> {entry.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={14} className="text-mint-400" /> {entry.venue}
        </span>
      </div>

      <p className="mt-5 rounded-2xl border border-white/10 bg-night-950/60 px-4 py-3 text-sm italic text-mint-200/80">
        {entry.theme}
      </p>

      {/* Angka capaian, dihitung naik saat masuk layar */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {entry.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-mint-400/20 bg-gradient-to-br from-mint-500/10 to-transparent p-4"
          >
            <CountUp
              value={stat.value}
              suffix={stat.suffix}
              className="text-2xl font-extrabold text-white"
            />
            <p className="mt-1 text-xs text-mint-200/50">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-mint-100">
            <Sparkles size={15} className="text-mint-400" /> Kegiatan
          </p>
          <ul className="mt-3 space-y-2">
            {entry.highlights.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-mint-200/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-mint-100">
            <Trophy size={15} className="text-lime-300" /> Capaian
          </p>
          <ul className="mt-3 space-y-2">
            {entry.achievements.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-mint-200/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <PhotoStrip entry={entry} />
      </div>
    </div>
  );
}

/**
 * Linimasa "Our Impact" — kilas balik penyelenggaraan tahun sebelumnya.
 * Di layar lebar, kartu berselang-seling kiri dan kanan mengapit garis
 * tengah; di layar kecil semuanya menumpuk dengan garis di sisi kiri.
 */
export default function ImpactTimeline() {
  return (
    <section className="relative mt-24">
      <Reveal>
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-mint-400/30 bg-night-900/40 px-4 py-1.5 text-xs font-medium text-mint-300">
            <SectionIcon className="h-3.5 w-3.5" /> Flashback
          </p>
          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
            {impactIntro.heading}
          </h2>
          <p className="mt-3 text-mint-200/70">{impactIntro.subheading}</p>
        </div>
      </Reveal>

      <div className="relative mt-14">
        {/* Garis linimasa */}
        <span
          aria-hidden="true"
          className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-mint-400/60 via-mint-400/25 to-transparent lg:left-1/2 lg:-translate-x-1/2"
        />

        <div className="space-y-12">
          {impactYears.map((entry, i) => {
            const alignRight = i % 2 === 1;

            return (
              <div key={entry.year} className="relative">
                {/* Titik penanda tahun */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center lg:left-1/2 lg:-translate-x-1/2"
                >
                  <span className="absolute h-6 w-6 rounded-full bg-mint-400/40 animate-pulse-ring" />
                  <span className="relative h-3 w-3 rounded-full bg-mint-400 ring-4 ring-night-950" />
                </span>

                <div
                  className={`pl-10 lg:pl-0 ${
                    alignRight ? "lg:ml-auto lg:w-[calc(50%-2.5rem)]" : "lg:w-[calc(50%-2.5rem)]"
                  }`}
                >
                  <Reveal direction={alignRight ? "right" : "left"}>
                    <YearCard entry={entry} />
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
