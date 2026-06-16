"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/projekte", label: "Projekte" },
  { href: "/profil", label: "Über uns" },
  { href: "/chronologie", label: "Chronologie" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isHeroPage = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-black/8"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-site mx-auto px-container flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="group flex items-baseline gap-1.5">
            <span
              className={`font-display font-bold text-xl tracking-tight transition-colors duration-300 ${
                isHeroPage && !scrolled ? "text-white" : "text-black"
              }`}
            >
              graf
            </span>
            <span
              className={`font-display font-normal text-xl tracking-tight transition-colors duration-300 ${
                isHeroPage && !scrolled
                  ? "text-white/50 group-hover:text-white"
                  : "text-grau group-hover:text-black"
              }`}
            >
              architekten
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-body text-sm font-medium nav-link transition-colors duration-300 ${
                  pathname === href
                    ? isHeroPage && !scrolled
                      ? "text-white"
                      : "text-black"
                    : isHeroPage && !scrolled
                    ? "text-white/60 hover:text-white"
                    : "text-grau hover:text-black"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px origin-center transition-colors ${
                menuOpen
                  ? "bg-white"
                  : isHeroPage && !scrolled
                  ? "bg-white"
                  : "bg-black"
              }`}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className={`block w-6 h-px transition-colors ${
                menuOpen
                  ? "bg-white"
                  : isHeroPage && !scrolled
                  ? "bg-white"
                  : "bg-black"
              }`}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px origin-center transition-colors ${
                menuOpen
                  ? "bg-white"
                  : isHeroPage && !scrolled
                  ? "bg-white"
                  : "bg-black"
              }`}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-container"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={href}
                    className="font-display font-bold text-[clamp(2.5rem,8vw,4rem)] text-white hover:text-sand transition-colors duration-300 leading-tight block py-1"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute bottom-12 left-container"
              style={{ left: "clamp(1.5rem, 5vw, 4rem)" }}
            >
              <p className="font-body text-white/40 text-sm">
                info@architekten-graf.de
              </p>
              <p className="font-body text-white/40 text-sm mt-0.5">
                +49 (0) 83 31 – 95 76-0
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
