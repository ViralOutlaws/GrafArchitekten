import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { projekte } from "@/data/projekte";

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Portfolio von graf architekten gmbh – Wohnungsbau, Gewerbebau, öffentliche Bauten in Memmingen und der Region.",
};

export default function ProjektePage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-14 px-container bg-white">
        <div className="max-w-site mx-auto">
          <h1 className="font-display font-black text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.93] tracking-tight overflow-hidden">
            PROJEKTE
          </h1>
          <p className="font-body text-grau text-sm mt-5">
            Eine Auswahl realisierter und aktueller Projekte
          </p>
        </div>
      </section>

      <ProjectGrid projekte={projekte} showFilter />
    </>
  );
}
