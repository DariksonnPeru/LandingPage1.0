// lib/i18n.ts
export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

const DICT = {
  es: {
    // Header / navegación
    app_title: "Servicios Generales Darikson",
    nav_pagina2: "Arquitectura",
    nav_pagina3: "Construcción",

    // Hero
    hero_title: "Servicios Generales Darikson",
    hero_subtitle: "Diseño funcional, ejecución impecable y comunicación clara de principio a fin.",
    cta_primary: "Cotizar",
    cta_secondary: "Ver proyectos",

    // Meta Home
    meta_title_home: "Servicios Generales Darikson — Arquitectura y Construcción",
    meta_desc_home:
      "Diseño arquitectónico, construcción, acabados y supervisión técnica. Proyectos a medida con calidad, seguridad y entregas puntuales.",

    // Meta Acabados
    meta_title_acabados: "Acabados — Servicios Generales Darikson",
    meta_desc_acabados:
      "Acabados de alta calidad: drywall, vidrios, pintura, carpintería y más. Terminaciones limpias y duraderas.",

    // Meta Arquitectura
    meta_title_arquitectura: "Arquitectura — Servicios Generales Darikson",
    meta_desc_arquitectura:
      "Concepto, anteproyecto, planos ejecutivos y dirección. Compatibilización MEP y documentación clara.",

    // Meta Construcción
    meta_title_construccion: "Construcción — Servicios Generales Darikson",
    meta_desc_construccion:
      "Obra civil, instalaciones, seguridad y control de calidad. Planificación, costos y entregas por hitos.",
  },
  en: {
    // Header / navigation
    app_title: "Darikson General Services",
    nav_pagina2: "Architecture",
    nav_pagina3: "Construction",

    // Hero
    hero_title: "Darikson General Services",
    hero_subtitle:
      "Functional design, flawless execution, and clear communication from start to finish.",
    cta_primary: "Get a Quote",
    cta_secondary: "See projects",

    // Meta Home
    meta_title_home: "Darikson General Services — Architecture & Construction",
    meta_desc_home:
      "Architectural design, construction, finishes, and technical oversight. Tailored projects with quality, safety, and on-time delivery.",

    // Meta Finishes (Acabados)
    meta_title_acabados: "Finishes — Darikson General Services",
    meta_desc_acabados:
      "High-quality finishes: drywall, glass, painting, carpentry and more. Clean, durable results.",

    // Meta Architecture
    meta_title_arquitectura: "Architecture — Darikson General Services",
    meta_desc_arquitectura:
      "Concept, preliminary design, executive drawings and site supervision. MEP coordination and clear documentation.",

    // Meta Construction
    meta_title_construccion: "Construction — Darikson General Services",
    meta_desc_construccion:
      "Civil works, installations, safety and quality control. Planning, budgeting and milestone-based delivery.",
  },
} as const;

type Dict = typeof DICT;
export type EsKeys = keyof Dict["es"];

export function t<K extends EsKeys>(key: K, locale: Locale): string {
  return (DICT[locale] as Record<EsKeys, string>)?.[key] ?? DICT.es[key];
}
