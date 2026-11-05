import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getAbsoluteUrl } from "../../config/site";
import { getSeoForRoute, DEFAULT_OG_IMAGE } from "../../config/seo";
import {
  buildPageGraphSchema,
  buildSoftwareApplicationSchema,
  type SchemaBreadcrumbItem,
  type SchemaGraph,
  type SchemaObject,
} from "../../lib/schema";
import JsonLd from "./JsonLd";

export interface SeoProps {
  /** Optional custom title; falls back to route default in src/config/seo.ts */
  title?: string;
  /** Optional custom description; falls back to route default in src/config/seo.ts */
  description?: string;
  /** Explicit canonical pathname (e.g. "/faq") */
  canonicalPath?: string;
  /** Open Graph type: "website" | "article" */
  ogType?: "website" | "article";
  /** Optional custom Open Graph image path (e.g. "/images/...") */
  ogImage?: string;
  /** Optional Open Graph image width */
  ogImageWidth?: string | number;
  /** Optional Open Graph image height */
  ogImageHeight?: string | number;
  /** Optional Open Graph image alt text */
  ogImageAlt?: string;
  /** Optional robots meta directive (e.g. "noindex, follow"). Defaults to routeMeta?.robots or VITE_ROBOTS or "index, follow" */
  robots?: string;
  /** Breadcrumb items for Schema.org BreadcrumbList */
  breadcrumbs?: SchemaBreadcrumbItem[];
  /** Additional Schema.org objects (e.g. FAQPage, SoftwareApplication) */
  additionalSchemas?: SchemaObject[];
  /** Full override for SchemaGraph */
  schema?: SchemaGraph | SchemaObject | Array<SchemaObject>;
}

function updateOrCreateMeta(
  selector: string,
  attributeName: string,
  attributeValue: string,
  content: string
) {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    elements[0].setAttribute("content", content);
    elements[0].setAttribute("data-zentilos-seo", "true");
    for (let i = 1; i < elements.length; i++) {
      elements[i].remove();
    }
  } else {
    const el = document.createElement("meta");
    el.setAttribute(attributeName, attributeValue);
    el.setAttribute("content", content);
    el.setAttribute("data-zentilos-seo", "true");
    document.head.appendChild(el);
  }
}

/**
 * Reusable SEO component for all Zentilos public pages.
 * Sets title, meta description, canonical link, Open Graph, Twitter cards,
 * and renders unified Schema.org JSON-LD via JsonLd.
 */
