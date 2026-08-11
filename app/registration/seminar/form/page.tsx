import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import RegistrationForm from "@/components/RegistrationForm";
import Reveal from "@/components/Reveal";
import SeminarSuccess from "../SeminarSuccess";
import { seminarFormFields, seminarEventDetails } from "@/data/seminar";

export const metadata: Metadata = {
  title: "Seminar Registration Form",
  description: "Formulir pendaftaran seminar utama Green Impact Festival 2026.",
};

export default function SeminarFormPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/registration/seminar"
        className="inline-flex items-center gap-2 text-sm text-mint-200/60 transition-colors hover:text-mint-300"
      >
        <ArrowLeft size={16} /> Back to Seminar
      </Link>

      <Reveal className="mt-6 block">
        <SectionHeading title="Registration Form" />
        <p className="mt-4 text-mint-200/70">
          Seminar Green Impact Festival 2026 — {seminarEventDetails.venue}
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-10 block">
        <RegistrationForm
          fields={seminarFormFields}
          submitLabel="Submit Registration"
          program="seminar"
          successContent={<SeminarSuccess />}
        />
      </Reveal>
    </section>
  );
}
