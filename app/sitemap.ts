import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/seo";

const LOCALES = ["en", "es"] as const;
const PATHS = ["", "/pagina2", "/pagina3", "/pagina4"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return LOCALES.flatMap((loc) =>
    PATHS.map((p) => ({
      url: `${siteUrl}/${loc}${p}`,
      lastModified
    }))
  );
}
