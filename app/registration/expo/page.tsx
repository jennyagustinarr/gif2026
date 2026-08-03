import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import RegistrationForm, { FormField } from "@/components/RegistrationForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Daftar Expo",
  description:
    "Buka booth di Green Impact Festival 2026 dan perkenalkan produk, layanan, atau komunitasmu.",
};

const expoFormFields: FormField[] = [
  { name: "brandName", label: "Nama Brand / Organisasi", type: "text", required: true },
  { name: "picName", label: "Nama Penanggung Jawab (PIC)", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Nomor Handphone", type: "tel", required: true },
  {
    name: "boothType",
    label: "Jenis Booth",
    type: "select",
    required: true,
    options: [
      "UMKM / Produk Lokal",
      "Komunitas Lingkungan",
      "Perusahaan / Korporasi",
      "Institusi Pendidikan",
      "Lainnya",
    ],
  },
  {
    name: "description",
    label: "Ceritakan produk atau komunitasmu",
    type: "textarea",
    required: true,
    placeholder: "Jelaskan apa yang ingin kamu tampilkan di booth expo...",
  },
];

export default function ExpoRegistration() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-16 right-8 h-64 w-64 rounded-full bg-mint-500/10 blur-3xl animate-blob" />
      </div>

      <Reveal>
        <SectionHeading title="Daftar Expo" />
        <p className="mt-4 text-mint-200/70 max-w-2xl">
          Buka booth di Green Impact Festival 2026 dan perkenalkan produk, layanan, atau komunitasmu
          langsung ke ribuan pengunjung yang peduli isu keberlanjutan.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-10 block">
        <RegistrationForm
          fields={expoFormFields}
          submitLabel="Kirim Pendaftaran Expo"
          program="expo"
        />
      </Reveal>

      <p className="mt-8 text-xs text-mint-200/40">
        Catatan: detail resmi expo (harga booth, ukuran, dan ketentuan) belum tersedia saat kode ini
        dibuat. Lengkapi bagian ini begitu materi expo sudah final.
      </p>
    </section>
  );
}
