import { IconName } from "../components/ui/Icon";

export interface GuideHandbook {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  accentColor: string;
  badge: string;
  description: string;
  coverImage?: string;
  stat?: string;
  iconName?: IconName;
}

export interface GuideListItem {
  id: string;
  slug: string;
  title: string;
  category: "Payroll & Tax" | "Workforce & Leave" | "Hiring & Culture" | "Operations & Compliance";
  readTime: string;
  excerpt: string;
  badge: string;
  accentColor: string;
  author: string;
}

export interface DownloadableAsset {
  id: string;
  title: string;
  category: "Templates" | "Policy Blueprints" | "Compliance Checklists";
  description: string;
  format: "XLSX & DOCX" | "PDF & DOCX" | "PDF Checklist";
  itemCount: string;
  icon: "file-text" | "shield" | "check";
  downloadUrl?: string;
}

export interface GuideFaqItem {
  id: string;
  q: string;
  a: string;
}

export interface GuideQuestionItem {
  id: string;
  question: string;
  answer: string;
  guideSlug: string;
  guideTitle: string;
  category: string;
}

export interface GuideSectionData {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  table?: {
    headers: string[];
    rows: { col1: string; col2: string; col3: string }[];
  };
  tabs?: {
    name: string;
    description: string;
    items: { name: string; tag: string; desc: string }[];
  }[];
  callout: {
    title: string;
    text: string;
  };
}

export interface GuideChecklistItem {
  id: string;
  stage: string;
  task: string;
  done: boolean;
}

export interface GuideDetailModel {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  updatedDate: string;
  badge: string;
  accentColor: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  heroFlow: {
    step: string;
    title: string;
    desc: string;
  }[];
  toc: {
    id: string;
    label: string;
  }[];
  sections: GuideSectionData[];
  auditChecklist: GuideChecklistItem[];
  faqs: GuideFaqItem[];
  sidebarCTA: {
    title: string;
    desc: string;
  };
}

// 4 Prominent Relatable Handbooks
export const featuredHandbooks: GuideHandbook[] = [
  {
    id: "payroll-guide",
    slug: "payroll-management-guide",
    title: "Statutory Payroll & Tax Master Playbook",
    subtitle: "Gross-to-net salary formulas, TDS calculations, EPF & ESIC filing timelines, and zero-penalty audit workflows.",
    category: "Payroll & Tax",
    readTime: "15 min read",
    accentColor: "#7b2958",
    badge: "Statutory Masterclass",
    stat: "Zero-Penalty Audits",
    iconName: "payroll",
    coverImage: "/images/article-payroll.jpg",
    description: "Master Indian and international payroll processing, gross-to-net calculations, statutory PF/ESI/PT rules, and automated audit trails.",
  },
  {
    id: "leave-guide",
    slug: "leave-management-guide",
    title: "Modern Leave & Shift Attendance Blueprint",
    subtitle: "Resolving sandwich leave disputes, biometric sync, encashment liabilities, and eliminating 3.8% monthly payroll leakages.",
    category: "Workforce & Leave",
    readTime: "10 min read",
    accentColor: "#b43f70",
    badge: "Leakage Prevention",
    stat: "Auto Biometric Sync",
    iconName: "calendar",
    coverImage: "/images/branch-biometric.jpg",
    description: "Craft fair leave policies, eliminate absenteeism, automate multi-tier approval chains, and sync with payroll seamlessly.",
  },
  {
    id: "hiring-guide",
    slug: "recruitment-management-guide",
    title: "High-Velocity Hiring & Day-1 Onboarding Playbook",
    subtitle: "Boosting offer-to-joining ratios, automated background checks, multi-state document vaults, and asset handover checklists.",
    category: "Hiring & Culture",
    readTime: "11 min read",
    accentColor: "#10b981",
    badge: "Talent Ops",
    stat: "94% Joining Ratio",
    iconName: "users",
    coverImage: "/images/article-onboarding.jpg",
    description: "From structured candidate pipelines and multi-stage interviews to automated offer letter rollouts and seamless day-one onboarding across distributed branches.",
  },
  {
    id: "statutory-guide",
    slug: "statutory-compliance-guide",
    title: "Full & Final (FnF) Settlement & Labor Compliance",
    subtitle: "Gratuity calculation formulas, leave encashment tax limits, notice period buyout rules, and dispute-free exit workflows.",
    category: "Operations & Compliance",
    readTime: "13 min read",
    accentColor: "#ea580c",
    badge: "Legal & Offboarding",
    stat: "Compliant Exits",
    iconName: "shield",
    coverImage: "/images/branch-payroll.jpg",
    description: "Comprehensive breakdown of EPF Act, ESIC regulations, Payment of Bonus Act, Gratuity calculations, and state-wise Professional Tax slabs with zero-penalty deadline checklists.",
  },
];

// All Guides List (Covering all 9 distinct guides)
export const allGuidesList: GuideListItem[] = [
  {
    id: "payroll-detail",
    slug: "payroll-management-guide",
    title: "Payroll Management Guide",
    category: "Payroll & Tax",
    readTime: "15 min read",
    excerpt: "Gross-to-net salary processing, automated tax withholdings, statutory EPF/ESI/PT compliance, and zero-penalty audit workflows.",
    badge: "Essential",
    accentColor: "#f43f5e",
    author: "LattiumHR Payroll Advisory",
  },
  {
    id: "leave-detail",
    slug: "leave-management-guide",
    title: "Leave Management Guide",
    category: "Workforce & Leave",
    readTime: "10 min read",
    excerpt: "Eliminate attendance leakages, configure sandwich rules, manage statutory accruals, and automate multi-tier approval chains.",
    badge: "Operations",
    accentColor: "#7b2958",
    author: "LattiumHR People Team",
  },
  {
    id: "recruitment-detail",
    slug: "recruitment-management-guide",
    title: "Recruitment & Hiring Guide",
    category: "Hiring & Culture",
    readTime: "11 min read",
    excerpt: "End-to-end talent acquisition from candidate pipelines and scorecard evaluations to multi-state digital offer letter rollouts.",
    badge: "Talent Ops",
    accentColor: "#b43f70",
    author: "LattiumHR Talent Practice",
  },
  {
    id: "expense-detail",
    slug: "expense-management-guide",
    title: "Expense Management Guide",
    category: "Operations & Compliance",
    readTime: "9 min read",
    excerpt: "Corporate expense governance with OCR receipt capture, per-diem rules, mileage tracking, and 1-click payroll reimbursement.",
    badge: "Finance Ops",
    accentColor: "#10b981",
    author: "LattiumHR Finance Advisory",
  },
  {
    id: "attendance-detail",
    slug: "attendance-management-guide",
    title: "Attendance & Shifts Guide",
    category: "Workforce & Leave",
    readTime: "10 min read",
    excerpt: "Biometric clock-in sync, 24/7 rotational shifts, GPS geofenced mobile check-ins, and automated overtime and LOP calculations.",
    badge: "Workforce",
    accentColor: "#0284c7",
    author: "LattiumHR Workforce Operations",
  },
  {
    id: "statutory-detail",
    slug: "statutory-compliance-guide",
    title: "Statutory Compliance & Labor Laws",
    category: "Payroll & Tax",
    readTime: "13 min read",
    excerpt: "Master roadmap of federal and state statutory labor regulations, tax deadlines, Gratuity, Bonus Act, and audit prep.",
    badge: "Legal & Audit",
    accentColor: "#ea580c",
    author: "LattiumHR Legal Compliance",
  },
  {
    id: "onboarding-detail",
    slug: "employee-onboarding-guide",
    title: "Employee Onboarding Guide",
    category: "Hiring & Culture",
    readTime: "12 min read",
    excerpt: "Create an exceptional first 90 days with digital self-onboarding, asset provisioning, KYC vaults, and 30-60-90 day milestone plans.",
    badge: "Culture & HR",
    accentColor: "#8b5cf6",
    author: "LattiumHR People Operations",
  },
  {
    id: "performance-detail",
    slug: "performance-appraisal-guide",
    title: "Performance Appraisal & OKRs Guide",
    category: "Hiring & Culture",
    readTime: "12 min read",
    excerpt: "Continuous 360-degree feedback, quarterly OKR tracking, 9-box calibration reviews, and merit compensation linking.",
    badge: "Growth",
    accentColor: "#7b2958",
    author: "LattiumHR Organizational Design",
  },
  {
    id: "multibranch-detail",
    slug: "multibranch-hr-setup-guide",
    title: "Multi-branch Operations Guide",
    category: "Operations & Compliance",
    readTime: "14 min read",
    excerpt: "Centralize HR, shift policies, state PT compliance, and payroll for 10+ branch locations without losing local control.",
    badge: "Governance",
    accentColor: "#0d9488",
    author: "LattiumHR Multi-Entity Practice",
  },
];

// Save More Time - Downloadable Toolkits & Templates
export const downloadableToolkits: DownloadableAsset[] = [
  {
    id: "templates",
    title: "Ready-to-Use HR Templates",
    category: "Templates",
    description: "Instant Excel and Word templates for Salary Slips, Job Offer Letters, Appraisal Forms, and Full & Final Settlements.",
    format: "XLSX & DOCX",
    itemCount: "18 Free Templates",
    icon: "file-text",
  },
  {
    id: "policy-blueprints",
    title: "Company Policy Blueprints",
    category: "Policy Blueprints",
    description: "Legally vetted blueprints for POSH Policy, Hybrid & Remote Work, Code of Conduct, and Leave & Attendance Guidelines.",
    format: "PDF & DOCX",
    itemCount: "12 Vetted Policies",
    icon: "shield",
  },
  {
    id: "compliance-checklists",
    title: "Statutory Compliance Checklists",
    category: "Compliance Checklists",
    description: "Monthly tax calendars, PF/ESI filing reminders, Professional Tax state tables, and Pre-Payroll audit verification lists.",
    format: "PDF Checklist",
    itemCount: "6 Audit Checklists",
    icon: "check",
  },
];

// ============================================================================
// COMPREHENSIVE DETAIL DATA FOR ALL 9 GUIDES
// ============================================================================

