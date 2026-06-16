import type { TeamMitglied } from "@/types";

interface Props {
  mitglied: TeamMitglied;
}

export default function TeamCard({ mitglied }: Props) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] bg-gradient-to-b from-[#e5e0d8] to-[#c8bfb0] mb-6 overflow-hidden" />

      <h3 className="font-display font-bold text-xl tracking-tight">
        {mitglied.vorname} {mitglied.name}
      </h3>
      {mitglied.titel && (
        <p className="font-body text-xs text-grau mt-0.5">{mitglied.titel}</p>
      )}
      <p className="font-body text-sm text-anthrazit mt-1 font-medium">{mitglied.rolle}</p>
      <p className="font-body text-sm text-grau leading-relaxed mt-3">{mitglied.bio}</p>
    </article>
  );
}
