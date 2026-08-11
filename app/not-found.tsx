import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-28 text-center">
      <SectionHeading title="404 - Page Not Found" />
      <p className="mt-6 text-mint-200/70">
        Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-brand hover:bg-brand-dark transition-colors px-8 py-3 text-sm font-semibold text-white"
      >
        Back to Home
      </Link>
    </section>
  );
}
