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

// 4 Prominent Relatable Handbooks (Updated with practical, high-value real-world HR topics)
export const featuredHandbooks: GuideHandbook[] = [
  {
    id: "payroll-guide",
    slug: "payroll-management-guide",
    title: "Statutory Payroll & Tax Master Playbook",
    subtitle: "Gross-to-net salary formulas, TDS calculations, EPF & ESIC filing timelines, and zero-penalty audit workflows.",
    category: "Payroll & Tax",
    readTime: "15 min read",
    accentColor: "#004B49",
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
    readTime: "12 min read",
    accentColor: "#004B49",
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
    readTime: "14 min read",
    accentColor: "#ea580c",
    badge: "Legal & Offboarding",
    stat: "Compliant Exits",
    iconName: "shield",
    coverImage: "/images/branch-payroll.jpg",
    description: "Comprehensive breakdown of EPF Act, ESIC regulations, Payment of Bonus Act, Gratuity calculations, and state-wise Professional Tax slabs with zero-penalty deadline checklists.",
  },
];

// All Guides List (Reference Image 2, second section 2-column grid)
export const allGuidesList: GuideListItem[] = [
  {
    id: "payroll-detail",
    slug: "payroll-management-guide",
    title: "Payroll Management Guide",
    category: "Payroll & Tax",
    readTime: "15 min read",
    excerpt:
      "What is Payroll? Payroll is the sum total of all compensation a company must pay to its employees for a set period of time or on a given date. Learn the complete gross-to-net cycle and statutory compliance rules.",
    badge: "Essential",
    accentColor: "#004B49",
    author: "LattiumHR Payroll Advisory",
  },
  {
    id: "leave-detail",
    slug: "leave-management-guide",
    title: "Leave Management Guide",
    category: "Workforce & Leave",
    readTime: "10 min read",
    excerpt:
      "What is Leave? Leave is simply taking time off from work after formally notifying management according to company and statutory guidelines. Learn how to configure automated accruals and holiday lists.",
    badge: "Operations",
    accentColor: "#004B49",
    author: "LattiumHR People Team",
  },
  {
    id: "recruitment-detail",
    slug: "recruitment-management-guide",
    title: "Recruitment Management Guide",
    category: "Hiring & Culture",
    readTime: "11 min read",
    excerpt:
      "What is Recruitment Management? From structured candidate pipelines and multi-stage interviews to automated offer letter rollouts and seamless day-one onboarding across distributed branches.",
    badge: "Talent Acquisition",
    accentColor: "#004B49",
    author: "LattiumHR Talent Practice",
  },
  {
    id: "expense-detail",
    slug: "informative-expense-management-guide",
    title: "Informative Expense Management Guide",
    category: "Operations & Compliance",
    readTime: "9 min read",
    excerpt:
      "The guide covers answers to 5 key recurring questions revolving around corporate expense management, receipt optical recognition, mileage tracking, and direct reimbursement sync with payroll.",
    badge: "Finance Ops",
    accentColor: "#10b981",
    author: "LattiumHR Finance Advisory",
  },
  {
    id: "statutory-detail",
    slug: "statutory-compliance-guide",
    title: "Statutory Compliance & Labor Laws Guide",
    category: "Payroll & Tax",
    readTime: "13 min read",
    excerpt:
      "Comprehensive breakdown of EPF Act, ESIC regulations, Payment of Bonus Act, Gratuity calculations, and state-wise Professional Tax slabs with zero-penalty deadline checklists.",
    badge: "Legal & Audit",
    accentColor: "#ea580c",
    author: "LattiumHR Legal Compliance",
  },
  {
    id: "performance-detail",
    slug: "performance-appraisal-guide",
    title: "Modern Performance Appraisal & OKRs Guide",
    category: "Hiring & Culture",
    readTime: "12 min read",
    excerpt:
      "A pragmatic framework for continuous 360-degree feedback, OKR goal alignment, quarterly calibration cycles, and transparent merit-based compensation linking.",
    badge: "Growth",
    accentColor: "#004B49",
    author: "LattiumHR Organizational Design",
  },
];

// Save More Time - Downloadable Toolkits & Templates (Reference Image 2, third section)
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

