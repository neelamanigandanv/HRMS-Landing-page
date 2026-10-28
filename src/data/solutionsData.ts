import { IconName } from "../components/ui/Icon";

export interface SolutionCapability {
  title: string;
  desc: string;
  icon: IconName;
}

export interface WorkflowStep {
  number?: number;
  title: string;
  description: string;
}

export interface WorkflowProcessData {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  badge: {
    icon: IconName;
    title: string;
    subtitle: string;
    color?: string;
  };
  steps: WorkflowStep[];
}

export interface SolutionSlideItem {
  eyebrow: string;
  title: string;
  description: string;
  checkmarks: string[];
  buttonText: string;
  buttonLink?: string;
  image: string;
  imageAlt: string;
}

export interface HorizontalStepItem {
  stepNumber: number;
  title: string;
  description: string;
}

export interface SolutionHeroVisual {
  image: string;
  imageAlt: string;
  badgeLive?: string;
  widgetLeft?: {
    icon: IconName;
    title: string;
    subtitle: string;
    value: string;
  };
  widgetRight?: {
    icon: IconName;
    title: string;
    subtitle: string;
    value: string;
  };
}

export interface SolutionTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface SolutionFaq {
  q: string;
  a: string;
}

export interface SolutionFooterCta {
  eyebrow: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink?: string;
  secondaryBtnText: string;
  secondaryBtnLink?: string;
  points: string[];
}

export interface ImpactGlobeAvatar {
  name: string;
  avatar: string;
  role?: string;
  top: string;
  left: string;
}

export interface SolutionImpactBento {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cardDark: {
    title: string;
    description: string;
    buttonLink?: string;
    globeAvatars: ImpactGlobeAvatar[];
  };
  cardTopMiddle: {
    title: string;
    description: string;
    metricValue: string;
    metricLabel: string;
  };
  cardTopRight: {
    statValue: string;
    statTrend: string;
    statLabel: string;
    avatars: string[];
    gaugePercent: number;
    gaugeLabel: string;
  };
  cardBottomWide: {
    title: string;
    subtitle: string;
    statValue: string;
    statTrend: string;
    yAxisLabels: string[];
    chartBars: { label: string; height: number; value?: string }[];
  };
}

export interface RelatedSolutionCard {
  title: string;
  badge?: string;
  description: string;
  link: string;
  linkText?: string;
  icon: IconName;
}

export interface SolutionRelatedSolutions {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards: RelatedSolutionCard[];
}

export interface SolutionMidCta {
  tag?: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  checklist?: string[];
}

