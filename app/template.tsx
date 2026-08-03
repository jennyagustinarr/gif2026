"use client";

/**
 * Template dijalankan ulang setiap pindah route (beda dengan layout),
 * jadi tiap halaman baru masuk dengan animasi fade + naik tipis.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