// Comprehensive Detail Data for Payroll Management Guide (Reference Image 1)
export const payrollGuideDetailData = {
  title: "Payroll Management Guide",
  subtitle: "Salary structures, gross-to-net calculations, statutory compliance rules, and automated payroll runs.",
  readTime: "15 min read",
  updatedDate: "Updated for Financial Year 2025–2026",
  author: {
    name: "LattiumHR Editorial & Compliance Advisory",
    role: "Reviewed by Certified Statutory Compliance Auditors",
    avatar: "LT",
  },
  toc: [
    { id: "what-is-payroll", label: "1. What is Payroll?" },
    { id: "importance", label: "2. Why Payroll Management Matters" },
    { id: "three-stages", label: "3. The 3 Stages of Payroll Processing" },
    { id: "calculator", label: "4. Interactive Gross-to-Net Calculator" },
    { id: "salary-components", label: "5. Salary Structure & Components" },
    { id: "statutory-rules", label: "6. Statutory Compliance & Slabs (PF, ESI, PT)" },
    { id: "interactive-checklist", label: "7. Interactive Payroll Audit Checklist" },
    { id: "common-pitfalls", label: "8. Pitfalls of Spreadsheets vs HRMS" },
  ],
  salaryBreakdownComponents: [
    {
      category: "Earnings (Gross Pay)",
      items: [
        { name: "Basic Salary", share: "40% – 50% of CTC", taxable: "100% Taxable", desc: "The core foundational pay upon which PF, Gratuity, and ESI calculations are anchored." },
        { name: "House Rent Allowance (HRA)", share: "40% – 50% of Basic", taxable: "Partially Exempt (Sec 10(13A))", desc: "Exemption calculated as lowest of actual HRA received, 50% of basic (metros) / 40% (non-metros), or rent paid minus 10% basic." },
        { name: "Special Allowance", share: "Remaining Balance", taxable: "100% Taxable", desc: "Residual component balancing total CTC after basic, HRA, and statutory heads are configured." },
        { name: "Leave Travel Allowance (LTA)", share: "As allocated", taxable: "Exempt twice in a 4-year block", desc: "Available for domestic travel fares incurred by employee and immediate dependents." },
      ],
    },
    {
      category: "Employee Statutory Deductions",
      items: [
        { name: "Employees' Provident Fund (EPF)", share: "12% of Basic (capped at ₹1,800 or uncapped)", taxable: "Eligible for 80C rebate", desc: "Mandatory retirement savings for establishments with 20+ staff. 12% deducted from employee's basic pay." },
        { name: "Employee State Insurance (ESIC)", share: "0.75% of Gross Wages", taxable: "Deductible from gross", desc: "Applicable if gross monthly wages are ₹21,000 or below (₹25,000 for employees with disability)." },
        { name: "Professional Tax (PT)", share: "₹150 – ₹200 / month", taxable: "Deductible under Sec 16(iii)", desc: "State-levied tax on salaried professionals; governed by individual state government laws." },
        { name: "Tax Deducted at Source (TDS)", share: "Based on Income Tax Slab", taxable: "Income Tax witholding", desc: "Withheld monthly according to selected Old or New Tax Regime declarations submitted by employee." },
      ],
    },
    {
      category: "Employer Contributions (Over & Above Gross)",
      items: [
        { name: "Employer EPF & EPS Contribution", share: "12% (3.67% EPF + 8.33% EPS)", taxable: "Company Cost", desc: "Employer matches employee's 12% contribution, with 8.33% routed into the Employee Pension Scheme." },
        { name: "Employer ESIC Contribution", share: "3.25% of Gross Wages", taxable: "Company Cost", desc: "Employer provides 3.25% towards medical coverage for employees earning ₹21,000 or less." },
        { name: "Gratuity Accrual", share: "4.81% of Basic Pay", taxable: "Statutory provision", desc: "Statutory benefit paid to employees upon completion of 5 or more continuous years of service." },
      ],
    },
  ],
  statutorySlabs: {
    epf: {
      title: "Employees' Provident Fund (EPF)",
      eligibility: "Organizations with 20+ employees",
      statutoryCap: "₹15,000 basic wage wage ceiling (voluntary contribution on higher wage allowed)",
      employeeShare: "12% of Basic + DA",
      employerShare: "12% (3.67% to EPF + 8.33% to EPS up to ₹1,250/mo + 0.5% EDLI + 0.5% Admin)",
      filingDeadline: "15th of the following month (Form ECR electronically filed)",
    },
    esic: {
      title: "Employee State Insurance Corporation (ESIC)",
      eligibility: "Organizations with 10+ employees (in specified areas)",
      wageThreshold: "Gross monthly wage up to ₹21,000 (₹25,000 for persons with disabilities)",
      employeeShare: "0.75% of gross wages",
      employerShare: "3.25% of gross wages",
      filingDeadline: "15th of the following month",
    },
    pt: [
      { state: "Maharashtra", slab: "Up to ₹7,500: Nil | ₹7,501–₹10,000: ₹175/mo | >₹10,000: ₹200/mo (₹300 in Feb)", filingDeadline: "Monthly on last day of month" },
      { state: "Karnataka", slab: "Up to ₹14,999: Nil | ₹15,000 and above: ₹200/mo", filingDeadline: "20th of the following month" },
      { state: "Tamil Nadu", slab: "Half-yearly slabs: Up to ₹21,000: Nil | Above ₹75,000: ₹1,250/half-year", filingDeadline: "Bi-annual filing" },
      { state: "Delhi", slab: "No Professional Tax applicable in Delhi NCT", filingDeadline: "N/A" },
      { state: "Telangana / AP", slab: "Up to ₹15,000: Nil | ₹15,001–₹20,000: ₹150/mo | Above ₹20,000: ₹200/mo", filingDeadline: "10th of the following month" },
    ],
  },
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
      q: "Is PF mandatory for companies with under 20 employees?",
      a: "No. The Employees' Provident Fund (EPF) Act mandates registration and contribution once an organization reaches 20 or more employees. Establishments with fewer than 20 staff can opt in voluntarily with employee consent.",
    },
    {
      q: "What happens if statutory filings are delayed past the 15th of the month?",
      a: "Late PF or ESI deposits attract penal damages under Section 14B ranging from 5% to 25% per annum, along with interest under Section 7Q at 12% per annum. Continued default also attracts director liability.",
    },
    {
      q: "How does multi-state Professional Tax differ across regional branches?",
      a: "Each Indian state enforces distinct salary threshold slabs and filing cycles. For example, Maharashtra levies ₹200/mo (₹300 in Feb), Karnataka levies ₹200/mo above ₹15,000, and Delhi levies no PT at all.",
    },
  ],
};

