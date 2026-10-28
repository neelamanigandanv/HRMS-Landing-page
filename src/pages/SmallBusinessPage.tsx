import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { useDemoModal } from "../context/DemoModalContext";
import "./SmallBusinessPage.css";

interface FAQItem {
  q: string;
  a: string;
}

export function SmallBusinessPage() {
  const { openDemoModal } = useDemoModal();

  // Interactive Vertical Workspace Accordion (Section 2 - matching reference image)
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);

  const workspaceCards = [
    {
      id: "owner",
      number: "01",
      verticalTitle: "Business Owners",
      title: "Business Owners",
      desc: "At LattiumHR, we're dedicated to more than just tracking hours. We're committed to empowering small business owners with total operational clarity, automated records, and stress-free payroll readiness.",
      points: [
        { title: "Complete Team Visibility", desc: "Real-time attendance, present staff, and branch headcount in one view." },
        { title: "Zero Manual Spreadsheets", desc: "Replace scattered Excel files with one organized employee directory." },
        { title: "Pre-Payroll Readiness", desc: "Verified hours, leave deductions, and overtime prepared automatically." },
        { title: "Quick 2-Week Launch", desc: "Guided onboarding so you go live smoothly with zero disruption." },
      ],
      buttonText: "Request a Demo",
      image: "/images/sb-owner-workspace.jpg",
      alt: "Small business owner workspace overview in LattiumHR",
    },
    {
      id: "manager",
      number: "02",
      verticalTitle: "Team Managers",
      title: "Team Managers",
      desc: "Review daily attendance, approve time-off requests in seconds, and prevent critical staffing blindspots across your department without messy email chains or lost spreadsheets.",
      points: [
        { title: "Live Attendance Tracking", desc: "View real-time check-ins, late marks, and who is on shift right now." },
        { title: "1-Click Leave Approvals", desc: "Review and approve employee time-off requests in seconds from mobile." },
        { title: "Smart Shift Coverage", desc: "Weekly roster boards with automatic alerts to prevent shift shortfalls." },
        { title: "Zero Approval Delays", desc: "Resolve routine time-off requests in under 2 hours without email chains." },
      ],
      buttonText: "Request a Demo",
      image: "/images/sb-manager-workspace.jpg",
      alt: "Team manager reviewing attendance and leave schedule",
    },
    {
      id: "employee",
      number: "03",
      verticalTitle: "Team Employees",
      title: "Team Employees",
      desc: "Give your team members seamless self-service to clock in from mobile or web, check real-time leave balances, submit requests, and download monthly payslips whenever they need them.",
      points: [
        { title: "Mobile & Web Clock-In", desc: "Clock in and out smoothly from your phone or browser with geofence verification." },
        { title: "Live Leave Quota View", desc: "Check casual, sick, and earned leave balances anytime without asking HR." },
        { title: "Instant PDF Payslips", desc: "Download itemized, password-protected monthly salary slips on demand." },
        { title: "Transparent Request Tracking", desc: "Submit leave or comp-off requests and track manager sign-offs live." },
      ],
      buttonText: "Request a Demo",
      image: "/images/sb-employee-workspace.jpg",
      alt: "Employee accessing LattiumHR self-service on smartphone",
    },
  ];

  // Section 2: What You Get From Day One (4 quick-win cards matching reference image layout)
  const dayOneCards = [
    {
      id: "directory",
      title: "Everyone’s Details in One Place.",
      desc: "Consolidate employee profiles, emergency contacts, and statutory records out of scattered Excel files into one secure, searchable company directory.",
      btnText: "Explore Directory",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "attendance",
      title: "Know Who’s In Today.",
      desc: "Track daily clock-ins, remote hours, and on-leave statuses in real-time across your staff—with zero morning messages or manual follow-ups.",
      btnText: "View Attendance",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: "leave",
      title: "Leave Approved in a Click.",
      desc: "Empower staff to submit leave from mobile in seconds. Managers approve with 1 tap, and balances recalculate automatically with zero email chains.",
      btnText: "Review Approvals",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="3" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "payroll",
      title: "Payroll Prep Without the Chase.",
      desc: "Compile verified attendance, approved leaves, and unpaid days into ready-to-run salary summaries before month-end with zero spreadsheet headaches.",
      btnText: "See Payroll Prep",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      ),
    },
  ];

  // Interactive Way of Working State (Section 3)
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<number>(0);


  // FAQ Accordion State (Section 7)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleOpenDemo = () => {
    openDemoModal({
      title: "Request a Small Business Demo",
      subtitle:
        "See how LattiumHR makes employee records, attendance, leave, and everyday HR simpler for small teams.",
      defaultInterest: "Small Business Solution",
    });
  };

  const scrollToWorkingBlock = (cardId: string) => {
    const targetId =
      cardId === "directory"
        ? "working-directory"
        : cardId === "attendance"
        ? "working-attendance"
        : cardId === "leave"
        ? "working-leave"
        : "working-payroll";
    const el = document.getElementById(targetId) || document.getElementById("the-way-of-working");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Section 7: FAQs explicitly required
  const faqs: FAQItem[] = [
    {
      q: "Is LattiumHR suitable for a small business?",
      a: "Yes. LattiumHR is designed specifically to help small teams (from 5 to 50 employees) transition from spreadsheets, paper forms, and email chains to a clean, intuitive cloud workspace without enterprise complexity or heavy IT overhead.",
    },
    {
      q: "Can we manage employee information in one place?",
      a: "Yes. You can maintain complete digital employee records—including contact details, emergency contacts, job designations, statutory documents, and joining dates—in one organized, searchable directory.",
    },
    {
      q: "Can employees access their own HR information?",
      a: "Yes. Employees get access to a simple self-service portal where they can check their leave balances, submit leave requests, view daily attendance statuses, and download salary slips from web or mobile.",
    },
    {
      q: "Can we manage attendance and leave?",
      a: "Yes. Employees can mark attendance with one click on web or mobile, while managers review daily punches, approve or decline leave requests, and track team coverage to prevent understaffing.",
    },
    {
      q: "How does LattiumHR support payroll-related workflows?",
      a: "LattiumHR automatically compiles verified attendance records, approved leaves, and unpaid days (Loss of Pay) into clean pre-payroll summaries, making monthly salary processing straightforward and error-free.",
    },
    {
      q: "Can we continue using LattiumHR as our team grows?",
      a: "Absolutely. As your business expands from 10 to 50 and beyond, LattiumHR grows with you by supporting department structures, custom leave policies, multiple office locations, and role-based permissions without switching systems.",
    },
  ];

  // Section 3: Way of Working tabs
  const wayOfWorkingTabs = [
    {
      id: "records",
      badge: "01 Employee Directory",
      title: "Centralized Employee Information",
      desc: "Consolidate personal profiles, job designations, emergency contacts, and statutory IDs in one secure cloud record. Ditch unorganized paper files and desktop spreadsheets.",
      highlights: [
        "Single source of truth for personal and contact details",
        "Digital storage for ID proofs, contracts, and joining documents",
        "Role-based visibility ensuring sensitive data stays private",
        "Instant search-as-you-type directory across all team members",
      ],
      previewSnippet: {
        title: "Employee Master Profile",
        tag: "Verified",
        fields: [
          { label: "Full Name", value: "Sarah Jenkins" },
          { label: "Role", value: "Senior Product Designer" },
          { label: "Department", value: "Design & UX" },
          { label: "Joining Date", value: "14 Jan 2024" },
          { label: "Status", value: "Active • Full-Time" },
        ],
      },
    },
    {
      id: "attendance",
      badge: "02 Daily Attendance",
      title: "Streamlined Daily Attendance",
      desc: "Capture daily presence through straightforward web and mobile clock-ins. Review team hours, verify on-time arrival, and avoid manual timesheet discrepancies.",
      highlights: [
        "One-tap web and mobile punch without expensive biometric devices",
        "Real-time daily presence board for business owners and leads",
        "Automatic on-time, late-mark, and grace period calculations",
        "Transparent monthly attendance records ready for review anytime",
      ],
      previewSnippet: {
        title: "Today's Attendance Roster",
        tag: "Live",
        fields: [
          { label: "Checked In", value: "22 of 24 Team Members" },
          { label: "Avg. Clock-In", value: "09:14 AM (On Time)" },
          { label: "Shift Schedule", value: "General (09:00 - 18:00)" },
          { label: "Location", value: "HQ Office & Field" },
          { label: "Verification", value: "100% Mobile Geofence" },
        ],
      },
    },
    {
      id: "leave",
      badge: "03 Leave Management",
      title: "Clear Leave Quotas & Approvals",
      desc: "Eliminate email leave requests and lost holiday records. Employees apply in seconds, while managers see team coverage before approving time off.",
      highlights: [
        "Self-service leave balances (Casual, Sick, Earned) updated in real time",
        "One-click manager approvals with automatic email/app notifications",
        "Team overlap warnings that prevent critical role understaffing",
        "Transparent holiday calendars shared across the entire small team",
      ],
      previewSnippet: {
        title: "Leave Balance & Queue",
        tag: "Updated",
        fields: [
          { label: "Casual Leave", value: "4.0 Days Available" },
          { label: "Earned Leave", value: "9.5 Days Available" },
          { label: "Pending Requests", value: "1 to Review (Priya Shah)" },
          { label: "Team Coverage", value: "Safe • No Coverage Clash" },
          { label: "Turnaround", value: "< 2 Hours Avg Approval" },
        ],
      },
    },
    {
      id: "payroll",
      badge: "04 Payroll Readiness",
      title: "Accurate Payroll Preparation",
      desc: "Connect verified attendance and approved leaves directly into monthly salary preparation. Save hours of manual recalculation and avoid costly payroll mistakes.",
      highlights: [
        "Automated Loss of Pay (LOP) based on verified attendance data",
        "Pre-payroll reconciliation checklist for business owners and accountants",
        "Direct calculation of unpaid days and overtime hours",
        "Clean exportable payroll summaries ready for salary disbursals",
      ],
      previewSnippet: {
        title: "Pre-Payroll Reconciliation",
        tag: "Reconciled",
        fields: [
          { label: "Pay Period", value: "Current Month (1st - 30th)" },
          { label: "Eligible Members", value: "24 of 24 Reconciled" },
          { label: "Loss of Pay Days", value: "2.0 Total (Auto-Applied)" },
          { label: "Disbursal Status", value: "Ready for Salary Run" },
          { label: "Discrepancies", value: "0 Unresolved Errors" },
        ],
      },
    },
  ];

  // Section 3B: Why LattiumHR for Small Businesses (Matching Reference Image Process Cards)
  const whySmallBusinessCards = [
    {
      id: "simplicity",
      number: "01",
      title: "Fast & Easy Setup",
      desc: "Get your workspace running in under 48 hours with easy team imports, pre-built leave policies, and zero complex IT onboarding.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M4 14l6-6 4 4 6-6" />
        </svg>
      ),
    },
    {
      id: "operations",
      number: "02",
      title: "Unified Workflow",
      desc: "Connect daily mobile clock-ins, leave approvals, and monthly pre-payroll records into one single, error-free operational flow.",
      isFeatured: true,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
          <path d="m19 5-7 7" />
        </svg>
      ),
    },
    {
      id: "security",
      number: "03",
      title: "Role-Based Privacy",
      desc: "Protect sensitive salary figures, personal identification documents, and contract records with clear role-based access controls.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.2 0l-3.58 2.687a.5.5 0 0 1-.81-.47l1.514-8.526" />
        </svg>
      ),
    },
    {
      id: "pricing",
      number: "04",
      title: "Predictable Pricing",
      desc: "Transparent, affordable plans built specifically for 5 to 50 staff. Scale your team and branches without unexpected price jumps.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
    },
  ];


  return (
    <div className="app-shell inner-page-shell sb-page-wrapper">
      <SEO
        title="Small Business HRMS Software — Solutions for Growing Teams | LattiumHR"
        description="Make HR simpler for your small business. Manage employee information, attendance, leave, and everyday HR in one organized workspace with LattiumHR."
        canonicalPath="/solutions/small-businesses"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            SECTION 1 — HERO
            ========================================================================= */}
        <section className="sb-hero-section" aria-labelledby="sb-hero-heading">
          <div className="container">
            {/* Eyebrow */}
            <div className="sb-hero-eyebrow-tag">
              <span className="sb-hero-eyebrow-sparkle">✦</span>
              <span>SOLUTIONS FOR SMALL BUSINESSES</span>
              <span className="sb-hero-eyebrow-sparkle">✦</span>
            </div>

            {/* Headline */}
            <h1 id="sb-hero-heading" className="sb-hero-title">
              Make HR Simpler for Your <span className="sb-glow-text">Small Business.</span>
            </h1>

            {/* Subheadline */}
            <p className="sb-hero-subhead">
              Manage employee information, attendance, leave, and everyday HR activities in one organized workspace, so you can spend less time on administration and more time growing your business.
            </p>

            {/* Hero CTAs */}
            <div className="sb-hero-actions">
              <button
                type="button"
                className="sb-btn-primary"
                onClick={handleOpenDemo}
              >
                Request a Demo <Icon name="arrow" size={16} />
              </button>
              <a href="#workspace" className="sb-btn-secondary">
                Explore the Workspace
              </a>
            </div>

            {/* Trust Row */}
            <div className="sb-hero-trust-row">
              <span>
                <Icon name="check" size={14} /> No credit card required
              </span>
              <span>
                <Icon name="check" size={14} /> Set up in under 2 weeks
              </span>
              <span>
                <Icon name="check" size={14} /> Built for teams of 5 to 50
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2 — WHAT YOU GET FROM DAY ONE (4 Quick-Win Cards in 1 Row)
            Light background flowing naturally from hero, 2x2 grid on mobile
            ========================================================================= */}
        <section className="sb-dayone-section" aria-labelledby="dayone-heading">
          <div className="container">
            <div className="sb-section-header center">
              <span className="sb-eyebrow">✦ WHAT YOU GET FROM DAY ONE ✦</span>
              <h2 id="dayone-heading" className="sb-section-title">
                Small Setup. Big Difference.
              </h2>
              <p className="sb-section-subhead">
                You don’t need months of training to see the change. Here’s what your team gets right away.
              </p>
            </div>

            <div className="sb-dayone-grid">
              {dayOneCards.map((card) => (
                <div key={card.id} className="sb-dayone-card">
                  <div className="sb-dayone-icon-wrap">
                    {card.icon}
                  </div>
                  <h3 className="sb-dayone-card-title">{card.title}</h3>
                  <p className="sb-dayone-card-desc">{card.desc}</p>
                  <button
                    type="button"
                    onClick={() => scrollToWorkingBlock(card.id)}
                    className="sb-dayone-card-link"
                    aria-label={`Learn more about ${card.title}`}
                  >
                    <span>{card.btnText}</span>
                    <span className="sb-dayone-link-arrow">↓</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3 — THE SMALL BUSINESS WAY OF WORKING (4 Alternating Checkerboard Blocks)
            Matching Reference Image 1 (50/50 Checkerboard) & Image 2 (SaaS UI Cards)
            ========================================================================= */}
        <section className="sb-way-of-working-section" id="the-way-of-working" aria-labelledby="working-heading">
          <div className="container">
            <div className="sb-section-header center">
              <span className="sb-eyebrow">✦ THE SMALL BUSINESS WAY OF WORKING ✦</span>
              <h2 id="working-heading" className="sb-section-title">
                A More Organized Way to Manage Your People.
              </h2>
              <p className="sb-section-subhead">
                Bring essential employee records, daily attendance, leave approvals, and pre-payroll preparation into one structured, connected workflow.
              </p>
            </div>

            {/* Alternating 4-Block Checkerboard Grid (Matching Reference Image 1) */}
            <div className="sb-checkerboard-wrapper">
              {/* -------------------------------------------------------------------
                  ROW 1: EMPLOYEE DIRECTORY (Text Left, Visual Right)
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-directory">
                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">ENSURING YOUR RECORDS ARE STRUCTURED</span>
                  <h3 className="sb-cb-title">
                    Centralized Employee Information & Directory.
                  </h3>
                  <p className="sb-cb-desc">
                    Consolidate personal profiles, job designations, emergency contacts, and statutory IDs in one secure cloud record. Ditch unorganized paper files, desktop spreadsheets, and scattered email attachments.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Single source of truth for personal and contact details</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Digital storage for ID proofs, contracts, and joining documents</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Role-based visibility ensuring sensitive data stays private</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Directory Workflow <span className="sb-cb-arrow">→</span>
                  </button>
                </div>

                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">All Records <span className="sb-m-count">24</span></span>
                        <span className="sb-m-tab">Verified <span className="sb-m-count">22</span></span>
                        <span className="sb-m-tab">Probation <span className="sb-m-count">2</span></span>
                        <span className="sb-m-tab">Teams <span className="sb-m-count">4</span></span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Sarah Jenkins • Lead Designer</strong>
                              <span className="sb-m-badge high">Verified</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Onboarding Completed</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Rajesh Kumar • Project Lead, IT</strong>
                              <span className="sb-m-badge slate">Verified</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% KYC & Bank Records Active</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Priya Singh • Operations Lead</strong>
                              <span className="sb-m-badge amber">Probation</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill orange" style={{ width: "80%" }} />
                            </div>
                            <span className="sb-m-status-text overdue">80% 30-Day Probation Review</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Vikram Nair • Full-Stack Engineer</strong>
                              <span className="sb-m-badge active">Active</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Employee Profile Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card (Matching Image 2) */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Verified</small>
                          <strong>22</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="7" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>92%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Pending</small>
                          <strong>02</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="80" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>8%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Missing</small>
                          <strong>00</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#94a3b8" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="88" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>0%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Compliant</small>
                          <strong>24</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ROW 2: DAILY ATTENDANCE (Visual Left, Text Right)
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-attendance">
                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">Today's Punch <span className="sb-m-count">24</span></span>
                        <span className="sb-m-tab">Present <span className="sb-m-count">22</span></span>
                        <span className="sb-m-tab">Remote <span className="sb-m-count">2</span></span>
                        <span className="sb-m-tab">Late <span className="sb-m-count">1</span></span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Ananya Kapoor • 09:12 AM</strong>
                              <span className="sb-m-badge active">On Time</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Web Check-in Verified</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Rohan Mehta • 09:05 AM</strong>
                              <span className="sb-m-badge active">On Time</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Mobile Geofence Confirmed</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Priya Shah • 09:28 AM</strong>
                              <span className="sb-m-badge slate">Remote</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Approved Remote Clock-In</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Vikram Nair • 09:35 AM</strong>
                              <span className="sb-m-badge amber">Grace Period</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill orange" style={{ width: "50%" }} />
                            </div>
                            <span className="sb-m-status-text overdue">50% Grace Time Logged</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Present</small>
                          <strong>22</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="7" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>92%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>On-Time</small>
                          <strong>96%</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="26" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>30%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Remote</small>
                          <strong>02</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="70" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>20%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Absent</small>
                          <strong>00</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#94a3b8" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="88" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>0%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">CAPTURING DAILY PRESENCE WITH ACCURACY</span>
                  <h3 className="sb-cb-title">
                    Streamlined Daily Attendance & Shift Tracking.
                  </h3>
                  <p className="sb-cb-desc">
                    Capture daily presence through straightforward web and mobile clock-ins. Review team hours, verify on-time arrivals, manage shift grace periods, and eliminate manual paper timesheets forever.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>One-tap web and mobile punch without biometric devices</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Real-time daily presence board for business owners and leads</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Automatic on-time, late-mark, and grace period calculations</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Attendance Workflow <span className="sb-cb-arrow">→</span>
                  </button>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ROW 3: LEAVE MANAGEMENT (Text Left, Visual Right)
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-leave">
                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">SIMPLIFYING TIME-OFF & COVERAGE</span>
                  <h3 className="sb-cb-title">
                    Clear Leave Quotas & 1-Click Approvals.
                  </h3>
                  <p className="sb-cb-desc">
                    Eliminate lost holiday records and email chains. Employees check balances and apply in seconds from their phone, while managers verify coverage to prevent critical role understaffing.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Self-service leave balances (Casual, Sick, Earned) updated live</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>One-click manager approvals with automatic email & app notifications</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Team overlap warnings preventing critical shift understaffing</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Leave Workflow <span className="sb-cb-arrow">→</span>
                  </button>
                </div>

                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">All Leaves <span className="sb-m-count">18</span></span>
                        <span className="sb-m-tab">Approved <span className="sb-m-count">14</span></span>
                        <span className="sb-m-tab">Pending <span className="sb-m-count">1</span></span>
                        <span className="sb-m-tab">Upcoming <span className="sb-m-count">3</span></span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Priya Shah • Casual Leave (1d)</strong>
                              <span className="sb-m-badge amber">Pending</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill orange" style={{ width: "50%" }} />
                            </div>
                            <span className="sb-m-status-text overdue">50% Manager Review in Progress</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Vikram Nair • Earned Leave (2d)</strong>
                              <span className="sb-m-badge active">Approved</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Shift Coverage Locked</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Aditi Sharma • Sick Leave (1d)</strong>
                              <span className="sb-m-badge slate">Approved</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Medical Proof Attached</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Rajesh Kumar • Work From Home</strong>
                              <span className="sb-m-badge active">Approved</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Safe Team Coverage</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Coverage</small>
                          <strong>98%</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#802B5B" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="2" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>98%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Pending</small>
                          <strong>01</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="70" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>20%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Turnaround</small>
                          <strong>&lt; 2h</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="26" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>30%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Clashes</small>
                          <strong>00</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#94a3b8" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="88" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  ROW 4: PAYROLL READINESS (Visual Left, Text Right)
                  ------------------------------------------------------------------- */}
              <div className="sb-checkerboard-row" id="working-payroll">
                <div className="sb-checkerboard-visual-col">
                  <div className="sb-mockup-stage">
                    {/* Main UI Card */}
                    <div className="sb-mockup-main-card">
                      <div className="sb-mockup-tabs-bar">
                        <span className="sb-m-tab is-active">Current Pay Run</span>
                        <span className="sb-m-tab">Reconciled <span className="sb-m-count">24</span></span>
                        <span className="sb-m-tab">LOP <span className="sb-m-count">2</span></span>
                        <span className="sb-m-tab">Disbursed</span>
                      </div>

                      <div className="sb-mockup-task-list">
                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Base Salary Register • 24 Members</strong>
                              <span className="sb-m-badge active">Reconciled</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Eligible Members Reconciled</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Verified Attendance & Punches</strong>
                              <span className="sb-m-badge high">Completed</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Presence Synced</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Loss of Pay (LOP) Days (2.0d)</strong>
                              <span className="sb-m-badge amber">Auto-Applied</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill orange" style={{ width: "50%" }} />
                            </div>
                            <span className="sb-m-status-text">50% Automated LOP Deducted</span>
                          </div>
                        </div>

                        <div className="sb-m-task-row">
                          <span className="sb-m-checkbox checked" />
                          <div className="sb-m-task-icon-box" />
                          <div className="sb-m-task-info">
                            <div className="sb-m-task-title-row">
                              <strong>Salary Summary Register Export</strong>
                              <span className="sb-m-badge active">Bank Ready</span>
                            </div>
                            <div className="sb-m-progress-bar">
                              <span className="sb-m-progress-fill green" style={{ width: "100%" }} />
                            </div>
                            <span className="sb-m-status-text">100% Export Formatted</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overlapping Floating Donut Gauge Card */}
                    <div className="sb-mockup-gauge-card">
                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Payroll</small>
                          <strong>Ready</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#802B5B" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>100%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Errors</small>
                          <strong>00</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#94a3b8" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="88" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>0%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Auto LOP</small>
                          <strong>2.0d</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="70" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>20%</span>
                        </div>
                      </div>

                      <div className="sb-gauge-item">
                        <div className="sb-gauge-meta">
                          <small>Saved</small>
                          <strong>14h</strong>
                        </div>
                        <div className="sb-donut-circle">
                          <svg viewBox="0 0 36 36" className="sb-donut-svg">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="26" strokeLinecap="round" transform="rotate(-90 18 18)" />
                          </svg>
                          <span>30%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sb-checkerboard-text-col">
                  <span className="sb-cb-eyebrow">ENSURING ACCURATE SALARY PREPARATION</span>
                  <h3 className="sb-cb-title">
                    Accurate Pre-Payroll Preparation & Zero Errors.
                  </h3>
                  <p className="sb-cb-desc">
                    Connect verified attendance and approved leaves directly into monthly salary preparation. Save hours of manual recalculation, automate unpaid Loss of Pay (LOP) days, and export bank-ready payroll summaries.
                  </p>
                  <ul className="sb-cb-checklist">
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Automated Loss of Pay (LOP) based on verified attendance data</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Pre-payroll reconciliation checklist for business owners & accountants</span>
                    </li>
                    <li>
                      <span className="sb-cb-check">✓</span>
                      <span>Clean exportable payroll summaries ready for direct bank disbursals</span>
                    </li>
                  </ul>
                  <button type="button" className="sb-cb-action-btn" onClick={handleOpenDemo}>
                    Explore Payroll Workflow <span className="sb-cb-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3B — WHY LATTIUMHR FOR SMALL BUSINESSES (Interactive 3D Flip Cards)
            Matching Reference Image: Cyan Front / White Hover-Turn Detail Card with Pill Button
            ========================================================================= */}
        <section className="sb-why-lattium-section" aria-labelledby="why-lattium-heading">
          {/* Subtle background pattern & atmospheric glow matching reference */}
          <div className="sb-why-lattium-backdrop" aria-hidden="true" />
          <div className="sb-why-lattium-glow" aria-hidden="true" />

          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div className="sb-why-header">
              <span className="sb-why-eyebrow">✦ WHY LATTIUMHR IS BEST FOR SMALL BUSINESSES ✦</span>
              <h2 id="why-lattium-heading" className="sb-why-title">
                What Makes LattiumHR Right for Small Businesses?
              </h2>
              <p className="sb-why-subhead">
                Give your growing business a simpler way to manage people, organize everyday HR tasks, and keep your workforce information in one connected place.
              </p>
            </div>

            {/* Process Cards Grid matching Reference Image */}
            <div className="sb-why-cards-grid" role="region" aria-label="Why LattiumHR Pillars">
              {whySmallBusinessCards.map((card) => (
                <div
                  key={card.id}
                  className={`sb-why-process-card ${card.isFeatured ? "is-featured" : ""}`}
                >
                  {/* Top Notch Badge */}
                  <div className="sb-why-notch">
                    <span>{card.number}</span>
                  </div>

                  {/* Centered Icon Box */}
                  <div className="sb-why-icon-box">
                    {card.icon}
                  </div>

                  {/* Centered Title */}
                  <h3 className="sb-why-card-title">{card.title}</h3>

                  {/* Centered Description */}
                  <p className="sb-why-card-desc">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* =========================================================================
            SECTION 5 — PROPER MID-CTA: BRAND MANIFESTO FOR SMALL BUSINESSES
            Full-width, reduced height, clean 2-column mid-cta layout
            ========================================================================= */}
        <section className="sb-manifesto-section" aria-labelledby="manifesto-heading">
          <div className="container sb-manifesto-container">
            <div className="sb-manifesto-layout">
              {/* Left Column: Eyebrow, Headline & Manifesto Message */}
              <div className="sb-manifesto-left">
                <span className="sb-manifesto-eyebrow">
                  ✦ A MANIFESTO FOR SMALL BUSINESSES ✦
                </span>
                <h2 id="manifesto-heading" className="sb-manifesto-headline">
                  Small Business. <span className="sb-manifesto-highlight">Big Ambitions.</span>
                </h2>
                <p className="sb-manifesto-lead">
                  “Every great business starts somewhere — with an idea, a dedicated team, and the determination to build something meaningful.”
                </p>
                <p className="sb-manifesto-text">
                  You don't need enterprise-level complexity or bloated systems. You need the freedom to focus on your vision, your people, and the opportunities ahead.
                </p>
                <div className="sb-manifesto-punchline">
                  Your business may be small today. Your ambition doesn't have to be.
                </div>
              </div>

              {/* Right Column: Clean Action Box with Conversion Checklist */}
              <div className="sb-manifesto-right">
                <div className="sb-manifesto-action-box">
                  <h3 className="sb-manifesto-action-title">Ready for Your Next Chapter?</h3>
                  <p className="sb-manifesto-action-desc">
                    See how LattiumHR organizes employee records, attendance, and pre-payroll for growing small teams.
                  </p>
                  <div className="sb-manifesto-checklist">
                    <div className="sb-manifesto-check-item">
                      <span className="sb-manifesto-check-icon">✓</span>
                      <span>Freedom to Focus — zero admin chaos</span>
                    </div>
                    <div className="sb-manifesto-check-item">
                      <span className="sb-manifesto-check-icon">✓</span>
                      <span>Scale Without Limits — 5 to 50+ staff</span>
                    </div>
                    <div className="sb-manifesto-check-item">
                      <span className="sb-manifesto-check-icon">✓</span>
                      <span>Live in under 2 weeks with guided setup</span>
                    </div>
                  </div>
                  <div className="sb-manifesto-btn-group">
                    <button
                      type="button"
                      className="sb-manifesto-btn"
                      onClick={handleOpenDemo}
                    >
                      Request a Demo <Icon name="arrow" size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5B — THE SMALL BUSINESS WORKSPACE (Moved below Manifesto)
            ========================================================================= */}
        <section id="workspace" className="sb-workspace-role-section" aria-labelledby="perspectives-heading">
          <div className="container">
            {/* Header styled unified with proper eyebrow, title, and subheadline */}
            <div className="sb-section-header center">
              <span className="sb-eyebrow">✦ THE SMALL BUSINESS WORKSPACE ✦</span>
              <h2 id="perspectives-heading" className="sb-section-title">
                Everything Starts With Your Team.
              </h2>
              <p className="sb-section-subhead">
                Give business owners, managers, and employees clear visibility over daily operations, attendance, and payroll readiness without administrative overhead.
              </p>
            </div>

            {/* Mobile Tab Switcher Pills (visible on screens <= 860px) */}
            <div className="sb-workspace-mobile-pills" role="tablist" aria-label="Small Business Perspectives">
              {workspaceCards.map((card, idx) => (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={activeRoleIndex === idx}
                  className={`sb-mobile-pill-btn ${activeRoleIndex === idx ? "is-active" : ""}`}
                  onClick={() => setActiveRoleIndex(idx)}
                >
                  <span className="sb-pill-num">{card.number}</span>
                  <span>{card.verticalTitle}</span>
                </button>
              ))}
            </div>

            {/* Interactive Cards Stage: Active Expanded Card Left, Fixed Vertical Role Strips Right */}
            <div className="sb-workspace-cards-stage">
              {(() => {
                const activeCard = workspaceCards[activeRoleIndex] || workspaceCards[0];
                return (
                  <div
                    key={activeCard.id}
                    className="sb-role-expanded-card"
                    role="tabpanel"
                    aria-labelledby={`tab-btn-${activeCard.id}`}
                  >
                    {/* Left: Info & Specs Grid */}
                    <div className="sb-role-expanded-content">
                      <h3 className="sb-role-name">{activeCard.title}</h3>
                      <p className="sb-role-description">{activeCard.desc}</p>

                      {/* Proper Feature Points Grid */}
                      <div className="sb-workspace-points-grid">
                        {activeCard.points.map((pt, pIdx) => (
                          <div key={pIdx} className="sb-workspace-point-item">
                            <span className="sb-workspace-point-icon">
                              <Icon name="check" size={13} />
                            </span>
                            <div className="sb-workspace-point-text">
                              <span className="sb-workspace-point-title">{pt.title}</span>
                              <span className="sb-workspace-point-desc">{pt.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Dark Action CTA Button */}
                      <button
                        type="button"
                        className="sb-role-cta-btn"
                        onClick={handleOpenDemo}
                      >
                        <span className="sb-role-cta-arrow">→</span>
                        <span>{activeCard.buttonText}</span>
                      </button>
                    </div>

                    {/* Right: Portrait Visual Image */}
                    <div className="sb-role-expanded-visual">
                      <div className="sb-visual-img-frame">
                        <img
                          src={activeCard.image}
                          alt={activeCard.alt}
                          className="sb-role-img"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Fixed Right-Side Vertical Strips (Only the remaining 2 inactive roles) */}
              <div className="sb-workspace-right-strips" role="tablist" aria-label="Other Workspace Roles">
                {workspaceCards
                  .map((card, idx) => ({ card, idx }))
                  .filter(({ idx }) => idx !== activeRoleIndex)
                  .map(({ card, idx }) => (
                    <button
                      key={card.id}
                      id={`tab-btn-${card.id}`}
                      type="button"
                      role="tab"
                      aria-selected={false}
                      className="sb-role-vertical-strip"
                      onClick={() => setActiveRoleIndex(idx)}
                      title={`Click to view ${card.verticalTitle}`}
                    >
                      <span className="sb-vertical-num">{card.number}</span>
                      <span className="sb-vertical-label">{card.verticalTitle}</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6 — FREQUENTLY ASKED QUESTIONS (Small Business HR, Answered)
            ========================================================================= */}
        <section className="faq-section emp-page-faq sb-faq-section" id="faqs" aria-labelledby="faq-heading">
          <div className="container faq-grid">
            <div>
              <div className="section-heading">
                <span className="eyebrow">QUESTIONS, ANSWERED</span>
                <h2 id="faq-heading">Small Business HR, Answered.</h2>
                <p>
                  Everything you need to know about setting up, running, and scaling with LattiumHR for small teams.
                </p>
              </div>
              <Link className="text-link" to="/faq">
                View all FAQs <Icon name="arrow" size={17} />
              </Link>
            </div>

            <div className="faq-list">
              {faqs.map((f, i) => (
                <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.q}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{f.q}</span>
                    <i aria-hidden="true">{openFaq === i ? "−" : "+"}</i>
                  </button>
                  {openFaq === i && <p>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8 — FINAL CTA (Ready to Make HR Simpler?)
            ========================================================================= */}
        <section className="final-cta sb-final-cta-section" aria-labelledby="final-cta-heading">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">READY TO SIMPLIFY HR?</span>
              <h2 id="final-cta-heading">Ready to Make HR Simpler?</h2>
              <p>
                See how LattiumHR can bring more structure to your everyday HR operations.
              </p>
              <div className="final-actions">
                <Button onClick={handleOpenDemo}>
                  Request a Demo <Icon name="arrow" />
                </Button>
                <Button to="/contact" secondary>
                  Contact Our Team
                </Button>
              </div>
              <div className="final-points">
                <span>
                  <Icon name="check" /> Free personalized 30-min walkthrough
                </span>
                <span>
                  <Icon name="check" /> No credit card required
                </span>
                <span>
                  <Icon name="check" /> Ready to go live in 2 weeks
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Website's Existing Footer */}
      <Footer />
    </div>
  );
}

export default SmallBusinessPage;
