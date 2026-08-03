"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";

const inputClass =
  "w-full rounded-2xl bg-night-900/60 border border-white/10 px-5 py-4 text-sm text-mint-100 placeholder:text-mint-200/30 focus:outline-none focus:ring-2 focus:ring-mint-400/40";

export default function PartnerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partnershipType, setPartnershipType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          program: "partnership",
          values: { name, email, partnershipType, description },
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
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
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="Become Our Partner" centered />

      <form onSubmit={handleSubmit} className="mt-12 space-y-7">
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
          <label
            htmlFor="partnershipType"
            className="block text-sm font-semibold text-mint-100 mb-3"
          >
            Type of Partnership <span className="text-red-400">*</span>
          </label>
          <select
            id="partnershipType"
            required
            value={partnershipType}
            onChange={(e) => setPartnershipType(e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select partnership type
            </option>
            <option value="sponsorship">Sponsorship</option>
            <option value="community-partner">Community Partner</option>
            <option value="media-partner">Media Partner</option>
            <option value="other">Other</option>
          </select>
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
            Gagal mengirim permohonan. Silakan coba lagi atau email langsung ke
            greenimpactfestival@sre.co.id.
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full border border-white/25 bg-night-900/60 hover:bg-white/5 disabled:opacity-60 disabled:cursor-not-allowed transition-colors px-10 py-3.5 text-sm font-medium text-mint-100"
          >
            {status === "sending" ? "Mengirim..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
