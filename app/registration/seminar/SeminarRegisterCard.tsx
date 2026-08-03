"use client";

import { useState } from "react";

export default function SeminarRegisterCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program: "seminar", values: { name, email } }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-6 rounded-2xl bg-white/70 p-5">
        <p className="text-sm font-medium text-brand-dark">
          Pendaftaran berhasil! Sampai jumpa di Green Impact Festival 2026.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl bg-white/70 p-5 space-y-3">
      <p className="text-sm text-neutral-700">
        Selamat datang! Untuk bergabung, silakan daftar di bawah ini.
      </p>

      <input
        required
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama lengkap"
        className="w-full rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand/40"
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email aktif"
        className="w-full rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand/40"
      />

      {status === "error" && (
        <p className="text-sm text-red-600">Gagal mendaftar. Silakan coba lagi.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-brand hover:bg-brand-dark disabled:opacity-60 transition-colors px-6 py-3 text-sm font-semibold text-white"
      >
        {status === "sending" ? "Mengirim..." : "Register"}
      </button>
    </form>
  );
}