export interface SolutionData {
  slug: string;
  title: string;
  badge: string;
  headline: string;
  heroHeadlineAccent?: string;
  heroTrustPoints?: string[];
  heroVisual?: SolutionHeroVisual;
  subhead: string;
  challengesTitle: string;
  challengesDesc: string;
  challenges: { problem: string; consequence: string }[];
  capabilitiesTitle: string;
  capabilitiesDesc: string;
  capabilities: SolutionCapability[];
  interactiveSlides?: SolutionSlideItem[];
  horizontalSteps?: HorizontalStepItem[];
  workflowProcess?: WorkflowProcessData;
  midCta?: SolutionMidCta;
  impactBento?: SolutionImpactBento;
  benefitsTitle: string;
  benefitsDesc: string;
  benefits: { metric: string; title: string; desc: string }[];
  hideUseCases?: boolean;
  useCasesTitle: string;
  useCases: { scenario: string; solution: string; outcome: string }[];
  hideRecommendedModules?: boolean;
  recommendedModules?: { name: string; desc: string; link: string }[];
  relatedSolutions?: SolutionRelatedSolutions;
  testimonialsStats?: { value: string; label: string }[];
  testimonials?: SolutionTestimonial[];
  faqs?: SolutionFaq[];
  footerCta?: SolutionFooterCta;
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
    heroHeadlineAccent: "Elevate Employee Experience.",
    heroTrustPoints: [
      "85% Less Routine Queries",
      "100% Digital Day-One Onboarding",
      "14-Day Rapid Deployment",
    ],
    heroVisual: {
      image: "/images/hero-employee-directory-team.jpg",
      imageAlt: "HR operations team managing workforce directory and leave approvals",
      badgeLive: "Active Directory · 1,450 Staff",
      widgetLeft: {
        icon: "sparkle",
        title: "Digital Onboarding",
        subtitle: "100% KYC & Bank Verified",
        value: "+38 New Hires",
      },
      widgetRight: {
        icon: "leave",
        title: "Self-Service",
        subtitle: "85% Faster Approvals",
        value: "1-Tap Workflow",
      },
    },
    subhead:
      "Give your HR team their time back. Automate routine leave requests, onboarding documentation, attendance tracking, and policy acknowledgments so you can focus on talent development and culture.",
    challengesTitle: "Why HR Professionals Feel Overwhelmed",
    challengesDesc:
      "HR teams spend up to 70% of their working hours answering repetitive employee questions, copying data between spreadsheets, and chasing managers for late approvals.",
    challenges: [
      {
        problem: "Constant Employee Queries for Routine Info",
        consequence:
          "HR teams lose countless hours answering repetitive calls and emails asking 'How many leaves do I have left?' or 'Can you resend my June payslip?' Disconnected systems force HR into constant manual lookups rather than strategic talent initiatives.",
      },
      {
        problem: "Chasing Managers for Reviews & Approvals",
        consequence:
          "Routine leave requests, appraisal scorecards, and document validations stall when managers miss email threads. HR professionals spend their days manually following up on pending approvals instead of building workplace engagement.",
      },
      {
        problem: "Stressful Month-End Attendance Reconciliations",
        consequence:
          "Compiling raw biometric punch logs, multi-shift rosters, loss of pay (LOP) deductions, and overtime across multiple branches creates late-night panic and manual calculation errors right before salary day.",
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
    interactiveSlides: [
      {
        eyebrow: "✦ DIGITAL ONBOARDING & KYC ✦",
        title: "Automated digital onboarding with zero day-one paperwork.",
        description:
          "Eliminate physical paperwork and manual data entry. Issue automated digital offer letters, verify identity documents in real-time, and welcome new team members with structured role checklists before their very first day.",
        checkmarks: [
          "Instant Digital KYC & Document Vaults",
          "Pre-Boarding Checklists & Role Welcome Kits",
        ],
        buttonText: "EXPLORE ONBOARDING →",
        buttonLink: "/features/employee-management",
        image: "/images/emp-block-onboarding.jpg",
        imageAlt: "HR team welcoming new employee with digital welcome kit and laptop",
      },
      {
        eyebrow: "✦ EMPLOYEE SELF-SERVICE (ESS) ✦",
        title: "Empower your workforce with 1-tap mobile self-service.",
        description:
          "Free your HR team from 85% of repetitive administrative questions. Employees easily check remaining leave quotas, log daily geofenced punches, download monthly salary payslips, and manage personal profiles right from iOS and Android.",
        checkmarks: [
          "1-Tap Mobile Attendance & Geofenced Clock-Ins",
          "Instant Payslip Downloads & Tax Form Access",
        ],
        buttonText: "EXPLORE SELF-SERVICE →",
        buttonLink: "/features/attendance-management",
        image: "/images/sb-employee-workspace.jpg",
        imageAlt: "Employee comfortably checking self-service mobile app on smartphone in office",
      },
      {
        eyebrow: "✦ LEAVE & SHIFT WORKFLOWS ✦",
        title: "Configurable leave policies and multi-tier approval chains.",
        description:
          "Tailor leave types, accrual logic, carry-over limits, and holiday calendars across multi-branch locations. Department managers approve requests in one tap with real-time team calendar visibility and automated payroll synchronization.",
        checkmarks: [
          "Custom Accrual & Sandwich Rule Automation",
          "1-Tap Mobile Approvals & Team Calendar Sync",
        ],
        buttonText: "EXPLORE LEAVE SUITE →",
        buttonLink: "/features/leave-management",
        image: "/images/sb-manager-workspace.jpg",
        imageAlt: "HR manager and team collaborating around conference table discussing leave and shift planning",
      },
      {
        eyebrow: "✦ PEOPLE ANALYTICS & RETENTION ✦",
        title: "Real-time workforce intelligence for proactive leadership.",
        description:
          "Transform scattered employee records into actionable strategic foresight. Spot retention trends and attrition risks before they happen, monitor department headcount changes, and export 100% audit-ready statutory reports in seconds.",
        checkmarks: [
          "Departmental Retention Radar & Attrition Alerts",
          "1-Click Statutory & Audit Compliance Exports",
        ],
        buttonText: "EXPLORE PEOPLE ANALYTICS →",
        buttonLink: "/features/reports-analytics",
        image: "/images/solutions-consultation-cta.jpg",
        imageAlt: "HR leadership analyzing workforce intelligence and retention reports on digital tablet",
      },
    ],
    workflowProcess: {
      eyebrow: "✦ WORKFLOW PROCESS ✦",
      title: "How LattiumHR Powers Your People Operations",
      subtitle:
        "A proven step-by-step framework that eliminates administrative bottlenecks, accelerates approvals, and keeps your entire workforce connected.",
      image: "/images/hero-hr-working-pro.jpg",
      imageAlt: "HR operations team collaborating on employee onboarding and leave management workflows",
      badge: {
        icon: "chart",
        title: "Team Efficiency",
        subtitle: "85% Less Manual Inquiries",
        color: "#802B5B",
      },
      steps: [
        {
          number: 1,
          title: "Discovery & Automated Ingestion",
          description:
            "Import employee directories, map branch reporting hierarchies, and configure customized leave quotas and holiday calendars in minutes.",
        },
        {
          number: 2,
          title: "Self-Service & Approval Workflows",
          description:
            "Employees submit mobile attendance, leaves, and documents while managers approve requests instantly through 1-tap automated chains.",
        },
        {
          number: 3,
          title: "Real-Time Oversight & Continuous Optimization",
          description:
            "Track department headcount, monitor attrition patterns, and generate audit-ready statutory reports with zero manual collation.",
        },
      ],
    },
    midCta: {
      tag: "✦ INTERACTIVE HR CONSULTATION ✦",
      title: "Wondering how your specific leave, attendance, and shift rules will run?",
      description:
        "Schedule a 20-minute tailored walkthrough. Our HR solutions team will demonstrate live on screen how LattiumHR configures for your organizational hierarchy, approval matrices, and salary structures.",
      primaryBtnText: "Schedule Tailored Walkthrough",
      primaryBtnLink: "/request-demo",
      secondaryBtnText: "Speak with an HR Specialist",
      secondaryBtnLink: "/contact",
      checklist: [
        "Live interactive screen walkthrough of your HR workflows",
        "Free white-glove employee directory & leave data migration",
        "Custom policy configuration & guaranteed 14-day go-live",
      ],
    },
    impactBento: {
      eyebrow: "✦ STRATEGIC WORKFORCE IMPACT ✦",
      title: "Measurable Impact for HR Operations",
      subtitle:
        "Transform HR from a reactive administrative function into a proactive, data-driven strategic driver for your organization.",
      cardDark: {
        title: "Multi-Branch Workforce Intelligence",
        description:
          "Unify employee profiles, statutory compliance, and departmental reporting lines across every branch and remote hub with zero data silos.",
        buttonLink: "/features/employee-management",
        globeAvatars: [
          { name: "Ananya K.", avatar: "/images/leader-ananya-kapoor.jpg", role: "Head of People", top: "25%", left: "26%" },
          { name: "Kavya S.", avatar: "/images/leader-kavya-sundaram.jpg", role: "HRBP Lead", top: "52%", left: "58%" },
          { name: "Rohan M.", avatar: "/images/leader-rohan-mehta.jpg", role: "Talent Ops", top: "72%", left: "34%" },
          { name: "David C.", avatar: "/images/testi-avatar-1.jpg", role: "Staffing Lead", top: "24%", left: "80%" },
          { name: "Priya N.", avatar: "/images/testi-avatar-2.jpg", role: "Payroll Specialist", top: "82%", left: "74%" },
        ],
      },
      cardTopMiddle: {
        title: "Paperless HR Automation",
        description:
          "Self-service onboarding submissions, automated probation reviews, and 1-tap leave approvals eliminate administrative bottlenecks.",
        metricValue: "85%",
        metricLabel: "Fewer Routine Inquiries",
      },
      cardTopRight: {
        statValue: "98.4%",
        statTrend: "↗",
        statLabel: "Onboarding Completion",
        avatars: [
          "/images/leader-ananya-kapoor.jpg",
          "/images/leader-kavya-sundaram.jpg",
          "/images/testi-avatar-1.jpg",
          "/images/testi-avatar-2.jpg",
        ],
        gaugePercent: 96,
        gaugeLabel: "Annual Staff Retention Score",
      },
      cardBottomWide: {
        title: "Monthly HR Hours Saved via Automation",
        subtitle: "Consolidated hours saved across employee onboarding, attendance tracking, and pre-payroll.",
        statValue: "140 hrs",
        statTrend: "↗",
        yAxisLabels: ["160h", "120h", "80h", "0h"],
        chartBars: [
          { label: "Jan", height: 48, value: "65 hrs" },
          { label: "Feb", height: 62, value: "88 hrs" },
          { label: "Mar", height: 72, value: "102 hrs" },
          { label: "Apr", height: 80, value: "115 hrs" },
          { label: "May", height: 88, value: "125 hrs" },
          { label: "Jun", height: 94, value: "135 hrs" },
          { label: "Jul", height: 98, value: "140 hrs" },
        ],
      },
    },
    benefitsTitle: "Measurable Impact for HR Operations",
    benefitsDesc:
      "Transform HR from a reactive administrative function into a proactive strategic partner for leadership.",
    benefits: [
      { metric: "85%", title: "Fewer Routine Queries", desc: "Self-service portal resolves common payslip and balance questions." },
      { metric: "100%", title: "Automated Onboarding", desc: "Digital verification replaces manual paper filing cabinets." },
      { metric: "15 hrs", title: "Saved Weekly per HR Member", desc: "Reinvest administrative time into employee engagement and training." },
    ],
    hideUseCases: true,
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
    hideRecommendedModules: true,
    recommendedModules: [
      { name: "Employee Management", desc: "Digital workforce directory and self-service", link: "/features/employee-management" },
      { name: "Leave Management", desc: "Automated leave accruals and approvals", link: "/features/leave-management" },
      { name: "Documents & Compliance", desc: "Centralized policy management and vaults", link: "/features/documents-compliance" },
    ],
    relatedSolutions: {
      eyebrow: "✦ RELATED SOLUTIONS ✦",
      title: "Explore Solutions for Your Business",
      subtitle:
        "Discover how LattiumHR connects workforce management across your organization, from regional branch networks to enterprise payroll governance.",
      cards: [
        {
          title: "Small Businesses",
          description:
            "Zero-setup HR, geofenced mobile clock-in, and automated payroll tailored for agile startups and teams under 50.",
          link: "/solutions/small-businesses",
          linkText: "Learn more →",
          icon: "zap",
        },
        {
          title: "Mid-Sized Businesses",
          description:
            "Standardize multi-department workflows, regional branch policies, and automated approval hierarchies as your team scales.",
          link: "/solutions/mid-sized-businesses",
          linkText: "Learn more →",
          icon: "chart",
        },
        {
          title: "Enterprises",
          description:
            "Enterprise-grade role hierarchies, custom approval matrices, audit logging, and deep ERP integrations for large workforces.",
          link: "/solutions/enterprises",
          linkText: "Learn more →",
          icon: "shield",
        },
        {
          title: "Finance Teams",
          description:
            "Zero-error payroll processing, automated statutory compliance (PF, ESI, PT, TDS), and instant encrypted bank payout files.",
          link: "/solutions/finance-teams",
          linkText: "Learn more →",
          icon: "finance",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "Before LattiumHR, my team spent half our days answering 'How many casual leaves do I have left?' and chasing managers for sign-offs. With self-service and automated workflows, employee inquiries dropped by 85% in month one.",
        author: "Kavya Sundaram",
        role: "VP of People & Culture",
        company: "ZetaScale Technologies",
        avatar: "KS",
      },
      {
        quote:
          "Onboarding 25 new hires every month used to drown us in paper verification and Excel trackers. Now new team members complete their KYC, policy sign-offs, and bank details on their phones before day one.",
        author: "Rohan Varma",
        role: "HR Operations Lead",
        company: "Apex Retail Chains",
        avatar: "RV",
      },
      {
        quote:
          "Month-end attendance reconciliation used to mean three days of late nights compiling punches, leave adjustments, and loss-of-pay deductions. LattiumHR syncs biometric punches directly to payroll in seconds.",
        author: "Ananya Deshmukh",
        role: "Head of Human Resources",
        company: "Credence Global",
        avatar: "AD",
      },
    ],
    faqs: [
      {
        q: "How does Employee Self-Service (ESS) reduce routine HR inquiries?",
        a: "Employees download the mobile app or log into the web portal to check real-time leave balances, view holiday calendars, download monthly payslips, and submit reimbursement claims directly. This eliminates 85% of routine phone calls and emails to the HR desk.",
      },
      {
        q: "How does digital onboarding work for remote and multi-branch hires?",
        a: "As soon as an offer is extended, LattiumHR generates a secure digital link. New hires upload government IDs, enter bank details, and digitally sign employment agreements before their first day. HR receives an automated checklist and verified document vault ready for orientation.",
      },
      {
        q: "Can we customize leave rules, approval chains, and attendance shifts?",
        a: "Yes, completely. LattiumHR supports multi-tier approval chains (Reporting Manager → Department Head → HR), sandwich rule policies, custom probation accruals, comp-off credits, and regional holiday calendars tailored per branch.",
      },
      {
        q: "How long does it take to migrate our existing employee database?",
        a: "Most HR teams go live within 7 to 14 days. Our migration specialists import your employee directory, historical leave balances, and departmental hierarchies via bulk templates or direct API connectors with zero data loss.",
      },
      {
        q: "Does LattiumHR integrate with our biometric hardware and attendance systems?",
        a: "Yes. LattiumHR integrates natively with standard biometric fingerprint and facial recognition turnstiles, as well as geofenced mobile check-ins with selfie verification for field and remote staff.",
      },
    ],
    footerCta: {
      eyebrow: "READY TO ELEVATE YOUR HR OPERATIONS?",
      title: "Your HR Team Deserves Better than Spreadsheets & Paperwork.",
      description:
        "Join hundreds of forward-thinking people teams running automated onboarding, self-service leave approvals, and seamless attendance on LattiumHR.",
      primaryBtnText: "Book a Free Demo",
      primaryBtnLink: "/request-demo",
      secondaryBtnText: "Explore All Features",
      secondaryBtnLink: "/features",
      points: [
        "Free personalised demo & consultation",
        "No credit card required",
        "Go live in 7–14 days",
      ],
    },
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
    workflowProcess: {
      eyebrow: "✦ WORKFLOW PROCESS ✦",
      title: "The Zero-Error Payroll & Compliance Framework",
      subtitle:
        "From automated attendance collation to direct corporate bank disbursements and statutory filings — a seamless, verifiable financial flow.",
      image: "/images/industry-finance.jpg",
      imageAlt: "Finance and payroll specialists verifying monthly salary payout registers and statutory sheets",
      badge: {
        icon: "finance",
        title: "Payroll Precision",
        subtitle: "99.9% Calculation Accuracy",
        color: "#0f766e",
      },
      steps: [
        {
          number: 1,
          title: "Input Collation & Rule Verification",
          description:
            "Automatically gather verified punch records, approved leaves, overtime hours, and loan deductions without manual spreadsheet copy-pasting.",
        },
        {
          number: 2,
          title: "Automated Gross-to-Net Calculations",
          description:
            "The calculation engine computes statutory PF, ESI, professional tax, and income tax TDS slabs across multiple branches and states in one run.",
        },
        {
          number: 3,
          title: "1-Click Disbursement & Compliance Filing",
          description:
            "Generate encrypted corporate bank payment files (HDFC, ICICI, SBI) and export ready-to-upload government ECR challan registers.",
        },
      ],
    },
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
