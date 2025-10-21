// app/[locale]/arquitectura/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMetadata } from "../../../lib/seo";
import { LOCALES, type Locale } from "../../../lib/i18n";

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = (LOCALES as readonly string[]).includes(locale) ? (locale as Locale) : "en";
  return getMetadata({
    locale: loc,
    titleKey: "meta_title_arquitectura",
    descKey: "meta_desc_arquitectura",
    path: `/${loc}/arquitectura`,
  });
}

export default async function Page({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (LOCALES as readonly string[]).includes(locale) ? (locale as Locale) : "en";

  const LIGHT = "color-mix(in oklab, var(--accent) 14%, var(--bg))";
  const DARK  = "color-mix(in oklab, var(--accent) 82%, var(--bg))";

  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      {/* HERO */}
      <section className="blk tone-surface arch-hero">
        <div className="image-wrap">
          <Image
            src="/media/architecture-hero.jpg"
            alt="Arquitectura moderna"
            fill
            priority
            className="arch-hero-img"
            sizes="100vw"
          />
        </div>
        <div className="hero-overlay" aria-hidden />
        <div className="hero-content">
          <div
            className="stagger"
            style={{
              textAlign: "center",
              display: "grid",
              gap: 12,
              placeItems: "center",
              justifyItems: "center",
            }}
          >
            <h1 className="hero-title">Arquitectura</h1>
            
          </div>
        </div>
      </section>

      {/* MÉTRICAS (Impact) */}
      <section className="section-pad no-seam" style={{ background: DARK, color: "#fff" }}>
        <div className="container metrics">
          {[
            { n: 85, s: "+", l: "Proyectos arquitectónicos" },
            { n: 12, s: "",  l: "Años de experiencia" },
            { n: 98, s: "%", l: "Satisfacción del cliente" },
            { n: 45, s: "+", l: "Diseños a medida" },
          ].map((st, i) => (
            <article key={i} className="metric-card reveal">
              <div className="metric-number stat-number" data-target={st.n} data-suffix={st.s}>0{st.s}</div>
              <div className="metric-label">{st.l}</div>
            </article>
          ))}
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="section-pad bg-quality">
        <div className="container" style={{ display: "grid", gap: 22 }}>
          <div className="two-col">
            <div className="text-box reveal-left">
              <h2 className="section-title">Diseño arquitectónico integral</h2>
              <p className="lead">
                Transformamos ideas en espacios habitables que combinan estética, funcionalidad y sostenibilidad. Nuestro enfoque integral abarca desde la conceptualización inicial hasta la supervisión de obra.
              </p>
              <p className="text-muted">
                Cada proyecto es único y se desarrolla considerando las necesidades del cliente, el contexto urbano, las regulaciones municipales y los recursos disponibles.
              </p>
              <ul className="feature-list" style={{ marginTop: 8 }}>
                {[
                  "Análisis de sitio y estudios previos",
                  "Conceptualización y anteproyecto",
                  "Planos arquitectónicos y estructurales",
                  "Modelado 3D y renders fotorrealistas",
                  "Gestión de permisos y licencias",
                  "Supervisión y dirección de obra",
                ].map((t, i) => (
                  <li key={i}><span className="check">✓</span><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="media-box reveal-right">
              <Image
                src="/media/architecture-process.jpg"
                alt="Proceso arquitectónico"
                fill
                className="media-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS ARQUITECTÓNICOS */}
      <section id="servicios" className="section-pad" style={{ background: DARK, color: "#fff" }}>
        <div className="container">
          <h2 className="section-title reveal-up" style={{ textAlign: "center", marginBottom: 20 }}>
            Servicios arquitectónicos
          </h2>

          <div className="services-grid">
            {[
              {
                t: "Diseño residencial",
                d: "Casas unifamiliares, multifamiliares y condominios adaptados a tu estilo de vida.",
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 11.5L12 4l9 7.5" />
                    <path d="M5 10v9h14v-9" />
                    <path d="M9 19v-6h6v6" />
                  </svg>
                ),
              },
              {
                t: "Diseño comercial",
                d: "Oficinas, locales comerciales y espacios corporativos funcionales y atractivos.",
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 21h18M4 21V8l8-5 8 5v13" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                ),
              },
              {
                t: "Remodelación",
                d: "Renovación y ampliación de espacios existentes con diseño contemporáneo.",
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 3h7l11 11-7 7L3 10V3z" />
                    <path d="M3 10l7-7" />
                  </svg>
                ),
              },
              {
                t: "Documentación técnica",
                d: "Planos completos, especificaciones técnicas y memorias descriptivas.",
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14 3H6a2 2 0 0 0-2 2v14l4-4h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                  </svg>
                ),
              },
              {
                t: "Interiorismo",
                d: "Diseño de interiores, selección de mobiliario y paletas de color.",
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 21h18" />
                    <path d="M6 21V9a6 6 0 0 1 12 0v12" />
                    <path d="M6 13h12" />
                  </svg>
                ),
              },
              {
                t: "Gestión municipal",
                d: "Tramitación de licencias, permisos y aprobaciones ante las autoridades.",
                icon: (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2l7 4v6c0 5-3 8-7 10-4-2-7-5-7-10V6l7-4z" />
                    <path d="M9 12h6" />
                  </svg>
                ),
              },
            ].map((s, i) => (
              <article key={i} className="service-card reveal-up">
                <div className="service-icon">{s.icon}</div>
                <h3 className="service-title">{s.t}</h3>
                <p className="service-desc">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO DE DISEÑO */}
      <section className="section-pad bg-quality">
        <div className="container">
          <div className="process-head reveal-up">
            <h2 className="section-title">Proceso de diseño</h2>
          </div>

          <div className="process-grid">
            {[
              { n: "01", t: "Consulta inicial", d: "Reunión para comprender necesidades, presupuesto, cronograma y expectativas del proyecto." },
              { n: "02", t: "Análisis y conceptualización", d: "Estudio del sitio, análisis de normativas y desarrollo del concepto arquitectónico." },
              { n: "03", t: "Anteproyecto", d: "Propuestas con bocetos, plantas preliminares y visualizaciones 3D." },
              { n: "04", t: "Proyecto ejecutivo", d: "Desarrollo de planos arquitectónicos, estructurales y especialidades." },
              { n: "05", t: "Gestión de permisos", d: "Tramitación de licencias municipales y aprobaciones técnicas necesarias." },
              { n: "06", t: "Supervisión de obra", d: "Acompañamiento durante la construcción para asegurar la correcta ejecución." },
            ].map((p, i) => (
              <article key={i} className="process-card reveal-left">
                <div className="process-badge">{p.n}</div>
                <h3 className="h3-strong">{p.t}</h3>
                <p className="text-muted">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="section-sep" aria-hidden />
      </section>

      {/* ACABADOS (sin zoom) */}
      <section id="acabados" className="section-pad bg-quality" style={{ scrollMarginTop: 80 }}>
        <div className="container">
          <div className="reveal-up acabados-head">
            <h2 className="section-title">Acabados</h2>
          </div>

          <div className="quality-grid" style={{ marginTop: 6 }}>
            {[
              {
                img: "/media/acabados-carpentry.jpg",
                t: "Carpintería a medida",
                items: ["Muebles empotrados", "Closets y vestidores", "Cocinas integrales", "Bibliotecas y estanterías", "Puertas y marcos"],
              },
              {
                img: "/media/acabados-drywall.JPG",
                t: "Drywall y tabiquería",
                items: ["Divisiones interiores", "Cielos rasos decorativos", "Nichos y estanterías", "Aislamiento acústico", "Acabados resistentes"],
              },
              {
                img: "/media/acabados-materials.jpg",
                t: "Pisos y revestimientos",
                items: ["Porcelanato y cerámica", "Pisos laminados", "Madera natural", "Piedra natural", "Microcemento"],
              },
              {
                img: "/media/architecture-finished.jpg",
                t: "Vidrio y aluminio",
                items: ["Mamparas y divisiones", "Ventanas y puertas", "Espejos decorativos", "Barandas de cristal", "Fachadas de vidrio"],
              },
            ].map((b, i) => (
              <div key={i} className="acab-card reveal-up">
                <div className="media-box ratio-16x9">
                  <Image
                    src={b.img}
                    alt={b.t}
                    fill
                    className="media-img"
                    sizes="(min-width: 980px) 520px, 100vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2VhZWVmMiIvPjwvc3ZnPg=="
                    priority={i < 2}
                  />
                </div>

                <div className="acab-body">
                  <h3 className="h3-strong">{b.t}</h3>
                  <ul className="feature-list">
                    {b.items.map((it, j) => (
                      <li key={j}><span className="check">✓</span><span>{it}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-up acabados-cta">
            <Link href={`/${loc}/acabados`} className="btnx">
              Ver más
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contacto" className="section-pad" style={{ background: DARK, color: "#fff" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">¿Listo para diseñar tu proyecto?</h2>
          <p className="text-muted" style={{ maxWidth: 760, margin: "8px auto 0", color: "rgba(255,255,255,.88)" }}>
            Agenda una consultoría y conversemos sobre cómo transformar tu visión en realidad.
          </p>
          <div className="btn-row" style={{ justifyContent: "center", marginTop: 12 }}>
            <Link href={`/${loc}#contacto`} className="btnx">Agendar consultoría</Link>
            <Link href={`/${loc}`} className="btnx btnx-outline">Volver al inicio</Link>
          </div>
        </div>
      </section>

      <style>{`
  .container{ width:min(100% - 32px,1120px); margin-inline:auto }
  .section-pad{ padding-block: clamp(1.8rem,6vw,5.2rem) }

  .btn-row{ display:flex; gap:12px; flex-wrap:wrap }
  .btnx{ display:inline-flex; align-items:center; justify-content:center; gap:.5rem; padding:.8rem 1.2rem; border-radius:12px; border:1px solid var(--accent); background: var(--accent); color: var(--accent-contrast); font-weight:700; text-decoration:none; transition: transform .12s ease, box-shadow .2s ease, background-color .2s ease, color .2s ease; box-shadow:0 1px 2px rgba(0,0,0,.06) }
  .btnx:hover{ transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,.12) }
  .btnx.btnx-outline{ background:transparent; color:var(--accent) }

  .text-muted{ color:var(--muted) }
  .lead{ font-size: clamp(1.05rem, 2.3vw, 1.25rem); color: var(--muted); margin: 6px 0 12px }

  .h3-strong{ font-weight:800; font-size:clamp(1.15rem,2.4vw,1.45rem); margin:0 }
  .feature-list{ list-style:none; padding:0; margin:10px 0 0; display:grid; gap:8px }
  .feature-list li{ display:flex; gap:10px; align-items:flex-start }
  .check{ width:20px; height:20px; border-radius:999px; display:inline-grid; place-items:center; background: var(--accent); color: var(--accent-contrast); font-weight:700; font-size:.85rem; line-height:1; margin-top:2px }

  .two-col{ display:grid; align-items:center; gap:24px; grid-template-columns: 1fr }
  @media (min-width:980px){ .two-col{ grid-template-columns:1.05fr 1fr } }

  .media-box{ position:relative; width:100%; aspect-ratio:16/9; border:1px solid var(--border); border-radius:22px; overflow:hidden; background: var(--surface) }
  .media-img{ object-fit:cover }

  .metrics{ display:grid; gap:20px; grid-template-columns: repeat(1, minmax(0,1fr)) }
  @media (min-width:640px){ .metrics{ grid-template-columns: repeat(2,1fr) } }
  @media (min-width:1024px){ .metrics{ grid-template-columns: repeat(4,1fr) } }
  .metric-card{ background: rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.18); border-radius:18px; padding:26px; display:grid; place-items:center; gap:6px; box-shadow:0 1px 2px rgba(0,0,0,.06) }
  .metric-number{ font-size:clamp(2.1rem,5.2vw,3.2rem); line-height:1; font-weight:800; color:#fff }
  .metric-label{ text-align:center; color:#fff; } /* subtítulo blanco */

  /* HERO */
  .arch-hero{ position:relative; min-height:72svh; isolation:isolate; overflow:hidden; display:grid; place-items:center; border-bottom:0 }
  .image-wrap{ position:absolute; inset:0; z-index:0 }
  .arch-hero-img{ object-fit:cover; transform:none !important; }
  .hero-overlay{
    position:absolute; inset:0; z-index:1;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,.70) 0%,
      rgba(0,0,0,.55) 40%,
      rgba(0,0,0,.35) 70%,
      rgba(0,0,0,.25) 100%
    );
    background-clip: padding-box;
  }
  .hero-content{ position:relative; z-index:3; }
  .hero-title,.hero-sub{ color:#fff; text-shadow:0 2px 10px rgba(0,0,0,.45); }
  .hero-sub{ margin:0; color:#fff !important; font-size:clamp(1.05rem,2.3vw,1.35rem) } /* subtítulo blanco reforzado */
  .arch-hero *{ transition:none !important; animation:none !important; }

  /* Elimina cualquier “seam” entre hero e impact */
  .no-seam{ margin-top:-1px; }
  .arch-hero + .section-pad{ border-top:0 !important; }

  /* ===== Servicios ===== */
  .services-grid{
    display:grid; gap:16px; grid-template-columns: 1fr;
  }
  @media (min-width: 900px){ .services-grid{ grid-template-columns: repeat(3, 1fr) } }
  .service-card{
    background: rgba(0,0,0,.18);
    border: 1px solid rgba(255,255,255,.22);
    border-radius: 18px;
    padding: 18px;
    text-align: center;
    transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease;
  }
  .service-card:hover{
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0,0,0,.35);
    background: rgba(0,0,0,.24);
  }
  .service-icon{
    width: 56px; height: 56px; border-radius: 14px;
    display:grid; place-items:center; margin: 0 auto 10px auto;
    background: rgba(255,255,255,.12); color:#fff;
  }
  .service-title{ font-weight:800; margin: 2px 0 6px 0; }
  .service-desc{ color:#fff; } /* subtítulo blanco */

  /* ===== Proceso ===== */
  .process-grid{
    display:grid; gap:16px; grid-template-columns: 1fr; max-width: 980px; margin: 0 auto;
  }
  @media (min-width:900px){ .process-grid{ grid-template-columns: repeat(2, 1fr) } }
  .process-card{
    background: var(--surface);
    border:1px solid var(--border);
    border-radius:14px;
    padding:16px;
    display:grid;
    gap:8px;
    transition: box-shadow .2s ease, transform .2s ease;
  }
  .process-card:hover{
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0,0,0,.08);
  }
  .process-badge{
    width:max-content;
    background: color-mix(in oklab, var(--accent) 18%, var(--bg));
    color: var(--accent);
    font-weight:800;
    border-radius:10px;
    padding:4px 10px;
  }

  /* ===== Acabados ===== */
  .acab-card{
    border:1px solid var(--border);
    border-radius:16px;
    overflow:hidden;
    background: var(--surface);
    display:grid;
  }
  .acab-body{ padding:16px; }
  .acab-body .h3-strong{ margin-bottom:8px; }

  .bg-quality{ background: var(--surface); color: var(--fg, #111); }
  .bg-quality .lead, .bg-quality .text-muted{ color:#5b6772; }
  .quality-grid{ display:grid; gap:22px; grid-template-columns: 1fr }
  @media (min-width: 980px){ .quality-grid{ grid-template-columns: 1.1fr .9fr } }

  /* Parche global de visibilidad si un from() dejó opacity:0 */
  .reveal, .reveal-left, .reveal-right, .reveal-up, .media-box img { opacity: 1; }

  /* CTA Acabados centrado */
  .acabados-cta{ display:grid; place-items:center; margin-top:18px; }

  /* ===== Utilidades media ===== */
  .ratio-16x9 { aspect-ratio: 16/9; }
`}</style>
    </main>
  );
}
