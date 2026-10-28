export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  bullets?: string[];
  learnMore?: {
    label: string;
    href: string;
  };
  category: string;
  popular?: boolean;
}

export interface FAQCategory {
  id: string;
  name: string;
  eyebrow?: string;
  icon: string;
  desc: string;
  items: FAQItem[];
}

export const popularFaqChips = [
  { question: "How much does it cost?", id: "how-much-does-it-cost" },
  { question: "Is my data secure?", id: "is-my-data-secure" },
  { question: "How long does setup take?", id: "how-long-does-setup-take" },
  { question: "Does it handle PF, ESI & TDS?", id: "pf-esi-compliance" },
  { question: "Can I see a demo before buying?", id: "can-i-see-a-demo" },
];

export const faqCategories: FAQCategory[] = [
  {
    id: "general",
    name: "General",
    eyebrow: "OVERVIEW & ESSENTIALS",
    icon: "help-circle",
    desc: "Overview of LattiumHR platform, target audience, trials, and live product demos.",
    items: [
      {
        id: "what-is-lattiumhr",
        category: "General",
        popular: true,
        question: "What is LattiumHR?",
        answer:
          "LattiumHR is a modern, enterprise-grade Human Resource Management System (HRMS) built for fast-growing businesses and multi-branch organizations. It unifies attendance, statutory payroll, employee databases, leave management, and role-based workflows into a single intuitive cloud platform.",
        bullets: [
          "Centralized employee directory and digital document storage",
          "Real-time biometric turnstile and mobile GPS geofenced attendance",
          "1-click statutory payroll processing with automated tax filings",
        ],
        learnMore: {
          label: "Explore Platform Overview",
          href: "/product",
        },
      },
      {
        id: "who-is-it-built-for",
        category: "General",
        question: "Who is it built for (company size and industries)?",
        answer:
          "LattiumHR is built to support organizations ranging from 15 to 10,000+ employees across retail chains, healthcare providers, manufacturing plants, technology startups, and professional financial services. Whether you operate from a single office or 50+ distributed branches, LattiumHR adapts to your operational scale.",
        bullets: [
          "Standard: 15–100 employees needing streamlined HR foundation",
          "Professional: 100–500 employees requiring automated shifts and performance",
          "Enterprise: 500+ employees managing multi-entity and multi-branch governance",
        ],
        learnMore: {
          label: "View Solutions by Business Size",
          href: "/solutions",
        },
      },
      {
        id: "is-there-a-free-trial",
        category: "General",
        question: "Is there a free trial?",
        answer:
          "Yes. We offer a [14-day fully featured free trial] that allows your HR and leadership team to explore real workflows, configure shift rosters, and review analytics dashboards with zero credit card required.",
        learnMore: {
          label: "Request a Trial Walkthrough",
          href: "/request-demo",
        },
      },
      {
        id: "can-i-see-a-demo",
        category: "General",
        popular: true,
        question: "Can I see a demo before buying?",
        answer:
          "Yes. Our solution architects host personalized 30-minute walkthroughs tailored specifically to your branch structure, employee headcount, and statutory requirements. We simulate your exact company setup so you can see how LattiumHR works before making any commitments.",
        learnMore: {
          label: "Book a Free 30-Min Demo",
          href: "/request-demo",
        },
      },
    ],
  },
  {
    id: "pricing-and-plans",
    name: "Pricing & Plans",
    eyebrow: "SUBSCRIPTION & TIERS",
    icon: "chart",
    desc: "Transparent per-employee subscription rates, tier inclusions, and billing flexibility.",
    items: [
      {
        id: "how-much-does-it-cost",
        category: "Pricing & Plans",
        popular: true,
        question: "How much does it cost?",
        answer:
          "Pricing is structured transparently on a per employee per month (PEPM) model based on the tier you choose (Standard, Professional, or Enterprise). You only pay for active employees on your roster each month [add your detail].",
        bullets: [
          "Predictable per-employee monthly or annual billing options",
          "Volume discounts available for enterprises with over 250+ employees",
          "All software upgrades, statutory rule revisions, and cloud backups included",
        ],
        learnMore: {
          label: "Explore Tier Capabilities",
          href: "/solutions",
        },
      },
      {
        id: "minimum-employees-required",
        category: "Pricing & Plans",
        question: "Is there a minimum number of employees?",
        answer:
          "Our Standard tier requires a minimum of [15 employees], making it affordable for emerging startups and small businesses. There is no upper limit on employee headcount or branch count on any tier.",
      },
      {
        id: "setup-or-hidden-charges",
        category: "Pricing & Plans",
        question: "Are there setup or hidden charges?",
        answer:
          "There are no hidden fees. Pricing is completely transparent. Onboarding, legacy data migration, and custom hardware biometric integration are scoped upfront with clear deliverables during your initial consultation [add your detail].",
      },
      {
        id: "change-plan-later",
        category: "Pricing & Plans",
        question: "Can I change my plan later?",
        answer:
          "Yes. You can upgrade, downgrade, or add modular features at any time as your organization scales. Upgrades take effect immediately, and any billing differences are prorated automatically on your next invoice.",
      },
    ],
  },
  {
    id: "payroll-and-compliance",
    name: "Payroll & Compliance",
    eyebrow: "STATUTORY TAXES & RULES",
    icon: "payroll",
    desc: "Provident fund, ESI, TDS tax deductions, payslip dispatch, and multi-entity payroll.",
    items: [
      {
        id: "pf-esi-compliance",
        category: "Payroll & Compliance",
        popular: true,
        question: "Does it handle PF, ESI, PT, TDS and LWF?",
        answer:
          "Yes. LattiumHR provides 100% automated calculations for all Indian statutory compliances including Provident Fund (PF), Employee State Insurance (ESI), Professional Tax (PT with all state-specific slabs), TDS salary tax deductions, and Labour Welfare Fund (LWF).",
        bullets: [
          "1-click ECR file generation ready for immediate upload to the EPFO portal",
          "Automated monthly ESI return files and challan reconciliation",
          "End-of-year automated Form 16 Part A and Part B generation and digital dispatch",
        ],
        learnMore: {
          label: "Explore Payroll Management",
          href: "/features/payroll-management",
        },
      },
      {
        id: "multi-entity-payroll",
        category: "Payroll & Compliance",
        question: "Can it run payroll for multiple entities or states?",
        answer:
          "Yes. You can configure multiple legal business entities, sister companies, and branch locations under one master account. Each entity can maintain distinct pay cycles, bank disbursement accounts, and state-specific tax registrations seamlessly.",
      },
      {
        id: "payslips-statutory-reports",
        category: "Payroll & Compliance",
        question: "How are payslips and statutory reports generated?",
        answer:
          "After finance approval via Maker-Checker validation, password-protected PDF payslips are generated instantly and published to employee self-service portals, mobile apps, and sent via encrypted email or WhatsApp [add your detail].",
      },
      {
        id: "contract-labour-compliance",
        category: "Payroll & Compliance",
        question: "Does it support contract labour compliance (CLRA, Form B)?",
        answer:
          "Yes. For manufacturing and facility management companies, LattiumHR supports contractor agency registers under the Contract Labour Regulation and Abolition (CLRA) Act, including automated Form B wage registers and attendance audit logs.",
        learnMore: {
          label: "View Manufacturing Workflows",
          href: "/solutions/industries",
        },
      },
    ],
  },
  {
    id: "attendance-and-leave",
    name: "Attendance & Leave",
    eyebrow: "TIME, SHIFTS & POLICIES",
    icon: "attendance",
    desc: "Biometric hardware sync, mobile GPS geofencing, multi-shift rosters, and leave policies.",
    items: [
      {
        id: "supported-attendance-methods",
        category: "Attendance & Leave",
        question: "Which attendance methods are supported (biometric, geo-fence, mobile, web)?",
        answer:
          "LattiumHR supports all industry-standard check-in methods. Employees can clock in via biometric face recognition turnstiles, fingerprint machines, geofenced mobile selfie check-ins, or IP-restricted desktop web portals.",
        bullets: [
          "Zero-delay sync with eSSSL, ZKTeco, Matrix, and Realtime biometric machines",
          "Mobile GPS geofencing with radius locking and selfie liveness detection",
          "Kiosk mode with QR scanning for retail stores and clinic front desks",
        ],
        learnMore: {
          label: "Explore Attendance Features",
          href: "/features/attendance-management",
        },
      },
      {
        id: "shifts-rosters-overtime",
        category: "Attendance & Leave",
        question: "Can we configure shifts, rosters and overtime rules?",
        answer:
          "Yes. Build rotational shifts, night shifts with custom allowances, split shifts, grace period rules, and single or double overtime formulas that automatically calculate into monthly payroll.",
      },
      {
        id: "custom-leave-policies",
        category: "Attendance & Leave",
        question: "Can leave policies be customised per team or location?",
        answer:
          "Yes. You can customize leave accruals (monthly, quarterly, or upfront), carry-forward rules, encashment limits, sandwich rules, and assign branch-specific holiday calendars per office location.",
        learnMore: {
          label: "Explore Leave Management",
          href: "/features/leave-management",
        },
      },
      {
        id: "attendance-payroll-sync",
        category: "Attendance & Leave",
        question: "Does attendance sync with payroll automatically?",
        answer:
          "Yes. Approved daily attendance, overtime hours, late-coming penalties, and unpaid leaves directly calculate into monthly Loss of Pay (LOP) days without any manual Excel exports or formula recalculations.",
      },
    ],
  },
  {
    id: "implementation-and-migration",
    name: "Implementation & Migration",
    eyebrow: "ONBOARDING & ROADMAP",
    icon: "setup",
    desc: "Setup timelines, spreadsheet migration, parallel payroll runs, and team onboarding.",
    items: [
      {
        id: "how-long-does-setup-take",
        category: "Implementation & Migration",
        popular: true,
        question: "How long does setup take?",
        answer:
          "A typical implementation takes between [2 to 4 weeks], depending on your company headcount and number of branch offices. Simple teams can get started in as little as [5 business days] using our guided bulk upload templates.",
        bullets: [
          "Assigned implementation specialist to guide kickoff and master data setup",
          "Pre-launch parallel payroll run to verify cent-for-cent accuracy against legacy figures",
          "Live interactive training webinars for HR admins, managers, and employees",
        ],
        learnMore: {
          label: "View Implementation Roadmap",
          href: "/help/getting-started",
        },
      },
      {
        id: "data-import-migration",
        category: "Implementation & Migration",
        question: "Can you import our existing employee and payroll data?",
        answer:
          "Yes. Our migration team handles data cleansing and import from Excel spreadsheets, legacy HR software, or legacy desktop databases—including past CTC structures, leave balances, and employee document archives.",
      },
      {
        id: "training-hr-employees",
        category: "Implementation & Migration",
        question: "Do you provide training for HR and employees?",
        answer:
          "Yes. We conduct dedicated hands-on training sessions for HR administrators and managers, supplemented with employee self-service video guides, printable cheat sheets, and 24/7 searchable documentation.",
        learnMore: {
          label: "Explore Help Center",
          href: "/help",
        },
      },
    ],
  },
  {
    id: "security-and-data",
    name: "Security & Data",
    eyebrow: "PRIVACY & ENCRYPTION",
    icon: "shield",
    desc: "Cloud infrastructure, 256-bit encryption, role-based access, and data ownership.",
    items: [
      {
        id: "is-my-data-secure",
        category: "Security & Data",
        popular: true,
        question: "Is my data secure and where is it stored?",
        answer:
          "Your data is hosted in ISO 27001 and SOC-2 Type II certified tier-4 cloud datacenters with 256-bit AES encryption at rest and TLS 1.3 encryption in transit. Automated daily geo-redundant backups ensure 99.99% data durability.",
        bullets: [
          "Role-based access control (RBAC) ensuring strict separation of duties",
          "Mandatory Two-Factor Authentication (2FA) and IP whitelisting options",
          "Compliant with GDPR and the Indian Digital Personal Data Protection (DPDP) Act",
        ],
        learnMore: {
          label: "Review Security Architecture",
          href: "/security",
        },
      },
      {
        id: "role-based-salary-access",
        category: "Security & Data",
        question: "Who can see salary information? (role-based access)",
        answer:
          "Only designated administrators and authorized payroll managers can view compensation figures. Branch managers, supervisors, and employees only see permissions strictly allocated to their functional roles.",
      },
      {
        id: "data-export-portability",
        category: "Security & Data",
        question: "Can I export my data any time?",
        answer:
          "Yes. You retain 100% ownership of your workforce data. Administrators can export complete employee records, attendance logs, and tax registers in Excel, CSV, or PDF formats whenever required.",
      },
    ],
  },
  {
    id: "integrations",
    name: "Integrations",
    eyebrow: "ECOSYSTEM & APIS",
    icon: "zap",
    desc: "Biometric machines, ERP platforms, accounting systems, and enterprise APIs.",
    items: [
      {
        id: "integrations-supported",
        category: "Integrations",
        question: "Which biometric devices, accounting tools and banks do you integrate with?",
        answer:
          "LattiumHR connects seamlessly with leading biometric hardware (eSSSL, ZKTeco, Matrix, Realtime), accounting software (Tally Prime, Zoho Books, QuickBooks, SAP), and corporate banking portals (ICICI, HDFC, RazorpayX) for direct salary payouts [add your detail].",
        bullets: [
          "Pre-built Tally XML and Excel export for 1-click accounting journal entries",
          "Direct corporate bank disbursement file generation in standard NEFT/RTGS formats",
          "Biometric push-data API integration across multi-location turnstiles",
        ],
      },
      {
        id: "api-support",
        category: "Integrations",
        question: "Do you offer an API?",
        answer:
          "Yes. Our Enterprise tier includes secure RESTful APIs and real-time webhooks allowing your internal engineering team to sync employee onboarding, attendance punches, and payroll vouchers with proprietary ERP or CRM systems.",
      },
    ],
  },
  {
    id: "support-and-training",
    name: "Support & Training",
    eyebrow: "SLAS & DIRECT SUPPORT",
    icon: "phone",
    desc: "Support channels, operating hours, response SLAs, and dedicated customer success.",
    items: [
      {
        id: "support-hours-and-channels",
        category: "Support & Training",
        question: "What support do I get and during what hours?",
        answer:
          "All customers receive multi-channel support via live in-app chat, email, and ticket tracking during standard business hours [9:00 AM – 7:00 PM IST, Monday through Saturday]. Enterprise accounts receive 24/7 priority emergency response.",
        bullets: [
          "Under 15-minute average response time on in-app chat during working hours",
          "Dedicated relationship manager for Professional and Enterprise plans",
          "Regular monthly review calls to assist with seasonal payroll and statutory updates",
        ],
        learnMore: {
          label: "View Support SLA Commitments",
          href: "/support",
        },
      },
      {
        id: "onboarding-support-included",
        category: "Support & Training",
        question: "Is onboarding support included?",
        answer:
          "Yes. Every customer is guided through step-by-step onboarding by our implementation team, including salary structure setup, leave policy configuration, device sync, and initial live payroll verification.",
      },
      {
        id: "contact-the-team",
        category: "Support & Training",
        question: "How do I contact the team?",
        answer:
          "You can reach out through our in-app help widget, by emailing [support@lattiumhr.com], or by scheduling a dedicated call with your assigned customer success specialist [add your detail].",
        learnMore: {
          label: "Contact LattiumHR Team",
          href: "/contact",
        },
      },
    ],
  },
];

// Helper to get a flattened list of all FAQs
export const allFaqItems: FAQItem[] = faqCategories.flatMap((cat) => cat.items);
