import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import RegisterCta from "@/components/RegisterCta";
import Reveal from "@/components/Reveal";
import { necscInfo } from "@/data/necsc";

export const metadata: Metadata = {
  title: necscInfo.code,
  description: necscInfo.intro,
};

export default function NecscRegistration() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-16 right-0 h-72 w-72 rounded-full bg-mint-500/10 blur-3xl animate-blob" />
      </div>

      <Reveal>
        <SectionHeading title={necscInfo.code} />
        <p className="mt-3 text-sm font-medium text-mint-400">{necscInfo.fullName}</p>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-6 max-w-3xl text-mint-200/80 leading-relaxed">{necscInfo.intro}</p>
        <p className="mt-4 max-w-3xl text-mint-200/80 leading-relaxed">{necscInfo.description}</p>
      </Reveal>

      {/* TIMELINE */}
      <div className="mt-14 overflow-x-auto pb-2">
        <div className="flex items-start min-w-[700px]">
          {necscInfo.timeline.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 110}
              direction="zoom"
              className="flex-1 relative flex flex-col items-center text-center"
            >
              {i !== 0 && (
                <div className="absolute top-2 right-1/2 w-full h-px bg-gradient-to-l from-mint-400/50 to-white/10" />
              )}
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-mint-400/60 animate-pulse-ring" />
                <span className="relative h-4 w-4 rounded-full bg-mint-400 z-10" />
              </span>
              <p className="mt-3 text-sm font-semibold text-mint-100">{item.label}</p>
              <p className="text-xs text-mint-200/50">{item.date}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-mint-200/40">
        Timeline masih dalam format bulan karena data sumber hanya memberi grid mingguan. Ganti
        dengan tanggal presisi di <code>data/necsc.ts</code> begitu sudah fix.
      </p>

      {/* PRIZE + SUBTHEME */}
      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <Reveal direction="left" className="h-full">
          <div className="card-hover group relative h-full overflow-hidden rounded-3xl border border-lime-300/30 bg-night-900 p-8 hover:border-mint-400/50">
            <span className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-lime-300/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            <p className="text-mint-200/70 text-sm">Total Prize</p>
            <p className="text-3xl font-extrabold text-white mt-1 transition-transform duration-500 group-hover:scale-105 origin-left">
              {necscInfo.totalPrize}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-mint-200/70 list-disc list-inside">
              {necscInfo.prizeBreakdown.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal direction="right" delay={120} className="h-full">
          <div className="card-hover h-full rounded-3xl border border-lime-300/30 bg-night-900 p-8 hover:border-mint-400/50">
            <p className="font-semibold text-mint-100 mb-4">Sub-Theme</p>
            <ul className="space-y-3">
              {necscInfo.subthemes.map((sub) => (
                <li
                  key={sub.title}
                  className="rounded-xl px-3 py-2 -mx-3 transition-all duration-300 hover:translate-x-1 hover:bg-mint-400/5"
                >
                  <p className="text-sm font-semibold text-mint-200">{sub.title}</p>
                  <p className="text-xs text-mint-200/50">{sub.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* MEKANISME */}
      <div className="mt-16">
        <Reveal>
          <p className="font-semibold text-mint-100 mb-4">Mekanisme Pelaksanaan</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {necscInfo.mechanism.map((m, i) => (
            <Reveal key={m.stage} delay={i * 120} className="h-full">
              <div className="card-hover h-full rounded-2xl border border-white/10 bg-night-900 p-6 hover:border-mint-400/40">
                <p className="font-semibold text-mint-300 text-sm">{m.stage}</p>
                <p className="text-sm text-mint-200/60 mt-2">{m.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* SYARAT */}
      <Reveal className="mt-16 block">
        <p className="font-semibold text-mint-100 mb-4">Syarat Peserta</p>
        <ul className="space-y-1.5 text-sm text-mint-200/70 list-disc list-inside rounded-2xl border border-lime-300/20 bg-night-900 p-6">
          {necscInfo.requirements.map((r) => (
            <li key={r} className="transition-colors hover:text-mint-200">
              {r}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <RegisterCta
          href="/registration/necsc/form"
          label="Daftar NECSC Sekarang"
          note="Pastikan kamu sudah membaca subtema, mekanisme, dan syarat peserta di atas. Siapkan juga berkas KTM, bukti twibbon, bukti follow, dan abstrak sebelum mengisi formulir."
        />
      </Reveal>
    </section>
  );
}
