# Logo Kampus

Taruh berkas logo kampus di folder ini, lalu daftarkan path-nya di
`data/campusRoadshow.ts` pada properti `logo`.

## Cara menambahkan

1. Simpan logo di sini dengan nama sesuai slug agenda, misalnya:
   - `itb.png`
   - `undip.png`
2. Buka `data/campusRoadshow.ts`, cari agenda yang sesuai, lalu isi:

   ```ts
   {
     slug: "itb",
     campus: "Institut Teknologi Bandung",
     campusShort: "ITB",
     logo: "/logos/itb.png",   // <- ubah dari "" jadi path ini
     ...
   }
   ```

Selama `logo` masih kosong, situs menampilkan monogram inisial kampus
(mis. kotak bertuliskan **ITB**) supaya tata letak tetap rapi.

## Saran teknis

| Hal | Anjuran |
| --- | --- |
| Format | PNG dengan latar transparan, atau SVG |
| Ukuran | Sisi terpanjang sekitar 512 px sudah cukup |
| Bentuk | Logo ditampilkan di kotak putih, jadi logo berwarna gelap paling terbaca |
| Ukuran berkas | Usahakan di bawah 200 KB per logo |

## Catatan hak cipta

Logo perguruan tinggi umumnya dilindungi sebagai merek. Pastikan panitia
sudah mendapat izin penggunaan dari pihak kampus, dan pakai berkas resmi
dari mereka — bukan hasil unduhan sembarangan dari internet.
