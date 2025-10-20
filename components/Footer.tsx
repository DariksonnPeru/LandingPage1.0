"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname() || "/";
  const year = new Date().getFullYear();

  // Detecta prefijo de locale (/es, /en, /pt...). Si no hay, deja vacío.
  const parts = pathname.split("/").filter(Boolean);
  const base = parts[0] && parts[0].length <= 3 ? `/${parts[0]}` : "";

  // Contacto
  const PHONE_MAIN = "+51973167892"; // WhatsApp / CTA principal
  const PHONE_ALT  = "+51936764188";
  const IG_URL = "https://www.instagram.com/darikson.arq.constr?igsh=MWw0NG01b2NhcG41&utm_source=qr";

  return (
    <footer
      className="section footer"
      style={{
        // borderTop eliminado
        background: "var(--surface)",
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      {/* Top: brand + CTA */}
      <div className="container footer-top">
        <div className="brand">
          {/* Pon tu logo en /logo.svg (o ajusta la ruta) */}
          <Link href={`${base || ""}/`} aria-label="Inicio — Servicios Generales Darikson">
            <div className="logo">
              <img src="/logo1.0.png" alt="Servicios Generales Darikson" />
            </div>
          </Link>
          <div className="brand-copy">
            <strong className="brand-name">Servicios Generales Darikson</strong>
            <span className="muted"></span>
          </div>
        </div>

        <div className="cta-wrap">
          <a
            href={`https://wa.me/${PHONE_MAIN.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
          >
            {/* CTA opcional */}
          </a>
        </div>
      </div>

      {/* Middle: columnas */}
      <div className="container footer-grid">
        <nav aria-label="Servicios" className="col">
          <div className="col-title">Servicios</div>
          <ul className="links">
            <li>
              <Link href={`${base}/arquitectura`}>Arquitectura</Link>
            </li>
            <li>
              <Link href={`${base}/construccion`}>Construcción</Link>
            </li>
            <li>
              {/* Sub-sección de Acabados dentro de Arquitectura (ajusta si es otra URL) */}
              <Link href={`${base}/arquitectura#acabados`}>Acabados</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Recursos" className="col">
          <div className="col-title">Recursos</div>
          <ul className="links">
            <li>
              <Link href={`${base}/#proyectos`}>Proyectos</Link>
            </li>
            <li>
              <Link href={`${base}/#faq`}>Preguntas frecuentes</Link>
            </li>
            <li>
              <Link href={`${base}/#contacto`}>Contacto</Link>
            </li>
          </ul>
        </nav>

        <div className="col" aria-label="Contacto">
          <div className="col-title">Contacto</div>
          <ul className="links">
            <li>
              <a href="mailto:hola@darikson.com" aria-label="Enviar correo a hola@darikson.com">
                hola@darikson.com
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_MAIN}`} aria-label={`Llamar al ${PHONE_MAIN.replace("+51", "+51 ")}`}>
                973 167 892
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_ALT}`} aria-label={`Llamar al ${PHONE_ALT.replace("+51", "+51 ")}`}>
                936 764 188
              </a>
            </li>
            <li className="muted">Lun–Vie 9:00–18:00</li>
            <li className="muted">Lima, Perú</li>
          </ul>
        </div>

        <div className="col" aria-label="Síguenos">
          <div className="socials">
            <a
              href={IG_URL}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <path d="M16.5 7.5h.01" />
                <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v15H0V8zm7.5 0H12v2h.06c.63-1.2 2.18-2.47 4.49-2.47C21.4 7.53 24 10 24 14.42V23H19v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23H7.5V8z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.5-3.89 3.8-3.89 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.57v1.9h2.79l-.45 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94z" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${PHONE_MAIN.replace("+", "")}`}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.73 0 .64 5.09.64 11.37c0 2 .52 3.94 1.53 5.67L0 24l7.17-2.11a11.33 11.33 0 0 0 4.85 1.1h.01c6.27 0 11.36-5.09 11.36-11.37 0-3.03-1.18-5.88-3.27-8.14zM12.03 21.2h-.01a9.4 9.4 0 0 1-4.78-1.31l-.34-.2-4.25 1.25 1.25-4.14-.22-.35a9.37 9.37 0 0 1-1.46-5.08c0-5.19 4.23-9.42 9.44-9.42a9.41 9.41 0 0 1 6.67 2.76 9.58 9.58 0 0 1 2.77 6.7c0 5.2-4.23 9.42-9.47 9.42zm5.48-7.03c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.22-.66.07-.3-.15-1.25-.46-2.39-1.47-.88-.76-1.48-1.7-1.66-1.99-.17-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.69-1.67-.95-2.29-.25-.6-.5-.51-.69-.52h-.58c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.1 4.48.71.31 1.27.49 1.71.63.72.23 1.37.2 1.88.12.57-.08 1.78-.73 2.04-1.43.25-.7.25-1.31.18-1.43-.07-.12-.27-.2-.57-.35z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: legales */}
      <div className="container footer-bottom">
        <span className="muted">© {year} Servicios Generales Darikson. Todos los derechos reservados.</span>
      </div>

      <style>{`
        .footer .container{display:grid;gap:14px}

        .footer-top{
          grid-template-columns: 1fr auto;
          align-items:center;
        }
        @media (max-width: 820px){
          .footer-top{grid-template-columns:1fr;gap:10px}
        }

        .brand{display:flex;gap:12px;align-items:center}
        .logo{width:44px;height:44px;border-radius:12px;border:1px solid var(--border);background:var(--bg);display:grid;place-items:center;overflow:hidden}
        .logo img{width:100%;height:100%;object-fit:contain;padding:6px}
        .brand-copy{display:grid;gap:2px}
        .brand-name{font-size:1.1rem;letter-spacing:-.01em;color:var(--fg)}

        .cta-wrap{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}
        @media (max-width: 820px){.cta-wrap{justify-content:flex-start}}
        .cta-whatsapp{
          display:inline-flex;align-items:center;gap:8px;
          padding:10px 14px;border-radius:12px;border:1px solid var(--border);
          background:var(--accent);color:var(--bg);text-decoration:none;font-weight:600;
          box-shadow:var(--shadow-sm)
        }
        .cta-whatsapp:hover{filter:brightness(.95)}

        .footer-grid{
          grid-template-columns: repeat(4, minmax(0,1fr));
          align-items:start;
          padding-top:4px;
          padding-bottom:8px;
          /* líneas separadoras removidas */
          /* border-top:1px solid var(--border); */
          /* border-bottom:1px solid var(--border); */
        }
        @media (max-width: 980px){
          .footer-grid{grid-template-columns: repeat(2, minmax(0,1fr))}
        }
        @media (max-width: 540px){
          .footer-grid{grid-template-columns: 1fr}
        }

        .col{display:grid;gap:10px}
        .col-title{font-weight:700;color:var(--fg)}
        .links{display:grid;gap:6px;margin:0;padding:0;list-style:none}
        .links a{color:var(--fg);text-decoration:none;border-radius:8px;padding:4px 0}
        .links a:hover{color:var(--bg);background:var(--accent);padding:4px 8px;transition:all .16s ease}

        .socials{display:flex;gap:10px;flex-wrap:wrap}
        .social-btn{
          width:40px;height:40px;display:inline-flex;align-items:center;justify-content:center;
          border-radius:12px;border:1px solid var(--border);background:transparent;box-shadow:var(--shadow-sm);color:var(--fg)
        }
        .social-btn:hover{border-color:var(--accent);color:var(--bg);background:var(--accent)}

        .footer-bottom{
          grid-template-columns: 1fr auto;
          align-items:center;
        }
        @media (max-width: 820px){
          .footer-bottom{grid-template-columns:1fr;gap:8px}
        }
        .legal{display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
        .legal a{color:var(--fg);text-decoration:none;border:1px solid var(--border);padding:6px 10px;border-radius:10px;background:var(--bg)}
        .legal a:hover{border-color:var(--accent);background:var(--accent);color:var(--bg)}
        .small{font-size:.85rem}
      `}</style>
    </footer>
  );
}
