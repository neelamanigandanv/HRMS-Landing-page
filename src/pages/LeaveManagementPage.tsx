import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useDemoModal } from "../context/DemoModalContext";
import "./LeaveManagementPage.css";

export function LeaveManagementPage() {
  const { openDemoModal } = useDemoModal();

  // State for interactive elements
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeWorkflowCard, setActiveWorkflowCard] = useState<number>(1);
  const [activeConnectedCard, setActiveConnectedCard] = useState<number | null>(null);

  const connectedModules = [
    {
      number: "01",
      title: "Employee Management",
      icon: <Icon name="employee" size={30} />,
      description:
        "Centralized employee directory, reporting hierarchies, and verified KYC linked directly to every leave record.",
      link: "/features/employee-management",
    },
    {
      number: "02",
      title: "Attendance Management",
      icon: <Icon name="attendance" size={30} />,
      description:
        "Approved leaves, sick days, and half-day permissions instantly update biometric attendance rosters and daily punch logs.",
      link: "/features/attendance-management",
    },
    {
      number: "03",
      title: "Payroll Management",
      icon: <Icon name="payroll" size={30} />,
      description:
        "Automate Loss of Pay (LOP), unpaid days, and annual leave encashment calculations directly into monthly salary slips.",
      link: "/features/payroll-management",
    },
    {
      number: "04",
      title: "Performance Management",
      icon: <Icon name="award" size={30} />,
      description:
        "Track unplanned absence trends, wellness leave utilization, and shift reliability inside annual employee appraisals.",
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
      headline: "Cut leave approval turnaround from 4 days to under 2 hours",
      quote:
        "Tracking paper leave forms and email approvals across our 500+ employee team was chaotic. With Lattium's mobile app and Slack integration, managers approve requests in seconds while team calendars update automatically.",
      name: "Freddy Dean",
      role: "Head of People Operations, FinTech Horizon",
      avatar: "/images/testi-avatar-1.jpg",
    },
    {
      id: 2,
      brand: "zendesk",
      headline: "Zero payroll calculation errors from unrecorded sick days or LOP",
      quote:
        "Pre-payroll reconciliation used to take our HR team three full days every month. Lattium's automatic Loss of Pay (LOP) synchronization directly feeds approved time off into salary slips with 100% precision.",
      name: "Sarah Jenkins",
      role: "VP of HR, CloudScale Systems",
      avatar: "/images/testi-avatar-2.jpg",
    },
    {
      id: 3,
      brand: "notion",
      headline: "Collision alerts stopped understaffing across our retail branches",
      quote:
        "During major festival seasons, multiple department specialists used to take off simultaneously. Lattium's real-time clash detection alerts managers before approvals, protecting our critical customer support coverage.",
      name: "Rohan Mehta",
      role: "Chief Operating Officer, Apex Retail",
      avatar: "/images/leader-rohan-mehta.jpg",
    },
    {
      id: 4,
      brand: "hubspot",
      headline: "Custom regional holiday calendars for all 7 of our state offices",
      quote:
        "Operating across multiple Indian states with different statutory festival lists used to cause massive compliance confusion. Lattium lets us assign branch-specific holiday calendars with zero manual maintenance.",
      name: "Ananya Kapoor",
      role: "Director of People & Culture, UrbanBite",
      avatar: "/images/leader-ananya-kapoor.jpg",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 3 Leave Management Capability Blocks (Matching Reference Layout)
  const capabilityBlocks = [
    {
      id: "custom-policies",
      badge: "01 Policy Engine",
      eyebrow: "✦ 01. CUSTOMIZABLE POLICIES & ACCRUAL ENGINE ✦",
      image: "/images/leave-block-accrual.jpg",
      imageAlt: "HR Director configuring leave types, annual quotas, and carry-forward rules on desktop screen",
      title: "Customizable Leave Policies & Automated Accrual Engine",
      description:
        "Configure limitless leave categories—from earned and casual leave to parental, bereavement, and compensatory off—with automated monthly, quarterly, or annual accruals.",
      bullets: [
        "Multi-tier leave quota rules based on tenure, branch, and employment grade",
        "Automated monthly & quarterly balance accruals with pro-rata new hire logic",
        "Configurable year-end carry-forward caps and automated lapse triggers",
        "Customizable encashment thresholds during annual payroll freeze or exits",
        "State-specific statutory leave compliance (Earned, Casual, Sick & Festival)",
        "Mandatory notice periods and sandwich rule enforcement toggles",
      ],
      callout: {
        role: "Workforce Policy Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Statutory Compliant" },
        { value: "Unlimited", label: "Custom Leave Types" },
        { value: "Automated", label: "Accrual Cycles" },
        { value: "0 Errors", label: "Balance Accuracy" },
      ],
    },
    {
      id: "approval-workflows",
      badge: "02 Multi-Tier Approvals",
      eyebrow: "✦ 02. MULTI-LEVEL APPROVALS & CLASH DETECTION ✦",
      image: "/images/leave-block-approval.jpg",
      imageAlt: "Manager reviewing team leave request with team calendar and clash detection on mobile app",
      title: "Multi-Level Approval Workflows & Team Clash Detection",
      description:
        "Empower managers with visual team coverage calendars, automated collision warnings when key teammates take overlapping time off, and one-tap approvals from mobile or email.",
      bullets: [
        "Customizable approval hierarchies (Reporting Manager, HOD, and HR Lead)",
        "Real-time team collision alerts preventing simultaneous department time off",
        "Automated delegation rules routing approvals when managers are out of office",
        "1-click approvals via mobile push notifications and rich email action cards",
        "Self-service cancellation and date amendment workflows for employees",
        "Document upload attachments for medical certificates and statutory proofs",
      ],
      callout: {
        role: "Employee Experience Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "< 24 hrs", label: "Approval Turnaround" },
        { value: "Zero", label: "Coverage Collisions" },
        { value: "1-Click", label: "Mobile Approvals" },
        { value: "Auto", label: "Out-of-Office Routing" },
      ],
    },
    {
      id: "payroll-sync",
      badge: "03 Payroll & Attendance",
      eyebrow: "✦ 03. ATTENDANCE & PAYROLL SYNCHRONIZATION ✦",
      image: "/images/leave-block-payroll.jpg",
      imageAlt: "Finance and HR specialists reviewing payroll reconciliation report with leave encashment and unpaid days",
      title: "Seamless Attendance & Automated Payroll Synchronization",
      description:
        "Never manually calculate Loss of Pay (LOP) again. Approved leaves instantly update biometric attendance rosters, shift calendars, and monthly salary computations in real time.",
      bullets: [
        "Instant biometric attendance sync converting unapproved absences to LOP",
        "Automated Loss of Pay (LOP) deductions computed into gross salary runs",
        "Compensatory off (Comp-Off) credits earned automatically from weekend work",
        "Year-end leave encashment payouts calculated against basic salary formulas",
        "Branch-wise regional and statutory public holiday calendar management",
        "Audit-ready leave balance sheets with complete manager approval logs",
      ],
      callout: {
        role: "Payroll & Compliance Lead",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "1-Click", label: "Payroll Integration" },
        { value: "0 Days", label: "Pre-Payroll Delay" },
        { value: "100%", label: "LOP Accuracy" },
        { value: "Real-Time", label: "Biometric Sync" },
      ],
    },
  ];

  // 3-Step Work Process
  const workflowSteps = [
    {
      number: "01",
      title: "Request & Review",
      description:
        "Employees check live balances on mobile and submit leave in 1 click; managers review clash warnings with live team availability.",
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
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Approve & Roster Sync",
      description:
        "Multi-tier approvals trigger instant team calendar updates, out-of-office notifications, and automated shift schedule adjustments.",
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
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "1-Click Payroll Handshake",
      description:
        "Loss of Pay (LOP) deductions, weekend comp-offs, and year-end encashments calculate into salary processing with zero manual errors.",
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

  // FAQ data
  const faqs = [
    {
      q: "How does Lattium handle pro-rated leave accruals for new hires?",
      a: "When a new employee joins mid-month or mid-year, Lattium automatically calculates their pro-rated leave entitlement based on company policy rules and start date, eliminating manual spreadsheet balance tracking.",
    },
    {
      q: "Can we configure different leave policies for different branches and entities?",
      a: "Yes. Lattium supports multi-entity and multi-branch configurations. You can assign branch-specific regional holiday calendars, distinct casual/earned leave quotas, and state-specific statutory policies.",
    },
    {
      q: "How does team collision and clash detection prevent understaffing?",
      a: "When an employee submits a leave request, Lattium automatically checks the team's schedule. If approving the request would cause the on-duty headcount to drop below the minimum required threshold, managers receive an immediate conflict warning.",
    },
    {
      q: "Can employees request half-day leaves or compensatory off (Comp-Off)?",
      a: "Yes. Employees can select First-Half or Second-Half options when submitting time off. For employees working on scheduled rest days or public holidays, managers can grant automated Comp-Off credits with expiration timeframes.",
    },
    {
      q: "How does approved leave data feed into monthly payroll calculations?",
      a: "Approved leaves and unapproved absences sync directly into Lattium Payroll. The engine automatically computes Loss of Pay (LOP) deductions, paid leave credits, and year-end leave encashments without manual data transfers.",
    },
  ];

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper leave-page-wrapper">
      <SEO
        title="Leave Management System — Automated Leave Policies & Approvals | LattiumHR"
        description="Streamline employee time-off requests, automate complex leave policies, prevent team coverage collisions, and sync approved leaves with attendance and payroll."
        canonicalPath="/features/leave-management"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Dark Spotlight Stage + Plum Showcase)
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="leave-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Lattium HR">
              <span>✦ LATTIUM HR ✦</span>
            </div>

            {/* Title & Subtext */}
            <h1 id="leave-hero-title" className="emp-hero-rich-title">
              Effortless <span className="emp-glow-text">Leave</span>
              <br className="emp-hero-br" />
              Management
            </h1>
            <p className="emp-hero-rich-subhead">
              Ready to eliminate balance disputes, automate multi-tier approvals, and sync time off directly into payroll with Lattium HR. Get started by booking a demo or signing up for a free trial today.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="emp-hero-rich-actions">
              <button
                type="button"
                className="emp-pill-btn-primary"
                onClick={() =>
                  openDemoModal({
                    title: "Book a Leave Management Demo",
                    subtitle:
                      "Experience automated accruals, team collision alerts, and 1-click payroll sync with Lattium HR.",
                  })
                }
              >
                Book a Demo <Icon name="arrow" size={14} />
              </button>
              <button
                type="button"
                className="emp-pill-btn-secondary"
                onClick={() => {
                  const featSection = document.getElementById("features");
                  featSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Features
              </button>
            </div>

            {/* Trust Points */}
            <div className="emp-hero-trust-row">
              <span><Icon name="check" size={13} /> Automated Carry-Forward & Encashment</span>
              <span><Icon name="check" size={13} /> 100% India Statutory Leave Compliance</span>
              <span><Icon name="check" size={13} /> Zero Shift Coverage Collisions</span>
            </div>

            {/* OPEN FLOATING 3-CARD SHOWCASE */}
            <div className="emp-hero-floating-stage">
              {/* Left Widget: Leave Quotas Donut Chart */}
              <div className="emp-hero-float-card emp-hero-widget-left">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Leave Balance Quotas</h3>
                    <span className="emp-float-widget-sub">By Policy Category</span>
                  </div>
                  <span className="emp-float-widget-badge">
                    <span className="leave-live-pulse-dot" /> Active
                  </span>
                </div>

                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r="68" stroke="#f4edf3" strokeWidth="18" fill="none" />
                    {/* Annual Leave 45% (Emerald #10b981) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#10b981" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="235"
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Sick & Casual 35% (Plum #7b2958) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#7b2958" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="277"
                      strokeLinecap="round"
                      transform="rotate(72 90 90)"
                    />
                    {/* Comp-Off / Festival 20% (Violet #8b5cf6) */}
                    <circle
                      cx="90" cy="90" r="68"
                      stroke="#8b5cf6" strokeWidth="18" fill="none"
                      strokeDasharray="427" strokeDashoffset="341"
                      strokeLinecap="round"
                      transform="rotate(198 90 90)"
                    />
                    {/* Center Info */}
                    <text x="90" y="84" textAnchor="middle" className="emp-donut-center-lbl">Avg. Balance</text>
                    <text x="90" y="106" textAnchor="middle" className="emp-donut-center-val">18.5 Days</text>
                  </svg>
                </div>

                <div className="emp-donut-legend">
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-mint" />
                    <span>Annual (45%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-plum" />
                    <span>Sick/Casual (35%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-violet" />
                    <span>Comp-Off (20%)</span>
                  </div>
                </div>
              </div>

              {/* Center Main Card: Real Employee Managing Time Off on Tablet */}
              <div className="emp-hero-center-photo-card">
                <img
                  src="/images/leave-hero-showcase.jpg"
                  alt="Employee checking approved vacation leave on tablet in modern office with time-off dashboard"
                  className="emp-hero-center-img"
                  loading="eager"
                />

                {/* Top-Left Floating Live Status Pill */}
                <div className="emp-photo-status-pill">
                  <span className="emp-live-pulse" />
                  <span>Leave Portal Active</span>
                </div>
              </div>

              {/* Right Widget: Monthly Leave Approvals & Activity */}
              <div className="emp-hero-float-card emp-hero-widget-right">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Monthly Approvals</h3>
                    <span className="emp-float-widget-sub">Turnaround Efficiency</span>
                  </div>
                  <span className="emp-float-widget-pill-green">99.4%</span>
                </div>

                <div className="emp-widget-stat-row">
                  <strong className="emp-stat-number">42</strong>
                  <div className="emp-stat-meta">
                    <span>Leaves Approved This Month</span>
                    <small>0 Coverage Collisions • On Track</small>
                  </div>
                </div>

                {/* Modern Bar Chart */}
                <div className="emp-mini-bar-chart">
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "78%" }} />
                    <span className="emp-bar-lbl">M</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "85%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "92%" }} />
                    <span className="emp-bar-lbl">W</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "88%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col is-active">
                    <div className="emp-bar-fill" style={{ height: "96%" }} />
                    <span className="emp-bar-lbl">F</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "45%" }} />
                    <span className="emp-bar-lbl">S</span>
                  </div>
                </div>

                {/* Bottom Verified Footnote */}
                <div className="emp-widget-footnote">
                  <Icon name="check" size={14} />
                  <span>100% Automated Payroll & Attendance Sync</span>
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
                Leave Tracking Shouldn't Rely on Paper Forms & Email Chains
              </h2>
              <p className="emp-section-subhead">
                When employees request time off over chat, spreadsheet balances get out of sync, coverage gaps go unnoticed, and month-end payroll calculations turn into chaos.
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="17" y1="8" x2="23" y2="8" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Coverage Gaps &
                  <br />
                  Team Blindspots
                </h3>
                <p className="emp-problem-desc">
                  Uncoordinated time-off requests leave critical branch operations understaffed, triggering customer service backlogs, employee burnout, and project delivery delays.
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
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Manual Spreadsheets &
                  <br />
                  Balance Disputes
                </h3>
                <p className="emp-problem-desc">
                  Tracking carry-forward rules, probationary encashments, and pro-rata new hire quotas in Excel causes chronic balance errors, compliance vulnerabilities, and HR friction.
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
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Pre-Payroll Leave
                  <br />
                  Reconciliation Headaches
                </h3>
                <p className="emp-problem-desc">
                  Chasing approved leave slips and unrecorded sick days right before salary cut-off results in incorrect Loss of Pay (LOP) deductions, delayed payouts, and audit flags.
                </p>
              </div>
            </div>
          </div>

          {/* Section Divider Line */}
          <div className="emp-section-divider-line" aria-hidden="true" />
        </section>

        {/* =========================================================================
            3. LEAVE MANAGEMENT CAPABILITIES (3 Deep Blocks)
            ========================================================================= */}
        <section className="emp-section emp-capabilities-section" id="features">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ LEAVE MANAGEMENT CAPABILITIES ✦</span>
              <h2 className="emp-section-title">
                Everything You Need to Automate Workforce Time Off
              </h2>
              <p className="emp-section-subhead">
                Explore the three core capabilities designed to automate policy accruals, accelerate manager approvals, and sync leaves straight to payroll.
              </p>
            </div>
          </div>

          {/* 3 Full Blocks */}
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
                        <div className="emp-block-checklist-2col">
                          {blk.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="emp-block-check-item">
                              <span className="emp-block-check-icon" aria-hidden="true">
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

                    {/* Bottom Deck: 4 Compact Stats Cards */}
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

                {/* Subtle Centered Divider Line between Blocks */}
                {idx < capabilityBlocks.length - 1 && (
                  <div className="emp-block-divider-line" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. WHY LATTIUM IS BEST FOR LEAVE MANAGEMENT (01 Big Card + 02-05 Small Cards)
            ========================================================================= */}
        <section className="emp-why-choose-section" aria-labelledby="why-choose-title">
          <div className="container">
            {/* Centered Section Header */}
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WHY LATTIUM LEAVE ✦</span>
              <h2 id="why-choose-title" className="emp-section-title">
                Time Off Management That Works the Way Your Teams Do
              </h2>
              <p className="emp-section-subhead">
                Empower employees with effortless self-service leave requests while giving managers complete coverage visibility.
              </p>
            </div>

            {/* Asymmetric 1 Big Card + 4 Small Cards Grid */}
            <div className="emp-why-grid">
              {/* Left Column: 1 Big Card (Top Floating Metric Cards + Bottom Text) */}
              <div className="emp-why-big-card">
                <div className="emp-why-big-top-deck">
                  <div className="emp-why-big-badge">
                    <span className="emp-why-big-pill">
                      ✦ COMPREHENSIVE LEAVE GOVERNANCE ✦
                    </span>
                  </div>

                  {/* Floating Metric Card 1 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="check" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Verified Balance Quotas</small>
                        <strong>99.8% Balance Accuracy</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Spreadsheet Errors</span>
                  </div>

                  {/* Floating Metric Card 2 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="shield" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Pre-Payroll Automation</small>
                        <strong>1-Click LOP Sync</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Dispute Risk</span>
                  </div>
                </div>

                {/* Bottom Narrative Copy */}
                <p className="emp-big-card-bottom-text">
                  From multinational branch structures with distinct regional holiday calendars to fast-moving startups with flexible PTO, Lattium automates policies, eliminates spreadsheets, and preserves critical team bandwidth.
                </p>
              </div>

              {/* Right Column: 4 Small Cards (Equal Line Count, No Numbers) */}
              <div className="emp-why-small-grid">
                {/* Card 01 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="leave" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Configurable Leave Quotas</h3>
                  <p className="emp-why-card-desc">
                    Set up limitless categories with annual, quarterly, or monthly accrual schedules and pro-rata rules.
                  </p>
                </div>

                {/* Card 02 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="branch" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Visual Team Calendars</h3>
                  <p className="emp-why-card-desc">
                    See who is out of office at a glance across branches and avoid critical team coverage shortages.
                  </p>
                </div>

                {/* Card 03 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="shield" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Multi-Level Approval Paths</h3>
                  <p className="emp-why-card-desc">
                    Route requests through project managers, department heads, and HR with automated out-of-office delegation.
                  </p>
                </div>

                {/* Card 04 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="payroll" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Automated Payroll & LOP Sync</h3>
                  <p className="emp-why-card-desc">
                    Loss of Pay deductions, weekend comp-offs, and leave encashments calculate straight into salary slips.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WORK PROCESS SECTION (3 Process Cards)
            ========================================================================= */}
        <section className="emp-process-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="container">
            {/* Centered Header */}
            <div className="emp-process-header">
              <span className="emp-process-eyebrow">✦ PROCESS ✦</span>
              <h2 id="workflow-heading" className="emp-process-title">
                Work Smarter With A Simpler Workflow
              </h2>
              <p className="emp-process-subhead">
                A structured, frictionless approach to requesting time off, maintaining team coverage, and syncing balances straight into payroll.
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
            6. CENTER CTA SECTION
            ========================================================================= */}
        <section className="emp-center-cta-section" aria-labelledby="cta-banner-title">
          <div className="container">
            <div className="emp-center-cta-card">
              {/* Primary Color Accent Block */}
              <div className="emp-cta-primary-bar" />

              {/* Overlapping Photorealistic Team Collaboration Image */}
              <div className="emp-cta-img-wrap">
                <img
                  src="/images/leave-block-payroll.jpg"
                  alt="Finance and HR managers reviewing leave-to-payroll reconciliation report"
                  className="emp-cta-img"
                  loading="lazy"
                />
              </div>

              {/* Right Content Area */}
              <div className="emp-cta-content">
                <span className="emp-cta-badge">✦ CONNECTED TIME-OFF PLATFORM ✦</span>
                <h2 id="cta-banner-title" className="emp-cta-title">
                  Ready to Modernize Your Leave Management?
                </h2>
                <p className="emp-cta-desc">
                  Eliminate spreadsheet balance disputes, stop coverage blindspots, and link approved leaves straight to payroll. Keep your workforce rested, compliant, and energized.
                </p>
                <div className="emp-cta-btn-group">
                  <button
                    type="button"
                    className="emp-cta-btn"
                    onClick={() =>
                      openDemoModal({
                        title: "Schedule a Leave Management Demo",
                        subtitle:
                          "Experience automated accruals, team collision alerts, and 1-click payroll sync with Lattium.",
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
                        title: "Talk to a Leave Specialist",
                        subtitle:
                          "Consult with our product advisors on custom policy structures, multi-branch holiday lists, and seamless migration assistance.",
                      })
                    }
                  >
                    Talk to a Specialist <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CONNECTED HRMS MODULES (Works Better Together)
            ========================================================================= */}
        <section className="emp-section emp-connected-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WORKS BETTER TOGETHER ✦</span>
              <h2 className="emp-section-title">
                Leave Management Is Just the Beginning
              </h2>
              <p className="emp-section-subhead">
                Connect leave quotas and approved time off with related HR workflows across the Lattium platform.
              </p>
            </div>

            {/* 4 Connected Module Cards */}
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
            8. TESTIMONIALS SECTION
            ========================================================================= */}
        <section className="emp-testimonials-section" aria-labelledby="testi-title">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ TESTIMONIALS ✦</span>
              <h2 id="testi-title" className="emp-section-title">
                What People Say About Lattium
              </h2>
              <p className="emp-section-subhead">
                Discover how leading enterprises eliminate leave disputes, automate accruals, and maintain 100% time-off record accuracy.
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
            9. FAQ SECTION
            ========================================================================= */}
        <section className="faq-section emp-page-faq" id="faqs">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="QUESTIONS, ANSWERED"
                title="Everything you need to know"
                body="Common questions about leave policies, multi-tier approval workflows, team collision alerts, and automated payroll calculations."
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
            BOTTOM CONVERSION CTA BANNER
            ========================================================================= */}
        <section className="final-cta">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">READY TO SIMPLIFY TIME OFF?</span>
              <h2>Your team deserves better than email leave chains.</h2>
              <p>
                Join 500+ growing businesses worldwide running HR, attendance, and payroll on
                LattiumHR.
              </p>
              <div className="final-actions">
                <Button
                  onClick={() =>
                    openDemoModal({
                      title: "Book a Leave Management Demo",
                      subtitle:
                        "Experience automated accruals, team collision alerts, and 1-click payroll sync with Lattium HR.",
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

export default LeaveManagementPage;
