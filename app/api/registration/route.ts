import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import { getPool, describeDbError, isDuplicateError } from "@/lib/db";
import { STUDENT_STATUSES } from "@/data/campusRoadshow";

/**
 * Endpoint penerima semua form pendaftaran (NECSC, Youth Ambassador,
 * Campus Roadshow, Seminar, dan Partnership).
 *
 * Alur:
 *  1. Payload mentah selalu dicatat ke tabel `submission_logs` lebih dulu,
 *     jadi tidak ada kiriman yang hilang walaupun langkah berikutnya gagal.
 *  2. Data dipetakan ke kolom tabel program yang sesuai lalu di-INSERT.
 *  3. Baris log diperbarui dengan hasilnya (berhasil / pesan error).
 *
 * Butuh MySQL XAMPP menyala dan skema di database/01-schema.sql sudah
 * di-import. Lihat database/README.md.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RegistrationPayload {
  program?: string;
  values?: Record<string, unknown>;
}

/**
 * Field yang wajib hanya kalau field lain bernilai tertentu — mengikuti
 * aturan `showIf` di form. Field tersembunyi tidak dikirim, jadi tidak
 * boleh ikut divalidasi.
 */
interface ConditionalRule {
  field: string;
  when: { field: string; values: string[] };
}

/** Pemetaan nama field di form -> nama kolom di tabel, per program. */
const PROGRAM_CONFIG: Record<
  string,
  {
    table: string;
    columns: Record<string, string>;
    required: string[];
    requiredIf?: ConditionalRule[];
  }
> = {
  necsc: {
    table: "necsc_registrations",
    columns: {
      fullName: "full_name",
      institution: "institution",
      email: "email",
      phone: "phone",
      category: "category",
      subtheme: "subtheme",
      ktmFile: "ktm_file",
      twibbonProof: "twibbon_proof",
      followProof: "follow_proof",
      abstractFile: "abstract_file",
      source: "source",
    },
    required: ["fullName", "institution", "email", "phone"],
  },
  "youth-ambassador": {
    table: "youth_ambassador_registrations",
    columns: {
      fullName: "full_name",
      institution: "institution",
      email: "email",
      phone: "phone",
      subtheme: "subtheme",
      twibbonProof: "twibbon_proof",
      followProof: "follow_proof",
      reels1: "reels_1_url",
      reels2: "reels_2_url",
      source: "source",
    },
    required: ["fullName", "institution", "email", "phone"],
  },
  "campus-roadshow": {
    table: "campus_roadshow_registrations",
    columns: {
      fullName: "full_name",
      email: "email",
      whatsapp: "whatsapp",
      currentStatus: "current_status",
      otherStatus: "other_status",
      institution: "institution",
      major: "major",
      source: "source",
    },
    required: ["fullName", "email", "whatsapp", "currentStatus"],
    requiredIf: [
      {
        field: "otherStatus",
        when: { field: "currentStatus", values: ["Other"] },
      },
      {
        field: "institution",
        when: { field: "currentStatus", values: STUDENT_STATUSES },
      },
      {
        field: "major",
        when: { field: "currentStatus", values: STUDENT_STATUSES },
      },
    ],
  },
  seminar: {
    table: "seminar_registrations",
    columns: {
      name: "full_name",
      email: "email",
      phone: "phone",
      institution: "institution",
    },
    required: ["name", "email", "phone", "institution"],
  },
  partnership: {
    table: "partnership_inquiries",
    columns: {
      name: "name",
      email: "email",
      partnershipType: "partnership_type",
      description: "description",
    },
    required: ["name", "email"],
  },
};

const MAX_TEXT_LENGTH = 5000;

