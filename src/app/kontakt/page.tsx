import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "graf architekten gmbh – Kontakt und Anfahrt. Architekturbüro in Memmingen, Ulmer Str. 8.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-20 px-container bg-white">
        <div className="max-w-site mx-auto">
          <h1 className="font-display font-black text-[clamp(3rem,10vw,7.5rem)] leading-[0.93] tracking-tight">
            SPRECHEN
            <br />
            WIR.
          </h1>
        </div>
      </section>

      <section className="bg-white pb-section px-container">
        <div className="max-w-site mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Kontaktdaten */}
          <ScrollReveal>
            <div>
              <p className="font-display font-bold text-2xl tracking-tight mb-8">
                graf architekten gmbh
              </p>

              <address className="not-italic font-body text-anthrazit space-y-1 text-base leading-relaxed">
                <p>Elke Graf</p>
                <p>Ulmer Str. 8</p>
                <p>87700 Memmingen</p>
              </address>

              <div className="mt-8 font-body text-anthrazit space-y-2 text-base">
                <p>
                  T&nbsp;
                  <a
                    href="tel:+498331957600"
                    className="hover:text-black transition-colors duration-200"
                  >
                    +49 (0) 83 31 – 95 76-0
                  </a>
                </p>
                <p>F&nbsp;+49 (0) 83 31 – 95 76-16</p>
                <p>
                  <a
                    href="mailto:info@architekten-graf.de"
                    className="text-sand hover:text-black transition-colors duration-200 font-medium"
                  >
                    info@architekten-graf.de
                  </a>
                </p>
              </div>

              <div className="mt-10 pt-10 border-t border-black/8">
                <p className="font-body text-xs uppercase tracking-widest text-grau mb-3">
                  So finden Sie uns
                </p>
                <p className="font-body text-sm text-anthrazit leading-relaxed">
                  Das Büro liegt im Herzen Memmingens, nahe dem Stadtring. Parkmöglichkeiten
                  finden Sie in der Ulmer Straße sowie in den umliegenden Parkhäusern.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Karte */}
          <ScrollReveal delay={0.1}>
            <div className="w-full aspect-[4/3] overflow-hidden bg-[#e8e4de]">
              <iframe
                src="https://maps.google.com/maps?q=Ulmer+Str.+8+87700+Memmingen&output=embed&hl=de&z=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Standort graf architekten gmbh – Ulmer Str. 8, Memmingen"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
