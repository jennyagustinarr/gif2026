import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CampusLogo from "@/components/CampusLogo";
import Reveal from "@/components/Reveal";
import { roadshowAgendas, roadshowInfo } from "@/data/campusRoadshow";

export const metadata: Metadata = {
  title: "Campus Roadshow",
  description: roadshowInfo.intro,
};

export default function CampusRoadshowIndex() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-16 left-0 h-72 w-72 rounded-full bg-mint-500/10 blur-3xl animate-blob" />
        <div
          className="absolute top-40 right-0 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl animate-blob"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      <Reveal>
        <SectionHeading title="Campus Roadshow" />
        <p className="mt-6 max-w-3xl text-mint-200/80 leading-relaxed">{roadshowInfo.intro}</p>
      </Reveal>

      <Reveal delay={100} className="mt-10 block">
        <p className="font-semibold text-mint-100">Pilih Agenda</p>
        <p className="mt-1 text-sm text-mint-200/50">
          Setiap kampus punya formulir pendaftaran sendiri. Pilih agenda yang ingin kamu hadiri.
        </p>
      </Reveal>

      <div className="mt-8 space-y-4">
        {roadshowAgendas.map((agenda, i) => {
          const card = (
            <div
              className={`flex flex-col gap-5 rounded-3xl border p-6 transition-all duration-300 sm:flex-row sm:items-center sm:gap-6 ${
                agenda.registrationOpen
                  ? "card-hover border-lime-300/30 bg-night-900 hover:border-mint-400/60"
                  : "border-white/10 bg-night-900/50"
              }`}
            >
              <CampusLogo
                logo={agenda.logo}
                campus={agenda.campus}
                campusShort={agenda.campusShort}
                size="lg"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-lg font-bold text-white">{agenda.campus}</p>
                  {agenda.registrationOpen ? (
                    <span className="rounded-full border border-mint-400/40 bg-mint-400/10 px-3 py-0.5 text-xs font-medium text-mint-300">
                      Registration Open
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/15 px-3 py-0.5 text-xs font-medium text-mint-200/40">
                      Coming Soon
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-mint-300">{agenda.title}</p>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-mint-200/50">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} className="text-mint-400" /> {agenda.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} className="text-mint-400" /> {agenda.venue}
                  </span>
                </div>
              </div>

              {agenda.registrationOpen && (
                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-mint-400">
                  Lihat detail
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              )}
            </div>
          );

          return (
            <Reveal key={agenda.slug} delay={i * 90}>
              {agenda.registrationOpen ? (
                <Link href={`/registration/campus-roadshow/${agenda.slug}`} className="group block">
                  {card}
                </Link>
              ) : (
                card
              )}
            </Reveal>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-mint-200/40">
        Jadwal, lokasi, dan tema tiap kampus diumumkan bertahap lewat Instagram
        @greenimpactfestival. Agenda bertanda Coming Soon belum membuka pendaftaran.
      </p>
    </section>
  );
}
