// ============================================================================
// LATTIUM HR - SUPPORT HUB & CUSTOMER SERVICE DATA CONFIG
// Central configuration for categories, SLAs, priorities, FAQs, and articles.
// ============================================================================

export interface SupportTopic {
  slug: string;
  title: string;
  name?: string;
  desc: string;
  icon: string;
  articleCount?: number;
}

export interface SupportArticle {
  slug: string;
  title: string;
  topicSlug: string;
  summary: string;
  readTime: string;
  popular?: boolean;
  steps: string[];
}

export interface SupportFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface PriorityOption {
  value: "Low" | "Medium" | "High" | "Critical";
  label: string;
  helperText: string;
  sla: string;
}

export interface ContactChannel {
  id: string;
  title: string;
  desc: string;
  note: string;
  icon: string;
  actionText: string;
  actionType: "scroll" | "chat" | "email" | "phone" | "booking";
  actionTarget: string;
  isPrimary?: boolean;
}

// ----------------------------------------------------------------------------
// 1. BRAND & CONTACT PLACEHOLDERS (Easily customizable)
// ----------------------------------------------------------------------------
export const SUPPORT_CONFIG = {
  brandName: "LattiumHR",
  supportEmail: "support@lattiumhr.com", // [support email]
  supportPhone: "+91 80001 23456", // [+91 XXXXX XXXXX]
  supportHours: "Mon–Sat, 9:00 AM – 7:00 PM IST", // [Mon–Sat, 9 am–7 pm IST]
  statusPageUrl: "https://status.lattiumhr.com", // [status page URL]
  bookingUrl: "https://calendly.com/lattiumhr/onboarding-consultation", // [booking link]
  trustBadges: ["ISO 27001", "SOC 2 Type II", "100% India Data Residency"], // [ISO 27001] [SOC 2] [Data residency]
};

// ----------------------------------------------------------------------------
// 2. SHARED ISSUE CATEGORIES (8 Modules + 2 Support Extras)
// ----------------------------------------------------------------------------
export const SUPPORT_MODULE_TOPICS: SupportTopic[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    desc: "Set up your company, import employees and invite your team.",
    icon: "setup",
    articleCount: 12,
  },
  {
    slug: "payroll-compliance",
    title: "Payroll & compliance",
    desc: "Salary runs, PF, ESI, TDS, professional tax and payslips.",
    icon: "payroll",
    articleCount: 28,
  },
  {
    slug: "attendance-leave",
    title: "Attendance & leave",
    desc: "Shifts, regularisation, leave policies and holiday calendars.",
    icon: "attendance",
    articleCount: 22,
  },
  {
    slug: "recruitment",
    title: "Recruitment",
    desc: "Job posts, candidate pipelines, offers and onboarding handoff.",
    icon: "briefcase",
    articleCount: 14,
  },
  {
    slug: "performance",
    title: "Performance",
    desc: "Goals, review cycles, appraisals and feedback.",
    icon: "award",
    articleCount: 11,
  },
  {
    slug: "integrations",
    title: "Integrations",
    desc: "Biometric devices, accounting tools, SSO and API access.",
    icon: "branch",
    articleCount: 19,
  },
  {
    slug: "billing-subscription",
    title: "Billing & subscription",
    desc: "Plans, invoices, GST details and adding employees.",
    icon: "wallet",
    articleCount: 8,
  },
  {
    slug: "security-privacy",
    title: "Security & privacy",
    desc: "Access control, data protection and audit trails.",
    icon: "shield",
    articleCount: 9,
  },
];

// 8 topics + 2 extra options for the ticket form
export const SUPPORT_ISSUE_CATEGORIES: string[] = [
  ...SUPPORT_MODULE_TOPICS.map((t) => t.title),
  "Account & login",
  "Something else",
];

// ----------------------------------------------------------------------------
// 3. TICKET PRIORITIES & SLA CONFIGURATION
// ----------------------------------------------------------------------------
export const TICKET_PRIORITIES: PriorityOption[] = [
  {
    value: "Low",
    label: "Low",
    helperText: "Feature request or general query",
    sla: "2 business days",
  },
  {
    value: "Medium",
    label: "Medium",
    helperText: "How-to or configuration question",
    sla: "1 business day",
  },
  {
    value: "High",
    label: "High",
    helperText: "Feature broken or report error",
    sla: "4 hours",
  },
  {
    value: "Critical",
    label: "Critical",
    helperText: "Payroll blocked or login down",
    sla: "1 to 2 hours",
  },
];

