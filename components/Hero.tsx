// components/Hero.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { t, LOCALES, type Locale } from "../lib/i18n";

export default function Hero() {
  const pathname = usePathname() || "/";
  const { locale } = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    const first = (parts[0] as Locale) || "en";
    const isLocale = (LOCALES as readonly string[]).includes(first);
    const loc = (isLocale ? first : "en") as Locale;
    return { locale: loc };
  }, [pathname]);

  return (
    <section className="section">
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
        <div data-animate style={{ display: "grid", gap: "1rem" }}>
          <h1 aria-label={t("hero_title", locale)}>{t("hero_title", locale)}</h1>
          <p className="muted" data-animate aria-label={t("hero_subtitle", locale)}>{t("hero_subtitle", locale)}</p>
          <div className="wrap gap-6" data-animate>
            <Link href={`/${locale}/pagina2`} className="btn" aria-label={t("cta_primary", locale)}>
              {t("cta_primary", locale)}
            </Link>
            <Link href={`/${locale}/pagina3`} className="btn btn-outline" aria-label={t("cta_secondary", locale)}>
              {t("cta_secondary", locale)}
            </Link>
          </div>
        </div>
        <div data-animate className="rounded shadow-lg" style={{ overflow: "hidden" }}>
          <Image
            src="/images/hero.png"
            alt="Hero"
            width={1600}
            height={900}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}
