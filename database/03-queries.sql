-- =====================================================================
--  KUMPULAN QUERY SIAP PAKAI UNTUK PANITIA
--
--  Jalankan satu per satu di tab SQL phpMyAdmin sesuai kebutuhan.
--  File ini tidak untuk di-import sekaligus.
-- =====================================================================

USE `green_impact_festival`;


-- ---------------------------------------------------------------------
-- REKAP CEPAT
-- ---------------------------------------------------------------------

-- Jumlah pendaftar semua program
SELECT * FROM `v_rekap_program`;

-- Total keseluruhan pendaftar
SELECT COUNT(*) AS `total_pendaftar` FROM `v_semua_pendaftar`;

-- Pendaftar terbaru (50 terakhir, semua program)
SELECT * FROM `v_semua_pendaftar` ORDER BY `created_at` DESC LIMIT 50;

-- Pendaftaran per hari — untuk grafik tren
SELECT DATE(`created_at`) AS `tanggal`, `program`, COUNT(*) AS `jumlah`
  FROM `v_semua_pendaftar`
 GROUP BY DATE(`created_at`), `program`
 ORDER BY `tanggal` DESC;


-- ---------------------------------------------------------------------
-- NECSC
-- ---------------------------------------------------------------------

-- Sebaran per subtema & kategori
SELECT * FROM `v_necsc_per_subtema`;

-- Daftar lengkap siap ekspor ke Excel
SELECT `id`            AS `No`,
       `full_name`     AS `Nama Lengkap`,
       `institution`   AS `Asal Institusi`,
       `email`         AS `Email`,
       `phone`         AS `No. HP`,
       `category`      AS `Kategori`,
       `subtheme`      AS `Subtema`,
       `abstract_file` AS `Berkas Abstrak`,
       `status`        AS `Status`,
       `created_at`    AS `Waktu Daftar`
  FROM `necsc_registrations`
 ORDER BY `created_at` ASC;

-- Yang belum diverifikasi panitia
SELECT `id`, `full_name`, `institution`, `email`, `created_at`
  FROM `necsc_registrations`
 WHERE `status` = 'baru'
 ORDER BY `created_at` ASC;

-- Berkas yang belum lengkap (ada kolom kosong)
SELECT `id`, `full_name`, `email`,
       `ktm_file`, `twibbon_proof`, `follow_proof`, `abstract_file`
  FROM `necsc_registrations`
 WHERE `ktm_file`      IS NULL OR `ktm_file`      = ''
    OR `twibbon_proof` IS NULL OR `twibbon_proof` = ''
    OR `follow_proof`  IS NULL OR `follow_proof`  = ''
    OR `abstract_file` IS NULL OR `abstract_file` = '';

-- Ubah status peserta jadi lolos abstrak (ganti ID-nya)
-- UPDATE `necsc_registrations` SET `status` = 'lolos_abstrak' WHERE `id` = 1;


-- ---------------------------------------------------------------------
-- YOUTH AMBASSADOR
-- ---------------------------------------------------------------------

-- Sebaran per subtema
SELECT * FROM `v_ya_per_subtema`;

-- Daftar lengkap + link reels
SELECT `id`          AS `No`,
       `full_name`   AS `Nama`,
       `institution` AS `Asal`,
       `email`       AS `Email`,
       `phone`       AS `No. HP`,
       `subtheme`    AS `Subtema`,
       `reels_1_url` AS `Reels 1`,
       `reels_2_url` AS `Reels 2`,
       `score`       AS `Nilai`,
       `status`      AS `Status`
  FROM `youth_ambassador_registrations`
 ORDER BY `score` DESC, `created_at` ASC;

-- Kandidat terpilih per subtema (3 Lifestyle, 3 Community, 2 Green Career)
SELECT `subtheme`, `full_name`, `score`, `status`
  FROM `youth_ambassador_registrations`
 WHERE `status` IN ('shortlist', 'terpilih')
 ORDER BY `subtheme`, `score` DESC;


-- ---------------------------------------------------------------------
-- CAMPUS ROADSHOW
-- ---------------------------------------------------------------------

