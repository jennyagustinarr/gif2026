import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Green Impact Festival 2026",
    template: "%s | Green Impact Festival 2026",
  },
  description:
    "Green Impact Festival 2026 - festival inovasi lingkungan terbesar di Indonesia. Jelajahi pembangunan berkelanjutan bersama para pembicara ahli.",
  keywords: [
    "Green Impact Festival",
    "GIF 2026",
    "SRE Indonesia",
    "NECSC 2026",
    "Youth Ambassador",
    "sustainability",
    "energi terbarukan",
  ],
  openGraph: {
    title: "Green Impact Festival 2026",
    description:
      "Festival inovasi lingkungan terbesar di Indonesia. Seminar, NECSC 2026, Youth Ambassador, dan Expo keberlanjutan.",
    url: siteUrl,
    siteName: "Green Impact Festival 2026",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="font-sans bg-night-950 text-mint-200/90 min-h-screen flex flex-col">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
