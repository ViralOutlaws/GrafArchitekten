"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        ".hero-word",
        { y: "105%", skewY: 3 },
        { y: "0%", skewY: 0, stagger: 0.055, duration: 1.1, ease: "expo.out" }
      )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sky = document.querySelector('.hero-sky') as HTMLElement
    const house = document.querySelector('.hero-house') as HTMLElement
    const headline = document.querySelector('.hero-headline') as HTMLElement

    if (!sky || !house) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      sky.style.transform = `translateY(${scrollY * 0.15}px)`
      house.style.transform = `translateY(${scrollY * 0.35}px)`
      if (headline) {
        headline.style.transform = `translateY(${scrollY * 0.1}px)`
        headline.style.opacity = `${1 - scrollY / 500}`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">

      {/* Layer 1: Himmel — bewegt sich am langsamsten */}
      <div
        className="hero-sky absolute inset-0 w-full h-[120%] top-[-10%]"
        style={{ willChange: 'transform' }}
      >
        <Image
          src="/images/hero/Hero-Sky.png"
          alt="Himmel"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      {/* Layer 2: Haus — bewegt sich schneller */}
      <div
        className="hero-house absolute inset-0 w-full h-[120%] top-[-5%]"
        style={{ willChange: 'transform' }}
      >
        <Image
          src="/images/hero/Hero-House.png"
          alt="Haus"
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>

{/* Text-Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-10 md:px-20">
        <span className="font-display text-[11px] uppercase tracking-[0.25em] text-white/70 mb-6 block">
          graf architekten gmbh — Memmingen
        </span>
        <h1
          className="hero-headline font-display font-black leading-none mb-8"
          style={{
            fontSize: 'clamp(40px, 6vw, 88px)',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
          }}
        >
          WIR ENTWERFEN.<br />
          <span style={{ color: '#FFFFFF', opacity: 0.7 }}>WAS BLEIBT.</span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="w-8 h-px bg-white/60" />
          <span className="font-display text-[12px] uppercase tracking-[0.2em] text-white/60">
            Architektur seit 1986
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-10 z-20 flex flex-col items-center gap-2">
        <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]" style={{ writingMode: 'vertical-rl' }}>
          Scrollen
        </span>
        <div className="w-px h-12 bg-[#8A8A8A] origin-top" style={{ animation: 'scrollLine 1.5s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
