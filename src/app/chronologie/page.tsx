'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { chronologie } from '@/data/chronologie'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = ['2021', '2011', '2006', '1997–2000', '1991', '1986–1994']

export default function ChronologiePage() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const yearIndicatorRef = useRef<HTMLDivElement>(null)
  const [aktivesJahr, setAktivesJahr] = useState(chronologie[0]?.jahr ?? '')
  const [hintVisible, setHintVisible] = useState(true)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const progressBar = progressRef.current
    const hint = hintRef.current

    if (!section || !track) return

    // Hint nach 2s einblenden, bei erstem Scroll ausblenden
    const hintTimeout = setTimeout(() => {
      if (hint) gsap.to(hint, { opacity: 1, duration: 0.6 })
    }, 2000)

    const handleFirstScroll = () => {
      if (hint) gsap.to(hint, { opacity: 0, duration: 0.4 })
      setHintVisible(false)
      window.removeEventListener('scroll', handleFirstScroll)
    }
    window.addEventListener('scroll', handleFirstScroll)

    // Karten-Reveal Animationen (müssen vor ScrollTrigger gesetzt werden)
    const cards = track.querySelectorAll('.chrono-card')

    // Haupt-Timeline für horizontalen Scroll
    let ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBar) {
              progressBar.style.width = `${self.progress * 100}%`
            }
            const index = Math.min(
              Math.floor(self.progress * chronologie.length),
              chronologie.length - 1
            )
            setAktivesJahr(chronologie[index]?.jahr ?? '')
          },
        },
      })

      tl.to(track, {
        x: () => -totalWidth,
        ease: 'none',
      })

      // Pro Karte: Liste staggered einblenden
      cards.forEach((card) => {
        const items = card.querySelectorAll('li')
        const milestone = card.classList.contains('is-milestone')

        gsap.from(items, {
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: 'left 80%',
            toggleActions: 'play none none reverse',
          },
          y: 16,
          opacity: 0,
          stagger: 0.03,
          duration: 0.35,
          ease: 'power2.out',
        })

        if (milestone) {
          gsap.from(card.querySelector('.milestone-bar'), {
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
            scaleY: 0,
            duration: 0.6,
            ease: 'power3.out',
            transformOrigin: 'top center',
          })
        }
      })
    })

    return () => {
      clearTimeout(hintTimeout)
      window.removeEventListener('scroll', handleFirstScroll)
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      {/* Scroll Space + Pinned Section */}
      <main className="relative">

        {/* Pinned horizontal section */}
        <section
          ref={sectionRef}
          className="relative h-screen overflow-hidden bg-white"
        >
          {/* Großer Seiten-Titel oben links */}
          <div className="absolute top-24 left-10 z-20 pointer-events-none">
            <span className="font-display text-[11px] uppercase tracking-[0.25em] text-[#8A8A8A]">
              graf architekten — Chronologie
            </span>
          </div>

          {/* Aktives Jahr Indicator oben rechts */}
          <div
            ref={yearIndicatorRef}
            className="absolute top-24 right-10 z-20 pointer-events-none"
          >
            <span className="font-display text-[11px] uppercase tracking-[0.25em] text-[#8A8A8A]">
              {aktivesJahr}
            </span>
          </div>

          {/* Horizontaler Track */}
          <div
            ref={trackRef}
            className="flex h-full"
            style={{ width: `${chronologie.length * 480}px` }}
          >
            {chronologie.map((entry, i) => {
              const isMilestone = MILESTONES.includes(entry.jahr)
              const isAlternate = i % 3 === 2

              return (
                <div
                  key={entry.jahr}
                  className={`chrono-card relative flex-shrink-0 h-full px-14 pt-36 pb-16 overflow-hidden ${isMilestone ? 'is-milestone' : ''}`}
                  style={{
                    width: '480px',
                    backgroundColor: isMilestone
                      ? '#0D0D0D'
                      : isAlternate
                      ? '#F8F8F6'
                      : '#FFFFFF',
                    borderLeft: isMilestone
                      ? 'none'
                      : '1px solid #EBEBEB',
                  }}
                >
                  {/* Großes Hintergrund-Jahr */}
                  <span
                    className="absolute top-16 left-8 font-display font-black leading-none pointer-events-none select-none"
                    style={{
                      fontSize: '130px',
                      color: isMilestone ? '#FFFFFF' : '#0D0D0D',
                      opacity: isMilestone ? 0.04 : 0.05,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {entry.jahr}
                  </span>

                  {/* Milestone Bar (vertikale Linie links) */}
                  {isMilestone && (
                    <div
                      className="milestone-bar absolute left-0 top-0 w-[3px] h-full bg-[#fdad00]"
                    />
                  )}

                  {/* Jahr Label */}
                  <div className="mb-2">
                    <span
                      className="font-display text-[11px] uppercase tracking-[0.2em]"
                      style={{ color: isMilestone ? '#8A8A8A' : '#8A8A8A' }}
                    >
                      {entry.jahr}
                    </span>
                  </div>

                  {/* Trennlinie */}
                  <div
                    className="mb-6"
                    style={{
                      width: '32px',
                      height: '1px',
                      backgroundColor: isMilestone ? '#FFFFFF' : '#0D0D0D',
                      opacity: isMilestone ? 0.3 : 1,
                    }}
                  />

                  {/* Optionaler Titel */}
                  {entry.titel && (
                    <p
                      className="font-display font-bold text-[15px] mb-5 leading-snug"
                      style={{ color: isMilestone ? '#FFFFFF' : '#0D0D0D' }}
                    >
                      {entry.titel}
                    </p>
                  )}

                  {/* Projektliste — scrollbar falls zu lang */}
                  <ul
                    className="overflow-y-auto pr-2"
                    style={{
                      maxHeight: 'calc(100vh - 260px)',
                      scrollbarWidth: 'none',
                    }}
                  >
                    {entry.projekte.map((projekt, j) => (
                      <li
                        key={j}
                        className="text-[13px] leading-relaxed pb-3 mb-3"
                        style={{
                          color: isMilestone ? '#A0A0A0' : '#2A2A2A',
                          borderBottom: `1px solid ${isMilestone ? 'rgba(255,255,255,0.07)' : '#F0F0F0'}`,
                        }}
                      >
                        {/* Highlight 1. Preis / Auszeichnung */}
                        {projekt.includes('1. PREIS') || projekt.includes('Auszeichnung') || projekt.includes('Anerkennung') ? (
                          <span>
                            {projekt.replace('— 1. PREIS', '').replace('— Anerkennung', '').replace('Abgeschlossen mit Auszeichnung:', '')}
                            <span className="inline-block ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#fdad00] text-black rounded-sm">
                              {projekt.includes('1. PREIS') ? '1. Preis' : 'Auszeichnung'}
                            </span>
                          </span>
                        ) : (
                          projekt
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Fortschrittsbalken unten */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EBEBEB] z-20">
            <div
              ref={progressRef}
              className="h-full bg-[#0D0D0D] transition-none"
              style={{ width: '0%' }}
            />
          </div>

          {/* Scroll Hint */}
          <div
            ref={hintRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 pointer-events-none"
            style={{ opacity: 0 }}
          >
            <span className="font-display text-[11px] uppercase tracking-[0.2em] text-[#8A8A8A]">
              scrollen
            </span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-[#8A8A8A]"
                  style={{
                    animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(4px); }
        }
        ul::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  )
}
