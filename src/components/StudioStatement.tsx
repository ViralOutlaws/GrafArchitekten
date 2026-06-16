"use client";

import { useRef } from "react";
import Link from "next/link";
import AnimatedText from "./AnimatedText";

export default function StudioStatement() {
  return (
    <section className="px-container py-section max-w-site mx-auto border-t border-stone-light">
      <div className="max-w-3xl">
        <AnimatedText
          tag="blockquote"
          className="font-display text-display-md editorial-heading leading-snug"
        >
          {/* TODO: Zitat / Statement von Elke Graf */}
          „Gute Architektur entsteht im Gespräch – mit dem Ort, den Menschen und den Möglichkeiten des Ortes."
        </AnimatedText>

        <div className="mt-12 flex items-center gap-8">
          <Link
            href="/profil"
            className="tracking-editorial text-sm border-b border-black pb-px hover:border-stone hover:text-stone transition-colors"
          >
            Über das Studio
          </Link>
          <span className="text-stone-light">—</span>
          <span className="tracking-editorial text-stone text-sm">
            Elke Graf, Geschäftsführerin
          </span>
        </div>
      </div>
    </section>
  );
}
