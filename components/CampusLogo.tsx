/**
 * Logo kampus untuk kartu dan halaman Campus Roadshow.
 *
 * Kalau `logo` diisi (mis. "/logos/itb.png"), berkas itu yang ditampilkan.
 * Kalau kosong, ditampilkan monogram inisial kampus supaya tata letaknya
 * tetap rapi sambil menunggu berkas logo asli. Lihat public/logos/README.md.
 */
export default function CampusLogo({
  logo,
  campus,
  campusShort,
  size = "md",
}: {
  logo: string;
  campus: string;
  campusShort: string;
  size?: "sm" | "md" | "lg";
}) {
  const box = {
    sm: "h-12 w-12 text-xs",
    md: "h-16 w-16 text-sm",
    lg: "h-20 w-20 text-base",
  }[size];

  if (logo) {
    return (
      <span
        className={`${box} flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/95 p-2`}
      >
        <img src={logo} alt={`Logo ${campus}`} className="h-full w-full object-contain" />
      </span>
    );
  }

  return (
    <span
      title={campus}
      aria-label={`Logo ${campus}`}
      role="img"
      className={`${box} flex shrink-0 items-center justify-center rounded-2xl border border-mint-400/30 bg-gradient-to-br from-mint-500/20 to-lime-300/5 font-extrabold tracking-tight text-mint-200`}
    >
      {campusShort}
    </span>
  );
}
