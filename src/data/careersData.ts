// ============================================================================
// LATTIUM HR - CAREERS & JOB OPENINGS MOCK DATA
// Static data file designed to be easily replaced by a live ATS / recruitment API
// (e.g. GET /api/careers/jobs or Greenhouse/Lever/Freshteam API connector)
// ============================================================================

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Remote" | "Contract";
  experience: string;
  salaryRange?: string;
  postedDate: string;
  shortSummary: string;
  aboutRole: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
}

export interface CulturePerk {
  id: string;
  title: string;
  description: string;
  icon: string;
  buttonText?: string;
  colorClass?: string;
}

export interface HiringStep {
  step: number;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  icon: string;
}

export interface CultureValue {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface CandidateFaq {
  question: string;
  answer: string;
}

export const CULTURE_PERKS: CulturePerk[] = [
  {
    id: "flexible-hours",
    title: "Flexible Hours & Hybrid Work",
    description:
      "We believe in outcomes over desk hours. Choose between flexible core hours, work-from-anywhere days, and ergonomic home setup allowances.",
    icon: "clock",
    buttonText: "Explore Flexibility",
    colorClass: "purple",
  },
  {
    id: "learning-growth",
    title: "Learning & Continuous Growth",
    description:
      "Annual ₹50,000 personal learning stipend for courses, books, and international tech conferences. Fast-track internal promotion pathways.",
    icon: "sparkle",
    buttonText: "View Learning Stipend",
    colorClass: "orange",
  },
  {
    id: "health-insurance",
    title: "Comprehensive Health & Wellness",
    description:
      "₹10 Lakhs cashless family health coverage for you, your spouse, children, and parents. Includes mental health therapy sessions.",
    icon: "shield",
    buttonText: "See Health Coverage",
    colorClass: "green",
  },
  {
    id: "competitive-equity",
    title: "Competitive Fixed CTC & Wealth",
    description:
      "Top-of-market compensation packages with clear fixed base salaries, transparent annual performance incentives, and meaningful equity grants.",
    icon: "wallet",
    buttonText: "Review Compensation",
    colorClass: "blue",
  },
  {
    id: "great-team",
    title: "High-Trust, Zero Politics",
    description:
      "Collaborate with experienced builders who care deeply about craft, psychological safety, async communication, and celebrating team wins.",
    icon: "users",
    buttonText: "Read Culture Code",
    colorClass: "purple",
  },
  {
    id: "leave-retreats",
    title: "Generous Leave & Annual Retreats",
    description:
      "24 days paid vacation, paid parental leave, statutory holidays, and all-expenses-paid bi-annual team retreats to unwind and connect.",
    icon: "award",
    buttonText: "View Time Off Policy",
    colorClass: "green",
  },
];

export const HIRING_STEPS: HiringStep[] = [
  {
    step: 1,
    title: "Application & Resume Review",
    subtitle: "Initial Profile Screening",
    duration: "1–2 business days",
    icon: "file-text",
    description:
      "Our talent team reviews your work samples, GitHub / portfolio, and experience against the role's primary requirements.",
  },
  {
    step: 2,
    title: "Initial HR & Culture Screening",
    subtitle: "Casual Video Conversation",
    duration: "30 mins",
    icon: "users",
    description:
      "A friendly discussion about your career journey, what drives you, mutual expectations, and how LattiumHR aligns with your goals.",
  },
  {
    step: 3,
    title: "Technical / Practical Round",
    subtitle: "Hands-on Practical Challenge",
    duration: "60–90 mins",
    icon: "briefcase",
    description:
      "A realistic, non-abstract assessment simulating real everyday challenges you'll solve at LattiumHR alongside your future peers.",
  },
  {
    step: 4,
    title: "Leadership & Team Fit",
    subtitle: "Deep-Dive Strategic Session",
    duration: "45 mins",
    icon: "shield",
    description:
      "Meet with departmental leadership and cross-functional teammates to discuss strategic vision, mentorship, and team dynamics.",
  },
  {
    step: 5,
    title: "Formal Offer & Onboarding",
    subtitle: "Welcome to LattiumHR",
    duration: "24–48 hours",
    icon: "award",
    description:
      "We present a transparent, competitive offer breakdown including base CTC, benefits, and start date planning with no hidden clauses.",
  },
];

export const CULTURE_VALUES: CultureValue[] = [
  {
    id: "high-agency",
    title: "High Agency & Autonomy",
    tagline: "Default to action and trust",
    description:
      "We hire exceptional professionals and get out of their way. You own your scope end-to-end, make bold decisions, and ship without bureaucracy.",
    icon: "sparkle",
  },
  {
    id: "defect-free",
    title: "Zero-Defect Payroll Rigor",
    tagline: "Precision where it matters most",
    description:
      "Employees rely on LattiumHR for their livelihoods. We treat accuracy, algorithmic correctness, and compliance with obsessive craftsmanship.",
    icon: "shield",
  },
  {
    id: "radical-candor",
    title: "Radical Candor & Empathy",
    tagline: "Direct feedback delivered kindly",
    description:
      "We challenge directly while caring personally. Transparent communication, psychological safety, and humility are foundational to how we build.",
    icon: "users",
  },
  {
    id: "velocity-balance",
    title: "Velocity With Balance",
    tagline: "Sustainable high performance",
    description:
      "Sprint when momentum is hot, but protect recharge time. We guard focus time, respect evenings and weekends, and build for the long run.",
    icon: "clock",
  },
];

export const CANDIDATE_FAQS: CandidateFaq[] = [
  {
    question: "What is LattiumHR's working model (Remote vs. Hybrid)?",
    answer:
      "We operate a hybrid model for our Bengaluru engineering and product hub (typically 2 collaborative days in-office, 3 days remote) while supporting fully remote agreements for senior specialized contributors across India.",
  },
  {
    question: "How transparent is your compensation and equity structure?",
    answer:
      "We believe in market-leading, transparent compensation. We benchmark roles against top quartile B2B SaaS standards in India, provide straightforward fixed base salaries, and grant ESOP equity pools with standard 4-year vesting and 1-year cliff.",
  },
  {
    question: "How quickly do you share feedback after each interview round?",
    answer:
      "We despise ghosting. You will hear back within 48 business hours after every single stage, whether positive or constructive feedback. Our end-to-end hiring journey typically finishes within 10–14 days.",
  },
  {
    question: "What equipment and workspace support do new hires receive?",
    answer:
      "Every full-time team member receives the latest Apple MacBook Pro (M-series) or high-spec Linux workstation, a 27-inch 4K monitor, noise-canceling headphones, and a one-time ergonomic home office allowance.",
  },
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer (React & Node.js)",
    department: "Engineering",
    location: "Bengaluru, India (Hybrid)",
    type: "Full-Time",
    experience: "4–7 years",
    salaryRange: "₹24,00,000 – ₹36,00,000 / year",
    postedDate: "2026-10-15",
    shortSummary:
      "Architect high-throughput payroll computation engines, low-latency biometric attendance pipelines, and delightful React micro-frontends.",
    aboutRole:
      "As a Senior Full-Stack Engineer at LattiumHR, you will lead the core architecture of our next-generation HRMS platform. You'll build high-scale gross-to-net payroll engines that process millions of calculations with zero errors, integrate with diverse biometric hardware devices across India, and deliver lightning-fast UI experiences for thousands of daily enterprise users.",
    responsibilities: [
      "Design, implement, and maintain scalable microservices in Node.js/TypeScript handling high-concurrency payroll and attendance transactions.",
      "Develop modular, highly responsive frontend components using React 19, TypeScript, and modern state management patterns.",
      "Collaborate with product designers and compliance specialists to translate complex statutory labor formulas into clean algorithmic services.",
      "Optimize SQL database queries, Redis caching, and asynchronous job queues for sub-second report generation.",
      "Champion code quality, automated test coverage, CI/CD deployment pipelines, and mentor junior engineers on the team.",
    ],
    requirements: [
      "4+ years of professional full-stack development experience building production B2B SaaS applications.",
      "Strong command of modern React, TypeScript, Node.js, and RESTful / GraphQL API architectures.",
      "Hands-on experience with relational databases (PostgreSQL or MySQL) and query optimization under heavy data volume.",
      "Demonstrated ability to write maintainable, well-tested code with Jest, React Testing Library, or Playwright.",
      "Solid understanding of web security fundamentals (OAuth2, JWT, CORS, CSP, input sanitization).",
    ],
    niceToHave: [
      "Prior experience building fintech, payroll, HRMS, or ERP accounting software.",
      "Familiarity with containerization (Docker, Kubernetes) and AWS/GCP cloud infrastructure.",
      "Experience with real-time biometric IoT hardware integrations or webhooks.",
    ],
    benefits: [
      "Competitive fixed CTC + annual performance incentive",
      "Flexible hybrid model (2 days in Bengaluru office, 3 days remote)",
      "₹10 Lakhs cashless family medical insurance",
      "Latest M-series Apple MacBook Pro + 27-inch 4K monitor setup",
      "Generous 24 days annual paid leave + 12 public holidays",
    ],
  },
  {
    id: "product-designer-ui-ux",
    title: "Lead Product Designer (UI/UX)",
    department: "Product & Design",
    location: "Bengaluru / Mumbai (Hybrid)",
    type: "Full-Time",
    experience: "3–6 years",
    salaryRange: "₹20,00,000 – ₹30,00,000 / year",
    postedDate: "2026-10-18",
    shortSummary:
      "Transform complex HR workflows, multi-shift roster matrices, and payroll analytics into clean, effortless user experiences.",
    aboutRole:
      "We're looking for a user-obsessed Lead Product Designer to own the end-to-end design system and user experience across our web and mobile applications. You will turn daunting enterprise compliance tasks—such as multi-tier leave approval chains and statutory payroll deductions—into delightful, consumer-grade workflows that HR leaders and employees genuinely love using.",
    responsibilities: [
      "Own the UX/UI lifecycle from initial discovery and user journey mapping through interactive prototyping, user testing, and high-fidelity specifications.",
      "Maintain and evolve LattiumHR's Figma design system tokens, components, and interaction patterns across web and mobile platforms.",
      "Conduct qualitative user interviews with HR managers, CFOs, and frontline employees to uncover workflow friction points.",
      "Partner closely with frontend engineers to ensure design implementation matches pixel-perfect aesthetics and micro-interactions.",
      "Create clear data visualizations and dashboard analytics that make complex workforce trends instantly understandable at a glance.",
    ],
    requirements: [
      "3+ years of product design experience designing complex enterprise web applications or SaaS productivity platforms.",
      "World-class visual design taste, strong typography sensibilities, and meticulous attention to layout hierarchy.",
      "Expert proficiency in Figma, design systems, component auto-layout, and interactive prototyping.",
      "Demonstrated portfolio showcasing end-to-end UX case studies from user research to final shipped products.",
      "Excellent communication and presentation skills to articulate design decisions to engineering and executive leadership.",
    ],
    niceToHave: [
      "Basic understanding of HTML/CSS and frontend layout constraints.",
      "Experience designing data-dense B2B analytics dashboards or mobile employee self-service apps.",
      "Background in micro-copywriting and product UX writing.",
    ],
    benefits: [
      "Competitive salary package with annual equity stock appreciation rights",
      "Hybrid work autonomy with flexible hours",
      "Top-tier health and dental insurance for employee and family",
      "Ergonomic work-from-home stipend (chair, desk, lighting)",
      "Annual conference and design workshop budget",
    ],
  },
  {
    id: "enterprise-account-executive",
    title: "Enterprise Account Executive (SaaS Sales)",
    department: "Sales",
    location: "Mumbai / Delhi NCR (On-Site / Field)",
    type: "Full-Time",
    experience: "3–6 years",
    salaryRange: "₹18,00,000 Base + Uncapped Incentives (OTE ₹32,00,000+)",
    postedDate: "2026-10-20",
    shortSummary:
      "Partner with founders, CFOs, and CHROs of companies with 100–2,500 employees to modernize their people and payroll operations.",
    aboutRole:
      "As an Enterprise Account Executive, you will drive mid-market and enterprise revenue growth for LattiumHR across Western and Northern India. You will engage with C-level stakeholders (Founders, CFOs, Heads of People) who are struggling with legacy spreadsheet systems, demonstrating how LattiumHR delivers measurable ROI, statutory compliance safety, and operational speed.",
    responsibilities: [
      "Manage and close end-to-end enterprise sales cycles from qualifying high-intent inbound leads to commercial contract negotiation.",
      "Conduct consultative, value-driven software demonstrations tailored to each client's specific organizational size and pain points.",
      "Build trusted relationships with CFOs, financial controllers, and HR leaders, navigating complex procurement and security evaluations.",
      "Collaborate with solutions engineers and customer success teams to guarantee smooth post-sales implementation handoffs.",
      "Consistently exceed quarterly quota targets while maintaining accurate pipeline forecasts in our CRM.",
    ],
    requirements: [
      "3+ years of consultative B2B software sales experience (SaaS, HRMS, ERP, or FinTech strongly preferred).",
      "Proven track record of quota attainment with deal sizes ranging from ₹3 Lakhs to ₹20+ Lakhs ACV.",
      "Exceptional verbal and written communication skills with poise when presenting to C-level executives.",
      "Comfort with running live technical product walkthroughs and objection handling on compliance and security.",
      "Self-motivated, high-grit mindset with disciplined pipeline management and deal-closing stamina.",
    ],
    niceToHave: [
      "Existing network of HR leaders, CFOs, or business heads in retail, manufacturing, or tech sectors.",
      "Deep understanding of Indian payroll structures, statutory compliance, and corporate banking payouts.",
    ],
    benefits: [
      "Lucrative uncapped monthly commission structure with accelerators",
      "Executive travel and client entertainment allowances",
      "Full medical cover for self, spouse, and dependents",
      "Fast-track growth to Regional Sales Director within 18–24 months",
      "Company-provided smartphone and premium laptop",
    ],
  },
  {
    id: "customer-support-specialist",
    title: "Customer Support Specialist (HRMS & Payroll)",
    department: "Customer Support",
    location: "Bengaluru, India (On-Site)",
    type: "Full-Time",
    experience: "2–4 years",
    salaryRange: "₹7,50,000 – ₹11,00,000 / year",
    postedDate: "2026-10-22",
    shortSummary:
      "Be the frontline champion for HR managers and accountants, resolving payroll formulas, attendance hardware sync, and account inquiries.",
    aboutRole:
      "Our Customer Support Specialists are the trusted backbone of LattiumHR's stellar customer satisfaction score. You will deliver empathetic, prompt, and technically rigorous assistance to HR professionals and payroll administrators across our customer base, ensuring their questions are answered accurately and their month-end pay runs execute without friction.",
    responsibilities: [
      "Troubleshoot and resolve customer tickets across phone, email, and live in-app chat within guaranteed SLA timeframes.",
      "Guide HR administrators through biometric turnstile device connectivity, multi-shift roster setup, and leave policy adjustments.",
      "Investigate payroll calculation queries, validating gross-to-net formulas against state tax regulations.",
      "Document repeatable solutions and author customer-facing knowledge base articles in our Help Center.",
      "Flag recurring bugs and workflow friction to our engineering and product teams with detailed reproduction steps.",
    ],
    requirements: [
      "2+ years of customer support or client success experience in a B2B SaaS, HRMS, or tech support environment.",
      "Strong understanding of Indian payroll components (PF, ESI, Professional Tax, TDS) and attendance roster mechanics.",
      "Clear, professional written and verbal communication in English (fluency in Hindi or regional languages is a plus).",
      "Resourceful troubleshooting skills with patience to debug customer scenarios calmly under pressure.",
      "Comfort navigating database lookups, error logs, and administrative settings.",
    ],
    niceToHave: [
      "Experience with support platforms like Zendesk, Freshdesk, or Intercom.",
      "Prior exposure to biometric attendance turnstiles (e.g. ZKTeco, Matrix, Essl).",
    ],
    benefits: [
      "Performance-based quarterly bonuses and shift allowances",
      "Comprehensive medical insurance for employee and immediate family",
      "Healthy catered lunches and snacks at the Bengaluru office",
      "Continuous product certification and training programs",
      "Clear career progression into Implementation Specialist or Account Manager",
    ],
  },
  {
    id: "people-culture-lead",
    title: "People & Talent Acquisition Specialist",
    department: "People & HR",
    location: "Mumbai HQ, India (Hybrid)",
    type: "Full-Time",
    experience: "3–5 years",
    salaryRange: "₹12,00,000 – ₹18,00,000 / year",
    postedDate: "2026-10-24",
    shortSummary:
      "Scale our engineering, product, and sales teams while creating an empowering, inclusive culture using our very own LattiumHR software.",
    aboutRole:
      "As our People & Talent Acquisition Specialist, you will act as a true culture architect. You'll partner with department leaders to attract top-tier tech and sales talent, manage seamless day-one onboarding using our own LattiumHR software, and drive initiatives that make LattiumHR an exceptional workplace for every employee.",
    responsibilities: [
      "Manage full-cycle recruitment across technical and business functions from sourcing to offer negotiation.",
      "Build creative candidate pipelines using LinkedIn Recruiter, GitHub, industry communities, and employee referral campaigns.",
      "Deliver a warm, transparent, and prompt candidate experience from first contact to final onboarding.",
      "Facilitate seamless onboarding, orientation workshops, and policy acknowledgments for all new joiners.",
      "Drive internal employee engagement, quarterly performance review cycles, team offsites, and wellness initiatives.",
    ],
    requirements: [
      "3+ years of full-cycle recruitment and HR operations experience within a fast-scaling tech startup or SaaS company.",
      "Proven ability to source and close high-caliber software engineers, product designers, and enterprise sales executives.",
      "Deep understanding of Indian labor practices, statutory norms, offer structuring, and compensation benchmarking.",
      "High emotional intelligence, empathy, and excellent interpersonal communication skills.",
      "Familiarity with modern ATS software, HRMS tools, and data-driven recruiting metrics (time-to-hire, offer acceptance rate).",
    ],
    niceToHave: [
      "Experience dogfooding and using HRMS platforms for daily internal employee management.",
      "Hands-on employer branding experience on LinkedIn and careers communities.",
    ],
    benefits: [
      "Competitive compensation package with annual review",
      "Hybrid work flexibility (3 days in Mumbai office, 2 days remote)",
      "Comprehensive medical and wellness insurance",
      "Wellness & gym membership subsidies",
      "Budget for team bonding activities and festive offsites",
    ],
  },
  {
    id: "growth-marketing-manager",
    title: "Product & Growth Marketing Manager",
    department: "Marketing",
    location: "Remote / Hybrid (India)",
    type: "Full-Time",
    experience: "3–6 years",
    salaryRange: "₹16,00,000 – ₹24,00,000 / year",
    postedDate: "2026-10-25",
    shortSummary:
      "Drive inbound demand, position product features, and craft compelling campaigns targeting HR leaders and financial controllers.",
    aboutRole:
      "We're looking for an analytical and creative Growth Marketing Manager to accelerate customer acquisition across inbound channels. You will craft high-converting product messaging, orchestrate multi-channel campaigns (search, LinkedIn, content, webinars), and partner with sales to supply a steady stream of qualified demo leads.",
    responsibilities: [
      "Define and execute the multi-channel acquisition strategy across organic search (SEO), LinkedIn performance ads, and email nurture funnels.",
      "Produce compelling product marketing collateral including feature launch briefs, customer case studies, ROI calculators, and sales enablement decks.",
      "Conduct continuous A/B testing on landing page headlines, CTA forms, and conversion funnels to maximize demo request rates.",
      "Collaborate with product and sales to analyze win/loss data and refine competitive positioning against legacy HRMS vendors.",
      "Track marketing CAC, payback periods, MQL-to-SQL conversion velocity, and report metrics to executive leadership.",
    ],
    requirements: [
      "3+ years of B2B SaaS product marketing or growth marketing experience targeting business decision-makers.",
      "Strong analytical capability with Google Analytics 4, Search Console, conversion tracking, and marketing attribution.",
      "Outstanding copy craftsmanship with the ability to articulate technical features as tangible business benefits.",
      "Hands-on experience running LinkedIn B2B campaigns, targeted content distribution, and email automation.",
      "A fast-executing experimental mindset with high standards for brand aesthetic and data accuracy.",
    ],
    niceToHave: [
      "Prior experience in HR tech, fintech, or workforce management verticals.",
      "Working knowledge of Webflow, WordPress, or headless CMS platforms.",
    ],
    benefits: [
      "Attractive base salary + performance marketing bonuses",
      "Full remote work flexibility with co-working access across top Indian cities",
      "Comprehensive family health insurance coverage",
      "Generous marketing experimentation budget",
      "MacBook Pro and home office tech stipend",
    ],
  },
];

export const DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Product & Design",
  "Sales",
  "Customer Support",
  "People & HR",
  "Marketing",
];

export const LOCATIONS = [
  "All Locations",
  "Bengaluru, India",
  "Mumbai, India",
  "Delhi NCR, India",
  "Remote / Hybrid",
];

export const JOB_TYPES = ["All Types", "Full-Time", "Remote", "Contract"];

export function getJobById(id: string): JobOpening | undefined {
  return JOB_OPENINGS.find((job) => job.id === id);
}

export function getAllJobs(): JobOpening[] {
  return JOB_OPENINGS;
}

