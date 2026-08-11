import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Blok ajakan mendaftar di akhir setiap halaman penjelasan program.
 * Halaman penjelasan dan formulir sengaja dipisah supaya calon peserta
 * membaca ketentuan lebih dulu sebelum masuk ke form.
 */
export default function RegisterCta({
  href,
  label = "Daftar Sekarang",
  note,
}: {
  href: string;
  label?: string;
  note?: string;
}) {
  return (
    <div className="mt-16 rounded-3xl border border-mint-400/30 bg-gradient-to-br from-mint-500/10 to-lime-300/5 p-8 text-center sm:p-10">
      <p className="text-lg font-semibold text-mint-100">Siap bergabung?</p>
      {note && <p className="mx-auto mt-2 max-w-xl text-sm text-mint-200/60">{note}</p>}

      <Link
        href={href}
        className="btn-shine group mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-9 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_18px_36px_-14px_rgba(61,220,132,0.9)]"
      >
        {label}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
