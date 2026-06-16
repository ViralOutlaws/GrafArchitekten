import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "graf architekten gmbh | Memmingen",
    template: "%s | graf architekten gmbh",
  },
  description:
    "Architekturbüro in Memmingen – Wohnungsbau, Gewerbebau, öffentliche Bauten. Seit 1994. Geschäftsführerin: Elke Graf.",
  metadataBase: new URL("https://www.architekten-graf.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "graf architekten gmbh",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="bg-white text-black antialiased overflow-x-hidden">
        <CustomCursor />
        <LenisProvider>
          <Header />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
