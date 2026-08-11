# Foto Dokumentasi "Our Impact"

Foto untuk linimasa kilas balik di halaman **About Us**. Isi folder saat ini:

| Berkas | Isi | Sumber asli |
| --- | --- | --- |
| `2025-1.jpg` | Foto bersama tamu undangan dan peserta di Djakarta Theater | `68 - GIF 25 Vice President & Awarding.jpg` |
| `2025-2.jpg` | Pemenang NECSC & Digital Ambassador di panggung | `50 - GIF 25 Vice President & Awarding.jpg` |
| `2024-1.jpg` | Penyerahan cendera mata dan buku di panggung Sabuga ITB | `DSC07828.JPG` |
| `2024-2.jpg` | Foto bersama peserta memenuhi ruang Sabuga ITB | `DSC07971.JPG` |

Berkas asli dari kamera disimpan di folder `pictures/` pada akar proyek dan
sengaja **tidak** ikut ke GitHub (ukurannya 3–11 MB per foto).

## Cara mengganti atau menambah

Simpan berkas di folder ini dengan nama `2024-1`, `2024-2`, `2025-1`, atau
`2025-2`. Ekstensinya bebas — `.jpg`, `.jpeg`, `.png`, `.webp` — situs mencari
sendiri berkas mana yang ada, jadi **tidak perlu menyunting `data/impact.ts`**
kecuali ingin mengubah teks `alt`-nya.

Kalau salah satu berkas dihapus, hanya slot itu yang berubah jadi kotak
placeholder; sisanya tetap tampil.

### Kalau ingin lebih dari dua foto per tahun

Tambahkan item baru pada array `photos` tahun bersangkutan di
`data/impact.ts`, lalu taruh berkasnya di sini:

```ts
{ src: "/impact/2025-3.jpg", alt: "Deskripsi singkat isi foto" },
```

Kolomnya menyesuaikan otomatis.

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
