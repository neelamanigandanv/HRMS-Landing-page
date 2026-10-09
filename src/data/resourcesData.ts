import { IconName } from "../components/ui/Icon";

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  author: { name: string; role: string; avatar: string };
  content: string[];
  keyTakeaways: string[];
}

export interface GlossaryTerm {
  term: string;
  category: "Payroll & Tax" | "Attendance & Leave" | "HR Ops & Compliance" | "Recruitment & Performance";
  definition: string;
  example: string;
}

export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export interface HelpCategory {
  title: string;
  icon: IconName;
  description: string;
  articleCount: number;
  articles: { title: string; readTime: string; summary: string }[];
}

export interface GettingStartedStep {
  step: number;
  title: string;
  timeEstimate: string;
  description: string;
  tasks: string[];
  tips: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  employees: string;
  locations: string;
  headline: string;
  quote: string;
  author: { name: string; role: string };
  metrics: { value: string; label: string }[];
  challenge: string;
  solution: string;
  results: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "indian-payroll-compliance-guide-2025",
    title: "The Complete Guide to Indian Statutory Payroll Compliance in 2025",
    category: "Payroll & Compliance",
    readTime: "7 min read",
    date: "March 15, 2025",
    excerpt:
      "A practical breakdown of PF, ESI, Professional Tax slabs, and TDS calculations for businesses scaling across multiple Indian states.",
    author: {
      name: "Ria Desai",
      role: "Head of Payroll Advisory",
      avatar: "RD",
    },
    keyTakeaways: [
      "Provident Fund (PF) is mandatory for organizations with 20+ employees, capped at 12% of basic wages up to ₹15,000 threshold.",
      "ESIC applies to units with 10+ employees with wage limits up to ₹21,000/month (0.75% employee, 3.25% employer).",
      "Professional Tax (PT) varies across states; Maharashtra, Karnataka, and West Bengal enforce distinct monthly and bi-annual slabs.",
      "Automating payroll eliminates the human error rate of manual spreadsheets and generates instant ECR text files.",
    ],
    content: [
      "Running payroll for an expanding organization in India is one of the most operationally complex responsibilities for finance and HR leaders. While basic salary calculations may appear simple on the surface, statutory contributions, state-specific levies, and frequent government regulatory updates introduce layers of compliance risks.",
      "Under the Employees' Provident Funds and Miscellaneous Provisions Act, 1952, statutory PF contributions of 12% by both the employer and employee must be remitted by the 15th of the following month. Failing to remit on time incurs penal damages under Section 14B ranging from 5% to 25% per annum.",
      "Employee State Insurance (ESI) requires equally meticulous handling. For employees earning up to ₹21,000 per month, 0.75% is deducted from the employee and 3.25% is contributed by the employer. Maintaining accurate wage definitions and filing monthly contribution returns on the ESIC portal prevents labor inspection notices.",
      "State-specific levies such as Professional Tax (PT) create compounding headaches for multi-branch organizations. For example, in Maharashtra, PT is ₹200 per month except in February when it increases to ₹300, whereas in Karnataka, PT is ₹200 per month for gross salaries above ₹15,000. LattiumHR’s multi-branch rules engine automatically applies the appropriate state slabs based on employee office assignment.",
    ],
  },
  {
    slug: "geofenced-attendance-vs-biometric-scanners",
    title: "Geofenced Mobile Attendance vs. Biometric Machines: Which is Best for Your Team?",
    category: "Attendance & Operations",
    readTime: "5 min read",
    date: "February 28, 2025",
    excerpt:
      "Evaluate the pros and cons of mobile GPS clock-in versus hardware fingerprint devices for offices, retail stores, and hybrid workforces.",
    author: {
      name: "Arjun Malhotra",
      role: "Workforce Operations Director",
      avatar: "AM",
    },
    keyTakeaways: [
      "Hardware biometric machines create bottlenecks at office entrances during peak morning rush hours.",
      "Geofenced mobile check-ins provide 100% attendance visibility for field, remote, and multi-branch teams without hardware capital expenditure.",
      "Hybrid setups combining cloud-synced biometrics at manufacturing gates with mobile check-ins at corporate offices offer maximum flexibility.",
    ],
    content: [
      "For decades, the physical biometric fingerprint machine was the gold standard of workplace accountability. However, as organizations expand into multi-city branches, remote working, and client-site deployments, hardware devices present significant limitations.",
      "Physical machines are vulnerable to hardware breakdowns, network disconnections, and long queues at 9:00 AM. When an employee forgets their ID card or a scanner fails, HR spends hours manually adjusting time logs. More critically, physical scanners cannot track on-field sales executives or service technicians visiting client premises.",
      "Mobile attendance with GPS geofencing transforms every employee's smartphone into a verified time clock. By configuring virtual boundaries around your office coordinates, employees can only punch in when they are physically inside the premises. GPS tags, timestamp verification, and optional selfie validation prevent proxy attendance entirely.",
      "For manufacturing facilities and retail stores, a unified approach works best: deploy cloud-connected biometric devices at factory gates while empowering white-collar and field teams with the mobile app. Both streams flow into LattiumHR's centralized attendance engine.",
    ],
  },
  {
    slug: "reducing-employee-attrition-with-better-hr-processes",
    title: "How Streamlined HR Workflows Cut Employee Attrition by 18%",
    category: "Retention & Culture",
    readTime: "6 min read",
    date: "February 12, 2025",
    excerpt:
      "Why clunky administrative processes frustrate top performers, and how transparent leave approvals and error-free payroll boost retention.",
    author: {
      name: "Neha Srinivasan",
      role: "VP of People & Culture",
      avatar: "NS",
    },
    keyTakeaways: [
      "Late payslips and disputed leave balances are among the top five hidden triggers of voluntary employee resignation.",
      "Employees expect modern, consumer-grade digital experiences in workplace software—not clunky 15-year-old internal portals.",
      "Transparent self-service platforms build organizational trust and free up HR to focus on career progression and leadership mentoring.",
    ],
    content: [
      "When people leaders analyze employee turnover, they typically look at compensation, manager relationships, and career growth. However, exit interviews reveal an insidious underlying factor: administrative frustration with internal company tools.",
      "When employees must send multiple emails to find out their remaining casual leave balance, or wait two weeks for an expense reimbursement of ₹3,000, they feel undervalued. A single incorrect salary calculation can permanently damage an employee's trust in company leadership.",
      "Modern workforce tools eliminate this operational friction. By providing immediate visibility into leave balances, transparent approval statuses, and error-free digital payslips on their mobile devices, employees feel respected and informed.",
      "Furthermore, when HR teams are liberated from answering routine administrative emails all day, they can redirect their energy toward meaningful 1-on-1 coaching, high-potential career pathways, and proactive retention programs.",
    ],
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Basic Salary",
    category: "Payroll & Tax",
    definition: "The core component of an employee’s compensation package, typically constituting 40% to 50% of the total Cost to Company (CTC). Statutory calculations such as Provident Fund and Gratuity are directly pegged to basic pay.",
    example: "If an employee's gross salary is ₹60,000, basic pay is typically structured at ₹24,000 to ₹30,000.",
  },
  {
    term: "Provident Fund (EPF)",
    category: "Payroll & Tax",
    definition: "A mandatory retirement savings scheme governed by the EPFO. In India, employees and employers each contribute 12% of the employee’s basic pay plus dearness allowance into the fund monthly.",
    example: "On a basic salary of ₹15,000, both the employee and employer contribute ₹1,800 monthly.",
  },
  {
    term: "Employee State Insurance (ESIC)",
    category: "Payroll & Tax",
    definition: "A social security and healthcare scheme for Indian workers earning up to ₹21,000 gross per month. The employee contributes 0.75% of gross wages, while the employer contributes 3.25%.",
    example: "An employee with ₹18,000 gross wage has ₹135 deducted, while the company contributes ₹585.",
  },
  {
    term: "Professional Tax (PT)",
    category: "Payroll & Tax",
    definition: "A state-level tax levied on salaried individuals by state governments in India. Slabs and exemption thresholds differ between states (e.g., Maharashtra, Karnataka, Telangana, West Bengal).",
    example: "In Karnataka, salaried employees earning above ₹15,000 per month pay ₹200 PT monthly.",
  },
  {
    term: "Geofencing",
    category: "Attendance & Leave",
    definition: "A location-based technology that uses GPS coordinates to establish a virtual geographic boundary around an office or job site. Employees can only mark attendance when physically inside the boundary.",
    example: "A 50-meter radius boundary configured around the Mumbai branch coordinates at Bandra Kurla Complex.",
  },
  {
    term: "Loss of Pay (LOP)",
    category: "Attendance & Leave",
    definition: "A salary deduction applied when an employee takes time off beyond their approved leave balance or has unauthorized absences during the payroll cycle.",
    example: "Taking 2 unapproved days off results in a deduction of 2 days of daily gross salary from monthly pay.",
  },
  {
    term: "Compensatory Off (Comp-Off)",
    category: "Attendance & Leave",
    definition: "A paid leave credit granted to an employee who works on a designated weekend, public holiday, or outside standard contractual working hours.",
    example: "Working on Saturday for a critical client release earns 1 day of compensatory leave valid for 60 days.",
  },
  {
    term: "Full & Final Settlement (F&F)",
    category: "HR Ops & Compliance",
    definition: "The formal exit financial clearance conducted when an employee leaves an organization. It accounts for unpaid days, leave encashment, notice period adjustments, gratuity, and pending claims.",
    example: "Processed within 30 to 45 days of an employee's last working day after IT and asset handovers are completed.",
  },
  {
    term: "Form 16",
    category: "Payroll & Tax",
    definition: "A certificate issued annually by an employer under Section 203 of the Income Tax Act, certifying the total salary paid and the Tax Deducted at Source (TDS) deposited with the government.",
    example: "Issued to employees by June 15 each year for filing annual personal income tax returns.",
  },
  {
    term: "Role-Based Access Control (RBAC)",
    category: "HR Ops & Compliance",
    definition: "A security methodology that restricts system access based on a user’s job function and organizational role, preventing unauthorized visibility of confidential salary or identity records.",
    example: "Granting a Branch Manager the right to approve local leaves while hiding executive compensation data.",
  },
  {
    term: "Applicant Tracking System (ATS)",
    category: "Recruitment & Performance",
    definition: "Software that manages the recruitment pipeline from job posting and candidate sourcing through interview stages, feedback scorecards, and digital offer letter generation.",
    example: "Moving a candidate from 'Technical Screening' to 'Culture Fit' in LattiumHR's visual kanban board.",
  },
  {
    term: "Objectives & Key Results (OKRs)",
    category: "Recruitment & Performance",
    definition: "A goal-setting framework used by organizations to define ambitious qualitative objectives paired with measurable, quantitative key results tracked over a quarter or year.",
    example: "Objective: 'Improve customer onboarding'; Key Result: 'Reduce customer time-to-value from 14 days to 4 days.'",
  },
];

