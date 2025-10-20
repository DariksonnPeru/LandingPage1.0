// components/ThemeToggle.tsx
"use client";
import { useEffect, useMemo, useState } from "react";

type Mode = "light" | "dark" | "system";
const STORAGE_MODE = "theme:mode";

function sysPrefersDark() {
  return typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("system");

  const effective = useMemo<"light" | "dark">(() => {
    if (mode === "system") return sysPrefersDark() ? "dark" : "light";
    return mode;
  }, [mode]);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem(STORAGE_MODE) as Mode | null) ?? "system";
    setMode(saved);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.add("palette-marina-arenisca");
    if (effective === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [mounted, effective]);

  useEffect(() => {
    if (!mounted || mode !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const root = document.documentElement;
      if (mql.matches) root.classList.add("dark");
      else root.classList.remove("dark");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [mode, mounted]);

  function cycleMode() {
    const next: Mode = mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    setMode(next);
    localStorage.setItem(STORAGE_MODE, next);
  }

  if (!mounted) return null;

  const isDark = effective === "dark";

  return (
    <button
      aria-label={`Theme: ${mode}`}
      onClick={cycleMode}
      style={{
        background: "transparent",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 8,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-sm)",
        cursor: "pointer"
      }}
    >
      {isDark ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--fg)" }}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--fg)" }}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
