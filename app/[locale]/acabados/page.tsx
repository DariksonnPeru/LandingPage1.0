// app/[locale]/acabados/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMetadata } from "../../../lib/seo";
import { LOCALES, type Locale } from "../../../lib/i18n";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : "en";

  return getMetadata({
    locale: loc,
    titleKey: "meta_title_acabados",
    descKey: "meta_desc_acabados",
    path: `/${loc}/acabados`,
  });
}

export default async function Page({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (LOCALES as readonly string[]).includes(locale)
    ? (locale as Locale)
    : "en";

  // Misma lógica de Construcción
  const LIGHT = "color-mix(in oklab, var(--accent) 16%, var(--bg))";
  const DARK  = "color-mix(in oklab, var(--accent) 80%, var(--bg))";

  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      {/* HERO (más bajo y sin difuminado) */}
      <section className="hero acab-hero">
        <Image
          src="/media/heroacabado.jpg"
          alt="Acabados profesionales"
          fill
          priority
          sizes="100vw"
          className="hero-img acab-hero-img"
        />
        <div className="hero-shade" aria-hidden />
        {/* <div className="hero-fade" aria-hidden />  ⬅️ Quitado el difuminado */}
        <div className="hero-content">
          <div className="stagger" style={{ textAlign: "center", display: "grid", gap: "12px" }}>
            <h1 className="hero-title">Acabados Profesionales</h1>
            <div className="btn-row" style={{ justifyContent: "center" }} />
          </div>
        </div>
      </section>

      {/* IMPACTO/MÉTRICAS (oscuro) */}
      <section className="section-pad" style={{ background: DARK, color: "#fff" }}>
        <div className="container metrics">
          {[
            { n: 850, s: "+", l: "Proyectos entregados" },
            { n: 98,  s: "%", l: "Satisfacción del cliente" },
            { n: 15,  s: " años", l: "Experiencia" },
            { n: 24,  s: "/7", l: "Soporte técnico" },
          ].map((st, i) => (
            <article key={i} className="metric-card reveal">
              <div className="metric-number stat-number" data-target={st.n} data-suffix={st.s}>0{st.s}</div>
              <div className="metric-label">{st.l}</div>
            </article>
          ))}
        </div>
      </section>

      {/* NUESTROS SERVICIOS (fondo var(--surface)) + ENTRAN DESDE LOS LADOS (sin zoom) */}
      <section id="servicios" className="section-pad bg-quality">
        <div className="container" style={{ display:"grid", gap: "18px" }}>
          <h2 className="section-title" style={{ textAlign:"center" }}>Nuestros servicios</h2>

          <div className="two-col">
            <div className="media-box reveal-right">{/* ⬅️ sin scale-img, animación de entrada */}
              <Image src="/media/acabados-doors.jpg" alt="Puertas" fill className="media-img" />
            </div>
            <div className="text-box reveal-left">
              <h3 className="h3-strong">Puertas</h3>
              <p className="text-muted">Puertas principales, interiores y corredizas en maderas nobles y compuestas, con acabados de alto desempeño.</p>
              <ul className="feature-list">
                {[
                  "Puertas de seguridad y acústicas",
                  "Corredizas y abatibles a medida",
                  "Acabados en barniz, laca o pintura",
                  "Herrajes premium y cierre suave"
                ].map((t,i)=>(<li key={i}><span className="check">✓</span><span>{t}</span></li>))}
              </ul>
            </div>
          </div>

          <div className="two-col">
            <div className="text-box reveal-right">
              <h3 className="h3-strong">Muebles de carpintería</h3>
              <p className="text-muted">Mobiliario a medida: closets, cocinas, bibliotecas y soluciones de almacenamiento con precisión milimétrica.</p>
              <ul className="feature-list">
                {[
                  "Closets y vestidores empotrados",
                  "Cocinas integrales personalizadas",
                  "Bibliotecas y estanterías",
                  "Muebles de baño y lavandería"
                ].map((t,i)=>(<li key={i}><span className="check">✓</span><span>{t}</span></li>))}
              </ul>
            </div>
            <div className="media-box reveal-left">{/* ⬅️ sin scale-img, animación de entrada */}
              <Image src="/media/acabados-furniture.jpeg" alt="Muebles a medida" fill className="media-img" />
            </div>
          </div>

          <div className="two-col">
            <div className="media-box reveal-right">{/* ⬅️ sin scale-img, animación de entrada */}
              <Image src="/media/acabados-drywall-detaill.jpg" alt="Drywall y tabiquería" fill className="media-img" />
            </div>
            <div className="text-box reveal-left">
              <h3 className="h3-strong">Drywall y tabiquería</h3>
              <p className="text-muted">Sistemas ligeros para divisiones, cielos rasos y detalles decorativos. Instalación rápida y limpia.</p>
              <ul className="feature-list">
                {[
                  "Tabiques divisorios y puertas ocultas",
                  "Cielos rasos con luminarias",
                  "Revestimientos y nichos decorativos",
                  "Aislamiento termo-acústico"
                ].map((t,i)=>(<li key={i}><span className="check">✓</span><span>{t}</span></li>))}
              </ul>
            </div>
          </div>

          <div className="two-col">
            <div className="text-box reveal-right">
              <h3 className="h3-strong">Vidrios y aluminio</h3>
              <p className="text-muted">Ventanas, mamparas y divisiones con vidrio templado y perfilería de aluminio. Seguridad y estética.</p>
              <ul className="feature-list">
                {[
                  "Ventanas de aluminio y PVC",
                  "Mamparas templadas y de ducha",
                  "Divisiones de oficina",
                  "Espejos decorativos y a medida"
                ].map((t,i)=>(<li key={i}><span className="check">✓</span><span>{t}</span></li>))}
              </ul>
            </div>
            <div className="media-box reveal-left">{/* ⬅️ sin scale-img, animación de entrada */}
              <Image src="/media/acabados-glass.jpg" alt="Vidrios y aluminio" fill className="media-img" />
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRO PROCESO — fondo igual a “Nuestros servicios” (var(--surface)) */}
      <section className="section-pad bg-quality">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 22 }}>
            Nuestro proceso
          </h2>

          <div className="steps">
            {[
              {
                t: "Consulta y diseño",
                d: "Relevamiento, mediciones y propuesta con renders 3D.",
                icon: (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Z" />
                    <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" />
                  </svg>
                ),
              },
              {
                t: "Selección de materiales",
                d: "Asesoría en maderas, herrajes, vidrios y acabados.",
                icon: (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                    <path d="M2 12l10 5 10-5" />
                    <path d="M2 17l10 5 10-5" />
                  </svg>
                ),
              },
              {
                t: "Fabricación",
                d: "Producción con maquinaria de precisión y QA/QC.",
                icon: (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path d="M19.4 15a7.8 7.8 0 0 0 .1-2l2.1-1.6-2-3.5-2.6.5a7.8 7.8 0 0 0-1.7-1L12 3 9.7 5.4c-.6.2-1.2.6-1.7 1L5.4 6.9l-2 3.5L5.5 12c-.1.7-.1 1.3 0 2l-2.1 1.6 2 3.5 2.6-.5c.5.4 1.1.8 1.7 1L12 21l2.3-2.4c.6-.2 1.2-.6 1.7-1l2.6.5 2-3.5L19.4 15Z" />
                  </svg>
                ),
              },
              {
                t: "Instalación",
                d: "Montaje profesional y protocolos de limpieza.",
                icon: (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 7.6A6 6 0 0 1 12.4 2l2.3 2.3-3.4 3.4L9 5.4A6 6 0 0 1 2 12.4L9.6 20a3 3 0 0 0 4.2 0l2.8-2.8a3 3 0 0 0 0-4.2L13 9.4l3.4-3.4L22 7.6Z" />
                  </svg>
                ),
              },
              {
                t: "Garantía y seguimiento",
                d: "Entrega con garantía y mantenimiento preventivo.",
                icon: (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
                    <path d="m9.5 12.5 2 2 4-4" />
                  </svg>
                ),
              },
            ].map((s, i) => (
              <div key={i} className="step reveal step--plain">
                <div className="step-icon" aria-hidden>{s.icon}</div>
                <div className="step-body">
                  <div className="step-head">
                    <h3 className="step-title">{s.t}</h3>
                  </div>
                  <p className="step-copy">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estilos específicos del bloque de proceso sobre fondo claro */}
        <style>{`
          .step.step--plain{
            display:grid;
            grid-template-columns: auto 1fr;
            gap: 14px;
            align-items: start;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 18px;
            padding: 16px;
            transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
          }
          .step.step--plain:hover{
            transform: translateY(-3px);
            box-shadow: 0 10px 28px rgba(0,0,0,.08);
            border-color: color-mix(in oklab, var(--border) 60%, var(--accent) 40%);
          }
          .step-icon{
            width: 56px; height: 56px; border-radius: 14px; display:grid; place-items:center; flex-shrink:0;
            background:
              radial-gradient(120% 120% at 30% 20%, color-mix(in oklab, var(--accent) 18%, #fff 5%), transparent 60%),
              linear-gradient(160deg, color-mix(in oklab, var(--accent) 28%, var(--bg) 72%) 0%, color-mix(in oklab, var(--accent) 22%, var(--bg) 78%) 100%);
            border: 1px solid color-mix(in oklab, var(--accent) 25%, var(--border));
            box-shadow: 0 8px 18px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.06);
            color: var(--accent-contrast);
          }
          .step-icon svg{ width:28px; height:28px; fill: currentColor; opacity:.96; }
          .step-head{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px; }
          .step-title{ margin:0; font-weight:800; font-size:clamp(1.05rem, 2.2vw, 1.25rem); letter-spacing:.01em; color: inherit; }
          .step-copy{ color: var(--muted); margin:0; line-height:1.7; }
          .steps{ display:grid; gap:14px; grid-template-columns:1fr; }
          @media (min-width:860px){ .steps{ grid-template-columns: repeat(2, minmax(0,1fr)); } }
          @media (min-width:1160px){ .steps{ grid-template-columns: repeat(3, minmax(0,1fr)); } }
          @media (prefers-reduced-motion: reduce){
            .step.step--plain{ transition:none !important }
          }
        `}</style>
      </section>

      {/* CTA final con el color del IMPACT (DARK) */}
      <section id="contacto" className="section-pad" style={{ background: DARK, color:"#fff" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">¿Listo para transformar tu espacio?</h2>
          <p className="text-muted" style={{ maxWidth: 760, margin: "8px auto 0", color:"rgba(255,255,255,.88)" }}>
            Escríbenos y recibe una cotización personalizada sin compromiso.
          </p>
        <div className="btn-row" style={{ justifyContent: "center", marginTop: 12 }}>
            <Link href={`/${loc}#contacto`} className="btnx">Solicitar cotización</Link>
            <Link href={`/${loc}`} className="btnx btnx-outline">Volver al inicio</Link>
          </div>
        </div>
      </section>

      <style>{`
        .container{ width: min(100% - 32px, 1120px); margin-inline:auto; }
        .section-pad{ padding-block: clamp(1.8rem, 6vw, 5.2rem); }

        /* HERO AJUSTADO: menos alto y sin difuminado */
        .hero{ position:relative; min-height: 58svh; isolation:isolate; overflow:hidden; display:grid; place-items:center; }
        .hero-img{ object-fit:cover; z-index:0; }
        .hero-shade{ position:absolute; inset:0; z-index:1; background: linear-gradient(to bottom, rgba(0,0,0,.55) 0%, rgba(0,0,0,.30) 50%, rgba(0,0,0,.15) 100%); }
        .hero-content{ position:relative; z-index:3; padding-inline: clamp(12px,4vw,28px); text-align:center; }
        .hero-title{ margin:0; font-weight:800; letter-spacing:-.01em; font-size: clamp(2.2rem, 5.6vw, 4rem); color:#fff; }
        .hero-sub{ margin:0; color: rgba(255,255,255,.92); font-size: clamp(1.05rem, 2.3vw, 1.35rem); }

        .btn-row{ display:flex; gap:12px; flex-wrap:wrap; }
        .btnx{ display:inline-flex; align-items:center; justify-content:center; gap:.5rem; padding:.8rem 1.2rem; border-radius:12px; border:1px solid var(--accent); background: var(--accent); color: var(--accent-contrast); font-weight:700; text-decoration:none; transition: transform .12s ease, box-shadow .2s ease, background-color .2s ease, color .2s ease; box-shadow: 0 1px 2px rgba(0,0,0,.06); }
        .btnx:hover{ transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
        .btnx.btnx-outline{ background: transparent; color: var(--accent); }

        /* GRID MÉTRICAS */
        .metrics{ display:grid; gap:20px; grid-template-columns: repeat(1, minmax(0, 1fr)); }
        @media (min-width: 640px){ .metrics{ grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px){ .metrics{ grid-template-columns: repeat(4, 1fr); } }
        .metric-card{ background: rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.18); border-radius:18px; padding:26px; display:grid; place-items:center; gap:6px; box-shadow: 0 1px 2px rgba(0,0,0,.06); }
        .metric-number{ font-size: clamp(2.1rem, 5.2vw, 3.2rem); line-height:1; font-weight:800; color:#fff }
        .metric-label{ color:#fff; text-align:center }

        .two-col{ display:grid; align-items:center; gap:24px; grid-template-columns: 1fr; }
        @media (min-width: 980px){ .two-col{ grid-template-columns: 1.05fr 1fr; } }

        .media-box{ position:relative; width:100%; aspect-ratio:16/9; border:1px solid var(--border); border-radius:22px; overflow:hidden; background: var(--surface); }
        .media-img{ object-fit: cover; } /* ⬅️ sin transform/zoom */
        .text-box{ display:grid; gap:12px; }

        .text-muted{ color: var(--muted); }
        .h3-strong{ font-weight:800; font-size: clamp(1.25rem, 2.6vw, 1.6rem); margin:0; }
        .feature-list{ list-style:none; padding:0; margin:10px 0 0; display:grid; gap:8px; }
        .feature-list li{ display:flex; gap:10px; align-items:flex-start; }
        .check{ width:20px; height:20px; border-radius:999px; display:inline-grid; place-items:center; background: var(--accent); color: var(--accent-contrast); font-weight:700; font-size:.85rem; line-height:1; margin-top:2px; }

        .cards-grid{ display:grid; gap:16px; grid-template-columns: 1fr; }
        @media (min-width: 900px){ .cards-grid{ grid-template-columns: repeat(4, 1fr); } }
        .cardy{ background:#fff; border:1px solid var(--border); border-radius:18px; padding:18px; box-shadow: 0 1px 2px rgba(0,0,0,.04); transition: box-shadow .2s ease, transform .2s ease; }
        .cardy:hover{ transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.10); }
        .cardy-title{ font-weight:800; margin-bottom:6px; }

        /* Fondo “Control de Calidad” (igual que en Construcción) */
        .bg-quality{ background: var(--surface); color: var(--fg, #111); }
        .bg-quality .lead, .bg-quality .text-muted{ color:#5b6772; }

        /* Notas de accesibilidad/perform: evita que revelaciones queden invisibles */
        @media (prefers-reduced-motion: reduce){
          .hero *{ transition:none !important; animation:none !important }
        }
      `}</style>
    </main>
  );
}
