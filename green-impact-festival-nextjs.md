# Green Impact Festival 2026 — Kode Next.js

Rebuild dari `greenimpactfest.sre.co.id` berdasarkan screenshot yang kamu kirim, ditambah data NECSC 2026 dan Youth Ambassador 2026 dari file Excel yang kamu upload.

## Cara pakai

1. Buat project baru:
   ```bash
   npx create-next-app@latest green-impact-festival --typescript --tailwind --app --src-dir=false
   ```
   Saat ditanya import alias, pilih default `@/*`.
2. Masuk ke folder project, install tambahan:
   ```bash
   npm install lucide-react
   ```
3. Timpa/tambahkan file-file di bawah ini sesuai path masing-masing.
4. Jalankan:
   ```bash
   npm run dev
   ```

## Struktur folder

```
green-impact-festival/
├── next.config.js
├── tailwind.config.ts
├── data/
│   ├── agenda.ts
│   ├── necsc.ts
│   ├── youthAmbassador.ts
│   └── faq.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SectionIcon.tsx
│   ├── SectionHeading.tsx
│   └── RegistrationForm.tsx
└── app/
    ├── layout.tsx
    ├── globals.css
    ├── page.tsx
    ├── about/page.tsx
    ├── agenda/page.tsx
    ├── necsc/page.tsx
    ├── faq/page.tsx
    ├── become-a-partner/page.tsx
    └── registration/
        ├── page.tsx
        ├── youth-ambassador/page.tsx
        ├── necsc/page.tsx
        ├── expo/page.tsx
        └── seminar/page.tsx
```

## Catatan penting (baca sebelum pakai)

Aku cuma bisa lihat halaman lewat screenshot yang kamu kirim, jadi ada beberapa bagian yang masih **placeholder** dan perlu kamu lengkapi sendiri:

- **Halaman About Us**: teks aslinya belum sempat ke-screenshot, jadi copy di `app/about/page.tsx` itu susunan ulang dari ringkasan yang tersedia, bukan teks asli.
- **Nama & foto pembicara Agenda**: dari 5 screenshot cuma satu nama yang kebaca ("Suroso Isnandar - Direktur Manajemen Proyek dan EBT"), sisanya di `data/agenda.ts` masih placeholder "Speaker 1, 2, dst".
- **Halaman Expo**: belum ada data konsepnya sama sekali (tidak ada di Excel maupun screenshot), jadi aku bikin form generik dulu.
- **Jawaban FAQ**: pertanyaannya kebaca dari screenshot, tapi jawabannya (accordion tertutup) tidak kelihatan, jadi jawaban di `data/faq.ts` masih draf.
- **Tanggal pasti NECSC & Youth Ambassador**: Excel cuma kasih grid minggu (W1-W4) per bulan, bukan tanggal presisi, jadi timeline masih dalam format bulan.
- **Form belum terhubung ke backend** — submit sekarang cuma `console.log` dan tampilkan pesan sukses. Perlu disambungkan ke Google Sheet/Apps Script, Firestore, atau API route kamu sendiri.
- Logo GIF, SRE, dan Rakyat Merdeka aku ambil langsung dari URL Firebase Storage yang sama dengan yang dipakai website aslinya, supaya visualnya konsisten.

Kalau ada bagian yang meleset dari desain aslinya, kirim aja screenshot bagian itu lagi, nanti aku sesuaikan.

---

