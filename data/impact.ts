export interface ImpactStat {
  /** Angka yang dianimasikan naik dari 0. */
  value: number;
  suffix?: string;
  label: string;
}

export interface ImpactPhoto {
  src: string;
  alt: string;
}

export interface ImpactYear {
  year: string;
  title: string;
  date: string;
  venue: string;
  theme: string;
  /** Rangkaian kegiatan pada tahun itu. */
  highlights: string[];
  /** Hasil nyata yang dicapai. */
  achievements: string[];
  stats: ImpactStat[];
  /**
   * Foto dokumentasi. Biarkan array kosong kalau berkasnya belum ada —
   * otomatis diganti kotak placeholder. Lihat public/impact/README.md.
   */
  photos: ImpactPhoto[];
}

export const impactIntro = {
  heading: "Our Impact",
  subheading: "Two years of turning ideas into action.",
};

/**
 * Riwayat penyelenggaraan, diurutkan dari yang terbaru.
 *
 * TODO PANITIA: isi array `photos` setelah menaruh berkas di public/impact/
 */
export const impactYears: ImpactYear[] = [
  {
    year: "2025",
    title: "Green Impact Festival 2025",
    date: "24 Juli 2025",
    venue: "Djakarta Theater, Jakarta Pusat",
    theme: "Pembangunan Berkelanjutan di Era Disrupsi dan Artificial Intelligence",
    highlights: [
      "Kualifikasi inovasi dan ide solutif teknologi hijau berbasis AI dari mahasiswa se-Indonesia",
      "Festival utama di Djakarta Theater",
      "4 sesi talkshow interaktif lintas sektor",
      "Awarding Night",
    ],
    achievements: [
      "Terkumpul 50 karya NECSC terbaik",
      "Penghargaan pemenang diserahkan langsung oleh Wakil Presiden RI",
    ],
    stats: [
      { value: 1500, suffix: "+", label: "Partisipan puncak" },
      { value: 50, label: "Karya NECSC terbaik" },
      { value: 4, label: "Sesi talkshow" },
    ],
    photos: [],
  },
  {
    year: "2024",
    title: "Green Impact Days 2024",
    date: "29 - 30 April 2024",
    venue: "Sabuga ITB, Bandung",
    theme: "Menuju Ketahanan Pangan, Air, dan Energi Indonesia",
    highlights: [
      "Road to GID (Maret - April)",
      "Aksi Penanaman Mangrove",
      "Seminar industri hijau",
      "Acara puncak di Sabuga ITB: National Conference, Leadership Talk, Fireside Chat, Green Job Fair, Awarding NECSC, dan UMKM Exhibition",
    ],
    achievements: [
      'Peluncuran buku riset "Green Jobs Outlook: Peta Karier Hijau Anak Muda"',
      "Dihadiri dan diapresiasi Menteri LHK Prof. Dr. Siti Nurbaya, yang menyerahkan langsung piala NECSC",
    ],
    stats: [
      { value: 1000, suffix: "+", label: "Partisipan total" },
      { value: 6, label: "Agenda acara puncak" },
      { value: 2, label: "Hari acara puncak" },
    ],
    photos: [],
  },
];