export const faqList: FAQItem[] = [
  {
    category: "Implementation & Setup",
    question: "How long does it take to implement LattiumHR?",
    answer: "Most organizations with 50 to 500 employees go live within 2 to 4 weeks. Your assigned implementation specialist assists with historical employee data import, shift configuration, leave rule setup, and manager training.",
  },
  {
    category: "Implementation & Setup",
    question: "Can we import our existing employee records from Excel?",
    answer: "Yes. LattiumHR provides structured Excel/CSV import templates for employee master data, past leave balances, salary structures, and asset inventories with built-in validation checks.",
  },
  {
    category: "Multi-Branch & Locations",
    question: "How does LattiumHR handle offices in different states or cities?",
    answer: "You can create unlimited branch profiles. Each branch can have its own working hours, shift rosters, state holiday calendar, and state-specific Professional Tax rules, while executive leadership maintains centralized visibility.",
  },
  {
    category: "Multi-Branch & Locations",
    question: "Can employees be transferred between branch locations?",
    answer: "Yes. Admins can execute an employee branch transfer with an effective date. The employee's holiday calendar, shift assignments, and manager approval chains automatically update from that date.",
  },
  {
    category: "Payroll & Statutory Compliance",
    question: "Is LattiumHR compliant with Indian labor and tax laws?",
    answer: "Yes. The platform natively supports Provident Fund (PF), Employee State Insurance (ESIC), state-specific Professional Tax (PT), Labour Welfare Fund (LWF), and Tax Deducted at Source (TDS) under both Old and New Tax Regimes.",
  },
  {
    category: "Payroll & Statutory Compliance",
    question: "How are salary payments disbursed to employees?",
    answer: "Once payroll is finalized and approved, LattiumHR generates formatted bank disbursement files (NEFT/RTGS) compatible with HDFC, ICICI, SBI, Axis, and other major commercial banks for direct portal upload.",
  },
  {
    category: "Mobile & Employee Access",
    question: "Can employees use LattiumHR on their mobile devices?",
    answer: "Yes. Employees can access the platform via iOS and Android apps or any mobile browser to clock in with GPS geofencing, submit leave applications, check payslips, and review announcements.",
  },
  {
    category: "Security & Data Protection",
    question: "Where is our company data hosted and how is it protected?",
    answer: "All customer data is hosted in ISO 27001-certified Tier-III data centers located within India. Data is encrypted using AES-256 at rest and TLS 1.3 in transit, with automated daily backups and granular role-based access controls.",
  },
];

