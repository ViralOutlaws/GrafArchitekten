"use client";

import { useState } from "react";
import type { Projekt } from "@/types";
import ProjectCard from "./ProjectCard";

type Filter = "Alle" | "aktuell" | "abgeschlossen";

interface Props {
  projekte: Projekt[];
  showFilter?: boolean;
}

export default function ProjectGrid({ projekte, showFilter = false }: Props) {
  const [filter, setFilter] = useState<Filter>("Alle");

  const filtered =
    filter === "Alle" ? projekte : projekte.filter((p) => p.status === filter);

  return (
    <section className="px-container pb-section bg-white">
      <div className="max-w-site mx-auto">
        {showFilter && (
          <div className="flex gap-8 mb-12 border-b border-black/10 pb-6">
            {(["Alle", "aktuell", "abgeschlossen"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-body text-sm font-medium transition-all duration-200 pb-1 border-b-2 ${
                  filter === f
                    ? "border-black text-black"
                    : "border-transparent text-grau hover:text-black"
                }`}
              >
                {f === "Alle"
                  ? "Alle"
                  : f === "aktuell"
                  ? "Aktuell"
                  : "Abgeschlossen"}
              </button>
            ))}
          </div>
        )}

        {/* Masonry-style columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {filtered.map((projekt, i) => {
            const aspectVariant =
              i % 7 === 0
                ? "aspect-[3/4]"
                : i % 4 === 2
                ? "aspect-square"
                : "aspect-[4/5]";

            return (
              <div key={projekt.id} className="break-inside-avoid mb-4">
                <ProjectCard
                  projekt={projekt}
                  className={aspectVariant}
                />
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="font-body text-grau text-sm py-16 text-center">
            Keine Projekte in dieser Kategorie.
          </p>
        )}
      </div>
    </section>
  );
}