export function Seo({
  title,
  description,
  canonicalPath,
  ogType,
  ogImage,
  ogImageWidth,
  ogImageHeight,
  ogImageAlt,
  robots,
  breadcrumbs,
  additionalSchemas,
  schema,
}: SeoProps) {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = getAbsoluteUrl(currentPath);

  // Look up route metadata from central config
  const routeMeta = getSeoForRoute(currentPath);

  // Central config is the source of truth for all mapped routes (Section 3 & 4)
  // Dynamic routes (like /blog/:slug) will have routeMeta === undefined, so they will use the passed title/description.
  const finalTitle =
    routeMeta?.title ||
    title ||
    "Zentilos | HR, Payroll & Attendance For Multi-Branch Teams";
  const finalDescription =
    routeMeta?.description ||
    description ||
    "Replace spreadsheets with one HR, payroll and attendance system for every branch. Run payroll in minutes and approve faster. Book a demo.";
  const finalOgType = routeMeta?.ogType || ogType || "website";

  // Open Graph Image resolution: route-specific > prop > default branded hero showcase
  const rawOgImagePath = ogImage || routeMeta?.ogImage || DEFAULT_OG_IMAGE.path;
  const finalOgImageUrl = getAbsoluteUrl(rawOgImagePath);
  const finalOgImageWidth = String(ogImageWidth || routeMeta?.ogImageWidth || DEFAULT_OG_IMAGE.width);
  const finalOgImageHeight = String(ogImageHeight || routeMeta?.ogImageHeight || DEFAULT_OG_IMAGE.height);
  const finalOgImageAlt = ogImageAlt || routeMeta?.ogImageAlt || DEFAULT_OG_IMAGE.alt;

  // Per-route robots directive: routeMeta.robots (e.g. "noindex, follow") wins, then prop, then VITE_ROBOTS env default
  const envRobots = import.meta.env.VITE_ROBOTS || "index, follow";
  const finalRobots = robots || routeMeta?.robots || envRobots;

  useEffect(() => {
    // 1. Document Title
    document.title = finalTitle;

    // 2. Robots Meta Directive (per-route override with VITE_ROBOTS fallback)
    updateOrCreateMeta('meta[name="robots"]', "name", "robots", finalRobots);

    // 3. Meta Description
    updateOrCreateMeta('meta[name="description"]', "name", "description", finalDescription);

    // 4. Canonical Link
    const canonicals = document.querySelectorAll('link[rel="canonical"]');
    if (canonicals.length > 0) {
      canonicals[0].setAttribute("href", canonicalUrl);
      canonicals[0].setAttribute("data-zentilos-seo", "true");
      for (let i = 1; i < canonicals.length; i++) {
        canonicals[i].remove();
      }
    } else {
      const linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      linkCanonical.setAttribute("href", canonicalUrl);
      linkCanonical.setAttribute("data-zentilos-seo", "true");
      document.head.appendChild(linkCanonical);
    }

    // 5. Open Graph Tags
    updateOrCreateMeta('meta[property="og:title"]', "property", "og:title", finalTitle);
    updateOrCreateMeta('meta[property="og:description"]', "property", "og:description", finalDescription);
    updateOrCreateMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    updateOrCreateMeta('meta[property="og:type"]', "property", "og:type", finalOgType);
    updateOrCreateMeta('meta[property="og:site_name"]', "property", "og:site_name", "Zentilos");

    // Open Graph Image Tags
    updateOrCreateMeta('meta[property="og:image"]', "property", "og:image", finalOgImageUrl);
    updateOrCreateMeta('meta[property="og:image:width"]', "property", "og:image:width", finalOgImageWidth);
    updateOrCreateMeta('meta[property="og:image:height"]', "property", "og:image:height", finalOgImageHeight);
    updateOrCreateMeta('meta[property="og:image:alt"]', "property", "og:image:alt", finalOgImageAlt);

    // 6. Twitter Card Tags
    updateOrCreateMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    updateOrCreateMeta('meta[name="twitter:title"]', "name", "twitter:title", finalTitle);
    updateOrCreateMeta('meta[name="twitter:description"]', "name", "twitter:description", finalDescription);
    updateOrCreateMeta('meta[name="twitter:image"]', "name", "twitter:image", finalOgImageUrl);

    // 7. Prerender Signal: notify headless browser prerender that head metadata and DOM effects have settled
    document.documentElement.setAttribute("data-prerender-ready", "true");
  }, [
    finalTitle,
    finalDescription,
    canonicalUrl,
    finalOgType,
    finalOgImageUrl,
    finalOgImageWidth,
    finalOgImageHeight,
    finalOgImageAlt,
    finalRobots,
  ]);

  // Compute structured data (preserves existing JSON-LD builders)
  const finalSchema = useMemo(() => {
    if (schema) {
      return schema;
    }

    const isHome = currentPath === "/";
    const isFeaturePage = currentPath.startsWith("/features") || currentPath === "/product";
    const extra: SchemaObject[] = additionalSchemas ? [...additionalSchemas] : [];

    // On home and feature pages, include SoftwareApplication schema
    if ((isHome || isFeaturePage) && !extra.some((s) => s["@type"] === "SoftwareApplication")) {
      extra.push(buildSoftwareApplicationSchema());
    }

    // Default breadcrumbs matching real site navigation hierarchy
    let effectiveCrumbs = breadcrumbs;
    if (!effectiveCrumbs && !isHome) {
      const cleanTitle = finalTitle.split(" - ")[0].split(" | ")[0].trim();

      if (currentPath.startsWith("/features/")) {
        effectiveCrumbs = [
          { name: "Features", path: "/product" },
          { name: cleanTitle, path: currentPath },
        ];
      } else if (currentPath.startsWith("/solutions/")) {
        effectiveCrumbs = [
          { name: "Solutions", path: "/solutions" },
          { name: cleanTitle, path: currentPath },
        ];
      } else if (currentPath.startsWith("/resources/")) {
        effectiveCrumbs = [
          { name: "Resources", path: "/resources" },
          { name: cleanTitle, path: currentPath },
        ];
      } else if (currentPath.startsWith("/blog/")) {
        effectiveCrumbs = [
          { name: "Blog", path: "/blog" },
          { name: cleanTitle, path: currentPath },
        ];
      } else if (currentPath.startsWith("/guides/")) {
        effectiveCrumbs = [
          { name: "Guides", path: "/guides" },
          { name: cleanTitle, path: currentPath },
        ];
      } else if (currentPath.startsWith("/support/")) {
        effectiveCrumbs = [
          { name: "Support", path: "/support" },
          { name: cleanTitle, path: currentPath },
        ];
      } else {
        effectiveCrumbs = [{ name: cleanTitle, path: currentPath }];
      }
    }

    return buildPageGraphSchema({
      currentPath,
      breadcrumbs: effectiveCrumbs,
      additionalSchemas: extra,
    });
  }, [schema, currentPath, finalTitle, breadcrumbs, additionalSchemas]);

  return <JsonLd schema={finalSchema} />;
}

// Aliases for seamless backwards compatibility
export { Seo as SEO };
export default Seo;
