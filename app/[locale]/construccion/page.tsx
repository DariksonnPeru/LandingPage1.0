// app/[locale]/construccion/page.tsx
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
    titleKey: "meta_title_construccion",
    descKey: "meta_desc_construccion",
    path: `/${loc}/construccion`,
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
      <section className="blk tone-surface hero-video">
        <div className="image-wrap">
          <Image
            src="/media/construccion.jpeg"
            alt="Obra de construcción"
            fill
            priority
            className="hero-image"
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
            <h1 className="hero-title">Construcción</h1>
            <p className="hero-sub">Transformamos proyectos en realidad con precisión técnica, seguridad absoluta y calidad excepcional</p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <Link href={`/${loc}#contacto`} className="btnx">Iniciar proyecto</Link>
              <a href="#proceso" className="btnx btnx-outline">Ver proceso</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: DARK, color: "#fff" }}>
        <div className="container metrics">
          {[
            { n: 120, s: "+", l: "Obras ejecutadas" },
            { n: 98,  s: "%", l: "A tiempo" },
            { n: 0,   s: "",  l: "Accidentes graves" },
            { n: 15,  s: "%", l: "Ahorro energético" },
          ].map((st, i) => (
            <article key={i} className="metric-card reveal">
              <div className="metric-number stat-number" data-target={st.n} data-suffix={st.s}>0{st.s}</div>
              <div className="metric-label">{st.l}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="servicios" className="section-pad bg-quality">
        <div className="container" style={{ display: "grid", gap: 18 }}>
          <h2 className="section-title reveal-up" style={{ textAlign: "center" }}>Servicios de construcción</h2>

          <div className="two-col">
            <div className="media-box scale-img reveal-right">
              <Image src="/media/construccion-1.jpg" alt="Obra civil" fill className="media-img" />
            </div>
            <div className="text-box reveal-left">
              <h3 className="h3-strong">Obra civil integral</h3>
              <p className="text-muted">Cimentaciones, estructuras y albañilería bajo normas vigentes y control de calidad continuo.</p>
              <ul className="feature-list">
                {[
                  "Movimiento de tierras y cimentaciones",
                  "Estructuras de concreto armado",
                  "Mampostería y tarrajeos de precisión",
                  "Gestión de residuos y seguridad"
                ].map((t, i) => (
                  <li key={i}><span className="check">✓</span><span>{t}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="two-col">
            <div className="text-box reveal-right">
              <h3 className="h3-strong">Instalaciones</h3>
              <p className="text-muted">Sistemas eléctricos, sanitarios y especiales con pruebas y protocolos de puesta en marcha.</p>
              <ul className="feature-list">
                {[
                  "Eléctrica y comunicaciones",
                  "Sanitaria y drenajes",
                  "Climatización y ventilación",
                  "Sistemas contra incendio"
                ].map((t, i) => (
                  <li key={i}><span className="check">✓</span><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="media-box scale-img reveal-left">
              <Image src="/media/construccion-2.jpg" alt="Instalaciones técnicas" fill className="media-img" />
            </div>
          </div>

          <div className="two-col">
            <div className="media-box scale-img reveal-right">
              <Image src="/media/construccion-3.jpg" alt="Acabados de obra" fill className="media-img" />
            </div>
            <div className="text-box reveal-left">
              <h3 className="h3-strong">Acabados de obra</h3>
              <p className="text-muted">Revestimientos, pintura y carpinterías con tolerancias milimétricas y supervisión permanente.</p>
              <ul className="feature-list">
                {[
                  "Pisos y enchapes",
                  "Cielos rasos y drywall",
                  "Pintura y sellos",
                  "Carpintería y vidrios"
                ].map((t, i) => (
                  <li key={i}><span className="check">✓</span><span>{t}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="proceso" className="section-pad" style={{ background: DARK, color: "#fff" }}>
        <div className="container">
          <h2 className="section-title reveal-up" style={{ textAlign: "center", marginBottom: 18 }}>Método de trabajo</h2>
          <div className="cards-grid">
            {[
              { t: "Planificación", d: "Lookahead semanal, rutas críticas y logística de suministros." },
              { t: "Control de calidad", d: "ITPs, fichas técnicas y ensayos de laboratorio." },
              { t: "Seguridad", d: "IPERC, permisos de trabajo y auditorías internas." },
              { t: "Entrega", d: "Punch list, as-built y manuales de operación." },
            ].map((c, i) => (
              <article
                key={i}
                className={`cardy cardy--dark ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}
              >
                <h3 className="cardy-title">{c.t}</h3>
                <p className="cardy-copy">{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-quality">
        <div className="container quality-grid">
          <div className="quality-text reveal-left">
            <h2 className="section-title">Control de Calidad</h2>
            <p className="lead">Protocolos rigurosos en cada etapa del proyecto para garantizar resultados excepcionales y duraderos.</p>
            <ul className="q-list">
              {[
                "Inspecciones diarias con checklist por rubro",
                "Ensayos de laboratorio certificados",
                "Trazabilidad completa de materiales",
                "Informes fotográficos semanales",
                "Auditorías internas mensuales",
                "Certificación ISO 9001 en procesos",
              ].map((item, i) => (
                <li key={i}><span className="check">✓</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="quality-image scale-img reveal-right">
            <Image src="/media/construccion-quality.jpg" alt="Quality Control" fill className="media-img" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-quality">
        <div className="container team-grid">
        <div className="team-image scale-img reveal-left zoom-fix">
        <Image src="/media/construccion-team.jpg" alt="Construction Team" fill className="media-img" />
          </div>
          <div className="team-content reveal-right">
            <h2 className="section-title">Equipo Multidisciplinario</h2>
            <p className="lead">Ingenieros, técnicos y operarios especializados trabajando en sincronía para entregar proyectos de clase mundial.</p>
            <div className="team-kpis">
              {[
                { num: "15+", label: "Ingenieros" },
                { num: "200+", label: "Técnicos" },
                { num: "24/7", label: "Supervisión" },
                { num: "100%", label: "Certificados" },
              ].map((it, i) => (
                <div key={i} className="kpi-box">
                  <div className="kpi-num">{it.num}</div>
                  <div className="kpi-label">{it.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="section-pad" style={{ background: DARK, color: "#fff" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">¿Listo para empezar tu obra?</h2>
          <p className="text-muted" style={{ maxWidth: 760, margin: "8px auto 0", color: "rgba(255,255,255,.88)" }}>
            Conversemos sobre alcance, plazos y presupuesto.
          </p>
          <div className="btn-row" style={{ justifyContent: "center", marginTop: 12 }}>
            <Link href={`/${loc}#contacto`} className="btnx">Solicitar cotización</Link>
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

  .h3-strong{ font-weight:800; font-size:clamp(1.25rem,2.6vw,1.6rem); margin:0 }
  .feature-list{ list-style:none; padding:0; margin:10px 0 0; display:grid; gap:8px }
  .feature-list li{ display:flex; gap:10px; align-items:flex-start }
  .check{ width:20px; height:20px; border-radius:999px; display:inline-grid; place-items:center; background: var(--accent); color: var(--accent-contrast); font-weight:700; font-size:.85rem; line-height:1; margin-top:2px }

  .two-col{ display:grid; align-items:center; gap:24px; grid-template-columns: 1fr }
  @media (min-width:980px){ .two-col{ grid-template-columns:1.05fr 1fr } }

  .media-box{ position:relative; width:100%; aspect-ratio:16/9; border:1px solid var(--border); border-radius:22px; overflow:hidden; background:var(--surface) }
  .media-img{ object-fit:cover }

  .metrics{ display:grid; gap:20px; grid-template-columns: repeat(1, minmax(0,1fr)) }
  @media (min-width:640px){ .metrics{ grid-template-columns: repeat(2,1fr) } }
  @media (min-width:1024px){ .metrics{ grid-template-columns: repeat(4,1fr) } }
  .metric-card{ background:#fff; border:1px solid var(--border); border-radius:18px; padding:26px; display:grid; place-items:center; gap:6px; box-shadow:0 1px 2px rgba(0,0,0,.06) }
  .metric-number{ font-size:clamp(2.1rem,5.2vw,3.2rem); line-height:1; font-weight:800; color:var(--accent) }
  .metric-label{ color:#5b6772; text-align:center }

  .hero-video{ position:relative; min-height:72svh; isolation:isolate; overflow:hidden; display:grid; place-items:center }
  .image-wrap{ position:absolute; inset:0; z-index:0 }
  .hero-image{ object-fit:cover }

  .hero-overlay{
    position:absolute; inset:0; z-index:1;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,.70) 0%,
      rgba(0,0,0,.55) 40%,
      rgba(0,0,0,.35) 70%,
      rgba(0,0,0,.25) 100%
    );
  }
  .hero-content{ position:relative; z-index:3; }
  .hero-title,.hero-sub{ color:#fff; text-shadow:0 2px 10px rgba(0,0,0,.45); }

  .hero-sub{ margin:0; color:rgba(255,255,255,.92); font-size:clamp(1.05rem,2.3vw,1.35rem) }

  .cards-grid{ display:grid; gap:16px; grid-template-columns: 1fr }
  @media (min-width: 900px){ .cards-grid{ grid-template-columns: repeat(4, 1fr) } }
  .cardy{ border-radius:18px; padding:18px; transition: box-shadow .2s ease, transform .2s ease }
  .cardy--dark{ background: rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.18); color:#fff }
  .cardy--dark .cardy-title{ font-weight:800; margin:0 0 6px 0; color:#fff }
  .cardy--dark .cardy-copy{ color: rgba(255,255,255,.88); margin:0 }
  .cardy--dark:hover{ transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.25) }

  .bg-quality{ background: var(--surface) }
  .quality-grid{ display:grid; gap:22px; grid-template-columns: 1fr }
  @media (min-width: 980px){ .quality-grid{ grid-template-columns: 1.1fr .9fr } }
  .quality-text{ display:grid; gap:12px }
  .q-list{ list-style:none; padding:0; margin:8px 0 0; display:grid; gap:8px }
  .q-list li{ display:flex; gap:10px; align-items:flex-start }

  .quality-image{ position:relative; width:100%; aspect-ratio:16/10; border:1px solid var(--border); border-radius:22px; overflow:hidden; background:var(--bg) }

  .divider-line{
    width: min(720px, 80%);
    height: 4px;
    margin: 8px auto;
    border-radius: 999px;
    background: linear-gradient(90deg,
      transparent,
      color-mix(in oklab, var(--border) 85%, var(--surface)),
      transparent);
  }

  .team-grid{ display:grid; gap:22px; grid-template-columns: 1fr }
  @media (min-width: 980px){ .team-grid{ grid-template-columns: .9fr 1.1fr } }
  .team-image{ position:relative; width:100%; aspect-ratio:16/10; border:1px solid var(--border); border-radius:22px; overflow:hidden; background:var(--bg) }
  .team-content{ display:grid; gap:12px }
  .team-kpis{ display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:12px; margin-top:6px }
  .kpi-box{ background: var(--surface); border:1px solid var(--border); border-radius:14px; padding:14px }
  .kpi-num{ font-size:1.6rem; font-weight:800; color: var(--accent); line-height:1 }
  .kpi-label{ color: var(--muted) }

  @media (prefers-reduced-motion: reduce){
    .hero-video *{ transition:none !important; animation:none !important }
  }

  /* ====== OVERRIDES ESPECÍFICOS PARA EL HERO ====== */
  /* Centrado real del bloque del hero */
  .hero-video .hero-content .stagger{
    display:grid;
    gap:12px;
    place-items:center;
    justify-items:center;
  }

  /* Subtítulo en blanco sólido (por encima de cualquier override) */
  .hero-video .hero-sub{ color:#fff !important; }

  /* Botón outline con contraste sobre la foto y centrado */
  .hero-video .btn-row{ justify-content:center; margin-inline:auto; }
  .hero-video .btnx.btnx-outline{ border-color:#fff; color:#fff; }
  .hero-video .btnx.btnx-outline:hover{ background:rgba(255,255,255,.12); }

  /* Estado base visible para hijos del stagger del hero (evita quedar en opacity:0) */
  .hero-content .stagger > *{ opacity:1 !important; }

  /* Texto oscuro en secciones claras (evita “impact” blanco sobre fondo claro) */
  .bg-quality{ color: var(--fg, #111); }
  .bg-quality .lead, .bg-quality .text-muted{ color:#5b6772; }

  /* Parche global de visibilidad por si un from() dejó opacidad en 0 */
  .reveal, .reveal-left, .reveal-right, .reveal-up, .scale-img img { opacity: 1; }

  .zoom-fix{ overflow:hidden; }
.zoom-fix { overflow: hidden; }
.zoom-fix .media-img{
  display:block;
  width:100%;
  height:100%;
  object-fit: cover;
  object-position: center 5%; /* ⬅️ mueve el encuadre hacia ARRIBA */
  transform: scale(1.03);      /* ⬅️ zoom leve permanente */
  transform-origin: center;
}
`}</style>
    </main>
  );
}