## `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
```

## `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#050f0a",
          900: "#0a1f13",
          800: "#0f2b1b",
          700: "#163823",
        },
        mint: {
          200: "#c9f7de",
          300: "#a7f3d0",
          400: "#6ee7a8",
          500: "#3ddc84",
        },
        brand: {
          DEFAULT: "#1f9d55",
          dark: "#167a42",
        },
        lime: {
          300: "#d9f99d",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## `data/agenda.ts`

```ts
export interface Speaker {
  name: string;
  role?: string;
}

export interface AgendaSession {
  time: string;
  title: string;
  speakers?: Speaker[];
  highlighted?: boolean;
}

// CATATAN: nama pembicara di bawah ini sebagian besar masih placeholder.
// Cuma satu nama yang kebaca dari screenshot (sesi jam 12:50-14:10).
// Lengkapi dengan data pembicara asli + foto begitu tersedia.
export const agendaSessions: AgendaSession[] = [
  {
    time: "09:00 - 10:20",
    title: "Advancing Economic Productivity and Sustainability Through Technology",
    speakers: [
      { name: "Speaker 1" },
      { name: "Speaker 2" },
      { name: "Speaker 3" },
      { name: "Speaker 4" },
      { name: "Speaker 5" },
    ],
  },
  {
    time: "10:20 - 11:50",
    title: "Leveraging Digital Communication to Accelerate Sustainable Practices",
    speakers: [
      { name: "Speaker 1" },
      { name: "Speaker 2" },
      { name: "Speaker 3" },
      { name: "Speaker 4" },
      { name: "Speaker 5" },
    ],
  },
  {
    time: "11:50 - 12:50",
    title: "Mid-Day Break Time",
  },
  {
    time: "12:50 - 14:10",
    title: "Optimizing Green Investment to Achieve Indonesia's Demographic Bonus",
    highlighted: true,
    speakers: [
      { name: "Speaker 1" },
      { name: "Speaker 2" },
      { name: "Speaker 3" },
      { name: "Speaker 4" },
      { name: "Suroso Isnandar", role: "Direktur Manajemen Proyek dan EBT" },
    ],
  },
  {
    time: "14:10 - 15:40",
    title: "Leading Economic and Energy Transition at Scale by Harnessing Intelligent Tech",
    speakers: [{ name: "Speaker 1" }, { name: "Speaker 2" }, { name: "Speaker 3" }],
  },
  {
    time: "15:40 - 17:30",
    title: "Awarding",
  },
];
```

## `data/necsc.ts`

```ts
import type { FormField } from "@/components/RegistrationForm";

export const necscInfo = {
  code: "NECSC'26",
  fullName: "National Energy, Climate, and Sustainability Competition",
  theme: "Empowering Youth to Build Resilient Futures through Sustainable System",
  intro:
    "NECSC 2026 merupakan kompetisi artikel ilmiah nasional yang diselenggarakan sebagai bagian dari rangkaian Green Impact Festival 2026. Program ini menjadi wadah bagi pelajar dan mahasiswa Indonesia untuk menuangkan gagasan, analisis, serta solusi inovatif terhadap berbagai tantangan keberlanjutan melalui pendekatan systemic thinking.",
  description:
    'Mengusung tema utama "Empowering Youth to Build Resilient Futures through Sustainable System", NECSC 2026 mendorong generasi muda untuk memahami keterkaitan antara energi, pangan, air, serta ekonomi biru dan hijau dalam membangun Indonesia yang tangguh dan berkelanjutan.',
  subthemes: [
    {
      title: "Renewable Energy for Community",
      description: "Akses energi bersih yang adil dan merata bagi masyarakat.",
    },
    {
      title: "Sustainable Agriculture",
      description: "Inovasi sistem pangan lokal yang tangguh terhadap perubahan iklim.",
    },
    {
      title: "Water & Climate Resilience",
      description: "Ketahanan air dalam menghadapi urbanisasi dan perubahan iklim.",
    },
    {
      title: "Circular & Blue Economy",
      description: "Model ekonomi regeneratif berbasis sumber daya alam dan ekonomi sirkular.",
    },
  ],
  mechanism: [
    {
      stage: "Tahap 1 - Seleksi Abstrak",
      description:
        "Peserta mengumpulkan abstrak (200-300 kata) sesuai subtema pilihan. Top 15 per subtema kategori University dan 5 per subtema kategori SMA/K lolos ke tahap berikutnya.",
    },
    {
      stage: "Tahap 2 - Final Stage",
      description:
        "Finalis mengumpulkan artikel ilmiah lengkap (maks. 8.000 karakter) beserta video singkat. Pemenang ditentukan dari kualitas tulisan, kedalaman analisis, dan orisinalitas gagasan, lalu diumumkan pada malam Awarding.",
    },
  ],
  totalPrize: "Rp 52.000.000,00",
  prizeBreakdown: [
    "1st Winner kategori Mahasiswa - Rp 8.000.000,00 / subtema",
    "1st Winner kategori SMA/MA/MK - Rp 5.000.000,00 / subtema",
    "Trofi & sertifikat resmi bertaraf nasional",
    "Peluang jaringan nasional dengan akademisi, praktisi, dan mitra sustainability",
    "Publikasi karya & profil pemenang di kanal resmi SRE Indonesia dan Green Impact Festival",
  ],
  // Excel cuma kasih grid mingguan (W1-W4) per bulan, bukan tanggal pasti.
  // Ganti dengan tanggal presisi begitu sudah fix.
  timeline: [
    { label: "Registration & Open Call", date: "Agustus 2026" },
    { label: "Kurasi Abstrak", date: "September 2026" },
    { label: "Pengumuman Finalis", date: "September 2026" },
    { label: "Pengumpulan Full Paper & Video", date: "Oktober 2026" },
    { label: "Cek Plagiarisme & Kurasi Akhir", date: "Oktober 2026" },
    { label: "Awarding", date: "November 2026" },
  ],
  requirements: [
    "Bersifat individu, terbuka bagi mahasiswa aktif perguruan tinggi terakreditasi (dibuktikan KTM/surat keterangan aktif).",
    "Terbuka juga bagi siswa aktif SMA/MA sederajat (dibuktikan kartu pelajar/surat keterangan aktif sekolah).",
    "Wajib memilih satu subtema dari pilihan yang tersedia.",
    "Karya harus orisinal, belum pernah diikutsertakan di kompetisi lain.",
    "Setiap peserta hanya boleh mengirimkan satu artikel ilmiah.",
    "Wajib follow @sreindonesia dan @greenimpactfestival, serta membagikan Twibbon dan poster NECSC 2026.",
  ],
};

export const necscFormFields: FormField[] = [
  { name: "fullName", label: "Nama Lengkap", type: "text", required: true },
  { name: "institution", label: "Asal Sekolah / Universitas", type: "text", required: true },
  { name: "phone", label: "Nomor Handphone", type: "tel", required: true },
  { name: "ktmFile", label: "Upload KTM / KTP", type: "file", required: true },
  { name: "twibbonProof", label: "Bukti Upload Twibbon", type: "file", required: true },
  {
    name: "followProof",
    label: "Bukti Follow @greenimpactfestival & @sreindonesia",
    type: "file",
    required: true,
  },
  { name: "abstractFile", label: "Upload Abstrak", type: "file", required: true },
  {
    name: "source",
    label: "Where did you know NECSC and GIF 2026?",
    type: "radio",
    required: true,
    options: [
      "Social Media GIF and SRE",
      "Friends or family",
      "Campus Roadshow GIF 2026",
      "Media Partner of GIF",
      "Other",
    ],
  },
];
```

## `data/youthAmbassador.ts`

```ts
import type { FormField } from "@/components/RegistrationForm";

export const yaInfo = {
  code: "Youth Ambassador'26",
  theme: "Youth Driving Indonesia's Green Future: Live Green - Lead Change - Power the Future",
  intro:
    "Youth Ambassador Green Impact Festival (GIF) 2026 merupakan program pengembangan generasi muda yang bertujuan menciptakan agen perubahan (change makers) yang mampu menyuarakan isu keberlanjutan melalui media digital dan aksi nyata.",
  description:
    "Program ini mendorong anak muda untuk memahami isu keberlanjutan secara sistemik, memproduksi konten edukatif yang berdampak, serta menggerakkan masyarakat menuju gaya hidup yang lebih berkelanjutan.",
  subthemes: [
    {
      title: "Lifestyle",
      description: "Mendorong perubahan perilaku sehari-hari menuju gaya hidup berkelanjutan.",
    },
    {
      title: "Community",
      description:
        "Mengangkat aksi kolektif dan dampak positif komunitas dalam menciptakan perubahan lingkungan.",
    },
    {
      title: "Green Career",
      description:
        "Menginspirasi generasi muda mengenal serta berkarier di sektor pendukung pembangunan berkelanjutan. Khusus anggota aktif SC SRE.",
    },
  ],
  mechanism: [
    {
      stage: "Tahap 1 - Open Call & Submission Reels",
      description:
        "Peserta kategori Umum memilih subtema Lifestyle atau Community dan mengunggah 2 Instagram Reels sesuai timeline. Peserta kategori Green Career (khusus anggota SC SRE) mengunggah 2 reels bertema Green Career.",
    },
    {
      stage: "Tahap 2 - Seleksi & Penetapan Ambassador",
      description:
        "Karya dinilai dari kualitas konten, kreativitas, storytelling, kesesuaian tema, call to action, dan engagement digital. Terpilih 8 Youth Ambassador: 3 Lifestyle, 3 Community, 2 Green Career.",
    },
  ],
  benefits: [
    "Akses VIP eksklusif ke rangkaian acara Green Impact Festival",
    "Tunjangan perjalanan & akomodasi",
    "Hadiah menarik dan fresh money",
    "Peluang networking lintas kampus dan mitra program",
    "Publikasi profil di kanal resmi Green Impact Festival",
    "Gelar Best Ambassador GIF 2026 untuk kategori terbaik",
  ],
  kpi: [
    { label: "Total Submission", value: "600 Reels" },
    { label: "Total Digital Reach", value: "> 300.000 audience" },
    { label: "Youth Ambassador Terpilih", value: "8 Ambassador" },
    { label: "Best Ambassador", value: "2 Orang" },
  ],
  videoFormat: [
    "Media: Instagram Reels, rasio 9:16 (potrait)",
    "Durasi maksimal 3 menit",
    "Caption menjelaskan konteks video dan pesan yang ingin disampaikan",
    "Wajib mencantumkan tagar #BeyondEnergy #YouthAmbassadorGIF #GreenImpactFestival2026",
    "Tag akun Instagram @greenimpactfestival dan @sreindonesia",
  ],
};

export const yaFormFields: FormField[] = [
  { name: "fullName", label: "Nama Lengkap", type: "text", required: true },
  {
    name: "institution",
    label: "Asal Sekolah / Universitas / Instansi",
    type: "text",
    required: true,
  },
  { name: "phone", label: "Nomor Handphone", type: "tel", required: true },
  { name: "twibbonProof", label: "Bukti Upload Twibbon", type: "file", required: true },
  {
    name: "followProof",
    label: "Bukti Follow @greenimpactfestival & @sreindonesia",
    type: "file",
    required: true,
  },
  { name: "reels1", label: "Upload Link Reels 1", type: "text", required: true },
  { name: "reels2", label: "Upload Link Reels 2", type: "text", required: true },
  {
    name: "source",
    label: "Where did you know Youth Ambassador and GIF 2026?",
    type: "radio",
    required: true,
    options: [
      "Social Media GIF and SRE",
      "Friends or family",
      "Campus Roadshow GIF 2026",
      "Media Partner of GIF",
      "Other",
    ],
  },
];
```

## `data/faq.ts`

```ts
// CATATAN: pertanyaan diambil dari screenshot, tapi jawabannya (accordion
// tertutup) tidak kelihatan di screenshot. Jawaban di bawah masih draf,
// ganti dengan jawaban resmi dari tim GIF.
export const faqs = [
  {
    question: "Apa itu Green Impact Festival?",
    answer:
      "Green Impact Festival adalah festival inovasi lingkungan tahunan yang diselenggarakan SRE Indonesia untuk mendorong pembangunan berkelanjutan lewat kompetisi, program duta muda, dan forum diskusi bersama para pemimpin industri.",
  },
  {
    question: "How to join NECSC 2026 or Youth Ambassador Reels Challenge?",
    answer:
      "Kamu bisa mendaftar lewat halaman Registration, lalu pilih NECSC atau Youth Ambassador sesuai program yang ingin diikuti. Lengkapi seluruh persyaratan yang tertera di formulir pendaftaran.",
  },
  {
    question: "Will this event be streamed online?",
    answer:
      "Green Impact Festival 2026 diselenggarakan secara offline. Dokumentasi dan highlight acara akan dibagikan lewat akun Instagram resmi @greenimpactfestival.",
  },
  {
    question: "I have special needs, who can I contact?",
    answer:
      "Silakan hubungi panitia lewat email greenimpactfestival@sre.co.id atau WhatsApp ke +62 813-1756-8734 supaya kami bisa membantu kebutuhan khususmu selama acara berlangsung.",
  },
];
```

---

## `components/SectionIcon.tsx`

```tsx
export default function SectionIcon({ className = "h-7 w-7 text-mint-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c1 5 6 10 11 11-5 1-10 6-11 11-1-5-6-10-11-11C6 10 11 5 12 0Z" />
    </svg>
  );
}
```

## `components/SectionHeading.tsx`

```tsx
import SectionIcon from "./SectionIcon";

export default function SectionHeading({ title }: { title: string }) {
  return (
    <h1 className="flex items-center gap-3 text-3xl sm:text-4xl font-extrabold text-mint-300">
      <SectionIcon />
      {title}
    </h1>
  );
}
```

## `components/RegistrationForm.tsx`

```tsx
"use client";

import { useState } from "react";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "file" | "radio";
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export default function RegistrationForm({
  fields,
  submitLabel = "Submit",
}: {
  fields: FormField[];
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: kirim `values` ke backend (Google Apps Script, Firestore, atau API route sendiri)
    console.log("Registration submitted:", values);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-mint-400/30 bg-night-900 p-8 text-center">
        <p className="text-mint-300 font-semibold text-lg">Terima kasih sudah mendaftar!</p>
        <p className="text-mint-200/70 text-sm mt-2">
          Tim kami akan menghubungi kamu lewat email atau WhatsApp yang terdaftar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-semibold text-mint-200 mb-2">
            {field.label} {field.required && <span className="text-red-400">*</span>}
          </label>

          {field.type === "textarea" && (
            <textarea
              required={field.required}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, e.target.value)}
              rows={5}
              className="w-full rounded-2xl bg-night-900 border border-white/10 px-4 py-3 text-sm text-mint-100 placeholder:text-mint-200/30 focus:outline-none focus:ring-2 focus:ring-mint-400/40"
            />
          )}

          {field.type === "select" && (
            <select
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
              defaultValue=""
              className="w-full rounded-2xl bg-night-900 border border-white/10 px-4 py-3 text-sm text-mint-100 focus:outline-none focus:ring-2 focus:ring-mint-400/40"
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
                <label key={opt} className="flex items-center gap-3 text-sm text-mint-200/80">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt}
                    required={field.required}
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
              type="file"
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.files?.[0]?.name ?? "")}
              className="w-full rounded-2xl bg-night-900 border border-white/10 px-4 py-3 text-sm text-mint-200/70 file:mr-4 file:rounded-full file:border-0 file:bg-mint-400/20 file:px-4 file:py-2 file:text-mint-200"
            />
          )}

          {["text", "email", "tel"].includes(field.type) && (
            <input
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full rounded-2xl bg-night-900 border border-white/10 px-4 py-3 text-sm text-mint-100 placeholder:text-mint-200/30 focus:outline-none focus:ring-2 focus:ring-mint-400/40"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="rounded-full bg-brand hover:bg-brand-dark transition-colors px-8 py-3 text-sm font-semibold text-white"
      >
        {submitLabel}
      </button>
    </form>
  );
}
```

## `components/Navbar.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/agenda", label: "Agenda" },
];

