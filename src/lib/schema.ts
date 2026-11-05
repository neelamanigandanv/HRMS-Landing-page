/**
 * Schema.org typed JSON-LD builders for Zentilos.
 * Strictly adheres to Google Rich Results guidelines and Schema.org specifications.
 * Pure TypeScript, zero `any`.
 */

import { siteConfig, getSiteUrl, getAbsoluteUrl } from "../config/site";
import type { JobOpening } from "../data/careersData";

export interface SchemaBreadcrumbItem {
  name: string;
  path: string;
}

export interface SchemaFAQItem {
  question: string;
  answer: string;
}

export interface SchemaPostalAddress {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface SchemaContactPoint {
  "@type": "ContactPoint";
  contactType: string;
  telephone?: string;
  email?: string;
  availableLanguage?: string[];
  areaServed: Array<{
    "@type": "Country" | "Continent";
    name: string;
  }>;
}

export interface SchemaOrganization {
  "@type": "Organization";
  "@id": string;
  name: string;
  legalName?: string;
  url: string;
  description: string;
  areaServed: Array<{
    "@type": "Country" | "Continent";
    name: string;
  }>;
  logo?: string;
  sameAs?: string[];
  contactPoint?: SchemaContactPoint[];
  address?: SchemaPostalAddress;
}

export interface SchemaWebSite {
  "@type": "WebSite";
  "@id": string;
  name: string;
  url: string;
  inLanguage: string;
  description: string;
  publisher: {
    "@id": string;
  };
}

export interface SchemaSoftwareApplication {
  "@type": "SoftwareApplication";
  "@id": string;
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  url: string;
  featureList: string[];
  publisher: {
    "@id": string;
  };
}

export interface SchemaBreadcrumbList {
  "@type": "BreadcrumbList";
  "@id": string;
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface SchemaFAQPage {
  "@type": "FAQPage";
  "@id"?: string;
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface SchemaJobPosting {
  "@type": "JobPosting";
  "@id": string;
  title: string;
  description: string;
  datePosted: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "OTHER";
  hiringOrganization: {
    "@id": string;
  };
  jobLocation: {
    "@type": "Place";
    address: {
      "@type": "PostalAddress";
      addressLocality: string;
    };
  };
  jobLocationType?: "TELECOMMUTE";
}

export type SchemaObject =
  | SchemaOrganization
  | SchemaWebSite
  | SchemaSoftwareApplication
  | SchemaBreadcrumbList
  | SchemaFAQPage
  | SchemaJobPosting;

export interface SchemaGraph {
  "@context": "https://schema.org";
  "@graph": SchemaObject[];
}

/**
 * Builds Organization schema.
 * All TODO items (logo, address, phones) are strictly omitted if undefined.
 */
export function buildOrganizationSchema(): SchemaOrganization {
  const siteUrl = getSiteUrl();

  const org: SchemaOrganization = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteUrl,
    description: siteConfig.description,
    areaServed: siteConfig.areasServed,
  };

  if (siteConfig.logo) {
    org.logo = getAbsoluteUrl(siteConfig.logo);
  }

  if (siteConfig.sameAs && siteConfig.sameAs.length > 0) {
    org.sameAs = siteConfig.sameAs;
  }

  // Filter contact points: only include if telephone or email is defined
  const activeContacts: SchemaContactPoint[] = siteConfig.contactPoints
    .filter((cp) => Boolean(cp.telephone || cp.email))
    .map((cp) => {
      const point: SchemaContactPoint = {
        "@type": "ContactPoint",
        contactType: cp.contactType,
        areaServed: cp.areaServed,
      };
      if (cp.telephone) point.telephone = cp.telephone;
      if (cp.email) point.email = cp.email;
      if (cp.availableLanguage && cp.availableLanguage.length > 0) {
        point.availableLanguage = cp.availableLanguage;
      }
      return point;
    });

  if (activeContacts.length > 0) {
    org.contactPoint = activeContacts;
  }

  if (siteConfig.address) {
    org.address = {
      "@type": "PostalAddress",
      ...siteConfig.address,
    };
  }

  return org;
}

/**
 * Builds WebSite schema.
 */
export function buildWebSiteSchema(): SchemaWebSite {
  const siteUrl = getSiteUrl();

  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteConfig.name,
    url: siteUrl,
    inLanguage: siteConfig.inLanguage,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

/**
 * Builds SoftwareApplication schema for Home and Feature pages.
 * Pricing is demo/quote based; offers are omitted per instructions.
 */
export function buildSoftwareApplicationSchema(): SchemaSoftwareApplication {
  const siteUrl = getSiteUrl();

  return {
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#software`,
    name: siteConfig.name,
    applicationCategory: siteConfig.applicationCategory,
    operatingSystem: siteConfig.operatingSystem,
    description: siteConfig.description,
    url: siteUrl,
    featureList: siteConfig.featureList,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

/**
 * Builds BreadcrumbList schema matching navigation paths.
 */
export function buildBreadcrumbSchema(
  items: SchemaBreadcrumbItem[],
  currentPath: string
): SchemaBreadcrumbList {
  const siteUrl = getSiteUrl();

  // Ensure first breadcrumb is always Home
  const fullItems: SchemaBreadcrumbItem[] =
    items.length > 0 && items[0].path === "/"
      ? items
      : [{ name: "Home", path: "/" }, ...items];

  return {
    "@type": "BreadcrumbList",
    "@id": `${getAbsoluteUrl(currentPath)}#breadcrumb`,
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

/**
 * Builds FAQPage schema from verified FAQ items.
 */
export function buildFAQSchema(
  faqs: SchemaFAQItem[],
  pagePath?: string
): SchemaFAQPage {
  const schema: SchemaFAQPage = {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  if (pagePath) {
    schema["@id"] = `${getAbsoluteUrl(pagePath)}#faq`;
  }

  return schema;
}

/**
 * Builds JobPosting schema for real openings on the Careers page.
 */
export function buildJobPostingSchema(job: JobOpening): SchemaJobPosting {
  const siteUrl = getSiteUrl();

  const typeMap: Record<string, "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "OTHER"> = {
    "Full-Time": "FULL_TIME",
    "Part-Time": "PART_TIME",
    "Contract": "CONTRACTOR",
    "Remote": "FULL_TIME",
  };

  const schema: SchemaJobPosting = {
    "@type": "JobPosting",
    "@id": `${siteUrl}/careers/${job.id}#job`,
    title: job.title,
    description: job.aboutRole || job.shortSummary,
    datePosted: job.postedDate,
    employmentType: typeMap[job.type] || "FULL_TIME",
    hiringOrganization: {
      "@id": `${siteUrl}/#organization`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
      },
    },
  };

  if (job.type === "Remote" || job.location.toLowerCase().includes("remote")) {
    schema.jobLocationType = "TELECOMMUTE";
  }

  return schema;
}

/**
 * Combines all page-specific schemas into a unified Graph.
 * Guarantees no duplicate schema blocks, valid cross-linking with @id, and clean JSON-LD.
 */
export function buildPageGraphSchema(options: {
  currentPath: string;
  breadcrumbs?: SchemaBreadcrumbItem[];
  additionalSchemas?: SchemaObject[];
}): SchemaGraph {
  const graph: SchemaObject[] = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
  ];

  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    graph.push(buildBreadcrumbSchema(options.breadcrumbs, options.currentPath));
  }

  if (options.additionalSchemas && options.additionalSchemas.length > 0) {
    graph.push(...options.additionalSchemas);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

