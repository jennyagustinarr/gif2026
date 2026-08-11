import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CampusLogo from "@/components/CampusLogo";
import RegistrationForm from "@/components/RegistrationForm";
import Reveal from "@/components/Reveal";
import RoadshowSuccess from "../RoadshowSuccess";
import { findAgenda, openAgendas, roadshowFormFields } from "@/data/campusRoadshow";

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
  if (!agenda) return { title: "Campus Roadshow Registration Form" };

  return {
    title: `${agenda.campusShort} Registration Form`,
    description: `Formulir pendaftaran Campus Roadshow Green Impact Festival 2026 di ${agenda.campus}.`,
  };
}

export default async function CampusRoadshowFormPage({
  params,
}: {
  params: Promise<{ campus: string }>;
}) {
  const { campus } = await params;
  const agenda = findAgenda(campus);

  if (!agenda || !agenda.registrationOpen) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href={`/registration/campus-roadshow/${agenda.slug}`}
        className="inline-flex items-center gap-2 text-sm text-mint-200/60 transition-colors hover:text-mint-300"
      >
        <ArrowLeft size={16} /> Back to Event Details
      </Link>

      <Reveal className="mt-6 block">
        <SectionHeading title="Registration Form" />

        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-night-900 p-4">
          <CampusLogo
            logo={agenda.logo}
            campus={agenda.campus}
            campusShort={agenda.campusShort}
            size="md"
          />
          <div className="min-w-0">
            <p className="font-semibold text-mint-100">{agenda.campus}</p>
            <p className="mt-0.5 truncate text-sm text-mint-200/60">{agenda.title}</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-mint-200/50">
          Pertanyaan tentang kampus dan jurusan akan muncul otomatis mengikuti status yang kamu
          pilih.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-10 block">
        <RegistrationForm
          fields={roadshowFormFields}
          submitLabel="Submit Registration"
          program="campus-roadshow"
          extraValues={{ campus: agenda.slug }}
          successContent={<RoadshowSuccess agenda={agenda} />}
        />
      </Reveal>
    </section>
  );
}
