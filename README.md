# Green Impact Festival 2026

Website Next.js (App Router + TypeScript + Tailwind CSS) untuk Green Impact Festival 2026,
diimplementasikan dari spesifikasi di [green-impact-festival-nextjs.md](green-impact-festival-nextjs.md).

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

Perintah lain:

| Perintah            | Fungsi                          |
| ------------------- | ------------------------------- |
| `npm run build`     | Build production                |
| `npm start`         | Menjalankan hasil build         |
| `npm run lint`      | ESLint (next/core-web-vitals)   |
| `npm run typecheck` | Type checking tanpa emit output |

## Struktur folder

```
.
├── app/
│   ├── layout.tsx                 # Root layout: font Poppins, Navbar, Footer, metadata global
│   ├── globals.css                # Tailwind + tema gelap
│   ├── page.tsx                   # Home
│   ├── not-found.tsx              # Halaman 404
│   ├── about/page.tsx
│   ├── agenda/
│   │   ├── page.tsx               # Server component (metadata)
│   │   └── AgendaList.tsx         # Client component (accordion sesi)
│   ├── faq/
│   │   ├── page.tsx
│   │   └── FaqAccordion.tsx
│   ├── become-a-partner/
│   │   ├── page.tsx
│   │   └── PartnerForm.tsx
│   ├── registration/
│   │   ├── page.tsx               # Hub pendaftaran
│   │   ├── youth-ambassador/page.tsx
│   │   ├── necsc/page.tsx        # Info lengkap NECSC + formulir (gabungan)
│   │   ├── expo/page.tsx
│   │   └── seminar/
│   │       ├── page.tsx
│   │       └── SeminarRegisterCard.tsx
│   └── api/registration/route.ts  # Endpoint POST semua form
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SectionIcon.tsx
│   ├── SectionHeading.tsx
│   └── RegistrationForm.tsx       # Form generik berbasis definisi FormField
└── data/
    ├── agenda.ts                  # Sesi acara + info event
    ├── necsc.ts                   # Info & field form NECSC
    ├── youthAmbassador.ts         # Info & field form Youth Ambassador
    └── faq.ts                     # FAQ + kontak panitia
```

Halaman `/necsc` yang berdiri sendiri sudah dihapus — seluruh isinya (timeline, hadiah,
subtema, mekanisme, syarat) digabung ke [app/registration/necsc/page.tsx](app/registration/necsc/page.tsx).
URL lama `/necsc` di-redirect permanen ke `/registration/necsc` lewat [next.config.js](next.config.js).

Halaman yang memakai `useState` dipecah jadi server component (untuk `export const metadata`)
plus client component di folder yang sama. Ini beda tipis dari daftar file di dokumen MD,
tapi diperlukan supaya tiap halaman tetap punya metadata SEO sendiri.

## Menyambungkan form ke backend

Semua form (NECSC, Youth Ambassador, Expo, Seminar, Partnership) mengirim `POST` ke
`/api/registration` dengan body:

```json
{ "program": "necsc", "values": { "fullName": "...", "email": "..." } }
```

Di [app/api/registration/route.ts](app/api/registration/route.ts):

- Kalau env `REGISTRATION_WEBHOOK_URL` diisi, payload diteruskan ke URL tersebut
  (mis. Google Apps Script Web App, n8n, Zapier).
- Kalau kosong, payload hanya di-log ke console server — cukup untuk development.

Salin `.env.example` jadi `.env.local` untuk mengisinya.

## Yang masih perlu dilengkapi

Sesuai catatan di dokumen sumber:

- **Copy About Us** — teks di [app/about/page.tsx](app/about/page.tsx) masih susunan ulang, bukan teks resmi.
- **Nama & foto pembicara** — sebagian besar masih "Speaker 1, 2, …" di [data/agenda.ts](data/agenda.ts).
- **Tanggal & venue** — `eventInfo` di [data/agenda.ts](data/agenda.ts) masih "Jadwal menyusul".
- **Timeline NECSC** — masih format bulan karena data sumber hanya grid mingguan.
- **Jawaban FAQ** — masih draf di [data/faq.ts](data/faq.ts).
- **Detail Expo** — harga booth, ukuran, dan ketentuan belum tersedia.
- **Upload file** — form baru mengirim *nama* file. Untuk upload sungguhan, ubah
  `RegistrationForm` memakai `FormData` + storage (Firebase Storage, S3, dsb).
