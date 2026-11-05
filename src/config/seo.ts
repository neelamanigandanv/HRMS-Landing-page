/**
 * Central SEO Configuration for Zentilos.
 * Strictly adheres to Google Search Central guidelines:
 * - Title: <= 60 characters, brand-aligned, unique per route.
 * - Meta Description: 110 to 160 characters, truthful, unique per route.
 * - Per-route robots override ("noindex, follow" for conversion/internal/placeholder pages).
 * - Pure TypeScript, zero `any`.
 */

export interface OgImageConfig {
  path: string;
  width: string;
  height: string;
  alt: string;
}

export const DEFAULT_OG_IMAGE: OgImageConfig = {
  path: "/og/hero-plum-dashboard-showcase.jpg",
  width: "1200",
  height: "670",
  alt: "Zentilos HR, Payroll and Attendance Management Platform",
};

export interface SeoRouteMeta {
  title: string;
  description: string;
  ogType?: "website" | "article";
  robots?: string;
  ogImage?: string;
  ogImageWidth?: string | number;
  ogImageHeight?: string | number;
  ogImageAlt?: string;
}

/**
 * Exact, user-approved route SEO mappings.
 */
export const APPROVED_SEO_ROUTES: Record<string, SeoRouteMeta> = {
  // Core & Solutions (Section 3 Approved)
  "/": {
    title: "Zentilos | HR, Payroll & Attendance For Multi-Branch Teams",
    description:
      "Replace spreadsheets with one HR, payroll and attendance system for every branch. Run payroll in minutes and approve faster. Book a demo.",
    ogType: "website",
  },
  "/solutions": {
    title: "HR Software Solutions by Business Size | Zentilos",
    description:
      "Explore Zentilos HR, payroll and attendance solutions for small, mid-sized and enterprise teams, with multi-branch support. Book a demo.",
    ogType: "website",
  },
  "/solutions/small-businesses": {
    title: "HR & Payroll Software for Small Businesses | Zentilos",
    description:
      "Run attendance, leave and payroll for small teams in one simple system. Cut spreadsheet work and stay compliant. Book a demo.",
    ogType: "website",
  },
  "/solutions/mid-sized-businesses": {
    title: "HR & Payroll Software for Mid-Sized Businesses | Zentilos",
    description:
      "Manage 50 to 500 employees across branches with attendance, payroll and approvals in one platform. See Zentilos in a demo.",
    ogType: "website",
  },
  "/solutions/enterprises": {
    title: "Enterprise HR & Payroll Software | Zentilos",
    description:
      "Multi-entity HR, payroll and attendance for large teams, with role-based access and ERP, SSO integrations. Talk to our team.",
    ogType: "website",
  },
  "/solutions/industries": {
    title: "HR Software for Manufacturing & Industries | Zentilos",
    description:
      "Custom shifts, multi-plant biometric attendance and payroll for industry teams. See how Zentilos fits your workforce.",
    ogType: "website",
  },

  // Features (Section 3 Approved)
  "/features/employee-management": {
    title: "Employee Management Software | Zentilos",
    description:
      "Keep every employee record in one directory with bulk import, role-based access and payroll sync. See it in a demo.",
    ogType: "website",
  },
  "/features/attendance-management": {
    title: "Attendance Management Software | Zentilos",
    description:
      "Track attendance with biometric, mobile geo-fence and web punch, manage shifts and overtime, and sync to payroll automatically.",
    ogType: "website",
  },
  "/features/leave-management": {
    title: "Leave Management Software | Zentilos",
    description:
      "Set leave policies per branch, automate accruals and approvals, and avoid team clashes. Syncs with payroll. Book a demo.",
    ogType: "website",
  },
  "/features/payroll-management": {
    title: "Payroll Management Software for India | Zentilos",
    description:
      "Run statutory payroll with PF, ESI, PT and TDS, generate payslips and bank files in minutes. Book a Zentilos demo.",
    ogType: "website",
  },
  "/features/asset-management": {
    title: "Employee Asset Management Software | Zentilos",
    description:
      "Assign laptops and devices to employees, track handovers and returns, and audit assets with QR codes. See Zentilos in action.",
    ogType: "website",
  },
  "/features/recruitment": {
    title: "Recruitment & Applicant Tracking Software | Zentilos",
    description:
      "Track candidates through custom hiring stages, use scorecards, and move hires into onboarding in one system. Book a demo.",
    ogType: "website",
  },
  "/features/documents-compliance": {
    title: "HR Documents & Compliance Software | Zentilos",
    description:
      "Store employee documents securely, track expiries and stay audit-ready with permissions and encryption. Book a demo.",
    ogType: "website",
  },
  "/features/performance-management": {
    title: "Performance Management Software | Zentilos",
    description:
      "Set goals, run manager review cycles and track employee progress in one place. See how Zentilos supports growth.",
    ogType: "website",
  },
  "/features/roles-permissions": {
    title: "Role-Based Access Control for HR | Zentilos",
    description:
      "Give HR, managers and payroll teams the right access with role-based permissions and data isolation. Book a demo.",
    ogType: "website",
  },
  "/features/reports-analytics": {
    title: "HR Reports & Analytics Software | Zentilos",
    description:
      "Get HR, attendance and payroll reports across branches, export to Excel or CSV and schedule them by email. Book a demo.",
    ogType: "website",
  },

  // Resources, FAQ & Support (Section 3 Approved)
  "/resources": {
    title: "HR Resources, Guides & Blog | Zentilos",
    description:
      "Guides, how-tos and answers on HR, payroll and attendance for multi-branch teams. Learn how to get more from Zentilos.",
    ogType: "website",
  },
  "/faq": {
    title: "Zentilos FAQ | Pricing, Payroll, Attendance & Security",
    description:
      "Answers on pricing, setup time, statutory payroll, attendance methods, data security and support. Find what you need about Zentilos.",
    ogType: "website",
  },
  "/help": {
    title: "Help Center | Zentilos",
    description:
      "Find answers on Zentilos HR modules, multi-branch setup, user permissions and how to request a product demo. Visit the Help Center.",
    ogType: "website",
  },
  "/support": {
    title: "Customer Support | Zentilos",
    description:
      "Get help with Zentilos setup, payroll, attendance and billing. Browse FAQs or contact our support team for quick assistance.",
    ogType: "website",
  },
  "/support/employee-help": {
    title: "Employee Help | Payslips, Punches & Login | Zentilos",
    description:
      "Help for employees: download payslips, regularize attendance punches, fix login problems and update bank or PAN details.",
    ogType: "website",
  },

  // Company & Conversions (Section 3 Approved)
  "/about": {
    title: "About Zentilos | HR, Payroll & Attendance Software",
    description:
      "Learn about Zentilos, the HR, payroll and attendance system for multi-branch teams in India, the USA and Africa.",
    ogType: "website",
  },
  "/contact": {
    title: "Contact Zentilos | Talk to Our Team",
    description:
      "Get in touch with the Zentilos team for sales, product and support questions about HR, payroll and attendance software.",
    ogType: "website",
  },
  "/request-demo": {
    title: "Request a Demo | Zentilos HR & Payroll Software",
    description:
      "Book a live Zentilos demo tailored to your team size, attendance setup and payroll structure. See it working for your business.",
    ogType: "website",
  },
  "/careers": {
    title: "Careers at Zentilos | Join Our Team",
    description:
      "Explore open roles at Zentilos and help build HR, payroll and attendance software for teams across India, the USA and Africa.",
    ogType: "website",
  },
  "/partners": {
    title: "Partner With Zentilos | HR & Payroll Software",
    description:
      "Partner with Zentilos to offer HR, payroll and attendance software to your clients. Learn how we can work together.",
    ogType: "website",
  },
  "/security": {
    title: "Security & Data Protection | Zentilos",
    description:
      "Learn how Zentilos protects HR and payroll data with encryption, role-based access and secure storage. Your data stays yours.",
    ogType: "website",
  },
  "/terms-of-service": {
    title: "Terms of Service | Zentilos",
    description:
      "Read the Zentilos Terms of Service covering the use of our HR, payroll and attendance platform and related services.",
    ogType: "website",
  },
  "/guides": {
    title: "HR & Payroll Guides for Teams | Zentilos",
    description:
      "Practical guides on HR, payroll, attendance and compliance for multi-branch teams. Learn step by step with Zentilos.",
    ogType: "website",
  },
  "/blog": {
    title: "HR & Payroll Blog | Zentilos",
    description:
      "Articles on payroll, attendance, compliance and HR management for growing multi-branch businesses, from the Zentilos team.",
    ogType: "website",
  },

  // User-Approved Additional Routes (Section 4 Approved)
  "/product": {
    title: "All-in-One HR & Payroll Platform | Zentilos",
    description:
      "Explore all Zentilos HRMS modules: core HR, biometric attendance, statutory payroll, leaves and performance in one system. See it in a demo.",
    ogType: "website",
  },
  "/solutions/hr-teams": {
    title: "HR Software Solutions for HR Teams | Zentilos",
    description:
      "Automate leave requests, onboarding documentation, attendance tracking and policy approvals so your HR team can focus on people and culture.",
    ogType: "website",
  },
  "/solutions/finance-teams": {
    title: "Payroll Solutions for Finance & CFO Teams | Zentilos",
    description:
      "Get verified attendance inputs, automated statutory tax calculations and 1-click corporate bank transfer files. Run zero-error payroll with Zentilos.",
    ogType: "website",
  },
  "/glossary": {
    title: "HRMS & Payroll Glossary | Zentilos",
    description:
      "Browse definitions and practical answers for HR, payroll, attendance and Indian labor law compliance terms in the Zentilos glossary.",
    ogType: "website",
  },
  "/api-documentation": {
    title: "Developer REST API Reference | Zentilos",
    description:
      "Connect your apps to Zentilos. Explore REST API documentation, endpoints, request schemas and code samples for HR and payroll workflows.",
    ogType: "website",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Zentilos",
    description:
      "Read how Zentilos collects, uses and protects company and employee data, and how you can contact us about your privacy questions.",
    ogType: "website",
  },
  "/cookie-policy": {
    title: "Cookie Policy | Zentilos",
    description:
      "Read the Zentilos Cookie Policy to understand how we use strictly necessary, functional and performance cookies across our platform.",
    ogType: "website",
  },
  "/data-processing-agreement": {
    title: "Data Processing Agreement | Zentilos",
    description:
      "Review the Zentilos Data Processing Agreement covering processor obligations, security measures, sub-processors and data handling terms.",
    ogType: "website",
  },
  "/sitemap": {
    title: "Website Sitemap | Zentilos",
    description:
      "Find links to all public pages, HRMS feature deep-dives, industry solutions, guides and support resources on the Zentilos website.",
    ogType: "website",
  },
  "/support/help-center": {
    title: "Browse Help Center by Module | Zentilos",
    description:
      "Explore step-by-step guides, setup instructions and troubleshooting articles across all Zentilos HR, attendance and payroll modules.",
    ogType: "website",
  },
  "/contact-sales": {
    title: "Contact Sales & Custom Plans | Zentilos",
    description:
      "Speak with our HR software specialists to discuss pricing, custom implementation, biometric turnstile integration and multi-branch rollouts.",
    ogType: "website",
  },

  // Routes with explicit robots: "noindex, follow" override
  "/thank-you": {
    title: "Thank You | Demo Request Confirmed | Zentilos",
    description:
      "Thank you for requesting a Zentilos demo. Our product specialist will contact you shortly to schedule your personalized walkthrough.",
    ogType: "website",
    robots: "noindex, follow",
  },
  "/support/search": {
    title: "Search Support Knowledge Base | Zentilos",
    description:
      "Search troubleshooting articles, setup instructions and how-to guides for Zentilos HRMS, payroll calculations and attendance devices.",
    ogType: "website",
    robots: "noindex, follow",
  },
  "/support/track": {
    title: "Track Support Ticket Status | Zentilos",
    description:
      "Check the current status, engineer notes and resolution progress for your open customer support ticket with the Zentilos support team.",
    ogType: "website",
    robots: "noindex, follow",
  },
  "/case-studies": {
    title: "Customer Stories & Case Studies | Zentilos",
    description:
      "Read how growing multi-branch businesses cut payroll processing time and automate attendance across locations with Zentilos.",
    ogType: "website",
    robots: "noindex, follow",
  },
};

