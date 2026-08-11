# Database — Green Impact Festival 2026

Semua yang berkaitan dengan database ada di folder ini. Target: **MySQL / MariaDB bawaan XAMPP**.

| File | Fungsi |
| --- | --- |
| `01-schema.sql` | Struktur database: 7 tabel + 5 view. **Wajib di-import pertama.** Aman dijalankan berulang. |
| `02-seed.sql` | Data contoh (fiktif) untuk menguji tampilan dan query. Opsional. |
| `03-queries.sql` | Kumpulan query rekap siap pakai untuk panitia. Jalankan per bagian, bukan di-import. |
| `04-reset.sql` | **Menghapus seluruh database.** Hanya untuk tahap pengembangan. |
| `05-migration-campus-roadshow.sql` | Migrasi untuk database yang di-import sebelum program Campus Roadshow ada. Tidak menghapus data. |
| `06-migration-partner-phone.sql` | Migrasi penambahan kolom `phone` di `partnership_inquiries`. Tidak menghapus data. |
| `er-diagram.md` | Diagram relasi antar tabel. |

Nama database: **`green_impact_festival`**

---

## Setup pertama kali

### 1. Nyalakan MySQL di XAMPP

Buka **XAMPP Control Panel** → klik **Start** pada baris **MySQL** (dan **Apache** kalau mau pakai phpMyAdmin). Pastikan statusnya hijau.

### 2. Import struktur database

**Lewat phpMyAdmin (paling mudah):**

1. Buka http://localhost/phpmyadmin
2. Klik tab **Import** di menu atas
3. **Choose File** → pilih `database/01-schema.sql`
4. Klik **Import** / **Go**

Database `green_impact_festival` beserta seluruh tabelnya akan terbentuk otomatis — tidak perlu membuat database manual dulu.

**Lewat terminal:**

```powershell
cd C:\Users\jenny\Downloads\green-impact-festival-code
C:\xampp\mysql\bin\mysql.exe -u root < database\01-schema.sql
```

### 3. (Opsional) Isi data contoh

Ulangi langkah Import dengan file `02-seed.sql` kalau ingin melihat tampilan dengan data.

### 4. Hubungkan aplikasi

Salin `.env.example` jadi `.env.local` di folder utama project:

```powershell
copy .env.example .env.local
```

Isi defaultnya sudah cocok dengan XAMPP standar (user `root`, tanpa password). Ubah hanya kalau setup MySQL-mu berbeda.

### 5. Cek koneksi

Jalankan `npm run dev`, lalu buka **http://localhost:3000/api/health**

```json
{ "app": "ok", "database": "ok", "message": "Koneksi database berhasil." }
```

Kalau `database: "error"`, pesannya sudah menjelaskan penyebabnya (MySQL mati, database belum di-import, password salah, dsb).

---

## Struktur tabel

| Tabel | Isi |
| --- | --- |
| `necsc_registrations` | Pendaftaran NECSC 2026 |
| `youth_ambassador_registrations` | Pendaftaran Youth Ambassador |
| `campus_roadshow_registrations` | Pendaftaran Campus Roadshow |
| `seminar_registrations` | Peserta seminar + status kehadiran hari-H |
| `partnership_inquiries` | Permohonan sponsor / media partner |
| `submission_logs` | Salinan mentah **setiap** kiriman form (JSON) |
| `uploaded_files` | Metadata berkas unggahan (disiapkan untuk nanti) |

### Kenapa ada `submission_logs`

Setiap kiriman form dicatat ke tabel ini **lebih dulu**, sebelum masuk ke tabel programnya. Jadi kalau ada field baru yang belum punya kolom, atau penyimpanan gagal di tengah jalan, datanya tetap utuh tersimpan sebagai JSON dan bisa dipulihkan.

Untuk melihat kiriman yang gagal:

```sql
SELECT * FROM submission_logs WHERE saved_to IS NULL ORDER BY created_at DESC;
```

### View untuk rekap

| View | Isi |
| --- | --- |
| `v_semua_pendaftar` | Semua pendaftar lintas program dalam satu daftar |
| `v_rekap_program` | Jumlah pendaftar per program |
| `v_necsc_per_subtema` | Sebaran NECSC per subtema & kategori |
| `v_ya_per_subtema` | Sebaran Youth Ambassador per subtema |
| `v_roadshow_per_status` | Sebaran Campus Roadshow per status peserta + jumlah hadir |

Cara pakai sama seperti tabel biasa: `SELECT * FROM v_rekap_program;`

### Aturan email unik

Tabel `necsc_registrations`, `youth_ambassador_registrations`, dan `seminar_registrations` punya `UNIQUE` pada kolom email — satu orang hanya bisa mendaftar sekali per program, sesuai aturan lomba. Kalau ada yang mendaftar dua kali, aplikasi membalas **"Email ini sudah pernah didaftarkan untuk program tersebut"**, bukan error teknis.

`campus_roadshow_registrations` juga dibatasi satu email satu pendaftaran. Hanya `partnership_inquiries` yang sengaja **tidak** dibatasi, karena satu organisasi wajar mengirim lebih dari satu pengajuan.

---

## Export & backup

### Export lewat phpMyAdmin

1. Klik database **`green_impact_festival`** di panel kiri
2. Tab **Export** → **Quick** → format **SQL** → **Go**
3. File `.sql` akan terunduh, berisi struktur + seluruh data

Untuk mengekspor **satu tabel ke Excel**: klik tabelnya → tab **Export** → format **CSV** → buka hasilnya di Excel.

### Backup lewat terminal

```powershell
C:\xampp\mysql\bin\mysqldump.exe -u root green_impact_festival > backup-2026-08-03.sql
```

Restore dari backup:

```powershell
C:\xampp\mysql\bin\mysql.exe -u root green_impact_festival < backup-2026-08-03.sql
```

Biasakan backup **sebelum** melakukan perubahan besar, dan rutin selama masa pendaftaran dibuka.

---

## Troubleshooting

| Gejala | Penyebab & solusi |
| --- | --- |
| `MySQL tidak bisa dihubungi` | Modul MySQL di XAMPP belum di-Start |
| `Database belum ada` | `01-schema.sql` belum di-import |
| `Username atau password MySQL salah` | Sesuaikan `DB_USER` / `DB_PASSWORD` di `.env.local` |
| MySQL gagal start di XAMPP | Port 3306 dipakai aplikasi lain. Ganti port di XAMPP config, lalu samakan `DB_PORT` di `.env.local` |
| Data tidak muncul di phpMyAdmin | Pastikan database yang dibuka `green_impact_festival`, bukan yang lain |

---

## Catatan penting

**Upload file belum aktif.** Kolom seperti `ktm_file`, `abstract_file`, dan `twibbon_proof` saat ini hanya menyimpan **nama file** (misalnya `"ktm.jpg"`), bukan isi filenya — peserta memilih file di form, tapi berkasnya tidak terkirim ke mana pun. Untuk NECSC yang mewajibkan pengumpulan abstrak, ini harus diselesaikan sebelum pendaftaran dibuka. Tabel `uploaded_files` sudah disiapkan untuk menampung metadatanya.

**Database ini lokal.** Karena berjalan di XAMPP di komputermu, data hanya ada di komputer itu. Kalau situsnya nanti di-deploy online (Vercel dsb.), server tidak bisa menjangkau MySQL lokal ini — perlu database yang bisa diakses publik.