// First response times table lookup
export const SLA_RESPONSE_TIMES = {
  Critical: "1 to 2 hours",
  High: "4 hours",
  Medium: "1 business day",
  Low: "2 business days",
};

// ----------------------------------------------------------------------------
// 4. POPULAR SEARCH CHIPS
// ----------------------------------------------------------------------------
export const POPULAR_SEARCH_CHIPS: string[] = [
  "Reset password",
  "Run payroll",
  "PF / ESI setup",
  "Biometric sync",
];

// ----------------------------------------------------------------------------
// 5. ROLE AUDIENCE CARDS ("I am a…")
// ----------------------------------------------------------------------------
export interface RoleCard {
  id: string;
  role: string;
  heading: string;
  desc: string;
  actionText: string;
  actionTo: string;
  isPrimary?: boolean;
  icon: string;
}

export const SUPPORT_ROLE_CARDS: RoleCard[] = [
  {
    id: "prospect",
    role: "Exploring HRMS",
    heading: "Evaluating for your team?",
    desc: "Questions on pricing, security or fit for your team? Talk to sales or see a live demo.",
    actionText: "Talk to sales",
    actionTo: "/contact-sales",
    icon: "chart",
  },
  {
    id: "customer-admin",
    role: "Existing customer",
    heading: "Admin or Payroll Manager",
    desc: "Something broken or unclear? Raise a ticket, track an open one, or browse the guides.",
    actionText: "Raise or track a ticket",
    actionTo: "#ticket",
    isPrimary: true,
    icon: "shield",
  },
  {
    id: "employee",
    role: "Employee of a customer",
    heading: "Employee or Team Member",
    desc: "Payslips, leave or login issues? Your company's HR admin can help fastest.",
    actionText: "Contact your HR admin",
    actionTo: "/support/employee-help",
    icon: "users",
  },
];

// ----------------------------------------------------------------------------
// 6. QUICK ANSWERS (FAQ ACCORDION)
// ----------------------------------------------------------------------------
export const SUPPORT_FAQS: SupportFAQ[] = [
  {
    id: "reset-admin-password",
    question: "How do I reset my admin password?",
    answer:
      'Use "Forgot password" on the login page with your registered email. If you no longer have access to that email, raise a ticket with your company name and customer ID and we will verify you before resetting.',
  },
  {
    id: "payroll-not-processing",
    question: "Why is my payroll not processing?",
    answer:
      "Check that attendance is locked for the month, salary structures are assigned to every employee, and no one has missing bank details. If the run still fails, raise a Critical ticket so the payroll team can look at it right away.",
  },
  {
    id: "setup-pf-esi",
    question: "How do I set up PF and ESI?",
    answer:
      "Add your establishment codes and contribution rates under statutory settings, then map them to the salary components. The setup guide walks through each step.",
  },
  {
    id: "biometric-not-syncing",
    question: "My biometric device is not syncing attendance.",
    answer:
      "Confirm the device is online and its clock matches server time, then check the integration for its last sync status. If punches are still missing, raise a ticket and include the device model.",
  },
  {
    id: "employee-direct-contact",
    question: "Can employees contact support directly?",
    answer:
      "Employees should reach their own HR admin first, since admins can see company-specific settings. Admins can escalate anything unresolved to us with a ticket.",
  },
  {
    id: "upgrade-plan-headcount",
    question: "How do I upgrade my plan or add employees?",
    answer:
      "The account owner can change the plan or headcount from the billing section. For custom plans or mid-cycle changes, raise a billing ticket or contact your account manager.",
  },
  {
    id: "invoices-gst-details",
    question: "Where can I find invoices and GST details?",
    answer:
      "Account owners can download invoices from the billing section. To correct GST details, raise a billing ticket with your GSTIN.",
  },
];