/**
 * Route aliases mapping legacy or alternative paths to their canonical SEO configuration.
 */
export const ROUTE_ALIASES: Record<string, string> = {
  "/resources/case-studies": "/case-studies",
  "/solutions/finance": "/solutions/finance-teams",
  "/solutions/finance-team": "/solutions/finance-teams",
  "/solutions/hr": "/solutions/hr-teams",
  "/solutions/hr-team": "/solutions/hr-teams",
  "/resources/hrms-glossary": "/glossary",
  "/resources/glossary": "/glossary",
  "/resources/api-documentation": "/api-documentation",
  "/privacy": "/privacy-policy",
  "/employee-management": "/features/employee-management",
  "/solutions/employee-management": "/features/employee-management",
  "/features/recruitment-pipeline": "/features/recruitment",
  "/features/document-management": "/features/documents-compliance",
  "/features/performance": "/features/performance-management",
  "/features/roles": "/features/roles-permissions",
  "/features/reports": "/features/reports-analytics",
  "/solutions/industry": "/solutions/industries",
  "/industries": "/solutions/industries",
  "/solutions/small-business": "/solutions/small-businesses",
  "/solutions/mid-sized-business": "/solutions/mid-sized-businesses",
  "/solutions/mid-sized": "/solutions/mid-sized-businesses",
  "/solutions/mid-size": "/solutions/mid-sized-businesses",
  "/solutions/mid-market": "/solutions/mid-sized-businesses",
  "/solutions/enterprise": "/solutions/enterprises",
  "/solutions/large-enterprise": "/solutions/enterprises",
  "/resources/blog": "/blog",
  "/resources/faqs": "/faq",
  "/resources/guides": "/guides",
  "/help/getting-started": "/guides",
};

/**
 * Normalizes route path (removing trailing slash except for root).
 */
export function normalizeRoute(path: string): string {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "");
}

/**
 * Resolves SEO metadata for a given pathname.
 */
export function getSeoForRoute(pathname: string): SeoRouteMeta | undefined {
  const clean = normalizeRoute(pathname);
  if (APPROVED_SEO_ROUTES[clean]) {
    return APPROVED_SEO_ROUTES[clean];
  }
  const aliasTarget = ROUTE_ALIASES[clean];
  if (aliasTarget && APPROVED_SEO_ROUTES[aliasTarget]) {
    return APPROVED_SEO_ROUTES[aliasTarget];
  }
  return undefined;
}
