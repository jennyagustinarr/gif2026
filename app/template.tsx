"use client";

import { useEffect } from "react";

/**
 * Template dijalankan ulang setiap pindah route (beda dengan layout),
 * jadi tiap halaman baru masuk dengan animasi fade + naik tipis.
 *
 * Sekaligus menandai bahwa React berhasil hidrasi. Penanda ini dibaca
 * skrip di app/layout.tsx: kalau tidak pernah muncul, animasi dimatikan
 * total supaya konten tidak tersangkut dalam keadaan tak terlihat.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
  }, []);

  return <div className="animate-page-in">{children}</div>;
}
