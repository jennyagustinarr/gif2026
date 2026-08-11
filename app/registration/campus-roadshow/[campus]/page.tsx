import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CampusLogo from "@/components/CampusLogo";
import RegisterCta from "@/components/RegisterCta";
import Reveal from "@/components/Reveal";
import { findAgenda, openAgendas, roadshowInfo } from "@/data/campusRoadshow";

export function generateStaticParams() {
  return openAgendas.map((agenda) => ({ campus: agenda.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ campus: string }>;
}): Promise<Metadata> {
  const { campus } = await params;
  const agenda = findAgenda(campus);
  if (!agenda) return { title: "Campus Roadshow" };

  return {
    title: `Campus Roadshow ${agenda.campusShort}`,
    description: agenda.paragraphs[0] ?? `Campus Roadshow GIF 2026 di ${agenda.campus}.`,
  };
}

export default async function CampusRoadshowDetail({
  params,
}: {
  params: Promise<{ campus: string }>;
}) {
  const { campus } = await params;
  const agenda = findAgenda(campus);

  if (!agenda || !agenda.registrationOpen) notFound();

  const eventRows = [
    { icon: "📅", label: "Date", value: agenda.date },
    { icon: "🕒", label: "Time", value: agenda.time },
    { icon: "📍", label: "Venue", value: agenda.venue },
    { icon: "🎟️", label: "Ticket", value: roadshowInfo.price },
  ];

  return (
    <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-16 left-0 h-72 w-72 rounded-full bg-mint-500/10 blur-3xl animate-blob" />
      </div>

      <Link
        href="/registration/campus-roadshow"
        className="inline-flex items-center gap-2 text-sm text-mint-200/60 transition-colors hover:text-mint-300"
      >
        <ArrowLeft size={16} /> Back to All Agendas
      </Link>

      <Reveal className="mt-6 block">
        <SectionHeading title={roadshowInfo.code} />
        <div className="mt-6 flex items-center gap-4">
          <CampusLogo
            logo={agenda.logo}
            campus={agenda.campus}
            campusShort={agenda.campusShort}
            size="lg"
          />
          <p className="text-sm font-medium text-mint-400">{agenda.campus}</p>
        </div>
      </Reveal>

      <Reveal delay={110} className="mt-8 block">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {agenda.title}
        </h2>
        <p className="mt-3 text-mint-300 font-medium">{agenda.subtitle}</p>

        {agenda.paragraphs.length > 0 ? (
          <div className="mt-6 space-y-4 text-mint-200/80 leading-relaxed">
            {agenda.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-2xl border border-dashed border-mint-400/25 bg-mint-400/5 px-5 py-4 text-sm text-mint-200/60">
            Detail tema dan rangkaian acara untuk kampus ini masih disusun panitia. Pendaftaran
            sudah dibuka, dan informasi lengkapnya akan dikirim ke email peserta yang terdaftar.
          </p>
        )}
      </Reveal>

      <Reveal delay={160} direction="zoom" className="mt-8 block">
        <dl className="grid gap-4 rounded-3xl border border-lime-300/25 bg-night-900 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {eventRows.map((row) => (
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
          href={`/registration/campus-roadshow/${agenda.slug}/form`}
          label={roadshowInfo.ctaLabel}
          note={roadshowInfo.formIntro}
        />
      </Reveal>
    </section>
  );
}
