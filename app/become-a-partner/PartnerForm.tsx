"use client";

import { useState } from "react";
import { Check, Coins, Loader2, Megaphone, Puzzle, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PARTNERSHIP_TYPES } from "@/data/partnership";

const inputClass =
  "w-full rounded-2xl bg-night-900/60 border border-white/10 px-5 py-4 text-sm text-mint-100 placeholder:text-mint-200/30 transition-all duration-300 hover:border-mint-400/30 focus:outline-none focus:border-mint-400/50 focus:ring-2 focus:ring-mint-400/40";

const TYPE_ICONS: Record<string, typeof Coins> = {
  sponsorship: Coins,
  "community-partner": Users,
  "media-partner": Megaphone,
  other: Puzzle,
};

export default function PartnerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partnershipType, setPartnershipType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          program: "partnership",
          values: { name, email, partnershipType, description },
        }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error ?? `Gagal mengirim (status ${res.status}).`);

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.");
    }
  }

  if (status === "success") {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <SectionHeading title="Terima kasih!" centered />
        <p className="mt-6 text-mint-200/70">
          Permohonan kemitraanmu sudah kami terima. Tim Green Impact Festival akan menghubungi kamu
          segera.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="Become Our Partner" centered />
      <p className="mx-auto mt-5 max-w-2xl text-center text-mint-200/70">
        Kami membuka empat bentuk kerja sama. Pilih salah satu di bawah untuk melihat detailnya —
        pilihanmu otomatis terisi di formulir.
      </p>

      {/* PILIHAN TIPE KEMITRAAN — kartu interaktif sekaligus input form */}
      <fieldset className="mt-10">
        <legend className="sr-only">Type of Partnership</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          {PARTNERSHIP_TYPES.map((type, i) => {
            const Icon = TYPE_ICONS[type.value] ?? Puzzle;
            const selected = partnershipType === type.value;

            return (
              <label
                key={type.value}
                style={{ animationDelay: `${i * 70}ms` }}
                className={`animate-fade-up group relative block cursor-pointer overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  selected
                    ? "border-mint-400/70 bg-gradient-to-br from-mint-500/15 to-lime-300/5 shadow-[0_20px_40px_-22px_rgba(61,220,132,0.65)]"
                    : "border-white/10 bg-night-900 hover:border-mint-400/40"
                }`}
              >
                <input
                  type="radio"
                  name="partnershipType"
                  value={type.value}
                  required
                  checked={selected}
                  onChange={(e) => setPartnershipType(e.target.value)}
                  className="sr-only"
                />

                <span className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-mint-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 ${
                      selected
                        ? "bg-mint-400/20 text-mint-200"
                        : "bg-night-800 text-mint-300 group-hover:bg-mint-400/15"
                    }`}
                  >
                    <Icon size={20} />
                  </span>

                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      selected
                        ? "border-mint-400 bg-mint-400 text-night-950"
                        : "border-white/20 text-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                </div>

                <p className="mt-4 text-lg font-bold text-white">{type.label}</p>
                <p className="mt-1 text-xs font-medium text-mint-400">{type.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-mint-200/70">{type.description}</p>

                {/* Rincian benefit melebar halus saat kartu dipilih */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    selected ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-1.5 border-t border-white/10 pt-4 text-sm text-mint-200/70">
                      {type.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2">
                          <Check size={14} className="mt-0.5 shrink-0 text-mint-400" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* FORMULIR */}
      <form onSubmit={handleSubmit} className="mt-14 space-y-7">
        <p className="text-lg font-semibold text-mint-100">Formulir Pengajuan</p>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-mint-100 mb-3">
            Name / Brand <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name or organization"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-mint-100 mb-3">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <span className="block text-sm font-semibold text-mint-100 mb-3">
            Type of Partnership <span className="text-red-400">*</span>
          </span>
          <div
            className={`rounded-2xl border px-5 py-4 text-sm transition-colors duration-300 ${
              partnershipType
                ? "border-mint-400/40 bg-mint-400/5 text-mint-100"
                : "border-dashed border-white/15 bg-night-900/60 text-mint-200/40"
            }`}
          >
            {partnershipType
              ? PARTNERSHIP_TYPES.find((t) => t.value === partnershipType)?.label
              : "Belum dipilih — pilih salah satu kartu di atas."}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-mint-100 mb-3">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            id="description"
            required
            rows={5}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about your organization and how you'd like to partner with us..."
            className={inputClass}
          />
          <p className="mt-2 text-right text-xs text-mint-200/50">
            {description.length}/500 characters max.
          </p>
        </div>

        {status === "error" && (
          <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {errorMessage} Kalau masalah berlanjut, email langsung ke
            greenimpactfestival@sre.co.id.
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-shine inline-flex items-center gap-2 rounded-full border border-white/25 bg-night-900/60 px-10 py-3.5 text-sm font-medium text-mint-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint-400/50 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" && <Loader2 size={16} className="animate-spin" />}
            {status === "sending" ? "Mengirim..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
