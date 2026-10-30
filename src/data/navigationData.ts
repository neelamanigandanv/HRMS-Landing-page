import { IconName } from "../components/ui/Icon";

export interface NavLinkItem {
  title: string;
  href: string;
  desc?: string;
  icon?: IconName;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavLinkItem[];
}

export const productNavItems: NavLinkItem[] = [
  // {
  //   title: "Product Overview",
  //   href: "/product",
  //   desc: "All-in-one HRMS architecture built for modern multi-branch teams",
  //   icon: "sparkle",
  //   badge: "Unified",
  // },
  {
    title: "Employee Management",
    href: "/features/employee-management",
    desc: "Single source of truth for records, org charts, and self-service",
    icon: "employee",
  },
  {
    title: "Attendance Management",
    href: "/features/attendance-management",
    desc: "Geofenced mobile check-ins, biometric sync, and shifts",
    icon: "attendance",
  },
  {
    title: "Leave Management",
    href: "/features/leave-management",
    desc: "Automated leave balances, multi-tier approvals, and holiday calendars",
    icon: "leave",
  },
  {
    title: "Payroll Management",
    href: "/features/payroll-management",
    desc: "Automated salary processing with full statutory compliance",
    icon: "payroll",
    badge: "Compliant",
  },
  {
    title: "Asset Management",
    href: "/features/asset-management",
    desc: "Equipment assignment, serial tracking, and digital handover slips",
    icon: "asset",
  },
  {
    title: "Recruitment",
    href: "/features/recruitment",
    desc: "Candidate pipeline tracking, interview scorecards, and offer letters",
    icon: "role",
  },
  {
    title: "Performance Management",
    href: "/features/performance-management",
    desc: "Quarterly OKRs, 360° peer feedback, and appraisal rating matrices",
    icon: "setup",
  },
  {
    title: "Documents & Compliance",
    href: "/features/documents-compliance",
    desc: "Secure document vault with expiry alerts and digital acknowledgments",
    icon: "document",
  },
  {
    title: "Reports & Analytics",
    href: "/features/reports-analytics",
    desc: "Decision-ready headcount, attrition trends, and salary cost insights",
    icon: "reports",
  },
  {
    title: "Roles & Permissions",
    href: "/features/roles-permissions",
    desc: "Granular role-based access controls by department, branch, or level",
    icon: "shield",
  },
];

export const solutionsNavItems: NavLinkItem[] = [
  // {
  //   title: "Solutions Overview",
  //   href: "/solutions",
  //   desc: "Explore how LattiumHR adapts to your team size, role, and industry",
  //   icon: "branch",
  // },
  {
    title: "Mid-Sized Businesses (50–500)",
    href: "/solutions/mid-sized-businesses",
    desc: "Automate approvals, enforce branch policies, and control payroll",
    icon: "chart",
  },
  {
    title: "Enterprises (500+)",
    href: "/solutions/enterprises",
    desc: "Enterprise governance, audit logs, custom integrations, and SLA",
    icon: "building",
  },
  {
    title: "Small Businesses (1–50)",
    href: "/solutions/small-businesses",
    desc: "Move off spreadsheets with quick 2-week launch and zero overhead",
    icon: "zap",
  },
  {
    title: "For HR Teams",
    href: "/solutions/hr-teams",
    desc: "Eliminate repetitive paperwork, manual leave tracking, and inquiries",
    icon: "users",
  },
  {
    title: "For Finance Teams",
    href: "/solutions/finance-teams",
    desc: "Accurate payroll calculations, statutory reports, and audit trails",
    icon: "finance",
  },
  // {
  //   title: "Multi-Location Businesses",
  //   href: "/solutions/multi-location",
  //   desc: "Branch-specific rules with unified central headquarters visibility",
  //   icon: "globe",
  //   badge: "Core Strength",
  // },
  {
    title: "Industry Solutions",
    href: "/solutions/industries",
    desc: "Tailored workflows for Tech, Retail, Manufacturing, and Services",
    icon: "briefcase",
  },
];

export const resourcesNavItems: NavLinkItem[] = [
  // {
  //   title: "Resources Overview",
  //   href: "/resources",
  //   desc: "Guides, tools, glossary terms, and support to elevate your HR operations",
  //   icon: "book-open",
  // },
  {
    title: "Blog",
    href: "/blog",
    desc: "Best practices on payroll compliance, attendance, and workforce retention",
    icon: "file-text",
  },
  {
    title: "HRMS Glossary",
    href: "/resources/hrms-glossary",
    desc: "Clear definitions for 50+ payroll, HRMS, and statutory compliance terms",
    icon: "search",
  },
  {
    title: "FAQs",
    href: "/faq",
    desc: "Answers to common questions about setup, branches, security, and mobile",
    icon: "help-circle",
  },
  {
    title: "Help Center",
    href: "/help",
    desc: "Searchable documentation, feature walkthroughs, and troubleshooting guides",
    icon: "help-circle",
  },
  {
    title: "Guides & Toolkits",
    href: "/guides",
    desc: "Comprehensive playbooks on payroll, HRMS, leave, and statutory compliance",
    icon: "book-open",
    badge: "Guides",
  },
  {
    title: "Customer Support",
    href: "/support",
    desc: "Dedicated support specialists, SLA commitments, and response times",
    icon: "phone",
  },
  {
    title: "API Documentation",
    href: "/resources/api-documentation",
    desc: "Developer REST endpoints, authentication flows, payloads, and code examples",
    icon: "file-text",
  },
  // {
  //   title: "Case Studies",
  //   href: "/resources/case-studies",
  //   desc: "Real transformation stories from 500+ multi-branch businesses",
  //   icon: "award",
  // },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Product Overview", href: "/product" },
      { label: "Employee Management", href: "/features/employee-management" },
      { label: "Attendance Management", href: "/features/attendance-management" },
      { label: "Leave Management", href: "/features/leave-management" },
      { label: "Payroll Management", href: "/features/payroll-management" },
      { label: "Asset Management", href: "/features/asset-management" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Solutions Overview", href: "/solutions" },
      { label: "Mid-Sized Businesses", href: "/solutions/mid-sized-businesses" },
      { label: "Enterprises", href: "/solutions/enterprises" },
      { label: "Small Businesses", href: "/solutions/small-businesses" },
      { label: "HR Teams", href: "/solutions/hr-teams" },
      { label: "Finance Teams", href: "/solutions/finance-teams" },
      { label: "Industry Solutions", href: "/solutions/industries" },
    ],
  },
  {
    title: "Resources & Support",
    links: [
      { label: "Help Center", href: "/support/help-center" },
      { label: "HRMS Glossary", href: "/resources/hrms-glossary" },
      { label: "Guides & Playbooks", href: "/guides" },
      { label: "API Documentation", href: "/resources/api-documentation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Security", href: "/security" },
      { label: "Partners", href: "/partners" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Data Processing Agreement", href: "/data-processing-agreement" },
      { label: "HTML Sitemap", href: "/sitemap" },
    ],
  },
];

