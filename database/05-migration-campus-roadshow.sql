-- =====================================================================
--  MIGRASI: tambah Campus Roadshow, pensiunkan Expo
--
--  Jalankan file ini HANYA kalau database `green_impact_festival` sudah
--  pernah di-import sebelum program Campus Roadshow ada. Untuk instalasi
--  baru, cukup pakai 01-schema.sql yang sudah memuat semuanya.
--
--  File ini TIDAK menghapus data apa pun. Tabel `expo_registrations`
--  sengaja dibiarkan utuh — lihat bagian terakhir kalau memang mau
--  dihapus setelah datanya diekspor.
-- =====================================================================

USE `green_impact_festival`;

-- 1. Tabel baru --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `campus_roadshow_registrations` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name`      VARCHAR(150) NOT NULL,
  `email`          VARCHAR(150) NOT NULL,
  `whatsapp`       VARCHAR(30)  NOT NULL COMMENT 'Format lokal diawali 08',
  `current_status` VARCHAR(60)  NOT NULL
                   COMMENT 'Undergraduate Student | Postgraduate Student | Fresh Graduate | High School Student | Other',
  `other_status`   VARCHAR(200) NULL COMMENT 'Diisi kalau current_status = Other',
  `institution`    VARCHAR(200) NULL COMMENT 'Kampus / sekolah',
  `major`          VARCHAR(150) NULL COMMENT 'Jurusan / program studi',
  `source`         VARCHAR(80)  NULL,
  `status`         ENUM('baru','dikonfirmasi','hadir','batal') NOT NULL DEFAULT 'baru',
  `attended`       TINYINT(1)   NOT NULL DEFAULT 0,
  `checkin_at`     DATETIME     NULL,
  `notes`          TEXT         NULL,
  `ip_address`     VARCHAR(45)  NULL,
  `created_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_roadshow_email` (`email`),
  KEY `idx_roadshow_status`   (`current_status`),
  KEY `idx_roadshow_attended` (`attended`),
  KEY `idx_roadshow_created`  (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Pendaftaran Campus Roadshow';


-- 2. Perbarui view: Expo keluar, Campus Roadshow masuk -----------------
CREATE OR REPLACE VIEW `v_semua_pendaftar` AS
  SELECT 'NECSC'            AS program, `id`, `full_name` AS nama, `email`, `institution` AS asal, `created_at`
    FROM `necsc_registrations`
  UNION ALL
  SELECT 'Youth Ambassador' AS program, `id`, `full_name`, `email`, `institution`, `created_at`
    FROM `youth_ambassador_registrations`
  UNION ALL
  SELECT 'Campus Roadshow'  AS program, `id`, `full_name`, `email`,
         COALESCE(`institution`, `other_status`), `created_at`
    FROM `campus_roadshow_registrations`
  UNION ALL
  SELECT 'Seminar'          AS program, `id`, `full_name`, `email`, `institution`, `created_at`
    FROM `seminar_registrations`
  UNION ALL
  SELECT 'Partnership'      AS program, `id`, `name`, `email`, `name`, `created_at`
    FROM `partnership_inquiries`;

CREATE OR REPLACE VIEW `v_roadshow_per_status` AS
  SELECT `current_status`  AS `status_peserta`,
         COUNT(*)          AS `jumlah`,
         SUM(`attended`)   AS `hadir`
    FROM `campus_roadshow_registrations`
   GROUP BY `current_status`
   ORDER BY `jumlah` DESC;


-- 3. Verifikasi --------------------------------------------------------
SELECT 'Migrasi selesai' AS info;
SHOW TABLES LIKE 'campus_roadshow_registrations';
SELECT * FROM `v_rekap_program`;


-- =====================================================================
--  OPSIONAL — menghapus tabel Expo
--
--  Program Expo sudah tidak ada di situs, tapi tabelnya dibiarkan supaya
--  data lama tidak hilang begitu saja. Ekspor dulu isinya lewat
--  phpMyAdmin (tab Export) kalau masih dibutuhkan, baru hapus tanda
--  komentar di bawah ini.
-- =====================================================================
-- DROP TABLE IF EXISTS `expo_registrations`;
