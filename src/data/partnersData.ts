import { IconName } from "@/components/ui/Icon";

export interface PartnerBenefit {
  id: string;
  icon: IconName;
  title: string;
  label: string;
  description: string;
}

export type PartnerCategory = "reseller" | "referral" | "technology";

export interface PartnerType {
  id: PartnerCategory;
  title: string;
  tagline: string;
  description: string;
  imagePlaceholder: string;
  badge: string;
  whoCanJoin: string[];
  buttonLabel: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  badge: string;
}

export interface HowItWorksStep {
  step: string;
  number: string;
  title: string;
  description: string;
  highlight: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  type: "reseller" | "technology";
  websiteUrl?: string;
  categoryLabel: string;
  accentColor: string;
  initials: string;
}

export interface PartnerFaqItem {
  id: string;
  question: string;
  answer: string;
}

/* ==========================================================================
   1. WHY PARTNER WITH US — 6 BENEFITS
   ========================================================================== */
export const PARTNER_BENEFITS: PartnerBenefit[] = [
  {
    id: "benefit-markets",
    icon: "globe",
    title: "Enter New Markets",
    label: "Market Expansion",
    description: "Expand into high-growth SME and mid-market territories with an enterprise-ready HRMS portfolio.",
  },
  {
    id: "benefit-revenue",
    icon: "wallet",
    title: "Recurring Revenue",
    label: "Predictable Margin",
    description: "Earn industry-leading subscription revenue share and recurring annual renewal commissions.",
  },
  {
    id: "benefit-customers",
    icon: "users",
    title: "Acquire New Customers",
    label: "Client Acquisition",
    description: "Win high-retention corporate clients looking to modernize payroll, attendance, and compliance.",
  },
  {
    id: "benefit-training",
    icon: "book-open",
    title: "Training and Support",
    label: "Continuous Enablement",
    description: "Get certified with comprehensive product walkthroughs, sales playbooks, and dedicated solutions architects.",
  },
  {
    id: "benefit-cobranding",
    icon: "sparkle",
    title: "Co-Branding",
    label: "Joint Marketing",
    description: "Gain access to white-label marketing assets, joint webinars, co-branded collateral, and event sponsorships.",
  },
  {
    id: "benefit-growth",
    icon: "chart",
    title: "Grow Together",
    label: "Scalable Alliance",
    description: "Collaborate directly on roadmap features, beta testing, and strategic regional expansion initiatives.",
  },
];

/* ==========================================================================
   2. FIND THE RIGHT FIT — 3 PARTNER CARDS
   ========================================================================== */
export const PARTNER_TYPES: PartnerType[] = [
  {
    id: "reseller",
    title: "Reseller Partners",
    tagline: "Full-Cycle Commercial Distribution",
    description: "Package, distribute, and implement LattiumHR as an authorized regional or national solution partner.",
    imagePlaceholder: "/images/work-process-team.jpg",
    badge: "Most Popular",
    whoCanJoin: [
      "IT solution providers and systems integrators",
      "Enterprise software value-added resellers (VARs)",
      "HR tech distributors with local sales presence",
    ],
    buttonLabel: "Join as Reseller Partner",
  },
  {
    id: "referral",
    title: "Referral Partners",
    tagline: "Zero Implementation Overhead",
    description: "Introduce qualified prospects and clients to LattiumHR and earn generous referral bonuses on every closed account.",
    imagePlaceholder: "/images/solutions-consultation-cta.jpg",
    badge: "Quick Start",
    whoCanJoin: [
      "Chartered accountants & corporate tax consultants",
      "Independent HR consultants & workforce advisors",
      "Business advisory firms & startup accelerators",
    ],
    buttonLabel: "Join as Referral Partner",
  },
  {
    id: "technology",
    title: "Technology Partners",
    tagline: "Bi-Directional API Integrations",
    description: "Build seamless data connectors between LattiumHR and your biometric hardware, ERP, accounting, or banking system.",
    imagePlaceholder: "/images/industry-tech.jpg",
    badge: "Ecosystem Integration",
    whoCanJoin: [
      "Biometric attendance & access control manufacturers",
      "Accounting & enterprise ERP platforms",
      "Fintech, digital payroll & corporate benefits providers",
    ],
    buttonLabel: "Join as Technology Partner",
  },
];

