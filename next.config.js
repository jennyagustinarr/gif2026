/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  async redirects() {
    return [
      // Halaman NECSC berdiri sendiri sudah digabung ke halaman pendaftaran.
      { source: "/necsc", destination: "/registration/necsc", permanent: true },
      // Program Expo ditiadakan — arahkan ke daftar pendaftaran yang aktif.
      { source: "/registration/expo", destination: "/registration", permanent: true },
    ];
  },
};

module.exports = nextConfig;
