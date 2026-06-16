import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjektBySlug, projekte, featuredProjekte } from "@/data/projekte";
import ProjectCard from "@/components/ProjectCard";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projekte.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const projekt = getProjektBySlug(params.slug);
  if (!projekt) return {};
  return {
    title: projekt.titel,
    description: projekt.beschreibungKurz,
  };
}

export default function ProjektDetailPage({ params }: Props) {
  const projekt = getProjektBySlug(params.slug);
  if (!projekt) notFound();

  const weitere = featuredProjekte
    .filter((p) => p.slug !== projekt.slug)
    .slice(0, 3);

  const facts: { label: string; value: string }[] = [
    { label: "Kategorie", value: projekt.kategorie },
    { label: "Ort", value: projekt.ort },
    { label: "Jahr", value: String(projekt.jahr) },
    { label: "Status", value: projekt.status === "aktuell" ? "Aktuell" : "Abgeschlossen" },
    ...(projekt.leistung ? [{ label: "Leistung", value: projekt.leistung }] : []),
    ...(projekt.flaeche ? [{ label: "Fläche", value: projekt.flaeche }] : []),
  ];

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[440px] bg-black flex items-end overflow-hidden">
        {/* Gradient placeholder — replace with next/image once cover image exists */}
        <div className="absolute inset-0 bg-gradient-to-br from-anthrazit via-[#1a1a1a] to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 max-w-site mx-auto px-container w-full pb-14 pt-24">
          {projekt.untertitel && (
            <p className="font-body text-grau text-xs uppercase tracking-widest mb-3">
              {projekt.untertitel}
            </p>
          )}
          <h1 className="font-display font-black text-white text-[clamp(2rem,6vw,5rem)] leading-tight tracking-tight max-w-3xl">
            {projekt.titel}
          </h1>
        </div>
      </section>

      {/* Facts grid */}
      <section className="bg-white border-b border-black/8 py-10 px-container">
        <div className="max-w-site mx-auto">
          <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="font-body text-[0.65rem] text-grau uppercase tracking-widest mb-1.5">
                  {label}
                </dt>
                <dd className="font-body font-medium text-black text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Description */}
      <section className="bg-white py-section px-container">
        <div className="max-w-site mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          <div>
            <p className="font-body text-grau text-xs uppercase tracking-widest">
              Projektbeschreibung
            </p>
          </div>
          <div className="space-y-5">
            <p className="font-body text-lg md:text-xl text-black leading-relaxed font-medium">
              {projekt.beschreibungKurz}
            </p>
            <p className="font-body text-anthrazit leading-relaxed">
              {projekt.beschreibungLang}
            </p>
          </div>
        </div>
      </section>

      {/* Image gallery — placeholders */}
      <section className="bg-black py-6 px-container">
        <div className="max-w-site mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { span: "md:col-span-2", aspect: "aspect-[16/7]" },
            { span: "", aspect: "aspect-[4/3]" },
            { span: "", aspect: "aspect-[4/3]" },
          ].map(({ span, aspect }, i) => (
            <div
              key={i}
              className={`relative overflow-hidden ${span} ${aspect} bg-gradient-to-br from-anthrazit/60 to-black`}
            >
              {/* Replace with next/image once images are available:
              <Image
                src={projekt.bilder[i] ?? projekt.coverImage}
                alt={`${projekt.titel} – Bild ${i + 1}`}
                fill
                className="object-cover"
              /> */}
            </div>
          ))}
        </div>
      </section>

      {/* Back + weitere Projekte */}
      <section className="bg-white py-section px-container border-t border-black/8">
        <div className="max-w-site mx-auto">
          <Link
            href="/projekte"
            className="font-body text-sm text-grau hover:text-black transition-colors duration-200"
          >
            ← Alle Projekte
          </Link>

          {weitere.length > 0 && (
            <div className="mt-16">
              <p className="font-body text-xs uppercase tracking-widest text-grau mb-8">
                Weitere Projekte
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {weitere.map((p) => (
                  <ProjectCard key={p.id} projekt={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
