"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Tombol melayang untuk kembali ke atas, muncul setelah scroll cukup jauh. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 480);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-mint-400/30 bg-night-900/90 text-mint-300 shadow-lg shadow-black/40 backdrop-blur transition-all duration-300 hover:border-mint-400/70 hover:bg-night-800 hover:text-mint-200 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
