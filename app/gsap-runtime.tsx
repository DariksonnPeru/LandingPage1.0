// app/gsap-runtime.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPRuntime() {
  const pathname = usePathname();
  const mountedRef = useRef(false);
  const cleaningRef = useRef(false);
  const ctxRef = useRef<gsap.Context | null>(null);

  const rafRefresh = () => {
    requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch {}
    });
  };

  // Limpia estilos inline dejados por animaciones previas
  const clearAnimatedProps = () => {
    const selectors = [
      ".reveal",
      ".reveal-left",
      ".reveal-right",
      ".reveal-up",
      ".scale-img img",
      ".stagger > *",
      ".stat-number",
      ".hero-overlay",
    ].join(",");

    gsap.utils.toArray<HTMLElement>(selectors).forEach((el) => {
      gsap.set(el, { clearProps: "all" });
    });
  };

  const buildGlobals = () => {
    gsap.set(
      [".reveal", ".reveal-left", ".reveal-right", ".reveal-up", ".scale-img img"],
      { opacity: 1 }
    );

    const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
    reveals.forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    const lefts = gsap.utils.toArray<HTMLElement>(".reveal-left");
    lefts.forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        x: -24,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    const rights = gsap.utils.toArray<HTMLElement>(".reveal-right");
    rights.forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        x: 24,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    const ups = gsap.utils.toArray<HTMLElement>(".reveal-up");
    ups.forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    const groups = gsap.utils.toArray<HTMLElement>(".stagger");
    groups.forEach((g) => {
      const isHero = !!g.closest(".hero-content");
      const kids = Array.from(g.children).filter(
        (n) => !(n as HTMLElement).classList.contains("hero-title")
      );
      if (!kids.length) return;

      gsap.from(kids, {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: "power2.out",
        ...(isHero
          ? {}
          : {
              scrollTrigger: {
                trigger: g,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }),
      });
    });

    const scales = gsap.utils.toArray<HTMLElement>(".scale-img");
    scales.forEach((box) => {
      const img = box.querySelector("img");
      if (!img) return;
      gsap.from(img, {
        scale: 1.16,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: box,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    });

    const counters = gsap.utils.toArray<HTMLElement>(".stat-number");
    counters.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-target") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => {
          obj.v = 0;
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: "power1.out",
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}${suffix}`;
            },
          });
        },
        onLeaveBack: () => {
          gsap.killTweensOf(obj);
          obj.v = 0;
          el.textContent = `0${suffix}`;
        },
      });
    });

    const header = document.querySelector<HTMLElement>(".site-header");
    if (header) {
      ScrollTrigger.create({
        start: 0,
        onUpdate: (self) => {
          if (self.scroll() > 4) header.setAttribute("data-scrolled", "");
          else header.removeAttribute("data-scrolled");
        },
      });
    }
  };

  const buildAcabados = () => {
    const hero = document.querySelector<HTMLElement>(".acab-hero");
    const heroImg = document.querySelector<HTMLElement>(".acab-hero-img");
    if (hero && heroImg) {
      gsap.to(heroImg, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
      });
      const kids = hero.querySelectorAll(".hero-content .stagger > *:not(.hero-title)");
      if (kids.length) {
        gsap.from(kids, { opacity: 0, y: 32, duration: 0.9, ease: "power3.out", stagger: 0.12 });
      }
    }
  };

  const buildArquitectura = () => {
    const hero = document.querySelector<HTMLElement>(".arch-hero");
    const heroImg = document.querySelector<HTMLElement>(".arch-hero-img");
    if (hero && heroImg) {
      gsap.fromTo(
        heroImg,
        { scale: 1.06, yPercent: -6 },
        {
          scale: 1,
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
        }
      );
      const kids = hero.querySelectorAll(".hero-content .stagger > *:not(.hero-title)");
      if (kids.length)
        gsap.from(kids, { opacity: 0, y: 28, duration: 0.8, ease: "power3.out", stagger: 0.1 });
    }
  };

  const buildConstruccion = () => {
    const hero = document.querySelector<HTMLElement>(".hero-video");
    if (hero) {
      const allKids = hero.querySelectorAll<HTMLElement>(".hero-content .stagger > *");
      gsap.set(allKids, { opacity: 1, clearProps: "transform" });

      const kids = hero.querySelectorAll<HTMLElement>(".hero-content .stagger > *:not(.hero-title)");
      if (kids.length) {
        gsap.set(kids, { opacity: 1 });
        gsap.from(kids, {
          opacity: 0,
          y: 26,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        });
      }

      const overlay = hero.querySelector<HTMLElement>(".hero-overlay");
      if (overlay) {
        gsap.fromTo(
          overlay,
          { opacity: 0.85 },
          { opacity: 0.45, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 } }
        );
      }
    }
  };

  const init = () => {
    document.body.classList.add("gsap-ready");

    ctxRef.current = gsap.context(() => {
      buildGlobals();
      buildAcabados();
      buildArquitectura();
      buildConstruccion();
    }, document.documentElement);

    rafRefresh();
  };

  const destroy = () => {
    if (cleaningRef.current) return;
    cleaningRef.current = true;
    try {
      ctxRef.current?.revert();
      ctxRef.current = null;
      clearAnimatedProps();
    } catch {}
    setTimeout(() => {
      cleaningRef.current = false;
    }, 0);
  };

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    init();

    const onPageShow = (e: Event) => {
      // PageTransitionEvent.persisted si está disponible
      const persisted =
        "persisted" in e && typeof (e as { persisted?: unknown }).persisted === "boolean"
          ? Boolean((e as { persisted?: boolean }).persisted)
          : false;

      if (persisted) {
        destroy();
        init();
      } else {
        rafRefresh();
      }
    };

    const onPageHide = () => {
      destroy();
    };

    const onReinit = () => {
      destroy();
      init();
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") rafRefresh();
    };

    window.addEventListener("pageshow", onPageShow, { passive: true });
    window.addEventListener("pagehide", onPageHide, { passive: true });
    window.addEventListener("reinit-gsap", onReinit as EventListener);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("reinit-gsap", onReinit as EventListener);
      document.removeEventListener("visibilitychange", onVisibility);
      destroy();
    };
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;
    destroy();
    init();
  }, [pathname]);

  return null;
}
