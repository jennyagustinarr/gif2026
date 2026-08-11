-- =====================================================================
--  GREEN IMPACT FESTIVAL 2026 — SKEMA DATABASE
--  Target: MySQL 5.7+ / MariaDB 10.4+ (bawaan XAMPP)
--
--  Cara pakai (phpMyAdmin):
--    Import  ->  pilih file ini  ->  Go
--
--  Cara pakai (terminal):
--    mysql -u root -p < 01-schema.sql
--
--  File ini AMAN dijalankan berulang kali (semua pakai IF NOT EXISTS).
--  Untuk menghapus dan membuat ulang dari nol, pakai 04-reset.sql.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `green_impact_festival`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `green_impact_festival`;


-- ---------------------------------------------------------------------
-- 1. submission_logs
--    Salinan mentah SETIAP kiriman form dalam bentuk JSON.
--    Jadi jaring pengaman: kalau ada field baru di form yang belum punya
--    kolom, datanya tetap tersimpan utuh di sini.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `submission_logs` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `program`     VARCHAR(50)  NOT NULL COMMENT 'necsc | youth-ambassador | campus-roadshow | seminar | partnership',
  `payload`     JSON         NOT NULL COMMENT 'Isi form apa adanya',
  `ip_address`  VARCHAR(45)  NULL,
  `user_agent`  VARCHAR(255) NULL,
  `saved_to`    VARCHAR(50)  NULL COMMENT 'Nama tabel tujuan, NULL kalau gagal',
  `error`       TEXT         NULL COMMENT 'Pesan error kalau penyimpanan gagal',
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_log_program`    (`program`),
  KEY `idx_log_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Log mentah semua kiriman form';


