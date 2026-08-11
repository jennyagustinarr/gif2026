import type { Metadata } from "next";
import { Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import RegisterCta from "@/components/RegisterCta";
import Reveal from "@/components/Reveal";
import { agendaSessions, eventInfo } from "@/data/agenda";
import { seminarInfo, seminarEventDetails } from "@/data/seminar";

export const metadata: Metadata = {
  title: "Seminar",
  description: seminarInfo.intro,
};

const POSTER_URL =
  "https://firebasestorage.googleapis.com/v0/b/sre-website-a43e8.appspot.com/o/greenimpact-festival-2025%2Fimages%2Fgreenimpactfest-logo.png?alt=media&token=ebdc6d50-9033-4bd4-901e-5a60ad9cc5de";

export default function SeminarPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <Reveal>
        <SectionHeading title="Seminar" />
        <p className="mt-4 text-mint-200/70">{seminarInfo.title}</p>
      </Reveal>

      <Reveal delay={100} direction="zoom">
        <div className="mt-10 rounded-3xl bg-gradient-to-br from-lime-100 via-emerald-50 to-lime-200 p-6 sm:p-8 grid gap-8 lg:grid-cols-[280px_1fr] text-neutral-900 shadow-[0_28px_60px_-30px_rgba(61,220,132,0.5)]">
          <div className="group relative overflow-hidden rounded-2xl bg-night-950 aspect-square flex items-center justify-center">
            <span className="absolute h-40 w-40 rounded-full bg-mint-500/20 blur-3xl animate-blob" />
            <img
              src={POSTER_URL}
              alt="Green Impact Festival 2026"
              className="relative h-24 w-24 object-contain transition-transform duration-700 group-hover:scale-110 animate-float"
            />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold">{eventInfo.name}</h2>
            <p className="text-sm text-neutral-600 mt-1">{eventInfo.organizer}</p>

            <div className="mt-5 flex flex-col sm:flex-row gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{seminarEventDetails.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{seminarEventDetails.venue}</span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-neutral-700">{seminarInfo.intro}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-10 block">
        <p className="text-mint-200/80 leading-relaxed">{seminarInfo.description}</p>
      </Reveal>

      <Reveal delay={150} className="mt-8 block">
        <div className="card-hover rounded-2xl border border-lime-300/20 bg-night-900 p-6 hover:border-mint-400/40">
          <p className="font-semibold text-mint-100 mb-3">Benefits</p>
          <ul className="space-y-1.5 text-sm text-mint-200/70 list-disc list-inside">
            {seminarInfo.benefits.map((b) => (
              <li key={b} className="transition-colors hover:text-mint-200">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mt-14">
        <Reveal>
          <p className="font-semibold text-mint-100 mb-4">Sessions</p>
        </Reveal>
        <div className="space-y-3">
          {agendaSessions.map((session, i) => (
            <Reveal key={i} delay={i * 70} direction="left">
              <div className="card-hover rounded-2xl border border-lime-300/30 bg-night-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:border-mint-400/50">
                <div>
                  <span className="text-sm font-medium text-mint-300">{session.time}</span>
                  <p className="font-semibold text-mint-100">{session.title}</p>
                </div>
                {session.speakers && (
                  <span className="text-xs text-mint-200/50">
                    {session.speakers.length} pembicara
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <RegisterCta
          href="/registration/seminar/form"
          label="Register for Seminar"
          note="Pendaftaran gratis. Informasi acara akan dikirim ke email yang kamu daftarkan."
        />
      </Reveal>
    </section>
  );
}
