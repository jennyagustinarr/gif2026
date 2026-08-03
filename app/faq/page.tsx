import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "./FaqAccordion";
import Reveal from "@/components/Reveal";
import { faqs, contactInfo } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering ditanyakan seputar Green Impact Festival 2026, NECSC, dan Youth Ambassador.",
};

export default function FaqPage() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-12 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-mint-500/10 blur-3xl animate-blob" />
      </div>

      <Reveal>
        <SectionHeading title="FAQ" />
      </Reveal>

      <FaqAccordion items={faqs} />

      <Reveal delay={120} className="mt-10 block">
        <div className="card-hover rounded-2xl border border-lime-300/20 bg-night-900 p-6 hover:border-mint-400/50">
          <p className="font-semibold text-mint-100">Masih ada pertanyaan?</p>
          <p className="mt-2 text-sm text-mint-200/60">
            Hubungi panitia lewat{" "}
            <a href={`mailto:${contactInfo.email}`} className="link-underline text-mint-300">
              {contactInfo.email}
            </a>{" "}
            atau WhatsApp{" "}
            <a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-mint-300"
            >
              {contactInfo.whatsappLabel}
            </a>
            .
          </p>
        </div>
      </Reveal>

      <p className="mt-8 text-xs text-mint-200/40">
        Jawaban di atas masih draf. Sesuaikan dengan jawaban resmi dari tim Green Impact Festival
        sebelum dipublikasikan.
      </p>
    </section>
  );
}
