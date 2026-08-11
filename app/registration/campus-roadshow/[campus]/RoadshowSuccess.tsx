import { roadshowSuccessCopy, type RoadshowAgenda } from "@/data/campusRoadshow";

/**
 * Tampilan setelah pendaftaran Campus Roadshow berhasil dikirim.
 * Isinya menyesuaikan kampus yang dipilih peserta.
 */
export default function RoadshowSuccess({ agenda }: { agenda: RoadshowAgenda }) {
  const copy = roadshowSuccessCopy(agenda);

  return (
    <div className="rounded-3xl border border-mint-400/30 bg-gradient-to-br from-mint-500/10 to-transparent p-8 sm:p-10">
      <h2 className="text-2xl font-extrabold text-white">{copy.heading}</h2>
      <p className="mt-4 text-mint-200/80 leading-relaxed">{copy.thanks}</p>
      <p className="mt-2 text-mint-200/80">{copy.recorded}</p>

      <dl className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-night-900/70 p-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs uppercase tracking-wide text-mint-200/40">📅 Date</dt>
          <dd className="mt-1 text-sm font-semibold text-mint-100">{agenda.date}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-mint-200/40">🕒 Time</dt>
          <dd className="mt-1 text-sm font-semibold text-mint-100">{agenda.time}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-mint-200/40">📍 Venue</dt>
          <dd className="mt-1 text-sm font-semibold text-mint-100">{agenda.venue}</dd>
        </div>
      </dl>

      <p className="mt-6 text-sm text-mint-200/70 leading-relaxed">{copy.followUp}</p>

      <div className="mt-8 rounded-2xl border border-lime-300/25 bg-night-900/70 p-6">
        <p className="font-semibold text-mint-100">{copy.communityHeading}</p>
        <p className="mt-2 text-sm text-mint-200/70">{copy.communityInvite}</p>

        {agenda.whatsappCommunityUrl ? (
          <a
            href={agenda.whatsappCommunityUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-shine mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_16px_32px_-14px_rgba(61,220,132,0.9)]"
          >
            Join WhatsApp Community
          </a>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed border-mint-400/30 bg-mint-400/5 px-4 py-3 text-sm text-mint-200/60">
            Link WhatsApp Community akan dikirim ke email yang kamu daftarkan. (Panitia: isi{" "}
            <code className="text-mint-300">whatsappCommunityUrl</code> pada agenda{" "}
            <code className="text-mint-300">{agenda.slug}</code> di{" "}
            <code className="text-mint-300">data/campusRoadshow.ts</code>.)
          </p>
        )}

        <p className="mt-4 text-sm text-mint-200/60">{copy.communityPurpose}</p>
        <p className="mt-2 text-sm text-mint-200/60">{copy.communityReminder}</p>
      </div>

      <p className="mt-8 text-center text-lg font-semibold text-mint-300">{copy.closing}</p>
    </div>
  );
}