export const helpCategories: HelpCategory[] = [
  {
    title: "Account & Company Setup",
    icon: "setup",
    description: "Branch creation, organization chart mapping, and company-wide preferences",
    articleCount: 8,
    articles: [
      { title: "Setting up your first company branch", readTime: "4 min", summary: "How to define branch locations, GPS geofences, and working days." },
      { title: "Configuring organization departments & roles", readTime: "3 min", summary: "Creating hierarchical reporting lines and department cost centers." },
      { title: "Bulk importing employee records via CSV", readTime: "5 min", summary: "Guidelines and column formatting for bulk personnel onboarding." },
    ],
  },
  {
    title: "Attendance & Shifts",
    icon: "attendance",
    description: "Clock-in rules, GPS geofencing, biometric device sync, and rosters",
    articleCount: 12,
    articles: [
      { title: "Configuring office GPS geofence radius", readTime: "3 min", summary: "Setting latitude, longitude, and accuracy boundaries for mobile clock-ins." },
      { title: "Connecting biometric fingerprint scanners", readTime: "6 min", summary: "Configuring cloud API connectors for eSSL and ZKTeco devices." },
      { title: "Managing rotational shift schedules", readTime: "4 min", summary: "Assigning week-off patterns and shift rotations to team members." },
    ],
  },
  {
    title: "Leave & Holiday Calendars",
    icon: "leave",
    description: "Leave quota accruals, approval routing, and regional holiday calendars",
    articleCount: 9,
    articles: [
      { title: "Creating custom leave types and accrual policies", readTime: "4 min", summary: "Setting up monthly accrual caps, carry-forward limits, and encashment." },
      { title: "Setting regional state holiday calendars", readTime: "3 min", summary: "Assigning specific festival calendars to regional branch offices." },
      { title: "Managing compensatory off (Comp-off) credits", readTime: "3 min", summary: "Granting and approving comp-offs for weekend or overtime shifts." },
    ],
  },
  {
    title: "Payroll & Statutory Filings",
    icon: "payroll",
    description: "Salary structures, PF/ESI setup, tax declarations, and payslip generation",
    articleCount: 15,
    articles: [
      { title: "Running monthly payroll in 4 simple steps", readTime: "6 min", summary: "Verifying attendance, calculating gross pay, reviewing deductions, and publishing." },
      { title: "Generating PF ECR text files and ESIC returns", readTime: "4 min", summary: "Exporting government-compliant files for statutory portal uploads." },
      { title: "Generating bank disbursement sheets", readTime: "3 min", summary: "Creating NEFT batch files formatted for your corporate banking portal." },
    ],
  },
  {
    title: "Assets & IT Management",
    icon: "asset",
    description: "Hardware inventory, handover digital slips, and offboarding returns",
    articleCount: 7,
    articles: [
      { title: "Assigning laptops with digital handover receipts", readTime: "3 min", summary: "Capturing employee digital sign-offs for company-issued hardware." },
      { title: "Managing asset returns during employee exit", readTime: "4 min", summary: "Enforcing return checklists before approving final exit clearances." },
    ],
  },
  {
    title: "Security & User Roles",
    icon: "shield",
    description: "Granular permissions, field-level data masks, and audit logs",
    articleCount: 6,
    articles: [
      { title: "Creating custom administrative roles", readTime: "4 min", summary: "Setting view, edit, and approval rights for branch-level leaders." },
      { title: "Reviewing system activity audit logs", readTime: "3 min", summary: "Tracking historical data downloads, salary changes, and user logins." },
    ],
  },
];

