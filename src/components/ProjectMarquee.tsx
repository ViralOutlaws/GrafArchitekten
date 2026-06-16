'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const ZEILE_1 = [
  'Stadthaus im Park',
  'Lieblingsplatz Bad Wörishofen',
  'Loft Office Flughafen',
  'Wettbewerb Memmingen Ost',
  'Künstlervilla Memmingen',
  'ReFood Logistikzentrum',
  'Rechtsamt Stadt Memmingen',
  'Studentenwohnheim Kempten',
  'Wohnanlage Altusried',
  'Kirchengemeindehaus Frickenhausen',
  'Boardinghouse Ochsenhausen',
  'Eissporthalle Memmingen',
  'Bürgerstift Memmingen',
  'Kindergarten Woringen',
  'LEGOLAND Günzburg',
];

const ZEILE_2 = [
  'Fa. Pfeifer Seil- und Hebetechnik',
  'Rathaus Woringen',
  'Shelter 23 Flugzeugmuseum',
  'Wohnanlage Habsburger Hof',
  'VR-Bank Maximilianstraße',
  'Kirche Unser Frauen',
  'Fa. Rohde + Schwarz',
  'Zeile-Haus Weinmarkt',
  'Feuerwehr Erlenmoos',
  'Geschäftshaus Hallhof',
  'Polizei Laupheim',
  'AOK Memmingen',
  'Wohnanlage Isny',
  'Pfarrhof Memmingerberg',
  'Baustoffe Wassermann',
];

function MarqueeRow({
  items,
  direction = 1,
  speed = 35,
}: {
  items: string[];
  direction?: 1 | -1;
  speed?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{
          x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="inline-flex items-center font-display font-black uppercase"
            style={{
              fontSize: 'clamp(32px, 5vw, 72px)',
              letterSpacing: '-0.02em',
              color: i % 2 === 0 ? '#0D0D0D' : 'transparent',
              WebkitTextStroke: i % 2 !== 0 ? '1.5px #0D0D0D' : 'none',
              paddingRight: 'clamp(32px, 4vw, 80px)',
            }}
          >
            {name}
            <span
              className="inline-block mx-6 md:mx-10"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#C8B89A',
                flexShrink: 0,
                verticalAlign: 'middle',
              }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ProjectMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1], [60, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="relative bg-white py-24 overflow-hidden"
    >
      {/* Label + Heading */}
      <motion.div style={{ y }} className="px-10 md:px-20 mb-16">
        <span className="font-display text-[11px] uppercase tracking-[0.25em] text-[#8A8A8A] mb-4 block">
          Ausgewählte Projekte
        </span>
        <div className="flex items-end justify-between">
          <h2
            className="font-display font-black leading-none"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              letterSpacing: '-0.03em',
              color: '#0D0D0D',
            }}
          >
            Was wir entworfen haben.
          </h2>
          <Link
            href="/projekte"
            className="group hidden md:inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.25em] text-[#0D0D0D] border-b border-[#0D0D0D] pb-1 hover:gap-5 transition-all duration-300"
          >
            Alle Projekte
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>

      {/* Marquee Zeile 1 — links */}
      <div className="mb-4">
        <MarqueeRow items={ZEILE_1} direction={1} speed={40} />
      </div>

      {/* Marquee Zeile 2 — rechts */}
      <div className="mb-16">
        <MarqueeRow items={ZEILE_2} direction={-1} speed={35} />
      </div>

      {/* Mobile CTA */}
      <div className="px-10 md:hidden">
        <Link
          href="/projekte"
          className="group inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.25em] text-[#0D0D0D] border-b border-[#0D0D0D] pb-1"
        >
          Alle Projekte →
        </Link>
      </div>
    </motion.section>
  );
}