export const GUIDE_DETAILS_MAP: Record<string, GuideDetailModel> = {
  // 1. PAYROLL MANAGEMENT GUIDE
  "payroll-management-guide": {
    slug: "payroll-management-guide",
    title: "Payroll Management Guide",
    subtitle: "Salary structures, gross-to-net calculations, statutory compliance rules, and automated payroll runs.",
    category: "Payroll & Tax",
    readTime: "15 min read",
    updatedDate: "Updated for Financial Year 2025–2026",
    badge: "Statutory Masterclass",
    accentColor: "#7b2958",
    author: {
      name: "LattiumHR Payroll Advisory",
      role: "Reviewed by Certified Statutory Compliance Auditors",
      avatar: "LT",
    },
    heroFlow: [
      { step: "Stage 01", title: "Inputs & Reconciliation", desc: "Lock biometric attendance cutoff, loss-of-pay (LOP), and approved expense reimbursements." },
      { step: "Stage 02", title: "Automated Computation", desc: "Calculate gross earnings, EPF, ESIC, State PT, and TDS tax withholdings." },
      { step: "Stage 03", title: "Sign-off & Disbursement", desc: "Maker-checker signoff, encrypted bank NEFT file export, and instant payslip dispatch." },
    ],
    toc: [
      { id: "what-is-payroll", label: "1. What is Payroll Management?" },
      { id: "importance", label: "2. Why Accurate Payroll Matters" },
      { id: "three-stages", label: "3. The 3 Stages of Payroll Processing" },
      { id: "salary-components", label: "4. Salary Structure & Slabs" },
      { id: "statutory-rules", label: "5. Statutory Compliance (PF, ESI, PT)" },
      { id: "maker-checker", label: "6. Maker-Checker Approval Governance" },
      { id: "interactive-checklist", label: "7. Interactive Payroll Audit Checklist" },
      { id: "common-pitfalls", label: "8. Pitfalls of Spreadsheets vs HRMS" },
      { id: "faqs", label: "9. Frequently Asked Questions" },
    ],
    sections: [
      {
        id: "what-is-payroll",
        title: "1. What is Payroll Management?",
        paragraphs: [
          "At its most fundamental level, payroll refers to the sum total of all compensation a business must disburse to its employees for a specific period. However, modern payroll management encompasses significantly more than writing salary checks.",
          "A robust payroll framework manages the entire lifecycle of an employee’s earnings: tracking attendance, accounting for unpaid leave days, calculating statutory tax withholdings (such as Provident Fund, ESIC, and Professional Tax), issuing tamper-proof salary slips, and maintaining legal audit readiness.",
        ],
        callout: {
          title: "Key Takeaway",
          text: "Payroll is often the single largest operational expenditure for businesses, accounting for 40% to 65% of overall company expenses. Processing it with 100% precision is crucial for organizational trust and legal health.",
        },
      },
      {
        id: "importance",
        title: "2. Why Accurate Payroll Management Matters",
        paragraphs: [
          "Treating payroll as a routine administrative chore creates hidden financial vulnerabilities. A modern payroll framework safeguards the enterprise in four major dimensions:",
        ],
        bullets: [
          "Employee Trust & Retention: Compensation is a psychological foundation. A single payroll delay or calculation mistake harms morale and spikes early attrition.",
          "Strict Statutory Compliance: Failure to remit mandatory employee withholdings (EPF, ESI, PT, and TDS) by the monthly deadlines triggers severe non-compliance penalties, interest charges, and director liability.",
          "Multi-Branch Governance: Organizations operating multiple regional branches encounter conflicting state tax laws (e.g. Maharashtra vs. Karnataka Professional Tax slabs). Centralized payroll eliminates localized errors.",
          "Accurate Financial Forecasting: Transparent compensation breakdowns feed directly into general ledger ERP systems, providing leadership with real-time labor cost intelligence.",
        ],
        callout: {
          title: "Audit Protection",
          text: "Standardizing payroll on an automated HRMS eliminates spreadsheet tampering, ensures dual-authorization compliance, and maintains verified timestamp logs for all salary modifications.",
        },
      },
      {
        id: "three-stages",
        title: "3. The 3 Stages of Payroll Processing",
        paragraphs: [
          "Systematic payroll operates in three continuous sequential phases to ensure complete accuracy before any money leaves company accounts:",
        ],
        tabs: [
          {
            name: "Pre-Payroll Validation",
            description: "Gathering and locking variable workforce inputs before calculation.",
            items: [
              { name: "Attendance & LOP Cutoff", tag: "Workforce", desc: "Lock monthly timesheet logs and calculate unpaid leaves (Loss of Pay)." },
              { name: "New Joiners & Exits", tag: "Employee Data", desc: "Verify bank accounts, UAN credentials, and FnF settlement balance adjustments." },
              { name: "Variable Incentives & Expenses", tag: "Finance", desc: "Aggregate approved sales commissions, overtime hours, and business expense receipts." },
            ],
          },
          {
            name: "Payroll Computation",
            description: "Running mathematical gross-to-net equations and tax deductions.",
            items: [
              { name: "Gross Earnings Formulation", tag: "Earnings", desc: "Calculate Basic, HRA, Special Allowance, and earned allowances on payable days." },
              { name: "Statutory PF & ESI Withholdings", tag: "Compliance", desc: "Apply 12% EPF (wage ceiling rules) and 0.75% ESIC based on statutory eligibility." },
              { name: "TDS Slab Calculation", tag: "Income Tax", desc: "Deduct tax according to declared regime (Old vs. New) and investment proofs." },
            ],
          },
          {
            name: "Post-Payroll Distribution",
            description: "Disbursement, reporting, and statutory filing execution.",
            items: [
              { name: "Bank Batch Payout (NEFT)", tag: "Treasury", desc: "Export encrypted bank payout files for direct salary transfer." },
              { name: "Digital Payslip Release", tag: "ESS App", desc: "Publish password-protected PDF payslips to mobile employee portal." },
              { name: "Statutory Remittance Before 15th", tag: "Government", desc: "Generate EPFO ECR text files and state PT challan reports for timely filing." },
            ],
          },
        ],
        callout: {
          title: "Process Efficiency",
          text: "Automating pre-payroll data aggregation compresses the traditional 5-day payroll cycle down to under 45 minutes with zero manual transcription errors.",
        },
      },
      {
        id: "salary-components",
        title: "4. Salary Structure & Slabs",
        paragraphs: [
          "A tax-optimized salary structure balances employee take-home pay with statutory employer obligations under labor codes:",
        ],
        table: {
          headers: ["Component", "Recommended Share", "Statutory & Tax Treatment"],
          rows: [
            { col1: "Basic Salary", col2: "40% – 50% of Total CTC", col3: "100% Taxable. Primary foundation for EPF, ESIC, and Gratuity calculations." },
            { col1: "House Rent Allowance (HRA)", col2: "40% – 50% of Basic", col3: "Exempt under Section 10(13A) subject to actual rent paid and metro classification." },
            { col1: "Special Allowance", col2: "Residual Balance", col3: "Fully taxable balancing figure that completes the promised Cost to Company (CTC)." },
            { col1: "Leave Travel Allowance (LTA)", col2: "As defined in policy", col3: "Exempt for domestic travel tickets twice in a four-calendar-year block." },
            { col1: "Statutory Bonus / Ex-Gratia", col2: "8.33% of Basic (min)", col3: "Mandatory under Payment of Bonus Act for employees earning up to ₹21,000/mo." },
          ],
        },
        callout: {
          title: "Wage Code Alignment",
          text: "Under the proposed new Wage Code norms, Basic Salary + DA must equal at least 50% of total compensation to prevent artificial dilution of retirement benefits.",
        },
      },
      {
        id: "statutory-rules",
        title: "5. Statutory Compliance (PF, ESI, PT)",
        paragraphs: [
          "Compliance with Indian and regional labor statutes requires precise deduction percentages and timely deposits by the 15th of each month:",
        ],
        table: {
          headers: ["Statutory Head", "Employee Contribution", "Employer Contribution & Deadlines"],
          rows: [
            { col1: "EPF (Provident Fund)", col2: "12% of Basic (+DA)", col3: "12% (3.67% EPF + 8.33% EPS capped at ₹1,250) + 0.5% EDLI + Admin. Due by 15th." },
            { col1: "ESIC (Health Coverage)", col2: "0.75% of Gross Wages", col3: "3.25% of Gross Wages. Mandatory if gross salary ≤ ₹21,000/month. Due by 15th." },
            { col1: "Professional Tax (PT)", col2: "₹150 – ₹200 / month", col3: "State-specific (Maharashtra ₹200/mo, Karnataka ₹200/mo above ₹15,000, Delhi Nil)." },
            { col1: "Income Tax (TDS)", col2: "Per Tax Slab", col3: "Deducted monthly under Section 192 and deposited by 7th of following month." },
          ],
        },
        callout: {
          title: "Penalty Avoidance",
          text: "Delaying statutory PF or ESIC remittances past the 15th triggers compounding damages ranging from 5% to 25% per annum plus 12% interest under Section 7Q.",
        },
      },
      {
        id: "maker-checker",
        title: "6. Maker-Checker Approval Governance",
        paragraphs: [
          "Corporate finance governance demands separation of duties before funds are disbursed. A single individual should never have unilateral authority to both calculate and disburse payroll.",
          "In LattiumHR, the HR Manager prepares and validates the salary register (Maker), while the Finance Director or CEO performs multi-point variance audits before executing bank transfers (Checker).",
        ],
        callout: {
          title: "Governance Safety",
          text: "Maker-checker separation prevents internal fraud, erroneous bonuses, and phantom payroll records, providing certified compliance during statutory audits.",
        },
      },
      {
        id: "interactive-checklist",
        title: "7. Interactive Payroll Audit Checklist",
        paragraphs: [
          "Verify each milestone before locking the month-end payroll run to ensure a 100% error-free payout:",
        ],
        callout: {
          title: "Verification Standard",
          text: "Complete all 10 checklist milestones before signing off on bank NEFT transfer batches to prevent post-disbursement clawbacks.",
        },
      },
      {
        id: "common-pitfalls",
        title: "8. Pitfalls of Spreadsheets vs HRMS",
        paragraphs: [
          "Over 60% of growing companies still manage payroll on Excel spreadsheets. Here is why high-growth organizations transition to automated cloud payroll:",
        ],
        bullets: [
          "Formula Corruption: Broken VLOOKUP references or unverified row deletions result in undetected under-deductions that trigger audit fines.",
          "Biometric Disconnection: Manually copying punch card data from physical gate turnstiles into spreadsheets wastes 3 to 5 operational days every month.",
          "Data Privacy Breaches: Emailing unencrypted spreadsheets containing employee bank details and PAN numbers breaches DPDP privacy mandates.",
          "Real-Time Sync: Modern HRMS unifies attendance, leaves, variable claims, and tax withholdings with one-click bank export.",
        ],
        callout: {
          title: "Operational Savings",
          text: "Automating payroll cuts administrative overhead by 80% while completely eliminating statutory audit penalties and costly payroll recalculations.",
        },
      },
      {
        id: "faqs",
        title: "9. Frequently Asked Questions",
        paragraphs: [
          "Explore expert answers to the most common payroll management and statutory compliance inquiries:",
        ],
        callout: {
          title: "Have Additional Questions?",
          text: "Our certified payroll compliance advisory team is available to help evaluate your company's salary structures and state tax obligations.",
        },
      },
    ],
    auditChecklist: [
      { id: "chk-1", stage: "Pre-Payroll", task: "Biometric & Attendance Reconciliation: Lock monthly attendance cutoff and verify loss of pay (LOP) days.", done: true },
      { id: "chk-2", stage: "Pre-Payroll", task: "New Joiners & Relieving Staff: Ensure bank account, PAN, and Aadhaar/UAN credentials are validated.", done: true },
      { id: "chk-3", stage: "Pre-Payroll", task: "Variable Pay & Deductions: Aggregate approved overtime hours, sales incentives, loan deductions, and expense claims.", done: false },
      { id: "chk-4", stage: "Processing", task: "Gross-to-Net Computation: Run automated calculation of gross allowances, statutory heads, and TDS withholdings.", done: false },
      { id: "chk-5", stage: "Processing", task: "Variance & Anomaly Check: Review salary register for employees with >15% variance compared to previous month.", done: false },
      { id: "chk-6", stage: "Processing", task: "Maker-Checker Signoff: Obtain digital dual approval from HR Manager and Finance Director.", done: false },
      { id: "chk-7", stage: "Post-Payroll", task: "Direct Bank Disbursement: Export encrypted bank payout batch file (NEFT/RTGS) and execute transfer.", done: false },
      { id: "chk-8", stage: "Post-Payroll", task: "Digital Payslip Distribution: Publish password-protected salary slips to mobile app and employee email.", done: false },
      { id: "chk-9", stage: "Post-Payroll", task: "Statutory Filing Preparation: Generate EPFO ECR text file, ESIC monthly return, and PT challans before the 15th.", done: false },
      { id: "chk-10", stage: "Post-Payroll", task: "Accounting GL Journal Sync: Post monthly compensation journal entries to ERP (Tally, QuickBooks, SAP, Zoho Books).", done: false },
    ],
    faqs: [
      {
        id: "faq-0",
        q: "Is PF mandatory for companies with under 20 employees?",
        a: "No. The Employees' Provident Fund (EPF) Act mandates registration and contribution once an organization reaches 20 or more employees. Establishments with fewer than 20 staff can opt in voluntarily with employee consent.",
      },
      {
        id: "faq-1",
        q: "What happens if statutory filings are delayed past the 15th of the month?",
        a: "Late PF or ESI deposits attract penal damages under Section 14B ranging from 5% to 25% per annum, along with interest under Section 7Q at 12% per annum. Continued default also attracts personal liability for company directors.",
      },
      {
        id: "faq-2",
        q: "How does multi-state Professional Tax differ across regional branches?",
        a: "Each Indian state enforces distinct salary threshold slabs and filing cycles. For example, Maharashtra levies ₹200/mo (₹300 in Feb), Karnataka levies ₹200/mo above ₹15,000, while Delhi levies no PT at all. LattiumHR auto-applies state slabs based on employee office location.",
      },
      {
        id: "faq-3",
        q: "Can TDS deductions be modified if an employee changes tax regimes mid-year?",
        a: "Under CBDT circulars, employees can declare their choice between the Old and New Tax Regimes at the start of the financial year. While employers deduct TDS based on this choice, employees can still switch regimes when filing their annual ITR return.",
      },
    ],
    sidebarCTA: {
      title: "Automate Your Payroll",
      desc: "Zero-penalty statutory compliance, automated tax deductions, and 2-click salary disbursements.",
    },
  },

  // 2. LEAVE MANAGEMENT GUIDE
  "leave-management-guide": {
    slug: "leave-management-guide",
    title: "Leave Management Guide",
    subtitle: "Statutory leave rules, accrual formulas, sandwich rule policies, and automated biometric payroll sync.",
    category: "Workforce & Leave",
    readTime: "10 min read",
    updatedDate: "Updated for Financial Year 2025–2026",
    badge: "Leakage Prevention",
    accentColor: "#b43f70",
    author: {
      name: "LattiumHR People Operations Advisory",
      role: "Reviewed by Senior Labour Law Compliance Specialists",
      avatar: "LT",
    },
    heroFlow: [
      { step: "Stage 01", title: "Policy Setup & Accrual", desc: "Configure statutory leave quotas, monthly pro-rata credits, and public holiday calendars." },
      { step: "Stage 02", title: "Self-Service & Approval", desc: "Mobile-first leave applications with team calendar visibility and automated multi-tier routing." },
      { step: "Stage 03", title: "Payroll & Cutoff Sync", desc: "Real-time sync of approved leaves, sandwich deductions, and loss of pay (LOP) into payroll." },
    ],
    toc: [
      { id: "what-is-leave", label: "1. What is Modern Leave Management?" },
      { id: "why-it-matters", label: "2. Why Transparent Leave Policies Matter" },
      { id: "statutory-leave-types", label: "3. Core Statutory Leave Types" },
      { id: "policy-rules", label: "4. Policy Rules: Sandwich Rule & Carry-Forward" },
      { id: "approval-workflow", label: "5. Multi-Tier Approval Workflows" },
      { id: "encashment-rules", label: "6. Leave Encashment & Separation Liabilities" },
      { id: "interactive-checklist", label: "7. Interactive Annual Leave Audit Checklist" },
      { id: "attendance-sync", label: "8. Biometric & Payroll Sync vs Spreadsheets" },
      { id: "faqs", label: "9. Frequently Asked Questions" },
    ],
    sections: [
      {
        id: "what-is-leave",
        title: "1. What is Modern Leave Management?",
        paragraphs: [
          "At its core, leave management is the formal process of managing employee time-off requests, statutory leave entitlements, absences, and holiday schedules in alignment with state labor statutes and internal organizational guidelines.",
          "While traditional businesses relied on ad-hoc emails and paper forms, modern leave management centralizes employee self-service (ESS), automated multi-tier approval routing, statutory balance accruals, and direct real-time synchronization with biometric clocks and monthly payroll.",
        ],
        callout: {
          title: "Key Takeaway",
          text: "Unrecorded absenteeism and manual spreadsheet leave tracking cause an average of 3.8% in payroll leakage each month through uncollected Loss of Pay (LOP) days and untracked encashment liabilities.",
        },
      },
      {
        id: "why-it-matters",
        title: "2. Why Transparent Leave Policies Matter",
        paragraphs: [
          "A clear, predictable leave framework directly shapes company culture, operational resilience, and legal standing:",
        ],
        bullets: [
          "Statutory Compliance & Legal Safety: Under the Factories Act 1948 and State Shops and Commercial Establishments Acts, companies are legally obligated to maintain transparent records of earned, casual, and sick leaves.",
          "Burnout Prevention & Psychological Safety: Transparent policies empower staff to rest without guilt or fear of reprisal, increasing long-term retention and reducing unplanned absenteeism.",
          "Workforce Continuity & Shift Planning: Automated overlap warnings alert team leads when too many team members request leave on identical dates.",
          "Zero Favoritism in Approvals: Clear rules eliminate subjective manager bias by enforcing consistent notice periods and documented approval trees.",
        ],
        callout: {
          title: "Retention Impact",
          text: "Transparent, self-service leave policies reduce unplanned employee turnover by 24% and eliminate manager friction by replacing subjective discretion with documented eligibility rules.",
        },
      },
      {
        id: "statutory-leave-types",
        title: "3. Core Statutory Leave Types",
        paragraphs: [
          "Indian labor statutes categorize leaves into distinct entitlements, each governed by specific accrual and rollover rules:",
        ],
        table: {
          headers: ["Leave Category", "Statutory Quota", "Accrual & Carryover Rules"],
          rows: [
            { col1: "Casual Leave (CL)", col2: "7 – 12 Days / Year", col3: "For unforeseen personal emergencies. Lapses automatically at the end of the calendar year." },
            { col1: "Sick / Medical Leave (SL)", col2: "10 – 14 Days / Year", col3: "For illness recovery. Medical certificate required for absences >2 days. Accumulable in select states." },
            { col1: "Earned / Privilege Leave (EL/PL)", col2: "15 – 18 Days / Year", col3: "Earned at 1 day per 20 days worked. Accumulable up to 30–45 days and eligible for separation encashment." },
            { col1: "Maternity Leave (ML)", col2: "26 Weeks Fully Paid", col3: "Mandatory under Maternity Benefit Act 2017 for female staff with 80+ working days in past 12 months." },
            { col1: "Paternity Leave", col2: "5 – 15 Days", col3: "Company policy discretionary benefit granted to new fathers within 6 months of delivery." },
          ],
        },
        callout: {
          title: "Statutory Adherence",
          text: "State Shops & Commercial Establishments Acts prescribe minimum leave quotas that cannot be waived or curtailed by employment contracts.",
        },
      },
      {
        id: "policy-rules",
        title: "4. Policy Rules: Sandwich Rule & Carry-Forward",
        paragraphs: [
          "Establishing clear ground rules prevents unexpected payroll disputes and unapproved weekend extensions:",
        ],
        bullets: [
          "The Sandwich Rule: If an employee takes leaves on both Friday and Monday, intervening Saturday and Sunday are counted as leaves. While common in traditional setups, modern teams frequently configure department-level toggles.",
          "Accrual Cadence: Rather than crediting full annual balances upfront on January 1st, modern HRMS accrues leaves pro-rata on the 1st of each month (e.g. 1.25 days/month) to prevent deficit liabilities.",
          "Carry-Forward Ceilings: Companies enforce statutory caps (typically 30 or 45 days) on accumulated Earned Leaves, auto-encashing or lapsing excess days at financial year close.",
          "Advance Notice Requirements: Requiring 7 days notice for planned leaves exceeding 3 days ensures operational backup coverage without scrambling.",
        ],
        callout: {
          title: "Policy Balance",
          text: "Configuring flexible policy rules inside LattiumHR allows organizations to enforce rigor on core operations while maintaining progressive perks for knowledge workers.",
        },
      },
      {
        id: "approval-workflow",
        title: "5. Multi-Tier Approval Workflows",
        paragraphs: [
          "Automated approval hierarchies route applications directly to the appropriate team lead and HR manager based on leave duration and department structure:",
          "If an approver is unresponsive for more than 48 hours, automated escalation triggers delegate approval to the secondary department head, preventing employee anxiety.",
        ],
        callout: {
          title: "Turnaround Time",
          text: "Mobile-first, multi-tier approval chains resolve 91% of leave applications within 4 hours, completely eliminating administrative email ping-pong.",
        },
      },
      {
        id: "encashment-rules",
        title: "6. Leave Encashment & Separation Liabilities",
        paragraphs: [
          "Earned leaves remaining in an employee's balance upon separation (resignation, retirement, or termination) are encashed as part of the Full & Final (FnF) settlement:",
          "Formula: Leave Encashment = (Basic Salary + DA) ÷ 30 × Number of Unused Earned Leaves. Under Section 10(10AA), encashment upon separation is exempt from income tax up to ₹25,00,000 for private sector employees.",
        ],
        callout: {
          title: "Tax Exemption Update",
          text: "The Central Board of Direct Taxes (CBDT) enhanced the non-government leave encashment exemption ceiling to ₹25 Lakhs, providing substantial tax relief to exiting staff.",
        },
      },
      {
        id: "interactive-checklist",
        title: "7. Interactive Annual Leave Audit Checklist",
        paragraphs: [
          "Run through this governance checklist to ensure complete policy alignment before launching annual leave cycles:",
        ],
        callout: {
          title: "Year-End Governance",
          text: "Executing year-end carry-forward and encashment routines prevents phantom balance inflation and keeps company balance sheet provisions clean.",
        },
      },
      {
        id: "attendance-sync",
        title: "8. Biometric & Payroll Sync vs Spreadsheets",
        paragraphs: [
          "Manual leave spreadsheets disconnect time-off approvals from physical biometric turnstiles, resulting in duplicate entries and unrecorded absences.",
          "In LattiumHR, an approved leave immediately updates the biometric attendance roster, marking the day as 'Authorized Paid Absence' and ensuring zero false loss of pay (LOP) deductions during payroll.",
        ],
        callout: {
          title: "Zero Leakage",
          text: "Direct API integration between gate scanners and leave management saves up to 32 hours of manual attendance reconciliation every single month.",
        },
      },
      {
        id: "faqs",
        title: "9. Frequently Asked Questions",
        paragraphs: [
          "Frequently asked legal and practical inquiries concerning modern leave management:",
        ],
        callout: {
          title: "Need Policy Customization?",
          text: "Speak with our HR specialists to tailor multi-branch leave rules, sandwich policies, and rollover caps to your exact workforce needs.",
        },
      },
    ],
    auditChecklist: [
      { id: "lchk-1", stage: "Policy Governance", task: "Annual Gazetted Holiday List: Configure mandatory 3 national holidays plus state regional festival calendar.", done: true },
      { id: "lchk-2", stage: "Policy Governance", task: "Opening Balance Verification: Credit pro-rated annual casual and sick leave allocations to all active staff accounts.", done: true },
      { id: "lchk-3", stage: "Accruals & Caps", task: "Carry-Forward & Lapsing Run: Execute year-end roll-over script, capping earned leave at 30/45 days and lapsing unutilized CL.", done: false },
      { id: "lchk-4", stage: "Accruals & Caps", task: "Leave Encashment Computation: Process tax-exempt encashment amounts based on Basic+DA formula for eligible balances.", done: false },
      { id: "lchk-5", stage: "Approvals & Rosters", task: "Multi-Tier Hierarchy Audit: Ensure every reporting unit has an active primary manager and designated deputy approver.", done: false },
      { id: "lchk-6", stage: "Approvals & Rosters", task: "Sandwich Rule Logic: Verify whether intervening weekends and public holidays are dynamically flagged or exempt as per company handbook.", done: false },
      { id: "lchk-7", stage: "Statutory Audit", task: "Maternity Benefit Act Compliance: Ensure 26 weeks paid leave records, nursing breaks, and crèche facility policies are documented.", done: false },
      { id: "lchk-8", stage: "Payroll Sync", task: "Loss of Pay (LOP) Lock: Synchronize approved/unapproved leave days with monthly attendance cutoff before payroll run.", done: false },
      { id: "lchk-9", stage: "Payroll Sync", task: "Negative Balance Alert: Review employees with deficit balances for recovery or manager-approved adjustment.", done: false },
      { id: "lchk-10", stage: "Employee Experience", task: "Mobile Self-Service Access: Verify employees can view real-time leave balances and upcoming team holidays from their mobile app.", done: false },
    ],
    faqs: [
      {
        id: "faq-0",
        q: "Is the sandwich rule mandatory by Indian labour law?",
        a: "No. The sandwich rule is not a statutory requirement mandated by Indian labor statutes. It is an internal company policy rule traditionally used by employers to curb weekend absenteeism. Modern organizations frequently waive or soften this rule.",
      },
      {
        id: "faq-1",
        q: "Can Casual Leave (CL) be accumulated and carried forward to the next financial year?",
        a: "No. Under almost all State Shops and Commercial Establishments Acts, Casual Leave (CL) cannot be accumulated or carried forward; it lapses automatically at the close of the calendar or financial year.",
      },
      {
        id: "faq-2",
        q: "How is Leave Encashment calculated during employee separation?",
        a: "Under statutory standard formulas, Earned / Privilege Leave encashment is calculated as: (Basic Salary + Dearness Allowance) ÷ 30 × Number of Unused Earned Leaves. Under Sec 10(10AA), leave encashment upon separation is exempt from income tax up to ₹25,00,000 for non-government employees.",
      },
      {
        id: "faq-3",
        q: "What is the statutory Maternity Leave duration in India?",
        a: "Under the Maternity Benefit (Amendment) Act 2017, eligible female employees are entitled to 26 weeks (182 calendar days) of paid maternity leave for up to two surviving children, of which not more than 8 weeks can precede expected delivery.",
      },
      {
        id: "faq-4",
        q: "Can compensatory offs (comp-offs) be converted into cash?",
        a: "Compensatory offs are intended as time-off in lieu of weekend or holiday shifts worked. While some companies permit encashment of expired comp-offs at basic wage rate, most policies require them to be utilized within 30 to 60 days.",
      },
    ],
    sidebarCTA: {
      title: "Automate Leave & Shifts",
      desc: "Eliminate unrecorded absences with biometric clock-in, mobile requests, and automated sandwich rules.",
    },
  },

  // 3. ATTENDANCE & SHIFTS GUIDE
  "attendance-management-guide": {
    slug: "attendance-management-guide",
    title: "Attendance & Shifts Master Guide",
    subtitle: "Biometric clock-in sync, 24/7 rotational shifts, GPS geofencing, and automated overtime calculations.",
    category: "Workforce & Leave",
    readTime: "10 min read",
    updatedDate: "Updated for Financial Year 2025–2026",
    badge: "Workforce Intelligence",
    accentColor: "#0284c7",
    author: {
      name: "LattiumHR Workforce Advisory",
      role: "Reviewed by Operations & Industrial Relations Experts",
      avatar: "LT",
    },
    heroFlow: [
      { step: "Stage 01", title: "Capture & Hardware Sync", desc: "Auto-sync biometric gate scanners, facial recognition kiosks, and GPS geofenced mobile punches." },
      { step: "Stage 02", title: "Shift & Overtime Rules", desc: "Automate rotational rosters, grace periods, half-day triggers, and statutory overtime calculation." },
      { step: "Stage 03", title: "Payroll Lock & Cutoff", desc: "One-click reconciliation of worked days and loss of pay (LOP) feeding directly into payroll." },
    ],
    toc: [
      { id: "what-is-attendance", label: "1. What is Automated Attendance Management?" },
      { id: "why-attendance-matters", label: "2. Why Attendance Precision Impacts Profitability" },
      { id: "shift-types-framework", label: "3. Shift Types & Rotational Roster Framework" },
      { id: "overtime-rules", label: "4. Overtime, Late Marks & Grace Period Rules" },
      { id: "hardware-vs-mobile", label: "5. Biometric Hardware vs Mobile Geofencing" },
      { id: "regularization-workflow", label: "6. Shift Swap & Regularization Workflows" },
      { id: "interactive-checklist", label: "7. Interactive Attendance Audit Checklist" },
      { id: "spreadsheets-vs-hrms", label: "8. Spreadsheet Logs vs Cloud HRMS" },
      { id: "faqs", label: "9. Frequently Asked Questions" },
    ],
    sections: [
      {
        id: "what-is-attendance",
        title: "1. What is Automated Attendance Management?",
        paragraphs: [
          "Automated attendance management is the digital orchestration of employee work hours, punctuality, break durations, and shifts across physical branches and remote field locations.",
          "Rather than relying on manual sign-in ledgers or isolated Excel files, modern cloud attendance systems capture real-time clock-in events through biometric turnstiles, facial recognition tablets, and GPS geofenced mobile devices, instantly validating them against scheduled shift rosters.",
        ],
        callout: {
          title: "Operational Reality",
          text: "Buddy-punching and unrecorded tardiness cost businesses up to 4.5% of total payroll hours. Biometric biometric authentication and geofencing eliminate time theft completely.",
        },
      },
      {
        id: "why-attendance-matters",
        title: "2. Why Attendance Precision Impacts Profitability",
        paragraphs: [
          "Accurate workforce tracking delivers direct operational advantages across finance and legal compliance:",
        ],
        bullets: [
          "Fair Overtime Remuneration: Accurately calculating double-rate overtime under the Factories Act ensures statutory compliance while avoiding wage disputes.",
          "Zero Ghost Employees: Multi-factor biometric scanning verifies physical presence at the workplace, preventing unauthorized proxy check-ins.",
          "Predictable Shift Coverage: Automated alerts notify team leads when scheduled operators fail to clock in within 15 minutes of shift start.",
          "Seamless Payroll Cutoff: Real-time calculation of worked days, paid leaves, and loss of pay (LOP) eliminates the multi-day month-end reconciliation rush.",
        ],
        callout: {
          title: "Productivity Gain",
          text: "Organizations switching from physical punch cards to automated cloud attendance report an 18% improvement in shift adherence and on-time starts.",
        },
      },
      {
        id: "shift-types-framework",
        title: "3. Shift Types & Rotational Roster Framework",
        paragraphs: [
          "Modern manufacturing, retail, and 24/7 service companies operate multiple complex shift schedules:",
        ],
        table: {
          headers: ["Shift Category", "Standard Hours", "Key Policy Rules & Allowances"],
          rows: [
            { col1: "General Shift", col2: "09:00 AM – 06:00 PM", col3: "Standard office hours with 15-minute grace period and 1-hour lunch break." },
            { col1: "Rotational Shifts (A/B/C)", col2: "06:00–14:00 | 14:00–22:00 | 22:00–06:00", col3: "Weekly roster rotation with mandatory 16-hour rest interval between shifts." },
            { col1: "Night Shift (Graveyard)", col2: "10:00 PM – 06:00 AM", col3: "Includes night shift allowance. Cross-midnight clock-outs credit back to start date." },
            { col1: "Split Shifts", col2: "11:00–15:00 & 18:00–22:00", col3: "Common in hospitality and retail. Dual check-in windows with gap interval tracking." },
          ],
        },
        callout: {
          title: "Midnight Crossings",
          text: "LattiumHR automatically detects shifts crossing midnight, attributing total shift hours and night allowances to the initiating shift date without breaking daily timesheets.",
        },
      },
      {
        id: "overtime-rules",
        title: "4. Overtime, Late Marks & Grace Period Rules",
        paragraphs: [
          "Establishing transparent rules for grace periods and overtime protects both company margins and employee fairness:",
        ],
        bullets: [
          "Grace Period Thresholds: A 15-minute grace window on clock-in prevents penalizing staff for minor transit delays while maintaining discipline.",
          "Late Mark Compounding: Configure policies such as '3 late marks within a calendar month trigger a half-day casual leave deduction'.",
          "Statutory Overtime Rate: Under Section 59 of the Factories Act, work performed beyond 9 hours in any day or 48 hours in any week must be compensated at double the normal wage rate.",
          "Pre-Approved Overtime: Requiring manager pre-approval before overtime hours are credited prevents unauthorized after-hours overtime inflation.",
        ],
        callout: {
          title: "Legal Standard",
          text: "Overtime must be calculated on Basic + Dearness Allowance and paid out during regular payroll cycles with detailed hours itemized on the salary slip.",
        },
      },
      {
        id: "hardware-vs-mobile",
        title: "5. Biometric Hardware vs Mobile Geofencing",
        paragraphs: [
          "Select the optimal attendance capture mechanism for each segment of your workforce:",
        ],
        table: {
          headers: ["Capture Method", "Ideal Workforce", "Features & Verification"],
          rows: [
            { col1: "Biometric Fingerprint / Face Turnstiles", col2: "Factories, Warehouses, Corporate HQs", col3: "Fast throughput (40 punches/min), tamper-proof optical sensors, live cloud sync." },
            { col1: "GPS Geofenced Mobile Punch", col2: "Field Sales, Delivery Crews, Site Engineers", col3: "Restricts check-in within designated GPS coordinate radii (50m–200m) with selfie validation." },
            { col1: "Tablet Kiosk Clock-in", col2: "Retail Stores, Branch Showrooms", col3: "Single iPad or Android tablet at store reception with AI facial recognition verification." },
          ],
        },
        callout: {
          title: "Offline Reliability",
          text: "LattiumHR biometric hardware devices store up to 100,000 punches locally during internet outages and auto-upload the instant network connectivity is restored.",
        },
      },
      {
        id: "regularization-workflow",
        title: "6. Shift Swap & Regularization Workflows",
        paragraphs: [
          "Employees who forget their RFID card or experience hardware errors can submit an attendance regularization request via their mobile employee app.",
          "The reporting manager receives an instant push notification detailing the requested punch time and rationale, enabling one-tap approvals that instantly update the timesheet.",
        ],
        callout: {
          title: "Audit Safety",
          text: "Every regularized punch is watermarked with the approver's identity and timestamp to ensure complete traceability during labor department audits.",
        },
      },
      {
        id: "interactive-checklist",
        title: "7. Interactive Monthly Attendance Audit Checklist",
        paragraphs: [
          "Follow this monthly verification procedure to guarantee 100% accurate timesheets before payroll cut-off:",
        ],
        callout: {
          title: "Cutoff Verification",
          text: "Lock attendance by the 25th or 28th of each month to give managers 48 hours for regularizations before payroll computation begins.",
        },
      },
      {
        id: "spreadsheets-vs-hrms",
        title: "8. Spreadsheet Logs vs Cloud HRMS",
        paragraphs: [
          "Exporting raw biometric machine CSV dumps into desktop spreadsheets creates massive operational bottlenecks and formula errors:",
        ],
        bullets: [
          "High Administrative Drag: HR personnel spend 3 to 6 working days each month manually cross-referencing punch times with leave slips.",
          "Undetected Overtime Errors: Misplaced formulas accidentally pay overtime at flat rates or omit night shift premiums, exposing the company to employee grievances.",
          "Delayed Payroll Runs: Reconciliation disputes hold up salary disbursements, causing company-wide frustration.",
          "The LattiumHR Advantage: Real-time clock-in events continuously calculate work hours and LOP deductions, reducing month-end close to a single button click.",
        ],
        callout: {
          title: "Direct ROI",
          text: "Automating attendance and shift rosters eliminates an average of 40 hours of manual data entry every month per 100 employees.",
        },
      },
      {
        id: "faqs",
        title: "9. Frequently Asked Questions",
        paragraphs: [
          "Read answers to frequent technical, policy, and legal questions regarding modern employee attendance tracking:",
        ],
        callout: {
          title: "Need Hardware Integration?",
          text: "LattiumHR supports plug-and-play API integration with ZKTeco, Essl, Mantra, Matrix, and Hikvision biometric devices.",
        },
      },
    ],
    auditChecklist: [
      { id: "achk-1", stage: "Device Sync", task: "Biometric Hardware Health Check: Ensure all branch fingerprint and face-recognition terminals are online and synced.", done: true },
      { id: "achk-2", stage: "Device Sync", task: "Mobile GPS Accuracy: Test geofence boundaries for field locations and satellite branch offices.", done: true },
      { id: "achk-3", stage: "Roster Setup", task: "Shift Assignment Verification: Confirm all active staff have assigned rotational shifts and rest days.", done: false },
      { id: "achk-4", stage: "Roster Setup", task: "Holiday Calendar Matching: Ensure national and state regional festival holidays are mapped to branch rosters.", done: false },
      { id: "achk-5", stage: "Daily Tracking", task: "Missing Punch Resolution: Notify employees with single punch-ins to submit regularization requests before cutoff.", done: false },
      { id: "achk-6", stage: "Daily Tracking", task: "Late Mark & Half-Day Audit: Verify grace period triggers and automated penalty calculations.", done: false },
      { id: "achk-7", stage: "Overtime Audit", task: "Overtime Hours Authorization: Require department head digital sign-off on all logged overtime hours.", done: false },
      { id: "achk-8", stage: "Overtime Audit", task: "Night Shift Allowance Check: Ensure cross-midnight shifts are properly credited with night premiums.", done: false },
      { id: "achk-9", stage: "Payroll Cutoff", task: "Loss of Pay (LOP) Lock: Synchronize verified unapproved absences directly to payroll deduction register.", done: false },
      { id: "achk-10", stage: "Payroll Cutoff", task: "Manager Sign-off: Collect final timesheet approval from division heads before payroll freeze.", done: false },
    ],
    faqs: [
      {
        id: "faq-0",
        q: "How does biometric machine synchronization work with cloud HRMS?",
        a: "LattiumHR utilizes lightweight IoT middleware installed on your local network or direct cloud-connected biometric turnstiles. When an employee clocks in, the punch timestamp and employee ID are encrypted and transmitted to the cloud HRMS within 2 seconds.",
      },
      {
        id: "faq-1",
        q: "What is the legal overtime wage rate under the Factories Act?",
        a: "Under Section 59 of the Factories Act 1948, any worker who works for more than 9 hours on any day or more than 48 hours in any week is entitled to wages at twice their normal rate of pay (2x Basic + DA).",
      },
      {
        id: "faq-2",
        q: "How does GPS geofencing protect field employee privacy?",
        a: "LattiumHR geofencing only checks the employee's location coordinate at the exact instant they press 'Clock In' or 'Clock Out'. It does not track continuous GPS location throughout the day, preserving battery life and respecting personal privacy.",
      },
      {
        id: "faq-3",
        q: "How are night shift hours credited when a shift crosses midnight?",
        a: "LattiumHR automatically detects shifts spanning two calendar days (e.g. 10 PM to 6 AM). The entire shift and applicable night premiums are attributed to the originating shift date, preventing timesheet fragmentation.",
      },
    ],
    sidebarCTA: {
      title: "Sync Biometric & Shifts",
      desc: "Integrate gate hardware, mobile geofencing, and automated overtime rules with zero data lag.",
    },
  },

  // 4. RECRUITMENT & HIRING GUIDE
  "recruitment-management-guide": {
    slug: "recruitment-management-guide",
    title: "Recruitment & Hiring Operations Guide",
    subtitle: "Structured hiring funnels, scorecard evaluations, digital offer rollouts, and 94%+ joining conversion.",
    category: "Hiring & Culture",
    readTime: "11 min read",
    updatedDate: "Updated for Financial Year 2025–2026",
    badge: "Talent Velocity",
    accentColor: "#b43f70",
    author: {
      name: "LattiumHR Talent Practice",
      role: "Reviewed by Executive Talent Acquisition Leaders",
      avatar: "LT",
    },
    heroFlow: [
      { step: "Stage 01", title: "Sourcing & Pipelines", desc: "Multi-channel job board publishing, automated candidate parsing, and unified ATS pipelines." },
      { step: "Stage 02", title: "Structured Evaluations", desc: "Collaborative interview scorecards, skills assessments, and bias-free candidate rankings." },
      { step: "Stage 03", title: "Offer & Pre-Boarding", desc: "Dynamic compensation templates, e-signatures, and pre-boarding engagement to prevent drop-offs." },
    ],
    toc: [
      { id: "what-is-recruitment", label: "1. What is Modern Talent Acquisition?" },
      { id: "why-recruitment-matters", label: "2. The True Cost of Slow Hiring & Ghosting" },
      { id: "recruitment-stages", label: "3. The 5-Stage Modern Hiring Funnel" },
      { id: "scorecard-framework", label: "4. Candidate Scorecards & Bias Reduction" },
      { id: "offer-letter-workflows", label: "5. Digital Offer Letters & Compensation Slabs" },
      { id: "preboarding-retention", label: "6. Pre-Boarding Engagement & Drop-off Prevention" },
      { id: "interactive-checklist", label: "7. Interactive Hiring Quality Checklist" },
      { id: "ats-vs-manual", label: "8. Disconnected Job Portals vs Unified ATS" },
      { id: "faqs", label: "9. Frequently Asked Questions" },
    ],
    sections: [
      {
        id: "what-is-recruitment",
        title: "1. What is Modern Talent Acquisition?",
        paragraphs: [
          "Modern talent acquisition goes far beyond sifting through email resumes and posting jobs on disparate portals. It is an end-to-end operational engine designed to identify, evaluate, and convert high-performing talent at high velocity.",
          "An integrated Applicant Tracking System (ATS) centralizes candidate profiles from LinkedIn, job boards, and employee referrals into a structured pipeline, enabling collaborative interview feedback and data-driven hiring decisions.",
        ],
        callout: {
          title: "Speed Matters",
          text: "Top candidates remain on the market for an average of just 10 days. Slow feedback cycles and multi-day offer approvals cause companies to lose 60% of premium talent to faster competitors.",
        },
      },
      {
        id: "why-recruitment-matters",
        title: "2. The True Cost of Slow Hiring & Ghosting",
        paragraphs: [
          "Traditional recruiting suffers from high friction, inconsistent evaluation standards, and candidate drop-offs during notice periods:",
        ],
        bullets: [
          "Cost of Vacancy: An unfilled revenue-generating role costs an average of 3x the employee's daily salary in lost productivity and project delays.",
          "Candidate Notice Period Ghosting: Up to 38% of candidates in competitive sectors hold multiple counter-offers and fail to join on Day 1 without active pre-boarding.",
          "Subjective Interview Bias: Unstructured interviews rely on 'gut feeling' rather than objective competencies, leading to a 42% 12-month mis-hire rate.",
          "Administrative Overhead: Recruiters waste over 15 hours each week coordinating interview schedules and drafting offer letters manually.",
        ],
        callout: {
          title: "Conversion Impact",
          text: "Standardizing structured interview scorecards and automated offer rollouts increases offer-to-joining conversion ratios from 71% to over 94%.",
        },
      },
      {
        id: "recruitment-stages",
        title: "3. The 5-Stage Modern Hiring Funnel",
        paragraphs: [
          "High-velocity talent teams organize hiring pipelines into five continuous milestones:",
        ],
        table: {
          headers: ["Stage", "Primary Activity", "Target Velocity & Metrics"],
          rows: [
            { col1: "1. Sourcing & Requisition", col2: "Job board distribution, employee referrals, and resume parsing.", col3: "First qualified candidates within 48 hours of requisition approval." },
            { col1: "2. Structured Screening", col2: "Automated knock-out questionnaires and 20-min recruiter phone screens.", col3: "Screening completion within 3 business days." },
            { col1: "3. Competency Assessment", col2: "Standardized technical exercises and panel interview scorecards.", col3: "Zero subjective hiring; all scores logged within 24 hours." },
            { col1: "4. Offer Generation & Approval", col2: "Dynamic CTC breakdowns, dual signoff, and e-signature delivery.", col3: "Offer sent within 6 hours of final interview decision." },
            { col1: "5. Pre-Boarding Vault", col2: "KYC collection, tech asset survey, and leadership welcome video.", col3: "95%+ pre-boarding document completion before Day 1." },
          ],
        },
        callout: {
          title: "Time-to-Hire",
          text: "Eliminating manual email scheduling through self-booking interview links cuts the average time-to-hire from 38 days to under 16 days.",
        },
      },
      {
        id: "scorecard-framework",
        title: "4. Candidate Scorecards & Bias Reduction",
        paragraphs: [
          "Structured scorecards ensure every interviewer evaluates candidates against identical, pre-defined rubrics:",
          "Instead of asking 'Did you like the candidate?', interviewers grade specific competencies (e.g. Problem Solving, System Design, Cultural Values) on a 1-to-5 scale with mandatory supporting notes.",
        ],
        callout: {
          title: "Objective Hiring",
          text: "Scorecard-based hiring reduces gender and background bias by 65% and yields higher 90-day retention rates across technical and sales teams.",
        },
      },
      {
        id: "offer-letter-workflows",
        title: "5. Digital Offer Letters & Compensation Slabs",
        paragraphs: [
          "Generating legally sound offer letters with dynamic CTC breakdown tables should take minutes, not hours:",
        ],
        bullets: [
          "Automated CTC Calculations: Pre-built templates automatically calculate Basic, HRA, statutory employer EPF, and annual CTC based on approved salary bands.",
          "Maker-Checker Signoff: Department heads and CFOs approve compensation packages with a single click before the offer is dispatched.",
          "Mobile-Friendly E-Signatures: Candidates review and legally execute their offer letters directly from their smartphone via Aadhaar or digital e-sign.",
          "Instant Expiry Windows: Setting a 48-hour or 72-hour acceptance window drives candidate urgency and shortens decision cycles.",
        ],
        callout: {
          title: "Legal Enforceability",
          text: "Digital signatures executed under Section 10A of the Information Technology Act 2000 are legally equivalent to wet-ink signatures across Indian jurisdictions.",
        },
      },
      {
        id: "preboarding-retention",
        title: "6. Pre-Boarding Engagement & Drop-off Prevention",
        paragraphs: [
          "The 30-to-90 day notice period is the danger zone where candidates receive competing offers. Modern HRMS keeps candidates warmly engaged:",
          "Through LattiumHR's candidate portal, new hires complete digital KYC verification, choose company laptop specifications, and receive welcome notes from their team buddy before Day 1.",
        ],
        callout: {
          title: "Ghosting Shield",
          text: "Maintaining bi-weekly digital touchpoints and early KYC completion drops candidate notice-period ghosting by over 78%.",
        },
      },
      {
        id: "interactive-checklist",
        title: "7. Interactive Hiring Quality Checklist",
        paragraphs: [
          "Ensure your recruitment pipeline operates at peak rigor across every open job requisition:",
        ],
        callout: {
          title: "Audit Rigor",
          text: "Completing pre-employment credential checks before issuing binding offer letters prevents embarrassing post-joining disputes.",
        },
      },
      {
        id: "ats-vs-manual",
        title: "8. Disconnected Job Portals vs Unified ATS",
        paragraphs: [
          "Managing candidate resumes across disjointed inbox folders, WhatsApp messages, and static spreadsheets causes data chaos and compliance risks.",
          "LattiumHR's unified talent engine links job postings, candidate pipelines, scorecard feedback, offer rollouts, and employee onboarding into one seamless flow.",
        ],
        callout: {
          title: "Single Source of Truth",
          text: "When an accepted candidate arrives on Day 1, all interview notes, KYC files, and compensation slabs convert into an active employee record with zero re-entry.",
        },
      },
      {
        id: "faqs",
        title: "9. Frequently Asked Questions",
        paragraphs: [
          "Common questions regarding talent pipelines, offer conversion, and recruitment operations:",
        ],
        callout: {
          title: "Scale Your Hiring",
          text: "Schedule a walkthrough to see how LattiumHR ATS streamlines high-velocity hiring for fast-growing mid-market companies.",
        },
      },
    ],
    auditChecklist: [
      { id: "rchk-1", stage: "Requisition", task: "Role Requisition Approval: Verify salary band, headcount justification, and hiring manager budget signoff.", done: true },
      { id: "rchk-2", stage: "Requisition", task: "Job Description Standard: Ensure gender-neutral language, clear deliverables, and statutory eligibility criteria.", done: true },
      { id: "rchk-3", stage: "Sourcing", task: "Multi-Channel Distribution: Publish to company careers page, LinkedIn, and internal employee referral portal.", done: false },
      { id: "rchk-4", stage: "Screening", task: "Knock-out Screening: Configure automated filters for mandatory certifications, location, and notice periods.", done: false },
      { id: "rchk-5", stage: "Evaluation", task: "Scorecard Calibration: Align all interviewers on standardized grading rubrics prior to candidate calls.", done: false },
      { id: "rchk-6", stage: "Evaluation", task: "24-Hour Feedback SLA: Enforce mandatory logging of written interview feedback within 24 hours of interview completion.", done: false },
      { id: "rchk-7", stage: "Offer Rollout", task: "Compensation Audit: Confirm proposed CTC aligns with internal equity and department budget bands.", done: false },
      { id: "rchk-8", stage: "Offer Rollout", task: "Digital Offer Dispatch: Send secure, time-bound offer letter with embedded e-signature link.", done: false },
      { id: "rchk-9", stage: "Pre-Boarding", task: "Background Verification (BGV): Initiate educational, previous employment, and criminal record screening.", done: false },
      { id: "rchk-10", stage: "Pre-Boarding", task: "Buddy Allocation & Welcome: Assign team peer buddy and share Day-1 reporting schedule with new hire.", done: false },
    ],
    faqs: [
      {
        id: "faq-0",
        q: "How do structured interview scorecards eliminate hiring bias?",
        a: "Scorecards require interviewers to evaluate candidates against objective, pre-determined competencies and concrete behavioral anchors rather than vague impressions. This prevents affinity bias, halo effects, and inconsistent questioning across candidates.",
      },
      {
        id: "faq-1",
        q: "How can digital offer letters reduce candidate ghosting before Day 1?",
        a: "Digital offers enable instant mobile review and e-signature within hours instead of days. Coupled with pre-boarding candidate portals (tech asset selection, KYC document upload, team welcome videos), candidates feel invested and are 78% less likely to entertain competing counter-offers.",
      },
      {
        id: "faq-2",
        q: "Are e-signatures on employment contracts legally binding under the IT Act?",
        a: "Yes. Under Section 10A of the Information Technology Act 2000, digital contracts and employment agreements executed with electronic signatures are legally valid and enforceable in courts of law throughout India.",
      },
      {
        id: "faq-3",
        q: "What pre-boarding checks are essential before formal employee joining?",
        a: "Essential pre-boarding checks include verifying identity credentials (PAN and Aadhaar), validating educational degrees, confirming past employment relieving letters, checking UAN service history, and running reference checks with previous supervisors.",
      },
    ],
    sidebarCTA: {
      title: "Streamline Hiring",
      desc: "Source candidates, evaluate with scorecards, and roll out digital offers with 94%+ conversion.",
    },
  },

  // 5. EMPLOYEE ONBOARDING GUIDE
  "employee-onboarding-guide": {
    slug: "employee-onboarding-guide",
    title: "Employee Onboarding & Lifecycle Guide",
    subtitle: "Digital KYC document vaults, IT asset provisioning, 30-60-90 ramp plans, and buddy systems.",
    category: "Hiring & Culture",
    readTime: "12 min read",
    updatedDate: "Updated for Financial Year 2025–2026",
    badge: "People & Culture",
    accentColor: "#8b5cf6",
    author: {
      name: "LattiumHR People Operations",
      role: "Reviewed by Employee Experience Strategists",
      avatar: "LT",
    },
    heroFlow: [
      { step: "Stage 01", title: "Pre-Day 1 Document Vault", desc: "Digital collection of PAN, Aadhaar, bank records, and educational credentials before arrival." },
      { step: "Stage 02", title: "Day 1 Welcome & Setup", desc: "Automated IT credential provisioning, asset handover signoff, and team buddy introduction." },
      { step: "Stage 03", title: "30-60-90 Day Milestones", desc: "Structured performance milestones, manager 1-on-1 check-ins, and probation review signoffs." },
    ],
    toc: [
      { id: "what-is-onboarding", label: "1. What is Strategic Employee Onboarding?" },
      { id: "why-onboarding-matters", label: "2. The Retention Impact of First 90 Days" },
      { id: "onboarding-pillars", label: "3. The 4 Pillars of Seamless Onboarding" },
      { id: "milestone-framework", label: "4. The 30-60-90 Day Milestone Blueprint" },
      { id: "kyc-asset-management", label: "5. Digital KYC Document Vault & IT Assets" },
      { id: "cross-team-workflow", label: "6. Cross-Departmental Onboarding Handoffs" },
      { id: "interactive-checklist", label: "7. Interactive 90-Day New Hire Checklist" },
      { id: "manual-vs-automated", label: "8. Paperwork Chaos vs Automated Digital Setup" },
      { id: "faqs", label: "9. Frequently Asked Questions" },
    ],
    sections: [
      {
        id: "what-is-onboarding",
        title: "1. What is Strategic Employee Onboarding?",
        paragraphs: [
          "Strategic employee onboarding is the intentional, structured journey of integrating a new hire into an organization's culture, operational workflows, and team cadence.",
          "Unlike traditional onboarding—which often consisted of a frantic Day 1 spent signing paper forms and waiting for IT credentials—modern onboarding begins the moment an offer is accepted and extends across the first 90 days of employment.",
        ],
        callout: {
          title: "Retention Reality",
          text: "Employees who experience a structured, positive onboarding program are 69% more likely to remain with the company for at least 3 years.",
        },
      },
      {
        id: "why-onboarding-matters",
        title: "2. The Retention Impact of First 90 Days",
        paragraphs: [
          "A poor onboarding experience directly triggers early attrition and prolonged time-to-productivity:",
        ],
        bullets: [
          "Early Turnover Shock: Up to 22% of staff turnover occurs within the first 45 days when new hires feel unsupported or overwhelmed.",
          "Prolonged Ramp Time: Without clear role milestones, new employees take up to 8 months to reach full operational productivity.",
          "Lost Administrative Time: HR managers spend 12 hours per new joiner manually verifying paper forms, re-entering bank details, and chasing missing documents.",
          "Cultural Disconnect: Remote and hybrid team members who lack an assigned buddy report feeling isolated within their first two weeks.",
        ],
        callout: {
          title: "Productivity Acceleration",
          text: "Digital onboarding shortens employee ramp-up time by 40%, enabling new hires to contribute meaningfully to core projects within their first two weeks.",
        },
      },
      {
        id: "onboarding-pillars",
        title: "3. The 4 Pillars of Seamless Onboarding",
        paragraphs: [
          "A world-class onboarding framework balances compliance administration with human connection:",
        ],
        table: {
          headers: ["Pillar", "Objective", "Key Activities"],
          rows: [
            { col1: "1. Compliance & KYC", col2: "Verify legal identity and statutory credentials.", col3: "Aadhaar, PAN, PF UAN history, bank account verification, signed NDA." },
            { col1: "2. Operational Provisioning", col2: "Equip employee with physical and digital tools.", col3: "Laptop shipment, email setup, SSO credentials, access card, software licenses." },
            { col1: "3. Role & Goal Clarity", col2: "Establish expected deliverables and success metrics.", col3: "30-60-90 day roadmap, first week project, weekly manager 1-on-1 schedule." },
            { col1: "4. Cultural Integration", col2: "Foster belonging and psychological safety.", col3: "Assigned peer buddy, team welcome lunch, company values walkthrough, CEO AMA." },
          ],
        },
        callout: {
          title: "Balanced Experience",
          text: "Automating administrative paperwork before Day 1 leaves the first day completely free for cultural immersion and team bonding.",
        },
      },
      {
        id: "milestone-framework",
        title: "4. The 30-60-90 Day Milestone Blueprint",
        paragraphs: [
          "Structuring clear milestones replaces vague expectations with transparent performance goals:",
        ],
        tabs: [
          {
            name: "Days 1–30: Absorb & Learn",
            description: "Understanding product architecture, team workflows, and tools.",
            items: [
              { name: "Company Induction", tag: "Day 1", desc: "Company mission, leadership overview, and handbook policy signoffs." },
              { name: "Tool & Workflow Mastery", tag: "Week 2", desc: "Setting up dev environments, CRM access, and internal documentation review." },
              { name: "First Starter Project", tag: "Day 30", desc: "Deliver an initial low-risk project to build execution confidence." },
            ],
          },
          {
            name: "Days 31–60: Collaborate & Execute",
            description: "Taking independent ownership of core job responsibilities.",
            items: [
              { name: "Core Sprint Execution", tag: "Month 2", desc: "Lead team deliverables with regular peer collaboration and standups." },
              { name: "Cross-Functional Syncs", tag: "Month 2", desc: "Shadow sales, customer support, or product teams to build holistic context." },
              { name: "60-Day Pulse Survey", tag: "Day 60", desc: "Gather employee feedback on onboarding friction and team support." },
            ],
          },
          {
            name: "Days 61–90: Autonomy & Review",
            description: "Full operational independence and probation signoff.",
            items: [
              { name: "Independent Ownership", tag: "Month 3", desc: "Manage end-to-end responsibilities with minimal supervisor intervention." },
              { name: "Quarterly OKR Integration", tag: "Month 3", desc: "Align individual key results with departmental quarterly targets." },
              { name: "Formal Probation Signoff", tag: "Day 90", desc: "Manager-HR confirmation meeting to formally conclude probation period." },
            ],
          },
        ],
        callout: {
          title: "Goal Alignment",
          text: "Documenting milestones in LattiumHR gives managers a shared, objective scorecard during the 90-day probation review.",
        },
      },
      {
        id: "kyc-asset-management",
        title: "5. Digital KYC Document Vault & IT Assets",
        paragraphs: [
          "Collecting sensitive employee documents through unencrypted email threads creates serious privacy and compliance hazards.",
          "In LattiumHR, new hires upload documents into an encrypted self-service vault where HR runs automated verification against government databases (NSDL PAN, UIDAI Aadhaar, EPFO UAN).",
        ],
        callout: {
          title: "Asset Handover",
          text: "Digital asset allocation logs record laptop serial numbers, monitor IDs, and security dongles with digital employee acknowledgments.",
        },
      },
      {
        id: "cross-team-workflow",
        title: "6. Cross-Departmental Onboarding Handoffs",
        paragraphs: [
          "Onboarding is a team sport involving HR, IT, Finance, and direct managers. Automated task dependencies ensure nobody drops the baton:",
          "When HR marks 'Offer Accepted', LattiumHR automatically triggers an IT ticket to ship equipment, prompts Finance to register bank accounts for payroll, and alerts the manager to designate a buddy.",
        ],
        callout: {
          title: "Zero Drops",
          text: "Automated cross-departmental notifications eliminate the familiar Day-1 panic of missing laptops or inactive login credentials.",
        },
      },
      {
        id: "interactive-checklist",
        title: "7. Interactive 90-Day New Hire Checklist",
        paragraphs: [
          "Follow this structured roadmap to ensure every new team member is set up for long-term excellence:",
        ],
        callout: {
          title: "Complete Journey",
          text: "Track milestone completion from pre-boarding preparation through Day-90 probation signoff in one unified dashboard.",
        },
      },
      {
        id: "manual-vs-automated",
        title: "8. Paperwork Chaos vs Automated Digital Setup",
        paragraphs: [
          "Paper-based onboarding processes create friction, lost documents, and a disorienting first impression for top talent.",
          "Transitioning to automated onboarding reflects modern organizational maturity and signals respect for employee time.",
        ],
        callout: {
          title: "First Impressions",
          text: "93% of new hires state that their Day-1 onboarding experience directly decided whether they felt proud to work at the organization.",
        },
      },
      {
        id: "faqs",
        title: "9. Frequently Asked Questions",
        paragraphs: [
          "Practical questions regarding employee onboarding, document vaults, and probation management:",
        ],
        callout: {
          title: "Elevate Your Onboarding",
          text: "See how LattiumHR can automate new hire workflows for your distributed team.",
        },
      },
    ],
    auditChecklist: [
      { id: "ochk-1", stage: "Pre-Boarding", task: "KYC Document Vault: Receive and verify PAN, Aadhaar, educational certificates, and relieving letter.", done: true },
      { id: "ochk-2", stage: "Pre-Boarding", task: "IT Asset Provisioning: Dispatch configured laptop, security badge, and company email credentials.", done: true },
      { id: "ochk-3", stage: "Day 1", task: "Welcome Orientation: Conduct company culture induction, policy handbook signoff, and team introduction.", done: false },
      { id: "ochk-4", stage: "Day 1", task: "Buddy Allocation: Connect new hire with their designated peer buddy for daily informal check-ins.", done: false },
      { id: "ochk-5", stage: "Week 1", task: "Manager Alignment: Establish 30-60-90 day performance expectations and first starter project.", done: false },
      { id: "ochk-6", stage: "Day 30", task: "First Month Check-in: Review starter project deliverables and assess tool/workflow comfort.", done: false },
      { id: "ochk-7", stage: "Day 30", task: "Statutory PF/ESI Registration: Link employee UAN with EPFO establishment code and generate ESIC IP card.", done: false },
      { id: "ochk-8", stage: "Day 60", task: "Mid-Probation Pulse: Gather feedback from both manager and new hire on role clarity and collaboration.", done: false },
      { id: "ochk-9", stage: "Day 90", task: "Probation Assessment: Formal performance evaluation and issuance of confirmation letter.", done: false },
      { id: "ochk-10", stage: "Day 90", task: "Onboarding Feedback Loop: Collect anonymous onboarding survey to continually refine process.", done: false },
    ],
    faqs: [
      {
        id: "faq-0",
        q: "What statutory KYC documents must be collected from new joiners?",
        a: "Mandatory statutory documents in India include the employee's PAN card (for TDS reporting), Aadhaar card (for identity and PF linking), previous employer relieving letter/Form 16, bank account passbook/cancelled cheque, educational certificates, and UAN (Universal Account Number) declaration.",
      },
      {
        id: "faq-1",
        q: "How does digital pre-onboarding shorten time-to-productivity?",
        a: "Digital pre-onboarding allows candidates to complete document uploads, read company policies, and choose IT gear before their first day. When Day 1 arrives, equipment is ready and all credentials work, allowing new hires to begin training immediately.",
      },
      {
        id: "faq-2",
        q: "How should company hardware and IT assets be tracked upon joining?",
        a: "Assets should be cataloged with unique serial numbers, asset tags, configuration details, and replacement values in an integrated HRMS asset ledger. Employees digitally sign an equipment custody receipt upon delivery.",
      },
      {
        id: "faq-3",
        q: "What makes a 30-60-90 day onboarding review framework effective?",
        a: "The 30-60-90 day framework breaks down an overwhelming new role into bite-sized, measurable phases: 'Learn & Absorb' in Month 1, 'Collaborate & Execute' in Month 2, and 'Lead & Own' in Month 3. This provides complete transparency during probation reviews.",
      },
    ],
    sidebarCTA: {
      title: "Deliver Great Onboarding",
      desc: "Delight new hires with digital document collection, automated asset tracking, and 90-day roadmaps.",
    },
  },

  // 6. EXPENSE MANAGEMENT GUIDE
  "expense-management-guide": {
    slug: "expense-management-guide",
    title: "Expense Management & Corporate Reimbursements Guide",
    subtitle: "OCR receipt scanning, per-diem travel policies, mileage logs, and 1-click payroll payouts.",
    category: "Operations & Compliance",
    readTime: "9 min read",
    updatedDate: "Updated for Financial Year 2025–2026",
    badge: "Finance Ops",
    accentColor: "#10b981",
    author: {
      name: "LattiumHR Finance Advisory",
      role: "Reviewed by Corporate Treasurers & Tax Auditors",
      avatar: "LT",
    },
    heroFlow: [
      { step: "Stage 01", title: "Mobile OCR Receipt Capture", desc: "Snap bills on mobile; smart OCR reads merchant, date, tax, and amounts automatically." },
      { step: "Stage 02", title: "Policy & Approval Routing", desc: "Auto-validate per-diem caps and route claims through multi-tier manager hierarchies." },
      { step: "Stage 03", title: "1-Click Payroll Reimbursement", desc: "Disburse approved expense claims directly alongside monthly salary with zero double-entry." },
    ],
    toc: [
      { id: "what-is-expense", label: "1. What is Corporate Expense Management?" },
      { id: "why-expense-matters", label: "2. Why Uncontrolled Expenses Drain Cash Flow" },
      { id: "expense-categories", label: "3. Core Corporate Expense Categories" },
      { id: "per-diem-rules", label: "4. Per-Diem, Mileage & Travel Policy Rules" },
      { id: "ocr-fraud-detection", label: "5. OCR Optical Scanning & Fraud Prevention" },
      { id: "approval-hierarchy", label: "6. Multi-Level Manager Approval Trees" },
      { id: "interactive-checklist", label: "7. Interactive Monthly Expense Checklist" },
      { id: "paper-vs-cloud", label: "8. Paper Claims & Excel vs Cloud Automation" },
      { id: "faqs", label: "9. Frequently Asked Questions" },
    ],
    sections: [
      {
        id: "what-is-expense",
        title: "1. What is Corporate Expense Management?",
        paragraphs: [
          "Corporate expense management encompasses the systems, approval hierarchies, and reconciliation processes used to track and reimburse employee business expenditures.",
          "From client meals and inter-city travel to software subscriptions and field mileage, modern expense management automates receipt digitization, policy compliance checks, and disbursement workflows.",
        ],
        callout: {
          title: "Cash Flow Control",
          text: "Unmonitored corporate spending accounts for 8% to 14% in avoidable business overhead. Real-time policy guardrails prevent over-budget claims before submission.",
        },
      },
      {
        id: "why-expense-matters",
        title: "2. Why Uncontrolled Expenses Drain Cash Flow",
        paragraphs: [
          "Manual expense reporting creates significant friction for employees and finance controllers alike:",
        ],
        bullets: [
          "Delayed Reimbursements: Employees waiting 45 to 60 days for out-of-pocket reimbursements experience frustration and personal cash flow stress.",
          "Lost Receipts & Tax Leaking: Paper receipts fade or get lost, causing companies to miss out on claiming Input Tax Credit (ITC) on commercial GST invoices.",
          "Duplicate & Inflated Claims: Without automated duplicate-receipt matching, manual reviewers miss overlapping claims for identical Uber rides or meals.",
          "Finance Team Burnout: Accounts payable spends days verifying physical receipts and manually keying amounts into accounting ledgers.",
        ],
        callout: {
          title: "Efficiency Dividend",
          text: "Automated OCR receipt scanning and direct payroll reimbursement cut expense claim processing costs by over 72% per report.",
        },
      },
      {
        id: "expense-categories",
        title: "3. Core Corporate Expense Categories",
        paragraphs: [
          "Establish distinct spending categories with customized policy limits and mandatory documentation rules:",
        ],
        table: {
          headers: ["Category", "Policy Cap Guidelines", "Documentation Requirement"],
          rows: [
            { col1: "Travel & Lodging", col2: "Tier 1: ₹4,500/night | Tier 2: ₹3,000/night", col3: "Mandatory GST tax invoice with corporate entity name." },
            { col1: "Local Mileage", col2: "₹10/km (4-wheeler) | ₹5/km (2-wheeler)", col3: "GPS start-to-end trip odometer log via mobile app." },
            { col1: "Client Entertainment", col2: "₹1,500 per attendee", col3: "Itemized restaurant bill with listed client attendees and business purpose." },
            { col1: "Remote Work & Internet", col2: "₹1,200 / month broadband allowance", col3: "Monthly utility invoice or fixed non-taxable perk." },
          ],
        },
        callout: {
          title: "Tax Eligibility",
          text: "Business expense reimbursements supported by valid commercial vouchers are 100% tax-free for employees and fully deductible as corporate expenses.",
        },
      },
      {
        id: "per-diem-rules",
        title: "4. Per-Diem, Mileage & Travel Policy Rules",
        paragraphs: [
          "Replacing tedious individual meal receipt tracking with standardized daily per-diem allowances simplifies travel administration:",
          "LattiumHR automatically adjusts per-diem rates based on city tiers (e.g. Mumbai/Bengaluru vs. tier-3 industrial hubs) without requiring employees to retain minor tea and coffee receipts.",
        ],
        callout: {
          title: "Fair Allowance",
          text: "Per-diem rates eliminate hours of petty receipt auditing while providing traveling staff with clear, predictable daily budgets.",
        },
      },
      {
        id: "ocr-fraud-detection",
        title: "5. OCR Optical Scanning & Fraud Prevention",
        paragraphs: [
          "Mobile OCR (Optical Character Recognition) extracts merchant names, invoice dates, GST numbers, and total amounts directly from phone camera photos:",
          "LattiumHR's AI fraud guard automatically detects duplicate receipt uploads, altered invoice totals, and purchases made on non-working days, alerting managers prior to approval.",
        ],
        callout: {
          title: "Fraud Prevention",
          text: "Automated duplicate image hashing and metadata analysis prevent employees from submitting identical receipts across different expense periods.",
        },
      },
      {
        id: "approval-hierarchy",
        title: "6. Multi-Level Manager Approval Trees",
        paragraphs: [
          "Configure flexible routing rules based on claim amounts, employee designations, and cost centers:",
          "Claims under ₹2,000 require only immediate manager approval, while claims exceeding ₹25,000 automatically escalate to the Finance Controller or Department Head.",
        ],
        callout: {
          title: "Fast Turnaround",
          text: "Mobile-enabled approvals reduce average expense claim turnaround from 21 days down to under 48 hours.",
        },
      },
      {
        id: "interactive-checklist",
        title: "7. Interactive Monthly Expense Checklist",
        paragraphs: [
          "Follow this finance checklist to audit and disburse corporate expense claims before monthly payroll cut-off:",
        ],
        callout: {
          title: "Reimbursement Sync",
          text: "Approved expense claims flow directly into the salary payment batch as non-taxable additions, eliminating separate NEFT bank fee overhead.",
        },
      },
      {
        id: "paper-vs-cloud",
        title: "8. Paper Claims & Excel vs Cloud Automation",
        paragraphs: [
          "Stapling faded physical receipts to paper expense vouchers wastes storage space and leaves finance blind to departmental spending trends.",
          "Cloud expense management provides instant visibility into travel expenditure, vendor analytics, and budget burn rates.",
        ],
        callout: {
          title: "Complete Visibility",
          text: "CFOs gain real-time visibility into company-wide operational expenses instead of discovering budget overruns weeks after month-end.",
        },
      },
      {
        id: "faqs",
        title: "9. Frequently Asked Questions",
        paragraphs: [
          "Answers to common corporate reimbursement and tax compliance questions:",
        ],
        callout: {
          title: "Take Control of Spending",
          text: "Discover how LattiumHR unites travel claims, mileage tracking, and payroll disbursements into one clean interface.",
        },
      },
    ],
    auditChecklist: [
      { id: "echk-1", stage: "Policy Setup", task: "Category Spending Caps: Define per-diem, hotel, and mileage ceilings for Tier-1, Tier-2, and Tier-3 cities.", done: true },
      { id: "echk-2", stage: "Policy Setup", task: "Approval Tree Configuration: Set auto-approval thresholds and multi-tier approval limits by designation.", done: true },
      { id: "echk-3", stage: "Receipt Audit", task: "OCR Data Verification: Ensure invoice totals, dates, and vendor GSTINs are clearly legible.", done: false },
      { id: "echk-4", stage: "Receipt Audit", task: "Duplicate Claim Check: Review flagged claims for matching receipt images or identical timestamps.", done: false },
      { id: "echk-5", stage: "Manager Review", task: "Business Purpose Signoff: Confirm manager validation of client attendees and project billing codes.", done: false },
      { id: "echk-6", stage: "Finance Review", task: "GST Input Tax Credit (ITC) Verification: Validate corporate GSTIN on major hotel and flight vouchers.", done: false },
      { id: "echk-7", stage: "Payroll Sync", task: "Non-Taxable Addition Lock: Transfer approved claims to payroll module as tax-exempt salary additions.", done: false },
      { id: "echk-8", stage: "Disbursement", task: "Combined Salary & Expense Payout: Release combined reimbursement batch via direct bank NEFT.", done: false },
      { id: "echk-9", stage: "Accounting", task: "General Ledger Export: Post categorized expense debit entries to corporate accounting ERP.", done: false },
      { id: "echk-10", stage: "Governance", task: "Quarterly Audit Sampling: Conduct random audit of 10% high-value travel vouchers for policy compliance.", done: false },
    ],
    faqs: [
      {
        id: "faq-0",
        q: "Can employee business expense claims be reimbursed directly with monthly payroll?",
        a: "Yes. LattiumHR integrates expense management directly with the payroll engine. Approved reimbursements appear as non-taxable additions on the monthly payslip and are disbursed in the same bank transfer batch, avoiding separate transaction charges.",
      },
      {
        id: "faq-1",
        q: "How does OCR receipt scanning prevent duplicate or fraudulent claims?",
        a: "LattiumHR OCR extracts transaction timestamps, merchant names, invoice numbers, and totals from receipt photos. The system performs cryptographic image hashing and checks against historical records to immediately block duplicate submissions.",
      },
      {
        id: "faq-2",
        q: "What are the tax implications of per-diem and travel food allowances?",
        a: "Legitimate per-diem allowances paid to employees on official travel are non-taxable under Section 10(14) of the Income Tax Act provided they align with reasonable company travel guidelines and the employee was away from their normal place of duty.",
      },
      {
        id: "faq-3",
        q: "How should multi-tier approval limits be configured for high-value purchases?",
        a: "Best practice is to assign tiered approval bands: Team Lead approval for claims up to ₹5,000; Department Head approval for claims between ₹5,001 and ₹25,000; and CFO/Finance Director signoff for claims exceeding ₹25,000.",
      },
    ],
    sidebarCTA: {
      title: "Control Business Expenses",
      desc: "Receipt OCR capture, automated travel per-diems, and 1-click reimbursement with monthly payroll.",
    },
  },

  // 7. STATUTORY COMPLIANCE GUIDE
  "statutory-compliance-guide": {
    slug: "statutory-compliance-guide",
    title: "Statutory Compliance & Labor Laws Guide",
    subtitle: "EPF Act, ESIC compliance, Payment of Gratuity, Bonus Act, and state Shops & Establishments rules.",
    category: "Payroll & Tax",
    readTime: "13 min read",
    updatedDate: "Updated for Financial Year 2025–2026",
    badge: "Audit Protection",
    accentColor: "#ea580c",
    author: {
      name: "LattiumHR Legal Compliance",
      role: "Reviewed by Certified Labour Law Advocates",
      avatar: "LT",
    },
    heroFlow: [
      { step: "Stage 01", title: "Federal & State Slabs", desc: "Pre-configured EPF, ESIC, Professional Tax, and Minimum Wage rules across all 28 states." },
      { step: "Stage 02", title: "Automated Challans", desc: "Generate EPFO ECR text files, ESIC monthly returns, and state PT challan drafts before the 15th." },
      { step: "Stage 03", title: "Zero-Penalty Audits", desc: "Maintain tamper-proof digital statutory registers ready for labor department inspections." },
    ],
    toc: [
      { id: "what-is-compliance", label: "1. What is Indian Labor Statutory Compliance?" },
      { id: "why-compliance-matters", label: "2. The Heavy Cost of Non-Compliance & Penalties" },
      { id: "core-labor-acts", label: "3. Core Labor Acts & Employer Obligations" },
      { id: "statutory-deadlines", label: "4. Monthly Statutory Remittance Deadlines" },
      { id: "fnf-settlement-rules", label: "5. Full & Final Settlement (FnF) Governance" },
      { id: "inspection-registers", label: "6. Statutory Registers & Inspection Readiness" },
      { id: "interactive-checklist", label: "7. Interactive Labor Law Audit Checklist" },
      { id: "manual-vs-automated", label: "8. Manual Compliance vs Automated HRMS" },
      { id: "faqs", label: "9. Frequently Asked Questions" },
    ],
    sections: [
      {
        id: "what-is-compliance",
        title: "1. What is Indian Labor Statutory Compliance?",
        paragraphs: [
          "Statutory compliance in human resources refers to the legal framework within which organizations must operate to protect employee welfare, fair compensation, workplace safety, and tax obligations.",
          "In India, labor regulations operate under a concurrent framework involving both Central parliamentary acts (EPF, ESIC, Gratuity, Bonus) and State-specific statutes (Shops & Establishments, Professional Tax, Minimum Wages, and Labor Welfare Fund).",
        ],
        callout: {
          title: "Legal Rigor",
          text: "Operating across multiple states requires navigating distinct local rules, varying holiday mandates, and disparate Professional Tax slabs under one corporate umbrella.",
        },
      },
      {
        id: "why-compliance-matters",
        title: "2. The Heavy Cost of Non-Compliance & Penalties",
        paragraphs: [
          "Failing to observe statutory mandates triggers punitive consequences that impact business reputation and financial continuity:",
        ],
        bullets: [
          "Compounding Penal Damages: Late EPF and ESIC remittances attract damages under Section 14B ranging from 5% to 25% per annum plus 12% penal interest under Section 7Q.",
          "Personal Director Liability: Continued defaults in statutory provident fund or state insurance deposits can lead to non-bailable warrants and personal prosecution of company directors.",
          "M&A and Funding Roadblocks: Venture capital investors and acquirers conduct thorough legal due diligence. Unresolved statutory lapses immediately delay or derail funding rounds.",
          "Labor Department Inspections: Unmaintained registers or minimum wage underpayments invite formal show-cause notices and operational shutdowns.",
        ],
        callout: {
          title: "Zero-Penalty Assurance",
          text: "Automating payroll deductions and statutory file generation inside LattiumHR guarantees a 100% on-time filing track record with zero audit fines.",
        },
      },
      {
        id: "core-labor-acts",
        title: "3. Core Labor Acts & Employer Obligations",
        paragraphs: [
          "Every modern employer must adhere to four foundational pillars of statutory labor legislation:",
        ],
        table: {
          headers: ["Statutory Act", "Applicability Threshold", "Core Employer Obligations"],
          rows: [
            { col1: "EPF Act 1952", col2: "Establishments with 20+ staff", col3: "12% matching contribution on Basic (+DA) up to ₹15,000 wage ceiling (or uncapped). File ECR by 15th." },
            { col1: "ESIC Act 1948", col2: "Establishments with 10+ staff", col3: "0.75% employee + 3.25% employer contribution on gross wages ≤ ₹21,000/month. File by 15th." },
            { col1: "Payment of Gratuity Act 1972", col2: "Establishments with 10+ staff", col3: "15 days basic salary for every year of completed continuous service (5+ years). Max ₹20 Lakhs." },
            { col1: "Payment of Bonus Act 1965", col2: "Establishments with 20+ staff", col3: "Mandatory annual statutory bonus between 8.33% and 20% of basic wages for staff earning ≤ ₹21,000/mo." },
          ],
        },
        callout: {
          title: "Universal Applicability",
          text: "Once an establishment reaches the 20-employee threshold for EPF, coverage continues permanently even if headcount temporarily drops below 20.",
        },
      },
      {
        id: "statutory-deadlines",
        title: "4. Monthly Statutory Remittance Deadlines",
        paragraphs: [
          "Maintain this master compliance calendar to ensure on-time statutory remittances every single month:",
        ],
        table: {
          headers: ["Deadline Day", "Statutory Head", "Filing & Remittance Requirement"],
          rows: [
            { col1: "7th of the month", col2: "TDS (Tax Deducted at Source)", col3: "Deposit employee monthly income tax deductions via Challan ITNS 281." },
            { col1: "15th of the month", col2: "EPFO (Provident Fund)", col3: "Upload monthly Electronic Challan cum Return (ECR) text file and remit payment." },
            { col1: "15th of the month", col2: "ESIC (Employee Health)", col3: "File monthly contribution return on the ESIC unified portal and pay dues." },
            { col1: "10th – 20th of the month", col2: "Professional Tax (PT)", col3: "Remit state PT dues according to state schedules (10th in TS/AP, 20th in Karnataka, end of month in MH)." },
          ],
        },
        callout: {
          title: "Calendar Reminder",
          text: "LattiumHR automatically triggers in-app reminders and pre-generates statutory challans 5 days before statutory deadlines.",
        },
      },
      {
        id: "fnf-settlement-rules",
        title: "5. Full & Final Settlement (FnF) Governance",
        paragraphs: [
          "Handling employee separations with statutory rigor protects the business against post-exit labor court disputes:",
          "A compliant FnF settlement encapsulates unpaid salary days, notice period buyouts, earned leave encashment, gratuity entitlements, and statutory bonus provisions.",
        ],
        callout: {
          title: "Settlement Timeline",
          text: "Under modern labor governance guidelines, FnF settlements and statutory clearance documents should be processed within 7 to 10 working days of the employee's last working day.",
        },
      },
      {
        id: "inspection-registers",
        title: "6. Statutory Registers & Inspection Readiness",
        paragraphs: [
          "Labor enforcement officers routinely inspect formal workplace registers. LattiumHR generates digital, download-ready registers:",
        ],
        bullets: [
          "Form A: Employee Register (Personal records, PAN, UAN, date of joining, designation).",
          "Form B: Wage Register (Gross salary, allowances, statutory deductions, net payable).",
          "Form C: Loan and Recovery Register (Deductions for advances, damage, or loss).",
          "Form D: Attendance Register (Daily punch records, overtime hours, weekly offs).",
        ],
        callout: {
          title: "Digital Formats",
          text: "Under the Ease of Compliance Rules 2017, maintaining statutory registers in digital cloud formats is legally accepted by Central and State labor commissioners.",
        },
      },
      {
        id: "interactive-checklist",
        title: "7. Interactive Labor Law Audit Checklist",
        paragraphs: [
          "Conduct this comprehensive internal audit to guarantee zero statutory gaps across your organization:",
        ],
        callout: {
          title: "Annual Health Check",
          text: "Performing semi-annual compliance self-audits shields the company from surprise government inspection notices and costly legal fees.",
        },
      },
      {
        id: "manual-vs-automated",
        title: "8. Manual Compliance vs Automated HRMS",
        paragraphs: [
          "Calculating multi-state PT slabs and preparing EPFO ECR text files by hand in Excel is an invitation to costly typographical errors.",
          "LattiumHR automates deduction rules, generates verified ECR text files, and keeps state tax rates continuously updated.",
        ],
        callout: {
          title: "Peace of Mind",
          text: "Over 500 organizations rely on LattiumHR's statutory engine to maintain a 100% clean audit compliance record year after year.",
        },
      },
      {
        id: "faqs",
        title: "9. Frequently Asked Questions",
        paragraphs: [
          "Frequently asked legal, statutory, and audit readiness questions:",
        ],
        callout: {
          title: "Consult Our Legal Specialists",
          text: "Need guidance on the upcoming National Labor Codes or multi-state registrations? Contact our compliance advisory team.",
        },
      },
    ],
    auditChecklist: [
      { id: "schk-1", stage: "Registration", task: "Entity Code Verification: Ensure active EPFO, ESIC, PT, and Shops & Establishments registrations across all operating states.", done: true },
      { id: "schk-2", stage: "Registration", task: "UAN & Aadhaar Seeding: Verify 100% of active employees have validated UANs linked with Aadhaar credentials.", done: true },
      { id: "schk-3", stage: "Monthly Filings", task: "TDS Deposit: Remit employee monthly income tax deductions by 7th of the following month.", done: false },
      { id: "schk-4", stage: "Monthly Filings", task: "EPFO ECR Upload: Generate and submit monthly ECR text file and pay provident fund dues before the 15th.", done: false },
      { id: "schk-5", stage: "Monthly Filings", task: "ESIC Contribution Return: File monthly employee state insurance return and remit payments by 15th.", done: false },
      { id: "schk-6", stage: "Monthly Filings", task: "State PT Challans: Submit state-wise Professional Tax returns according to regional deadlines.", done: false },
      { id: "schk-7", stage: "Registers", task: "Combined Wage & Attendance Registers: Maintain digital Form A, B, C, and D records updated daily.", done: false },
      { id: "schk-8", stage: "Exit Governance", task: "Gratuity & FnF Compliance: Compute gratuity liabilities (for 5+ years service) and process clean exit clearances.", done: false },
      { id: "schk-9", stage: "Annual Filings", task: "Form 24Q Quarterly TDS: File quarterly income tax returns and issue digital Form 16 Part A & B annually.", done: false },
      { id: "schk-10", stage: "Welfare Fund", task: "Labor Welfare Fund (LWF): Remit bi-annual or annual state LWF contributions for applicable states.", done: false },
    ],
    faqs: [
      {
        id: "faq-0",
        q: "What are the statutory compliance filing due dates every HR team must remember?",
        a: "Key monthly deadlines include: TDS deposit by the 7th of the following month; EPFO ECR text filing and payment by the 15th; ESIC monthly return and payment by the 15th; and state Professional Tax (PT) between the 10th and end of month depending on the specific state.",
      },
      {
        id: "faq-1",
        q: "How is Gratuity calculated and when does an employee become eligible?",
        a: "Under the Payment of Gratuity Act 1972, employees become eligible upon completing 5 years of continuous service. The standard formula is: (15 × Last Drawn Basic Salary + DA × Number of Completed Years of Service) ÷ 26. The statutory tax-exempt ceiling is ₹20,00,000.",
      },
      {
        id: "faq-2",
        q: "What are the mandatory registers required during a labor officer inspection?",
        a: "Labor enforcement inspectors require inspection of: Form A (Employee Register), Form B (Wage Register showing gross-to-net deductions), Form C (Loan & Recovery Register), Form D (Daily Attendance Register), and proof of timely statutory EPF/ESIC/PT challan payments.",
      },
      {
        id: "faq-3",
        q: "What is the maximum limit on tax-exempt Gratuity under current rules?",
        a: "Under Section 10(10) of the Income Tax Act, the maximum lifetime tax-exempt gratuity for non-government employees covered under the Payment of Gratuity Act is ₹20 Lakhs (₹20,00,000). Any gratuity received exceeding this threshold is taxable.",
      },
    ],
    sidebarCTA: {
      title: "Zero-Penalty Compliance",
      desc: "EPF, ESIC, State PT, and digital labor registers updated automatically for all Indian states.",
    },
  },

  // 8. PERFORMANCE & OKRs GUIDE
  "performance-appraisal-guide": {
    slug: "performance-appraisal-guide",
    title: "Performance Appraisal & OKRs Guide",
    subtitle: "Continuous 360-degree feedback, quarterly OKR tracking, 9-box calibration reviews, and merit compensation linking.",
    category: "Hiring & Culture",
    readTime: "12 min read",
    updatedDate: "Updated for Financial Year 2025–2026",
    badge: "Organizational Growth",
    accentColor: "#7b2958",
    author: {
      name: "LattiumHR Organizational Design",
      role: "Reviewed by Talent Strategy & Compensation Leaders",
      avatar: "LT",
    },
    heroFlow: [
      { step: "Stage 01", title: "Objective Alignment & OKRs", desc: "Cascade high-level company goals into measurable, transparent team and individual key results." },
      { step: "Stage 02", title: "Continuous 360 Feedback", desc: "Conduct regular peer reviews, upward feedback, and monthly manager 1-on-1 check-ins." },
      { step: "Stage 03", title: "Fair Calibration & Merit Pay", desc: "Utilize 9-box talent grids and formulaic merit matrices to link performance to compensation." },
    ],
    toc: [
      { id: "what-is-performance", label: "1. What is Modern Performance Management?" },
      { id: "why-performance-matters", label: "2. Why Traditional Annual Reviews Fail" },
      { id: "performance-pillars", label: "3. The 3 Pillars of Agile Performance" },
      { id: "okr-vs-kpi", label: "4. OKR Framework vs Traditional KPIs" },
      { id: "nine-box-calibration", label: "5. The 9-Box Grid & Calibration Sessions" },
      { id: "merit-pay-linking", label: "6. Linking Performance to Merit Compensation" },
      { id: "interactive-checklist", label: "7. Interactive Performance Audit Checklist" },
      { id: "spreadsheets-vs-hrms", label: "8. Spreadsheet Appraisals vs Integrated HRMS" },
      { id: "faqs", label: "9. Frequently Asked Questions" },
    ],
    sections: [
      {
        id: "what-is-performance",
        title: "1. What is Modern Performance Management?",
        paragraphs: [
          "Modern performance management has evolved from an anxious once-a-year backward-looking review into an ongoing, agile dialogue focused on continuous growth, alignment, and transparent feedback.",
          "Rather than ranking staff on arbitrary bell curves, modern organizations utilize continuous OKR tracking, 360-degree peer input, and quarterly calibrations to nurture high performance.",
        ],
        callout: {
          title: "Cultural Shift",
          text: "Forward-thinking teams separate developmental coaching conversations from formal compensation reviews to foster genuine vulnerability and skill development.",
        },
      },
      {
        id: "why-performance-matters",
        title: "2. Why Traditional Annual Reviews Fail Modern Teams",
        paragraphs: [
          "Traditional once-a-year review cycles create widespread organizational friction:",
        ],
        bullets: [
          "Recency Bias: Managers remember accomplishments or blunders from the preceding three weeks while ignoring ten months of consistent execution.",
          "Demoralizing Surprises: Employees discover perceived shortcomings months after they occurred, when it is too late to course-correct.",
          "Bureaucratic Fatigue: HR managers spend months chasing missing appraisal forms across hundreds of employees.",
          "Disconnection from Daily Work: Static annual goals set in January become completely obsolete by March in fast-moving industries.",
        ],
        callout: {
          title: "Continuous Cadence",
          text: "Replacing annual appraisals with quarterly goal cycles increases employee goal attainment by over 31% and boosts engagement.",
        },
      },
      {
        id: "performance-pillars",
        title: "3. The 3 Pillars of Agile Performance",
        paragraphs: [
          "A resilient performance culture is built on three interconnected pillars:",
        ],
        table: {
          headers: ["Pillar", "Frequency", "Core Focus & Purpose"],
          rows: [
            { col1: "1. Goal Alignment (OKRs)", col2: "Quarterly", col3: "Transparent, ambitious key results aligned with corporate strategic objectives." },
            { col1: "2. 1-on-1 Check-ins & Coaching", col2: "Bi-Weekly", col3: "Dedicated manager-employee dialogue focused on unblocking work and skill development." },
            { col1: "3. 360 Peer Feedback & Calibration", col2: "Semi-Annually", col3: "Holistic evaluation from peers, direct reports, and cross-functional partners." },
          ],
        },
        callout: {
          title: "Multi-Perspective Feedback",
          text: "Gathering 360-degree feedback from cross-functional peers provides a well-rounded assessment that eliminates single-manager bias.",
        },
      },
      {
        id: "okr-vs-kpi",
        title: "4. OKR Framework vs Traditional KPIs",
        paragraphs: [
          "Understanding the fundamental difference between maintenance metrics (KPIs) and stretch growth goals (OKRs):",
        ],
        table: {
          headers: ["Dimension", "Traditional KPIs", "Modern OKRs (Objectives & Key Results)"],
          rows: [
            { col1: "Core Philosophy", col2: "Business-as-usual health monitoring.", col3: "Ambitious, qualitative stretch goals driving aggressive growth." },
            { col1: "Target Achievement", col2: "100% expected; failure is penalized.", col3: "60%–70% target; promotes bold experimentation without fear of punishment." },
            { col1: "Cadence", col2: "Annual or indefinite.", col3: "Quarterly alignment cycles with monthly milestone reviews." },
            { col1: "Transparency", col2: "Siloed between manager and employee.", col3: "100% public across the entire company to encourage cross-team alignment." },
          ],
        },
        callout: {
          title: "Alignment Power",
          text: "Transparent OKRs ensure that engineering, product, and sales teams row in the exact same direction toward company milestones.",
        },
      },
      {
        id: "nine-box-calibration",
        title: "5. The 9-Box Grid & Calibration Sessions",
        paragraphs: [
          "The 9-Box Talent Grid plots employees across two dimensions: Current Performance (Low, Medium, High) versus Future Potential (Low, Medium, High):",
          "During calibration sessions, department heads review ratings collectively, challenging outliers and ensuring consistent evaluation standards across different managers.",
        ],
        callout: {
          title: "Fair Calibration",
          text: "Cross-departmental calibration sessions prevent lenient managers from inflating scores while protecting staff under stricter leadership.",
        },
      },
      {
        id: "merit-pay-linking",
        title: "6. Linking Performance to Merit Compensation",
        paragraphs: [
          "Transparent merit pay matrices connect appraisal ratings to salary increments without arbitrary favoritism:",
          "Employees positioned low in their salary band who achieve top ratings receive higher percentage increments, closing wage gaps while rewarding top performers.",
        ],
        callout: {
          title: "Equitable Rewards",
          text: "Formulaic merit matrices protect company salary budgets while clearly demonstrating that high performance drives tangible financial rewards.",
        },
      },
      {
        id: "interactive-checklist",
        title: "7. Interactive Performance Audit Checklist",
        paragraphs: [
          "Guide your HR and leadership team through every stage of a seamless appraisal cycle:",
        ],
        callout: {
          title: "Timely Reviews",
          text: "Automated review reminders and completion tracking ensure appraisal cycles conclude within 3 weeks rather than dragging on for months.",
        },
      },
      {
        id: "spreadsheets-vs-hrms",
        title: "8. Spreadsheet Appraisals vs Integrated HRMS",
        paragraphs: [
          "Circulating appraisal forms as emailed Word documents or shared spreadsheets causes massive privacy breaches and lost review notes.",
          "LattiumHR provides a secure, role-governed environment where ratings, feedback, and merit increases sync seamlessly into payroll.",
        ],
        callout: {
          title: "End-to-End Synergy",
          text: "Once merit increases are finalized, approved revised salary structures flow directly into payroll with one click.",
        },
      },
      {
        id: "faqs",
        title: "9. Frequently Asked Questions",
        paragraphs: [
          "Answers to common performance management, appraisal cycle, and calibration questions:",
        ],
        callout: {
          title: "Drive High Performance",
          text: "Learn how LattiumHR empowers high-growth companies with agile OKRs, continuous feedback, and automated merit reviews.",
        },
      },
    ],
    auditChecklist: [
      { id: "pchk-1", stage: "Goal Setting", task: "Company OKR Cascade: Publish quarterly executive objectives and cascade targets to department heads.", done: true },
      { id: "pchk-2", stage: "Goal Setting", task: "Individual Key Results: Ensure all employees have 3 to 5 measurable, time-bound key results.", done: true },
      { id: "pchk-3", stage: "Self-Review", task: "Employee Self-Assessment: Open 14-day window for employees to reflect on key accomplishments and challenges.", done: false },
      { id: "pchk-4", stage: "Peer Input", task: "360 Peer Feedback: Collect anonymous or attributed peer reviews from designated cross-team colleagues.", done: false },
      { id: "pchk-5", stage: "Manager Review", task: "Manager Evaluation: Supervisors rate competencies and provide constructive forward-looking growth notes.", done: false },
      { id: "pchk-6", stage: "Calibration", task: "Leadership Calibration Session: Review 9-box distributions across departments to eliminate rating inflation.", done: false },
      { id: "pchk-7", stage: "1-on-1 Feedback", task: "Formal Review Conversation: Conduct dedicated 45-minute growth conversation between manager and employee.", done: false },
      { id: "pchk-8", stage: "Merit Matrix", task: "Compensation Modeling: Apply formulaic merit increment matrix based on ratings and salary band positioning.", done: false },
      { id: "pchk-9", stage: "Executive Signoff", task: "CFO & CEO Approval: Obtain final signoff on company-wide compensation adjustments and promotions.", done: false },
      { id: "pchk-10", stage: "Payroll Sync", task: "Salary Revision Rollout: Update employee CTC structures and dispatch digital appraisal letters.", done: false },
    ],
    faqs: [
      {
        id: "faq-0",
        q: "How often should performance reviews happen compared to traditional annual appraisals?",
        a: "Modern high-performing organizations use a hybrid cadence: quarterly OKR check-ins for agile goal tracking, monthly or bi-weekly 1-on-1 coaching conversations for continuous feedback, and semi-annual or annual formal calibration reviews for compensation adjustments.",
      },
      {
        id: "faq-1",
        q: "How do OKRs (Objectives & Key Results) differ from traditional KPIs?",
        a: "KPIs measure ongoing operational health (e.g. 99.9% uptime, customer response time <1 hour). OKRs represent ambitious, qualitative stretch objectives paired with measurable quantitative key results (e.g. Launch new enterprise product by Q3 with 50 pilot customers).",
      },
      {
        id: "faq-2",
        q: "How should managers conduct fair calibration sessions across different teams?",
        a: "Calibration sessions bring peer managers together with HR to review preliminary employee ratings on a 9-box grid. Managers present objective evidence for top and bottom ratings, normalizing scoring criteria and eliminating leniency or harshness bias.",
      },
      {
        id: "faq-3",
        q: "How does linking ratings to merit increases prevent rating inflation?",
        a: "When compensation budgets are anchored to a fixed merit matrix, managers cannot give all staff top ratings without exceeding their department's financial pool. This enforces honest, differentiated evaluations and protects top performers.",
      },
    ],
    sidebarCTA: {
      title: "Agile Performance & OKRs",
      desc: "Continuous 360 feedback, quarterly OKRs, and transparent merit compensation linked to payroll.",
    },
  },

  // 9. MULTI-BRANCH HR OPERATIONS GUIDE
  "multibranch-hr-setup-guide": {
    slug: "multibranch-hr-setup-guide",
    title: "Multi-Branch HR Operations & Governance Guide",
    subtitle: "Multi-entity company hierarchy, state-wise minimum wages, centralized policy control, and localized shifts.",
    category: "Operations & Compliance",
    readTime: "14 min read",
    updatedDate: "Updated for Financial Year 2025–2026",
    badge: "Enterprise Governance",
    accentColor: "#0d9488",
    author: {
      name: "LattiumHR Multi-Entity Practice",
      role: "Reviewed by Enterprise HR Architects",
      avatar: "LT",
    },
    heroFlow: [
      { step: "Stage 01", title: "Multi-Entity Architecture", desc: "Set up parent holding company, subsidiaries, branch locations, and regional cost centers." },
      { step: "Stage 02", title: "Localized Rules Engine", desc: "Configure branch-specific holiday calendars, rotational shifts, state PT slabs, and minimum wages." },
      { step: "Stage 03", title: "Unified Central Dashboard", desc: "Real-time workforce intelligence with strict Role-Based Access Control (RBAC) governance." },
    ],
    toc: [
      { id: "what-is-multibranch", label: "1. What is Multi-Branch HR Operations?" },
      { id: "why-multibranch-matters", label: "2. Operational Complexity in Distributed Teams" },
      { id: "governance-framework", label: "3. Multi-Branch Governance Framework" },
      { id: "state-rules-matrix", label: "4. State-Wise Minimum Wages & Holiday Calendars" },
      { id: "rbac-architecture", label: "5. Role-Based Access Control (RBAC) Architecture" },
      { id: "transfer-workflows", label: "6. Inter-Branch Transfers & Centralized Reporting" },
      { id: "interactive-checklist", label: "7. Interactive Multi-Branch Setup Checklist" },
      { id: "fragmented-vs-cloud", label: "8. Disconnected Branches vs Centralized HRMS" },
      { id: "faqs", label: "9. Frequently Asked Questions" },
    ],
    sections: [
      {
        id: "what-is-multibranch",
        title: "1. What is Multi-Branch HR Operations?",
        paragraphs: [
          "Multi-branch HR operations is the governance architecture that allows organizations to centrally control core policies, compensation budgets, and compliance standards while empowering regional branches to operate with local agility.",
          "As organizations expand from a single headquarters to retail outlets, warehouses, manufacturing units, and satellite offices across multiple states, operating disconnected HR tools leads to severe compliance blind spots.",
        ],
        callout: {
          title: "Scale Without Chaos",
          text: "Centralizing workforce records into a multi-entity HRMS gives executive leadership single-pane visibility while honoring localized state labor laws.",
        },
      },
      {
        id: "why-multibranch-matters",
        title: "2. Operational Complexity in Distributed Teams",
        paragraphs: [
          "Operating distributed workforces without unified HR software introduces multi-layered risks:",
        ],
        bullets: [
          "Conflicting State Tax Slabs: Each Indian state enforces distinct Professional Tax deduction schedules and Shops & Establishments registrations.",
          "Fragmented Holiday Calendars: Employees in Maharashtra celebrate Ganesh Chaturthi while staff in Karnataka observe Kannada Rajyotsava. Mismatched calendars cause payroll calculation errors.",
          "Data Privacy Breaches: Branch managers accessing full company payroll records violate data confidentiality and employee privacy.",
          "Inter-Branch Transfer Chaos: Moving an employee from Delhi to Bengaluru involves re-calculating PT, modifying leave policies, and transferring asset custody.",
        ],
        callout: {
          title: "Unified Compliance",
          text: "Automated multi-branch HRMS ensures that every regional branch strictly complies with local state labor mandates with zero manual recalculations.",
        },
      },
      {
        id: "governance-framework",
        title: "3. Multi-Branch Governance Framework",
        paragraphs: [
          "A structured multi-entity architecture supports both centralized corporate control and localized operational autonomy:",
        ],
        table: {
          headers: ["Layer", "Managed By", "Core Responsibilities & Policies"],
          rows: [
            { col1: "Corporate Headquarters (HQ)", col2: "Executive Leadership & Central HR", col3: "Company-wide compensation bands, global leave frameworks, core values, unified payroll approval." },
            { col1: "Regional Entities / Subsidiaries", col2: "Regional HR Directors", col3: "State labor registrations, local Shops & Establishments filings, regional vendor management." },
            { col1: "Branch / Store / Plant Location", col2: "Branch Managers & Plant Leads", col3: "Daily shift rosters, overtime authorizations, local holiday calendars, physical asset custody." },
          ],
        },
        callout: {
          title: "Hierarchy Flexibility",
          text: "LattiumHR supports unlimited subsidiary companies, branches, and cost centers under one single enterprise subscription.",
        },
      },
      {
        id: "state-rules-matrix",
        title: "4. State-Wise Minimum Wages & Holiday Calendars",
        paragraphs: [
          "Managing compliance across states requires pre-configured rules engines:",
        ],
        bullets: [
          "State Professional Tax: Automatically apply Maharashtra PT (₹200/mo, ₹300 in Feb), Karnataka PT (₹200/mo above ₹15,000), or zero PT in Delhi based on branch location.",
          "Localized Festival Calendars: Assign specific holiday lists to each branch while maintaining the 3 mandatory national holidays (Republic Day, Independence Day, Gandhi Jayanti) across all locations.",
          "Minimum Wage Slabs: Ensure base compensation for unskilled, semi-skilled, and skilled workers meets dynamic state minimum wage notifications.",
          "Labor Welfare Fund (LWF): Automatically deduct state-mandated employer and employee LWF contributions during semi-annual or annual cycles.",
        ],
        callout: {
          title: "Automated Tax Slabs",
          text: "LattiumHR dynamically updates state PT and minimum wage slabs whenever regional state governments issue gazette revisions.",
        },
      },
      {
        id: "rbac-architecture",
        title: "5. Role-Based Access Control (RBAC) Architecture",
        paragraphs: [
          "Granular role permissions ensure that employees, supervisors, and regional managers only view data relevant to their specific branch:",
          "A Store Manager in Pune can review attendance and approve leave requests for Pune retail staff, but has zero visibility into Mumbai salaries or corporate executive compensation.",
        ],
        callout: {
          title: "Data Confidentiality",
          text: "Strict RBAC security prevents internal wage gossip, protects employee banking details, and fulfills DPDP regulatory standards.",
        },
      },
      {
        id: "transfer-workflows",
        title: "6. Inter-Branch Transfers & Centralized Reporting",
        paragraphs: [
          "When an employee transfers between branches, LattiumHR smoothly transitions their profile:",
          "Reporting hierarchies, applicable state Professional Tax slabs, branch holiday calendars, and asset custody transfer automatically on the effective date without requiring record re-creation.",
        ],
        callout: {
          title: "Seamless Relocation",
          text: "One-click employee relocation maintains complete historical service records, leave balances, and UAN continuity with zero data loss.",
        },
      },
      {
        id: "interactive-checklist",
        title: "7. Interactive Multi-Branch Setup Checklist",
        paragraphs: [
          "Ensure your multi-branch enterprise setup is fully configured and compliant across all operational locations:",
        ],
        callout: {
          title: "Multi-Site Governance",
          text: "Complete all 10 setup milestones before onboarding regional branch staff to guarantee frictionless operations.",
        },
      },
      {
        id: "fragmented-vs-cloud",
        title: "8. Disconnected Branches vs Centralized HRMS",
        paragraphs: [
          "Managing branches through disparate local payroll software or shared Google sheets results in compliance chaos and delayed reporting.",
          "LattiumHR provides executive leadership with real-time consolidated reports on headcount, overtime spending, and leave trends across all nationwide branches.",
        ],
        callout: {
          title: "Executive Clarity",
          text: "Consolidated workforce reporting gives the CEO and CFO a real-time pulse of enterprise headcount and payroll costs across all branches.",
        },
      },
      {
        id: "faqs",
        title: "9. Frequently Asked Questions",
        paragraphs: [
          "Common questions regarding multi-branch operations, state labor compliance, and RBAC governance:",
        ],
        callout: {
          title: "Enterprise Architecture Consultation",
          text: "Speak with our enterprise solutions architect to structure your multi-company, multi-branch HR framework.",
        },
      },
    ],
    auditChecklist: [
      { id: "mchk-1", stage: "Structure", task: "Entity Hierarchy Setup: Define parent company, operating subsidiaries, branch sites, and department cost centers.", done: true },
      { id: "mchk-2", stage: "Structure", task: "Branch Labor Registrations: Link local Shops & Establishments numbers, factory licenses, and state PT numbers.", done: true },
      { id: "mchk-3", stage: "Rules Engine", task: "State PT Slab Configuration: Assign state-specific professional tax calculation tables to each branch.", done: false },
      { id: "mchk-4", stage: "Rules Engine", task: "Branch Holiday Calendars: Assign localized regional festival lists to individual branch locations.", done: false },
      { id: "mchk-5", stage: "Rosters", task: "Shift Policy Assignment: Map localized shift timings, night premiums, and weekly offs by branch.", done: false },
      { id: "mchk-6", stage: "RBAC Security", task: "Role-Based Access Control: Configure branch manager permissions to restrict data access to local staff only.", done: false },
      { id: "mchk-7", stage: "Hardware", task: "Biometric Terminal Sync: Connect local biometric turnstiles across all sites to the centralized cloud HRMS.", done: false },
      { id: "mchk-8", stage: "Transfers", task: "Inter-Branch Transfer Protocol: Establish formal digital workflow for employee relocations and asset handovers.", done: false },
      { id: "mchk-9", stage: "Payroll", task: "Consolidated Payroll Run: Process nationwide payroll with localized state PT withholdings in a single run.", done: false },
      { id: "mchk-10", stage: "Analytics", task: "Consolidated Executive Reporting: Build automated cross-branch headcount, turnover, and overtime dashboards.", done: false },
    ],
    faqs: [
      {
        id: "faq-0",
        q: "How do we manage multiple state registrations (Shops & Establishments) in one HRMS?",
        a: "LattiumHR enables multi-entity architecture where each branch can store its distinct Shops & Establishments registration number, local factory license, and state Professional Tax ID. Reports and payslips automatically display the specific entity credentials corresponding to each employee's branch location.",
      },
      {
        id: "faq-1",
        q: "Can different branches have separate holiday calendars and weekend shift rosters?",
        a: "Yes. LattiumHR allows you to configure customized holiday lists per branch or region. For instance, staff at the Chennai office can observe Pongal while Mumbai staff observe Ganesh Chaturthi, while all branches share the mandatory three national public holidays.",
      },
      {
        id: "faq-2",
        q: "How do role-based access permissions prevent branch managers from seeing executive payroll?",
        a: "Our granular Role-Based Access Control (RBAC) lets administrators define exact visibility boundaries. Branch managers can be granted permissions to view attendance and approve leaves solely for their local team members, while salary and compensation fields remain completely invisible and restricted to corporate HR and finance.",
      },
      {
        id: "faq-3",
        q: "How are inter-branch employee transfers and asset relocations tracked?",
        a: "LattiumHR features an automated transfer workflow. When an employee relocates, their profile updates with the new branch's reporting manager, state PT slab, and holiday calendar on the effective date. Physical hardware asset custody transfers are digitally acknowledged by the receiving branch.",
      },
    ],
    sidebarCTA: {
      title: "Manage Multi-Branch HR",
      desc: "Centralize corporate governance, state PT compliance, and role permissions across 10+ branch locations.",
    },
  },
};

// Flattened list of ALL questions across all guides for instant search & direct deep linking
export const ALL_GUIDE_QUESTIONS: GuideQuestionItem[] = Object.values(GUIDE_DETAILS_MAP).flatMap((guide) =>
  guide.faqs.map((faq) => ({
    id: faq.id,
    question: faq.q,
    answer: faq.a,
    guideSlug: guide.slug,
    guideTitle: guide.title,
    category: guide.category,
  }))
);

// Backward-compatibility exports for legacy imports
export const payrollGuideDetailData = GUIDE_DETAILS_MAP["payroll-management-guide"];
export const leaveGuideDetailData = GUIDE_DETAILS_MAP["leave-management-guide"];
