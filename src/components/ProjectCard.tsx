import Link from "next/link";
import type { Projekt } from "@/types";

interface Props {
  projekt: Projekt;
  className?: string;
  variant?: "default" | "featured";
}

const GRADIENTS = [
  "from-[#1c1c1c] via-[#2a2a2a] to-[#0d0d0d]",
  "from-[#1e1e22] via-[#2a2830] to-[#0d0d0d]",
  "from-[#1a1e1c] via-[#252b28] to-[#0d0d0d]",
  "from-[#1c1a1e] via-[#2a2830] to-[#0d0d0d]",
  "from-[#1e1c1a] via-[#2e2820] to-[#0d0d0d]",
];

function getGradient(id: string): string {
  const index = parseInt(id, 10) % GRADIENTS.length;
  return GRADIENTS[index] ?? GRADIENTS[0]!;
}

export default function ProjectCard({ projekt, className = "", variant = "default" }: Props) {
  const aspectClass = variant === "featured" ? "aspect-[3/4]" : "aspect-[4/5]";

  return (
    <Link
      href={`/projekte/${projekt.slug}`}
      className={`group relative block overflow-hidden ${aspectClass} ${className}`}
    >
      {/* Background gradient placeholder — replace with next/image once images exist */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getGradient(projekt.id)} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]`}
      />

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="font-body text-[0.65rem] font-medium text-white/60 tracking-widest uppercase">
          {projekt.kategorie}
        </span>
      </div>

      {/* Status badge for featured projects */}
      {projekt.status === "aktuell" && (
        <div className="absolute top-4 right-4 z-10">
          <span className="font-body text-[0.6rem] font-medium text-sand tracking-widest uppercase border border-sand/40 px-2 py-0.5">
            Aktuell
          </span>
        </div>
      )}

      {/* Title + info — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <h3 className="font-display font-bold text-white text-lg leading-tight tracking-tight">
          {projekt.titel}
        </h3>
        <p className="font-body text-white/50 text-xs mt-1 tracking-wide">
          {projekt.ort}&nbsp;·&nbsp;{projekt.jahr}
        </p>
      </div>

      {/* Title always visible at bottom (lower opacity) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="font-display font-bold text-white/80 text-base leading-tight tracking-tight">
          {projekt.titel}
        </h3>
      </div>
    </Link>
  );
}
