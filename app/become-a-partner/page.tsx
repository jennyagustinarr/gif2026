import type { Metadata } from "next";
import PartnerForm from "./PartnerForm";

export const metadata: Metadata = {
  title: "Become a Partner",
  description:
    "Ajukan kemitraan dengan Green Impact Festival 2026 sebagai sponsor, community partner, atau media partner.",
};

export default function BecomeAPartnerPage() {
  return <PartnerForm />;
}
