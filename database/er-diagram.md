# Diagram Relasi — green_impact_festival

Lima tabel pendaftaran berdiri sendiri (tidak saling bergantung), didampingi
`submission_logs` sebagai catatan mentah dan `uploaded_files` sebagai penampung
metadata berkas.

```mermaid
erDiagram
    submission_logs {
        int id PK
        varchar program
        json payload
        varchar ip_address
        varchar saved_to
        text error
        timestamp created_at
    }

    necsc_registrations {
        int id PK
        varchar full_name
        varchar institution
        varchar email UK
        varchar phone
        varchar category
        varchar subtheme
        varchar ktm_file
        varchar abstract_file
        enum status
        timestamp created_at
    }

    youth_ambassador_registrations {
        int id PK
        varchar full_name
        varchar institution
        varchar email UK
        varchar phone
        varchar subtheme
        varchar reels_1_url
        varchar reels_2_url
        decimal score
        enum status
        timestamp created_at
    }

    expo_registrations {
        int id PK
        varchar brand_name
        varchar pic_name
        varchar email
        varchar phone
        varchar booth_type
        text description
        enum status
        timestamp created_at
    }

    seminar_registrations {
        int id PK
        varchar full_name
        varchar email UK
        tinyint attended
        datetime checkin_at
        timestamp created_at
    }

    partnership_inquiries {
        int id PK
        varchar name
        varchar email
        varchar partnership_type
        text description
        enum status
        timestamp created_at
    }

    uploaded_files {
        int id PK
        varchar program
        int registration_id
        varchar field_name
        varchar original_name
        varchar stored_path
        int size_bytes
    }

    submission_logs ||..o| necsc_registrations : "menghasilkan"
    submission_logs ||..o| youth_ambassador_registrations : "menghasilkan"
    submission_logs ||..o| expo_registrations : "menghasilkan"
    submission_logs ||..o| seminar_registrations : "menghasilkan"
    submission_logs ||..o| partnership_inquiries : "menghasilkan"

    necsc_registrations ||--o{ uploaded_files : "punya berkas"
    youth_ambassador_registrations ||--o{ uploaded_files : "punya berkas"
```

## Catatan desain

**Kenapa tidak satu tabel `registrations` untuk semua program?**
Field tiap program berbeda jauh — NECSC butuh abstrak & kategori, Youth
Ambassador butuh dua link reels, Expo butuh jenis booth. Digabung jadi satu
tabel akan menghasilkan banyak kolom kosong dan menyulitkan panitia saat
mengekspor ke Excel. Rekap lintas program tetap mudah lewat view
`v_semua_pendaftar`.

**Kenapa relasi `uploaded_files` tidak pakai FOREIGN KEY?**
Karena satu tabel berkas melayani lima tabel pendaftaran sekaligus (pola
polymorphic), pasangan `program` + `registration_id` dipakai sebagai penanda
pemilik. Konsekuensinya integritas dijaga di sisi aplikasi, bukan oleh MySQL.

**Kenapa `submission_logs` tidak punya FOREIGN KEY ke tabel pendaftaran?**
Log ditulis lebih dulu, sebelum diketahui apakah penyimpanan berhasil. Kolom
`saved_to` mencatat tabel tujuan bila sukses, dan `error` mencatat alasannya
bila gagal.
