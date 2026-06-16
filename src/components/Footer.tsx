import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-site mx-auto px-container pt-20 pb-14">
        <p className="font-display font-bold leading-tight tracking-tight text-[clamp(2rem,5vw,3.75rem)] mb-16 max-w-lg">
          Architektur, die zu Ihnen passt.
        </p>

        <div className="border-t border-white/10 pt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="font-display font-bold text-white text-sm mb-4">
              graf architekten gmbh
            </p>
            <address className="not-italic font-body text-sm text-white/50 space-y-1 leading-relaxed">
              <p>Elke Graf</p>
              <p>Ulmer Str. 8</p>
              <p>87700 Memmingen</p>
            </address>
            <div className="mt-5 font-body text-sm text-white/50 space-y-1">
              <p>
                T{" "}
                <a
                  href="tel:+498331957600"
                  className="hover:text-white transition-colors duration-200"
                >
                  +49 (0) 83 31 – 95 76-0
                </a>
              </p>
              <p>F +49 (0) 83 31 – 95 76-16</p>
              <a
                href="mailto:info@architekten-graf.de"
                className="text-sand hover:text-white transition-colors duration-200 block"
              >
                info@architekten-graf.de
              </a>
            </div>
          </div>

          <div className="md:text-right flex flex-col justify-between gap-8">
            <nav className="flex md:justify-end gap-6 flex-wrap">
              {[
                { href: "/projekte", label: "Projekte" },
                { href: "/profil", label: "Profil" },
                { href: "/chronologie", label: "Chronologie" },
                { href: "/kontakt", label: "Kontakt" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-sm text-white/40 hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <p className="font-body text-xs text-white/25 leading-relaxed">
              © {year} graf architekten gmbh
              <br />
              Architekten seit 1994, Memmingen
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
