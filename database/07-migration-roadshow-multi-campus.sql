-- =====================================================================
--  MIGRASI: Campus Roadshow jadi multi-agenda (per kampus)
--
--  Sebelumnya Campus Roadshow hanya satu acara di ITB, sehingga email
--  cukup unik secara global. Sekarang roadshow diadakan di beberapa
--  kampus, jadi satu orang boleh mendaftar di lebih dari satu kampus,
--  tapi tetap hanya sekali per kampus.
--
--  Yang dilakukan file ini:
--    1. Menambah kolom `campus` (slug agenda: itb, undip, dst)
--    2. Mengisi baris lama dengan 'itb', karena saat itu hanya ITB
--    3. Mengganti UNIQUE(email) jadi UNIQUE(campus, email)
--    4. Menambah view rekap per kampus
--
--  TIDAK ada data yang dihapus.
--
--  Catatan: sintaks IF NOT EXISTS / IF EXISTS pada ALTER TABLE didukung
--  MariaDB (bawaan XAMPP). Di MySQL asli, hapus bagian tersebut dan
--  jalankan sekali saja.
-- =====================================================================

USE `green_impact_festival`;

-- 1. Kolom baru -------------------------------------------------------
ALTER TABLE `campus_roadshow_registrations`
  ADD COLUMN IF NOT EXISTS `campus` VARCHAR(60) NOT NULL DEFAULT ''
  COMMENT 'Slug agenda: itb, undip, dst'
  AFTER `id`;

-- 2. Baris lama berasal dari roadshow ITB ------------------------------
UPDATE `campus_roadshow_registrations`
   SET `campus` = 'itb'
 WHERE `campus` = '' OR `campus` IS NULL;

-- 3. Ganti aturan email unik ------------------------------------------
ALTER TABLE `campus_roadshow_registrations`
  DROP INDEX IF EXISTS `uq_roadshow_email`;

ALTER TABLE `campus_roadshow_registrations`
  ADD UNIQUE KEY IF NOT EXISTS `uq_roadshow_campus_email` (`campus`, `email`);

ALTER TABLE `campus_roadshow_registrations`
  ADD INDEX IF NOT EXISTS `idx_roadshow_campus` (`campus`);

-- 4. View rekap per kampus --------------------------------------------
CREATE OR REPLACE VIEW `v_roadshow_per_kampus` AS
  SELECT `campus`          AS `kampus`,
         COUNT(*)          AS `jumlah`,
         SUM(`attended`)   AS `hadir`,
         MAX(`created_at`) AS `pendaftar_terakhir`
    FROM `campus_roadshow_registrations`
   GROUP BY `campus`
   ORDER BY `jumlah` DESC;

-- Verifikasi ----------------------------------------------------------
SELECT 'Migrasi selesai' AS info;
SHOW COLUMNS FROM `campus_roadshow_registrations` LIKE 'campus';
SELECT * FROM `v_roadshow_per_kampus`;
