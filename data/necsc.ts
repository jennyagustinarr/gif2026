import type { FormField } from "@/components/RegistrationForm";

export const necscInfo = {
  code: "NECSC'26",
  fullName: "National Energy, Climate, and Sustainability Competition",
  theme: "Empowering Youth to Build Resilient Futures through Sustainable System",
  intro:
    "NECSC 2026 merupakan kompetisi artikel ilmiah nasional yang diselenggarakan sebagai bagian dari rangkaian Green Impact Festival 2026. Program ini menjadi wadah bagi pelajar dan mahasiswa Indonesia untuk menuangkan gagasan, analisis, serta solusi inovatif terhadap berbagai tantangan keberlanjutan melalui pendekatan systemic thinking.",
  description:
    'Mengusung tema utama "Empowering Youth to Build Resilient Futures through Sustainable System", NECSC 2026 mendorong generasi muda untuk memahami keterkaitan antara energi, pangan, air, serta ekonomi biru dan hijau dalam membangun Indonesia yang tangguh dan berkelanjutan.',
  subthemes: [
    {
      title: "Renewable Energy for Community",
      description: "Akses energi bersih yang adil dan merata bagi masyarakat.",
    },
    {
      title: "Sustainable Agriculture",
      description: "Inovasi sistem pangan lokal yang tangguh terhadap perubahan iklim.",
    },
    {
      title: "Water & Climate Resilience",
      description: "Ketahanan air dalam menghadapi urbanisasi dan perubahan iklim.",
    },
    {
      title: "Circular & Blue Economy",
      description: "Model ekonomi regeneratif berbasis sumber daya alam dan ekonomi sirkular.",
    },
  ],
  mechanism: [
    {
      stage: "Tahap 1 - Seleksi Abstrak",
      description:
        "Peserta mengumpulkan abstrak (200-300 kata) sesuai subtema pilihan. Top 15 per subtema kategori University dan 5 per subtema kategori SMA/K lolos ke tahap berikutnya.",
    },
    {
      stage: "Tahap 2 - Final Stage",
      description:
        "Finalis mengumpulkan artikel ilmiah lengkap (maks. 8.000 karakter) beserta video singkat. Pemenang ditentukan dari kualitas tulisan, kedalaman analisis, dan orisinalitas gagasan, lalu diumumkan pada malam Awarding.",
    },
  ],
  totalPrize: "Rp 52.000.000,00",
  prizeBreakdown: [
    "1st Winner kategori Mahasiswa - Rp 8.000.000,00 / subtema",
    "1st Winner kategori SMA/MA/MK - Rp 5.000.000,00 / subtema",
    "Trofi & sertifikat resmi bertaraf nasional",
    "Peluang jaringan nasional dengan akademisi, praktisi, dan mitra sustainability",
    "Publikasi karya & profil pemenang di kanal resmi SRE Indonesia dan Green Impact Festival",
  ],
  // Excel cuma kasih grid mingguan (W1-W4) per bulan, bukan tanggal pasti.
  // Ganti dengan tanggal presisi begitu sudah fix.
  timeline: [
    { label: "Registration & Open Call", date: "Agustus 2026" },
    { label: "Kurasi Abstrak", date: "September 2026" },
    { label: "Pengumuman Finalis", date: "September 2026" },
    { label: "Pengumpulan Full Paper & Video", date: "Oktober 2026" },
    { label: "Cek Plagiarisme & Kurasi Akhir", date: "Oktober 2026" },
    { label: "Awarding", date: "November 2026" },
  ],
  requirements: [
    "Bersifat individu, terbuka bagi mahasiswa aktif perguruan tinggi terakreditasi (dibuktikan KTM/surat keterangan aktif).",
    "Terbuka juga bagi siswa aktif SMA/MA sederajat (dibuktikan kartu pelajar/surat keterangan aktif sekolah).",
    "Wajib memilih satu subtema dari pilihan yang tersedia.",
    "Karya harus orisinal, belum pernah diikutsertakan di kompetisi lain.",
    "Setiap peserta hanya boleh mengirimkan satu artikel ilmiah.",
    "Wajib follow @sreindonesia dan @greenimpactfestival, serta membagikan Twibbon dan poster NECSC 2026.",
  ],
};

export const necscFormFields: FormField[] = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  {
    name: "institution",
    label: "Institution / University",
    type: "text",
    required: true,
  },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel", required: true },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: ["University Student", "High School Student (SMA / MA / SMK)"],
  },
  {
    name: "subtheme",
    label: "Sub-Theme",
    type: "select",
    required: true,
    options: necscInfo.subthemes.map((sub) => sub.title),
  },
  {
    name: "ktmFile",
    label: "Upload Student ID (KTM / KTP)",
    type: "file",
    required: true,
  },
  {
    name: "twibbonProof",
    label: "Twibbon Proof",
    type: "file",
    required: true,
  },
  {
    name: "followProof",
    label: "Follow Proof (@greenimpactfestival & @sreindonesia)",
    type: "file",
    required: true,
  },
  {
    name: "abstractFile",
    label: "Upload Abstract",
    type: "file",
    required: true,
  },
  {
    name: "source",
    label: "Where did you know NECSC and GIF 2026?",
    type: "radio",
    required: true,
    options: [
      "Social Media GIF and SRE",
      "Friends or family",
      "Campus Roadshow GIF 2026",
      "Media Partner of GIF",
      "Other",
    ],
  },
];
