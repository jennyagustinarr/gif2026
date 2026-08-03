import type { Metadata } from "next";
import { Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AgendaList from "./AgendaList";
import { agendaSessions, eventInfo } from "@/data/agenda";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Susunan acara Green Impact Festival 2026: seminar, panel diskusi, dan malam awarding bersama para pembicara ahli.",
};

export default function AgendaPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="Agenda" />

      <div className="mt-5 flex flex-wrap gap-5 text-sm text-mint-200/60">
        <span className="inline-flex items-center gap-2">
          <Calendar size={16} className="text-mint-400" /> {eventInfo.date}
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin size={16} className="text-mint-400" /> {eventInfo.location}
        </span>
      </div>

      <AgendaList sessions={agendaSessions} />

      <p className="mt-8 text-xs text-mint-200/40">
        Catatan: nama dan foto pembicara di atas masih placeholder untuk sebagian sesi. Lengkapi
        dengan data pembicara asli di file <code>data/agenda.ts</code>.
      </p>
    </section>
  );
}
