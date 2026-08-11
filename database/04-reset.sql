-- =====================================================================
--  !!! PERINGATAN — FILE INI MENGHAPUS SELURUH DATA !!!
--
--  Menghapus database `green_impact_festival` beserta semua tabel dan
--  isinya, tanpa bisa dibatalkan. Gunakan HANYA saat masih tahap
--  pengembangan, atau setelah kamu punya backup.
--
--  Backup dulu sebelum menjalankan ini:
--    mysqldump -u root green_impact_festival > backup-sebelum-reset.sql
--
--  Setelah dijalankan, import ulang 01-schema.sql untuk membuat
--  struktur yang bersih.
-- =====================================================================

DROP DATABASE IF EXISTS `green_impact_festival`;

-- Kalau hanya ingin mengosongkan isi tabel tanpa menghapus strukturnya,
-- pakai blok di bawah ini (hapus tanda komentar) dan jangan jalankan
-- perintah DROP DATABASE di atas.
--
-- USE `green_impact_festival`;
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE `necsc_registrations`;
-- TRUNCATE TABLE `youth_ambassador_registrations`;
-- TRUNCATE TABLE `campus_roadshow_registrations`;
-- TRUNCATE TABLE `seminar_registrations`;
-- TRUNCATE TABLE `partnership_inquiries`;
-- TRUNCATE TABLE `uploaded_files`;
-- TRUNCATE TABLE `submission_logs`;
-- SET FOREIGN_KEY_CHECKS = 1;
