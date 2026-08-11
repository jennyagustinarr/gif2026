# Foto Dokumentasi "Our Impact"

Foto untuk linimasa kilas balik di halaman **About Us**. Selama folder ini
kosong, situs menampilkan kotak placeholder bertuliskan "Foto menyusul" —
tata letaknya tetap rapi, tinggal diganti kapan saja.

## Cara menambahkan

**1. Simpan berkas foto di folder ini** dengan nama berikut:

| Tahun | Nama berkas | Isi |
| --- | --- | --- |
| 2025 | `2025-1.jpg` | Foto bersama di Djakarta Theater |
| 2025 | `2025-2.jpg` | Penyerahan hadiah pemenang NECSC di panggung |
| 2024 | `2024-1.jpg` | Penyerahan penghargaan Green Impact Days |
| 2024 | `2024-2.jpg` | Foto bersama peserta di Sabuga |

**2. Daftarkan di `data/impact.ts`** pada properti `photos` tahun yang sesuai:

```ts
{
  year: "2025",
  ...
  photos: [
    { src: "/impact/2025-1.jpg", alt: "Foto bersama Green Impact Festival 2025 di Djakarta Theater" },
    { src: "/impact/2025-2.jpg", alt: "Penyerahan hadiah pemenang NECSC 2025" },
  ],
},
```

Foto ditampilkan dua per tahun. Kalau ingin lebih, tinggal tambah item di
array — kolomnya otomatis menyesuaikan.

## Saran teknis

| Hal | Anjuran |
| --- | --- |
| Rasio | Mendekati 4:3 (foto dipangkas otomatis ke rasio itu) |
| Lebar | 1600 px sudah cukup untuk tampilan tajam |
| Ukuran berkas | Kompres di bawah 300 KB per foto agar halaman tetap ringan |
| Format | JPG untuk foto, WebP kalau ingin lebih ringan |

Foto berukuran penuh dari kamera (5–6 MB) sebaiknya dikompres dulu, misalnya
lewat [squoosh.app](https://squoosh.app), supaya halaman tidak lambat dibuka
di ponsel.

## Teks alternatif

Isi `alt` dengan deskripsi singkat isi foto. Teks ini dibacakan pembaca layar
dan muncul kalau gambar gagal dimuat.