-- ---------------------------------------------------------------------
-- 2. necsc_registrations
--    National Energy, Climate, and Sustainability Competition 2026
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `necsc_registrations` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name`      VARCHAR(150) NOT NULL,
  `institution`    VARCHAR(200) NOT NULL COMMENT 'Asal sekolah / universitas',
  `email`          VARCHAR(150) NOT NULL,
  `phone`          VARCHAR(30)  NOT NULL,
  `category`       VARCHAR(60)  NULL COMMENT 'Mahasiswa (University) | SMA / MA / SMK sederajat',
  `subtheme`       VARCHAR(80)  NULL COMMENT 'Subtema pilihan peserta',

  -- CATATAN: kolom *_file di bawah saat ini menyimpan NAMA FILE saja,
  -- karena form belum mengunggah isi filenya. Begitu upload sungguhan
  -- diaktifkan, isinya jadi path relatif ke file tersimpan.
  `ktm_file`       VARCHAR(255) NULL COMMENT 'KTM / KTP',
  `twibbon_proof`  VARCHAR(255) NULL,
  `follow_proof`   VARCHAR(255) NULL,
  `abstract_file`  VARCHAR(255) NULL COMMENT 'Berkas abstrak 200-300 kata',

  `source`         VARCHAR(80)  NULL COMMENT 'Tahu NECSC dari mana',
  `status`         ENUM('baru','diverifikasi','lolos_abstrak','finalis','ditolak')
                   NOT NULL DEFAULT 'baru',
  `notes`          TEXT         NULL COMMENT 'Catatan internal panitia',
  `ip_address`     VARCHAR(45)  NULL,
  `created_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  -- Aturan lomba: satu peserta hanya boleh mengirim satu artikel.
  UNIQUE KEY `uq_necsc_email` (`email`),
  KEY `idx_necsc_status`   (`status`),
  KEY `idx_necsc_subtheme` (`subtheme`),
  KEY `idx_necsc_created`  (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Pendaftaran NECSC 2026';


-- ---------------------------------------------------------------------
-- 3. youth_ambassador_registrations
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `youth_ambassador_registrations` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name`      VARCHAR(150) NOT NULL,
  `institution`    VARCHAR(200) NOT NULL COMMENT 'Sekolah / universitas / instansi',
  `email`          VARCHAR(150) NOT NULL,
  `phone`          VARCHAR(30)  NOT NULL,
  `subtheme`       VARCHAR(60)  NULL COMMENT 'Lifestyle | Community | Green Career',
  `twibbon_proof`  VARCHAR(255) NULL,
  `follow_proof`   VARCHAR(255) NULL,
  `reels_1_url`    VARCHAR(500) NULL,
  `reels_2_url`    VARCHAR(500) NULL,
  `source`         VARCHAR(80)  NULL,
  `status`         ENUM('baru','diverifikasi','shortlist','terpilih','ditolak')
                   NOT NULL DEFAULT 'baru',
  `score`          DECIMAL(5,2) NULL COMMENT 'Nilai juri, kalau dipakai',
  `notes`          TEXT         NULL,
  `ip_address`     VARCHAR(45)  NULL,
  `created_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ya_email` (`email`),
  KEY `idx_ya_status`   (`status`),
  KEY `idx_ya_subtheme` (`subtheme`),
  KEY `idx_ya_created`  (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Pendaftaran Youth Ambassador 2026';


-- ---------------------------------------------------------------------
-- 4. campus_roadshow_registrations
--    Kolom `institution` dan `major` hanya terisi untuk peserta berstatus
--    pelajar/mahasiswa/fresh graduate; `other_status` hanya terisi kalau
--    peserta memilih "Other". Aturan ini mengikuti form di situs.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `campus_roadshow_registrations` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name`      VARCHAR(150) NOT NULL,
  `email`          VARCHAR(150) NOT NULL,
  `whatsapp`       VARCHAR(30)  NOT NULL COMMENT 'Format lokal diawali 08',
  `current_status` VARCHAR(60)  NOT NULL
                   COMMENT 'Undergraduate Student | Postgraduate Student | Fresh Graduate | High School Student | Other',
  `other_status`   VARCHAR(200) NULL COMMENT 'Diisi kalau current_status = Other',
  `institution`    VARCHAR(200) NULL COMMENT 'Kampus / sekolah, untuk status pelajar & mahasiswa',
  `major`          VARCHAR(150) NULL COMMENT 'Jurusan / program studi',
  `source`         VARCHAR(80)  NULL COMMENT 'Tahu acara ini dari mana',
  `status`         ENUM('baru','dikonfirmasi','hadir','batal') NOT NULL DEFAULT 'baru',
  `attended`       TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '1 = hadir saat hari-H',
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


-- ---------------------------------------------------------------------
-- 5. seminar_registrations
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `seminar_registrations` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name`   VARCHAR(150) NOT NULL,
  `email`       VARCHAR(150) NOT NULL,
  `phone`       VARCHAR(30)  NULL,
  `institution` VARCHAR(200) NULL,
  `attended`    TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '1 = hadir saat hari-H',
  `checkin_at`  DATETIME     NULL,
  `ip_address`  VARCHAR(45)  NULL,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_seminar_email` (`email`),
  KEY `idx_seminar_attended` (`attended`),
  KEY `idx_seminar_created`  (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Pendaftaran peserta seminar';


-- ---------------------------------------------------------------------
-- 6. partnership_inquiries
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `partnership_inquiries` (
  `id`                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`              VARCHAR(200) NOT NULL COMMENT 'Nama / brand',
  `email`             VARCHAR(150) NOT NULL,
  `phone`             VARCHAR(30)  NULL COMMENT 'Nomor handphone / WhatsApp PIC',
  `partnership_type`  VARCHAR(60)  NULL COMMENT 'sponsorship | community-partner | media-partner | other',
  `description`       TEXT         NULL,
  `status`            ENUM('baru','dihubungi','deal','ditolak') NOT NULL DEFAULT 'baru',
  `notes`             TEXT         NULL,
  `ip_address`        VARCHAR(45)  NULL,
  `created_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_partner_status` (`status`),
  KEY `idx_partner_type`   (`partnership_type`),
  KEY `idx_partner_created`(`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Permohonan kemitraan / sponsorship';


-- ---------------------------------------------------------------------
-- 7. uploaded_files
--    Disiapkan untuk saat upload file sungguhan diaktifkan.
--    Satu baris = satu berkas milik satu pendaftaran.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `uploaded_files` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `program`        VARCHAR(50)  NOT NULL,
  `registration_id`INT UNSIGNED NOT NULL COMMENT 'ID di tabel pendaftaran terkait',
  `field_name`     VARCHAR(60)  NOT NULL COMMENT 'ktmFile, abstractFile, dst',
  `original_name`  VARCHAR(255) NOT NULL,
  `stored_path`    VARCHAR(500) NOT NULL,
  `mime_type`      VARCHAR(120) NULL,
  `size_bytes`     INT UNSIGNED NULL,
  `created_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_file_owner` (`program`, `registration_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Metadata berkas unggahan peserta';


-- =====================================================================
--  VIEW — mempermudah rekap tanpa menulis ulang query panjang
-- =====================================================================

-- Semua pendaftar dari seluruh program dalam satu daftar
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

-- Jumlah pendaftar per program
CREATE OR REPLACE VIEW `v_rekap_program` AS
  SELECT `program`, COUNT(*) AS `jumlah`, MAX(`created_at`) AS `pendaftar_terakhir`
    FROM `v_semua_pendaftar`
   GROUP BY `program`;

-- Sebaran peserta NECSC per subtema dan kategori
CREATE OR REPLACE VIEW `v_necsc_per_subtema` AS
  SELECT COALESCE(`subtheme`, '(belum diisi)') AS `subtema`,
         COALESCE(`category`, '(belum diisi)') AS `kategori`,
         COUNT(*)                              AS `jumlah`
    FROM `necsc_registrations`
   GROUP BY `subtheme`, `category`
   ORDER BY `subtema`, `kategori`;

-- Sebaran Youth Ambassador per subtema
CREATE OR REPLACE VIEW `v_ya_per_subtema` AS
  SELECT COALESCE(`subtheme`, '(belum diisi)') AS `subtema`,
         COUNT(*)                              AS `jumlah`
    FROM `youth_ambassador_registrations`
   GROUP BY `subtheme`
   ORDER BY `jumlah` DESC;

-- Sebaran peserta Campus Roadshow per status
CREATE OR REPLACE VIEW `v_roadshow_per_status` AS
  SELECT `current_status`  AS `status_peserta`,
         COUNT(*)          AS `jumlah`,
         SUM(`attended`)   AS `hadir`
    FROM `campus_roadshow_registrations`
   GROUP BY `current_status`
   ORDER BY `jumlah` DESC;
