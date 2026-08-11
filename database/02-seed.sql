-- =====================================================================
--  DATA CONTOH (DUMMY) — untuk menguji tampilan & query
--
--  Semua nama di bawah ini fiktif. JANGAN dijalankan di database
--  produksi yang sudah berisi pendaftar asli.
--
--  Jalankan setelah 01-schema.sql.
-- =====================================================================

USE `green_impact_festival`;

-- NECSC ---------------------------------------------------------------
INSERT INTO `necsc_registrations`
  (`full_name`, `institution`, `email`, `phone`, `category`, `subtheme`,
   `ktm_file`, `twibbon_proof`, `follow_proof`, `abstract_file`, `source`, `status`)
VALUES
  ('Peserta Contoh Satu', 'Universitas Contoh', 'peserta1@example.com', '081200000001',
   'Mahasiswa (University)', 'Renewable Energy for Community',
   'ktm-satu.jpg', 'twibbon-satu.jpg', 'follow-satu.jpg', 'abstrak-satu.pdf',
   'Social Media GIF and SRE', 'diverifikasi'),
  ('Peserta Contoh Dua', 'Institut Contoh', 'peserta2@example.com', '081200000002',
   'Mahasiswa (University)', 'Circular & Blue Economy',
   'ktm-dua.jpg', 'twibbon-dua.jpg', 'follow-dua.jpg', 'abstrak-dua.pdf',
   'Campus Roadshow GIF 2026', 'baru'),
  ('Peserta Contoh Tiga', 'SMA Contoh 1', 'peserta3@example.com', '081200000003',
   'SMA / MA / SMK sederajat', 'Sustainable Agriculture',
   'ktm-tiga.jpg', 'twibbon-tiga.jpg', 'follow-tiga.jpg', 'abstrak-tiga.pdf',
   'Friends or family', 'baru')
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP;

-- Youth Ambassador ----------------------------------------------------
INSERT INTO `youth_ambassador_registrations`
  (`full_name`, `institution`, `email`, `phone`, `subtheme`,
   `twibbon_proof`, `follow_proof`, `reels_1_url`, `reels_2_url`, `source`, `status`)
VALUES
  ('Ambassador Contoh Satu', 'Universitas Contoh', 'ya1@example.com', '081300000001',
   'Lifestyle', 'twibbon-ya1.jpg', 'follow-ya1.jpg',
   'https://instagram.com/reel/contoh1', 'https://instagram.com/reel/contoh2',
   'Social Media GIF and SRE', 'shortlist'),
  ('Ambassador Contoh Dua', 'Universitas Contoh Lain', 'ya2@example.com', '081300000002',
   'Community', 'twibbon-ya2.jpg', 'follow-ya2.jpg',
   'https://instagram.com/reel/contoh3', 'https://instagram.com/reel/contoh4',
   'Media Partner of GIF', 'baru')
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP;

-- Campus Roadshow -----------------------------------------------------
INSERT INTO `campus_roadshow_registrations`
  (`full_name`, `email`, `whatsapp`, `current_status`, `other_status`,
   `institution`, `major`, `source`, `status`)
VALUES
  ('Mahasiswa Contoh Satu', 'roadshow1@example.com', '081400000001',
   'Undergraduate Student', NULL, 'Universitas Contoh', 'Teknik Lingkungan',
   'Social Media GIF and SRE', 'baru'),
  ('Pelajar Contoh Dua', 'roadshow2@example.com', '081400000002',
   'High School Student', NULL, 'SMA Contoh 1', 'IPA',
   'Kampus atau organisasi kemahasiswaan', 'dikonfirmasi'),
  ('Profesional Contoh Tiga', 'roadshow3@example.com', '081400000003',
   'Other', 'Content Strategist di PT Contoh Energi', NULL, NULL,
   'Media Partner of GIF', 'baru')
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP;

-- Seminar -------------------------------------------------------------
INSERT INTO `seminar_registrations` (`full_name`, `email`)
VALUES
  ('Pengunjung Contoh Satu', 'seminar1@example.com'),
  ('Pengunjung Contoh Dua',  'seminar2@example.com'),
  ('Pengunjung Contoh Tiga', 'seminar3@example.com')
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP;

-- Partnership ---------------------------------------------------------
INSERT INTO `partnership_inquiries`
  (`name`, `email`, `partnership_type`, `description`, `status`)
VALUES
  ('PT Contoh Energi', 'partner1@example.com', 'sponsorship',
   'Tertarik menjadi sponsor utama dan mengisi sesi talkshow.', 'dihubungi'),
  ('Media Contoh Nasional', 'partner2@example.com', 'media-partner',
   'Menawarkan liputan pra-acara dan hari-H.', 'baru');

-- Cek hasil -----------------------------------------------------------
SELECT * FROM `v_rekap_program`;
