import type { FormField } from "@/components/RegistrationForm";

/** Status yang memunculkan pertanyaan institusi & jurusan. */
export const STUDENT_STATUSES = [
  "Undergraduate Student",
  "Postgraduate Student",
  "Fresh Graduate",
  "High School Student",
];

export const OTHER_STATUS = "Other";

export const CURRENT_STATUS_OPTIONS = [...STUDENT_STATUSES, OTHER_STATUS];

/** Dipakai untuk field yang belum diumumkan panitia. */
export const TBA = "To be announced";

export interface RoadshowAgenda {
  /** Bagian URL: /registration/campus-roadshow/<slug> */
  slug: string;
  campus: string;
  /** Singkatan kampus, dipakai sebagai monogram kalau logo belum ada. */
  campusShort: string;
  /**
   * Path logo kampus di folder public, mis. "/logos/itb.png".
   * Biarkan kosong kalau berkasnya belum ada — otomatis diganti
   * monogram inisial kampus. Lihat public/logos/README.md.
   */
  logo: string;
  /** Judul talkshow. Isi TBA kalau temanya belum ditentukan. */
  title: string;
  subtitle: string;
  /** Paragraf penjelasan. Boleh kosong kalau materinya belum ada. */
  paragraphs: string[];
  date: string;
  time: string;
  venue: string;
  /** false = kartu tampil sebagai "Coming Soon", tanpa halaman & formulir. */
  registrationOpen: boolean;
  /** Link undangan WhatsApp Community khusus agenda ini. */
  whatsappCommunityUrl: string;
}

/**
 * DAFTAR AGENDA CAMPUS ROADSHOW
 *
 * Untuk menambah kampus baru: salin salah satu objek di bawah, ganti
 * slug/campus/logo/tema, lalu set registrationOpen sesuai kesiapan.
 * Halaman penjelasan dan formulirnya terbentuk otomatis.
 */
export const roadshowAgendas: RoadshowAgenda[] = [
  {
    slug: "itb",
    campus: "Institut Teknologi Bandung",
    campusShort: "ITB",
    logo: "",
    title: "Space Above, Power Below: Rooftop Solar PV in Cities",
    subtitle: "From Idle Rooftops to Urban Power: Scaling Solar PV Across Indonesian Cities",
    paragraphs: [
      "Green Impact Festival 2026 presents the Campus Roadshow at Institut Teknologi Bandung, an interactive talkshow exploring the potential of rooftop solar PV in Indonesian cities.",
      "Through insights from academic and industry experts, participants will explore rooftop solar implementation, urban energy readiness, project development, and the role of youth in accelerating Indonesia's clean energy transition.",
    ],
    date: TBA,
    time: TBA,
    venue: TBA,
    registrationOpen: true,
    whatsappCommunityUrl: "",
  },
  {
    slug: "undip",
    campus: "Universitas Diponegoro",
    campusShort: "UNDIP",
    logo: "",
    title: TBA,
    subtitle: "Tema talkshow akan diumumkan panitia",
    paragraphs: [],
    date: TBA,
    time: TBA,
    venue: TBA,
    registrationOpen: true,
    whatsappCommunityUrl: "",
  },
  {
    slug: "coming-soon",
    campus: "Kampus Berikutnya",
    campusShort: "GIF",
    logo: "",
    title: TBA,
    subtitle: "Kampus tujuan berikutnya akan diumumkan",
    paragraphs: [],
    date: TBA,
    time: TBA,
    venue: TBA,
    registrationOpen: false,
    whatsappCommunityUrl: "",
  },
];

export function findAgenda(slug: string): RoadshowAgenda | undefined {
  return roadshowAgendas.find((agenda) => agenda.slug === slug);
}

/** Hanya agenda yang pendaftarannya sudah dibuka. */
export const openAgendas = roadshowAgendas.filter((agenda) => agenda.registrationOpen);

export const roadshowInfo = {
  code: "Campus Roadshow",
  intro:
    "Campus Roadshow Green Impact Festival 2026 adalah rangkaian kunjungan ke berbagai kampus di Indonesia. Setiap kampus punya tema talkshow dan jadwal sendiri, jadi pendaftarannya dibuka terpisah per agenda.",
  price: "Free Registration",
  formIntro: "Please fill in the registration form below with accurate information.",
  ctaLabel: "Register Now",
};

export const roadshowFormFields: FormField[] = [
  {
    name: "fullName",
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
  },
  {
    name: "whatsapp",
    label: "WhatsApp Number",
    type: "tel",
    required: true,
    placeholder: "081234567890",
    pattern: "^08[0-9]{8,13}$",
    helpText: "Diawali 08, tanpa spasi atau tanda hubung. Contoh: 081234567890",
  },
  {
    name: "currentStatus",
    label: "Current Status",
    type: "radio",
    required: true,
    options: CURRENT_STATUS_OPTIONS,
  },

  // --- Muncul hanya kalau memilih "Other" -----------------------------
  {
    name: "otherStatus",
    label: "Please Specify",
    type: "text",
    required: true,
    placeholder: "Job title, nama organisasi, atau asal instansi",
    helpText: "Misalnya: Content Strategist di PT Contoh, atau anggota Komunitas Bumi Lestari.",
    showIf: { field: "currentStatus", values: [OTHER_STATUS] },
  },

  // --- Muncul untuk pelajar, mahasiswa, dan fresh graduate ------------
  {
    name: "institution",
    label: "University / Institution / School",
    type: "text",
    required: true,
    placeholder: "Nama kampus atau sekolah",
    showIf: { field: "currentStatus", values: STUDENT_STATUSES },
  },
  {
    name: "major",
    label: "Major",
    type: "text",
    required: true,
    placeholder: "Jurusan atau program studi",
    helpText: "Untuk siswa SMA/sederajat, isi dengan jurusan seperti IPA, IPS, atau Bahasa.",
    showIf: { field: "currentStatus", values: STUDENT_STATUSES },
  },

  {
    name: "source",
    label: "How Did You Hear About This Event?",
    type: "radio",
    required: true,
    options: [
      "Social Media GIF and SRE",
      "Friends or family",
      "Kampus atau organisasi kemahasiswaan",
      "Media Partner of GIF",
      "Other",
    ],
  },
];

/** Teks konfirmasi setelah pendaftaran berhasil, disesuaikan per kampus. */
export function roadshowSuccessCopy(agenda: RoadshowAgenda) {
  return {
    heading: "Registration Successful! 🎉",
    thanks: `Thank you for registering for the Green Impact Festival 2026 Campus Roadshow at ${agenda.campus}!`,
    recorded: "Your registration has been successfully recorded.",
    followUp:
      "Further event information and important updates will be sent to your registered email address and WhatsApp community.",
    communityHeading: "📢 Don't miss any updates!",
    communityInvite: `Please join the GIF Campus Roadshow ${agenda.campusShort} WhatsApp Community through the link below:`,
    communityPurpose:
      "The WhatsApp Community will be used to share important announcements, reminders, and event-related information leading up to the roadshow.",
    communityReminder: "Please make sure to join the community after completing your registration.",
    closing: "See you at the GIF 2026 Campus Roadshow!",
  };
}
