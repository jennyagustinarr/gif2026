import { NextResponse } from "next/server";

/**
 * Endpoint penerima semua form pendaftaran (NECSC, Youth Ambassador, Expo,
 * Seminar, dan Partnership).
 *
 * Perilaku:
 * - Kalau env `REGISTRATION_WEBHOOK_URL` diisi (mis. URL Google Apps Script Web
 *   App), payload diteruskan ke sana.
 * - Kalau kosong, data hanya di-log ke server console supaya development tetap
 *   jalan tanpa backend.
 *
 * TODO produksi: tambahkan penyimpanan permanen (Firestore/DB), validasi lebih
 * ketat, rate limiting, dan upload file sungguhan (saat ini file hanya dikirim
 * sebagai nama file).
 */

interface RegistrationPayload {
  program?: string;
  values?: Record<string, unknown>;
}

export async function POST(request: Request) {
  let payload: RegistrationPayload;

  try {
    payload = (await request.json()) as RegistrationPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Body bukan JSON yang valid." }, { status: 400 });
  }

  const program = typeof payload.program === "string" ? payload.program : "general";
  const values = payload.values;

  if (!values || typeof values !== "object" || Array.isArray(values)) {
    return NextResponse.json(
      { ok: false, error: "Field `values` wajib diisi berupa object." },
      { status: 400 },
    );
  }

  const record = {
    program,
    values,
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.REGISTRATION_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      if (!res.ok) {
        console.error("[registration] webhook menolak:", res.status, await res.text());
        return NextResponse.json(
          { ok: false, error: "Gagal meneruskan pendaftaran ke sistem panitia." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[registration] webhook error:", err);
      return NextResponse.json(
        { ok: false, error: "Tidak bisa menghubungi sistem panitia." },
        { status: 502 },
      );
    }
  } else {
    console.log("[registration] REGISTRATION_WEBHOOK_URL belum diset. Data:", record);
  }

  return NextResponse.json({ ok: true, program, submittedAt: record.submittedAt });
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Gunakan metode POST untuk mengirim pendaftaran." },
    { status: 405 },
  );
}
