import { NextResponse } from "next/server";
import { pingDatabase, describeConfig } from "@/lib/db";

/**
 * Cek cepat apakah aplikasi bisa terhubung ke database.
 * Buka http://localhost:3000/api/health di browser, atau
 * https://<domain>/api/health untuk memeriksa hasil deploy.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const db = await pingDatabase();

  return NextResponse.json(
    {
      app: "ok",
      database: db.ok ? "ok" : "error",
      message: db.message,
      config: describeConfig(),
    },
    { status: db.ok ? 200 : 503 },
  );
}
