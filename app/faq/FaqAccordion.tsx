"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 space-y-3">
      {items.map((item, i) => {
        const open = openIndex === i;

        return (
          <Reveal key={item.question} delay={i * 80}>
            <div
              className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                open
                  ? "border-mint-400/40 bg-neutral-800/80"
                  : "border-transparent bg-neutral-800/60 hover:bg-neutral-800/80"
              }`}
            >
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="group w-full flex items-center gap-3 px-5 py-4 text-left"
                aria-expanded={open}
              >
                <ChevronRight
                  size={16}
                  className={`shrink-0 text-mint-300 transition-transform duration-300 ${
                    open ? "rotate-90" : "group-hover:translate-x-1"
                  }`}
                />
                <span className="font-medium text-mint-100 text-sm sm:text-base transition-colors group-hover:text-white">
                  {item.question}
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 pl-11 text-sm text-mint-200/60">{item.answer}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
