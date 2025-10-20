// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "es"] as const;
const DEFAULT_LOCALE = "es";

function pickLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const parts = acceptLanguage.split(",").map(s => s.split(";")[0].trim().toLowerCase());
  for (const lang of parts) {
    if (LOCALES.includes(lang as any)) return lang;
    const base = lang.split("-")[0];
    if (LOCALES.includes(base as any)) return base;
  }
  return DEFAULT_LOCALE;
}

function handle(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/media") ||             
    pathname.startsWith("/sitemap") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    /\.[^/]+$/.test(pathname)                   
  ) {
    return NextResponse.next();
  }

  const hasLocalePrefix =
    pathname === "/en" ||
    pathname === "/es" ||
    pathname.startsWith("/en/") ||
    pathname.startsWith("/es/");

  if (hasLocalePrefix) return NextResponse.next();

  const locale = pickLocale(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(url);
}

export default function middleware(req: NextRequest) {
  return handle(req);
}

export { middleware };

export const config = {
  matcher: ['/((?!api|_next|_vercel|media|.*\\..*).*)'],
};
