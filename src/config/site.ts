/**
 * Site configuration and Schema.org metadata constants for Zentilos.
 * Domain is dynamic: sourced from VITE_SITE_URL (fallback: http://localhost:5173).
 */

export interface ContactPointConfig {
  contactType: string;
  telephone?: string;
  email?: string;
  availableLanguage?: string[];
  areaServed: Array<{
    "@type": "Country" | "Continent";
    name: string;
  }>;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  description: string;
  inLanguage: string;
  applicationCategory: string;
  operatingSystem: string;
  featureList: string[];
  areasServed: Array<{
    "@type": "Country" | "Continent";
    name: string;
  }>;
  /**
   * TODO: Add physical headquarters address only if shown on the website.
   * Property is omitted from Schema.org output when undefined.
   */
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  /**
   * TODO: Provide high-resolution logo image URL (at least 112x112 px).
   * Note: Favicon is /favicon.png. Property is omitted from Schema.org output when undefined.
   */
  logo?: string;
  /**
   * TODO: Add official verified social profile URLs (e.g. LinkedIn, Twitter/X).
   * Property is omitted from Schema.org output when array is empty.
   */
  sameAs: string[];
  /**
   * Regional contact points for India, United States, and African countries.
   * TODO: Fill in region-wise verified telephone (with country codes) and emails once active.
   * Entries with no telephone or email will be omitted from the Schema.org contactPoint output.
   */
  contactPoints: ContactPointConfig[];
}

export function getSiteUrl(): string {
  const envUrl = import.meta.env.VITE_SITE_URL;
  if (typeof envUrl === "string" && envUrl.trim().length > 0) {
    return envUrl.replace(/\/+$/, "");
  }
  return "http://localhost:5173";
}

export function getAbsoluteUrl(path: string = ""): string {
  const base = getSiteUrl();
  if (!path || path === "/") {
    return base;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export const siteConfig: SiteConfig = {
  name: "Zentilos",
  legalName: "Zentilos",
  description:
    "Zentilos is an all-in-one HR, payroll and attendance system for multi-branch teams. It replaces spreadsheets with one platform for attendance, approvals, payroll and employee self-service, so businesses can run payroll in minutes.",
  inLanguage: "en",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  featureList: [
    "attendance management",
    "payroll processing",
    "approvals workflow",
    "multi-branch HR management",
    "employee self-service",
    "role-based access",
  ],
  areasServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Continent", name: "Africa" },
  ],
  // TODO: Add headquarters address when verified
  address: undefined,
  // TODO: Logo path (favicon is /favicon.png; schema logo should be >= 112x112 px). Omitted until verified.
  logo: undefined,
  // TODO: Official social media profile URLs. Omitted from schema when empty.
  sameAs: [],
  // Regional contact points supporting India, United States, and African nations:
  contactPoints: [
    {
      contactType: "Customer Support & Inquiries - India",
      // TODO: Add verified phone number with country code (e.g. +91...)
      telephone: undefined,
      // TODO: Add verified email address
      email: undefined,
      availableLanguage: ["English", "Hindi"],
      areaServed: [{ "@type": "Country", name: "India" }],
    },
    {
      contactType: "Customer Support & Inquiries - United States",
      // TODO: Add verified phone number with country code (e.g. +1...)
      telephone: undefined,
      // TODO: Add verified email address
      email: undefined,
      availableLanguage: ["English"],
      areaServed: [{ "@type": "Country", name: "United States" }],
    },
    {
      contactType: "Customer Support & Inquiries - Africa",
      // TODO: Add verified phone number with country code per African region
      telephone: undefined,
      // TODO: Add verified email address
      email: undefined,
      availableLanguage: ["English", "French", "Swahili"],
      areaServed: [{ "@type": "Continent", name: "Africa" }],
    },
  ],
};

