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

/**
 * TODO PANITIA — tiga nilai di bawah masih placeholder.
 * Ganti begitu tanggal, jam, dan lokasi sudah pasti. Nilainya otomatis
 * dipakai di halaman pendaftaran maupun di layar konfirmasi.
 */
export const roadshowEventDetails = {
  date: "To be announced",
  time: "To be announced",
  venue: "To be announced",
};

/**
 * TODO PANITIA — tempel link undangan WhatsApp Community di sini.
 * Selama masih kosong, halaman konfirmasi menampilkan catatan bahwa
 * link akan dikirim lewat email, bukan tombol yang mengarah ke mana-mana.
 */
export const whatsappCommunityUrl = "";

export const roadshowInfo = {
  code: "Campus Roadshow",
  campus: "Institut Teknologi Bandung",
  title: "Space Above, Power Below: Rooftop Solar PV in Cities",
  subtitle: "From Idle Rooftops to Urban Power: Scaling Solar PV Across Indonesian Cities",
  paragraphs: [
    "Green Impact Festival 2026 presents the Campus Roadshow at Institut Teknologi Bandung, an interactive talkshow exploring the potential of rooftop solar PV in Indonesian cities.",
    "Through insights from academic and industry experts, participants will explore rooftop solar implementation, urban energy readiness, project development, and the role of youth in accelerating Indonesia's clean energy transition.",
  ],
  price: "Free Registration",
  formIntro: "Please fill in the registration form below with accurate information.",
  ctaLabel: "Register Now",
};

/** Teks yang tampil setelah pendaftaran berhasil dikirim. */
export const roadshowSuccess = {
  heading: "Registration Successful! 🎉",
  thanks:
    "Thank you for registering for the Green Impact Festival 2026 Campus Roadshow at Institut Teknologi Bandung!",
  recorded: "Your registration has been successfully recorded.",
  followUp:
    "Further event information and important updates will be sent to your registered email address and WhatsApp community.",
  communityHeading: "📢 Don't miss any updates!",
  communityInvite:
    "Please join the GIF Flagship Campus Roadshow ITB WhatsApp Community through the link below:",
  communityPurpose:
    "The WhatsApp Community will be used to share important announcements, reminders, and event-related information leading up to the roadshow.",
  communityReminder: "Please make sure to join the community after completing your registration.",
  closing: "See you at the GIF 2026 Campus Roadshow!",
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
