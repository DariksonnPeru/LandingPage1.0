// lib/seo.ts
import type { Metadata } from "next";
import { t, LOCALES, type Locale, type EsKeys } from "./i18n";

export const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") as string) ||
  "https://example.com";

function ogLocale(loc: Locale) {
  return loc === "es" ? "es_ES" : "en_US";
}

export function baseOpenGraph(params: {
  locale?: Locale;
  title: string;
  description: string;
  path?: string;
}) {
  const loc = (LOCALES as readonly string[]).includes(params.locale || "")
    ? (params.locale as Locale)
    : "en";
  const url = params.path ? `${siteUrl}${params.path}` : siteUrl;
  return {
    type: "website",
    locale: ogLocale(loc),
    siteName: t("app_title", loc),
    title: params.title,
    description: params.description,
    url,
    images: [
      { url: "/og.jpg", width: 1200, height: 630, alt: t("app_title", loc) },
    ],
  };
}

export function getMetadata(args: {
  locale?: Locale;
  titleKey: EsKeys;
  descKey: EsKeys;
  path?: string;
}): Metadata {
  const loc = (LOCALES as readonly string[]).includes(args.locale || "")
    ? (args.locale as Locale)
    : "en";
  const title = t(args.titleKey, loc);
  const description = t(args.descKey, loc);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: baseOpenGraph({ locale: loc, title, description, path: args.path }),
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
    alternates: { languages: { en: "/en", es: "/es" } },
  };
}
