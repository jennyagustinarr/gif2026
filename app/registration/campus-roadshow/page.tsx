import type { Metadata } from "next";
import RegisterCta from "@/components/RegisterCta";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { roadshowInfo, roadshowEventDetails } from "@/data/campusRoadshow";

export const metadata: Metadata = {
  title: "Campus Roadshow",
  description: roadshowInfo.paragraphs[0],
};

const EVENT_ROWS = [
  { icon: "📅", label: "Date", value: roadshowEventDetails.date },
  { icon: "🕒", label: "Time", value: roadshowEventDetails.time },
  { icon: "📍", label: "Venue", value: roadshowEventDetails.venue },
  { icon: "🎟️", label: "Ticket", value: roadshowInfo.price },
];

export default function CampusRoadshowRegistration() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
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
        <SectionHeading title={roadshowInfo.code} />
        <p className="mt-3 text-sm font-medium text-mint-400">{roadshowInfo.campus}</p>
      </Reveal>

      {/* PENJELASAN ACARA */}
      <Reveal delay={110} className="mt-8 block">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {roadshowInfo.title}
        </h2>
        <p className="mt-3 text-mint-300 font-medium">{roadshowInfo.subtitle}</p>

        <div className="mt-6 space-y-4 text-mint-200/80 leading-relaxed">
          {roadshowInfo.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={160} direction="zoom" className="mt-8 block">
        <dl className="grid gap-4 rounded-3xl border border-lime-300/25 bg-night-900 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {EVENT_ROWS.map((row) => (
            <div key={row.label}>
              <dt className="text-xs uppercase tracking-wide text-mint-200/40">
                {row.icon} {row.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-mint-100">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal>
        <RegisterCta
          href="/registration/campus-roadshow/form"
          label={roadshowInfo.ctaLabel}
          note={roadshowInfo.formIntro}
        />
      </Reveal>
    </section>
  );
}
