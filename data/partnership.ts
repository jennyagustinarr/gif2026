export interface PartnershipType {
  /** Nilai yang tersimpan ke kolom partnership_type di database. */
  value: string;
  label: string;
  tagline: string;
  description: string;
  perks: string[];
}

export const PARTNERSHIP_TYPES: PartnershipType[] = [
  {
    value: "sponsorship",
    label: "Sponsorship",
    tagline: "Dukungan finansial dengan eksposur penuh",
    description:
      "Jadilah bagian dari kesuksesan acara kami melalui dukungan finansial. Sebagai sponsor, brand Anda akan mendapatkan eksposur di seluruh materi promosi, kesempatan aktivasi langsung di lokasi acara, serta akses ke audiens target yang relevan dengan bisnis Anda.",
    perks: [
      "Eksposur di seluruh materi promosi",
      "Aktivasi brand langsung di lokasi acara",
      "Akses ke audiens target yang relevan",
    ],
  },
  {
    value: "community-partner",
    label: "Community Partner",
    tagline: "Kolaborasi komunitas untuk dampak lebih luas",
    description:
      "Berkolaborasi dengan komunitas kami untuk menciptakan dampak yang lebih luas. Kemitraan ini membuka peluang cross-promotion, memperluas jaringan ke audiens yang lebih tersegmentasi, serta memperkuat kredibilitas melalui kolaborasi yang saling menguntungkan.",
    perks: [
      "Peluang cross-promotion antar komunitas",
      "Jaringan ke audiens yang lebih tersegmentasi",
      "Kredibilitas lewat kolaborasi yang saling menguntungkan",
    ],
  },
  {
    value: "media-partner",
    label: "Media Partner",
    tagline: "Perluas jangkauan publikasi acara",
    description:
      "Perluas jangkauan publikasi acara melalui kemitraan media. Kami menawarkan kesempatan liputan eksklusif, pertukaran konten promosi, serta dokumentasi profesional yang dapat digunakan oleh kedua belah pihak untuk memperkuat visibilitas di publik.",
    perks: [
      "Kesempatan liputan eksklusif",
      "Pertukaran konten promosi",
      "Dokumentasi profesional untuk kedua pihak",
    ],
  },
  {
    value: "other",
    label: "Other",
    tagline: "Bentuk kerja sama kustom sesuai kebutuhan",
    description:
      "Punya ide kolaborasi lain yang lebih spesifik? Kami terbuka untuk bentuk kemitraan kustom sesuai kebutuhan Anda, baik itu barter produk, dukungan teknis, riset, maupun bentuk kerja sama lainnya yang saling menguntungkan.",
    perks: ["Barter produk atau layanan", "Dukungan teknis", "Kolaborasi riset"],
  },
];
