import type { FormField } from "@/components/RegistrationForm";

/**
 * Data program High Level Dialogue (dulu bernama "Seminar" — nama berkas,
 * rute /registration/seminar, dan tabel database sengaja dipertahankan supaya
 * tautan lama dan data pendaftar yang sudah masuk tidak putus).
 *
 * TODO PANITIA — lengkapi begitu jadwal final diumumkan.
 * Venue sudah pasti; tanggal masih menunggu konfirmasi.
 */
export const seminarEventDetails = {
  venue: "Djakarta Theatre, Jakarta",
  date: "To be announced",
};

/** TODO PANITIA — tempel link undangan WhatsApp Community GIF 2026 di sini. */
export const seminarCommunityUrl = "";

export const seminarInfo = {
  /** Nama program yang tampil ke pengunjung. */
  name: "High Level Dialogue",
  title: "High Level Dialogue Green Impact Festival 2026",
  intro:
    "High Level Dialogue Green Impact Festival 2026 mempertemukan praktisi, akademisi, dan pengambil kebijakan untuk membahas transisi energi, produktivitas ekonomi hijau, dan peran teknologi dalam pembangunan berkelanjutan Indonesia.",
  description:
    "Peserta dapat mengikuti seluruh sesi sepanjang hari, mulai dari panel diskusi lintas sektor hingga malam awarding. Terbuka untuk mahasiswa, pelajar, profesional, dan masyarakat umum.",
  benefits: [
    "Akses ke seluruh sesi High Level Dialogue sepanjang hari",
    "E-sertifikat kehadiran",
    "Kesempatan berjejaring dengan pembicara dan peserta lain",
    "Informasi langsung seputar program GIF 2026 lainnya",
  ],
};

export const seminarFormFields: FormField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Nama lengkap sesuai identitas",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "nama@example.com",
    helpText: "Informasi acara akan dikirim ke alamat ini, pastikan aktif.",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "081234567890",
    helpText: "Nomor yang bisa dihubungi lewat WhatsApp.",
  },
  {
    name: "institution",
    label: "Institution",
    type: "text",
    required: true,
    placeholder: "Nama kampus, sekolah, perusahaan, atau komunitas",
  },
];

/** Teks yang tampil setelah pendaftaran High Level Dialogue berhasil dikirim. */
export const seminarSuccess = {
  heading: "Registration Submitted!",
  thanks: "Thank you for registering for Green Impact Festival 2026.",
  inbox:
    "Further event information will be sent to your registered email address, so please check your inbox regularly.",
  communityInvite:
    "For reminders and the latest event updates, join our GIF 2026 WhatsApp Community below:",
  closing: "See you at Green Impact Festival 2026.",
};
