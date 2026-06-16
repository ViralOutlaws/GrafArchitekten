# graf architekten gmbh — Website

Bold-Modern Website für das Architekturbüro graf architekten gmbh, Memmingen.  
Geschäftsführerin: Elke Graf — [info@architekten-graf.de](mailto:info@architekten-graf.de)

---

## Tech Stack

| Paket | Zweck |
|---|---|
| **Next.js 14** (App Router) | Framework |
| **TypeScript** | Typsicherheit |
| **Tailwind CSS** | Styling + Design Tokens |
| **GSAP + ScrollTrigger** | Text-Reveals, Scroll-Animationen |
| **Framer Motion** | Page Transitions (schwarzes Overlay) |
| **@studio-freight/lenis** | Smooth Scroll |
| **Space Grotesk + Inter** | Typografie via next/font/google |

---

## Setup

```bash
npm install
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

---

## Seitenstruktur

```
/                    → Home (Hero + Featured Projects + Statement + Services)
/projekte            → Alle Projekte (Masonry-Grid, filterbar)
/projekte/[slug]     → Projektdetailseite
/profil              → Studio-Text + Team + Leistungsbereiche
/chronologie         → Projektchronologie seit 1994 (GSAP ScrollTrigger)
/kontakt             → Adresse, Tel, Mail, Google Maps
```

---

## Bilder ablegen

### Projektbilder

Alle Bilder kommen in `public/images/projekte/[slug]/`.

| Slug | Ordner |
|---|---|
| `stadthaus-freudenthalstrasse` | `public/images/projekte/stadthaus-freudenthalstrasse/` |
| `lieblingsplatz-bad-woerishofen` | `public/images/projekte/lieblingsplatz-bad-woerishofen/` |
| `loft-office-flughafen-memmingen` | `public/images/projekte/loft-office-flughafen-memmingen/` |
| `logistikstandort-refood-memmingen` | `public/images/projekte/logistikstandort-refood-memmingen/` |
| `buergerhaus-memmingen-ost` | `public/images/projekte/buergerhaus-memmingen-ost/` |
| `kirchengemeindehaus-frickenhausen` | `public/images/projekte/kirchengemeindehaus-frickenhausen/` |
| `studentenwohnheim-kempten` | `public/images/projekte/studentenwohnheim-kempten/` |
| `stadtmuseum-hermannsbau` | `public/images/projekte/stadtmuseum-hermannsbau/` |
| `wohnheim-lebenshilfe` | `public/images/projekte/wohnheim-lebenshilfe/` |
| `wohnanlage-altusried` | `public/images/projekte/wohnanlage-altusried/` |

**Dateinamen je Projekt:**
- `cover.jpg` — Hauptbild (Hero der Detailseite)
- `01.jpg`, `02.jpg`, `03.jpg` — Galeriebilder

**Empfohlene Größen:**
- Cover: min. 1600 × 1067 px, JPG, < 500 KB
- Galerie: min. 1400 × 1050 px

### Teamfotos

```
public/images/team/elke-graf.jpg      → Hochformat 3:4, min. 800×1067 px
public/images/team/sven-mueller.jpg   → Hochformat 3:4, min. 800×1067 px
public/images/team/petra-eder.jpg     → Hochformat 3:4, min. 800×1067 px
```

### Bilder einbinden (nach Lieferung)

In `src/components/ProjectCard.tsx` das Gradient-Div ersetzen durch:
```tsx
import Image from "next/image";
// ...
<Image
  src={projekt.coverImage}
  alt={projekt.titel}
  fill
  className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

In `src/components/TeamCard.tsx` und `src/app/profil/page.tsx` das Gradient-Div ersetzen durch:
```tsx
<Image
  src={person.foto}
  alt={`${person.vorname} ${person.name}`}
  fill
  className="object-cover object-top"
  sizes="(max-width: 768px) 100vw, 33vw"
/>
```

---

## Design-System

| Token | Wert | Verwendung |
|---|---|---|
| `black` | `#0D0D0D` | Hintergrund Hero, Text |
| `white` | `#FFFFFF` | Seitenhintergrund |
| `anthrazit` | `#2A2A2A` | Footer, dunkle Sections |
| `sand` | `#C8B89A` | Akzentfarbe (sparsam) |
| `grau` | `#8A8A8A` | Subtext, Labels |
| Display-Font | Space Grotesk | Headlines, Display-Text |
| Body-Font | Inter | Fließtext, Labels, Nav |

---

## Noch offen (nach Bildlieferung / Abstimmung)

- [ ] Echte Bilder in `public/images/` ablegen → Image-Komponenten aktivieren
- [ ] Texte in `src/data/projekte.ts` mit Elke Graf abstimmen (beschreibungKurz, beschreibungLang)
- [ ] Werdegang Elke Graf vervollständigen (`src/data/team.ts`)
- [ ] Impressum-Seite anlegen (`src/app/impressum/page.tsx`)
- [ ] Datenschutz-Seite anlegen (`src/app/datenschutz/page.tsx`)
- [ ] Footer: Links zu Impressum + Datenschutz ergänzen

---

## Deployment

```bash
npm run build   # Produktions-Build (alle 18 Seiten statisch generiert)
npm start       # Lokaler Produktionsserver
```

Empfehlung: **Vercel** — `vercel deploy` oder GitHub-Integration (automatisch bei Push).
