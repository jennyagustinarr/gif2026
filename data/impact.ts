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
   * Foto dokumentasi. Berkas yang belum ditaruh di public/impact/ otomatis
   * dilewati dan diganti kotak placeholder, jadi entri di bawah aman
   * didaftarkan lebih dulu. Lihat public/impact/README.md.
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
 * TODO PANITIA: taruh berkas foto di public/impact/ dengan nama yang sudah
 * tertulis pada `photos` di bawah — tidak perlu menyunting berkas ini lagi.
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
    photos: [
      {
        src: "/impact/2025-1.jpg",
        alt: "Foto bersama tamu undangan dan ratusan peserta Green Impact Festival 2025 di Djakarta Theater",
      },
      {
        src: "/impact/2025-2.jpg",
        alt: "Para pemenang NECSC dan Digital Ambassador 2025 berbaris di panggung sambil memegang papan hadiah",
      },
    ],
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
    photos: [
      {
        src: "/impact/2024-1.jpg",
        alt: "Penyerahan cendera mata dan buku Green Impact Days 2024 di atas panggung Sabuga ITB",
      },
      {
        src: "/impact/2024-2.jpg",
        alt: "Foto bersama ratusan peserta Green Impact Days 2024 memenuhi ruang Sabuga ITB",
      },
    ],
  },
];