const REGISTRATION_LINKS = [
  { href: "/registration", label: "Semua Pendaftaran" },
  { href: "/registration/youth-ambassador", label: "Youth Ambassador" },
  { href: "/registration/necsc", label: "NECSC" },
  { href: "/registration/expo", label: "Expo" },
  { href: "/registration/seminar", label: "Seminar" },
];

const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/sre-website-a43e8.appspot.com/o/greenimpact-festival-2025%2Fimages%2Fgreenimpactfest-logo.png?alt=media&token=ebdc6d50-9033-4bd4-901e-5a60ad9cc5de";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-night-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img src={LOGO_URL} alt="Green Impact Festival Logo" className="h-10 w-10 rounded-full object-cover" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-night-900/60 px-2 py-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-2 rounded-full text-sm font-medium text-mint-200/90 hover:bg-mint-400/10 hover:text-mint-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setRegOpen(true)}
            onMouseLeave={() => setRegOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-5 py-2 rounded-full text-sm font-medium text-mint-200/90 hover:bg-mint-400/10 hover:text-mint-300 transition-colors"
              onClick={() => setRegOpen((v) => !v)}
            >
              Registration
              <ChevronDown size={16} className={`transition-transform ${regOpen ? "rotate-180" : ""}`} />
            </button>

            {regOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-white/10 bg-night-900 p-2 shadow-xl">
                {REGISTRATION_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm text-mint-200/90 hover:bg-mint-400/10 hover:text-mint-300"
                    onClick={() => setRegOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/necsc"
            className="px-5 py-2 rounded-full text-sm font-medium text-mint-200/90 hover:bg-mint-400/10 hover:text-mint-300 transition-colors"
          >
            NECSC&apos;26
          </Link>
          <Link
            href="/faq"
            className="px-5 py-2 rounded-full text-sm font-medium text-mint-200/90 hover:bg-mint-400/10 hover:text-mint-300 transition-colors"
          >
            FAQ
          </Link>
        </nav>

        <Link
          href="/become-a-partner"
          className="hidden lg:inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-mint-100 hover:bg-white/5 transition-colors"
        >
          Partner Inquiries
        </Link>

        {/* Mobile toggle */}
        <button className="lg:hidden text-mint-200" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-night-950 px-4 pb-6 pt-2 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl px-4 py-3 text-sm text-mint-200/90 hover:bg-mint-400/10"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="px-4 pt-2 pb-1 text-xs uppercase tracking-wide text-mint-200/50">Registration</div>
          {REGISTRATION_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl px-4 py-3 text-sm text-mint-200/90 hover:bg-mint-400/10"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/necsc"
            className="block rounded-xl px-4 py-3 text-sm text-mint-200/90 hover:bg-mint-400/10"
            onClick={() => setMobileOpen(false)}
          >
            NECSC&apos;26
          </Link>
          <Link
            href="/faq"
            className="block rounded-xl px-4 py-3 text-sm text-mint-200/90 hover:bg-mint-400/10"
            onClick={() => setMobileOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/become-a-partner"
            className="block rounded-xl px-4 py-3 mt-2 text-center text-sm font-medium border border-white/20 text-mint-100"
            onClick={() => setMobileOpen(false)}
          >
            Partner Inquiries
          </Link>
        </div>
      )}
    </header>
  );
}
```

## `components/Footer.tsx`

```tsx
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/sre-website-a43e8.appspot.com/o/greenimpact-festival-2025%2Fimages%2Fgreenimpactfest-logo.png?alt=media&token=ebdc6d50-9033-4bd4-901e-5a60ad9cc5de";
const SRE_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/sre-website-a43e8.appspot.com/o/greenimpact-festival-2025%2Fimages%2Fsre-logo.png?alt=media&token=b26761f1-ed7e-4e8d-ab6d-c2d20787c91f";
const RM_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/sre-website-a43e8.appspot.com/o/greenimpact-festival-2025%2Fimages%2Frakyat-merdeka.png?alt=media&token=4affe73a-72ad-4976-a0cc-f25553d17bf5";

const NAV_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/agenda", label: "Agenda" },
  { href: "/necsc", label: "NECSC'26" },
  { href: "/registration", label: "Registration" },
  { href: "/faq", label: "FAQ" },
  { href: "/become-a-partner", label: "Become a Partner" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-950 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 lg:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Green Impact Festival" className="h-10 w-10 rounded-full object-cover" />
            <p className="font-bold text-lg text-white">Green Impact Festival 2026</p>
          </div>
          <a
            href="https://instagram.com/greenimpactfestival"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-mint-300 hover:text-mint-200 text-sm"
          >
            <Instagram size={16} /> @greenimpactfestival
          </a>
          <a
            href="mailto:greenimpactfestival@sre.co.id"
            className="flex items-center gap-2 text-mint-200/70 hover:text-mint-200 text-sm"
          >
            <Mail size={16} /> greenimpactfestival@sre.co.id
          </a>
          <a
            href="https://wa.me/6281317568734"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-mint-200/70 hover:text-mint-200 text-sm"
          >
            <Phone size={16} /> +62 813-1756-8734 (Alya Selyn)
          </a>
        </div>

        <div className="text-center">
          <p className="font-semibold text-mint-200 mb-4">Navigation</p>
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-mint-200/70 hover:text-mint-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center lg:text-right">
          <p className="font-semibold text-mint-200 mb-4">Organized By</p>
          <div className="flex items-center justify-center lg:justify-end gap-6">
            <img src={SRE_LOGO_URL} alt="SRE Indonesia" className="h-8 object-contain" />
            <img src={RM_LOGO_URL} alt="Rakyat Merdeka" className="h-8 object-contain" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-mint-200/50">
        © {new Date().getFullYear()} Green Impact Festival. All rights reserved.
      </div>
    </footer>
  );
}
```

---

## `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #050f0a;
  color: #eafaf1;
}

