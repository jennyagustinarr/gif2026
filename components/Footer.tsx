import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { contactInfo } from "@/data/faq";

const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/sre-website-a43e8.appspot.com/o/greenimpact-festival-2025%2Fimages%2Fgreenimpactfest-logo.png?alt=media&token=ebdc6d50-9033-4bd4-901e-5a60ad9cc5de";
const SRE_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/sre-website-a43e8.appspot.com/o/greenimpact-festival-2025%2Fimages%2Fsre-logo.png?alt=media&token=b26761f1-ed7e-4e8d-ab6d-c2d20787c91f";
const RM_LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/sre-website-a43e8.appspot.com/o/greenimpact-festival-2025%2Fimages%2Frakyat-merdeka.png?alt=media&token=4affe73a-72ad-4976-a0cc-f25553d17bf5";

const NAV_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/agenda", label: "Agenda" },
  { href: "/registration", label: "Registration" },
  { href: "/registration/necsc", label: "NECSC'26" },
  { href: "/faq", label: "FAQ" },
  { href: "/become-a-partner", label: "Become a Partner" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-950 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 lg:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="Green Impact Festival"
              className="h-10 w-10 rounded-full object-cover animate-float"
            />
            <p className="font-bold text-lg text-white">Green Impact Festival 2026</p>
          </div>
          <a
            href={contactInfo.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-mint-300 hover:text-mint-200 text-sm"
          >
            <Instagram size={16} /> @{contactInfo.instagram}
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 text-mint-200/70 hover:text-mint-200 text-sm"
          >
            <Mail size={16} /> {contactInfo.email}
          </a>
          <a
            href={contactInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-mint-200/70 hover:text-mint-200 text-sm"
          >
            <Phone size={16} /> {contactInfo.whatsappLabel}
          </a>
        </div>

        <div className="text-center">
          <p className="font-semibold text-mint-200 mb-4">Navigation</p>
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline mx-auto w-fit text-sm text-mint-200/70 transition-colors hover:text-mint-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center lg:text-right">
          <p className="font-semibold text-mint-200 mb-4">Organized By</p>
          <div className="flex items-center justify-center lg:justify-end gap-6">
            <img
              src={SRE_LOGO_URL}
              alt="SRE Indonesia"
              className="h-8 object-contain opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100"
            />
            <img
              src={RM_LOGO_URL}
              alt="Rakyat Merdeka"
              className="h-8 object-contain opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-mint-200/50">
        © {new Date().getFullYear()} Green Impact Festival. All rights reserved.
      </div>
    </footer>
  );
}
