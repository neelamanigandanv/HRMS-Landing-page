import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon, { IconName } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useDemoModal } from "../context/DemoModalContext";
import "./EmployeeManagementPage.css";

export function EmployeeManagementPage() {
  const { openDemoModal } = useDemoModal();

  // State for interactive elements
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeWorkflowCard, setActiveWorkflowCard] = useState<number>(1);
  const [activeConnectedCard, setActiveConnectedCard] = useState<number | null>(null);

  const connectedModules = [
    {
      number: "01",
      title: "Attendance Management",
      icon: <Icon name="attendance" size={30} />,
      description:
        "Capture live biometric punches, geofenced mobile check-ins, and shift schedules tied directly to employee profiles.",
      link: "/features/attendance-management",
    },
    {
      number: "02",
      title: "Leave Management",
      icon: <Icon name="leave" size={30} />,
      description:
        "Track leave balances, auto-calculate entitlements, and route multi-level manager approvals without paperwork.",
      link: "/features/leave-management",
    },
    {
      number: "03",
      title: "Payroll Management",
      icon: <Icon name="payroll" size={30} />,
      description:
        "Disburse accurate salaries with automatic statutory calculations, PF, ESI, and tax deductions linked to worker data.",
      link: "/features/payroll-management",
    },
    {
      number: "04",
      title: "Performance Management",
      icon: <Icon name="award" size={30} />,
      description:
        "Set organizational goals, conduct periodic appraisals, and log career growth histories right in each employee file.",
      link: "/features/performance-management",
    },
  ];
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 380;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const testimonials = [
    {
      id: 1,
      brand: "stripe",
      headline: "Lattium centralized our 600+ employee directory in less than a week",
      quote:
        "Managing scattered spreadsheets, identity proofs, and branch folders used to consume our entire Monday. With Lattium, our employee directory is live, verified, and seamlessly connected.",
      name: "Freddy Dean",
      role: "Co-Founder, Modern FinTech",
      avatar: "/images/testi-avatar-1.jpg",
    },
    {
      id: 2,
      brand: "zendesk",
      headline: "Zero KYC discrepancies and onboarding time cut by 70%",
      quote:
        "Self-service profile updates with maker-checker approvals solved our data drift problem completely. New employees upload their bank and statutory proofs directly from day one.",
      name: "Sarah Jenkins",
      role: "VP of People Operations, CloudScale",
      avatar: "/images/testi-avatar-2.jpg",
    },
    {
      id: 3,
      brand: "notion",
      headline: "Dynamic org hierarchy that keeps up with our hyper-growth",
      quote:
        "Whenever managers change or teams reorganize across our 4 regional offices, the visual org chart updates instantly without manual diagramming or outdated intranet slides.",
      name: "Rohan Mehta",
      role: "Chief Operating Officer, Apex Labs",
      avatar: "/images/leader-rohan-mehta.jpg",
    },
    {
      id: 4,
      brand: "hubspot",
      headline: "Audit-ready employee profiles with instant document verification",
      quote:
        "Lattium gave our compliance auditors instant access to encrypted, verified employee files. We passed our annual statutory audit with zero missing records or compliance flags.",
      name: "Ananya Kapoor",
      role: "Head of Talent & Compliance, UrbanBite",
      avatar: "/images/leader-ananya-kapoor.jpg",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 6 Employee Management Capabilities Features
  const capabilities = [
    {
      id: "profiles",
      number: "01",
      badge: "Central Database",
      tabTitle: "Profiles",
      title: "Centralized Employee Profiles & Directory",
      subtitle: "A Single Source of Truth for Your Entire Workforce",
      description:
        "Maintain comprehensive digital employee profiles with contact details, personal bio-data, statutory KYC, emergency contacts, job designations, and reporting managers in one secure cloud workspace.",
      bullets: [
        "Complete 360° employee profiles with historical career timeline",
        "Automated statutory KYC verification (Aadhaar, PAN, PF, UAN)",
        "Real-time reporting manager mapping and department tags",
        "Role-based access permissions ensuring strict personal data privacy",
      ],
      image: "/images/feat-central-profiles.jpg",
      imageAlt: "Centralized Employee Profile UI showing Sarah Jenkins Senior Product Designer profile with KYC Verified badge",
      stat: "99.8% Profile Accuracy",
    },
    {
      id: "onboarding",
      number: "02",
      badge: "Digital Welcome",
      tabTitle: "Onboarding",
      title: "Streamlined Digital Employee Onboarding",
      subtitle: "Welcome New Hires Without Paperwork Chaos",
      description:
        "Transform first-day friction into an engaging welcoming experience. Enable new team members to self-submit details, upload documents, and complete checklist steps before Day 1.",
      bullets: [
        "Self-service onboarding portal accessible from mobile or desktop",
        "Automated document submission checklists with live progress tracking",
        "Pre-configured IT asset allocation and welcome kit workflows",
        "Seamless profile conversion from candidate offer to active employee",
      ],
      image: "/images/feat-digital-onboarding.jpg",
      imageAlt: "Employee Onboarding Checklist UI showing 80% progress and completed personal details and bank upload",
      stat: "65% Faster Onboarding",
    },
    {
      id: "bulk-import",
      number: "03",
      badge: "Data Migration",
      tabTitle: "Bulk Import",
      title: "Smart Bulk Import & Data Management",
      subtitle: "Onboard Hundreds of Employees in Minutes",
      description:
        "Ditch manual data re-entry. Upload entire company departments from Excel or CSV files with intelligent column mapping, automated format validation, and duplicate detection.",
      bullets: [
        "Smart CSV & Excel spreadsheet upload with auto-field mapping",
        "Real-time syntax validation and error highlighting before import",
        "Duplicate record detection protecting your directory integrity",
        "One-click mass profile updates across branches and designations",
      ],
      image: "/images/feat-bulk-import.jpg",
      imageAlt: "Bulk Import UI showing CSV column mapping and 248 records validated with zero errors",
      stat: "248 Records / min",
    },
    {
      id: "document-vault",
      number: "04",
      badge: "Security & Compliance",
      tabTitle: "Document Vault",
      title: "Encrypted Employee Document Vault",
      subtitle: "Bank-Grade Cloud Storage for Confidential Files",
      description:
        "Safeguard contracts, education certificates, government IDs, and increment letters with AES-256 cloud encryption, granular access controls, and automated document expiration alerts.",
      bullets: [
        "Centralized categorized repository for KYC, contracts & tax forms",
        "Granular view, edit, and download permissions by HR role",
        "Proactive alerts for expiring documents, visas, and certifications",
        "100% digital audit trails ensuring strict regulatory compliance",
      ],
      image: "/images/feat-doc-vault.jpg",
      imageAlt: "Document Vault UI showing KYC & Government IDs with AES-256 cloud encryption badge",
      stat: "AES-256 Cloud Encrypted",
    },
    {
      id: "lifecycle",
      number: "05",
      badge: "Career Tracking",
      tabTitle: "Lifecycle",
      title: "Complete Employee Lifecycle Management",
      subtitle: "Track Every Milestone from Hire to Retire",
      description:
        "Maintain an immutable career timeline as employees grow. Seamlessly manage probation reviews, role promotions, department transfers, compensation adjustments, and exit handovers.",
      bullets: [
        "Automated probation tracking with timely manager review reminders",
        "Internal role transfers and promotion tracking with letter generation",
        "Digital asset return checklists and departmental clearances",
        "Full-and-final settlement handoff integrated directly with payroll",
      ],
      image: "/images/feat-lifecycle-tracking.jpg",
      imageAlt: "Employee Lifecycle Timeline UI showing career journey milestones from onboarding to Senior Manager",
      stat: "100% Milestones Tracked",
    },
    {
      id: "directory-search",
      number: "06",
      badge: "Workforce Visibility",
      tabTitle: "Org Directory",
      title: "Interactive Organization Directory & Smart Search",
      subtitle: "Find Any Colleague or Record in Milliseconds",
      description:
        "Empower your team with a dynamic, searchable company directory. Filter by branch, department, designation, or skill to find contacts and visualize organizational structures.",
      bullets: [
        "Instant search-as-you-type by employee name, role, ID, or email",
        "Multi-branch filtering across local offices and international hubs",
        "Quick-contact cards with click-to-email and click-to-call actions",
        "Exportable directory rosters for internal reporting and compliance",
      ],
      image: "/images/feat-org-directory.jpg",
      imageAlt: "Company Directory UI with search bar, branch filter, and grid of active employee contact cards",
      stat: "< 50ms Real-Time Search",
    },
  ];

  // FAQ data
  const faqs = [
    {
      q: "What is employee management software?",
      a: "Employee management software is a centralized digital solution designed to manage, organize, and streamline workforce records across the entire employee lifecycle—including onboarding, personal details, job roles, reporting hierarchies, and documents.",
    },
    {
      q: "Can we maintain all employee records in one place?",
      a: "Yes. Lattium provides a unified single source of truth for personal information, emergency contacts, statutory IDs, banking details, department assignments, and job histories across all branches and satellite offices.",
    },
    {
      q: "Can we import employee data in bulk?",
      a: "Yes. Lattium supports easy bulk Excel and CSV uploads with automated column mapping, format validation, and duplicate detection, allowing you to onboard entire teams and departments in minutes.",
    },
    {
      q: "Can employee information be accessed based on user roles?",
      a: "Yes. Granular, role-based access permissions ensure employees only view and update their own self-service profiles, managers see their direct reports, and HR admins retain full control over company-wide records.",
    },
    {
      q: "Can employee records connect with attendance and payroll?",
      a: "Yes. Employee profiles are natively integrated across the Lattium platform, automatically feeding verified employee records into attendance biometric sync, leave quotas, and automated payroll disbursements.",
    },
  ];



  // 3 Employee Management Capability Blocks (Matching Reference Image)
  const capabilityBlocks = [
    {
      id: "profiles-directory",
      badge: "01 Centralized Profiles",
      eyebrow: "✦ 01. CENTRALIZED PROFILES ✦",
      image: "/images/emp-block-profile.jpg",
      imageAlt: "Executive reviewing digital employee directory on tablet in front of modern skyscraper",
      title: "Centralized Employee Profiles & Statutory Directory",
      description:
        "Maintain a complete single source of truth for your entire workforce. Unify personal bio-data, statutory KYC, emergency contacts, job designations, and reporting hierarchies in one cloud workspace.",
      bullets: [
        "Automated Aadhaar, PAN & UAN verification",
        "Dynamic reporting manager & hierarchy mapping",
        "Granular role-based privacy & access permissions",
        "Complete 360° employee career timeline",
        "Multi-branch & international hub compatibility",
        "Instant directory search in under 50ms",
      ],
      callout: {
        role: "Talent Operations Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "KYC Verified" },
        { value: "50K+", label: "Active Profiles" },
        { value: "99.8%", label: "Accuracy Score" },
        { value: "< 50ms", label: "Real-Time Search" },
      ],
    },
    {
      id: "onboarding-assets",
      badge: "02 Digital Onboarding",
      eyebrow: "✦ 02. DIGITAL ONBOARDING ✦",
      image: "/images/emp-block-onboarding.jpg",
      imageAlt: "HR professional welcoming new employee with digital onboarding checklist in modern campus",
      title: "Seamless Paperless Onboarding & Asset Allocation",
      description:
        "Turn first-day friction into an engaging welcoming experience. Empower new team members to self-submit details, verify bank accounts, and complete checklist steps before Day 1.",
      bullets: [
        "Self-service mobile & desktop onboarding portal",
        "Automated document submission checklists",
        "Pre-configured IT asset allocation workflows",
        "Bank account penny drop & IFSC validation",
        "Direct offer-to-employee profile conversion",
        "Department welcome kit & buddy assignment",
      ],
      callout: {
        role: "People Operations Specialist",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "65%", label: "Faster Onboarding" },
        { value: "100%", label: "Paperless Journey" },
        { value: "1-Click", label: "Welcome Triggers" },
        { value: "24/7", label: "Self-Service Portal" },
      ],
    },
    {
      id: "lifecycle-compliance",
      badge: "03 Lifecycle & Vault",
      eyebrow: "✦ 03. LIFECYCLE & COMPLIANCE ✦",
      image: "/images/emp-block-compliance.jpg",
      imageAlt: "Corporate executives reviewing compliance and encrypted document vault in modern boardroom",
      title: "Lifecycle Milestone Tracking & Encrypted Vault",
      description:
        "Safeguard confidential employee contracts, educational certificates, and statutory records with AES-256 cloud encryption, granular access controls, and automated document expiration alerts.",
      bullets: [
        "AES-256 bank-grade encrypted cloud document vault",
        "Automated probation tracking with review reminders",
        "Internal role transfer & promotion letter generator",
        "Proactive alerts for expiring documents & visas",
        "Digital departmental clearances & asset returns",
        "Seamless full-and-final handoff into payroll",
      ],
      callout: {
        role: "Compliance & Security Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "AES-256", label: "Cloud Encryption" },
        { value: "100%", label: "Statutory Compliant" },
        { value: "30-Day", label: "Advance Alerts" },
        { value: "Instant", label: "Audit Log History" },
      ],
    },
  ];

  // 3-Step Work Process (Centralize & Verify, Automate Onboarding, Lifecycle Governance)
  const workflowSteps = [
    {
      number: "01",
      title: "Centralize & Verify",
      description:
        "Consolidate scattered records, verify statutory KYC (Aadhaar, PAN, UAN), and build one unified master employee database.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Automate Onboarding",
      description:
        "Empower new hires with self-service forms, automated document checklists, and pre-configured IT asset welcome workflows.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Lifecycle Governance",
      description:
        "Track role promotions, branch transfers, appraisal milestones, and secure cloud documents with 100% audit readiness.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper">
      <SEO
        title="Employee Management Software — Centralized Employee Records & Profiles"
        description="Every Employee. Every Detail. One Connected Platform. Keep employee information organized, simplify HR administration and manage the entire employee lifecycle with Lattium."
        canonicalPath="/features/employee-management"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Dark Spotlight Stage + Sage HR Layout + Plum Primary Palette)
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="emp-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Lattium HR">
              <span>✦ LATTIUM HR ✦</span>
            </div>

            {/* Title & Subtext */}
            <h1 id="emp-hero-title" className="emp-hero-rich-title">
              Effortless <span className="emp-glow-text">Employee</span>
              <br className="emp-hero-br" />
              Management
            </h1>
            <p className="emp-hero-rich-subhead">
              Ready to attract, engage, and nurture the best talent, all from one place with Lattium HR. It's simple. Get started by booking a demo or signing up for a free trial today.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="emp-hero-rich-actions">
              <button
                type="button"
                className="emp-pill-btn-primary"
                onClick={() =>
                  openDemoModal({
                    title: 'Book an Employee Management Demo',
                    subtitle: 'Experience effortless employee records, hierarchy visualization, and document management with Lattium HR.',
                  })
                }
              >
                Book a Free Demo <Icon name="arrow" size={15} />
              </button>
              <button
                type="button"
                className="emp-pill-btn-secondary"
                onClick={() => {
                  const el = document.getElementById('why-choose-title');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Explore Features
              </button>
            </div>

            {/* Trust Points */}
            <div className="emp-hero-trust-row">
              <span><Icon name="check" size={13} /> No credit card required</span>
              <span><Icon name="check" size={13} /> 100% India Data Residency</span>
              <span><Icon name="check" size={13} /> Free migration assistance</span>
            </div>

            {/* OPEN FLOATING 3-CARD SHOWCASE (No heavy border box, half visible in hero first screen) */}
            <div className="emp-hero-floating-stage">
              {/* Left Widget: Workforce Breakdown Donut Chart */}
              <div className="emp-hero-float-card emp-hero-widget-left">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Workforce Distribution</h3>
                    <span className="emp-float-widget-sub">By Department</span>
                  </div>
                  <span className="emp-float-widget-badge">Active</span>
                </div>

                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r="68" stroke="#f4edf3" strokeWidth="18" fill="none" />
                    {/* Engineering 42% (Plum #7b2958) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#7b2958" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="248"
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Operations 28% (Emerald #10b981) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#10b981" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="307"
                      strokeLinecap="round"
                      transform="rotate(62 90 90)"
                    />
                    {/* Design & UX 18% (Violet #8b5cf6) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#8b5cf6" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="350"
                      strokeLinecap="round"
                      transform="rotate(163 90 90)"
                    />
                    {/* Center Info */}
                    <text x="90" y="84" textAnchor="middle" className="emp-donut-center-lbl">Total Active</text>
                    <text x="90" y="106" textAnchor="middle" className="emp-donut-center-val">1,450</text>
                  </svg>
                </div>

                <div className="emp-donut-legend">
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-plum" />
                    <span>Engineering (42%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-mint" />
                    <span>Operations (28%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-violet" />
                    <span>Design & UX (18%)</span>
                  </div>
                </div>
              </div>

              {/* Center Main Card: Real HR Partner Working */}
              <div className="emp-hero-center-photo-card">
                <img
                  src="/images/hero-hr-working-pro.jpg"
                  alt="Lattium HR professional managing workforce directory on laptop in modern office"
                  className="emp-hero-center-img"
                  loading="eager"
                />

                {/* Top-Left Floating Live Status Pill */}
                <div className="emp-photo-status-pill">
                  <span className="emp-live-pulse" />
                  <span>Directory Active</span>
                </div>
              </div>

              {/* Right Widget: Onboarding & Activity */}
              <div className="emp-hero-float-card emp-hero-widget-right">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Onboarding Activity</h3>
                    <span className="emp-float-widget-sub">Last 30 Days</span>
                  </div>
                  <span className="emp-float-widget-pill-green">Verified</span>
                </div>

                <div className="emp-widget-stat-row">
                  <strong className="emp-stat-number">+38</strong>
                  <div className="emp-stat-meta">
                    <span>New Hires Onboarded</span>
                    <small>100% On-time completion</small>
                  </div>
                </div>

                {/* Modern Bar Chart */}
                <div className="emp-mini-bar-chart">
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "42%" }} />
                    <span className="emp-bar-lbl">M</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "65%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "55%" }} />
                    <span className="emp-bar-lbl">W</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "78%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col is-active">
                    <div className="emp-bar-fill" style={{ height: "96%" }} />
                    <span className="emp-bar-lbl">F</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "60%" }} />
                    <span className="emp-bar-lbl">S</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "82%" }} />
                    <span className="emp-bar-lbl">S</span>
                  </div>
                </div>

                <div className="emp-widget-footer-pill">
                  <Icon name="check" size={14} />
                  <span>100% KYC & Bank Details Verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PROBLEM SECTION (The Challenge)
            ========================================================================= */}
        <section className="emp-section emp-problem-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ THE CHALLENGE ✦</span>
              <h2 className="emp-section-title">
                Employee Data Shouldn't Be Scattered Everywhere
              </h2>
              <p className="emp-section-subhead">
                When employee information is spread across spreadsheets, emails and disconnected systems, even simple HR tasks become difficult to manage.
              </p>
            </div>

            <div className="emp-problem-grid">
              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Scattered Employee
                  <br />
                  Records & Silos
                </h3>
                <p className="emp-problem-desc">
                  Employee documents, statutory KYC, and personal bio-data remain scattered across disconnected spreadsheets, paper folders, and email inboxes. This creates data duplication, version confusion, and serious compliance risks during statutory audits.
                </p>
              </div>

              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <line x1="6" y1="8" x2="10" y2="8" />
                    <line x1="6" y1="12" x2="8" y2="12" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Repetitive Manual
                  <br />
                  Data Re-Entry
                </h3>
                <p className="emp-problem-desc">
                  HR teams spend countless hours manually re-entering employee details across isolated software, drafting letters by hand, and chasing physical sign-offs. These tedious tasks slow down hiring and take valuable focus away from employee care.
                </p>
              </div>

              <div className="emp-problem-card">
                <div className="emp-problem-icon-wrap" aria-hidden="true">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Zero Visibility
                  <br />
                  Across Branches
                </h3>
                <p className="emp-problem-desc">
                  Without a live unified master directory, leadership lacks immediate visibility into branch headcounts, departmental structures, and reporting hierarchies. Tracking internal transfers, promotions, or emergency contacts becomes an operational ordeal.
                </p>
              </div>
            </div>
          </div>

          {/* Section Divider Line (Centered, Not Touching Corners) */}
          <div className="emp-section-divider-line" aria-hidden="true" />
        </section>

        {/* =========================================================================
            4. EMPLOYEE MANAGEMENT CAPABILITIES (3 Blocks - Matching Reference Image)
            ========================================================================= */}
        <section className="emp-section emp-capabilities-section" id="features">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ EMPLOYEE MANAGEMENT CAPABILITIES ✦</span>
              <h2 className="emp-section-title">
                Everything You Need to Manage Employee Records
              </h2>
              <p className="emp-section-subhead">
                Explore the three core capabilities designed to centralize profiles, accelerate onboarding, and maintain 100% statutory compliance.
              </p>
            </div>
          </div>

          {/* 3 Full Blocks: Each with distinct outside background color & generous spacing */}
          <div className="emp-capability-blocks-list">
            {capabilityBlocks.map((blk, idx) => (
              <div key={blk.id} className={`emp-cap-block-wrapper emp-cap-bg-${idx}`}>
                <div className="container">
                  <article
                    id={`cap-block-${blk.id}`}
                    className="emp-reference-block-card"
                  >
                    {/* Top Deck: 2 Columns (Left Image + Right Content) */}
                    <div className="emp-block-top-deck">
                      {/* Left Column: Vertical Image */}
                      <div className="emp-block-img-col">
                        <img
                          src={blk.image}
                          alt={blk.imageAlt}
                          className="emp-block-hero-img"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      </div>

                      {/* Right Column: Eyebrow, Title, Subtitle, 2-Col Checklist, Callout */}
                      <div className="emp-block-content-col">
                        <span className="emp-block-eyebrow">{blk.eyebrow}</span>
                        <h3 className="emp-block-title">{blk.title}</h3>
                        <p className="emp-block-desc">{blk.description}</p>

                        {/* 2-Column Checklist (6 Items) */}
                        <div className="emp-block-checklist-grid">
                          {blk.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="emp-block-check-item">
                              <span className="emp-block-check-badge" aria-hidden="true">
                                ✓
                              </span>
                              <span className="emp-block-check-text">{bullet}</span>
                            </div>
                          ))}
                        </div>

                        <div className="emp-block-action-row">
                          <button
                            type="button"
                            className="emp-block-callout-btn"
                            onClick={() =>
                              openDemoModal({
                                title: `Explore ${blk.title}`,
                                subtitle: blk.description,
                              })
                            }
                          >
                            Book a Demo <Icon name="arrow" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Deck: 4 Compact Stats Cards (Uniform Clean Style) */}
                    <div className="emp-block-bottom-deck">
                      <div className="emp-block-stats-grid">
                        {blk.stats.map((st, sIdx) => (
                          <div
                            key={sIdx}
                            className="emp-block-stat-box"
                          >
                            <strong className="emp-block-stat-val">{st.value}</strong>
                            <span className="emp-block-stat-lbl">{st.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </div>

                {/* Subtle Centered Divider Line between Blocks (Not touching corners) */}
                {idx < capabilityBlocks.length - 1 && (
                  <div className="emp-block-divider-line" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            3. WHY LATTIUM IS BEST FOR EMPLOYEE MANAGEMENT (01 Big Card + 02-05 Small Cards)
            ========================================================================= */}
        <section className="emp-why-choose-section" aria-labelledby="why-choose-title">
          <div className="container">
            {/* Centered Section Header */}
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WHY LATTIUMHR ✦</span>
              <h2 id="why-choose-title" className="emp-section-title">
                Employee Management That Works the Way Your Business Does
              </h2>
              <p className="emp-section-subhead">
                Manage employee information, simplify workforce administration, and keep every branch connected through one centralized HRMS.
              </p>
            </div>

            {/* Asymmetric 1 Big Card + 4 Small Cards Grid */}
            <div className="emp-why-grid">
              {/* Left Column: 1 Big Card (Top Floating Metric Cards + Bottom Text) */}
              <div className="emp-why-big-card">
                <div className="emp-why-big-top-deck">
                  <div className="emp-why-big-badge">
                    <span className="emp-why-big-pill">
                      ✦ ONE CENTRALIZED DATABASE ✦
                    </span>
                  </div>

                  {/* Floating Metric Card 1 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="check" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Verified Employee Records</small>
                        <strong>100% Audit-Ready</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Missing Fields</span>
                  </div>

                  {/* Floating Metric Card 2 (Replaced gauge with matching width card like first card) */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="shield" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Statutory & KYC Compliance</small>
                        <strong>99.9% Audit Score</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Compliance Risk</span>
                  </div>
                </div>

                {/* Bottom Narrative Copy */}
                <p className="emp-big-card-bottom-text">
                  Keep employee profiles, job details, documents, and employment history organized in one secure place. Lattium unifies personal bio-data, statutory IDs, job history, and emergency contacts into one tamper-proof master profile with zero duplicates.
                </p>
              </div>

              {/* Right Column: 4 Small Cards (Equal Line Count, No Numbers) */}
              <div className="emp-why-small-grid">
                {/* Card 01 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="employee" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Simplified Employee Onboarding</h3>
                  <p className="emp-why-card-desc">
                    Add employees individually or in bulk, automate record creation, and eliminate repetitive paperwork.
                  </p>
                </div>

                {/* Card 02 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="branch" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Multi-Branch Workforce Structure</h3>
                  <p className="emp-why-card-desc">
                    Manage distributed teams across entities and branches while keeping one centralized workforce view.
                  </p>
                </div>

                {/* Card 03 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="shield" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Role-Based Privacy & Permissions</h3>
                  <p className="emp-why-card-desc">
                    Provide HR managers, department leads, and employees granular access tailored to their duties.
                  </p>
                </div>

                {/* Card 04 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="clock" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Complete Employee Career Journey</h3>
                  <p className="emp-why-card-desc">
                    Track probation reviews, internal role transfers, promotions, and final exit handovers seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WORK PROCESS SECTION (Restored Previous 3-Card Look)
            ========================================================================= */}
        <section className="emp-process-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="container">
            {/* Centered Header: Clean Eyebrow (No background, No border) + Main Title + Subheading */}
            <div className="emp-process-header">
              <span className="emp-process-eyebrow">✦ PROCESS ✦</span>
              <h2 id="workflow-heading" className="emp-process-title">
                Work Smarter With A Simpler Workflow
              </h2>
              <p className="emp-process-subhead">
                A structured, frictionless approach to onboarding employees, centralizing records, and maintaining complete lifecycle compliance.
              </p>
            </div>

            {/* 3 Process Cards */}
            <div className="emp-process-grid">
              {workflowSteps.map((step, idx) => {
                const isActive = activeWorkflowCard === idx;
                return (
                  <div
                    key={step.number}
                    className={`emp-process-card ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveWorkflowCard(idx)}
                    onClick={() => setActiveWorkflowCard(idx)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                  >
                    {/* Top Notch Semicircle with Number having full half-circle background */}
                    <div className="emp-process-notch">
                      <span className="emp-process-notch-num">{step.number}</span>
                    </div>

                    {/* Centered Icon Box */}
                    <div className="emp-process-icon-box">
                      {step.icon}
                    </div>

                    {/* Card Title & Description */}
                    <h3 className="emp-process-card-title">{step.title}</h3>
                    <p className="emp-process-card-desc">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. CENTER CTA SECTION (Replaces Impact Section - Matches Reference Image 1)
            ========================================================================= */}
        <section className="emp-center-cta-section" aria-labelledby="cta-banner-title">
          <div className="container">
            <div className="emp-center-cta-card">
              {/* Primary Color Accent Block (Replaces Red Block from Reference) */}
              <div className="emp-cta-primary-bar" />

              {/* Overlapping Photorealistic Team Collaboration Image */}
              <div className="emp-cta-img-wrap">
                <img
                  src="/images/emp-cta-collaboration.jpg"
                  alt="HR management team collaborating on workforce directory"
                  className="emp-cta-img"
                  loading="lazy"
                />
              </div>

              {/* Right Content Area */}
              <div className="emp-cta-content">
                <span className="emp-cta-badge">✦ CENTRALIZED WORKFORCE PLATFORM ✦</span>
                <h2 id="cta-banner-title" className="emp-cta-title">
                  Ready to Centralize Your Employee Management?
                </h2>
                <p className="emp-cta-desc">
                  Replace disconnected spreadsheets and manual paperwork with one unified, automated employee directory. Keep every profile verified, compliant, and accessible from day one.
                </p>
                <div className="emp-cta-btn-group">
                  <button
                    type="button"
                    className="emp-cta-btn"
                    onClick={() =>
                      openDemoModal({
                        title: "Schedule an Employee Management Demo",
                        subtitle:
                          "Experience centralized employee records, verification workflows, and visual org hierarchies with Lattium.",
                      })
                    }
                  >
                    Book a Demo
                  </button>
                  <button
                    type="button"
                    className="emp-cta-btn-secondary"
                    onClick={() =>
                      openDemoModal({
                        title: "Talk to an HR Expert",
                        subtitle:
                          "Consult with our product advisors on custom company structures, branch hierarchy, and seamless migration assistance.",
                      })
                    }
                  >
                    Talk to an HR Expert <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CONNECTED HRMS MODULES (Works Better Together - Matches Work Process Card Style)
            ========================================================================= */}
        <section className="emp-section emp-connected-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WORKS BETTER TOGETHER ✦</span>
              <h2 className="emp-section-title">
                Employee Management Is Just the Beginning
              </h2>
              <p className="emp-section-subhead">
                Connect employee records with related HR workflows across the Lattium platform.
              </p>
            </div>

            {/* 4 Connected Module Cards - Matching Work Process Card Design */}
            <div
              className="emp-process-grid emp-connected-grid"
              onMouseLeave={() => setActiveConnectedCard(null)}
            >
              {connectedModules.map((mod, idx) => {
                const isActive = activeConnectedCard === idx;
                return (
                  <Link
                    to={mod.link}
                    key={mod.number}
                    className={`emp-process-card emp-connected-card ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveConnectedCard(idx)}
                    onClick={() => setActiveConnectedCard(idx)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                  >
                    {/* Top Notch with Step / Module Number */}
                    <div className="emp-process-notch" aria-label={`Module ${mod.number}`}>
                      {isActive ? (
                        <span className="emp-process-notch-pill">{mod.number}</span>
                      ) : (
                        <span className="emp-process-notch-num">{mod.number}</span>
                      )}
                    </div>

                    {/* Centered Rounded Icon Box */}
                    <div className="emp-process-icon-box" aria-hidden="true">
                      {mod.icon}
                    </div>

                    {/* Step Title */}
                    <h3 className="emp-process-card-title">{mod.title}</h3>

                    {/* Step Description */}
                    <p className="emp-process-card-desc">{mod.description}</p>

                    {/* Bottom Action Hint */}
                    <div className="emp-connected-explore-pill">
                      <span>Explore Module</span>
                      <Icon name="arrow" size={12} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. TESTIMONIALS SECTION (Above FAQ - Matches Reference Image 2 with Primary Color Theme)
            ========================================================================= */}
        <section className="emp-testimonials-section" aria-labelledby="testi-title">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ TESTIMONIALS ✦</span>
              <h2 id="testi-title" className="emp-section-title">
                What People Say About Lattium
              </h2>
              <p className="emp-section-subhead">
                Discover how growing organizations simplify workforce operations, accelerate digital onboarding, and maintain 100% record accuracy.
              </p>
            </div>

            <div className="emp-testimonials-wrap">
              <div className="emp-testimonials-track" ref={sliderRef}>
                {testimonials.map((item) => (
                  <article key={item.id} className="emp-testimonial-card">
                    <div className="emp-testi-brand">{item.brand}</div>
                    <h3 className="emp-testi-headline">{item.headline}</h3>
                    <p className="emp-testi-quote">{item.quote}</p>
                    <div className="emp-testi-author">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="emp-testi-avatar"
                        loading="lazy"
                      />
                      <div className="emp-testi-author-info">
                        <strong>{item.name}</strong>
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Slider Navigation Buttons at Bottom Right */}
              <div className="emp-testi-nav-row">
                <div className="emp-testi-nav-btns">
                  <button
                    type="button"
                    className="emp-testi-arrow-btn prev"
                    onClick={() => scrollSlider("left")}
                    aria-label="Previous testimonial"
                  >
                    <Icon name="arrow" size={16} />
                  </button>
                  <button
                    type="button"
                    className="emp-testi-arrow-btn next"
                    onClick={() => scrollSlider("right")}
                    aria-label="Next testimonial"
                  >
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. FAQ SECTION (Exact Home Page 2-Column Style)
            ========================================================================= */}
        <section className="faq-section emp-page-faq" id="faqs">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="QUESTIONS, ANSWERED"
                title="Everything you need to know"
                body="Common questions about managing employee records, data privacy, bulk onboarding, and system integrations."
              />
              <Link className="text-link" to="/faq">
                View all FAQs <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.q}>
                  <button type="button" onClick={() => toggleFaq(i)}>
                    <span>{f.q}</span>
                    <i>{openFaq === i ? "−" : "+"}</i>
                  </button>
                  {openFaq === i && <p>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            BOTTOM CONVERSION CTA BANNER (Exact Home Page Footer CTA)
            ========================================================================= */}
        <section className="final-cta">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">READY TO SIMPLIFY HR?</span>
              <h2>Your people deserve better than spreadsheets.</h2>
              <p>
                Join 500+ growing businesses worldwide running HR, attendance, and payroll on
                LattiumHR.
              </p>
              <div className="final-actions">
                <Button
                  onClick={() =>
                    openDemoModal({
                      title: "Book an Employee Management Demo",
                      subtitle: "Experience effortless employee records, hierarchy visualization, and document management with Lattium HR.",
                    })
                  }
                >
                  Book a Free Demo <Icon name="arrow" />
                </Button>
                <Button to="/contact-sales" secondary>
                  Estimate Your Price
                </Button>
              </div>
              <div className="final-points">
                <span>
                  <Icon name="check" />
                  Free personalised demo
                </span>
                <span>
                  <Icon name="check" />
                  No credit card required
                </span>
                <span>
                  <Icon name="check" />
                  Go live in 2–4 weeks
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default EmployeeManagementPage;