export const gettingStartedSteps: GettingStartedStep[] = [
  {
    step: 1,
    title: "Organization Hierarchy & Branch Setup",
    timeEstimate: "Days 1 – 3",
    description: "Define your company entities, regional office branches, departments, and reporting lines.",
    tasks: [
      "Add branch office locations with physical addresses and GPS geofence boundaries.",
      "Define standard working hours, weekend patterns, and branch holiday calendars.",
      "Configure department categories and organizational reporting structures.",
    ],
    tips: "Ensure branch GPS coordinates are captured accurately from the center of your office floor for reliable geofencing.",
  },
  {
    step: 2,
    title: "Employee Directory & Document Import",
    timeEstimate: "Days 4 – 7",
    description: "Migrate your existing workforce records into LattiumHR’s central database.",
    tasks: [
      "Download the employee master import template and populate personnel details.",
      "Upload opening leave balances for each team member.",
      "Assign managers, departments, and designation titles to imported staff.",
    ],
    tips: "Our implementation specialists review your CSV file before final import to catch any duplicate emails or missing bank details.",
  },
  {
    step: 3,
    title: "Policy Configuration & Approval Workflows",
    timeEstimate: "Days 8 – 12",
    description: "Set up the business rules for attendance, leave approval chains, and salary structures.",
    tasks: [
      "Define leave types (Casual, Sick, Earned) and automated monthly accrual limits.",
      "Configure attendance regularization rules, grace periods, and overtime allowances.",
      "Set up salary earnings, PF/ESI statutory settings, and Professional Tax rules.",
    ],
    tips: "Keep approval chains to 1–2 levels maximum for standard leaves to ensure fast turnaround times.",
  },
  {
    step: 4,
    title: "Team Rollout, Training & Go-Live",
    timeEstimate: "Days 13 – 16",
    description: "Distribute employee invitations, conduct brief manager orientations, and launch live operations.",
    tasks: [
      "Send mobile app login invitations to employees via email and SMS.",
      "Host a 20-minute manager orientation on reviewing leaves and attendance regularizations.",
      "Run your first parallel payroll cycle to verify calculations against historical figures.",
    ],
    tips: "Running a parallel payroll cycle during your first month provides 100% confidence before switching off legacy spreadsheets.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "urbanbite-food-retail",
    client: "UrbanBite Retail",
    industry: "Quick-Service Restaurant & Retail",
    employees: "320 Employees",
    locations: "8 Locations across Mumbai & Pune",
    headline: "How UrbanBite Reduced Payroll Processing from 4 Days to 2 Hours Across 8 Retail Outlets",
    quote: "LattiumHR brought our eight branches onto one system in under three weeks. Payroll that took four days of spreadsheets now takes a few hours, and our store managers finally have real-time visibility.",
    author: {
      name: "Neha Srinivasan",
      role: "Head of People, UrbanBite Retail",
    },
    metrics: [
      { value: "4 days → 2 hrs", label: "Payroll Processing Time" },
      { value: "99.4%", label: "Attendance Accuracy with Geofencing" },
      { value: "0", label: "Salary Calculation Disputes" },
    ],
    challenge:
      "UrbanBite was operating 8 high-volume retail stores across Mumbai and Pune. Each store kept attendance in paper registers, leading to widespread buddy punching, lost overtime logs, and monthly salary processing delays. Store managers spent hours every Monday traveling to headquarters with paper sheets.",
    solution:
      "UrbanBite deployed LattiumHR's mobile geofencing across all 8 locations. Store employees clock in using their smartphones within a 40-meter radius of each store. Approved shift overtime syncs directly with monthly payroll.",
    results: [
      "Complete elimination of manual attendance compilation and paper registers across all 8 stores.",
      "Store managers approve leave requests on mobile in minutes, eliminating shift understaffing.",
      "Payroll closure accelerated from 4 full days to just 2 hours on the 1st of every month.",
    ],
  },
  {
    slug: "northstar-logistics",
    client: "Northstar Logistics",
    industry: "Supply Chain & Warehousing",
    employees: "540 Employees",
    locations: "14 Distribution Centers across 4 States",
    headline: "Unifying Multi-State Statutory Compliance and 14 Warehouses on a Single HRMS",
    quote: "Our employees actually use it. Attendance is transparent, leave approvals are quick, and our managers across Maharashtra, Karnataka, and Gujarat follow the exact same compliance standards.",
    author: {
      name: "Arjun Malhotra",
      role: "COO, Northstar Logistics",
    },
    metrics: [
      { value: "14", label: "Distribution Centers Unified" },
      { value: "100%", label: "On-Time Statutory PF & ESI Filings" },
      { value: "₹5.8L", label: "Saved Annually in Compliance Penalties" },
    ],
    challenge:
      "Operating across 14 distribution centers in 4 states, Northstar struggled with differing Professional Tax rules, varying regional holiday schedules, and disconnected local biometric devices that frequently failed.",
    solution:
      "Northstar integrated their biometric gate scanners with LattiumHR's cloud platform while enabling mobile attendance for field drivers. Branch profiles automated state-specific PT slabs and regional holidays.",
    results: [
      "Real-time central headquarters visibility of daily workforce turnout across all 14 distribution hubs.",
      "Zero late statutory filing penalties over 18 consecutive months.",
      "Automated asset tracking recovered 100% of handheld barcode scanners and company devices.",
    ],
  },
];
