import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import RegistrationForm from "@/components/RegistrationForm";
import Reveal from "@/components/Reveal";
import { necscInfo, necscFormFields } from "@/data/necsc";

export const metadata: Metadata = {
  title: `Formulir ${necscInfo.code}`,
  description: `Formulir pendaftaran ${necscInfo.fullName}.`,
};

export default function NecscFormPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/registration/necsc"
        className="inline-flex items-center gap-2 text-sm text-mint-200/60 transition-colors hover:text-mint-300"
      >
        <ArrowLeft size={16} /> Kembali ke penjelasan {necscInfo.code}
      </Link>

      <Reveal className="mt-6 block">
        <SectionHeading title="Formulir Pendaftaran" />
        <p className="mt-4 text-mint-200/70">
          {necscInfo.code} — {necscInfo.fullName}
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-10 block">
        <RegistrationForm fields={necscFormFields} submitLabel="Daftar NECSC" program="necsc" />
      </Reveal>
    </section>
  );
}