// Comprehensive Detail Data for Leave Management Guide (/guides/leave-management-guide)
export const leaveGuideDetailData = {
  title: "Leave Management Guide",
  subtitle: "Statutory leave rules, accrual formulas, sandwich rule policies, and automated biometric payroll sync.",
  readTime: "10 min read",
  updatedDate: "Updated for Financial Year 2025–2026",
  author: {
    name: "LattiumHR People Operations Advisory",
    role: "Reviewed by Senior Labour Law Compliance Specialists",
    avatar: "LT",
  },
  toc: [
    { id: "what-is-leave", label: "1. What is Modern Leave Management?" },
    { id: "why-it-matters", label: "2. Why Transparent Leave Policies Matter" },
    { id: "statutory-leave-types", label: "3. Core Statutory Leave Types" },
    { id: "leave-calculator", label: "4. Interactive Leave Accrual & Balance Calculator" },
    { id: "policy-rules", label: "5. Policy Rules: Sandwich Rule & Carry-Forward" },
    { id: "approval-workflow", label: "6. Multi-Tier Approval Workflows" },
    { id: "interactive-checklist", label: "7. Interactive Annual Leave Audit Checklist" },
    { id: "attendance-sync", label: "8. Biometric & Payroll Sync vs Spreadsheets" },
  ],
  leaveTypes: [
    {
      category: "Statutory Mandatory Leaves",
      items: [
        { name: "Casual Leave (CL)", quota: "7 – 12 Days / Year", rules: "Unplanned short absences", desc: "Intended for unexpected personal emergencies. Typically cannot be combined with Sick Leave or Earned Leave. Unused CL lapses at calendar/financial year end." },
        { name: "Sick / Medical Leave (SL)", quota: "10 – 14 Days / Year", rules: "Medical ailments & recovery", desc: "Granted for illness or injury. Medical certificate from a registered practitioner is required if absent for more than 2 consecutive days. Can be accumulated in many states." },
        { name: "Earned / Privilege Leave (EL / PL)", quota: "15 – 18 Days / Year", rules: "Factories Act (1 day per 20 days worked)", desc: "Statutory planned leave earned through active continuous service. Eligible for accumulation (up to 30–45 days) and encashment upon separation or retirement." },
        { name: "Maternity Leave (ML)", quota: "26 Weeks Fully Paid", rules: "Maternity Benefit Act 2017", desc: "Mandatory for female employees who worked at least 80 days in the 12 months preceding expected delivery date. Applicable for up to 2 surviving children (12 weeks for 3rd child)." },
      ],
    },
    {
      category: "Special & Wellness Leave Categories",
      items: [
        { name: "Paternity Leave", quota: "5 – 15 Working Days", rules: "Company Policy / Central Govt", desc: "Granted to new fathers within 6 months of childbirth to support infant care and maternal recovery." },
        { name: "Compensatory Off (Comp-Off)", quota: "Day-for-day earned", rules: "Weekend / Holiday work credit", desc: "Granted when an employee works on a weekend, weekly rest day, or national public holiday. Valid for consumption within 30 to 60 days." },
        { name: "Bereavement Leave", quota: "3 – 7 Working Days", rules: "Compassionate allowance", desc: "Provided for the demise of immediate family members (spouse, child, parent, sibling). Fully paid with immediate manager dispensation." },
        { name: "Sabbatical / Loss of Pay (LOP)", quota: "As approved", rules: "Unpaid discretionary", desc: "Extended unpaid absence for higher education, health recovery, or personal sabbaticals with guaranteed role retention." },
      ],
    },
  ],
  rulesComparison: [
    { rule: "The Sandwich Rule", standard: "Active by Default in traditional policies", recommendation: "Modern HRMS allows granular toggle per department", impact: "Treats intervening weekends as leaves if Friday and Monday are taken off." },
    { rule: "Accrual Cadence", standard: "Monthly credit (e.g. 1.25 or 1.5 days/month)", recommendation: "Pro-rata allocation on first of each month", impact: "Prevents new hires from exhausting annual entitlements before earning them." },
    { rule: "Carry-Forward Cap", standard: "30 to 45 Days maximum", recommendation: "Auto-encashment of balance exceeding statutory ceiling", impact: "Protects employer liability while safeguarding employee earned benefits." },
    { rule: "Minimum Notice Period", standard: "7 to 14 Days for PL / EL (>3 days)", recommendation: "Self-service mobile application request", impact: "Gives teams adequate lead time for roster planning and work delegation." },
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
      q: "Is the sandwich rule mandatory by Indian labour law?",
      a: "No. The sandwich rule is not a statutory requirement mandated by Indian labor statutes. It is an internal company policy rule traditionally used by employers to curb weekend absenteeism. Modern organizations frequently waive or soften this rule.",
    },
    {
      q: "Can Casual Leave (CL) be accumulated and carried forward to the next financial year?",
      a: "No. Under almost all State Shops and Commercial Establishments Acts, Casual Leave (CL) cannot be accumulated or carried forward; it lapses automatically at the close of the calendar or financial year.",
    },
    {
      q: "How is Leave Encashment calculated during employee separation?",
      a: "Under statutory standard formulas, Earned / Privilege Leave encashment is calculated as: (Basic Salary + Dearness Allowance) ÷ 30 × Number of Unused Earned Leaves. Under Sec 10(10AA), leave encashment upon separation is exempt from income tax up to ₹25,00,000 for non-government employees.",
    },
    {
      q: "What is the statutory Maternity Leave duration in India?",
      a: "Under the Maternity Benefit (Amendment) Act 2017, eligible female employees are entitled to 26 weeks (182 calendar days) of paid maternity leave for up to two surviving children, of which not more than 8 weeks can precede expected delivery.",
    },
  ],
};
