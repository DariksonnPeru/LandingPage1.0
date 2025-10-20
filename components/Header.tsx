// components/Header.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { t, LOCALES, type Locale } from "../lib/i18n";
import Link from "next/link";
import Image from "next/image";

const CSS = `
.site-header{position:sticky;top:0;z-index:60;background:var(--header-bg, var(--bg))}
.header-bar{display:flex;align-items:center;justify-content:space-between;height:64px;width:100%;padding-inline:var(--space-8,16px)}
.brand-link{display:inline-flex;align-items:center;gap:10px;color:var(--fg);text-decoration:none}
.brand-logo{width:40px;height:40px;border-radius:10px;border:1px solid var(--border);background:var(--bg);display:grid;place-items:center;overflow:hidden}
.brand-name-visible{font-weight:800;letter-spacing:-.02em;font-size:1.05rem;color:var(--fg)}
.nav-desktop{display:flex;align-items:center;gap:10px}
.hamburger{background:transparent;border:1px solid var(--border);width:40px;height:40px;border-radius:10px;display:none;align-items:center;justify-content:center}
.mobile-panel{position:fixed;top:64px;right:0;left:0;z-index:50;background:var(--bg);border-top:1px solid var(--border);box-shadow:var(--shadow-md);padding:8px;display:grid;gap:8px}
.mobile-panel[hidden]{display:none!important}
.mobile-link{width:100%;text-align:center;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:12px;font-weight:700;color:var(--fg)}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media (max-width:639px){.brand-name-visible{display:none}.nav-desktop{display:none}.hamburger{display:inline-flex}.mobile-link:active{transform:translateY(1px)}}
@media (min-width:640px){.mobile-panel{display:none!important}}
`;

export default function Header() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("es" as Locale);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean);
    const first = (parts[0] as Locale) || "es";
    setLocale(((LOCALES as readonly string[]).includes(first) ? first : "es") as Locale);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    const onResize = () => { if (window.innerWidth >= 640 && open) setOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node;
      if (panelRef.current && panelRef.current.contains(target)) return;
      if (toggleRef.current && toggleRef.current.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [open]);

  function goTo(id: string) {
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
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
    color: "var(--fg)",
    lineHeight: 1.2
  };

  const homeHref = `/${locale}`;
  const isOnHome = pathname.replace(/\/+$/, "") === homeHref;

  return (
    <header className="site-header" data-scrolled={scrolled ? "" : undefined}>
      <div className="header-bar">
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
        >
          <span className="brand-logo">
            <Image src="/logo1.0.png" alt="Darikson — Inicio" width={40} height={40} priority style={{ objectFit: "contain" }} />
          </span>
          <span className="brand-name-visible" suppressHydrationWarning>{t("app_title", locale)}</span>
          <span className="sr-only" suppressHydrationWarning>{t("app_title", locale)}</span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          <button type="button" aria-label={t("nav_pagina2", locale)} onClick={() => goTo("arquitectura")} style={linkStyle}>
            <span suppressHydrationWarning>{t("nav_pagina2", locale)}</span>
          </button>
          <button type="button" aria-label={t("nav_pagina3", locale)} onClick={() => goTo("construccion")} style={linkStyle}>
            <span suppressHydrationWarning>{t("nav_pagina3", locale)}</span>
          </button>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="hamburger"
          aria-label="Abrir menú"
          aria-haspopup="menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className="mobile-panel"
        hidden={!open}
        role="menu"
        aria-label="Primary mobile"
      >
        <button type="button" role="menuitem" onClick={() => goTo("arquitectura")} className="mobile-link">
          <span suppressHydrationWarning>{t("nav_pagina2", locale)}</span>
        </button>
        <button type="button" role="menuitem" onClick={() => goTo("construccion")} className="mobile-link">
          <span suppressHydrationWarning>{t("nav_pagina3", locale)}</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: CSS }} />
    </header>
  );
}
