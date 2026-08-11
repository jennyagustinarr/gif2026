# Green Impact Festival 2026

Website resmi Green Impact Festival 2026 — festival inovasi lingkungan yang diselenggarakan
SRE Indonesia bersama Rakyat Merdeka. Situs ini menampilkan informasi acara dan menangani
pendaftaran empat program sekaligus permohonan kemitraan, dengan data tersimpan ke MySQL.

Dibangun dari spesifikasi awal di [green-impact-festival-nextjs.md](green-impact-festival-nextjs.md).

---

## Daftar isi

1. [Teknologi](#teknologi)
2. [Menjalankan](#menjalankan)
3. [Peta halaman](#peta-halaman)
4. [Fungsi tiap halaman](#fungsi-tiap-halaman)
5. [Alur pendaftaran](#alur-pendaftaran)
6. [Sistem formulir](#sistem-formulir)
7. [API](#api)
8. [Database](#database)
9. [Struktur folder](#struktur-folder)
10. [Sistem desain](#sistem-desain)
11. [Sistem animasi](#sistem-animasi)
12. [Konfigurasi](#konfigurasi)
13. [Yang masih perlu dilengkapi](#yang-masih-perlu-dilengkapi)
14. [Batasan yang diketahui](#batasan-yang-diketahui)

---

## Teknologi

| Bagian    | Pilihan                                          |
| --------- | ------------------------------------------------ |
| Framework | Next.js 15 (App Router, React 19)                |
| Bahasa    | TypeScript (strict mode)                         |
| Styling   | Tailwind CSS 3 + CSS kustom di `app/globals.css` |
| Ikon      | lucide-react                                     |
| Font      | Poppins via `next/font/google`                   |
| Database  | MySQL / MariaDB (XAMPP), driver `mysql2`         |
| Linting   | ESLint (`next/core-web-vitals`)                  |

Tidak memakai library animasi, state management, atau komponen UI pihak ketiga — semuanya
dibangun dari Tailwind, CSS, dan React state biasa agar bundle tetap ringan (~103 kB shared JS).

---

## Menjalankan

### Prasyarat

- Node.js 18.18 atau lebih baru
- XAMPP dengan modul **MySQL** menyala (hanya perlu kalau ingin menyimpan pendaftaran)

### Langkah

```bash
npm install
copy .env.example .env.local     # PowerShell; di bash: cp .env.example .env.local
npm run dev
```

Buka http://localhost:3000.

Untuk mengaktifkan penyimpanan data: Start **MySQL** di XAMPP → import
`database/01-schema.sql` lewat phpMyAdmin → cek http://localhost:3000/api/health.
Panduan lengkap ada di [database/README.md](database/README.md).

> **Jangan jalankan `npm run dev` dan `npm run build` bersamaan.** Keduanya menulis ke folder
> `.next` yang sama dan akan saling merusak. Hentikan dev server dulu sebelum build.

### Perintah

| Perintah            | Fungsi                                         |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Development server dengan hot reload           |
| `npm run build`     | Build production                               |
| `npm start`         | Menjalankan hasil build (`npm run build` dulu) |
| `npm run lint`      | ESLint                                         |
| `npm run typecheck` | Type checking tanpa emit output                |

---

## Peta halaman

Hasil build: **18 entri route** yang menghasilkan **20 halaman**, karena dua route Campus
Roadshow bersifat dinamis dan dibangun satu halaman per kampus lewat `generateStaticParams`.
Ditambah 2 redirect dari URL struktur lama.

| Route                                         | Jenis    | Fungsi                                                        |
| --------------------------------------------- | -------- | ------------------------------------------------------------- |
| `/`                                           | Statis   | Beranda — hero, highlight program, tautan cepat               |
| `/about`                                      | Statis   | Profil festival dan empat pilar kegiatan                      |
| `/agenda`                                     | Statis   | Susunan acara, accordion daftar pembicara                     |
| `/faq`                                        | Statis   | Pertanyaan umum, accordion + kontak panitia                   |
| `/become-a-partner`                           | Statis   | Penjelasan 4 tipe kemitraan + formulir pengajuan              |
| `/registration`                               | Statis   | Hub — memilih salah satu dari 4 program                       |
| `/registration/necsc`                         | Statis   | Penjelasan kompetisi NECSC                                    |
| `/registration/necsc/form`                    | Statis   | Formulir pendaftaran NECSC                                    |
| `/registration/youth-ambassador`              | Statis   | Penjelasan program Youth Ambassador                           |
| `/registration/youth-ambassador/form`         | Statis   | Formulir Youth Ambassador                                     |
| `/registration/campus-roadshow`               | Statis   | Daftar seluruh agenda roadshow per kampus                     |
| `/registration/campus-roadshow/[campus]`      | SSG      | Penjelasan agenda satu kampus                                 |
| `/registration/campus-roadshow/[campus]/form` | SSG      | Formulir agenda kampus tersebut                               |
| `/registration/seminar`                       | Statis   | Penjelasan High Level Dialogue + daftar sesi                  |
| `/registration/seminar/form`                  | Statis   | Formulir High Level Dialogue                                  |
| `/api/registration`                           | Dinamis  | `POST` penerima seluruh formulir                              |
| `/api/health`                                 | Dinamis  | `GET` cek koneksi database                                    |
| `/necsc`, `/registration/expo`                | Redirect | Peninggalan struktur lama (lihat [Konfigurasi](#konfigurasi)) |

Semua halaman di-_prerender_ saat build, jadi pemuatan awal cepat. Hanya kedua API route yang
dijalankan per permintaan karena menyentuh database.

---

## Fungsi tiap halaman

### Beranda — [`app/page.tsx`](app/page.tsx)

- **Hero** dengan tiga blob gradien bergerak di latar, judul dengan efek gradien berjalan, serta
  tanggal dan venue acara yang ditarik dari `eventInfo`.
- **Marquee** kata kunci tema yang berjalan terus dan berhenti saat disentuh kursor.
- **Kartu highlight** NECSC dan Youth Ambassador (masuk dari kiri dan kanan).
- **Tautan cepat** ke enam halaman utama.

### About Us — [`app/about/page.tsx`](app/about/page.tsx)

Tiga paragraf profil festival, diikuti empat kartu pilar kegiatan: High Level Dialogue, NECSC,
Youth Ambassador, dan Campus Roadshow.

### Agenda — [`app/agenda/page.tsx`](app/agenda/page.tsx)

Daftar sesi acara dari `agendaSessions`. Tiap baris bisa diklik untuk memperlihatkan daftar
pembicara; tingginya dianimasikan halus. Sesi bertanda `highlighted` diberi latar gradien.
Logika interaktifnya ada di [`AgendaList.tsx`](app/agenda/AgendaList.tsx) sebagai client
component, sedangkan `page.tsx` tetap server component agar bisa mengekspor metadata SEO.

### FAQ — [`app/faq/page.tsx`](app/faq/page.tsx)

Accordion pertanyaan dari `data/faq.ts` ([`FaqAccordion.tsx`](app/faq/FaqAccordion.tsx)),
ditutup kartu kontak panitia (email dan WhatsApp).

### Become a Partner — [`app/become-a-partner/page.tsx`](app/become-a-partner/page.tsx)

Halaman ini menggabungkan penjelasan dan formulir dalam satu alur. Empat tipe kemitraan
(Sponsorship, Community Partner, Media Partner, Other) ditampilkan sebagai **kartu yang bisa
dipilih**: mengklik kartu sekaligus mengisi field "Type of Partnership" di formulir, memunculkan
centang, dan memekarkan daftar benefit. Kartunya adalah `<input type="radio">` asli yang
disembunyikan, jadi tetap dapat dioperasikan dengan keyboard dan terbaca screen reader.
Isi teks tiap tipe ada di [`data/partnership.ts`](data/partnership.ts).

### Halaman 404 — [`app/not-found.tsx`](app/not-found.tsx)

Pesan ramah dengan tombol kembali ke beranda.

---

## Alur pendaftaran

Hub [`/registration`](app/registration/page.tsx) menampilkan empat kartu program. Tiap program
lalu dipecah menjadi **dua halaman terpisah**:

```
/registration/<program>        ← penjelasan, diakhiri tombol "Daftar Sekarang"
/registration/<program>/form   ← hanya formulir, ada link kembali ke penjelasan
```

Pemisahan ini disengaja supaya calon peserta membaca ketentuan sebelum mengisi. Blok ajakan di
akhir halaman penjelasan memakai komponen bersama [`RegisterCta`](components/RegisterCta.tsx),
lengkap dengan catatan pengingat yang berbeda tiap program (misalnya "siapkan berkas KTM dan
abstrak" di NECSC).

### Isi tiap program

| Program                 | Halaman penjelasan memuat                                                             | Field formulir                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **NECSC**               | Timeline 6 tahap, total hadiah, 4 subtema, mekanisme 2 tahap, syarat peserta          | Nama, institusi, email, telepon, kategori, subtema, 4 berkas unggahan, sumber informasi |
| **Youth Ambassador**    | 3 subtema, mekanisme, 4 KPI program, benefit, format video                            | Nama, institusi, email, telepon, subtema, 2 bukti, 2 link Reels, sumber informasi       |
| **Campus Roadshow**     | Daftar agenda per kampus; tiap agenda punya judul talkshow, tanggal/jam/venue sendiri | Nama, email, WhatsApp, status, **field bersyarat**, sumber informasi                    |
| **High Level Dialogue** | Kartu acara, deskripsi, benefit, daftar seluruh sesi                                  | Nama, email, nomor handphone, asal instansi                                             |

> **High Level Dialogue** sebelumnya bernama "Seminar". Hanya teks yang tampil ke pengunjung yang
> berubah — rute `/registration/seminar`, nama berkas, kunci `program="seminar"`, dan tabel
> `seminar_registrations` tetap memakai nama lama supaya tautan yang sudah tersebar dan data
> pendaftar yang sudah masuk tidak putus.

### Pesan konfirmasi khusus

Setelah submit, sebagian besar program memakai pesan sukses bawaan. Dua program punya pesan
sendiri yang dioper lewat properti `successContent`:

- [`RoadshowSuccess.tsx`](app/registration/campus-roadshow/RoadshowSuccess.tsx) — ucapan terima
  kasih, pengulangan detail acara, dan ajakan bergabung ke WhatsApp Community roadshow ITB.
- [`SeminarSuccess.tsx`](app/registration/seminar/SeminarSuccess.tsx) — konfirmasi, imbauan
  memeriksa inbox, ajakan bergabung ke WhatsApp Community GIF 2026, serta venue dan tanggal.

Selama link WhatsApp masih kosong di file data, kedua komponen menampilkan catatan bahwa link
dikirim lewat email — bukan tombol mati. Begitu link diisi, catatan otomatis berganti tombol.

---

## Sistem formulir

Seluruh formulir pendaftaran memakai satu komponen generik:
[`components/RegistrationForm.tsx`](components/RegistrationForm.tsx). Halaman tinggal mengoper
daftar definisi field, dan komponen mengurus rendering, state, pengiriman, serta penanganan error.

```ts
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "file" | "radio";
  required?: boolean;
  options?: string[]; // untuk select & radio
  placeholder?: string;
  helpText?: string; // teks bantuan kecil di bawah input
  pattern?: string; // atribut pattern HTML
  showIf?: { field: string; values: string[] };
}
```

### Field bersyarat (`showIf`)

Field hanya muncul kalau field lain bernilai tertentu. Contoh dari Campus Roadshow: pertanyaan
kampus dan jurusan baru muncul kalau status peserta adalah pelajar/mahasiswa, sementara isian
bebas muncul kalau memilih "Other".

```ts
{
  name: "institution",
  label: "University / Institution / School",
  type: "text",
  required: true,
  showIf: { field: "currentStatus", values: STUDENT_STATUSES },
}
```

Field yang tersembunyi **tidak divalidasi dan tidak ikut terkirim**, sehingga jawaban dari cabang
pilihan yang sudah ditinggalkan tidak ikut tersimpan.

### Validasi berlapis

| Lapis    | Yang dicek                                                                                                                                           |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Browser  | `required`, tipe input, `pattern` (mis. nomor WhatsApp diawali 08)                                                                                   |
| Client   | Hanya field yang tampil yang dikirim                                                                                                                 |
| Server   | Field wajib, `requiredIf` untuk aturan bersyarat, format email, format WhatsApp dan telepon, nama program yang dikenal, batas panjang 5.000 karakter |
| Database | `UNIQUE` pada email, `NOT NULL` pada kolom wajib                                                                                                     |

Aturan bersyarat sengaja diulang di server (`requiredIf` di API route) supaya tidak bisa ditembus
lewat request langsung di luar formulir.

### Status pengiriman

Tombol submit berubah jadi "Mengirim..." dengan spinner, error dari server ditampilkan apa adanya
(misalnya "Email ini sudah pernah didaftarkan untuk program tersebut"), dan keberhasilan mengganti
seluruh formulir dengan layar konfirmasi.

---

## API

### `POST /api/registration`

Penerima semua formulir. Body:

```json
{
  "program": "necsc",
  "values": { "fullName": "...", "email": "...", "phone": "..." }
}
```

`program` yang dikenal: `necsc`, `youth-ambassador`, `campus-roadshow`, `seminar`, `partnership`.

Alurnya:

1. Payload mentah dicatat ke tabel `submission_logs` **lebih dulu** — jaring pengaman agar tidak
   ada kiriman yang hilang meski langkah berikutnya gagal.
2. Nama field dipetakan ke kolom tabel program lalu di-`INSERT` dengan query berparameter.
3. Baris log diperbarui: kolom `saved_to` diisi nama tabel bila sukses, atau `error` bila gagal.

| Kode  | Arti                                      |
| ----- | ----------------------------------------- |
| `200` | Tersimpan, mengembalikan `id` baris       |
| `400` | Validasi gagal atau program tidak dikenal |
| `405` | Diakses dengan metode `GET`               |
| `409` | Email sudah terdaftar di program tersebut |
| `503` | Database tidak bisa dihubungi             |

### `GET /api/health`

Cek koneksi database beserta konfigurasi yang sedang dipakai. Berguna saat menyiapkan XAMPP:

```json
{ "app": "ok", "database": "ok", "message": "Koneksi database berhasil." }
```

Kalau gagal, pesannya langsung menyebut penyebabnya — MySQL belum dinyalakan, database belum
di-import, atau kredensial salah.

---

## Database

MySQL/MariaDB dengan nama database `green_impact_festival`. Seluruh berkas SQL, diagram relasi,
dan panduan lengkap ada di folder [database/](database/).

| Tabel                            | Isi                                              |
| -------------------------------- | ------------------------------------------------ |
| `necsc_registrations`            | Pendaftaran NECSC                                |
| `youth_ambassador_registrations` | Pendaftaran Youth Ambassador                     |
| `campus_roadshow_registrations`  | Pendaftaran Campus Roadshow                      |
| `seminar_registrations`          | Peserta High Level Dialogue + status kehadiran   |
| `partnership_inquiries`          | Permohonan kemitraan                             |
| `submission_logs`                | Salinan mentah setiap kiriman (JSON)             |
| `uploaded_files`                 | Metadata berkas unggahan (disiapkan untuk nanti) |

Tersedia juga lima view siap pakai untuk rekap panitia: `v_semua_pendaftar`, `v_rekap_program`,
`v_necsc_per_subtema`, `v_ya_per_subtema`, dan `v_roadshow_per_status`.

Koneksi dikelola [`lib/db.ts`](lib/db.ts) memakai connection pool yang di-cache di `globalThis`
agar hot reload tidak membuat pool baru terus-menerus. Error MySQL diterjemahkan ke pesan
berbahasa Indonesia yang bisa ditindaklanjuti.

---

## Struktur folder

```
.
├── app/
│   ├── layout.tsx                    # Root layout: font, metadata global, Navbar, Footer,
│   │                                 #   ScrollProgress, BackToTop, skrip pengaman animasi
│   ├── template.tsx                  # Transisi antar halaman + penanda hidrasi React
│   ├── globals.css                   # Tailwind + kelas animasi & efek kustom
│   ├── page.tsx                      # Beranda
│   ├── not-found.tsx                 # Halaman 404
│   ├── about/page.tsx
│   ├── agenda/
│   │   ├── page.tsx                  # Server component (metadata)
│   │   └── AgendaList.tsx            # Client component (accordion sesi)
│   ├── faq/
│   │   ├── page.tsx
│   │   └── FaqAccordion.tsx
│   ├── become-a-partner/
│   │   ├── page.tsx
│   │   └── PartnerForm.tsx           # Kartu tipe kemitraan + formulir
│   ├── registration/
│   │   ├── page.tsx                  # Hub pendaftaran
│   │   ├── necsc/
│   │   │   ├── page.tsx              # Penjelasan program
│   │   │   └── form/page.tsx         # Formulir
│   │   ├── youth-ambassador/
│   │   │   ├── page.tsx
│   │   │   └── form/page.tsx
│   │   ├── campus-roadshow/
│   │   │   ├── page.tsx
│   │   │   ├── RoadshowSuccess.tsx   # Layar konfirmasi khusus
│   │   │   └── form/page.tsx
│   │   └── seminar/
│   │       ├── page.tsx
│   │       ├── SeminarSuccess.tsx    # Layar konfirmasi khusus
│   │       └── form/page.tsx
│   └── api/
│       ├── registration/route.ts     # POST semua formulir
│       └── health/route.ts           # GET cek database
├── components/
│   ├── Navbar.tsx                    # Navigasi, menyusut saat scroll, dropdown CSS
│   ├── Footer.tsx                    # Kontak, navigasi, logo penyelenggara
│   ├── RegistrationForm.tsx          # Form generik berbasis FormField
│   ├── RegisterCta.tsx               # Blok ajakan mendaftar
│   ├── Reveal.tsx                    # Animasi muncul saat masuk viewport
│   ├── ScrollProgress.tsx            # Bar progres scroll
│   ├── BackToTop.tsx                 # Tombol kembali ke atas
│   ├── SectionHeading.tsx            # Judul halaman
│   └── SectionIcon.tsx               # Ikon bintang empat sudut
├── data/                             # Sumber konten — ubah di sini, bukan di halaman
│   ├── agenda.ts                     # Sesi acara + info event
│   ├── necsc.ts                      # Info & field form NECSC
│   ├── youthAmbassador.ts            # Info & field form Youth Ambassador
│   ├── campusRoadshow.ts             # Info & field form Campus Roadshow (pakai showIf)
│   ├── seminar.ts                    # Info, field form, teks konfirmasi High Level Dialogue
│   ├── partnership.ts                # Empat tipe kemitraan
│   └── faq.ts                        # FAQ + kontak panitia
├── lib/
│   └── db.ts                         # Connection pool MySQL + terjemahan error
└── database/                         # SQL, panduan, diagram relasi
```

**Prinsip yang dipakai:** seluruh teks dan definisi formulir hidup di `data/`, bukan di dalam
komponen halaman. Untuk mengubah jadwal, hadiah, subtema, atau pertanyaan formulir, cukup sunting
satu berkas data tanpa menyentuh kode tampilan.

---

## Sistem desain

### Warna

Tema gelap dengan aksen hijau. Didefinisikan di [`tailwind.config.ts`](tailwind.config.ts).

| Token        | Nilai     | Pemakaian                             |
| ------------ | --------- | ------------------------------------- |
| `night-950`  | `#050f0a` | Latar utama halaman                   |
| `night-900`  | `#0a1f13` | Latar kartu dan input                 |
| `night-800`  | `#0f2b1b` | Avatar, elemen bertumpuk              |
| `night-700`  | `#163823` | Scrollbar                             |
| `mint-100`   | `#eafaf1` | Teks utama                            |
| `mint-200`   | `#c9f7de` | Teks sekunder (sering dengan opacity) |
| `mint-300`   | `#a7f3d0` | Judul bagian, tautan                  |
| `mint-400`   | `#6ee7a8` | Aksen, ikon, garis fokus              |
| `mint-500`   | `#3ddc84` | Gradien, sorotan                      |
| `brand`      | `#1f9d55` | Tombol utama                          |
| `brand-dark` | `#167a42` | Tombol utama saat hover               |
| `lime-300`   | `#d9f99d` | Garis tepi kartu, gradien sekunder    |

Tingkat kedalaman teks diatur lewat opacity (`text-mint-200/70`, `/60`, `/40`) agar hierarki tetap
konsisten tanpa menambah token warna baru.

### Tipografi dan bentuk

- **Poppins** (400–800) dimuat lewat `next/font/google`, tanpa request ke server luar saat runtime.
- Sudut membulat besar: `rounded-2xl` untuk input, `rounded-3xl` untuk kartu, `rounded-full`
  untuk tombol dan pil navigasi.
- Lebar konten dibatasi `max-w-3xl` (formulir), `max-w-4xl` (teks), `max-w-5xl`/`max-w-6xl`
  (daftar dan grid).

### Kelas utilitas kustom

Didefinisikan di [`app/globals.css`](app/globals.css):

| Kelas             | Efek                                               |
| ----------------- | -------------------------------------------------- |
| `.card-hover`     | Kartu terangkat dengan bayangan hijau saat hover   |
| `.btn-shine`      | Kilau menyapu melintasi tombol saat hover          |
| `.text-shimmer`   | Teks bergradien yang bergerak                      |
| `.link-underline` | Garis bawah melebar dari kiri                      |
| `.marquee-mask`   | Tepi marquee memudar ke transparan                 |
| `.reveal`         | Kondisi awal animasi scroll (lihat bagian berikut) |

---

## Sistem animasi

Semua animasi dibuat dengan CSS dan IntersectionObserver, tanpa library tambahan.

| Komponen                                          | Perilaku                                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [`Reveal`](components/Reveal.tsx)                 | Konten muncul saat masuk viewport. Mendukung arah `up`/`down`/`left`/`right`/`zoom` dan `delay` untuk efek bertahap |
| [`ScrollProgress`](components/ScrollProgress.tsx) | Bar gradien tipis di paling atas mengikuti posisi scroll                                                            |
| [`BackToTop`](components/BackToTop.tsx)           | Tombol melayang, muncul setelah scroll 480px                                                                        |
| [`template.tsx`](app/template.tsx)                | Tiap perpindahan halaman masuk dengan fade dan naik tipis                                                           |

Keyframe yang tersedia di Tailwind: `fade-up`, `fade-in`, `slide-down`, `page-in`, `float`,
`blob`, `shimmer`, `marquee`, `pulse-ring`, `bounce-subtle`.

### Pengaman: halaman tidak boleh kosong

Animasi scroll bekerja dengan menyembunyikan konten (`opacity: 0`) lalu memunculkannya lewat
JavaScript. Kalau JavaScript gagal, halaman bisa tampak kosong. Karena itu dipasang dua lapis
pengaman:

1. Seluruh aturan penyembunyi diberi awalan `.js`, yang hanya dipasang oleh skrip inline di
   `app/layout.tsx`. Tanpa JavaScript, konten tampil apa adanya.
2. Skrip yang sama memeriksa setelah 4 detik: kalau React ternyata gagal hidrasi (penanda
   `data-hydrated` tidak pernah muncul), class `js` dilepas dan semua konten langsung terlihat.

### Aksesibilitas

- Seluruh animasi dimatikan otomatis kalau sistem pengguna mengaktifkan **reduce motion**.
- Dropdown Registration di navbar memakai `group-hover` dan `focus-within` murni CSS, sehingga
  tetap bisa dibuka lewat keyboard dan tidak bergantung JavaScript. Judulnya link asli, jadi
  diklik langsung menuju `/registration`.
- Kartu pilihan (tipe kemitraan, opsi radio formulir) tetap memakai `<input type="radio">` asli
  yang disembunyikan secara visual.
- Setiap input punya `<label htmlFor>`, dan tombol accordion memakai `aria-expanded`.

---

## Konfigurasi

### Variabel lingkungan

Salin `.env.example` menjadi `.env.local`. Nilai bawaannya sudah cocok dengan XAMPP standar.

| Variabel               | Bawaan                  | Fungsi                                                                                                    |
| ---------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `DB_HOST`              | `127.0.0.1`             | Host MySQL                                                                                                |
| `DB_PORT`              | `3306`                  | Port MySQL                                                                                                |
| `DB_USER`              | `root`                  | User MySQL                                                                                                |
| `DB_PASSWORD`          | _(kosong)_              | Password MySQL                                                                                            |
| `DB_NAME`              | `green_impact_festival` | Nama database                                                                                             |
| `DATABASE_URL`         | _(kosong)_              | Alternatif kelima variabel di atas, format `mysql://user:pass@host:3306/db`. Kalau diisi, nilainya menang |
| `DB_SSL`               | _(kosong)_              | `true` (verifikasi sertifikat), `insecure` (tanpa verifikasi), atau kosong untuk XAMPP lokal              |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Base URL untuk metadata dan Open Graph                                                                    |

`.env.local` diabaikan git, jadi kredensial tidak ikut ter-push.

### Deploy ke Vercel

Situs sudah bisa di-deploy apa adanya — seluruh halaman tampil normal. Namun **formulir
tidak akan bisa menyimpan** selama database masih berjalan di XAMPP lokal, karena server
Vercel tidak dapat menjangkau komputermu. Endpoint `/api/health` akan melaporkannya.

Untuk membuka pendaftaran sungguhan, siapkan MySQL yang dapat diakses publik (Railway,
Aiven, Clever Cloud, dan sejenisnya), import `database/01-schema.sql` ke sana, lalu isi
Environment Variables di Vercel:

| Key                    | Value                                               |
| ---------------------- | --------------------------------------------------- |
| `DATABASE_URL`         | String koneksi dari penyedia                        |
| `DB_SSL`               | `true`, atau `insecure` kalau sertifikatnya ditolak |
| `NEXT_PUBLIC_SITE_URL` | Domain situs, mis. `https://gif2026.vercel.app`     |

Setelah menyimpan variabel, jalankan **Redeploy** agar nilainya terbaca, lalu periksa
`https://<domain>/api/health`.

### Redirect

Diatur di [`next.config.js`](next.config.js), keduanya permanen (308):

| Dari                 | Ke                    | Alasan                                                           |
| -------------------- | --------------------- | ---------------------------------------------------------------- |
| `/necsc`             | `/registration/necsc` | Halaman NECSC berdiri sendiri sudah digabung ke alur pendaftaran |
| `/registration/expo` | `/registration`       | Program Expo ditiadakan                                          |

### Gambar eksternal

Logo GIF, SRE, dan Rakyat Merdeka diambil dari Firebase Storage milik situs aslinya. Hostname-nya
sudah didaftarkan di `images.remotePatterns`. Konsekuensinya, logo butuh koneksi internet untuk
tampil saat development.

---

## Yang masih perlu dilengkapi

Semuanya terkumpul di folder `data/` dan sudah ditandai komentar `TODO`.

| Item                                                         | Lokasi                                                                       |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Copy About Us resmi (teks sekarang susunan ulang)            | [`app/about/page.tsx`](app/about/page.tsx)                                   |
| Nama dan foto pembicara (sebagian masih "Speaker 1, 2, …")   | [`data/agenda.ts`](data/agenda.ts)                                           |
| Tanggal acara utama                                          | `eventInfo` di [`data/agenda.ts`](data/agenda.ts)                            |
| Timeline NECSC dengan tanggal presisi (kini masih per bulan) | [`data/necsc.ts`](data/necsc.ts)                                             |
| Jawaban FAQ resmi (kini masih draf)                          | [`data/faq.ts`](data/faq.ts)                                                 |
| Tanggal, jam, venue, tema tiap agenda roadshow               | `roadshowAgendas` di [`data/campusRoadshow.ts`](data/campusRoadshow.ts)      |
| Link WhatsApp Community tiap agenda roadshow                 | `whatsappCommunityUrl` per agenda di file yang sama                          |
| Logo kampus                                                  | Taruh berkas di [`public/logos/`](public/logos/), lalu isi `logo` per agenda |
| Tanggal High Level Dialogue                                  | `seminarEventDetails` di [`data/seminar.ts`](data/seminar.ts)                |
| Link WhatsApp Community GIF 2026                             | `seminarCommunityUrl` di file yang sama                                      |

---

## Batasan yang diketahui

**Upload file belum berfungsi.** Field bertipe `file` di formulir NECSC dan Youth Ambassador baru
mengirim **nama berkasnya saja**, bukan isinya. Peserta bisa memilih file, tetapi berkas itu tidak
tersimpan di mana pun. Untuk NECSC yang mewajibkan pengumpulan abstrak, ini harus diselesaikan
sebelum pendaftaran dibuka — perlu perubahan ke `FormData` plus penyimpanan berkas. Tabel
`uploaded_files` sudah disiapkan untuk menampung metadatanya.

**Database bersifat lokal.** MySQL berjalan di XAMPP pada satu komputer, jadi data hanya ada di
sana. Kalau situs ini nanti di-deploy online (Vercel dan sejenisnya), server tidak akan bisa
menjangkau MySQL lokal — dibutuhkan database yang dapat diakses publik.

**Belum ada halaman admin.** Panitia melihat dan mengelola data lewat phpMyAdmin, dibantu kumpulan
query siap pakai di [`database/03-queries.sql`](database/03-queries.sql).

**Logo kampus belum tersedia.** Selama berkas logo belum ditaruh di `public/logos/`, situs
menampilkan monogram inisial kampus. Lihat [`public/logos/README.md`](public/logos/README.md).
