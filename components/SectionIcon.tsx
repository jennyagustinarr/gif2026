export default function SectionIcon({
  className = "h-7 w-7 text-mint-400",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0c1 5 6 10 11 11-5 1-10 6-11 11-1-5-6-10-11-11C6 10 11 5 12 0Z" />
    </svg>
  );
}
