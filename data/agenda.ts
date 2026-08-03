export interface Speaker {
  name: string;
  role?: string;
}

export interface AgendaSession {
  time: string;
  title: string;
  speakers?: Speaker[];
  highlighted?: boolean;
}

// CATATAN: nama pembicara di bawah ini sebagian besar masih placeholder.
// Cuma satu nama yang kebaca dari screenshot (sesi jam 12:50-14:10).
// Lengkapi dengan data pembicara asli + foto begitu tersedia.
export const agendaSessions: AgendaSession[] = [
  {
    time: "09:00 - 10:20",
    title: "Advancing Economic Productivity and Sustainability Through Technology",
    speakers: [
      { name: "Speaker 1" },
      { name: "Speaker 2" },
      { name: "Speaker 3" },
      { name: "Speaker 4" },
      { name: "Speaker 5" },
    ],
  },
  {
    time: "10:20 - 11:50",
    title: "Leveraging Digital Communication to Accelerate Sustainable Practices",
    speakers: [
      { name: "Speaker 1" },
      { name: "Speaker 2" },
      { name: "Speaker 3" },
      { name: "Speaker 4" },
      { name: "Speaker 5" },
    ],
  },
  {
    time: "11:50 - 12:50",
    title: "Mid-Day Break Time",
  },
  {
    time: "12:50 - 14:10",
    title: "Optimizing Green Investment to Achieve Indonesia's Demographic Bonus",
    highlighted: true,
    speakers: [
      { name: "Speaker 1" },
      { name: "Speaker 2" },
      { name: "Speaker 3" },
      { name: "Speaker 4" },
      { name: "Suroso Isnandar", role: "Direktur Manajemen Proyek dan EBT" },
    ],
  },
  {
    time: "14:10 - 15:40",
    title: "Leading Economic and Energy Transition at Scale by Harnessing Intelligent Tech",
    speakers: [{ name: "Speaker 1" }, { name: "Speaker 2" }, { name: "Speaker 3" }],
  },
  {
    time: "15:40 - 17:30",
    title: "Awarding",
  },
];

// Info umum acara — dipakai di halaman Home dan pendaftaran Seminar.
// TODO: ganti dengan tanggal & venue final begitu diumumkan panitia.
export const eventInfo = {
  name: "Green Impact Festival 2026",
  organizer: "SRE Indonesia",
  tagline: "Beyond Sustainability",
  date: "Jadwal menyusul - 2026",
  location: "Jakarta Pusat, DKI Jakarta",
};