function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim().slice(0, 45);
  return request.headers.get("x-real-ip")?.slice(0, 45) ?? null;
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

  const config = PROGRAM_CONFIG[program];
  if (!config) {
    return NextResponse.json(
      { ok: false, error: `Program "${program}" tidak dikenal.` },
      { status: 400 },
    );
  }

  // Validasi field wajib.
  const isFilled = (field: string) =>
    typeof values[field] === "string" && (values[field] as string).trim() !== "";

  const missing = config.required.filter((field) => !isFilled(field));

  // Field yang wajib hanya pada kondisi tertentu.
  for (const rule of config.requiredIf ?? []) {
    const trigger = String(values[rule.when.field] ?? "");
    if (rule.when.values.includes(trigger) && !isFilled(rule.field)) {
      missing.push(rule.field);
    }
  }

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Field wajib belum diisi: ${missing.join(", ")}.` },
      { status: 400 },
    );
  }

  const email = String(values.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Format email tidak valid." }, { status: 400 });
  }

  // Nomor WhatsApp wajib format lokal diawali 08.
  if (typeof values.whatsapp === "string") {
    const whatsapp = values.whatsapp.replace(/[\s-]/g, "");
    if (!/^08\d{8,13}$/.test(whatsapp)) {
      return NextResponse.json(
        { ok: false, error: "Nomor WhatsApp harus diawali 08, contoh 081234567890." },
        { status: 400 },
      );
    }
    values.whatsapp = whatsapp;
  }

  // Nomor telepon biasa: lebih longgar (boleh +62), asal jumlah digitnya wajar.
  if (typeof values.phone === "string") {
    const digits = values.phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 15) {
      return NextResponse.json(
        { ok: false, error: "Nomor handphone tidak valid. Contoh: 081234567890." },
        { status: 400 },
      );
    }
  }

  const pool = getPool();
  const ip = clientIp(request);
  const userAgent = request.headers.get("user-agent")?.slice(0, 255) ?? null;

  // --- 1. Catat payload mentah lebih dulu -----------------------------
  let logId: number | null = null;
  try {
    const [logResult] = await pool.execute<ResultSetHeader>(
      `INSERT INTO submission_logs (program, payload, ip_address, user_agent)
       VALUES (?, ?, ?, ?)`,
      [program, JSON.stringify(values), ip, userAgent],
    );
    logId = logResult.insertId;
  } catch (err) {
    // Kalau log saja gagal, database memang tidak bisa dipakai.
    console.error("[registration] gagal menulis submission_logs:", err);
    return NextResponse.json({ ok: false, error: describeDbError(err) }, { status: 503 });
  }

  // --- 2. Simpan ke tabel program -------------------------------------
  const columns: string[] = [];
  const placeholders: string[] = [];
  const params: (string | null)[] = [];

  for (const [field, column] of Object.entries(config.columns)) {
    const raw = values[field];
    if (raw === undefined || raw === null || raw === "") continue;

    columns.push(`\`${column}\``);
    placeholders.push("?");
    params.push(String(raw).slice(0, MAX_TEXT_LENGTH));
  }

  columns.push("`ip_address`");
  placeholders.push("?");
  params.push(ip);

  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO \`${config.table}\` (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`,
      params,
    );

    await pool.execute(`UPDATE submission_logs SET saved_to = ? WHERE id = ?`, [
      config.table,
      logId,
    ]);

    return NextResponse.json({
      ok: true,
      program,
      id: result.insertId,
      message: "Pendaftaran berhasil disimpan.",
    });
  } catch (err) {
    const message = describeDbError(err);
    console.error(`[registration] gagal menyimpan ke ${config.table}:`, err);

    await pool
      .execute(`UPDATE submission_logs SET error = ? WHERE id = ?`, [message, logId])
      .catch(() => undefined);

    // Email ganda bukan error server — beri tahu pengguna apa adanya.
    if (isDuplicateError(err)) {
      return NextResponse.json(
        { ok: false, error: "Email ini sudah pernah didaftarkan untuk program tersebut." },
        { status: 409 },
      );
    }

    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Gunakan metode POST untuk mengirim pendaftaran." },
    { status: 405 },
  );
}