// ----------------------------------------------------------------------------
// 7. CONTACT OPTIONS ("Talk to a person")
// ----------------------------------------------------------------------------
export const SUPPORT_CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "ticket",
    title: "Raise a ticket",
    desc: "Best for payroll, compliance and technical issues.",
    note: "Priority-based response",
    icon: "file-text",
    actionText: "Open ticket form",
    actionType: "scroll",
    actionTarget: "#ticket",
    isPrimary: true,
  },
  {
    id: "chat",
    title: "Live chat",
    desc: "Chat with the team during business hours. Offline? We turn it into a ticket.",
    note: "Replies in minutes when online",
    icon: "help-circle",
    actionText: "Start a conversation",
    actionType: "chat",
    actionTarget: "#chat",
  },
  {
    id: "email",
    title: "Email",
    desc: SUPPORT_CONFIG.supportEmail,
    note: "Reply within 1 business day",
    icon: "mail",
    actionText: "Send email",
    actionType: "email",
    actionTarget: `mailto:${SUPPORT_CONFIG.supportEmail}`,
  },
  {
    id: "phone",
    title: "Phone support",
    desc: SUPPORT_CONFIG.supportPhone,
    note: `Mon–Sat, 9 am–7 pm IST`,
    icon: "phone",
    actionText: "Call support desk",
    actionType: "phone",
    actionTarget: `tel:${SUPPORT_CONFIG.supportPhone.replace(/\s+/g, "")}`,
  },
  {
    id: "book-call",
    title: "Book a call",
    desc: "Onboarding and implementation help with a specialist.",
    note: "Pick a slot that suits you",
    icon: "calendar",
    actionText: "Schedule 1-on-1 slot",
    actionType: "booking",
    actionTarget: SUPPORT_CONFIG.bookingUrl,
  },
];

// ----------------------------------------------------------------------------
// 8. RESOURCES CARDS ("Learn at your own pace")
// ----------------------------------------------------------------------------
export const SUPPORT_SELF_LEARNING_RESOURCES = [
  {
    title: "User guides",
    desc: "Step-by-step help for every module and operational feature.",
    href: "/guides",
    icon: "book-open",
    badge: "15+ Guides",
  },
  {
    title: "Video tutorials",
    desc: "Short walkthroughs for salary runs, regularisation and setup.",
    href: "/guides",
    icon: "help-circle",
    badge: "Watch on-demand",
  },
  {
    title: "API documentation",
    desc: "Endpoints, webhook events and payload examples for developers.",
    href: "/guides/api-reference",
    icon: "branch",
    badge: "v2.4 Ready",
  },
  {
    title: "Release notes & webinars",
    desc: "See what's new in statutory changes, product updates and watch past recordings.",
    href: "/blog",
    icon: "sparkle",
    badge: "Monthly recap",
  },
];

