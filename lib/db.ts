import mysql from "mysql2/promise";

/**
 * Connection pool MySQL.
 *
 * Mendukung dua cara konfigurasi:
 *
 *  1. Variabel terpisah (dipakai saat development dengan XAMPP):
 *     DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
 *
 *  2. Satu URL koneksi (dipakai layanan MySQL cloud seperti Railway,
 *     Aiven, atau Clever Cloud yang memberi string siap pakai):
 *     DATABASE_URL=mysql://user:password@host:3306/nama_database
 *
 * Kalau DATABASE_URL diisi, nilainya menang atas variabel terpisah.
 *
 * TLS/SSL diatur lewat DB_SSL:
 *   - tidak diisi / "false" -> tanpa SSL (XAMPP lokal)
 *   - "true"                -> SSL dengan verifikasi sertifikat
 *   - "insecure"            -> SSL tanpa verifikasi sertifikat.
 *                              Hanya untuk penyedia yang memakai
 *                              sertifikat sendiri dan belum menyediakan CA.
 *
 * Pool di-cache di globalThis supaya hot reload Next.js saat development
 * tidak membuat pool baru terus-menerus.
 */

declare global {
  // eslint-disable-next-line no-var
  var __gifPool: mysql.Pool | undefined;
}

function sslOption(): mysql.PoolOptions["ssl"] {
  switch ((process.env.DB_SSL ?? "").toLowerCase()) {
    case "true":
      return { minVersion: "TLSv1.2", rejectUnauthorized: true };
    case "insecure":
      return { minVersion: "TLSv1.2", rejectUnauthorized: false };
    default:
      return undefined;
  }
}

/** Terjemahkan DATABASE_URL jadi konfigurasi mysql2. */
function fromConnectionUrl(raw: string): mysql.PoolOptions {
  const url = new URL(raw);

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
  };
}

function buildConfig(): mysql.PoolOptions {
  const base = process.env.DATABASE_URL
    ? fromConnectionUrl(process.env.DATABASE_URL)
    : {
        host: process.env.DB_HOST ?? "127.0.0.1",
        port: Number(process.env.DB_PORT ?? 3306),
        user: process.env.DB_USER ?? "root",
        // XAMPP default: user root tanpa password.
        password: process.env.DB_PASSWORD ?? "",
        database: process.env.DB_NAME ?? "green_impact_festival",
      };

  return {
    ...base,
    ssl: sslOption(),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4",
    // Kembalikan DATETIME sebagai string, bukan Date object,
    // supaya tidak bergeser karena timezone.
    dateStrings: true,
  };
}

export function getPool(): mysql.Pool {
  if (!globalThis.__gifPool) {
    globalThis.__gifPool = mysql.createPool(buildConfig());
  }

  return globalThis.__gifPool;
}

/** Ringkasan konfigurasi aktif — aman ditampilkan, tanpa password. */
export function describeConfig() {
  const config = buildConfig();

  return {
    host: config.host,
    port: String(config.port),
    user: config.user,
    database: config.database,
    ssl: process.env.DB_SSL ? process.env.DB_SSL.toLowerCase() : "off",
    source: process.env.DATABASE_URL ? "DATABASE_URL" : "DB_HOST/DB_USER/...",
  };
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
  const isRemote = Boolean(process.env.DATABASE_URL) || Boolean(process.env.DB_HOST);

  switch (code) {
    case "ECONNREFUSED":
      return isRemote
        ? "Server database menolak koneksi. Periksa host, port, dan apakah IP server diizinkan."
        : "MySQL tidak bisa dihubungi. Pastikan modul MySQL di XAMPP Control Panel sudah Start.";
    case "ETIMEDOUT":
    case "ENOTFOUND":
      return "Server database tidak dapat dijangkau. Periksa kembali host dan koneksi jaringan.";
    case "ER_BAD_DB_ERROR":
      return "Database belum ada. Import dulu database/01-schema.sql lewat phpMyAdmin.";
    case "ER_ACCESS_DENIED_ERROR":
      return "Username atau password MySQL salah. Cek kredensial di environment variable.";
    case "ER_NO_SUCH_TABLE":
      return "Tabel belum ada. Import ulang database/01-schema.sql, atau jalankan berkas migrasi di folder database/.";
    case "ER_DUP_ENTRY":
      return "Email ini sudah terdaftar pada program tersebut.";
    case "HANDSHAKE_SSL_ERROR":
    case "ERR_SSL_WRONG_VERSION_NUMBER":
      return "Koneksi SSL gagal. Sesuaikan nilai DB_SSL (true / insecure / kosong).";
    default:
      return err instanceof Error ? err.message : "Terjadi kesalahan database.";
  }
}

/** True kalau error-nya karena melanggar UNIQUE (email ganda). */
export function isDuplicateError(err: unknown): boolean {
  return (err as { code?: string })?.code === "ER_DUP_ENTRY";
}
