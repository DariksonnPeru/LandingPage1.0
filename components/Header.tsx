// components/Header.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { t, LOCALES, type Locale } from "../lib/i18n";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname() || "/";

  const [scrolled, setScrolled] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const locale = useMemo<Locale>(() => {
    const parts = pathname.split("/").filter(Boolean);
    const first = (parts[0] as Locale) || "es";
    return ((LOCALES as readonly string[]).includes(first) ? first : "es") as Locale;
  }, [pathname]);

  useEffect(() => {
    setHydrated(true);
    const onScroll = () => setScrolled(window.scrollY > 4);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function goTo(id: string) {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const linkStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    borderRadius: 12,
    padding: "8px 12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "none",
    cursor: "pointer",
    fontWeight: 700,
    color: "var(--fg)"
  };

  const homeHref = `/${locale}`;
  const isOnHome = pathname.replace(/\/+$/, "") === homeHref;

  return (
    <header className="site-header" data-scrolled={hydrated && scrolled ? "" : undefined}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          width: "100%",
          maxWidth: "none",
          marginInline: 0,
          paddingInline: "var(--space-8)"
        }}
      >
        {/* LOGO + NOMBRE (desktop) / solo LOGO (mobile) */}
        <Link
          href={homeHref}
          aria-label="Ir al inicio"
          onClick={(e) => {
            if (isOnHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="brand-link"
          style={{ textDecoration: "none" }}
        >
          <span className="brand-logo">
            <Image
              src="/logo1.0.png"
              alt="Darikson — Inicio"
              width={40}
              height={40}
              priority
              style={{ objectFit: "contain" }}
            />
          </span>
          <span className="brand-name-visible">{t("app_title", locale)}</span>
          <span className="sr-only">{t("app_title", locale)}</span>
        </Link>

        <nav className="wrap gap-4" style={{ alignItems: "center" }}>
          <button aria-label={t("nav_pagina2", locale)} onClick={() => goTo("arquitectura")} style={linkStyle}>
            {t("nav_pagina2", locale)}
          </button>
          <button aria-label={t("nav_pagina3", locale)} onClick={() => goTo("construccion")} style={linkStyle}>
            {t("nav_pagina3", locale)}
          </button>
        </nav>
      </div>

      <style>{`
        .brand-link{display:inline-flex;align-items:center;gap:10px;color:var(--fg)}
        .brand-logo{
          width:40px;height:40px;border-radius:10px;border:1px solid var(--border);
          background:var(--bg);display:grid;place-items:center;overflow:hidden
        }
        .brand-name-visible{
          font-weight:800;letter-spacing:-.02em;font-size:1.05rem;color:var(--fg);
        }
        @media (max-width: 639px){
          .brand-name-visible{display:none}
        }
        .sr-only{
          position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
          clip:rect(0,0,0,0);white-space:nowrap;border:0
        }
      `}</style>
    </header>
  );
}
