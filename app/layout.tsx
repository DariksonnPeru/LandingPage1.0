// app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GSAPRuntime from "./gsap-runtime";

import {
  IBM_Plex_Mono,
  Fraunces,
  Manrope,
  Sora,
  Work_Sans,
  Cormorant_Garamond,
  Source_Sans_3,
  Archivo,
  Archivo_Narrow,
  Syne,
  Plus_Jakarta_Sans,
  JetBrains_Mono
} from "next/font/google";

const headFont = Manrope({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-head" });
const bodyFont = Manrope({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-body" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono" });

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "700"], variable: "--ff-fraunces" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"], variable: "--ff-manrope" });
const sora = Sora({ subsets: ["latin"], weight: ["400", "700"], variable: "--ff-sora" });
const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--ff-worksans" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"], variable: "--ff-cormorant" });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"], weight: ["400", "700"], variable: "--ff-sourcesans3" });
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "700"], variable: "--ff-archivo" });
const archivoNarrow = Archivo_Narrow({ subsets: ["latin"], weight: ["400", "700"], variable: "--ff-archivonarrow" });
const syne = Syne({ subsets: ["latin"], weight: ["400", "700"], variable: "--ff-syne" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--ff-plusjakarta" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--ff-jetbrainsmono" });

export const metadata: Metadata = {
  title: "Servicios Generales Darikson",
  description: "Servicios Generales Darikson"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="js">
      <body
        className={[
          headFont.variable,
          bodyFont.variable,
          plexMono.variable,
          fraunces.variable,
          manrope.variable,
          sora.variable,
          workSans.variable,
          cormorant.variable,
          sourceSans3.variable,
          archivo.variable,
          archivoNarrow.variable,
          syne.variable,
          plusJakarta.variable,
          jetbrainsMono.variable,
          "antialiased",
          "palette-darikson"
        ].join(" ")}
        suppressHydrationWarning
      >
        <GSAPRuntime />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
  