/* ==========================================================================
   3. WHAT YOU GET — 6 CHECKLIST CARDS
   ========================================================================== */
export const PARTNER_CHECKLIST: ChecklistItem[] = [
  {
    id: "item-welcome-kit",
    icon: "award",
    title: "Welcome Kit",
    badge: "Day 1 Access",
    description: "Comprehensive partner credentials, digital certification badge, brand assets, and quick-start directory.",
  },
  {
    id: "item-training",
    icon: "briefcase",
    title: "Product and Sales Training",
    badge: "Certifications",
    description: "Self-paced modules, interactive demonstration simulations, objection-handling scripts, and pitch kits.",
  },
  {
    id: "item-lead-support",
    icon: "users",
    title: "Lead Support",
    badge: "Pipeline Boost",
    description: "Geographic lead distribution, co-selling opportunities, and deal registration with conflict protection.",
  },
  {
    id: "item-demo-support",
    icon: "shield",
    title: "Demo Support",
    badge: "Presales Help",
    description: "Unlimited sandbox tenant accounts pre-loaded with sample multi-branch employee and payroll data.",
  },
  {
    id: "item-marketing-material",
    icon: "file-text",
    title: "Marketing Material",
    badge: "Ready-to-Use",
    description: "Customizable brochures, client case studies, comparison decks, email templates, and landing page kits.",
  },
  {
    id: "item-partner-manager",
    icon: "phone",
    title: "Dedicated Partner Manager",
    badge: "Direct Contact",
    description: "A single named point of contact for escalations, commercial negotiations, and business growth planning.",
  },
];

/* ==========================================================================
   4. HOW IT WORKS — 4 NUMBERED STEPS
   ========================================================================== */
export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: "Step 01",
    number: "01",
    title: "Apply",
    description: "Submit your partnership enquiry in under 2 minutes detailing your business profile, target region, and alliance goals.",
    highlight: "2-minute quick application",
  },
  {
    step: "Step 02",
    number: "02",
    title: "Review & Onboarding",
    description: "Our alliance team reviews your profile within 48 hours to align mutual capabilities, tier classification, and contract terms.",
    highlight: "Fast 48-hour evaluation",
  },
  {
    step: "Step 03",
    number: "03",
    title: "Training & Enablement",
    description: "Complete your tailored onboarding track, obtain sales accreditation, and configure your complimentary sandbox workspace.",
    highlight: "Free sandbox & certifications",
  },
  {
    step: "Step 04",
    number: "04",
    title: "Start Selling",
    description: "Register deals, leverage dedicated presales engineers, and begin earning healthy recurring margins or referral commissions.",
    highlight: "Deal registration & commissions",
  },
];

/* ==========================================================================
   5. OUR PARTNERS (SOCIAL PROOF) — 12 GENERIC PLACEHOLDER PARTNERS
   6 Reseller Partners + 6 Technology Partners
   ========================================================================== */
