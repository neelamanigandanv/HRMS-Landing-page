import { IconName } from "../components/ui/Icon";

export interface FeatureCapability {
  title: string;
  desc: string;
  icon: IconName;
  tag?: string;
}

export interface FeatureData {
  slug: string;
  title: string;
  badge: string;
  headline: string;
  subhead: string;
  problemTitle: string;
  problemDesc: string;
  problemPoints: { issue: string; impact: string }[];
  solutionTitle: string;
  solutionDesc: string;
  solutionPoints: string[];
  capabilities: FeatureCapability[];
  mockupType: "people" | "attendance" | "leave" | "payroll" | "asset" | "recruitment" | "performance" | "documents" | "reports" | "roles";
  mockupTitle: string;
  mockupSubtitle: string;
  roiStats: { value: string; label: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export const featuresMap: Record<string, FeatureData> = {
  "employee-management": {
    slug: "employee-management",
    title: "Employee Management",
    badge: "Core HR & Directory",
    headline: "Centralize employee records, org charts, and life-cycle events across all branches",
    subhead:
      "Replace scattered spreadsheets and fragmented folders with a unified employee repository that syncs onboarding, personal details, document verifications, and department lines.",
    problemTitle: "The Cost of Fragmented Employee Records",
    problemDesc:
      "When employee profiles live in disconnected Excel sheets, HR teams waste 8+ hours every week cross-referencing basic details, misplacing emergency contacts, and struggling to maintain accurate org charts.",
    problemPoints: [
      {
        issue: "Outdated Contact & Banking Data",
        impact: "Direct deposit failures during payroll and compliance reporting penalties.",
      },
      {
        issue: "Disjointed Branch Visibility",
        impact: "Headquarters lacks real-time headcount numbers across regional offices.",
      },
      {
        issue: "Scattered Document Storage",
        impact: "Aadhaar, PAN, and address proofs get stored across personal inboxes and folders.",
      },
    ],
    solutionTitle: "One Unified System of Record for Every Team Member",
    solutionDesc:
      "LattiumHR provides a comprehensive digital profile for every worker, from their first onboarding invite to final exit clearance. Team members update their own information via self-service, while HR retains administrative review rights.",
    solutionPoints: [
      "Dynamic organization chart that automatically redraws as reporting managers change",
      "Employee self-service (ESS) portal for updating personal contact and bank details",
      "Department, branch, and designation hierarchies with custom attributes",
      "Timeline history tracking promotions, transfers, and compensation updates",
    ],
    capabilities: [
      {
        title: "Digital Employee Profiles",
        desc: "Store identity documents, emergency contacts, compensation bands, and bank accounts in one encrypted profile.",
        icon: "employee",
        tag: "Core",
      },
      {
        title: "Automated Org Chart",
        desc: "Visualize company hierarchy in real time. Drill down by division, regional branch, or reporting line.",
        icon: "branch",
      },
      {
        title: "Self-Service Portal",
        desc: "Empower staff to view payslips, request profile corrections, and download employment verification letters.",
        icon: "setup",
      },
      {
        title: "Life-Cycle Milestones",
        desc: "Automate probation reviews, contract renewals, work anniversaries, and exit clearance checklists.",
        icon: "calendar",
      },
      {
        title: "Branch-Level Segmentation",
        desc: "Filter employee data by city, branch office, cost center, or employment type (full-time, contractor, intern).",
        icon: "globe",
      },
      {
        title: "Export & Audit Trail",
        desc: "Export point-in-time headcount audits to Excel or PDF with detailed change logs for compliance inspections.",
        icon: "download",
      },
    ],
    mockupType: "people",
    mockupTitle: "Central Workforce Directory",
    mockupSubtitle: "Live synchronized view of 248 employees across Mumbai, Bengaluru & Delhi",
    roiStats: [
      { value: "85%", label: "Reduction in HR queries", desc: "Staff resolve contact and payslip questions directly via self-service." },
      { value: "100%", label: "Data accuracy", desc: "Single source of truth prevents duplicate or outdated personnel records." },
      { value: "2 days", label: "Faster onboarding", desc: "New hires submit documents digitally before day one." },
    ],
    faqs: [
      {
        q: "Can employees update their own bank account information?",
        a: "Yes. Employees can initiate an update through the self-service portal. Changes require review and approval by an authorized HR or Finance manager before updating payroll.",
      },
      {
        q: "How does LattiumHR handle employees who transfer between branches?",
        a: "With a single click, an admin can transfer an employee to a new branch. Their shift rules, holiday calendar, and reporting line automatically update from the effective transfer date.",
      },
      {
        q: "Can custom fields be added to employee profiles?",
        a: "Yes. You can define custom text, date, or dropdown fields such as Uniform Size, Work Permit Expiry, or Laptop Serial Number.",
      },
    ],
  },

  "attendance-management": {
    slug: "attendance-management",
    title: "Attendance Management",
    badge: "Time & Geofencing",
    headline: "Accurate, real-time clock-in tracking with mobile geofencing and biometric integration",
    subhead:
      "Eliminate manual punch registers and buddy punching. Track office, remote, and field employees with GPS geofencing, biometric device sync, and automatic overtime calculations.",
    problemTitle: "Why Traditional Attendance Registers Fail Multi-Branch Teams",
    problemDesc:
      "Paper sign-in sheets and standalone biometric machines trap attendance records in physical locations. HR spends days at month-end chasing branch managers for missing logs and overtime reconciliations.",
    problemPoints: [
      {
        issue: "Buddy Punching & Time Theft",
        impact: "Companies lose 2–5% of monthly payroll to unworked hours and proxy punches.",
      },
      {
        issue: "Isolated Hardware Devices",
        impact: "Biometric machines break down or require manual USB thumb-drive exports.",
      },
      {
        issue: "Month-End Attendance Firefighting",
        impact: "Payroll delays caused by reconciling late check-ins and unapproved half-days.",
      },
    ],
    solutionTitle: "Frictionless, Multi-Mode Attendance Capture",
    solutionDesc:
      "LattiumHR provides flexible attendance capture suited to both desk and on-field workforces. Clock-ins are automatically validated against branch geofences and IP whitelists, feeding clean data straight into payroll.",
    solutionPoints: [
      "GPS geofenced mobile clock-in that verifies the worker is within the office radius",
      "Direct API integration with biometric fingerprint and facial recognition scanners",
      "Configurable grace periods, late-mark rules, and automatic half-day deductions",
      "Shift scheduling with rotation logic, night shifts, and split-shift support",
    ],
    capabilities: [
      {
        title: "Geofenced Mobile App",
        desc: "Employees clock in from iOS/Android only when physically located inside your branch coordinates.",
        icon: "attendance",
        tag: "Mobile",
      },
      {
        title: "Biometric Device Sync",
        desc: "Connect your existing eSSL, Realtime, or ZKTeco devices via cloud sync for instant centralized logs.",
        icon: "clock",
      },
      {
        title: "Shift & Roster Planning",
        desc: "Create rotational shifts, weekend offsets, and assign rosters to teams or individuals in bulk.",
        icon: "calendar",
      },
      {
        title: "Regularization Workflows",
        desc: "Allow staff to request attendance corrections with manager approval chains and audit trails.",
        icon: "check",
      },
      {
        title: "Overtime & Comp-Off Rules",
        desc: "Automatically calculate approved overtime hours and credit compensatory off days per company policy.",
        icon: "wallet",
      },
      {
        title: "Real-Time Who’s In Dashboard",
        desc: "Instantly see present, absent, on-leave, and late arrivals across every branch on any given day.",
        icon: "search",
      },
    ],
    mockupType: "attendance",
    mockupTitle: "Real-Time Branch Attendance",
    mockupSubtitle: "92% team presence recorded with verified GPS coordinates",
    roiStats: [
      { value: "0 hrs", label: "Month-end punch reconciliation", desc: "Logs sync directly into the payroll calculation engine." },
      { value: "98%", label: "On-time arrival accountability", desc: "Transparent visibility improves punctuality across branches." },
      { value: "100%", label: "Elimination of proxy attendance", desc: "Geofence and biometric checks ensure true worker presence." },
    ],
    faqs: [
      {
        q: "What happens if an employee has poor internet connectivity when clocking in?",
        a: "The mobile app records the timestamp and GPS coordinates offline. As soon as the device reconnects to network, the verified punch syncs securely.",
      },
      {
        q: "Can different branches have different office timings and late-mark rules?",
        a: "Yes. Each branch can have its own shift schedules, grace periods (e.g. 15 minutes grace), and penalties for consecutive late arrivals.",
      },
      {
        q: "Can sales and field employees clock in from client locations?",
        a: "Yes. You can enable 'Client Site Punch' with GPS tagging for field staff, allowing them to record their visits with live location stamps.",
      },
    ],
  },

  "leave-management": {
    slug: "leave-management",
    title: "Leave Management",
    badge: "Absence & Accruals",
    headline: "Transparent leave balances, automated accruals, and 1-click approvals on mobile",
    subhead:
      "Replace chaotic WhatsApp messages and paper leave forms with a self-service leave portal. Set branch-specific holiday calendars, leave quotas, and multi-level manager approvals.",
    problemTitle: "The Chaos of Unstructured Leave Tracking",
    problemDesc:
      "When leave requests travel over WhatsApp and email, managers forget who is away, leaves get approved without quota checks, and negative balances slip into payroll undetected.",
    problemPoints: [
      {
        issue: "Lost Paper & Chat Records",
        impact: "Disputes over remaining casual and sick leave quotas at year-end.",
      },
      {
        issue: "Staffing Blindspots",
        impact: "Multiple key team members take time off concurrently, leaving departments understaffed.",
      },
      {
        issue: "Manual Loss of Pay (LOP) Errors",
        impact: "Unapproved absences go undeducted, inflating salary disbursements.",
      },
    ],
    solutionTitle: "Transparent Policies with Instant Approval Routing",
    solutionDesc:
      "LattiumHR simplifies absence management for both staff and managers. Team members see exact balances before applying, and managers approve requests in seconds with complete calendar visibility.",
    solutionPoints: [
      "Custom leave types: Casual Leave (CL), Sick Leave (SL), Earned Leave (EL), Maternity, Paternity, and Bereavement",
      "Automated monthly or annual accrual engines with encashment and carry-forward caps",
      "Multi-tier approval flows routing requests to primary managers, department heads, or HR",
      "Branch-specific statutory holiday calendars reflecting regional festivals and state holidays",
    ],
    capabilities: [
      {
        title: "Automated Accruals",
        desc: "Credit leaves automatically on the 1st of every month or year. Enforce carry-forward limits seamlessly.",
        icon: "calendar",
        tag: "Automated",
      },
      {
        title: "Mobile Leave Application",
        desc: "Staff apply for full-day, half-day, or hourly time off from their phones with reason and document attachments.",
        icon: "leave",
      },
      {
        title: "Team Conflict Radar",
        desc: "Alerts managers when two team members in the same department apply for overlapping dates.",
        icon: "role",
      },
      {
        title: "Regional Holiday Calendars",
        desc: "Define distinct festival holidays for Mumbai, Bengaluru, Chennai, and Delhi without cross-branch confusion.",
        icon: "globe",
      },
      {
        title: "Comp-Off Grant & Redemption",
        desc: "Grant compensatory offs for weekend work and enforce expiry dates (e.g., valid for 60 days).",
        icon: "award",
      },
      {
        title: "LOP Sync with Payroll",
        desc: "Approved unpaid leaves automatically calculate as Loss of Pay (LOP) deductions in monthly salary processing.",
        icon: "wallet",
      },
    ],
    mockupType: "leave",
    mockupTitle: "Mobile Employee Self-Service",
    mockupSubtitle: "Instant balance checks, leave applications, and manager approvals",
    roiStats: [
      { value: "4 mins", label: "Average approval turnaround", desc: "Managers approve leaves directly via mobile notification or email." },
      { value: "0", label: "Year-end quota discrepancies", desc: "Real-time ledger prevents over-utilization and disputes." },
      { value: "100%", label: "Accurate LOP deductions", desc: "No manual calculations needed when compiling monthly salary inputs." },
    ],
    faqs: [
      {
        q: "Can probationary employees have restricted leave policies?",
        a: "Yes. You can configure leave types to only unlock after the probation completion date or limit accruals during the probation period.",
      },
      {
        q: "What happens if a statutory holiday falls in between an employee’s leave dates?",
        a: "LattiumHR includes an optional 'Sandwich Rule' setting. You can decide whether intervening holidays count as leave days or excluded working days.",
      },
      {
        q: "Can leave encashment be processed during full-and-final settlement?",
        a: "Yes. Unused earned leaves are automatically calculated based on daily basic pay during exit clearance.",
      },
    ],
  },

  "payroll-management": {
    slug: "payroll-management",
    title: "Payroll Management",
    badge: "Salary & Compliance",
    headline: "Run accurate, 100% compliant multi-branch payroll in under 30 minutes",
    subhead:
      "Automate complex salary structures, statutory deductions (PF, ESI, PT, TDS), attendance integrations, and digital payslip distribution with bank-ready payout files.",
    problemTitle: "The High Stakes of Spreadsheet Payroll",
    problemDesc:
      "Managing salary calculations on spreadsheets exposes organizations to formula errors, missed statutory deadlines, incorrect tax brackets, and delayed salary transfers.",
    problemPoints: [
      {
        issue: "Formula & Manual Entry Errors",
        impact: "Incorrect pay, employee dissatisfaction, and time wasted on salary adjustments.",
      },
      {
        issue: "Multi-State Statutory Complexities",
        impact: "Differing Professional Tax (PT) slabs and ESI thresholds cause non-compliance fines.",
      },
      {
        issue: "Tedious Payslip Generation",
        impact: "Generating and emailing PDF payslips to hundreds of staff takes days of administrative work.",
      },
    ],
    solutionTitle: "Automated, 4-Step Salary Processing Engine",
    solutionDesc:
      "LattiumHR links your attendance, approved leaves, reimbursements, and loan deductions directly into payroll. Review calculated gross, statutory deductions, and net payouts in minutes.",
    solutionPoints: [
      "Automatic calculation of Provident Fund (PF), Employee State Insurance (ESI), Professional Tax (PT), and TDS",
      "Support for customizable earnings: Basic, HRA, Special Allowance, Performance Bonus, and LTA",
      "Ready-to-upload bank disbursement files compatible with HDFC, ICICI, SBI, and Axis Bank",
      "1-click digital payslip distribution with password-protected PDF downloads via mobile app",
    ],
    capabilities: [
      {
        title: "Statutory Compliance Engine",
        desc: "Built-in statutory rules for Indian PF (12%), ESI (0.75% / 3.25%), state-specific PT slabs, and income tax.",
        icon: "shield",
        tag: "100% Compliant",
      },
      {
        title: "1-Click Bank Payouts",
        desc: "Generate formatted NEFT/RTGS payment sheets for all major commercial banks in India.",
        icon: "download",
      },
      {
        title: "Reimbursements & Claims",
        desc: "Approved travel and food claims automatically credit into the corresponding month's payout.",
        icon: "finance",
      },
      {
        title: "Salary Advance & Loans",
        desc: "Track company loans with automated monthly EMI deductions until principal recovery is complete.",
        icon: "loan",
      },
      {
        title: "Full & Final Settlement",
        desc: "Calculate notice period pay, leave encashment, gratuity, and pending claims in a structured exit workflow.",
        icon: "document",
      },
      {
        title: "Form 16 & Tax Declarations",
        desc: "Allow staff to submit 80C/80D tax declarations, preview tax calculations, and download annual Form 16.",
        icon: "reports",
      },
    ],
    mockupType: "payroll",
    mockupTitle: "March 2025 Payroll Summary",
    mockupSubtitle: "₹28,42,650 Net Payroll calculated with verified statutory deductions",
    roiStats: [
      { value: "30 mins", label: "Payroll processing cycle", desc: "Down from 4 full days of manual spreadsheet compilation." },
      { value: "100%", label: "On-time statutory filings", desc: "ECR text files generated instantly for EPFO and ESIC portals." },
      { value: "0", label: "Salary calculation disputes", desc: "Transparent payslips show itemized earnings, deductions, and attendance days." },
    ],
    faqs: [
      {
        q: "Does LattiumHR support both New and Old Income Tax Regimes?",
        a: "Yes. Employees can select their preferred tax regime at the beginning of the financial year, and tax projections adjust automatically.",
      },
      {
        q: "Can we run payroll for different branches on different dates?",
        a: "Yes. You can organize payroll groups by branch or company entity and process them on independent cycles if required.",
      },
      {
        q: "What reports are available for our chartered accountant?",
        a: "LattiumHR generates PF ECR text files, ESIC monthly return summaries, PT state-wise challans, TDS 24Q quarterly sheets, and detailed salary registers.",
      },
    ],
  },

  "asset-management": {
    slug: "asset-management",
    title: "Asset Management",
    badge: "Hardware & IT Inventory",
    headline: "Track company laptops, devices, and physical assets from handover to return",
    subhead:
      "Prevent equipment loss and streamline IT handovers. Maintain an audit-ready inventory of company assets, assign them to team members, and capture digital handover receipts.",
    problemTitle: "Where Do Company Assets Disappear?",
    problemDesc:
      "When companies scale past 50 employees, untracked laptops, monitors, SIM cards, and access badges go missing during branch transfers and sudden employee exits.",
    problemPoints: [
      {
        issue: "Unrecorded Equipment Handover",
        impact: "No documented proof of which serial number was assigned to which employee.",
      },
      {
        issue: "Exit Clearance Blindspots",
        impact: "Exiting employees leave without returning expensive laptops or company equipment.",
      },
      {
        issue: "Warranty & Depreciation Gaps",
        impact: "Missed warranty claims and inaccurate physical asset depreciation figures on balance sheets.",
      },
    ],
    solutionTitle: "Digital Custody Records for Every Company Asset",
    solutionDesc:
      "LattiumHR connects IT asset management directly into HR lifecycle workflows. Equipment is assigned during onboarding, acknowledged with digital receipts, and automatically flagged for return during exit clearance.",
    solutionPoints: [
      "Asset catalog with category grouping: Laptops, Monitors, Mobile Devices, Furniture, and Vehicles",
      "Serial number, purchase date, warranty expiration, and vendor invoice tracking",
      "Digital handover slips requiring employee sign-off before equipment custody is confirmed",
      "Exit clearance gatekeeping that prevents full-and-final settlement until all assets are checked back in",
    ],
    capabilities: [
      {
        title: "Serial & Barcode Logging",
        desc: "Record unique identifiers, brand, model, MAC addresses, and specifications for every device.",
        icon: "asset",
        tag: "Inventory",
      },
      {
        title: "Digital Handover Slips",
        desc: "Employees accept asset custody digitally, acknowledging condition and company terms.",
        icon: "document",
      },
      {
        title: "Automated Exit Checklist",
        desc: "IT and HR dashboards instantly highlight pending unreturned assets during employee offboarding.",
        icon: "check",
      },
      {
        title: "Warranty & AMC Tracking",
        desc: "Receive automated alerts 30 days before manufacturer warranties or AMC contracts expire.",
        icon: "clock",
      },
      {
        title: "Branch Inventory Allocation",
        desc: "Filter and view equipment distributed across Mumbai HQ, Bengaluru tech hub, and Delhi offices.",
        icon: "branch",
      },
      {
        title: "Asset Repair & Scrapping History",
        desc: "Log maintenance tickets, repair expenses, and retirement records for old equipment.",
        icon: "setup",
      },
    ],
    mockupType: "asset",
    mockupTitle: "Company Asset Repository",
    mockupSubtitle: "340 active hardware assets tracked across 3 office locations",
    roiStats: [
      { value: "0", label: "Unreturned laptops on exit", desc: "Automated exit gatekeeping ensures 100% asset recovery." },
      { value: "100%", label: "Custody transparency", desc: "Always know who is holding which machine and since when." },
      { value: "₹4L+", label: "Annual equipment cost saved", desc: "Avoid unnecessary purchases by redeploying returned assets." },
    ],
    faqs: [
      {
        q: "Can employees raise repair requests for assigned laptops?",
        a: "Yes. Employees can submit a maintenance request with damage photos and notes through the self-service portal.",
      },
      {
        q: "How does asset clearance work when an employee resigns?",
        a: "The offboarding workflow automatically generates a return checklist for IT. The HR team cannot complete the final exit settlement until IT marks all items as returned.",
      },
      {
        q: "Can we track software licenses in addition to physical hardware?",
        a: "Yes. You can create virtual asset categories for SaaS licenses, software keys, and email accounts.",
      },
    ],
  },

  "recruitment": {
    slug: "recruitment",
    title: "Recruitment Pipeline",
    badge: "Hiring & ATS",
    headline: "Structured candidate pipelines, collaborative interview scorecards, and 1-click offers",
    subhead:
      "Transform recruitment from disorganized email chains into a transparent hiring pipeline. Track candidates across custom stages, collect panel feedback, and roll out digital offer letters.",
    problemTitle: "The Friction of Manual Hiring Processes",
    problemDesc:
      "Great talent is lost when candidate resumes sit unopened in personal inboxes, interview feedback is shared verbally, and offer letters take days to draft and dispatch.",
    problemPoints: [
      {
        issue: "Dropped Candidate Communication",
        impact: "Top candidates accept competing offers due to slow interview scheduling and feedback.",
      },
      {
        issue: "Subjective Evaluation",
        impact: "No standardized interview scorecards leads to poor hiring decisions and misaligned teams.",
      },
      {
        issue: "Manual Offer Letter Generation",
        impact: "HR spends hours copying compensation structures into Word templates with risk of typo errors.",
      },
    ],
    solutionTitle: "Collaborative, Fast-Moving Hiring Pipelines",
    solutionDesc:
      "LattiumHR provides a hiring pipeline that connects hiring managers, interviewers, and HR in one workspace. From job requisition to digital offer acceptance, every step is streamlined.",
    solutionPoints: [
      "Customizable hiring stages: Sourced, Screening, Technical Interview, Culture Fit, Offer, and Hired",
      "Structured candidate scorecards with standardized competency ratings and interviewer comments",
      "Automated interview scheduling with calendar sync and candidate email notifications",
      "Dynamic offer letter templates that automatically merge candidate compensation packages",
    ],
    capabilities: [
      {
        title: "Visual Kanban Pipeline",
        desc: "Drag-and-drop candidates across hiring stages with instant stage duration metrics.",
        icon: "role",
        tag: "Kanban",
      },
      {
        title: "Interview Scorecards",
        desc: "Collect structured feedback from interviewers before making consensus hiring decisions.",
        icon: "check",
      },
      {
        title: "1-Click Offer Letters",
        desc: "Generate professional offer letters populated with designation, CTC breakdown, and joining date.",
        icon: "document",
      },
      {
        title: "Seamless Onboarding Handoff",
        desc: "When a candidate accepts their offer, their profile automatically converts into an employee record.",
        icon: "sparkle",
      },
      {
        title: "Job Requisition Approvals",
        desc: "Require department head and finance approval before opening new job positions and salary budgets.",
        icon: "briefcase",
      },
      {
        title: "Hiring Velocity Analytics",
        desc: "Measure Time-to-Hire, Offer Acceptance Rate, and sourcing channel effectiveness.",
        icon: "reports",
      },
    ],
    mockupType: "recruitment",
    mockupTitle: "Active Hiring Pipeline",
    mockupSubtitle: "14 open positions with 68 candidates progressing across evaluation stages",
    roiStats: [
      { value: "40%", label: "Faster time-to-hire", desc: "Structured scheduling and scorecards accelerate panel decisions." },
      { value: "94%", label: "Offer acceptance rate", desc: "Professional, fast offer rollouts impress top candidates." },
      { value: "0 data reentry", label: "From candidate to employee", desc: "Accepted candidates transition directly into employee records." },
    ],
    faqs: [
      {
        q: "Can interviewers see each other's scorecards before submitting their own?",
        a: "No. LattiumHR supports blind evaluation mode to ensure interviewers submit unbiased feedback before reviewing colleagues' notes.",
      },
      {
        q: "Can candidates digitally sign their offer letters?",
        a: "Yes. Candidates receive a secure link to review their offer, salary structure, and accept digitally.",
      },
      {
        q: "Does LattiumHR integrate with external job boards?",
        a: "You can generate custom application links for LinkedIn, your careers page, and recruitment agencies to route applicants directly into your pipeline.",
      },
    ],
  },

  "performance-management": {
    slug: "performance-management",
    title: "Performance Management",
    badge: "OKRs & Appraisals",
    headline: "Align company goals, track quarterly OKRs, and run transparent appraisal reviews",
    subhead:
      "Move beyond stressful once-a-year reviews. Build a culture of continuous achievement with transparent OKRs, 360-degree peer feedback, and data-backed appraisal cycles.",
    problemTitle: "The Flaws of Annual Annual Performance Reviews",
    problemDesc:
      "Annual reviews rely on recent memory rather than whole-year contributions. Employees feel evaluated unfairly, and managers spend weeks filling out subjective rating forms.",
    problemPoints: [
      {
        issue: "Goal Misalignment",
        impact: "Individual tasks do not roll up into company-wide strategic objectives.",
      },
      {
        issue: "Recency Bias in Evaluations",
        impact: "Achievements from earlier quarters are overlooked during year-end appraisal ratings.",
      },
      {
        issue: "Unclear Promotion Criteria",
        impact: "Lack of transparent rating criteria causes employee demotivation and unexpected attrition.",
      },
    ],
    solutionTitle: "Continuous, Transparent Goal & Review Cycles",
    solutionDesc:
      "LattiumHR provides a modern performance framework that balances objective metric tracking with qualitative peer insights. Teams track progress all year, making appraisal cycles straightforward and fair.",
    solutionPoints: [
      "Company, department, and personal OKR cascading with measurable key result progress bars",
      "Flexible review cycles: Quarterly check-ins, Bi-annual reviews, or Annual appraisal cycles",
      "360-degree peer feedback collecting input from peers, reporting subordinates, and managers",
      "Automated calibration grids and bell-curve rating matrices for leadership reviews",
    ],
    capabilities: [
      {
        title: "Cascading OKR Tracking",
        desc: "Connect individual goals to company targets. Update progress percentages with milestones.",
        icon: "setup",
        tag: "OKRs",
      },
      {
        title: "360° Peer Feedback",
        desc: "Gather well-rounded performance perspectives from colleagues across cross-functional projects.",
        icon: "users",
      },
      {
        title: "Self-Review Workflows",
        desc: "Allow staff to document their top achievements, self-rate skills, and outline growth ambitions.",
        icon: "document",
      },
      {
        title: "Calibration & 9-Box Grid",
        desc: "Calibrate performance vs. potential on leadership matrices to identify future leaders.",
        icon: "chart",
      },
      {
        title: "Promotion & Salary Linkage",
        desc: "Directly feed approved appraisal ratings into compensation revision bands and payroll.",
        icon: "wallet",
      },
      {
        title: "Continuous 1-on-1 Notes",
        desc: "Document action items and coaching notes from weekly or bi-weekly manager check-ins.",
        icon: "sparkle",
      },
    ],
    mockupType: "performance",
    mockupTitle: "Quarterly OKR & Appraisal Dashboard",
    mockupSubtitle: "Team goal alignment at 88% with transparent calibration matrices",
    roiStats: [
      { value: "3x", label: "More frequent feedback", desc: "Quarterly check-ins keep goals relevant and staff engaged." },
      { value: "92%", label: "Appraisal completion rate", desc: "Automated reminders ensure managers submit reviews on schedule." },
      { value: "18%", label: "Reduction in top-talent turnover", desc: "Clear growth trajectories and recognition improve retention." },
    ],
    faqs: [
      {
        q: "Can we customize the review questionnaire for different roles?",
        a: "Yes. You can assign different evaluation criteria, competencies, and weightages for engineering, sales, and management roles.",
      },
      {
        q: "Can performance ratings remain confidential until calibration is complete?",
        a: "Yes. HR administrators can keep manager ratings confidential until company-wide calibration and executive approval are finalized.",
      },
      {
        q: "How does LattiumHR help with underperforming team members?",
        a: "You can initiate formal Performance Improvement Plans (PIPs) with specific targets, review timelines, and documented milestone reviews.",
      },
    ],
  },

  "documents-compliance": {
    slug: "documents-compliance",
    title: "Documents & Compliance",
    badge: "Digital Vault & Legal",
    headline: "Centralized document vault with automated expiry alerts and digital acknowledgments",
    subhead:
      "Eliminate compliance risks and physical filing cabinets. Securely store identity documents, statutory forms, employment contracts, and company policies with role-based access.",
    problemTitle: "The Regulatory Exposure of Disorganized HR Documents",
    problemDesc:
      "Labor law compliance requires strict record-keeping. Storing sensitive employee Aadhaar, PAN, PF nomination forms, and NDA agreements in unlocked folders invites legal liability.",
    problemPoints: [
      {
        issue: "Expired Certifications & Visas",
        impact: "Work permits, contracts, and medical fitness certificates expire unnoticed.",
      },
      {
        issue: "Data Privacy & Breach Vulnerability",
        impact: "Sensitive salary and identity records accessible to unauthorized personnel.",
      },
      {
        issue: "Audit Inspection Panic",
        impact: "Scrambling to gather mandatory statutory registers during surprise labor audits.",
      },
    ],
    solutionTitle: "Secure, Audit-Ready Document Management",
    solutionDesc:
      "LattiumHR provides a bank-grade digital document vault for company and employee records. Every document is categorized, encrypted at rest, and monitored for renewal deadlines.",
    solutionPoints: [
      "Employee document vaults storing Aadhaar, PAN, passport, academic proofs, and prior experience letters",
      "Company policy acknowledgment engine requiring staff to digitally accept revised HR policies",
      "Automated reminder triggers 60, 30, and 7 days prior to document expiration",
      "Statutory compliance register generation: Form F (Gratuity), Form Q (Leaves), Form T (Wage slips)",
    ],
    capabilities: [
      {
        title: "Role-Based Document Vault",
        desc: "Strict access segmentation ensures only designated HR and management personnel view sensitive records.",
        icon: "shield",
        tag: "Encrypted",
      },
      {
        title: "Policy Acknowledgment Tracking",
        desc: "Distribute POSH, Code of Conduct, and IT security policies with mandatory digital sign-offs.",
        icon: "document",
      },
      {
        title: "Expiry Alert System",
        desc: "Automated alerts for passport renewals, contractor agreements, and vehicle permit expirations.",
        icon: "clock",
      },
      {
        title: "Statutory Register Exports",
        desc: "Export pre-formatted statutory registers compliant with the Factories Act and Shops & Establishments Act.",
        icon: "reports",
      },
      {
        title: "Bulk Document Dispatch",
        desc: "Issue annual increment letters, bonus letters, and company notices in bulk with custom merge tags.",
        icon: "upload",
      },
      {
        title: "Complete Audit Trail",
        desc: "Log every document upload, viewing timestamp, download event, and deletion request.",
        icon: "search",
      },
    ],
    mockupType: "documents",
    mockupTitle: "Compliance & Document Repository",
    mockupSubtitle: "100% verified documentation across all statutory mandates",
    roiStats: [
      { value: "0", label: "Labor law audit penalties", desc: "All mandatory registers generated with full historical integrity." },
      { value: "100%", label: "Policy acknowledgment audit trail", desc: "Proof of employee sign-off on anti-harassment and safety guidelines." },
      { value: "90%", label: "Faster audit preparation", desc: "Pull inspector-ready reports in minutes instead of digging through paper archives." },
    ],
    faqs: [
      {
        q: "Where are our employee documents stored?",
        a: "Documents are stored in encrypted cloud storage with AES-256 encryption at rest and TLS 1.3 in transit, hosted within certified data centers in India.",
      },
      {
        q: "Can employees download their own employment letters?",
        a: "Yes. Staff can download approved documents such as appointment letters, salary revision letters, and annual payslips from the mobile app.",
      },
      {
        q: "How does the policy acknowledgment feature work?",
        a: "When a new policy is published, employees receive a notification and must review and check an acceptance box before proceeding.",
      },
    ],
  },

  "reports-analytics": {
    slug: "reports-analytics",
    title: "Reports & Analytics",
    badge: "Intelligence & BI",
    headline: "Real-time workforce intelligence, salary cost trends, and decision-ready reports",
    subhead:
      "Empower leadership with actionable people metrics. Visualize headcount trends, department attrition, attendance patterns, and overtime expenditure in real-time dashboards.",
    problemTitle: "Making High-Stakes People Decisions in the Dark",
    problemDesc:
      "When business leaders ask for monthly payroll expenditure or attrition rates across branches, HR takes a week to compile disparate data files, resulting in outdated conclusions.",
    problemPoints: [
      {
        issue: "Lagging Historical Reports",
        impact: "Management discovers spike in resignations months after key talent has already departed.",
      },
      {
        issue: "Uncontrolled Overtime Expenditure",
        impact: "Branch overtime costs escalate without central executive visibility.",
      },
      {
        issue: "Inconsistent Cross-Branch Metrics",
        impact: "Different branches calculate attendance and attrition using incompatible formulas.",
      },
    ],
    solutionTitle: "Executive Visibility Across Every Workforce Metric",
    solutionDesc:
      "LattiumHR automatically compiles data from attendance punches, payroll runs, leave balances, and hiring pipelines into visual dashboards and custom exportable reports.",
    solutionPoints: [
      "Workforce growth & attrition graphs tracking monthly additions, departures, and tenure",
      "Salary expenditure analytics highlighting department-wise gross, benefits, and overtime trends",
      "Branch performance comparisons evaluating attendance reliability and absenteeism rates",
      "Custom report builder with drag-and-drop column selection and scheduled email delivery",
    ],
    capabilities: [
      {
        title: "Executive Overview Dashboard",
        desc: "C-suite views covering total headcount, payroll outlay, monthly attendance, and open requisitions.",
        icon: "chart",
        tag: "Executive",
      },
      {
        title: "Attrition & Retention Insights",
        desc: "Break down employee turnover by department, branch location, tenure, and exit interview reasons.",
        icon: "reports",
      },
      {
        title: "Branch Comparison Matrix",
        desc: "Benchmark regional branches against each other for attendance punctuality and labor costs.",
        icon: "branch",
      },
      {
        title: "Payroll & Budget Variance",
        desc: "Compare actual monthly salary spend against approved quarterly departmental budgets.",
        icon: "finance",
      },
      {
        title: "Scheduled Automated Exports",
        desc: "Configure automated Excel and PDF reports delivered directly to management inboxes every Monday.",
        icon: "download",
      },
      {
        title: "Custom Field Querying",
        desc: "Filter workforce data across any combination of custom fields, designations, or tenure tiers.",
        icon: "search",
      },
    ],
    mockupType: "reports",
    mockupTitle: "Workforce Intelligence Dashboard",
    mockupSubtitle: "Real-time headcount growth, branch attendance, and payroll outlay analysis",
    roiStats: [
      { value: "Instant", label: "Executive reporting", desc: "No waiting for manual month-end compilations to view key people metrics." },
      { value: "14%", label: "Overtime cost reduction", desc: "Real-time visibility highlights unexpected shift overtime early." },
      { value: "50+", label: "Pre-built standard reports", desc: "Ready-to-use reports covering statutory, operational, and financial dimensions." },
    ],
    faqs: [
      {
        q: "Can branch managers only see reports for their respective branch?",
        a: "Yes. Role-based permissions restrict data views so branch leaders only see analytics for their own teams, while executive leadership sees the unified company-wide view.",
      },
      {
        q: "Can reports be exported to Excel and CSV?",
        a: "Yes. Every table and graph can be exported to Excel (.xlsx), CSV, and PDF formats with a single click.",
      },
      {
        q: "Does LattiumHR calculate statutory gender diversity ratios?",
        a: "Yes. Diversity and demographic breakdowns by department and level are available out of the box.",
      },
    ],
  },

  "roles-permissions": {
    slug: "roles-permissions",
    title: "Roles & Permissions",
    badge: "Security & Governance",
    headline: "Granular access controls by branch, department, and managerial hierarchy",
    subhead:
      "Safeguard sensitive salary and personnel data without slowing down daily work. Configure custom roles, branch scopes, and approval authorities with precision.",
    problemTitle: "The Danger of All-or-Nothing Admin Privileges",
    problemDesc:
      "In many HR software tools, users are either restricted regular employees or all-powerful super administrators who can see every executive salary and modify confidential settings.",
    problemPoints: [
      {
        issue: "Accidental Salary Leaks",
        impact: "Line managers or HR interns viewing executive compensation details.",
      },
      {
        issue: "Branch Scope Creep",
        impact: "Regional managers approving leaves or altering rosters for offices outside their jurisdiction.",
      },
      {
        issue: "Audit Deficiencies",
        impact: "Inability to demonstrate which user modified a salary record or approved an overtime claim.",
      },
    ],
    solutionTitle: "Precision Role-Based Access Control (RBAC)",
    solutionDesc:
      "LattiumHR gives you total control over who can view, edit, approve, or export data. Combine permission sets with branch and department filters to create exact access boundaries.",
    solutionPoints: [
      "Standard predefined roles: Super Admin, HR Manager, Branch Manager, Finance Admin, and Employee",
      "Custom role builder allowing granular field-level view and edit rights (e.g., Hide Salary field)",
      "Geographic scoping restricting managers to records within their assigned city or branch office",
      "Immutable activity audit logs recording every login, data export, permission change, and approval",
    ],
    capabilities: [
      {
        title: "Multi-Level Access Hierarchy",
        desc: "Define distinct permission levels for executive leadership, branch supervisors, and site coordinators.",
        icon: "shield",
        tag: "Governance",
      },
      {
        title: "Geographic Scoping",
        desc: "Branch managers can view and approve requests only for personnel stationed in their physical office.",
        icon: "globe",
      },
      {
        title: "Field-Level Privacy Masks",
        desc: "Hide sensitive fields such as Basic Salary or PAN number from departmental managers.",
        icon: "lock",
      },
      {
        title: "Custom Approval Routing",
        desc: "Chain approvals based on hierarchy (e.g. Leave > Manager > Branch HR; Expense > Manager > Finance).",
        icon: "role",
      },
      {
        title: "Comprehensive Audit Trail",
        desc: "Timestamped logs of every data modification, report download, and security credential update.",
        icon: "document",
      },
      {
        title: "Two-Factor Authentication (2FA)",
        desc: "Enforce OTP or authenticator app 2FA for all administrative and finance user accounts.",
        icon: "setup",
      },
    ],
    mockupType: "roles",
    mockupTitle: "Role & Permission Matrix",
    mockupSubtitle: "Granular access policies protecting employee privacy across 3 operational tiers",
    roiStats: [
      { value: "0", label: "Confidential data leaks", desc: "Salary and identity details shielded behind field-level privacy masks." },
      { value: "100%", label: "Audit accountability", desc: "Every administrative action stamped with user identity and timestamp." },
      { value: "15 mins", label: "To configure custom roles", desc: "Intuitive toggle matrix makes role creation fast and error-free." },
    ],
    faqs: [
      {
        q: "Can a manager have different roles across two branches?",
        a: "Yes. An operational leader can be assigned Manager privileges for Mumbai while holding Viewer-only rights for the Pune satellite facility.",
      },
      {
        q: "What happens to permissions when an employee changes departments?",
        a: "Their inherited role permissions update automatically based on their new department and reporting assignment.",
      },
      {
        q: "Can we restrict admin logins to specific office IP addresses?",
        a: "Yes. You can enforce IP whitelisting so administrative actions can only be executed from approved office networks.",
      },
    ],
  },
};
