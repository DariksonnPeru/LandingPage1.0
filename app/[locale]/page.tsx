// app/[locale]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { getMetadata } from "../../lib/seo";
import { LOCALES, type Locale } from "../../lib/i18n";
import { redirect } from "next/navigation";
import { sendMail } from "../../lib/mail";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = (LOCALES as readonly string[]).includes(locale) ? (locale as Locale) : "en";
  return getMetadata({ locale: loc, titleKey: "meta_title_home", descKey: "meta_desc_home", path: `/${loc}` });
}

async function sendQuote(formData: FormData): Promise<void> {
  "use server";
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const service = (formData.get("service") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();
  const locale = ((formData.get("locale") || "en").toString() as Locale);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

  if (!name || !email || !service || !message) {
    redirect(`/${locale}?ok=0&msg=${encodeURIComponent("Por favor completa nombre, email, servicio y mensaje.")}`);
  }
  if (!emailRegex.test(email)) {
    redirect(`/${locale}?ok=0&msg=${encodeURIComponent("Email inválido.")}`);
  }

  const to = process.env.CONTACT_TO as string;
  const from = process.env.CONTACT_FROM as string;

  try {
    await sendMail({
      to,
      from,
      replyTo: email,
      subject: `Nueva cotización — ${service} — ${name}`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Teléfono: ${phone || "-"}`,
        `Servicio: ${service}`,
        "",
        "Mensaje:",
        message
      ].join("\n"),
      html: `
        <h2>Nueva solicitud de cotización</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "-"}</p>
        <p><strong>Servicio:</strong> ${service}</p>
        <p><strong>Mensaje:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `
    });
    redirect(`/${locale}?ok=1&msg=${encodeURIComponent("¡Enviado! Te contactaremos pronto.")}`);
  } catch {
    redirect(`/${locale}?ok=0&msg=${encodeURIComponent("No se pudo enviar. Intenta nuevamente.")}`);
  }
}

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string>>;
}) {
  const { locale } = await params;
  const loc = (LOCALES as readonly string[]).includes(locale) ? (locale as Locale) : "en";
  const sp = (await searchParams) || {};
  const ok = sp.ok === "1";
  const msg = sp.msg ? decodeURIComponent(sp.msg) : "";

  return (
    <>
      {/* HERO (full width) */}
      <section id="top" className="section hero" style={{ position: "relative", padding: 0 }}>
        <div className="hero-media">
          <video id="heroVideo" playsInline muted loop autoPlay poster="/media/hero-poster.jpg">
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
          <img id="heroImage" src="/media/hero.jpg" alt="Portada" />
        </div>
        <div className="hero-content" style={{ display: "grid", placeItems: "center", minHeight: "74vh", textAlign: "center", padding: "0 clamp(12px,4vw,28px)" }}>
          <div style={{ display: "grid", gap: 14, width: "min(1400px, 100%)" }}>
            <span className="title-badge">Servicios Generales Darikson</span>
            <span className="subtitle-badge">Diseño funcional, ejecución impecable y comunicación clara de principio a fin.</span>
            <div className="wrap" style={{ justifyContent: "center", marginTop: 6, gap: 10 }}>
              <Link href="#contacto" className="btn">Cotizar</Link>
              <Link href="#proyectos" className="btn btn-outline">Ver proyectos</Link>
            </div>
          </div>
        </div>
      </section>

      {/* BANDA DE IMPACTO (full-bleed, entre HERO y SERVICIOS) */}
      <section id="impacto" className="impact-band">
        <div className="impact-inner">
          <div className="impact-item">
            <div className="impact-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
            </div>
            <div className="impact-num">+50</div>
            <div className="impact-desc">
              <strong>proyectos</strong>
              <span>en 11 ciudades</span>
            </div>
          </div>

          <div className="impact-item">
            <div className="impact-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            </div>
            <div className="impact-num">+9</div>
            <div className="impact-desc">
              <strong>proyectos greenfield</strong>
              <span>desde cero</span>
            </div>
          </div>

          <div className="impact-item">
            <div className="impact-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
            <div className="impact-num">+4,500</div>
            <div className="impact-desc">
              <strong>colaboradores</strong>
              <span>en proyectos</span>
            </div>
          </div>

          <div className="impact-item">
            <div className="impact-icon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
            <div className="impact-num">+3,000</div>
            <div className="impact-desc">
              <strong>MM PEN</strong>
              <span>en obras ejecutadas</span>
            </div>
          </div>
        </div>

        <style>{`
          .impact-band{
            background: color-mix(in oklab, var(--accent) 72%, var(--fg) 18%);
            color: var(--bg);
            border-top: 1px solid color-mix(in oklab, var(--accent) 65%, #000 10%);
            border-bottom: 1px solid color-mix(in oklab, var(--accent) 65%, #000 10%);
          }
          .impact-inner{
            max-width: 100%;
            margin: 0 auto;
            padding: 28px 18px;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: clamp(14px, 2.5vw, 26px);
            align-items: center;
          }
          .impact-item{
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-areas:
              "icon num"
              "icon desc";
            column-gap: 12px;
            row-gap: 2px;
            align-items: center;
            min-height: 96px;
          }
          .impact-icon{ grid-area: icon; opacity:.95; display:grid; place-items:center }
          .impact-num{
            grid-area: num;
            font-weight: 800;
            letter-spacing: .01em;
            font-size: clamp(2rem, 5vw, 3.6rem);
            line-height: 1;
          }
          .impact-desc{
            grid-area: desc;
            display: grid;
            gap: 2px;
            font-size: .98rem;
            opacity:.95;
          }
          .impact-desc strong{ font-weight:700 }
          .impact-desc span{ opacity:.9 }

          @media (max-width: 980px){
            .impact-inner{ grid-template-columns: 1fr 1fr }
          }
          /* --- MODO CELULAR: ocultar íconos y centrar --- */
          @media (max-width: 600px){
            .impact-inner{ grid-template-columns: 1fr }
            .impact-item{
              grid-template-columns: 1fr;
              grid-template-areas:
                "num"
                "desc";
              text-align: center;
              justify-items: center;
            }
            .impact-icon{ display: none; }
          }
        `}</style>
      </section>

      {/* SERVICIOS (full width, fondo igual a contacto, centrado) */}
      <section id="servicios" className="section services-band" style={{ scrollMarginTop: 96, paddingTop: 28, paddingBottom: 28 }}>
        <div className="edge">
          <div className="services-inner">
            <div className="header-split center">
              <h2 style={{ margin: 0, textAlign: "center" }}>Servicios</h2>
            </div>

            <div className="services-pro">
              <Link href={`/${loc}/arquitectura`} className="service-pro">
                <div className="sp-info">
                  <div className="sp-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 22h18M6 18V8l6-5 6 5v10"/></svg>
                  </div>
                  <div className="sp-head">
                    <strong>Arquitectura</strong>
                    <span className="muted">Concepto, anteproyecto, dirección y acabados.</span>
                  </div>
                  <ul className="sp-list">
                    <li>Planos ejecutivos y compatibilización</li>
                    <li>Gestión municipal y permisos</li>
                    <li>Supervisión, QA/QC e informes semanales</li>
                  </ul>
                </div>
              </Link>

              <Link href={`/${loc}/construccion`} className="service-pro">
                <div className="sp-info">
                  <div className="sp-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v4M2 12h4M18 12h4M12 18v4M5 5l3 3M16 8l3-3M8 16l-3 3M19 19l-3-3"/></svg>
                  </div>
                  <div className="sp-head">
                    <strong>Construcción</strong>
                    <span className="muted">Obra civil, MEP, seguridad y control de calidad.</span>
                  </div>
                  <ul className="sp-list">
                    <li>Estructuras de concreto y acero</li>
                    <li>Instalaciones eléctricas e hidráulicas</li>
                    <li>Protocolos de seguridad y entrega cero incidentes</li>
                  </ul>
                </div>
              </Link>
            </div>

            <div className="wrap" style={{ justifyContent: "center" }}>
              <Link href="#contacto" className="btn">Cotizar</Link>
            </div>
          </div>
        </div>

        <style>{`
          .services-band{
            background: var(--surface);
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
          }
          .services-inner{
            max-width: 1320px;
            margin: 0 auto;
            display: grid;
            gap: 22px;
            padding: 0 12px;
          }
          .header-split.center{display:grid;justify-items:center}
          .services-pro{
            display:grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap:14px;
          }
          @media (max-width: 900px){
            .services-pro{grid-template-columns:1fr}
          }
          .service-pro{
            display:block;
            border:1px solid var(--border);
            background: var(--bg);
            border-radius:18px;
            overflow:hidden;
            position:relative;
            transition: box-shadow .2s ease, transform .2s ease, border-color .2s ease;
          }
          .service-pro:hover{
            box-shadow:var(--shadow-md);
            transform: translateY(-2px);
            border-color: color-mix(in oklab, var(--accent) 40%, var(--border));
          }
          .sp-info{
            display:grid;
            grid-template-columns: auto 1fr;
            gap:12px;
            align-items:start;
            padding:16px;
          }
          .sp-icon{
            width:42px;height:42px;
            border:1px solid var(--border);
            border-radius:12px;
            display:grid;place-items:center;
            background: var(--surface);
          }
          .sp-head{display:grid;gap:4px}
          .sp-head strong{font-size:1.05rem}
          .sp-list{
            grid-column: 1 / -1;
            display:grid;gap:6px;
            margin:6px 0 0 0;
            padding-left:1.1rem;
            line-height:1.65;
          }
          .sp-list li{margin:0}
        `}</style>
      </section>

      <section id="arquitectura" className="section services-band" style={{ scrollMarginTop: 96 }}>
        <div className="edge" style={{ display: "grid", gap: 22 }}>
          <h2 className="title-left" style={{ margin: 0 }}>Arquitectura</h2>
          <div className="arch-split">
            <div className="arch-media">
              <img src="/media/arquitectura-hero.jpg" alt="Arquitectura" loading="lazy" />
            </div>
            <div className="arch-side">
              <div style={{ display: "grid", gap: 12 }}>
                <strong style={{ fontSize: "1.25rem" }}>Soluciones a medida</strong>
                <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                  Conceptualización, anteproyecto, planos y dirección con foco en estética, funcionalidad y normativa.
                  Optimizamos circulaciones, iluminación natural, acústica y materiales para lograr espacios eficientes,
                  durables y coherentes con tu presupuesto. Documentación clara, compatibilización MEP y cronogramas con hitos de entrega.
                </p>
                <div className="wrap" style={{ marginTop: 12, justifyContent: "center" }}>
                  <Link href={`/${loc}/arquitectura`} className="btn">Ver Arquitectura</Link>
                  <Link href="#contacto" className="btn btn-outline">Cotizar</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .arch-split{display:grid;grid-template-columns:repeat(12,1fr);gap:18px;align-items:center}
          .arch-media{grid-column:span 7;overflow:hidden;border-radius:20px;border:1px solid var(--border);background:var(--surface)}
          .arch-media img{width:100%;height:500px;object-fit:cover;transition:transform .8s ease}
          .arch-media:hover img{transform:scale(1.035)}
          .arch-side{grid-column:span 5}
          @media (max-width: 1000px){
            .arch-split{grid-template-columns:1fr;gap:14px}
            .arch-media,.arch-side{grid-column:auto}
            .arch-media img{height:340px}
          }
        `}</style>
      </section>

      <section id="construccion" className="section services-band" style={{ scrollMarginTop: 96 }}>
        <div className="edge" style={{ display: "grid", gap: 22 }}>
          <h2 className="title-left" style={{ margin: 0 }}>Construcción</h2>

          <div className="build-split">
            <div className="build-info">
              <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                Obra civil, instalaciones y soluciones técnicas seguras y eficientes. Planificación detallada, control de costos,
                abastecimiento, y bitácora de calidad con checklists por rubro. Supervisión permanente y entregas por hitos.
              </p>

              <div className="grid-kpis" style={{ marginTop: 10 }}>
                {[
                  { k: "120+", v: "Proyectos" },
                  { k: "98%", v: "A tiempo" },
                  { k: "0", v: "Accidentes graves" },
                  { k: "15%", v: "Ahorro energético" }
                ].map((s) => (
                  <div key={s.v} className="kpi">
                    <div className="kpi-k">{s.k}</div>
                    <div className="muted">{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="build-actions">
                <Link href={`/${loc}/construccion`} className="btn">Ver Construcción</Link>
                <Link href="#contacto" className="btn btn-outline">Cotizar</Link>
              </div>
            </div>

            <div className="build-media">
              <img src="/media/ingenieria-2.jpg" alt="Construcción" loading="lazy" />
            </div>
          </div>
        </div>

        <style>{`
          .build-split{display:grid;grid-template-columns:repeat(12,1fr);gap:18px;align-items:center}
          .build-info{grid-column:span 6;display:grid;gap:10px}
          .build-media{grid-column:span 6;border:1px solid var(--border);border-radius:18px;overflow:hidden;background:var(--surface)}
          .build-media img{width:100%;height:420px;object-fit:cover}
          .build-actions{
            margin-top:12px;
            display:flex;
            justify-content:center;
            gap:10px;
            width:100%;
          }
          @media (max-width: 1000px){
            .build-split{grid-template-columns:1fr}
            .build-media img{height:320px}
            .build-actions{justify-content:center}
          }
        `}</style>
      </section>

      {/* BLOQUES de ancho LIMITADO (NO full width) */}
      <section id="por-que" className="section tone-solid">
        <div className="container limited" style={{ display: "grid", gap: 18 }}>
          <h3 style={{ margin: 0, textAlign: "center" }}>Por qué elegirnos</h3>
          <div className="grid-why">
            <div className="why card">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7z" /></svg>
              </div>
              <strong>Excelencia comprobada</strong>
              <p className="muted" style={{ margin: 0 }}>Estándares altos de calidad y control en cada fase del proyecto.</p>
            </div>
            <div className="why card">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h12M3 18h6" /></svg>
              </div>
              <strong>Gestión transparente</strong>
              <p className="muted" style={{ margin: 0 }}>Cronogramas claros, reportes periódicos y comunicación directa.</p>
            </div>
            <div className="why card">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20v-2M18 20v-10" /><path d="M3 3h18v4H3z" /></svg>
              </div>
              <strong>Optimización de costos</strong>
              <p className="muted" style={{ margin: 0 }}>Selección de materiales y soluciones con la mejor relación valor.</p>
            </div>
            <div className="why card">
              <div className="why-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4-9 4-9-4 9-4z" /><path d="M3 10l9 4 9-4" /><path d="M3 18l9 4 9-4" /></svg>
              </div>
              <strong>Equipo multidisciplinario</strong>
              <p className="muted" style={{ margin: 0 }}>Arquitectura y construcción trabajando como uno solo.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-sep" aria-hidden />

      <section id="logos-testimonios" className="section tone-plain" style={{ scrollMarginTop: 96 }}>
        <div className="container limited" style={{ display: "grid", gap: 16 }}>
          <div className="grid-testimonials">
            {[1,2,3].map((i)=>(
              <div key={i} className="card tcard">
                <div className="t-head">
                  <img src={`/media/testimonials/u${i}.jpg`} alt="Cliente" />
                  <div>
                    <strong>Cliente {i}</strong>
                    <div className="muted">Proyecto residencial</div>
                  </div>
                </div>
                <p className="muted">Excelente comunicación, cronogramas claros y terminaciones de alto nivel.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-sep" aria-hidden />

      <section id="faq" className="section tone-solid" style={{ scrollMarginTop: 96 }}>
        <div className="container limited" style={{ display: "grid", gap: 12 }}>
          <h3 style={{ margin: 0, textAlign: "center" }}>Preguntas frecuentes</h3>

          <div style={{ display: "grid", gap: 8 }}>
            {[
              {
                q: "¿Qué servicios ofrece la empresa?",
                a: "Ofrecemos soluciones integrales en arquitectura y construcción: diseño, remodelación, obra civil, acabados, gestión y supervisión técnica."
              },
              {
                q: "¿Realizan solo proyectos grandes o también trabajos pequeños?",
                a: "Atendemos proyectos residenciales, comerciales e institucionales: desde pequeñas remodelaciones hasta obras completas."
              },
              {
                q: "¿Puedo solicitar un presupuesto sin compromiso?",
                a: "Sí. Elaboramos cotizaciones personalizadas y sin costo, según tus necesidades y las condiciones del proyecto."
              },
              {
                q: "¿Cuentan con personal técnico calificado?",
                a: "Sí. Nuestro equipo incluye arquitectos, ingenieros y técnicos especializados, garantizando seguridad, calidad y cumplimiento normativo."
              },
              {
                q: "¿Trabajan con materiales específicos o el cliente puede elegir?",
                a: "Nos adaptamos a tus preferencias y presupuesto. Te asesoramos para seleccionar materiales de alta calidad y durabilidad."
              },
              {
                q: "¿Ofrecen servicio de diseño arquitectónico?",
                a: "Sí. Desarrollamos planos arquitectónicos, estructurales e interiores, además de visualizaciones 3D."
              },
              {
                q: "¿Realizan trabajos en vidrio, drywall y muebles a medida?",
                a: "Sí. Ejecutamos mamparas, ventanas, divisiones, espejos, drywall y mobiliario a medida dentro de nuestra línea de acabados."
              },
              {
                q: "¿Supervisan o gestionan las obras?",
                a: "Sí. Brindamos supervisión técnica y control de obra para cumplir plazos, presupuesto y normas de seguridad."
              },
              {
                q: "¿En qué zonas trabajan?",
                a: "Atendemos proyectos en todo el territorio nacional."
              },
              {
                q: "¿Qué garantía ofrecen en sus trabajos?",
                a: "Ofrecemos garantía por mano de obra y materiales. Los términos se especifican en el contrato y fichas técnicas del proyecto."
              }
            ].map((f, i) => (
              <details
                key={i}
                style={{
                  borderBottom: "1px solid var(--border)",
                  padding: "10px 0",
                }}
              >
                <summary
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    cursor: "pointer",
                    listStyle: "none",
                    fontWeight: 500,
                  }}
                >
                  <span>{f.q}</span>
                  {/* caret */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    style={{ transition: "transform .2s ease" }}
                    className="faq-caret"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p className="muted" style={{ marginTop: 8, lineHeight: 1.7 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* JSON-LD para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "¿Qué servicios ofrece la empresa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ofrecemos soluciones integrales en arquitectura y construcción: diseño, remodelación, obra civil, acabados, gestión y supervisión técnica."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Realizan solo proyectos grandes o también trabajos pequeños?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Atendemos proyectos residenciales, comerciales e institucionales: desde pequeñas remodelaciones hasta obras completas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Puedo solicitar un presupuesto sin compromiso?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Elaboramos cotizaciones personalizadas y sin costo, según tus necesidades y las condiciones del proyecto."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Cuentan con personal técnico calificado?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Nuestro equipo incluye arquitectos, ingenieros y técnicos especializados, garantizando seguridad, calidad y cumplimiento normativo."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Trabajan con materiales específicos o el cliente puede elegir?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nos adaptamos a tus preferencias y presupuesto. Te asesoramos para seleccionar materiales de alta calidad y durabilidad."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Ofrecen servicio de diseño arquitectónico?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Desarrollamos planos arquitectónicos, estructurales e interiores, además de visualizaciones 3D."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Realizan trabajos en vidrio, drywall y muebles a medida?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Ejecutamos mamparas, ventanas, divisiones, espejos, drywall y mobiliario a medida dentro de nuestra línea de acabados."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Supervisan o gestionan las obras?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Brindamos supervisión técnica y control de obra para cumplir plazos, presupuesto y normas de seguridad."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿En qué zonas trabajan?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Atendemos proyectos en todo el territorio nacional."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Qué garantía ofrecen en sus trabajos?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ofrecemos garantía por mano de obra y materiales. Los términos se especifican en el contrato y fichas técnicas del proyecto."
                  }
                }
              ]
            })
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #faq details[open] .faq-caret { transform: rotate(180deg); }
              #faq summary::-webkit-details-marker { display: none; }
            `
          }}
        />
      </section>

      {/* CONTACTO (ancho limitado) */}
      <section id="contacto" className="section tone-plain" style={{ scrollMarginTop: 96 }}>
        <div className="container limited" style={{ display: "grid", gap: 14 }}>
          <h2 style={{ margin: 0, textAlign: "center" }}>Contáctame / Cotización</h2>
          <p className="muted" style={{ margin: 0, textAlign: "center" }}>
            Cuéntanos tu idea y te responderemos a la brevedad.
          </p>

        {msg ? (
            <div className="card" style={{ border: `1px solid ${ok ? "var(--accent)" : "var(--border)"}`, background: "var(--surface)", textAlign: "center" }}>
              <p style={{ margin: 0, color: ok ? "var(--accent)" : "var(--fg)" }}>{msg}</p>
            </div>
          ) : null}

          <form action={sendQuote} className="card stack" style={{ gap: 12 }}>
            <input type="hidden" name="locale" value={loc} />
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(12, 1fr)" }}>
              <label style={{ gridColumn: "span 12" }}>
                <span className="muted">Nombre</span>
                <input name="name" required placeholder="Tu nombre" className="field" />
              </label>

              <label style={{ gridColumn: "span 6" }}>
                <span className="muted">Email</span>
                <input type="email" name="email" required placeholder="tucorreo@dominio.com" className="field" />
              </label>

              <label style={{ gridColumn: "span 6" }}>
                <span className="muted">Teléfono</span>
                <input name="phone" placeholder="+51 999 999 999" className="field" />
              </label>

              <label style={{ gridColumn: "span 12" }}>
                <span className="muted">Servicio</span>
                <select name="service" required className="field">
                  <option value="">Selecciona una opción</option>
                  <option value="Arquitectura">Arquitectura</option>
                  <option value="Construcción">Construcción</option>
                </select>
              </label>

              <label style={{ gridColumn: "span 12" }}>
                <span className="muted">Mensaje / Idea</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe tu proyecto…"
                  className="field"
                  style={{ resize: "vertical" }}
                />
              </label>
            </div>

            <div className="wrap" style={{ justifyContent: "center" }}>
              <button className="btn" type="submit">Enviar</button>
              <Link href="#top" className="btn btn-outline">Volver arriba</Link>
            </div>
          </form>
        </div>
      </section>

      {/* ESTILOS */}
      <style>{`
        html{scroll-behavior:smooth}

        /* Contenedores */
        .edge{width:100%; padding-left:clamp(12px,4vw,28px); padding-right:clamp(12px,4vw,28px)}
        .container.limited{max-width:1100px; margin:0 auto; padding-left:clamp(12px,4vw,28px); padding-right:clamp(12px,4vw,28px)}

        /* HERO */
        .hero-media{position:absolute;inset:0;overflow:hidden}
        .hero-media video,.hero-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .6s ease}
        .hero-media video{opacity:1;filter:saturate(.95)}
        .hero-media img{opacity:0}
        .hero-content{position:relative;z-index:1}

        /* Badges difuminados */
        .title-badge{
          justify-self:center;
          font-size:1.4rem;font-weight:800;letter-spacing:.02em;
          color:var(--bg);
          background:color-mix(in oklab, var(--fg) 20%, transparent);
          border:1px solid rgba(255,255,255,.25);
          padding:10px 14px;border-radius:14px;
          backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
        }
        .subtitle-badge{
          justify-self:center;
          color:#fff; opacity:.95;
          background:color-mix(in oklab, var(--fg) 14%, transparent);
          border:1px solid rgba(255,255,255,.18);
          padding:8px 12px;border-radius:12px;max-width:980px;
          backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
        }

        /* Banda post-hero full width */
        .band-full{background:color-mix(in oklab, var(--surface) 18%, transparent);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .logos-row{display:flex;gap:16px;flex-wrap:wrap;align-items:center;justify-content:space-between}
        .logos-row span{padding:8px 12px;border:1px solid var(--border);border-radius:999px;background:var(--bg);font-weight:600}
        .kpis-row{display:flex;gap:20px;flex-wrap:wrap;align-items:center}
        .kpis-row div{display:grid;gap:2px;place-items:start}
        .kpis-row strong{font-size:1.1rem}

        /* Tones */
        .tone-plain{background:transparent}
        .tone-solid{background:color-mix(in oklab, var(--surface) 10%, transparent)}
        .title-left{text-align:left}

        /* Separadores */
        .section-sep{display:grid;place-items:center;padding:22px 0 0}
        .section-sep::before{content:"";width:min(62%, 820px);height:1px;background:var(--border);border-radius:999px;display:block}

        /* KPI cards */
        .grid-kpis{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr))}
        .kpi{border-radius:12px;padding:14px;text-align:center;box-shadow:var(--shadow-sm);background:var(--bg);border:1px solid var(--border)}
        .kpi-k{font-weight:800;font-size:1.25rem}

        /* Why/Testimonios UI */
        .grid-why{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
        .why{display:grid;gap:.5rem;align-content:start;padding:16px}
        .why-icon{width:44px;height:44px;border:1px solid var(--border);display:grid;place-items:center;border-radius:12px}

        .grid-testimonials{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
        .tcard{padding:16px;display:grid;gap:10px}
        .t-head{display:flex;gap:10px;align-items:center}
        .t-head img{width:42px;height:42px;border-radius:999px;object-fit:cover;border:1px solid var(--border)}

        .list{margin:0 0 0 1rem;line-height:1.7}
        .field{width:100%;padding:12px;border-radius:12px;border:1px solid var(--border);background:var(--surface)}

        /* Botón outline -> color de Cotizar al hover */
        .btn.btn-outline:hover{
          background:var(--accent);
          color:var(--bg) !important;
          border-color:var(--accent);
        }

        /* ======= CENTRADO EN MODO RESPONSIVE (sin romper nada existente) ======= */
        @media (max-width: 900px){
          /* Títulos que eran left -> centrados en móvil */
          .title-left{ text-align:center; }

          /* Secciones de arquitectura / construcción: centrar textos y acciones */
          .arch-side{ text-align:center; }
          .build-info{ text-align:center; }
          .wrap{ justify-content:center !important; }

          /* Tarjetas de servicios: centrar contenido y listas */
          .service-pro .sp-info{
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
          }
          .service-pro .sp-list{
            padding-left: 0;
            list-style-position: inside;
          }

          /* Banda de impacto: centrar cada item */
          .impact-item{ justify-content:center; text-align:center; }
          .impact-desc{ justify-items:center; }

          /* Why & Testimonios: centrar */
          .grid-why .why{ text-align:center; justify-items:center; }
          .tcard{ text-align:center; }
          .t-head{ justify-content:center; }

          /* Contenedores generales: centrar elementos sueltos */
          .edge, .container.limited{ text-align: center; }
        }

        @media (prefers-reduced-motion: reduce){
          .proj-card{animation:none;transform:none}
          .hero-media video{animation:none}
        }
      `}</style>
    </>
  );
}
