'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FEATURED = [
  { id: 1, name: 'Stadthaus im Park', ort: 'Memmingen', kategorie: 'Wohnungsbau' },
  { id: 5, name: 'Wettbewerb Memmingen Ost', ort: 'Memmingen', kategorie: 'Wettbewerb' },
  { id: 3, name: 'Loft Office Flughafen', ort: 'Memmingen', kategorie: 'Büro' },
  { id: 12, name: 'LEGOLAND Deutschland', ort: 'Günzburg', kategorie: 'Freizeit' },
];

export default function ProjectsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative bg-white py-32 overflow-hidden">

      {/* Header */}
      <div className="px-10 md:px-20 mb-16 flex items-end justify-between">
        <div>
          <span className="font-display text-[11px] uppercase tracking-[0.25em] text-[#8A8A8A] mb-4 block">
            Projekte
          </span>
          <h2
            className="font-display font-black leading-none text-[#0D0D0D]"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              letterSpacing: '-0.03em',
            }}
          >
            200+ Projekte.<br />
            <span style={{ color: '#8A8A8A' }}>Eine Handschrift.</span>
          </h2>
        </div>

        <Link
          href="/projekte"
          className="hidden md:inline-flex group items-center gap-3 font-display text-[11px] uppercase tracking-[0.25em] text-[#0D0D0D] border-b border-[#0D0D0D] pb-1 hover:gap-5 transition-all duration-300"
        >
          Alle Projekte
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* 4 Karten */}
      <div className="px-10 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-3">
        {FEATURED.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
            className="relative overflow-hidden cursor-pointer"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Bild */}
            <Image
              src={`/images/portfolio/${project.id}.PNG`}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-700 ease-out"
              style={{
                transform: hovered === project.id ? 'scale(1.06)' : 'scale(1)',
              }}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.1) 50%, transparent 100%)',
                opacity: hovered === project.id ? 1 : 0.6,
              }}
            />

            {/* Text unten */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <span
                className="font-display text-[10px] uppercase tracking-[0.2em] text-[#C8B89A] block mb-2 transition-transform duration-300"
                style={{
                  transform: hovered === project.id ? 'translateY(0)' : 'translateY(4px)',
                  opacity: hovered === project.id ? 1 : 0.7,
                }}
              >
                {project.kategorie} — {project.ort}
              </span>
              <h3
                className="font-display font-black text-white leading-tight"
                style={{
                  fontSize: 'clamp(14px, 1.5vw, 20px)',
                  letterSpacing: '-0.02em',
                }}
              >
                {project.name}
              </h3>
            </div>

            {/* Hover: Nummer oben rechts */}
            <motion.span
              className="absolute top-4 right-4 font-display text-[11px] tracking-widest text-white/50"
              animate={{ opacity: hovered === project.id ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="px-10 mt-12 md:hidden">
        <Link
          href="/projekte"
          className="inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.25em] text-[#0D0D0D] border-b border-[#0D0D0D] pb-1"
        >
          Alle Projekte →
        </Link>
      </div>

    </section>
  );
}
