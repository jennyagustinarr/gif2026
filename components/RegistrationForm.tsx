"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "file" | "radio";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  /** Teks bantuan kecil di bawah input. */
  helpText?: string;
  /** Pola validasi HTML (atribut pattern). */
  pattern?: string;
  /**
   * Tampilkan field ini hanya kalau field lain bernilai salah satu dari
   * `values`. Field yang tersembunyi tidak divalidasi dan tidak ikut dikirim.
   */
  showIf?: { field: string; values: string[] };
}

const inputClass =
  "w-full rounded-2xl bg-night-900 border border-white/10 px-4 py-3 text-sm text-mint-100 placeholder:text-mint-200/30 transition-all duration-300 hover:border-mint-400/30 focus:outline-none focus:border-mint-400/50 focus:ring-2 focus:ring-mint-400/40 focus:shadow-[0_0_0_4px_rgba(110,231,168,0.07)]";

/** Field tampil kalau tidak punya syarat, atau syaratnya terpenuhi. */
function isVisible(field: FormField, values: Record<string, string>): boolean {
  if (!field.showIf) return true;
  return field.showIf.values.includes(values[field.showIf.field] ?? "");
}

export default function RegistrationForm({
  fields,
  submitLabel = "Submit",
  program = "general",
  successContent,
}: {
  fields: FormField[];
  submitLabel?: string;
  /** Dipakai API route untuk membedakan asal pendaftaran (necsc, youth-ambassador, dst). */
  program?: string;
  /** Tampilan pengganti pesan sukses bawaan, mis. instruksi khusus per program. */
  successContent?: React.ReactNode;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const visibleFields = fields.filter((field) => isVisible(field, values));

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    // Hanya kirim field yang sedang tampil, supaya jawaban lama dari cabang
    // pilihan yang sudah ditinggalkan tidak ikut terkirim.
    const payload: Record<string, string> = {};
    for (const field of visibleFields) {
      const value = values[field.name];
      if (value !== undefined && value !== "") payload[field.name] = value;
    }

    try {
      // CATATAN: file baru dikirim sebagai nama file saja. Untuk upload file
      // sungguhan, ganti jadi FormData + storage (Firebase Storage, S3, dsb).
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program, values: payload }),
      });

      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!res.ok) {
        throw new Error(data?.error ?? `Gagal mengirim (status ${res.status}).`);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.");
    }
  }

  if (status === "success") {
    if (successContent) {
      return <div className="animate-fade-up">{successContent}</div>;
    }

    return (
      <div className="animate-fade-up rounded-2xl border border-mint-400/30 bg-gradient-to-br from-mint-500/10 to-transparent p-8 text-center">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-mint-400/15 text-mint-300">
          <Check size={28} className="animate-bounce-subtle" />
        </span>
        <p className="text-mint-300 font-semibold text-lg">Registration Successful!</p>
        <p className="text-mint-200/70 text-sm mt-2">
          Tim kami akan menghubungi kamu lewat email atau WhatsApp yang terdaftar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {visibleFields.map((field, i) => (
        <div
          key={field.name}
          className="animate-fade-up"
          style={{ animationDelay: `${Math.min(i * 45, 400)}ms` }}
        >
          <label htmlFor={field.name} className="block text-sm font-semibold text-mint-200 mb-2">
            {field.label} {field.required && <span className="text-red-400">*</span>}
          </label>

          {field.type === "textarea" && (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              rows={5}
              className={inputClass}
            />
          )}

          {field.type === "select" && (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              value={values[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Select an option
              </option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {field.type === "radio" && (
            <div className="space-y-2">
              {field.options?.map((opt) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-all duration-300 hover:translate-x-1 ${
                    values[field.name] === opt
                      ? "border-mint-400/50 bg-mint-400/10 text-mint-100"
                      : "border-white/10 text-mint-200/80 hover:border-mint-400/30 hover:bg-mint-400/5"
                  }`}
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={opt}
                    required={field.required}
                    checked={values[field.name] === opt}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="h-4 w-4 accent-mint-400"
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}

          {field.type === "file" && (
            <input
              id={field.name}
              name={field.name}
              type="file"
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.files?.[0]?.name ?? "")}
              className="w-full rounded-2xl bg-night-900 border border-white/10 px-4 py-3 text-sm text-mint-200/70 transition-all duration-300 hover:border-mint-400/30 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-mint-400/20 file:px-4 file:py-2 file:text-mint-200 file:transition-colors hover:file:bg-mint-400/35"
            />
          )}

          {["text", "email", "tel"].includes(field.type) && (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              pattern={field.pattern}
              value={values[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={inputClass}
            />
          )}

          {field.helpText && <p className="mt-1.5 text-xs text-mint-200/40">{field.helpText}</p>}
        </div>
      ))}

      {status === "error" && (
        <p className="animate-fade-up rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage} Kalau masalah berlanjut, hubungi panitia lewat WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-shine inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_16px_32px_-14px_rgba(61,220,132,0.9)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending" && <Loader2 size={16} className="animate-spin" />}
        {status === "sending" ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
}