::selection {
  background-color: #3ddc84;
  color: #050f0a;
}
```

## `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Green Impact Festival 2026",
  description:
    "Green Impact Festival 2026 - festival inovasi lingkungan terbesar di Indonesia. Jelajahi pembangunan berkelanjutan bersama para pembicara ahli.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="font-sans bg-night-950 text-mint-200/90 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## `app/page.tsx`

```tsx
import Link from "next/link";
import SectionIcon from "@/components/SectionIcon";

const QUICK_LINKS = [
  { href: "/about", label: "About Us", desc: "Kenali lebih dekat Green Impact Festival" },
  { href: "/agenda", label: "Agenda", desc: "Lihat susunan acara lengkap" },
  { href: "/registration", label: "Registration", desc: "Daftar sebagai peserta atau ambassador" },
  { href: "/necsc", label: "NECSC'26", desc: "Kompetisi artikel ilmiah nasional" },
  { href: "/faq", label: "FAQ", desc: "Pertanyaan yang sering ditanyakan" },
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-mint-400/30 px-4 py-1.5 text-xs font-medium text-mint-300 mb-6">
          <SectionIcon className="h-4 w-4" /> Beyond Sustainability
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
          Green Impact <span className="text-mint-400">Festival</span> 2026
        </h1>
        <p className="mt-6 text-mint-200/70 max-w-2xl mx-auto text-base sm:text-lg">
          Bergabunglah dengan festival inovasi lingkungan terbesar di Indonesia. Jelajahi pembangunan
          berkelanjutan di era disrupsi AI bersama para pembicara ahli dan sesi interaktif.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/registration"
            className="rounded-full bg-brand hover:bg-brand-dark transition-colors px-8 py-3 text-sm font-semibold text-white"
          >
            Daftar Sekarang
          </Link>
          <Link
            href="/agenda"
            className="rounded-full border border-white/20 hover:bg-white/5 transition-colors px-8 py-3 text-sm font-semibold text-mint-100"
          >
            Lihat Agenda
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-3xl border border-lime-300/20 bg-night-900 p-6 hover:border-mint-400/50 transition-colors"
          >
            <p className="font-semibold text-mint-300">{item.label}</p>
            <p className="text-sm text-mint-200/60 mt-2">{item.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
```

