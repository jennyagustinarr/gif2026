import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Registration",
  description:
    "Pilih jenis pendaftaran Green Impact Festival 2026: Youth Ambassador, NECSC, Campus Roadshow, atau Seminar.",
};

const OPTIONS = [
  {
    href: "/registration/youth-ambassador",
    title: "Youth Ambassador",
    desc: "Jadi representasi anak muda yang menyuarakan isu keberlanjutan lewat konten digital.",
  },
  {
    href: "/registration/necsc",
    title: "NECSC",
    desc: "Kompetisi artikel ilmiah nasional seputar energi, iklim, dan keberlanjutan.",
  },
  {
    href: "/registration/campus-roadshow",
    title: "Campus Roadshow",
    desc: "Ikuti kunjungan GIF 2026 ke kampus dan sekolah: sesi berbagi, info program, dan networking.",
  },
  {
    href: "/registration/seminar",
    title: "Seminar",
    desc: "Daftar untuk menghadiri rangkaian sesi seminar utama Green Impact Festival.",
  },
];

export default function RegistrationHub() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-mint-500/10 blur-3xl animate-blob" />
      </div>

      <Reveal>
        <SectionHeading title="Registration" />
        <p className="mt-4 text-mint-200/70 max-w-2xl">
          Pilih jenis pendaftaran yang sesuai dengan keikutsertaanmu di Green Impact Festival 2026.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {OPTIONS.map((opt, i) => (
          <Reveal key={opt.href} delay={i * 100} direction="zoom" className="h-full">
            <Link
              href={opt.href}
              className="card-hover group relative block h-full overflow-hidden rounded-3xl border border-lime-300/30 bg-night-900 p-7 hover:border-mint-400/60"
            >
              <span className="pointer-events-none absolute -right-16 -bottom-16 h-44 w-44 rounded-full bg-mint-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <p className="font-semibold text-mint-300 text-lg transition-colors group-hover:text-mint-200">
                {opt.title}
              </p>
              <p className="text-sm text-mint-200/60 mt-2">{opt.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-mint-400">
                Register
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
