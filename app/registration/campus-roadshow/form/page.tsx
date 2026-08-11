import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import RegistrationForm from "@/components/RegistrationForm";
import Reveal from "@/components/Reveal";
import RoadshowSuccess from "../RoadshowSuccess";
import { roadshowInfo, roadshowFormFields } from "@/data/campusRoadshow";

export const metadata: Metadata = {
  title: "Formulir Campus Roadshow",
  description: `Formulir pendaftaran Campus Roadshow Green Impact Festival 2026 di ${roadshowInfo.campus}.`,
};

export default function CampusRoadshowFormPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/registration/campus-roadshow"
        className="inline-flex items-center gap-2 text-sm text-mint-200/60 transition-colors hover:text-mint-300"
      >
        <ArrowLeft size={16} /> Kembali ke penjelasan acara
      </Link>

      <Reveal className="mt-6 block">
        <SectionHeading title="Registration Form" />
        <p className="mt-4 text-mint-200/70">
          {roadshowInfo.title} — {roadshowInfo.campus}
        </p>
        <p className="mt-2 text-sm text-mint-200/50">
          Pertanyaan tentang kampus dan jurusan akan muncul otomatis mengikuti status yang kamu
          pilih.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-10 block">
        <RegistrationForm
          fields={roadshowFormFields}
          submitLabel="Submit Registration"
          program="campus-roadshow"
          successContent={<RoadshowSuccess />}
        />
      </Reveal>
    </section>
  );
}