-- Sebaran peserta per status
SELECT * FROM `v_roadshow_per_status`;

-- Daftar lengkap siap ekspor ke Excel
SELECT `id`                                        AS `No`,
       `full_name`                                 AS `Nama Lengkap`,
       `email`                                     AS `Email`,
       `whatsapp`                                  AS `WhatsApp`,
       `current_status`                            AS `Status`,
       COALESCE(`institution`, `other_status`)     AS `Institusi / Keterangan`,
       COALESCE(`major`, '-')                      AS `Jurusan`,
       `source`                                    AS `Tahu Dari`,
       IF(`attended` = 1, 'Hadir', 'Belum')        AS `Kehadiran`,
       `created_at`                                AS `Waktu Daftar`
  FROM `campus_roadshow_registrations`
 ORDER BY `created_at` ASC;

-- Hanya peserta dari kalangan pelajar & mahasiswa
SELECT `full_name`, `institution`, `major`, `current_status`
  FROM `campus_roadshow_registrations`
 WHERE `current_status` <> 'Other'
 ORDER BY `institution`, `full_name`;

-- Peserta dari kalangan umum / profesional
SELECT `full_name`, `other_status`, `email`, `whatsapp`
  FROM `campus_roadshow_registrations`
 WHERE `current_status` = 'Other'
 ORDER BY `created_at`;

-- Kampus/sekolah dengan peserta terbanyak
SELECT `institution`, COUNT(*) AS `jumlah`
  FROM `campus_roadshow_registrations`
 WHERE `institution` IS NOT NULL
 GROUP BY `institution`
 ORDER BY `jumlah` DESC;

-- Tandai peserta hadir saat check-in (ganti emailnya)
-- UPDATE `campus_roadshow_registrations`
--    SET `attended` = 1, `checkin_at` = NOW(), `status` = 'hadir'
--  WHERE `email` = 'peserta@example.com';


-- ---------------------------------------------------------------------
-- PARTNERSHIP
-- ---------------------------------------------------------------------

SELECT `id`, `name`, `email`, `partnership_type`, `status`, `created_at`
  FROM `partnership_inquiries`
 ORDER BY `created_at` DESC;


-- ---------------------------------------------------------------------
-- SEMINAR (hari-H)
-- ---------------------------------------------------------------------

-- Daftar hadir
SELECT `id`, `full_name`, `email`,
       IF(`attended` = 1, 'Hadir', 'Belum') AS `Kehadiran`, `checkin_at`
  FROM `seminar_registrations`
 ORDER BY `full_name`;

-- Tandai peserta hadir saat check-in (ganti emailnya)
-- UPDATE `seminar_registrations`
--    SET `attended` = 1, `checkin_at` = NOW()
--  WHERE `email` = 'peserta@example.com';

-- Persentase kehadiran
SELECT COUNT(*)                                                  AS `terdaftar`,
       SUM(`attended`)                                           AS `hadir`,
       ROUND(SUM(`attended`) / NULLIF(COUNT(*), 0) * 100, 1)     AS `persen_hadir`
  FROM `seminar_registrations`;


-- ---------------------------------------------------------------------
-- PEMERIKSAAN & TROUBLESHOOTING
-- ---------------------------------------------------------------------

-- Kiriman form yang GAGAL tersimpan ke tabel tujuan
SELECT `id`, `program`, `error`, `created_at`, `payload`
  FROM `submission_logs`
 WHERE `saved_to` IS NULL
 ORDER BY `created_at` DESC;

-- 20 kiriman mentah terakhir
SELECT `id`, `program`, `saved_to`, `created_at`, `payload`
  FROM `submission_logs`
 ORDER BY `created_at` DESC
 LIMIT 20;

-- Deteksi kemungkinan spam: banyak kiriman dari satu IP
SELECT `ip_address`, COUNT(*) AS `jumlah`, MIN(`created_at`) AS `pertama`, MAX(`created_at`) AS `terakhir`
  FROM `submission_logs`
 WHERE `ip_address` IS NOT NULL
 GROUP BY `ip_address`
HAVING COUNT(*) > 5
 ORDER BY `jumlah` DESC;
