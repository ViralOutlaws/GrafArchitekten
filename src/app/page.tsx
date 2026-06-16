import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import TypewriterText from "@/components/ui/typewriter-text";
import { featuredProjekte } from "@/data/projekte";
import ProjectsSection from '@/components/ProjectsSection';

export const metadata: Metadata = {
  title: "graf architekten gmbh | Memmingen",
  description:
    "Architekturbüro in Memmingen – Wohnungsbau, Gewerbebau, öffentliche Bauten. Seit 1994.",
};

const SERVICES = [
  "Häuser + Wohnungsbau",
  "Büro + Verwaltung",
  "Industrie + Gewerbe",
  "Schulen + Bildung",
  "Hotel + Gastronomie",
  "Denkmalpflege",
  "Energetische Sanierung",
  "Kirchliche Bauten",
];

const STATS = [
  { zahl: "30+", label: "Jahre Erfahrung" },
  { zahl: "200+", label: "Projekte" },
  { zahl: "1", label: "Region" },
];

export default function Home() {
  const featured = featuredProjekte.slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* Vision Section */}
      <section className="relative bg-white flex items-center justify-center py-40">
        <div className="w-full max-w-4xl mx-auto px-10 md:px-20">
          <TypewriterText
            text="Raum ist nicht das, was man baut. Raum ist das, was man fühlt."
            speed={35}
            className="font-display font-black text-[#0D0D0D] leading-tight"
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              letterSpacing: '-0.03em',
            }}
          />
        </div>
      </section>

      <ProjectsSection />

      {/* Featured Projects */}
      <section id="projekte" className="bg-black py-section px-container">
        <div className="max-w-site mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display font-bold text-white text-[clamp(1.25rem,3vw,2rem)] tracking-tight">
              Ausgewählte Projekte
            </h2>
            <Link
              href="/projekte"
              className="font-body text-sm text-grau hover:text-white transition-colors duration-200"
            >
              Alle Projekte&nbsp;→
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featured.map((projekt) => (
              <ProjectCard
                key={projekt.id}
                projekt={projekt}
                variant="featured"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Strip */}
      <section className="bg-white border-t border-black/5 py-14 px-container">
        <div className="max-w-site mx-auto">
          <ScrollReveal className="flex flex-wrap gap-2.5 md:gap-3">
            {SERVICES.map((s) => (
              <span
                key={s}
                className="font-body font-medium text-xs md:text-sm border border-anthrazit px-4 py-2 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
              >
                {s}
              </span>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Chronologie Teaser */}
      <section className="relative bg-[#0D0D0D] overflow-hidden py-32 px-10 md:px-20">

        {/* Hintergrund: große laufende Jahreszahlen */}
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <div className="chronoteaser-track flex gap-16 whitespace-nowrap">
            {['2026','2021','2011','2006','1997','1991','1986','2026','2021','2011','2006','1997','1991','1986'].map((y, i) => (
              <span
                key={i}
                className="font-display font-black text-white leading-none"
                style={{ fontSize: 'clamp(120px, 18vw, 220px)', opacity: 0.04, letterSpacing: '-0.04em' }}
              >
                {y}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Label */}
          <span className="font-display text-[11px] uppercase tracking-[0.25em] text-[#8A8A8A] mb-12 block">
            Seit 1986 — Memmingen
          </span>

          {/* Headline */}
          <h2 className="font-display font-black text-white leading-none mb-16"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)', letterSpacing: '-0.03em' }}>
            40 Jahre.<br />
            <span style={{ color: '#C8B89A' }}>Eine Haltung.</span>
          </h2>

          {/* CTA */}
          <div className="mt-12 flex items-center gap-4">
            <Link
              href="/chronologie"
              className="group inline-flex items-center gap-4 font-display text-[13px] uppercase tracking-[0.2em] text-white border border-[#2A2A2A] px-8 py-4 hover:bg-white hover:text-[#0D0D0D] transition-colors duration-300"
            >
              Vollständige Chronologie
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
