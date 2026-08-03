import SectionIcon from "./SectionIcon";

export default function SectionHeading({
  title,
  centered = false,
}: {
  title: string;
  centered?: boolean;
}) {
  return (
    <h1
      className={`flex items-center gap-3 text-3xl sm:text-4xl font-extrabold text-mint-300 ${
        centered ? "justify-center text-center" : ""
      }`}
    >
      <SectionIcon className="h-8 w-8 shrink-0 text-mint-400" />
      {title}
    </h1>
  );
}
