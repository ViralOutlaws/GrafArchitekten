"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ChronologieEintrag } from "@/data/chronologie";

gsap.registerPlugin(ScrollTrigger);

export default function ChronologieTimeline({
  eintraege,
}: {
  eintraege: ChronologieEintrag[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".chron-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="px-container pb-section bg-white">
      <div className="max-w-site mx-auto">
        {eintraege.map((eintrag) => (
          <div
            key={eintrag.jahr}
            className="chron-item grid grid-cols-[70px_1fr] md:grid-cols-[140px_1fr] gap-6 md:gap-12 py-10 md:py-12 border-b border-black/8 opacity-0"
          >
            <div className="font-display font-bold text-[clamp(2rem,5vw,3.75rem)] text-black leading-none tracking-tight">
              {eintrag.jahr}
            </div>
            <div className="pt-1">
              <ul className="space-y-2">
                {eintrag.projekte.map((p, i) => (
                  <li
                    key={i}
                    className="font-body text-sm text-anthrazit leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-sand mt-[0.4em] shrink-0 text-[0.5rem]">
                      ▪
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
