import { IconName } from "../components/ui/Icon";

export interface SolutionCapability {
  title: string;
  desc: string;
  icon: IconName;
}

export interface SolutionData {
  slug: string;
  title: string;
  badge: string;
  headline: string;
  subhead: string;
  challengesTitle: string;
  challengesDesc: string;
  challenges: { problem: string; consequence: string }[];
  capabilitiesTitle: string;
  capabilitiesDesc: string;
  capabilities: SolutionCapability[];
  benefitsTitle: string;
  benefitsDesc: string;
  benefits: { metric: string; title: string; desc: string }[];
  useCasesTitle: string;
  useCases: { scenario: string; solution: string; outcome: string }[];
  recommendedModules: { name: string; desc: string; link: string }[];
}

export const solutionsMap: Record<string, SolutionData> = {
  "small-businesses": {
    slug: "small-businesses",
    title: "Small Businesses (1–50 Employees)",
    badge: "Scale With Simplicity",
    headline: "Graduate from spreadsheets to structured HR without the enterprise overhead",
    subhead:
      "Simple, intuitive HR software designed specifically for lean teams. Automate attendance, leave requests, and payroll in less than two weeks, without requiring a dedicated IT department.",
    challengesTitle: "Operational Bottlenecks Faced by Growing Small Businesses",
    challengesDesc:
      "Founders and office managers often juggle HR on spreadsheets alongside sales, customer support, and finance. Manual administration drains valuable growth hours and risks compliance fines.",
    challenges: [
      {
        problem: "Founders Spending Weekends on Payroll",
        consequence: "Manual Excel calculations of PF, ESI, and deductions consume hours better spent growing revenue.",
      },
      {
        problem: "Attendance Lost in WhatsApp & Notebooks",
        consequence: "Disputes over working days, late arrivals, and unrecorded casual leaves cause employee frustration.",
      },
      {
        problem: "Missing Employee Document Folders",
        consequence: "Panicked searches for identity proofs and signed contracts during bank or tax verifications.",
      },
    ],
    capabilitiesTitle: "Core HR Capabilities Built for Lean Teams",
    capabilitiesDesc:
      "Get all the essentials up and running fast. No multi-month implementation contracts, complicated workflows, or hidden add-on costs.",
    capabilities: [
      {
        title: "Fast 2-Week Launch",
        desc: "Import your employee Excel list and start marking geofenced attendance on day one.",
        icon: "zap",
      },
      {
        title: "Automated Monthly Payroll",
        desc: "One-click salary calculations with PF, ESI, and tax deductions handled automatically.",
        icon: "payroll",
      },
      {
        title: "Mobile App Self-Service",
        desc: "Staff apply for leaves and download monthly payslips directly on iOS and Android.",
        icon: "leave",
      },
      {
        title: "Digital Document Storage",
        desc: "Securely store ID cards, PAN, and appointment letters in one centralized location.",
        icon: "document",
      },
    ],
    benefitsTitle: "Tangible ROI for Startups & Small Businesses",
    benefitsDesc:
      "Free up founder bandwidth and provide a professional, polished employee experience from day one.",
    benefits: [
      { metric: "80%", title: "Time Saved on Admin", desc: "Cut HR administration from 15 hours a week down to under 3 hours." },
      { metric: "100%", title: "Compliance Guarantee", desc: "Never miss an EPFO or ESIC challan deadline again." },
      { metric: "14 days", title: "Average Go-Live", desc: "Guided onboarding gets your entire team comfortable immediately." },
    ],
    useCasesTitle: "Real-World Scenarios for Small Teams",
    useCases: [
      {
        scenario: "Fast-growing creative agency adding 5 new team members every month",
        solution: "Automated onboarding links let new hires upload KYC details before their first day, creating digital records instantly.",
        outcome: "Zero day-one paperwork, enabling team members to start working on client deliverables immediately.",
      },
      {
        scenario: "Retail store with 20 shift staff across 2 shops",
        solution: "Geofenced mobile check-ins ensure retail staff clock in only when present at the storefront.",
        outcome: "Elimination of buddy punching and instant visibility of shift coverage for store owners.",
      },
    ],
    recommendedModules: [
      { name: "Employee Directory", desc: "Unified staff database with emergency contacts", link: "/features/employee-management" },
      { name: "Attendance & Mobile Clock-in", desc: "Geofenced attendance on smartphones", link: "/features/attendance-management" },
      { name: "Salary Processing", desc: "Automated payroll with bank payout sheets", link: "/features/payroll-management" },
    ],
  },

  "mid-sized-businesses": {
    slug: "mid-sized-businesses",
    title: "Mid-Sized Businesses (50–500 Employees)",
    badge: "Scale & Control",
    headline: "Standardize multi-department workflows, branch policies, and approval hierarchies",
    subhead:
      "When your team grows past 50 people, ad-hoc processes break down. LattiumHR gives mid-market companies the structure, multi-branch policy controls, and automated approval chains needed to scale efficiently.",
    challengesTitle: "Growing Pains at Mid-Scale",
    challengesDesc:
      "At 100+ employees, HR teams become overwhelmed by fragmented departmental policies, multiple office locations, and delayed manager approvals.",
    challenges: [
      {
        problem: "Inconsistent Regional Branch Policies",
        consequence: "Different branch heads apply conflicting leave and shift rules, causing workforce friction.",
      },
      {
        problem: "Approval Bottlenecks Across Managers",
        consequence: "Leave requests and expense reimbursements stall in inboxes, delaying month-end payroll closure.",
      },
      {
        problem: "IT & Hardware Custody Confusion",
        consequence: "Laptops and equipment get reallocated informally between branches with no central audit records.",
      },
    ],
    capabilitiesTitle: "Automation & Multi-Branch Governance",
    capabilitiesDesc:
      "Give department heads autonomy while maintaining strict company-wide operational consistency and audit compliance.",
    capabilities: [
      {
        title: "Multi-Tier Approval Chains",
        desc: "Route approvals through reporting managers, department leads, and HR with automatic escalation.",
        icon: "role",
      },
      {
        title: "Branch-Specific Holiday & Shift Rules",
        desc: "Set distinct state holidays and shift timings for regional offices while maintaining unified HQ reporting.",
        icon: "branch",
      },
      {
        title: "Integrated Expense Management",
        desc: "Snap receipts on mobile, route for approval, and pay out directly in monthly salary disbursements.",
        icon: "finance",
      },
      {
        title: "Asset Custody Slips",
        desc: "Track company laptops, monitors, and equipment handovers with digital employee sign-offs.",
        icon: "asset",
      },
    ],
    benefitsTitle: "Business Impact for Growing Companies",
    benefitsDesc:
      "Maintain operational agility while establishing the governance required by investors and auditors.",
    benefits: [
      { metric: "75%", title: "Faster Approval Cycles", desc: "Mobile notifications allow managers to approve requests in under 5 minutes." },
      { metric: "100%", title: "Branch Visibility", desc: "Central HR oversees attendance, leaves, and salary costs across every location." },
      { metric: "₹6L+", title: "Annual IT Cost Recovery", desc: "No lost laptops during branch reassignments or employee exits." },
    ],
    useCasesTitle: "Proven Workflows for Mid-Sized Organizations",
    useCases: [
      {
        scenario: "Logistics company with 180 drivers, warehouse staff, and regional office coordinators",
        solution: "Branch-specific geofences and shift schedules ensure warehouse teams and desk staff follow tailored rules.",
        outcome: "Clean attendance records automatically feed into monthly salary calculations without manual reconciliations.",
      },
      {
        scenario: "Software firm expanding from 60 to 220 engineers across 3 cities",
        solution: "Centralized document vault and automated OKR cycles keep performance standards aligned across distributed teams.",
        outcome: "Structured quarterly reviews and transparent appraisal ratings increase employee retention.",
      },
    ],
    recommendedModules: [
      { name: "Attendance & Shifts", desc: "Multi-branch shift rosters and geofencing", link: "/features/attendance-management" },
      { name: "Asset Management", desc: "Hardware tracking and exit recovery", link: "/features/asset-management" },
      { name: "Roles & Permissions", desc: "Granular administrative rights by branch", link: "/features/roles-permissions" },
    ],
  },

  "enterprises": {
    slug: "enterprises",
    title: "Enterprises (500+ Employees)",
    badge: "Security & Governance",
    headline: "Enterprise-grade workforce management, granular RBAC, and dedicated compliance SLAs",
    subhead:
      "For complex organizations with thousands of employees across nationwide branches. LattiumHR provides high-throughput payroll processing, deep role-based access controls, and custom integration capabilities.",
    challengesTitle: "High-Volume Enterprise HR Challenges",
    challengesDesc:
      "Large-scale enterprises require absolute data segregation, high-availability architecture, and rigorous audit trails that stand up to regulatory scrutiny.",
    challenges: [
      {
        problem: "Regulatory & Labor Law Exposure",
        consequence: "Complex statutory requirements across multiple states risk substantial financial and reputational penalties.",
      },
      {
        problem: "Data Privacy & Sensitive Salary Leaks",
        consequence: "Inadequate role permissions expose confidential executive compensation and personal identity data.",
      },
      {
        problem: "System Latency & Month-End Timeouts",
        consequence: "Legacy HRMS software crashes or freezes when calculating salaries for 2,000+ employees simultaneously.",
      },
    ],
    capabilitiesTitle: "Enterprise Infrastructure & Security",
    capabilitiesDesc:
      "Engineered for high performance, strict data isolation, and seamless interoperability with enterprise ERPs.",
    capabilities: [
      {
        title: "Granular Role-Based Access (RBAC)",
        desc: "Define custom permission matrices, field-level data masks, and geographic administrative boundaries.",
        icon: "shield",
      },
      {
        title: "High-Throughput Payroll Engine",
        desc: "Process multi-tier salary calculations for thousands of workers in minutes with zero system lag.",
        icon: "payroll",
      },
      {
        title: "Immutable Audit Trails",
        desc: "Timestamped logs capturing every view, edit, download, and export action for forensic audit compliance.",
        icon: "document",
      },
      {
        title: "Dedicated Account Management & SLA",
        desc: "99.9% uptime SLA guarantee, dedicated implementation specialists, and 2-hour priority support response.",
        icon: "award",
      },
    ],
    benefitsTitle: "Enterprise-Scale Returns",
    benefitsDesc:
      "Lower total cost of ownership compared to legacy enterprise platforms while delivering a consumer-grade user experience.",
    benefits: [
      { metric: "99.9%", title: "Uptime SLA", desc: "Continuous reliability backed by enterprise infrastructure commitments." },
      { metric: "0", title: "Compliance Deficiencies", desc: "Automated generation of statutory registers and audit files." },
      { metric: "60%", title: "Lower TCO", desc: "Modern cloud platform eliminates heavy consulting fees and server maintenance costs." },
    ],
    useCasesTitle: "Enterprise Deployment Scenarios",
    useCases: [
      {
        scenario: "National manufacturing conglomerate with 1,200 plant workers and 400 corporate staff",
        solution: "Dual-mode capture utilizing biometric scanners at factories and mobile GPS geofencing at headquarters.",
        outcome: "Centralized payroll team executes multi-entity salary disbursements in a single unified run.",
      },
      {
        scenario: "Financial services firm requiring strict data confidentiality and audit logs",
        solution: "Field-level permission masking prevents department managers from viewing salary numbers while maintaining approval authority.",
        outcome: "Full compliance with banking-grade internal security audits.",
      },
    ],
    recommendedModules: [
      { name: "Roles & Permissions", desc: "Enterprise RBAC with field-level masking", link: "/features/roles-permissions" },
      { name: "Reports & Analytics", desc: "Custom BI builder and scheduled exports", link: "/features/reports-analytics" },
      { name: "Documents & Compliance", desc: "Audit-ready digital document vaults", link: "/features/documents-compliance" },
    ],
  },

  "hr-teams": {
    slug: "hr-teams",
    title: "Solutions for HR Teams",
    badge: "HR Operations & Experience",
    headline: "Eliminate repetitive administrative paperwork and elevate employee experience",
    subhead:
      "Give your HR team their time back. Automate routine leave requests, onboarding documentation, attendance tracking, and policy acknowledgments so you can focus on talent development and culture.",
    challengesTitle: "Why HR Professionals Feel Overwhelmed",
    challengesDesc:
      "HR teams spend up to 70% of their working hours answering repetitive employee questions, copying data between spreadsheets, and chasing managers for late approvals.",
    challenges: [
      {
        problem: "Constant Employee Queries for Routine Info",
        consequence: "Answering endless calls asking 'How many leaves do I have left?' or 'Can you resend my June payslip?'",
      },
      {
        problem: "Chasing Managers for Reviews & Approvals",
        consequence: "Manually following up on pending leave requests, expense approvals, and appraisal scorecards.",
      },
      {
        problem: "Stressful Month-End Attendance Reconciliations",
        consequence: "Working late nights before salary day manually compiling punches, loss of pay days, and overtime.",
      },
    ],
    capabilitiesTitle: "Tools Designed for the Modern People Team",
    capabilitiesDesc:
      "Everything your people operations team needs to run smooth, transparent, and proactive HR programs.",
    capabilities: [
      {
        title: "Employee Self-Service (ESS)",
        desc: "Empower staff to view leave balances, download tax forms, and update addresses without contacting HR.",
        icon: "users",
      },
      {
        title: "Automated Onboarding Workflows",
        desc: "New hires complete document uploads and sign policies before their first day.",
        icon: "sparkle",
      },
      {
        title: "Visual People Analytics",
        desc: "Spot retention patterns, departmental attrition, and headcount growth in real-time dashboards.",
        icon: "chart",
      },
      {
        title: "Broadcast Announcements",
        desc: "Share policy updates, holiday notices, and company news with push notifications.",
        icon: "mail",
      },
    ],
    benefitsTitle: "Measurable Impact for HR Operations",
    benefitsDesc:
      "Transform HR from a reactive administrative function into a proactive strategic partner for leadership.",
    benefits: [
      { metric: "85%", title: "Fewer Routine Queries", desc: "Self-service portal resolves common payslip and balance questions." },
      { metric: "100%", title: "Automated Onboarding", desc: "Digital verification replaces manual paper filing cabinets." },
      { metric: "15 hrs", title: "Saved Weekly per HR Member", desc: "Reinvest administrative time into employee engagement and training." },
    ],
    useCasesTitle: "Day in the Life with LattiumHR",
    useCases: [
      {
        scenario: "Managing onboarding for 12 new hires joining across different offices on the same day",
        solution: "Automated digital invitations prompt new hires to submit KYC documents, review company handbooks, and accept policies.",
        outcome: "All employee profiles and document vaults are verified before morning orientation begins.",
      },
      {
        scenario: "Executive leadership requesting quarterly attrition analysis by 4 PM",
        solution: "Instant export of visual turnover charts filtered by department, tenure, and exit interview reasons.",
        outcome: "Data-driven presentation delivered to leadership without scrambling to compile historical data.",
      },
    ],
    recommendedModules: [
      { name: "Employee Management", desc: "Digital workforce directory and self-service", link: "/features/employee-management" },
      { name: "Leave Management", desc: "Automated leave accruals and approvals", link: "/features/leave-management" },
      { name: "Documents & Compliance", desc: "Centralized policy management and vaults", link: "/features/documents-compliance" },
    ],
  },

  "finance-teams": {
    slug: "finance-teams",
    title: "Solutions for Finance & Payroll Teams",
    badge: "Financial Control",
    headline: "Zero-error payroll processing, automated statutory compliance, and audit-ready books",
    subhead:
      "Bridge the gap between HR and finance. LattiumHR gives CFOs, accountants, and payroll managers verified attendance inputs, automated statutory deductions, and clean bank disbursement sheets.",
    challengesTitle: "Payroll Headaches for Finance Professionals",
    challengesDesc:
      "Finance leaders are responsible for payroll accuracy and tax compliance, yet they often receive unverified, delayed attendance data from disparate operational teams.",
    challenges: [
      {
        problem: "Garbage-In, Garbage-Out Payroll Inputs",
        consequence: "Late attendance adjustments, unrecorded unpaid leaves, and unverified expense claims distort payouts.",
      },
      {
        problem: "Complex, Changing Statutory Regulations",
        consequence: "PF wage caps, state-specific PT rules, and TDS projections require constant manual adjustments.",
      },
      {
        problem: "Lengthy Audit & Reconciliation Cycles",
        consequence: "External auditors take weeks to verify salary registers, gratuity provisions, and statutory returns.",
      },
    ],
    capabilitiesTitle: "Financial Precision & Regulatory Compliance",
    capabilitiesDesc:
      "Ensure every rupee disbursed is backed by verified attendance records, approved claims, and statutory compliance.",
    capabilities: [
      {
        title: "Automated Statutory Deductions",
        desc: "Built-in calculation of PF (12%), ESI, state PT slabs, and income tax projections under both regimes.",
        icon: "shield",
      },
      {
        title: "Direct Bank Disbursement Files",
        desc: "Export formatted payment files compatible with HDFC, ICICI, SBI, and Axis Bank corporate portals.",
        icon: "download",
      },
      {
        title: "Loan & Advance Recovery",
        desc: "Automate monthly installment deductions for employee salary advances with zero manual tracking.",
        icon: "loan",
      },
      {
        title: "Statutory Filing Exports",
        desc: "Generate ECR text files, ESIC returns, and TDS Form 24Q data ready for government portals.",
        icon: "reports",
      },
    ],
    benefitsTitle: "Measurable Impact for Finance",
    benefitsDesc:
      "Eliminate payroll calculation errors, avoid compliance penalties, and reconcile accounts in record time.",
    benefits: [
      { metric: "100%", title: "Calculation Accuracy", desc: "Automated formula engine prevents costly payroll overpayments." },
      { metric: "0", title: "Statutory Non-Compliance Penalties", desc: "Always up-to-date with the latest PF, ESI, and tax changes." },
      { metric: "1-Click", title: "Bank File Generation", desc: "Zero manual data re-entry into corporate banking portals." },
    ],
    useCasesTitle: "Financial Accuracy in Action",
    useCases: [
      {
        scenario: "Monthly salary disbursement for 300 employees across 4 states with varying PT slabs",
        solution: "System automatically applies Maharashtra, Karnataka, and Delhi PT rules based on assigned branch profiles.",
        outcome: "Payroll finalized in 25 minutes with state-wise remittance challans prepared simultaneously.",
      },
      {
        scenario: "Statutory audit inspection requesting historical PF and ESI contributions for the past year",
        solution: "Download comprehensive monthly contribution ledgers and payment receipts in a single consolidated report.",
        outcome: "Auditors receive complete, verifiable records with zero manual document assembly.",
      },
    ],
    recommendedModules: [
      { name: "Payroll Management", desc: "Automated salary runs and statutory reports", link: "/features/payroll-management" },
      { name: "Reports & Analytics", desc: "Salary expenditure and cost-center insights", link: "/features/reports-analytics" },
      { name: "Roles & Permissions", desc: "Restricted finance access for sensitive salary data", link: "/features/roles-permissions" },
    ],
  },

  "multi-location": {
    slug: "multi-location",
    title: "Multi-Location Businesses",
    badge: "Distributed Operations",
    headline: "Unify all your branches, retail stores, and warehouses in one central system",
    subhead:
      "Run different branch policies, local holiday calendars, and shift timings locally while maintaining a unified, real-time company view at central headquarters.",
    challengesTitle: "The Operational Friction of Distributed Branches",
    challengesDesc:
      "Operating across multiple cities often creates organizational silos. Each branch adopts different informal procedures, leaving headquarters blind to workforce metrics.",
    challenges: [
      {
        problem: "Differing State Laws & Regional Holidays",
        consequence: "Bengaluru, Mumbai, and Delhi offices observe different regional holidays and labor rules.",
      },
      {
        problem: "No Real-Time HQ Visibility",
        consequence: "Executive leadership has no way to see real-time attendance across branch facilities.",
      },
      {
        problem: "Branch Manager Overreach",
        consequence: "Local supervisors modifying policies or approving requests without proper corporate oversight.",
      },
    ],
    capabilitiesTitle: "Central Oversight with Local Flexibility",
    capabilitiesDesc:
      "Give regional managers the tools to manage daily operations within clear corporate guardrails.",
    capabilities: [
      {
        title: "Branch-Specific Policy Rules",
        desc: "Configure unique holiday lists, working hours, and grace periods for each physical location.",
        icon: "globe",
      },
      {
        title: "Multi-Site Attendance Geofences",
        desc: "Set GPS boundaries for every branch office, warehouse, and retail location.",
        icon: "attendance",
      },
      {
        title: "HQ Consolidated Dashboards",
        desc: "View real-time workforce headcount, attendance percentages, and salary spend across all sites.",
        icon: "branch",
      },
      {
        title: "Seamless Employee Transfers",
        desc: "Move employees between branch locations with instant updates to their shifts and holiday rules.",
        icon: "role",
      },
    ],
    benefitsTitle: "Enterprise Control Across Locations",
    benefitsDesc:
      "Standardize people operations across your footprint without ignoring regional realities.",
    benefits: [
      { metric: "1 System", title: "For All Locations", desc: "Replace fragmented regional tools with a single cloud platform." },
      { metric: "Real-Time", title: "Nationwide Visibility", desc: "Instant visibility into attendance across every location." },
      { metric: "100%", title: "State Compliance", desc: "Local state labor rules applied accurately per location." },
    ],
    useCasesTitle: "Multi-Branch Success Stories",
    useCases: [
      {
        scenario: "Retail chain with 12 stores across 3 states and a central distribution warehouse",
        solution: "Store managers manage local shift rosters while central HR runs consolidated monthly payroll.",
        outcome: "Elimination of regional payroll discrepancies and full visibility into store-level labor expenses.",
      },
      {
        scenario: "Fast-scaling tech consultancy expanding from Bengaluru into Mumbai and Gurugram",
        solution: "New branches go live in under 24 hours by duplicating established master company templates.",
        outcome: "Uniform employee onboarding experience regardless of joining location.",
      },
    ],
    recommendedModules: [
      { name: "Attendance & Geofencing", desc: "Location-aware mobile clock-in", link: "/features/attendance-management" },
      { name: "Leave & Holiday Calendars", desc: "Regional state holiday management", link: "/features/leave-management" },
      { name: "Roles & Permissions", desc: "Branch-scoped administrative rights", link: "/features/roles-permissions" },
    ],
  },

  "industries": {
    slug: "industries",
    title: "Industry Solutions",
    badge: "Vertical Workflows",
    headline: "Tailored workforce management workflows adapted to your industry’s operational rhythm",
    subhead:
      "Whether you manage shift workers in manufacturing, distributed field staff in logistics, or tech talent across offices, LattiumHR adapts to your industry’s exact operational demands.",
    challengesTitle: "Industry-Specific People Operations Demands",
    challengesDesc:
      "A generic HRMS fails when it cannot handle manufacturing shift rotations, retail weekend coverage, or IT intellectual property handovers.",
    challenges: [
      {
        problem: "Manufacturing & Warehousing",
        consequence: "Complex rotational 24/7 shifts, overtime rules, and factory labor compliance.",
      },
      {
        problem: "IT & High-Growth Technology Services",
        consequence: "Rapid hiring cycles, remote employee self-service, OKRs, and hardware tracking.",
      },
      {
        problem: "Retail & Consumer Services",
        consequence: "High seasonal turnover, weekend peak coverage, and multi-store staff transfers.",
      },
    ],
    capabilitiesTitle: "Adaptive Modules for Specialized Verticals",
    capabilitiesDesc:
      "Configure your workspace to match the specific operating cadence of your business sector.",
    capabilities: [
      {
        title: "Rotational Shifts & Night Allowances",
        desc: "Automate complex manufacturing shift patterns with night shift bonuses and rest-day rules.",
        icon: "clock",
      },
      {
        title: "Field Force GPS Clock-In",
        desc: "Enable sales and field service representatives to log verified client visits on mobile.",
        icon: "map-pin",
      },
      {
        title: "IT Equipment Handover & Receipts",
        desc: "Ensure expensive developer laptops and monitors are documented with digital receipts.",
        icon: "asset",
      },
      {
        title: "High-Volume Hiring Pipelines",
        desc: "Speed up retail and customer support hiring with candidate scoring and fast offer rollouts.",
        icon: "role",
      },
    ],
    benefitsTitle: "Tailored Vertical Returns",
    benefitsDesc:
      "Avoid expensive custom software development by leveraging LattiumHR’s flexible workflow engine.",
    benefits: [
      { metric: "100%", title: "Workflow Fit", desc: "Configure policies matching your specific operational cadence." },
      { metric: "35%", title: "Lower Attrition", desc: "Clear shift schedules, transparent leaves, and reliable salary payouts." },
      { metric: "0", title: "Custom Code Needed", desc: "Flexible settings adapt out of the box without bespoke engineering." },
    ],
    useCasesTitle: "Vertical Implementations in Action",
    useCases: [
      {
        scenario: "Automotive parts manufacturer managing 3 rotational factory shifts",
        solution: "Biometric devices at plant gates sync with automated shift rules and overtime calculation tables.",
        outcome: "Overtime hours verified by shop-floor managers before feeding into salary runs.",
      },
      {
        scenario: "E-commerce logistics hub scaling staff by 150 seasonal workers for holiday peak",
        solution: "Bulk onboarding imports and quick mobile clock-in links get contract workers active in minutes.",
        outcome: "100% attendance tracking with zero operational bottlenecks during peak sales volume.",
      },
    ],
    recommendedModules: [
      { name: "Attendance & Shifts", desc: "Flexible rotational shift planner", link: "/features/attendance-management" },
      { name: "Recruitment Pipeline", desc: "Fast-moving applicant tracking", link: "/features/recruitment" },
      { name: "Payroll Management", desc: "Accurate shift and overtime compensation", link: "/features/payroll-management" },
    ],
  },
};
