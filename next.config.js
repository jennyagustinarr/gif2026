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
    ];
  },
};

module.exports = nextConfig;
