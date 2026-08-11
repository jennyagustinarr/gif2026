import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import RegisterCta from "@/components/RegisterCta";
import Reveal from "@/components/Reveal";
import { yaInfo } from "@/data/youthAmbassador";

export const metadata: Metadata = {
  title: "Youth Ambassador",
  description: yaInfo.intro,
};

export default function YouthAmbassadorRegistration() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-10 -left-16 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl animate-blob" />
      </div>

      <Reveal>
        <SectionHeading title="Youth Ambassador" />
        <p className="mt-4 text-mint-200/70">{yaInfo.theme}</p>
      </Reveal>

      <Reveal delay={110}>
        <p className="mt-4 text-mint-200/70 leading-relaxed">{yaInfo.intro}</p>
        <p className="mt-3 text-mint-200/70 leading-relaxed">{yaInfo.description}</p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {yaInfo.subthemes.map((sub, i) => (
          <Reveal key={sub.title} delay={i * 100} direction="zoom" className="h-full">
            <div className="card-hover h-full rounded-2xl border border-white/10 bg-night-900 p-5 hover:border-mint-400/50">
              <p className="font-semibold text-mint-300 text-sm">{sub.title}</p>
              <p className="text-xs text-mint-200/50 mt-2">{sub.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {yaInfo.mechanism.map((m, i) => (
          <Reveal key={m.stage} delay={i * 110} className="h-full">
            <div className="card-hover h-full rounded-2xl border border-white/10 bg-night-900 p-6 hover:border-mint-400/40">
              <p className="font-semibold text-mint-300 text-sm">{m.stage}</p>
              <p className="text-sm text-mint-200/60 mt-2">{m.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {yaInfo.kpi.map((item, i) => (
          <Reveal key={item.label} delay={i * 90} direction="zoom" className="h-full">
            <div className="card-hover group h-full rounded-2xl border border-mint-400/20 bg-gradient-to-br from-mint-500/10 to-transparent p-5 hover:border-mint-400/60">
              <p className="text-lg font-extrabold text-white transition-transform duration-500 group-hover:scale-110 origin-left">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-mint-200/50">{item.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal direction="left" className="h-full">
          <div className="card-hover h-full rounded-2xl border border-lime-300/20 bg-night-900 p-6 hover:border-mint-400/40">
            <p className="font-semibold text-mint-100 mb-3">Benefit for Ambassadors</p>
            <ul className="space-y-1.5 text-sm text-mint-200/70 list-disc list-inside">
              {yaInfo.benefits.map((b) => (
                <li key={b} className="transition-colors hover:text-mint-200">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal direction="right" delay={110} className="h-full">
          <div className="card-hover h-full rounded-2xl border border-lime-300/20 bg-night-900 p-6 hover:border-mint-400/40">
            <p className="font-semibold text-mint-100 mb-3">Format Video</p>
            <ul className="space-y-1.5 text-sm text-mint-200/70 list-disc list-inside">
              {yaInfo.videoFormat.map((v) => (
                <li key={v} className="transition-colors hover:text-mint-200">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <RegisterCta
          href="/registration/youth-ambassador/form"
          label="Daftar Youth Ambassador"
          note="Pastikan kedua Instagram Reels kamu sudah diunggah sesuai format video di atas, karena link-nya diminta di formulir."
        />
      </Reveal>
    </section>
  );
}
