"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { AgendaSession } from "@/data/agenda";

export default function AgendaList({ sessions }: { sessions: AgendaSession[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 space-y-4">
      {sessions.map((session, i) => {
        const open = openIndex === i;

        return (
          <Reveal key={i} delay={i * 70}>
            <div
              className={`card-hover rounded-2xl border px-6 py-5 ${
                session.highlighted
                  ? "border-mint-400/60 bg-gradient-to-r from-mint-500/20 to-lime-300/10"
                  : "border-lime-300/30 bg-night-900 hover:border-mint-400/40"
              } ${open ? "border-mint-400/60" : ""}`}
            >
              <button
                className="group w-full flex items-center justify-between gap-4 text-left"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <span className="text-sm font-medium text-mint-300 shrink-0">{session.time}</span>
                  <span className="font-semibold text-mint-100 transition-colors group-hover:text-white">
                    {session.title}
                  </span>
                </div>

                {session.speakers && (
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="hidden sm:flex -space-x-2">
                      {session.speakers.slice(0, 5).map((sp, idx) => (
                        <div
                          key={idx}
                          title={sp.name}
                          style={{ transitionDelay: `${idx * 40}ms` }}
                          className="h-9 w-9 rounded-full bg-night-800 border-2 border-night-950 flex items-center justify-center text-[10px] font-semibold text-mint-300 transition-all duration-300 hover:z-10 hover:scale-110 hover:border-mint-400/60 group-hover:-translate-y-0.5"
                        >
                          {sp.name
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      ))}
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-mint-300 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                )}
              </button>

              {/* Konten dianimasikan lewat grid-rows 0fr -> 1fr supaya tingginya mulus */}
              {session.speakers && (
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-2 sm:grid-cols-2 border-t border-white/10 pt-4">
                      {session.speakers.map((sp, idx) => (
                        <div key={idx} className="text-sm text-mint-200/70">
                          <span className="font-medium text-mint-100">{sp.name}</span>
                          {sp.role && <span> - {sp.role}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
