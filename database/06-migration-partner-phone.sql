-- =====================================================================
--  MIGRASI: tambah kolom nomor handphone di partnership_inquiries
--
--  Jalankan HANYA kalau database sudah pernah di-import sebelum kolom
--  `phone` ada di formulir Partner Inquiries. Untuk instalasi baru,
--  01-schema.sql sudah memuatnya.
--
--  Tidak menghapus data apa pun. Baris lama akan berisi NULL di kolom
--  baru ini, yang wajar karena saat itu nomornya memang belum diminta.
--
--  Catatan: sintaks ADD COLUMN IF NOT EXISTS didukung MariaDB (bawaan
--  XAMPP). Kalau server memakai MySQL asli dan menolak sintaks ini,
--  hapus bagian "IF NOT EXISTS" lalu jalankan sekali saja.
-- =====================================================================

USE `green_impact_festival`;

ALTER TABLE `partnership_inquiries`
  ADD COLUMN IF NOT EXISTS `phone` VARCHAR(30) NULL
  COMMENT 'Nomor handphone / WhatsApp PIC'
  AFTER `email`;

-- Verifikasi
SELECT 'Migrasi selesai' AS info;
SHOW COLUMNS FROM `partnership_inquiries` LIKE 'phone';