// ----------------------------------------------------------------------------
// 9. ARTICLES DATABASE FOR AUTO-COMPLETE & SEARCH
// ----------------------------------------------------------------------------
export const SUPPORT_ARTICLES_DATABASE: SupportArticle[] = [
  {
    slug: "how-to-reset-admin-password",
    title: "How to reset your administrator password",
    topicSlug: "getting-started",
    summary: "Steps to recover access via email or customer ID verification when locked out.",
    readTime: "2 min read",
    popular: true,
    steps: [
      "Navigate to the LattiumHR admin login screen at app.lattiumhr.com.",
      "Click the 'Forgot Password' link below the password input field.",
      "Enter your registered corporate work email address.",
      "Check your inbox for a secure one-time reset link valid for 15 minutes.",
      "Create a strong password with at least 8 characters, a number, and a symbol.",
    ],
  },
  {
    slug: "troubleshooting-unprocessed-payroll",
    title: "Troubleshooting unprocessed or failing payroll runs",
    topicSlug: "payroll-compliance",
    summary: "Diagnose blocked pay runs, missing CTC formulas, and pending attendance locks.",
    readTime: "4 min read",
    popular: true,
    steps: [
      "Verify that monthly attendance is fully approved and locked for the pay period.",
      "Ensure all active employees have a validated CTC structure assigned.",
      "Check for employees flagged with missing PAN, bank account number, or IFSC.",
      "Review the automated tax preview error log for statutory capping warnings.",
      "Re-trigger the payroll computation engine or raise a Critical ticket if payroll is due today.",
    ],
  },
  {
    slug: "statutory-pf-and-esi-setup-guide",
    title: "Configuring statutory PF, ESI and Professional Tax",
    topicSlug: "payroll-compliance",
    summary: "Step-by-step mapping of establishment codes, wage ceilings, and employee portions.",
    readTime: "5 min read",
    popular: true,
    steps: [
      "Open Settings > Statutory Compliance in the left sidebar.",
      "Enter your Provident Fund establishment code and choose 12% standard or capped wage limit.",
      "Enter your ESI sub-code and verify the gross wage eligibility threshold (₹21,000).",
      "Map state-specific Professional Tax (PT) slab rules based on employee work location branches.",
      "Save settings and run a dry-run salary simulation to verify deduction accuracy.",
    ],
  },
  {
    slug: "biometric-device-sync-troubleshooting",
    title: "Troubleshooting biometric machine punch sync and API errors",
    topicSlug: "integrations",
    summary: "Ensure attendance machine connectivity, NTP server sync, and live push tokens.",
    readTime: "3 min read",
    popular: true,
    steps: [
      "Confirm the physical biometric device is connected to LAN/Wi-Fi and pingable.",
      "Check that the device time is synchronized with the LattiumHR Cloud NTP server.",
      "Open Integrations > Hardware Devices and check the 'Last Heartbeat' timestamp.",
      "Ensure employee biometric enrolled IDs match their employee ID in the system.",
      "Trigger manual synchronization or restart the local Lattium Biometric Agent service.",
    ],
  },
  {
    slug: "employee-login-and-payslip-access",
    title: "Employee portal setup and payslip download guide",
    topicSlug: "getting-started",
    summary: "How employees log in, download Form 16, request leaves, and punch attendance.",
    readTime: "2 min read",
    steps: [
      "Employees receive an automated welcome email with a one-time activation link.",
      "Download the LattiumHR Mobile App on Android or iOS.",
      "Log in with corporate SSO or work email credentials.",
      "Navigate to 'My Payslips' to view monthly salary slips with password encryption.",
    ],
  },
  {
    slug: "upgrading-plan-and-adding-headcount",
    title: "Managing billing, plan upgrades, and headcount licenses",
    topicSlug: "billing-subscription",
    summary: "Change tiers, buy add-on modules, and update payment methods instantly.",
    readTime: "3 min read",
    steps: [
      "Go to Settings > Subscription & Billing (Account Owner access only).",
      "Click 'Modify Plan' to upgrade tiers or increase active employee seat licenses.",
      "Review pro-rata billing adjustments for the current calendar month.",
      "Confirm payment via Net Banking, Corporate Card, or UPI invoice.",
    ],
  },
  {
    slug: "downloading-invoices-and-updating-gstin",
    title: "Accessing invoices, TDS certificates, and updating GSTIN",
    topicSlug: "billing-subscription",
    summary: "Tax-compliant invoice history, B2B GST credits, and billing contact management.",
    readTime: "2 min read",
    steps: [
      "Open Subscription & Billing > Invoices tab.",
      "Download GST-compliant PDF tax invoices with your company GSTIN.",
      "To update company billing address or GSTIN, submit a billing request ticket.",
    ],
  },
  {
    slug: "setting-up-role-based-access-control",
    title: "Configuring Role-Based Access Control (RBAC) and admin rights",
    topicSlug: "security-privacy",
    summary: "Set branch admin, HR manager, finance viewer, and department manager privileges.",
    readTime: "4 min read",
    steps: [
      "Go to Settings > Roles & Permissions.",
      "Create a custom role or clone existing templates (e.g. Branch HR Manager).",
      "Enable or restrict access to salary visibility, attendance editing, and report downloads.",
      "Assign roles to designated administrators.",
    ],
  },
];

// ----------------------------------------------------------------------------
// 10. ANALYTICS EVENT TRACKING HELPER
// ----------------------------------------------------------------------------
export type SupportAnalyticsEvent =
  | "search_performed"
  | "search_no_results"
  | "faq_opened"
  | "article_helpful_yes"
  | "article_helpful_no"
  | "contact_channel_clicked"
  | "ticket_submitted";

export function trackSupportEvent(
  event: SupportAnalyticsEvent,
  data?: Record<string, unknown>
) {
  try {
    // Dispatch custom DOM event for any parent analytics listeners
    const customEvent = new CustomEvent("support_analytics", {
      detail: { event, data, timestamp: new Date().toISOString() },
    });
    window.dispatchEvent(customEvent);

    // Push to dataLayer if Google Tag Manager or similar is loaded
    if (typeof window !== "undefined" && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event,
        ...data,
      });
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[Support Analytics] ${event}:`, data);
    }
  } catch (err) {
    console.warn("Analytics error:", err);
  }
}

// ----------------------------------------------------------------------------
// Convenience Aliases for cross-component consistency
// ----------------------------------------------------------------------------
export const SUPPORT_CONTACT_CONFIG = SUPPORT_CONFIG;
export const SUPPORT_TOPICS = SUPPORT_MODULE_TOPICS.map((t) => ({ ...t, name: t.title }));
export const SUPPORT_SLAS = SLA_RESPONSE_TIMES;
export const SUPPORT_ARTICLES = SUPPORT_ARTICLES_DATABASE;


