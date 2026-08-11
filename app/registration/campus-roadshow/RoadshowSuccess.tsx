import { roadshowEventDetails, roadshowSuccess, whatsappCommunityUrl } from "@/data/campusRoadshow";

/**
 * Tampilan setelah pendaftaran Campus Roadshow berhasil dikirim.
 * Dioper ke <RegistrationForm successContent={...} />.
 */
export default function RoadshowSuccess() {
  return (
    <div className="rounded-3xl border border-mint-400/30 bg-gradient-to-br from-mint-500/10 to-transparent p-8 sm:p-10">
      <h2 className="text-2xl font-extrabold text-white">{roadshowSuccess.heading}</h2>
      <p className="mt-4 text-mint-200/80 leading-relaxed">{roadshowSuccess.thanks}</p>
      <p className="mt-2 text-mint-200/80">{roadshowSuccess.recorded}</p>

      <dl className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-night-900/70 p-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs uppercase tracking-wide text-mint-200/40">📅 Date</dt>
          <dd className="mt-1 text-sm font-semibold text-mint-100">{roadshowEventDetails.date}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-mint-200/40">🕒 Time</dt>
          <dd className="mt-1 text-sm font-semibold text-mint-100">{roadshowEventDetails.time}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-mint-200/40">📍 Venue</dt>
          <dd className="mt-1 text-sm font-semibold text-mint-100">{roadshowEventDetails.venue}</dd>
        </div>
      </dl>

      <p className="mt-6 text-sm text-mint-200/70 leading-relaxed">{roadshowSuccess.followUp}</p>

      <div className="mt-8 rounded-2xl border border-lime-300/25 bg-night-900/70 p-6">
        <p className="font-semibold text-mint-100">{roadshowSuccess.communityHeading}</p>
        <p className="mt-2 text-sm text-mint-200/70">{roadshowSuccess.communityInvite}</p>

        {whatsappCommunityUrl ? (
          <a
            href={whatsappCommunityUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-shine mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_16px_32px_-14px_rgba(61,220,132,0.9)]"
          >
            Join WhatsApp Community
          </a>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed border-mint-400/30 bg-mint-400/5 px-4 py-3 text-sm text-mint-200/60">
            Link WhatsApp Community akan dikirim ke email yang kamu daftarkan. (Panitia: isi{" "}
            <code className="text-mint-300">whatsappCommunityUrl</code> di{" "}
            <code className="text-mint-300">data/campusRoadshow.ts</code> untuk menampilkan tombol
            di sini.)
          </p>
        )}

        <p className="mt-4 text-sm text-mint-200/60">{roadshowSuccess.communityPurpose}</p>
        <p className="mt-2 text-sm text-mint-200/60">{roadshowSuccess.communityReminder}</p>
      </div>

      <p className="mt-8 text-center text-lg font-semibold text-mint-300">
        {roadshowSuccess.closing}
      </p>
    </div>
  );
}
