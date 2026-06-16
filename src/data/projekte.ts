import type { Projekt } from "@/types";

export const projekte: Projekt[] = [
  {
    id: "1",
    slug: "stadthaus-freudenthalstrasse",
    titel: "Stadthaus im Park",
    untertitel: "18 Wohneinheiten, 7 Geschosse",
    kategorie: "Wohnungsbau",
    ort: "Freudenthalstraße, Memmingen",
    jahr: 2024,
    status: "aktuell",
    beschreibungKurz:
      "Urbanes Stadthaus in exponierter Parklage – ein Dialog zwischen Architektur und Grünraum.",
    beschreibungLang:
      "Das Stadthaus an der Freudenthalstraße in Memmingen fügt sich als sorgfältig proportionierter Baukörper in die Parksituation ein. 18 Wohneinheiten auf 7 Geschossen schaffen hochwertigen Wohnraum in stadtnaher Lage. Die klare Formensprache mit großflächigen Verglasungen schafft fließende Übergänge zwischen Innen- und Außenraum. Hochwertige Materialien, ein durchdachtes Raumgefüge und die Ausrichtung zur umgebenden Parklandschaft machen das Gebäude zu einem Beispiel zeitgemäßen Wohnens in der Stadt.",
    leistung: "Vollplanung LPH 1–9",
    coverImage: "/images/projekte/stadthaus-freudenthalstrasse/cover.jpg",
    bilder: [
      "/images/projekte/stadthaus-freudenthalstrasse/01.jpg",
      "/images/projekte/stadthaus-freudenthalstrasse/02.jpg",
      "/images/projekte/stadthaus-freudenthalstrasse/03.jpg",
    ],
    featured: true,
    flaeche: "2.100 m²",
  },
  {
    id: "2",
    slug: "lieblingsplatz-bad-woerishofen",
    titel: "Lieblingsplatz Bad Wörishofen",
    untertitel: "Gastronomie + Einzelhandel",
    kategorie: "Gewerbe + Industrie",
    ort: "Bad Wörishofen",
    jahr: 2024,
    status: "abgeschlossen",
    beschreibungKurz:
      "Ein Ort zum Verweilen – Gastronomie und Einzelhandel in reduzierter, atmosphärischer Gestaltung.",
    beschreibungLang:
      "Der Lieblingsplatz in Bad Wörishofen verbindet Gastronomie, Genuss und Aufenthaltsqualität unter einem Dach. Die architektonische Konzeption setzt auf natürliche Materialien, warme Oberflächen und eine Raumfolge, die Intimität und Offenheit zugleich ermöglicht. Das Projekt unterstreicht, dass auch gewerbliche Bauten eine eigene Charakterstärke entwickeln können.",
    leistung: "Vollplanung LPH 1–9",
    coverImage: "/images/projekte/lieblingsplatz-bad-woerishofen/cover.jpg",
    bilder: [
      "/images/projekte/lieblingsplatz-bad-woerishofen/01.jpg",
      "/images/projekte/lieblingsplatz-bad-woerishofen/02.jpg",
      "/images/projekte/lieblingsplatz-bad-woerishofen/03.jpg",
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "loft-office-flughafen-memmingen",
    titel: "Loft Office Flughafen Memmingen",
    untertitel: "Gebäude 32",
    kategorie: "Flughafen",
    ort: "Allgäu Airport, Memmingen",
    jahr: 2025,
    status: "aktuell",
    beschreibungKurz:
      "Offenes Loft-Büro im Umfeld des Allgäu Airports – Arbeiten zwischen Weitblick und Konzentration.",
    beschreibungLang:
      "Das Loft Office am Flughafen Memmingen schafft eine moderne Arbeitsumgebung, die Offenheit und Flexibilität in den Vordergrund stellt. Die industriell geprägte Loft-Ästhetik trifft auf eine sorgfältige Materialauswahl: Sichtbeton, Stahl und Holz erzeugen eine zeitlose Arbeitsatmosphäre. Großzügige Fensterfronten zum Vorfeld unterstreichen den besonderen Standortcharakter.",
    leistung: "Vollplanung LPH 1–9",
    coverImage: "/images/projekte/loft-office-flughafen-memmingen/cover.jpg",
    bilder: [
      "/images/projekte/loft-office-flughafen-memmingen/01.jpg",
      "/images/projekte/loft-office-flughafen-memmingen/02.jpg",
      "/images/projekte/loft-office-flughafen-memmingen/03.jpg",
    ],
    featured: false,
    flaeche: "580 m²",
  },
  {
    id: "4",
    slug: "logistikstandort-refood-memmingen",
    titel: "Bürogebäude + Verladehalle ReFood",
    untertitel: "Industrie + Logistik",
    kategorie: "Gewerbe + Industrie",
    ort: "Memmingen",
    jahr: 2023,
    status: "abgeschlossen",
    beschreibungKurz:
      "Funktionale Logistikarchitektur – Klarheit als gestalterisches Prinzip.",
    beschreibungLang:
      "Der Logistikstandort ReFood in Memmingen zeigt, dass auch Industriearchitektur Haltung ausdrücken kann. Die klare Gebäudegliederung, die präzise Ausführung der Fassade und die funktionale Raumorganisation verbinden Wirtschaftlichkeit mit architektonischer Sorgfalt. Das Projekt steht für das Bestreben von graf architekten, auch im gewerblichen Bau keine Kompromisse bei der Qualität einzugehen.",
    leistung: "Vollplanung LPH 1–9",
    coverImage: "/images/projekte/logistikstandort-refood-memmingen/cover.jpg",
    bilder: [
      "/images/projekte/logistikstandort-refood-memmingen/01.jpg",
      "/images/projekte/logistikstandort-refood-memmingen/02.jpg",
    ],
    featured: false,
  },
  {
    id: "5",
    slug: "buergerhaus-memmingen-ost",
    titel: "Bürger- & Familienhaus Memmingen Ost",
    untertitel: "Wettbewerb 1. Preis 2021",
    kategorie: "Wettbewerb",
    ort: "Memmingen Ost",
    jahr: 2021,
    status: "abgeschlossen",
    beschreibungKurz:
      "Wettbewerbsgewinn 2021 – Ein Haus für alle Generationen im aufstrebenden Ostquartier Memmingens.",
    beschreibungLang:
      "Das Bürger- und Familienhaus im Memminger Osten entstand aus einem gewonnenen Wettbewerb im Jahr 2021. Das Konzept sieht ein offenes, multifunktionales Gemeinschaftsgebäude vor, das als Ankerpunkt im Quartier dient. Flexible Grundrisse ermöglichen vielfältige Nutzungen für alle Altersgruppen – von Veranstaltungen über Beratungsangebote bis hin zu informellen Begegnungszonen. Die Architektur vermittelt Offenheit und Zugänglichkeit.",
    leistung: "Wettbewerbsentwurf",
    coverImage: "/images/projekte/buergerhaus-memmingen-ost/cover.jpg",
    bilder: [
      "/images/projekte/buergerhaus-memmingen-ost/01.jpg",
      "/images/projekte/buergerhaus-memmingen-ost/02.jpg",
      "/images/projekte/buergerhaus-memmingen-ost/03.jpg",
    ],
    featured: true,
  },
  {
    id: "6",
    slug: "kirchengemeindehaus-frickenhausen",
    titel: "Kirchengemeindehaus Frickenhausen",
    untertitel: "Neubau Gemeindezentrum",
    kategorie: "Öffentlich",
    ort: "Frickenhausen",
    jahr: 2022,
    status: "abgeschlossen",
    beschreibungKurz:
      "Neues Gemeindezentrum für eine lebendige Kirchengemeinde – offen, einladend, zeitgemäß.",
    beschreibungLang:
      "Das Kirchengemeindehaus in Frickenhausen schafft einen modernen Ort für Gemeinschaft und Begegnung. Die Architektur nimmt Bezug auf die ortstypische Baukultur und verbindet sie mit einer zeitgemäßen Formensprache. Multifunktionale Räume ermöglichen den vielfältigen Bedürfnissen der Gemeinde gerecht zu werden – von der Jugendarbeit bis zur Seniorenbegegnung.",
    leistung: "Vollplanung LPH 1–9",
    coverImage: "/images/projekte/kirchengemeindehaus-frickenhausen/cover.jpg",
    bilder: [
      "/images/projekte/kirchengemeindehaus-frickenhausen/01.jpg",
      "/images/projekte/kirchengemeindehaus-frickenhausen/02.jpg",
    ],
    featured: false,
  },
  {
    id: "7",
    slug: "studentenwohnheim-kempten",
    titel: "Studentenwohnheim Kempten",
    untertitel: "35 Appartements",
    kategorie: "Wohnungsbau",
    ort: "Kempten",
    jahr: 2022,
    status: "abgeschlossen",
    beschreibungKurz:
      "35 Appartements für Studierende – kompaktes Wohnen mit klarer Struktur und hoher Aufenthaltsqualität.",
    beschreibungLang:
      "Das Studentenwohnheim in Kempten bietet 35 Appartements für Studierende in kompakter, effizienter Bauweise. Die klare Grundrissorganisation ermöglicht individuelle Rückzugsmöglichkeiten ebenso wie gemeinschaftliche Begegnungszonen. Hochwertige Ausstattung und durchdachte Grundrisse schaffen Wohnqualität auch im kleinen Maßstab.",
    leistung: "Vollplanung LPH 1–9",
    coverImage: "/images/projekte/studentenwohnheim-kempten/cover.jpg",
    bilder: [
      "/images/projekte/studentenwohnheim-kempten/01.jpg",
      "/images/projekte/studentenwohnheim-kempten/02.jpg",
      "/images/projekte/studentenwohnheim-kempten/03.jpg",
    ],
    featured: true,
    flaeche: "1.800 m²",
  },
  {
    id: "8",
    slug: "stadtmuseum-hermannsbau",
    titel: "Stadtmuseum Hermannsbau",
    untertitel: "Denkmalpflege + Sanierung",
    kategorie: "Denkmal",
    ort: "Memmingen",
    jahr: 2020,
    status: "abgeschlossen",
    beschreibungKurz:
      "Behutsame Sanierung eines historischen Stadthauses – die Vergangenheit für die Zukunft bewahren.",
    beschreibungLang:
      "Der Hermannsbau in Memmingen ist eines der bedeutendsten Bürgerpalais der Stadt. Die Sanierung und Neunutzung als Stadtmuseum vereint denkmalpflegerische Sorgfalt mit einer zeitgemäßen Museumsgestaltung. Historische Substanz und neue Nutzungsanforderungen werden sensibel in Einklang gebracht – ein Zeugnis für den respektvollen Umgang mit gebautem Erbe.",
    leistung: "Denkmalpflege, Planung + Bauleitung",
    coverImage: "/images/projekte/stadtmuseum-hermannsbau/cover.jpg",
    bilder: [
      "/images/projekte/stadtmuseum-hermannsbau/01.jpg",
      "/images/projekte/stadtmuseum-hermannsbau/02.jpg",
      "/images/projekte/stadtmuseum-hermannsbau/03.jpg",
    ],
    featured: false,
  },
  {
    id: "9",
    slug: "wohnheim-lebenshilfe",
    titel: "Wohnheim Lebenshilfe",
    untertitel: "36 Wohneinheiten, inklusives Wohnen",
    kategorie: "Öffentlich",
    ort: "Memmingen",
    jahr: 2021,
    status: "abgeschlossen",
    beschreibungKurz:
      "Inklusives Wohnheim für Menschen mit Behinderung – würdevolles Wohnen als architektonisches Prinzip.",
    beschreibungLang:
      "Das Wohnheim der Lebenshilfe in Memmingen bietet 36 Wohneinheiten für Menschen mit Behinderung. Die Architektur stellt die Bedürfnisse der Bewohnerinnen und Bewohner in den Mittelpunkt: barrierefreie Erschließung, übersichtliche Grundrisse und angemessene Gemeinschaftsbereiche schaffen ein Zuhause, das Selbstbestimmung und soziale Teilhabe ermöglicht.",
    leistung: "Vollplanung LPH 1–9",
    coverImage: "/images/projekte/wohnheim-lebenshilfe/cover.jpg",
    bilder: [
      "/images/projekte/wohnheim-lebenshilfe/01.jpg",
      "/images/projekte/wohnheim-lebenshilfe/02.jpg",
    ],
    featured: false,
    flaeche: "2.400 m²",
  },
  {
    id: "10",
    slug: "wohnanlage-altusried",
    titel: "Wohnanlage Altusried",
    untertitel: "102 Wohneinheiten",
    kategorie: "Wohnungsbau",
    ort: "Altusried",
    jahr: 2023,
    status: "aktuell",
    beschreibungKurz:
      "Großes Wohnbauprojekt im Allgäu – vielfältiges Wohnangebot für alle Lebensphasen.",
    beschreibungLang:
      "Die Wohnanlage in Altusried umfasst 102 Wohneinheiten verschiedener Größen und Typologien. Das Ensemble schafft einen lebendigen Wohnkomplex mit differenzierten Außenräumen und klar gegliederten Baukörpern. Hohe Wohnqualität und wirtschaftliche Bauweise schließen sich hier nicht aus – ein Projekt, das zeigt, wie skalierter Wohnungsbau Qualität halten kann.",
    leistung: "Vollplanung LPH 1–9",
    coverImage: "/images/projekte/wohnanlage-altusried/cover.jpg",
    bilder: [
      "/images/projekte/wohnanlage-altusried/01.jpg",
      "/images/projekte/wohnanlage-altusried/02.jpg",
      "/images/projekte/wohnanlage-altusried/03.jpg",
    ],
    featured: true,
    flaeche: "7.500 m²",
  },
];

export const featuredProjekte = projekte.filter((p) => p.featured);

export function getProjektBySlug(slug: string): Projekt | undefined {
  return projekte.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projekte.map((p) => p.slug);
}