## `app/about/page.tsx`

```tsx
import SectionHeading from "@/components/SectionHeading";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="About Us" />

      <div className="mt-8 space-y-5 text-mint-200/80 leading-relaxed">
        <p>
          Green Impact Festival adalah festival inovasi lingkungan tahunan yang diselenggarakan oleh SRE
          Indonesia bersama Rakyat Merdeka, mempertemukan pelajar, mahasiswa, praktisi, dan pengambil
          kebijakan untuk mendorong pembangunan berkelanjutan di Indonesia.
        </p>
        <p>
          Festival ini menghadirkan rangkaian seminar dengan pembicara ahli, kompetisi artikel ilmiah
          nasional NECSC, program Youth Ambassador, serta ruang expo bagi mitra dan komunitas yang bergerak
          di bidang keberlanjutan.
        </p>
        <p>
          Green Impact Festival 2026 diselenggarakan secara offline dan terbuka bagi pelajar SMA/sederajat,
          mahasiswa, hingga masyarakat umum yang peduli terhadap isu energi, iklim, dan keberlanjutan.
        </p>
      </div>

      {/* CATATAN: ganti paragraf di atas dengan copy About Us asli dari tim GIF,
          karena teks ini disusun ulang dari ringkasan yang tersedia, bukan teks aslinya. */}
    </section>
  );
}
```

