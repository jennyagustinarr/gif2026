import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import RegistrationForm from "@/components/RegistrationForm";
import Reveal from "@/components/Reveal";
import { yaInfo, yaFormFields } from "@/data/youthAmbassador";

export const metadata: Metadata = {
  title: "Formulir Youth Ambassador",
  description: "Formulir pendaftaran Youth Ambassador Green Impact Festival 2026.",
};

export default function YouthAmbassadorFormPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/registration/youth-ambassador"
        className="inline-flex items-center gap-2 text-sm text-mint-200/60 transition-colors hover:text-mint-300"
      >
        <ArrowLeft size={16} /> Kembali ke penjelasan Youth Ambassador
      </Link>

      <Reveal className="mt-6 block">
        <SectionHeading title="Formulir Pendaftaran" />
        <p className="mt-4 text-mint-200/70">{yaInfo.code}</p>
      </Reveal>

      <Reveal delay={120} className="mt-10 block">
        <RegistrationForm
          fields={yaFormFields}
          submitLabel="Daftar Youth Ambassador"
          program="youth-ambassador"
        />
      </Reveal>
    </section>
  );
}
