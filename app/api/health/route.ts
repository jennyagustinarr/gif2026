import { NextResponse } from "next/server";
import { pingDatabase } from "@/lib/db";

/**
 * Cek cepat apakah aplikasi bisa terhubung ke MySQL.
 * Buka http://localhost:3000/api/health di browser.
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
      config: {
        host: process.env.DB_HOST ?? "127.0.0.1",
        port: process.env.DB_PORT ?? "3306",
        user: process.env.DB_USER ?? "root",
        database: process.env.DB_NAME ?? "green_impact_festival",
      },
    },
    { status: db.ok ? 200 : 503 },
  );
}