## `app/agenda/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { agendaSessions } from "@/data/agenda";

export default function AgendaPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="Agenda" />

      <div className="mt-10 space-y-4">
        {agendaSessions.map((session, i) => (
          <div
            key={i}
            className={`rounded-2xl border px-6 py-5 transition-colors ${
              session.highlighted
                ? "border-mint-400/60 bg-gradient-to-r from-mint-500/20 to-lime-300/10"
                : "border-lime-300/30 bg-night-900"
            }`}
          >
            <button
              className="w-full flex items-center justify-between gap-4 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="text-sm font-medium text-mint-300 shrink-0">{session.time}</span>
                <span className="font-semibold text-mint-100">{session.title}</span>
              </div>

              {session.speakers && (
                <div className="flex items-center gap-2 shrink-0">
                  <div className="hidden sm:flex -space-x-2">
                    {session.speakers.slice(0, 5).map((sp, idx) => (
                      <div
                        key={idx}
                        title={sp.name}
                        className="h-9 w-9 rounded-full bg-night-800 border-2 border-night-950 flex items-center justify-center text-[10px] font-semibold text-mint-300"
                      >
                        {sp.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    ))}
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-mint-300 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </div>
              )}
            </button>

            {openIndex === i && session.speakers && (
              <div className="mt-4 grid gap-2 sm:grid-cols-2 border-t border-white/10 pt-4">
                {session.speakers.map((sp, idx) => (
                  <div key={idx} className="text-sm text-mint-200/70">
                    <span className="font-medium text-mint-100">{sp.name}</span>
                    {sp.role && <span> - {sp.role}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-mint-200/40">
        Catatan: nama dan foto pembicara di atas masih placeholder untuk sebagian sesi. Lengkapi dengan
        data pembicara asli di file <code>data/agenda.ts</code>.
      </p>
    </section>
  );
}
```

## `app/necsc/page.tsx`

```tsx
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { necscInfo } from "@/data/necsc";

export default function NecscPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title={necscInfo.code} />

      <p className="mt-6 max-w-3xl text-mint-200/80 leading-relaxed">{necscInfo.intro}</p>
      <p className="mt-4 max-w-3xl text-mint-200/80 leading-relaxed">{necscInfo.description}</p>

      <div className="mt-14 overflow-x-auto">
        <div className="flex items-center min-w-[700px]">
          {necscInfo.timeline.map((item, i) => (
            <div key={item.label} className="flex-1 flex flex-col items-center text-center relative">
              {i !== 0 && <div className="absolute top-2 right-1/2 w-full h-px bg-white/20" />}
              <div className="h-4 w-4 rounded-full bg-mint-400 z-10" />
              <p className="mt-3 text-sm font-semibold text-mint-100">{item.label}</p>
              <p className="text-xs text-mint-200/50">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-lime-300/30 bg-night-900 p-8">
          <p className="text-mint-200/70 text-sm">Total Prize</p>
          <p className="text-3xl font-extrabold text-white mt-1">{necscInfo.totalPrize}</p>
          <ul className="mt-6 space-y-2 text-sm text-mint-200/70 list-disc list-inside">
            {necscInfo.prizeBreakdown.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-lime-300/30 bg-night-900 p-8">
          <p className="font-semibold text-mint-100 mb-4">Sub-Theme</p>
          <ul className="space-y-3">
            {necscInfo.subthemes.map((sub) => (
              <li key={sub.title}>
                <p className="text-sm font-semibold text-mint-200">{sub.title}</p>
                <p className="text-xs text-mint-200/50">{sub.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <p className="font-semibold text-mint-100 mb-4">Mekanisme Pelaksanaan</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {necscInfo.mechanism.map((m) => (
            <div key={m.stage} className="rounded-2xl border border-white/10 bg-night-900 p-6">
              <p className="font-semibold text-mint-300 text-sm">{m.stage}</p>
              <p className="text-sm text-mint-200/60 mt-2">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/registration/necsc"
          className="inline-flex rounded-full bg-brand hover:bg-brand-dark transition-colors px-8 py-3 text-sm font-semibold text-white"
        >
          Daftar NECSC Sekarang
        </Link>
      </div>
    </section>
  );
}
```

## `app/faq/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { faqs } from "@/data/faq";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="FAQ" />

      <div className="mt-10 space-y-3">
        {faqs.map((item, i) => (
          <div key={item.question} className="rounded-2xl bg-neutral-800/60 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left"
            >
              <ChevronRight
                size={16}
                className={`shrink-0 text-mint-300 transition-transform ${openIndex === i ? "rotate-90" : ""}`}
              />
              <span className="font-medium text-mint-100 text-sm sm:text-base">{item.question}</span>
            </button>
            {openIndex === i && <p className="px-5 pb-4 pl-11 text-sm text-mint-200/60">{item.answer}</p>}
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-mint-200/40">
        Jawaban di atas masih draf. Sesuaikan dengan jawaban resmi dari tim Green Impact Festival sebelum
        dipublikasikan.
      </p>
    </section>
  );
}
```

## `app/become-a-partner/page.tsx`

```tsx
"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";

export default function BecomeAPartnerPage() {
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: kirim data form ke backend / Google Sheet / email panitia
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <SectionHeading title="Terima kasih!" />
        <p className="mt-4 text-mint-200/70">
          Permohonan kemitraanmu sudah kami terima. Tim Green Impact Festival akan menghubungi kamu segera.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="Become Our Partner" />

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        <div>
          <label className="block text-sm font-semibold text-mint-200 mb-2">
            Name / Brand <span className="text-red-400">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="Your name or organization"
            className="w-full rounded-2xl bg-night-900 border border-white/10 px-4 py-3 text-sm text-mint-100 placeholder:text-mint-200/30 focus:outline-none focus:ring-2 focus:ring-mint-400/40"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-mint-200 mb-2">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            required
            type="email"
            placeholder="your.email@example.com"
            className="w-full rounded-2xl bg-night-900 border border-white/10 px-4 py-3 text-sm text-mint-100 placeholder:text-mint-200/30 focus:outline-none focus:ring-2 focus:ring-mint-400/40"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-mint-200 mb-2">
            Type of Partnership <span className="text-red-400">*</span>
          </label>
          <select
            required
            defaultValue=""
            className="w-full rounded-2xl bg-night-900 border border-white/10 px-4 py-3 text-sm text-mint-100 focus:outline-none focus:ring-2 focus:ring-mint-400/40"
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
          <label className="block text-sm font-semibold text-mint-200 mb-2">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            required
            rows={5}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about your organization and how you'd like to partner with us..."
            className="w-full rounded-2xl bg-night-900 border border-white/10 px-4 py-3 text-sm text-mint-100 placeholder:text-mint-200/30 focus:outline-none focus:ring-2 focus:ring-mint-400/40"
          />
          <p className="mt-1 text-right text-xs text-mint-200/40">{description.length}/500 characters max.</p>
        </div>

        <button
          type="submit"
          className="rounded-full bg-brand hover:bg-brand-dark transition-colors px-8 py-3 text-sm font-semibold text-white"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
```

---

## `app/registration/page.tsx`

```tsx
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

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
    href: "/registration/expo",
    title: "Expo",
    desc: "Buka booth dan perkenalkan produk atau komunitasmu di Green Impact Festival.",
  },
  {
    href: "/registration/seminar",
    title: "Seminar",
    desc: "Daftar untuk menghadiri rangkaian sesi seminar utama Green Impact Festival.",
  },
];

export default function RegistrationHub() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="Registration" />
      <p className="mt-4 text-mint-200/70 max-w-2xl">
        Pilih jenis pendaftaran yang sesuai dengan keikutsertaanmu di Green Impact Festival 2026.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {OPTIONS.map((opt) => (
          <Link
            key={opt.href}
            href={opt.href}
            className="rounded-3xl border border-lime-300/30 bg-night-900 p-7 hover:border-mint-400/60 transition-colors"
          >
            <p className="font-semibold text-mint-300 text-lg">{opt.title}</p>
            <p className="text-sm text-mint-200/60 mt-2">{opt.desc}</p>
            <span className="inline-block mt-4 text-sm font-medium text-mint-400">Daftar &rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

## `app/registration/youth-ambassador/page.tsx`

```tsx
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import RegistrationForm from "@/components/RegistrationForm";
import { yaInfo, yaFormFields } from "@/data/youthAmbassador";

export default function YouthAmbassadorRegistration() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="Youth Ambassador" />
      <p className="mt-4 text-mint-200/70">{yaInfo.theme}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {yaInfo.subthemes.map((sub) => (
          <div key={sub.title} className="rounded-2xl border border-white/10 bg-night-900 p-5">
            <p className="font-semibold text-mint-300 text-sm">{sub.title}</p>
            <p className="text-xs text-mint-200/50 mt-2">{sub.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-lime-300/20 bg-night-900 p-6">
        <p className="font-semibold text-mint-100 mb-3">Benefit for Ambassadors</p>
        <ul className="space-y-1.5 text-sm text-mint-200/70 list-disc list-inside">
          {yaInfo.benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="mt-14">
        <p className="font-semibold text-mint-100 mb-6">Formulir Pendaftaran</p>
        <RegistrationForm fields={yaFormFields} submitLabel="Daftar Youth Ambassador" />
      </div>

      <p className="mt-10 text-xs text-mint-200/40">
        Lihat detail lengkap format video dan kriteria penilaian di{" "}
        <Link href="/registration" className="underline">
          halaman Registration
        </Link>
        .
      </p>
    </section>
  );
}
```

## `app/registration/necsc/page.tsx`

```tsx
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import RegistrationForm from "@/components/RegistrationForm";
import { necscInfo, necscFormFields } from "@/data/necsc";

export default function NecscRegistration() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="Daftar NECSC'26" />
      <p className="mt-4 text-mint-200/70">
        Sebelum mendaftar, pastikan kamu sudah membaca ketentuan lengkap di{" "}
        <Link href="/necsc" className="underline text-mint-300">
          halaman NECSC&apos;26
        </Link>
        .
      </p>

      <div className="mt-10 rounded-2xl border border-lime-300/20 bg-night-900 p-6">
        <p className="font-semibold text-mint-100 mb-3">Syarat Peserta</p>
        <ul className="space-y-1.5 text-sm text-mint-200/70 list-disc list-inside">
          {necscInfo.requirements.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="mt-14">
        <p className="font-semibold text-mint-100 mb-6">Formulir Pendaftaran</p>
        <RegistrationForm fields={necscFormFields} submitLabel="Daftar NECSC" />
      </div>
    </section>
  );
}
```

## `app/registration/expo/page.tsx`

```tsx
import SectionHeading from "@/components/SectionHeading";
import RegistrationForm, { FormField } from "@/components/RegistrationForm";

const expoFormFields: FormField[] = [
  { name: "brandName", label: "Nama Brand / Organisasi", type: "text", required: true },
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
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="Daftar Expo" />
      <p className="mt-4 text-mint-200/70 max-w-2xl">
        Buka booth di Green Impact Festival 2026 dan perkenalkan produk, layanan, atau komunitasmu langsung
        ke ribuan pengunjung yang peduli isu keberlanjutan.
      </p>

      <div className="mt-10">
        <RegistrationForm fields={expoFormFields} submitLabel="Kirim Pendaftaran Expo" />
      </div>

      <p className="mt-8 text-xs text-mint-200/40">
        Catatan: detail resmi expo (harga booth, ukuran, dan ketentuan) belum tersedia saat kode ini
        dibuat. Lengkapi bagian ini begitu materi expo sudah final.
      </p>
    </section>
  );
}
```

## `app/registration/seminar/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { agendaSessions } from "@/data/agenda";

const POSTER_URL =
  "https://firebasestorage.googleapis.com/v0/b/sre-website-a43e8.appspot.com/o/greenimpact-festival-2025%2Fimages%2Fgreenimpactfest-logo.png?alt=media&token=ebdc6d50-9033-4bd4-901e-5a60ad9cc5de";

export default function SeminarRegistration() {
  const [registered, setRegistered] = useState(false);

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="Daftar Seminar" />

      <div className="mt-10 rounded-3xl bg-gradient-to-br from-lime-100 via-emerald-50 to-lime-200 p-6 sm:p-8 grid gap-8 lg:grid-cols-[280px_1fr] text-neutral-900">
        <div className="rounded-2xl bg-night-950 aspect-square flex items-center justify-center overflow-hidden">
          <img src={POSTER_URL} alt="Green Impact Festival 2026" className="h-24 w-24 object-contain" />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold">Green Impact Festival 2026</h2>
          <p className="text-sm text-neutral-600 mt-1">SRE Indonesia</p>

          <div className="mt-5 flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>Jadwal menyusul - 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Jakarta Pusat, DKI Jakarta</span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white/70 p-5">
            {!registered ? (
              <>
                <p className="text-sm text-neutral-700">
                  Selamat datang! Untuk bergabung, silakan daftar di bawah ini.
                </p>
                <button
                  onClick={() => setRegistered(true)}
                  className="mt-4 w-full rounded-full bg-brand hover:bg-brand-dark transition-colors px-6 py-3 text-sm font-semibold text-white"
                >
                  Register
                </button>
              </>
            ) : (
              <p className="text-sm font-medium text-brand-dark">
                Pendaftaran berhasil! Sampai jumpa di Green Impact Festival 2026.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <p className="font-semibold text-mint-100 mb-4">Sesi yang akan berlangsung</p>
        <div className="space-y-3">
          {agendaSessions.map((session, i) => (
            <div
              key={i}
              className="rounded-2xl border border-lime-300/30 bg-night-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <div>
                <span className="text-sm font-medium text-mint-300">{session.time}</span>
                <p className="font-semibold text-mint-100">{session.title}</p>
              </div>
              {session.speakers && (
                <span className="text-xs text-mint-200/50">{session.speakers.length} pembicara</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

Selesai. Total ada 20 file. Ikuti urutan "Cara pakai" di atas, lalu jalankan `npm run dev` dan buka `http://localhost:3000`.
