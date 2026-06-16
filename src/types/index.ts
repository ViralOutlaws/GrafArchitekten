export interface Projekt {
  id: string;
  slug: string;
  titel: string;
  untertitel?: string;
  kategorie: ProjektKategorie;
  ort: string;
  jahr: number;
  status: "aktuell" | "abgeschlossen";
  beschreibungKurz: string;
  beschreibungLang: string;
  leistung?: string;
  coverImage: string;
  bilder: string[];
  featured: boolean;
  flaeche?: string;
}

export type ProjektKategorie =
  | "Wohnungsbau"
  | "Gewerbe + Industrie"
  | "Öffentlich"
  | "Denkmal"
  | "Wettbewerb"
  | "Flughafen";

export interface Werdegang {
  jahr: string;
  text: string;
}

export interface TeamMitglied {
  id: string;
  vorname: string;
  name: string;
  titel?: string;
  rolle: string;
  bio: string;
  werdegang: Werdegang[];
  foto: string | null;
}

