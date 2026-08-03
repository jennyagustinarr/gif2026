import type { FormField } from "@/components/RegistrationForm";

export const yaInfo = {
  code: "Youth Ambassador'26",
  theme: "Youth Driving Indonesia's Green Future: Live Green - Lead Change - Power the Future",
  intro:
    "Youth Ambassador Green Impact Festival (GIF) 2026 merupakan program pengembangan generasi muda yang bertujuan menciptakan agen perubahan (change makers) yang mampu menyuarakan isu keberlanjutan melalui media digital dan aksi nyata.",
  description:
    "Program ini mendorong anak muda untuk memahami isu keberlanjutan secara sistemik, memproduksi konten edukatif yang berdampak, serta menggerakkan masyarakat menuju gaya hidup yang lebih berkelanjutan.",
  subthemes: [
    {
      title: "Lifestyle",
      description: "Mendorong perubahan perilaku sehari-hari menuju gaya hidup berkelanjutan.",
    },
    {
      title: "Community",
      description:
        "Mengangkat aksi kolektif dan dampak positif komunitas dalam menciptakan perubahan lingkungan.",
    },
    {
      title: "Green Career",
      description:
        "Menginspirasi generasi muda mengenal serta berkarier di sektor pendukung pembangunan berkelanjutan. Khusus anggota aktif SC SRE.",
    },
  ],
  mechanism: [
    {
      stage: "Tahap 1 - Open Call & Submission Reels",
      description:
        "Peserta kategori Umum memilih subtema Lifestyle atau Community dan mengunggah 2 Instagram Reels sesuai timeline. Peserta kategori Green Career (khusus anggota SC SRE) mengunggah 2 reels bertema Green Career.",
    },
    {
      stage: "Tahap 2 - Seleksi & Penetapan Ambassador",
      description:
        "Karya dinilai dari kualitas konten, kreativitas, storytelling, kesesuaian tema, call to action, dan engagement digital. Terpilih 8 Youth Ambassador: 3 Lifestyle, 3 Community, 2 Green Career.",
    },
  ],
  benefits: [
    "Akses VIP eksklusif ke rangkaian acara Green Impact Festival",
    "Tunjangan perjalanan & akomodasi",
    "Hadiah menarik dan fresh money",
    "Peluang networking lintas kampus dan mitra program",
    "Publikasi profil di kanal resmi Green Impact Festival",
    "Gelar Best Ambassador GIF 2026 untuk kategori terbaik",
  ],
  kpi: [
    { label: "Total Submission", value: "600 Reels" },
    { label: "Total Digital Reach", value: "> 300.000 audience" },
    { label: "Youth Ambassador Terpilih", value: "8 Ambassador" },
    { label: "Best Ambassador", value: "2 Orang" },
  ],
  videoFormat: [
    "Media: Instagram Reels, rasio 9:16 (potrait)",
    "Durasi maksimal 3 menit",
    "Caption menjelaskan konteks video dan pesan yang ingin disampaikan",
    "Wajib mencantumkan tagar #BeyondEnergy #YouthAmbassadorGIF #GreenImpactFestival2026",
    "Tag akun Instagram @greenimpactfestival dan @sreindonesia",
  ],
};

export const yaFormFields: FormField[] = [
  { name: "fullName", label: "Nama Lengkap", type: "text", required: true },
  {
    name: "institution",
    label: "Asal Sekolah / Universitas / Instansi",
    type: "text",
    required: true,
  },
  { name: "email", label: "Email Aktif", type: "email", required: true },
  { name: "phone", label: "Nomor Handphone", type: "tel", required: true },
  {
    name: "subtheme",
    label: "Subtema Pilihan",
    type: "select",
    required: true,
    options: yaInfo.subthemes.map((sub) => sub.title),
  },
  { name: "twibbonProof", label: "Bukti Upload Twibbon", type: "file", required: true },
  {
    name: "followProof",
    label: "Bukti Follow @greenimpactfestival & @sreindonesia",
    type: "file",
    required: true,
  },
  {
    name: "reels1",
    label: "Upload Link Reels 1",
    type: "text",
    required: true,
    placeholder: "https://instagram.com/reel/...",
  },
  {
    name: "reels2",
    label: "Upload Link Reels 2",
    type: "text",
    required: true,
    placeholder: "https://instagram.com/reel/...",
  },
  {
    name: "source",
    label: "Where did you know Youth Ambassador and GIF 2026?",
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
