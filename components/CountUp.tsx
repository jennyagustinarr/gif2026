"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Angka yang menghitung naik dari 0 begitu masuk viewport.
 *
 * Kalau IntersectionObserver tidak tersedia atau pengguna mengaktifkan
 * "reduce motion", angka finalnya langsung ditampilkan tanpa animasi.
 */
export default function CountUp({
  value,
  suffix = "",
  duration = 1400,
  className = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    function run() {
      if (started.current) return;
      started.current = true;

      if (reduceMotion) {
        setDisplay(value);
        return;
      }

      const start = performance.now();
      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic — cepat di awal lalu melambat
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}
