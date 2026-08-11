import mysql from "mysql2/promise";

/**
 * Connection pool MySQL (XAMPP).
 *
 * Pool dibuat sekali lalu di-cache di globalThis supaya hot reload Next.js
 * saat development tidak membuat pool baru terus-menerus sampai koneksi habis.
 */

declare global {
  // eslint-disable-next-line no-var
  var __gifPool: mysql.Pool | undefined;
}

export function getPool(): mysql.Pool {
  if (!globalThis.__gifPool) {
    globalThis.__gifPool = mysql.createPool({
      host: process.env.DB_HOST ?? "127.0.0.1",
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER ?? "root",
      // XAMPP default: user root tanpa password.
      password: process.env.DB_PASSWORD ?? "",
      database: process.env.DB_NAME ?? "green_impact_festival",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: "utf8mb4",
      // Kembalikan DATETIME sebagai string, bukan Date object,
      // supaya tidak bergeser karena timezone.
      dateStrings: true,
    });
  }

  return globalThis.__gifPool;
}

/** Cek apakah database bisa dihubungi — dipakai endpoint health check. */
export async function pingDatabase(): Promise<{ ok: boolean; message: string }> {
  try {
    const conn = await getPool().getConnection();
    try {
      await conn.query("SELECT 1");
      return { ok: true, message: "Koneksi database berhasil." };
    } finally {
      conn.release();
    }
  } catch (err) {
    return { ok: false, message: describeDbError(err) };
  }
}

/** Ubah error MySQL jadi pesan yang bisa ditindaklanjuti. */
export function describeDbError(err: unknown): string {
  const code = (err as { code?: string })?.code;

  switch (code) {
    case "ECONNREFUSED":
      return "MySQL tidak bisa dihubungi. Pastikan modul MySQL di XAMPP Control Panel sudah Start.";
    case "ER_BAD_DB_ERROR":
      return "Database belum ada. Import dulu database/01-schema.sql lewat phpMyAdmin.";
    case "ER_ACCESS_DENIED_ERROR":
      return "Username atau password MySQL salah. Cek DB_USER dan DB_PASSWORD di .env.local.";
    case "ER_NO_SUCH_TABLE":
      return "Tabel belum ada. Import ulang database/01-schema.sql.";
    case "ER_DUP_ENTRY":
      return "Email ini sudah terdaftar pada program tersebut.";
    default:
      return err instanceof Error ? err.message : "Terjadi kesalahan database.";
  }
}

/** True kalau error-nya karena melanggar UNIQUE (email ganda). */
export function isDuplicateError(err: unknown): boolean {
  return (err as { code?: string })?.code === "ER_DUP_ENTRY";
}
