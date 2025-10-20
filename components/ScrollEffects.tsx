// components/ScrollEffects.tsx
"use client";
import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("enhanced");
    return () => root.classList.remove("enhanced");
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate]")
    );

    const reduce =
      typeof window !== "undefined" &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      elements.forEach((el) => el.classList.add("show"));
      return;
    }

    let mounted = true;
    const cleanups: Array<() => void> = [];

    (async () => {
      try {
        const gsapMod = await import("gsap");
        const stMod = await import("gsap/ScrollTrigger");
        if (!mounted) return;

        const gsap = gsapMod.default;
        const ScrollTrigger = stMod.default;

        gsap.registerPlugin(ScrollTrigger);

        elements.forEach((el) => {
          gsap.set(el, { opacity: 0, y: 16 });

          const tween = gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 10%",
              toggleActions: "play none none none",
            },
            onComplete: () => el.classList.add("show"),
          });

          cleanups.push(() => {
            try {
              const trigger = (tween as unknown as { scrollTrigger?: { kill: () => void } }).scrollTrigger;
              trigger?.kill?.();
            } catch {}
            try {
              tween?.kill?.();
            } catch {}
          });
        });
      } catch {
        if (!mounted) return;
        elements.forEach((el) => el.classList.add("show"));
      }
    })();

    return () => {
      mounted = false;
      for (const fn of cleanups) {
        try {
          fn();
        } catch {}
      }
    };
  }, []); 
  return null;
}
