'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { team } from '@/data/team';

export default function ProfilPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  const activeMember = team.find((t) => t.id === activeId);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-white"
    >

      {/* Hero Headline */}
      <section className="px-10 md:px-20 pt-48 pb-24 border-b border-[#EBEBEB]">
        <span className="font-display text-[11px] uppercase tracking-[0.25em] text-[#8A8A8A] mb-8 block">
          Über uns
        </span>
        <h1
          className="font-display font-black leading-none"
          style={{
            fontSize: 'clamp(36px, 5vw, 72px)',
            letterSpacing: '-0.03em',
            color: '#0D0D0D',
          }}
        >
          Seit 1986.<br />
          Aus Memmingen.<br />
          <span style={{ color: '#8A8A8A' }}>Für die Region.</span>
        </h1>
      </section>

      {/* Team Section */}
      <section className="px-10 md:px-20 py-24">
        <span className="font-display text-[11px] uppercase tracking-[0.25em] text-[#8A8A8A] mb-16 block">
          Das Team
        </span>

        <div className="flex flex-col">
          {team.map((member, index) => (
            <TeamRow
              key={member.id}
              data={member}
              index={index}
              isActive={activeId === member.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
            />
          ))}
        </div>
      </section>

      {/* Desktop Floating Image */}
      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {activeId && (
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative h-72 w-56 overflow-hidden"
                style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.15)' }}
              >
                {activeMember?.foto ? (
                  <Image
                    src={activeMember.foto}
                    alt="Vorschau"
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-[#F0F0F0] flex items-center justify-center">
                    <span className="font-display text-[11px] uppercase tracking-widest text-[#8A8A8A]">
                      Kein Foto
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function TeamRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
}: {
  data: any;
  index: number;
  isActive: boolean;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
  isAnyActive: boolean;
}) {
  const isDimmed = isAnyActive && !isActive;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDimmed ? 0.25 : 1,
        y: 0,
      }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={() => isMobile && setActiveId(isActive ? null : data.id)}
      className={`group relative border-t border-[#EBEBEB] last:border-b transition-colors duration-500 ${
        isMobile ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <div className="relative z-10 flex flex-col py-8 md:flex-row md:items-center md:justify-between md:py-12">

        {/* Name */}
        <div className="flex items-baseline gap-6 md:gap-12 transition-transform duration-500 group-hover:translate-x-4">
          <span className="font-display text-[11px] text-[#C8B89A] tracking-widest">
            0{index + 1}
          </span>
          <h2
            className="font-display font-black leading-none transition-colors duration-300"
            style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              letterSpacing: '-0.03em',
              color: isActive ? '#0D0D0D' : '#8A8A8A',
            }}
          >
            {data.vorname} {data.name}
          </h2>
        </div>

        {/* Rolle + Icon */}
        <div className="mt-4 flex items-center justify-between md:mt-0 md:gap-12">
          <div className="flex flex-col items-end gap-1">
            <span className="font-display text-[11px] uppercase tracking-[0.2em] text-[#8A8A8A] transition-colors group-hover:text-[#0D0D0D]">
              {data.rolle}
            </span>
            {data.titel && (
              <span className="font-display text-[11px] text-[#C8B89A] tracking-wide">
                {data.titel}
              </span>
            )}
          </div>

          <div className="block md:hidden text-[#8A8A8A] ml-6">
            {isActive ? <Minus size={16} /> : <Plus size={16} />}
          </div>

          <motion.div
            animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
            className="hidden md:block text-[#0D0D0D]"
          >
            <ArrowUpRight size={24} strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* Werdegang — klappt auf */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-12 md:pl-24">
              {/* Mobile Foto */}
              {isMobile && data.foto && (
                <div className="relative w-full aspect-[4/3] mb-8 overflow-hidden">
                  <Image
                    src={data.foto}
                    alt={`${data.vorname} ${data.name}`}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              )}

              {/* Werdegang Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-0">
                {data.werdegang?.map((eintrag: any, i: number) => (
                  <div
                    key={i}
                    className="flex gap-8 py-4 border-b border-[#F0F0F0] last:border-none"
                  >
                    <span
                      className="font-display text-[11px] text-[#C8B89A] tracking-widest shrink-0 pt-0.5"
                      style={{ minWidth: '60px' }}
                    >
                      {eintrag.jahr}
                    </span>
                    <span className="font-display text-[13px] text-[#2A2A2A] leading-relaxed">
                      {eintrag.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
