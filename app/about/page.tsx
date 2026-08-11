import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ImpactTimeline from "@/components/ImpactTimeline";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Mengenal Green Impact Festival, festival inovasi lingkungan tahunan yang diselenggarakan SRE Indonesia bersama Rakyat Merdeka.",
};

const PILLARS = [
  {
    title: "Seminar & Talkshow",
    desc: "Diskusi lintas sektor bersama praktisi, akademisi, dan pengambil kebijakan seputar energi, iklim, dan ekonomi hijau.",
  },
  {
    title: "NECSC",
    desc: "Kompetisi artikel ilmiah nasional untuk pelajar dan mahasiswa dengan pendekatan systemic thinking.",
  },
  {
    title: "Youth Ambassador",
    desc: "Program duta muda yang menyuarakan isu keberlanjutan lewat konten digital dan aksi nyata.",
  },
  {
    title: "Campus Roadshow",
    desc: "Kunjungan ke kampus dan sekolah untuk mengenalkan isu keberlanjutan sekaligus seluruh program GIF 2026.",
  },
];

const PARAGRAPHS = [
  "Green Impact Festival adalah festival inovasi lingkungan tahunan yang diselenggarakan oleh SRE Indonesia bersama Rakyat Merdeka, mempertemukan pelajar, mahasiswa, praktisi, dan pengambil kebijakan untuk mendorong pembangunan berkelanjutan di Indonesia.",
  "Festival ini menghadirkan rangkaian seminar dengan pembicara ahli, kompetisi artikel ilmiah nasional NECSC, program Youth Ambassador, serta Campus Roadshow yang menjangkau kampus dan sekolah di berbagai daerah.",
  "Green Impact Festival 2026 diselenggarakan secara offline dan terbuka bagi pelajar SMA/sederajat, mahasiswa, hingga masyarakat umum yang peduli terhadap isu energi, iklim, dan keberlanjutan.",
];

export default function AboutPage() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-14 right-0 h-64 w-64 rounded-full bg-mint-500/10 blur-3xl animate-blob" />
        <div
          className="absolute bottom-20 -left-10 h-56 w-56 rounded-full bg-lime-300/10 blur-3xl animate-blob"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <Reveal>
        <SectionHeading title="About Us" />
      </Reveal>

      <div className="mt-8 space-y-5 text-mint-200/80 leading-relaxed">
        {PARAGRAPHS.map((text, i) => (
          <Reveal key={i} delay={i * 110}>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {PILLARS.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 90} direction="zoom" className="h-full">
            <div className="card-hover h-full rounded-2xl border border-lime-300/20 bg-night-900 p-6 hover:border-mint-400/50">
              <p className="font-semibold text-mint-300">{pillar.title}</p>
              <p className="mt-2 text-sm text-mint-200/60">{pillar.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <ImpactTimeline />

      {/* CATATAN: ganti paragraf di atas dengan copy About Us asli dari tim GIF,
          karena teks ini disusun ulang dari ringkasan yang tersedia, bukan teks aslinya. */}
      <p className="mt-10 text-xs text-mint-200/40">
        Catatan: teks di halaman ini masih susunan ulang dari ringkasan yang tersedia. Ganti dengan
        copy About Us resmi dari tim Green Impact Festival sebelum publikasi.
      </p>
    </section>
  );
}