export const PARTNER_LOGOS: PartnerLogo[] = [
  // Reseller Partners
  {
    id: "reseller-1",
    name: "ApexCloud Systems",
    type: "reseller",
    websiteUrl: "https://example.com/partners/apexcloud",
    categoryLabel: "National IT Integrator",
    accentColor: "#802B5B",
    initials: "AC",
  },
  {
    id: "reseller-2",
    name: "Vanguard HR Advisory",
    type: "reseller",
    websiteUrl: "https://example.com/partners/vanguard",
    categoryLabel: "Corporate HR Advisory",
    accentColor: "#1d4ed8",
    initials: "VH",
  },
  {
    id: "reseller-3",
    name: "Crestview Consulting",
    type: "reseller",
    websiteUrl: "https://example.com/partners/crestview",
    categoryLabel: "Workforce Management VAR",
    accentColor: "#059669",
    initials: "CC",
  },
  {
    id: "reseller-4",
    name: "Synapse IT Solutions",
    type: "reseller",
    websiteUrl: "https://example.com/partners/synapse",
    categoryLabel: "Cloud Infrastructure Partner",
    accentColor: "#d97706",
    initials: "SI",
  },
  {
    id: "reseller-5",
    name: "Beacon Enterprise Partners",
    type: "reseller",
    websiteUrl: "https://example.com/partners/beacon",
    categoryLabel: "SME Software Distributor",
    accentColor: "#7c3aed",
    initials: "BE",
  },
  {
    id: "reseller-6",
    name: "OmniBridge Global",
    type: "reseller",
    websiteUrl: "https://example.com/partners/omnibridge",
    categoryLabel: "Regional Solutions Provider",
    accentColor: "#0284c7",
    initials: "OG",
  },

  // Technology Partners
  {
    id: "tech-1",
    name: "BioSync Turnstiles",
    type: "technology",
    websiteUrl: "https://example.com/partners/biosync",
    categoryLabel: "Biometric Hardware OEM",
    accentColor: "#dc2626",
    initials: "BT",
  },
  {
    id: "tech-2",
    name: "LedgerFlow ERP",
    type: "technology",
    websiteUrl: "https://example.com/partners/ledgerflow",
    categoryLabel: "Enterprise Finance & GL",
    accentColor: "#0891b2",
    initials: "LF",
  },
  {
    id: "tech-3",
    name: "SecurePass IAM",
    type: "technology",
    websiteUrl: "https://example.com/partners/securepass",
    categoryLabel: "Single Sign-On & Identity",
    accentColor: "#16a34a",
    initials: "SP",
  },
  {
    id: "tech-4",
    name: "FinPulse Banking",
    type: "technology",
    websiteUrl: "https://example.com/partners/finpulse",
    categoryLabel: "Disbursement Gateway",
    accentColor: "#9333ea",
    initials: "FP",
  },
  {
    id: "tech-5",
    name: "CloudRoster AI",
    type: "technology",
    websiteUrl: "https://example.com/partners/cloudroster",
    categoryLabel: "Shift Scheduling Engine",
    accentColor: "#ea580c",
    initials: "CR",
  },
  {
    id: "tech-6",
    name: "DataVault Compliance",
    type: "technology",
    websiteUrl: "https://example.com/partners/datavault",
    categoryLabel: "Statutory Tax Vault",
    accentColor: "#4f46e5",
    initials: "DV",
  },
];

/* ==========================================================================
   6. FAQ ACCORDION DATA — 6 QUESTIONS
   ========================================================================== */
export const PARTNER_FAQS: PartnerFaqItem[] = [
  {
    id: "faq-who-can-join",
    question: "Who can join the LattiumHR Partner Programme?",
    answer: "Our programme is designed for IT solution providers, system integrators, chartered accountants, HR & payroll consultancies, independent business software resellers, and technology vendors offering biometric hardware, ERP, or fintech integrations.",
  },
  {
    id: "faq-cost",
    question: "What is the cost to join as a partner?",
    answer: "There are zero sign-up fees or mandatory upfront commitments to join the LattiumHR Partner Programme. We provide partner onboarding, sales collateral, training modules, and sandbox access completely free of charge.",
  },
  {
    id: "faq-commission",
    question: "How does the partner commission and revenue share work?",
    answer: "Referral partners earn an attractive one-time percentage bonus on the initial contract value of closed referrals. Reseller partners enjoy recurring annual subscription margins for as long as their clients remain active on LattiumHR.",
  },
  {
    id: "faq-training",
    question: "What training and enablement support is provided?",
    answer: "Partners receive role-based training covering product demonstration techniques, statutory compliance rules, attendance hardware setups, and objection handling. You will also receive unlimited access to sandbox demo accounts.",
  },
  {
    id: "faq-onboarding-time",
    question: "How long does partner onboarding take?",
    answer: "Our streamlined evaluation takes less than 48 hours from application submission. Once approved, the foundational enablement track and sandbox provisioning are completed within 3 to 5 business days.",
  },
  {
    id: "faq-support-available",
    question: "What ongoing support is available to active partners?",
    answer: "Every certified partner is paired with a dedicated Partner Success Manager who assists with deal registration, RFP responses, joint customer demos, and priority technical escalations directly with our engineering team.",
  },
];

