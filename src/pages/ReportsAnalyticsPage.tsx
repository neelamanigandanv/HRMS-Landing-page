import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FooterCTA from "../components/common/FooterCTA";
import SEO from "../components/layout/SEO";
import Icon from "../components/ui/Icon";
import SectionHeading from "../components/ui/SectionHeading";
import { useDemoModal } from "../context/DemoModalContext";
import { buildFAQSchema } from "../lib/schema";
import "./EmployeeManagementPage.css";
import "./ReportsAnalyticsPage.css";

export function ReportsAnalyticsPage() {
  const { openDemoModal } = useDemoModal();

  // State for interactive elements
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeWorkflowCard, setActiveWorkflowCard] = useState<number>(1);
  const [activeConnectedCard, setActiveConnectedCard] = useState<number | null>(null);
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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Connected HRMS Modules for Reports & Analytics
  const connectedModules = [
    {
      number: "01",
      title: "Employee Management",
      icon: <Icon name="employee" size={30} />,
      description:
        "Maintains verified profiles, designations, and department structures that form the foundation for all workforce reports.",
      link: "/features/employee-management",
    },
    {
      number: "02",
      title: "Attendance Management",
      icon: <Icon name="attendance" size={30} />,
      description:
        "Feeds clock-in times, shift workdays, and punctuality records directly into daily, monthly, and overtime reports.",
      link: "/features/attendance-management",
    },
    {
      number: "03",
      title: "Leave Management",
      icon: <Icon name="leave" size={30} />,
      description:
        "Supplies leave balance updates, approved absences, and holiday calendars for comprehensive team coverage reporting.",
      link: "/features/leave-management",
    },
    {
      number: "04",
      title: "Payroll Management",
      icon: <Icon name="payroll" size={30} />,
      description:
        "Combines verified attendance and approved leaves into automated Loss of Pay (LOP) and exportable pre-payroll registers.",
      link: "/features/payroll-management",
    },
  ];

  // 3-Step Reporting Process Workflow
  const workflowSteps = [
    {
      number: "01",
      title: "Ingest & Synchronize",
      description:
        "Automatically ingest raw biometric device logs, geofenced mobile check-ins, leave applications, and master employee records into one data pipeline.",
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
      title: "Filter, Segment & Compare",
      description:
        "Slice and compare workforce data across branch locations, departments, and shifts to identify absenteeism trends and overtime spikes in real-time.",
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
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "1-Click Export & Share",
      description:
        "Generate audit-ready Excel and CSV reports with one click, automate scheduled email digests to executive leadership, and reconcile payroll.",
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
    },
  ];

  // 3 Flagship Deep-Dive Capability Blocks
  const capabilityBlocks = [
    {
      id: "workforce-demographics",
      badge: "01 Employee Records & Directory",
      eyebrow: "✦ WORKFORCE DIRECTORIES & HEADCOUNT ✦",
      image: "/images/reports-block-workforce.webp",
      imageAlt:
        "HR leadership team reviewing workforce demographic reports and employee headcount summaries on digital dashboard",
      title: "Centralized Employee Records & Workforce Demographics",
      description:
        "Replace scattered file folders with a single verified employee directory. Review company-wide and department-level headcounts, employment types, joining dates, and statutory verification status without manual consolidation.",
      bullets: [
        "Single source of truth for full-time, probation, and contract personnel",
        "Department and branch headcount distributions available at a glance",
        "New joining rosters and upcoming work anniversary milestones",
        "Emergency contact and statutory KYC verification completeness logs",
        "Filter records by branch location, manager hierarchy, or designation",
        "Role-scoped access ensuring employee confidentiality is maintained",
      ],
      stats: [
        { value: "100%", label: "Verified Records" },
        { value: "Instant", label: "Directory Sync" },
        { value: "Branch-Level", label: "Multi-Entity Filtering" },
        { value: "Zero", label: "Spreadsheet Drift" },
      ],
    },
    {
      id: "attendance-leave-patterns",
      badge: "02 Attendance & Leave Trends",
      eyebrow: "✦ ATTENDANCE PATTERNS & TIME-OFF ✦",
      image: "/images/reports-block-attendance.webp",
      imageAlt:
        "Operations specialist and HR manager analyzing attendance trends and leave utilization on modern monitors",
      title: "Attendance Patterns & Recorded Workdays",
      description:
        "Understand punctuality, daily presence, and planned time-offs across every work week. Easily spot recurring absence patterns, evaluate team shift adherence, and ensure adequate department coverage during peak operating cycles.",
      bullets: [
        "Transparent daily presence board tracking on-time clock-ins and late arrivals",
        "Monthly attendance reconciliation registers ready for managerial review",
        "Real-time leave balance tracking across Casual, Sick, and Earned leaves",
        "Department overlap analysis preventing critical role understaffing",
        "Overtime and grace period summaries based on verified clock-in data",
        "Historical leave and absence records preserved for statutory audits",
      ],
      stats: [
        { value: "96.4%", label: "Average Present Rate" },
        { value: "< 2 Hours", label: "Leave Approval Cycle" },
        { value: "Real-Time", label: "Shift Adherence" },
        { value: "Zero", label: "Coverage Clashes" },
      ],
    },
    {
      id: "payroll-exportable",
      badge: "03 Payroll Preparation & Exports",
      eyebrow: "✦ PRE-PAYROLL RECONCILIATION & AUDIT ✦",
      image: "/images/reports-block-payroll.webp",
      imageAlt:
        "Finance controller and HR director reviewing monthly salary summaries, payroll cost graphs, and exportable data tables",
      title: "Pre-Payroll Reconciliation & Audit-Ready Registers",
      description:
        "Connect everyday attendance and approved time-offs directly into payroll preparation. Generate pre-payroll reconciliation summaries with automated Loss of Pay (LOP) calculations, and download clean files whenever needed.",
      bullets: [
        "Pre-payroll reconciliation checklist for business owners and accountants",
        "Automated Loss of Pay (LOP) calculations based on verified attendance records",
        "Salary cost distribution summaries by department and employment tier",
        "One-click export to CSV and Excel (.xlsx) formats for external payroll tools",
        "Audit-ready change logs showing edits, regularizations, and approvals",
        "Secure access controls preventing unauthorized salary data views",
      ],
      stats: [
        { value: "1-Click", label: "Excel / CSV Export" },
        { value: "100%", label: "LOP Accuracy" },
        { value: "Audit-Ready", label: "Salary Records" },
        { value: "Zero", label: "Calculation Gaps" },
      ],
    },
  ];

  // Customer Testimonials for Reports & Analytics
  const testimonials = [
    {
      id: 1,
      brand: "stripe",
      headline: "Month-end reporting time went from 3 full days to under 15 minutes",
      quote:
        "Reconciling attendance logs, shift rotations, and loss of pay from 6 distribution warehouses used to take our HR team the entire first weekend of every month. With Zentilos, reports are instantly generated and reconciled.",
      name: "Freddy Dean",
      role: "VP of People Operations, Modern Logistics",
      avatar: "/images/testi-avatar-1.webp",
    },
    {
      id: 2,
      brand: "zendesk",
      headline: "Spotted a 14% overtime leakage across our manufacturing shifts",
      quote:
        "The multi-branch attendance comparison report highlighted chronic unplanned overtime in our second shift within two weeks of deployment. The visibility paid for our Zentilos subscription three times over.",
      name: "Sarah Jenkins",
      role: "Head of Workforce Analytics, Apex Consumer Goods",
      avatar: "/images/testi-avatar-2.webp",
    },
    {
      id: 3,
      brand: "notion",
      headline: "Passed our statutory labor audit with zero discrepancies in LOP logs",
      quote:
        "When state labor auditors requested historical leave registers and attendance records for 400 employees, we exported verified Excel reports with full timestamp logs in two clicks.",
      name: "Rohan Mehta",
      role: "Director of HR & Operations, FinPulse Tech",
      avatar: "/images/leader-rohan-mehta.webp",
    },
    {
      id: 4,
      brand: "hubspot",
      headline: "Executive headcount comparisons that the CFO actually reads every Monday",
      quote:
        "Zentilos turned messy spreadsheet data into clean, visual metrics that our leadership team actually relies on for strategic headcount budgeting and attrition planning.",
      name: "Ananya Kapoor",
      role: "Chief People Officer, ZenHealth Labs",
      avatar: "/images/leader-ananya-kapoor.webp",
    },
  ];

  // FAQs for Reports & Analytics
  const faqs = [
    {
      q: "What types of workforce reports can I generate in Zentilos?",
      a: "Zentilos provides master Employee Directory rosters, Daily & Monthly Attendance registers, Shift Adherence summaries, Leave Quota & Utilization logs, and Pre-Payroll reconciliation registers with automated Loss of Pay (LOP) calculations.",
    },
    {
      q: "Can I export reports to Excel (.xlsx) and CSV formats?",
      a: "Yes. All reports can be downloaded in standard Excel (.xlsx) and CSV formats formatted cleanly for internal review, payroll software ingestion, or external statutory compliance audits.",
    },
    {
      q: "How does Zentilos handle multi-branch or multi-location reports?",
      a: "You can filter and compare records by company legal entity, branch location, department, shift rotation, or manager hierarchy. Consolidate company-wide numbers in one click or isolate specific branch registers instantly.",
    },
    {
      q: "Can I schedule automated reports to be emailed to department heads?",
      a: "Yes. You can schedule daily presence digests or monthly attendance recaps to be emailed automatically to designated managers, business unit leads, or finance teams at fixed times.",
    },
    {
      q: "How does Zentilos protect sensitive payroll and employee data in reports?",
      a: "Role-based permissions ensure department managers only see reports for their direct teams, while sensitive compensation registers, KYC documents, and executive reports remain restricted to authorized HR administrators.",
    },
  ];

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper reports-page-wrapper">
      <SEO
        title="HR Reports & Workforce Analytics Software — Zentilos"
        description="Turn workforce data into clearer decisions. Bring employee records, attendance patterns, leave registers, and payroll summaries together in decision-ready reports."
        canonicalPath="/features/reports-analytics"
        breadcrumbs={[
          { name: "Features", path: "/product" },
          { name: "Reports & Analytics", path: "/features/reports-analytics" },
        ]}
        additionalSchemas={[
          buildFAQSchema(
            faqs.map((f) => ({ question: f.q, answer: f.a })),
            "/features/reports-analytics"
          ),
        ]}
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            1. HERO SECTION (Dark Spotlight Stage + Sage HR Layout + Plum Primary Palette)
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="reports-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Zentilos">
              <span>✦ ZENTILOS ✦</span>
            </div>

            {/* Title & Subtext */}
            <h1 id="reports-hero-title" className="emp-hero-rich-title">
              Effortless <span className="emp-glow-text">Reports &</span>
              <br className="emp-hero-br" />
              Workforce Analytics
            </h1>
            <p className="emp-hero-rich-subhead">
              Turn attendance patterns, leave utilization, and employee records into clear, decision-ready workforce analytics. Get started by booking a demo or exploring executive reports today.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="emp-hero-rich-actions">
              <button
                type="button"
                className="emp-pill-btn-primary"
                onClick={() =>
                  openDemoModal({
                    title: "Book a Reports & Analytics Demo",
                    subtitle:
                      "See how Zentilos brings employee records, attendance patterns, and payroll summaries into clear, decision-ready reports.",
                    defaultInterest: "Reports & Analytics",
                  })
                }
              >
                Book a Free Demo <Icon name="arrow" size={15} />
              </button>
              <button
                type="button"
                className="emp-pill-btn-secondary"
                onClick={() => {
                  const el = document.getElementById("why-choose-title");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Explore Features
              </button>
            </div>

            {/* Trust Points */}
            <div className="emp-hero-trust-row">
              <span>
                <Icon name="check" size={13} /> No credit card required
              </span>
              <span>
                <Icon name="check" size={13} /> 100% India Data Residency
              </span>
              <span>
                <Icon name="check" size={13} /> Audit-Ready XLSX & CSV Exports
              </span>
            </div>

            {/* OPEN FLOATING 3-CARD SHOWCASE (Exact Employee Management layout) */}
            <div className="emp-hero-floating-stage">
              {/* Left Widget: Report Volume Breakdown Donut Chart */}
              <div className="emp-hero-float-card emp-hero-widget-left">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Report Volume</h3>
                    <span className="emp-float-widget-sub">By Category (Monthly)</span>
                  </div>
                  <span className="emp-float-widget-badge">Live Sync</span>
                </div>

                <div className="emp-donut-chart-wrap">
                  <svg width="120" height="120" viewBox="0 0 180 180" className="emp-donut-svg">
                    <circle cx="90" cy="90" r="68" stroke="#f4edf3" strokeWidth="18" fill="none" />
                    {/* Attendance Reports 48% (Plum #7b2958) */}
                    <circle
                      cx="90"
                      cy="90"
                      r="68"
                      stroke="#7b2958"
                      strokeWidth="18"
                      fill="none"
                      strokeDasharray="427"
                      strokeDashoffset="222"
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Leave & Absence 32% (Emerald #10b981) */}
                    <circle
                      cx="90"
                      cy="90"
                      r="68"
                      stroke="#10b981"
                      strokeWidth="18"
                      fill="none"
                      strokeDasharray="427"
                      strokeDashoffset="290"
                      strokeLinecap="round"
                      transform="rotate(82 90 90)"
                    />
                    {/* Pre-Payroll & LOP 20% (Violet #8b5cf6) */}
                    <circle
                      cx="90"
                      cy="90"
                      r="68"
                      stroke="#8b5cf6"
                      strokeWidth="18"
                      fill="none"
                      strokeDasharray="427"
                      strokeDashoffset="341"
                      strokeLinecap="round"
                      transform="rotate(198 90 90)"
                    />
                    {/* Center Info */}
                    <text x="90" y="84" textAnchor="middle" className="emp-donut-center-lbl">
                      Total Exports
                    </text>
                    <text x="90" y="106" textAnchor="middle" className="emp-donut-center-val">
                      1,840
                    </text>
                  </svg>
                </div>

                <div className="emp-donut-legend">
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-plum" />
                    <span>Attendance (48%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-mint" />
                    <span>Leave & Offs (32%)</span>
                  </div>
                  <div className="emp-legend-item">
                    <span className="emp-legend-dot emp-dot-violet" />
                    <span>Payroll / LOP (20%)</span>
                  </div>
                </div>
              </div>

              {/* Center Main Card: Real HR Analytics Leader Working */}
              <div className="emp-hero-center-photo-card">
                <img
                  src="/images/reports-hero-showcase.webp"
                  alt="Modern HR analytics dashboard with clean charts, attendance trend curves, and workforce summary metrics"
                  className="emp-hero-center-img"
                  loading="eager"
                />

                {/* Top-Left Floating Live Status Pill */}
                <div className="emp-photo-status-pill">
                  <span className="emp-live-pulse" />
                  <span>Analytics Engine Live</span>
                </div>
              </div>

              {/* Right Widget: Report Generation & Export Activity */}
              <div className="emp-hero-float-card emp-hero-widget-right">
                <div className="emp-float-widget-header">
                  <div>
                    <h3 className="emp-float-widget-title">Report Deliveries</h3>
                    <span className="emp-float-widget-sub">Last 30 Days</span>
                  </div>
                  <span className="emp-float-widget-pill-green">Verified</span>
                </div>

                <div className="emp-widget-stat-row">
                  <strong className="emp-stat-number">+142</strong>
                  <div className="emp-stat-meta">
                    <span>Reports Generated</span>
                    <small>100% On-time delivery</small>
                  </div>
                </div>

                {/* Modern Bar Chart */}
                <div className="emp-mini-bar-chart">
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "48%" }} />
                    <span className="emp-bar-lbl">M</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "65%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "58%" }} />
                    <span className="emp-bar-lbl">W</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "82%" }} />
                    <span className="emp-bar-lbl">T</span>
                  </div>
                  <div className="emp-bar-col is-active">
                    <div className="emp-bar-fill" style={{ height: "98%" }} />
                    <span className="emp-bar-lbl">F</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "62%" }} />
                    <span className="emp-bar-lbl">S</span>
                  </div>
                  <div className="emp-bar-col">
                    <div className="emp-bar-fill" style={{ height: "76%" }} />
                    <span className="emp-bar-lbl">S</span>
                  </div>
                </div>

                <div className="emp-widget-footer-pill">
                  <Icon name="check" size={14} />
                  <span>100% Audit-Ready XLSX & CSV Exports</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PROBLEM SECTION (The Challenge - 3 Problem Cards)
            ========================================================================= */}
        <section className="emp-section emp-problem-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ THE CHALLENGE ✦</span>
              <h2 className="emp-section-title">
                Workforce Decisions Shouldn't Depend
                <br />
                on Guesswork & Scattered Sheets
              </h2>
              <p className="emp-section-subhead">
                When attendance logs, leave balances, and headcount metrics live in silos, reporting takes days and compliance blind spots emerge.
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
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="16" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Scattered Data &
                  <br />
                  Spreadsheet Chaos
                </h3>
                <p className="emp-problem-desc">
                  Attendance punches, leave quotas, and employee records remain scattered across disparate Excel files, branch registers, and emails, creating conflicting numbers and version discrepancies.
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
                    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h12" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Painstaking Manual
                  <br />
                  Consolidation
                </h3>
                <p className="emp-problem-desc">
                  HR teams waste days each month copying numbers by hand, calculating Loss of Pay (LOP) manually, and fixing broken spreadsheet formulas right before executive leadership meetings.
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
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <h3 className="emp-problem-title">
                  Blind Spots in Absenteeism
                  <br />
                  & Overtime Spikes
                </h3>
                <p className="emp-problem-desc">
                  Without centralized multi-branch analytics, leaders lack instant visibility into chronic late marks, unauthorized overtime, department coverage gaps, or branch absenteeism patterns.
                </p>
              </div>
            </div>
          </div>

          {/* Section Divider Line (Centered, Not Touching Corners) */}
          <div className="emp-section-divider-line" aria-hidden="true" />
        </section>

        {/* =========================================================================
            3. REPORTS & ANALYTICS CAPABILITIES (3 Alternating Blocks)
            ========================================================================= */}
        <section className="emp-section emp-capabilities-section" id="features">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ REPORTS & ANALYTICS CAPABILITIES ✦</span>
              <h2 className="emp-section-title">
                Everything You Need to Track, Analyze, and Export Workforce Data
              </h2>
              <p className="emp-section-subhead">
                Explore the three core analytics modules designed to centralize profiles, reveal attendance trends, and deliver 100% verified payroll exports.
              </p>
            </div>
          </div>

          {/* 3 Full Blocks: Each with distinct outside background color & generous spacing */}
          <div className="emp-capability-blocks-list">
            {capabilityBlocks.map((blk, idx) => (
              <div key={blk.id} className={`emp-cap-block-wrapper emp-cap-bg-${idx}`}>
                <div className="container">
                  <article id={`cap-block-${blk.id}`} className="emp-reference-block-card">
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
                                defaultInterest: "Reports & Analytics",
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
                          <div key={sIdx} className="emp-block-stat-box">
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
            4. WHY ZENTILOS IS BEST FOR REPORTS & ANALYTICS (1 Big Card + 4 Small Cards)
            ========================================================================= */}
        <section className="emp-why-choose-section" aria-labelledby="why-choose-title">
          <div className="container">
            {/* Centered Section Header */}
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WHY ZENTILOS ✦</span>
              <h2 id="why-choose-title" className="emp-section-title">
                Workforce Analytics That Drive Confident Leadership Decisions
              </h2>
              <p className="emp-section-subhead">
                Transform raw daily biometric logs, leave entries, and profile updates into clean, executive-ready intelligence across every branch.
              </p>
            </div>

            {/* Asymmetric 1 Big Card + 4 Small Cards Grid */}
            <div className="emp-why-grid">
              {/* Left Column: 1 Big Card */}
              <div className="emp-why-big-card">
                <div className="emp-why-big-top-deck">
                  <div className="emp-why-big-badge">
                    <span className="emp-why-big-pill">
                      ✦ REAL-TIME WORKFORCE INTELLIGENCE ✦
                    </span>
                  </div>

                  {/* Floating Metric Card 1 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="check" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Verified Workforce Data</small>
                        <strong>100% Audit-Ready</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Formula Errors</span>
                  </div>

                  {/* Floating Metric Card 2 */}
                  <div className="emp-float-metric-card">
                    <div className="emp-metric-card-left">
                      <div className="emp-metric-icon-box">
                        <Icon name="shield" size={20} />
                      </div>
                      <div className="emp-metric-info">
                        <small>Multi-Branch Consolidated Reporting</small>
                        <strong>Instant Visibility</strong>
                      </div>
                    </div>
                    <span className="emp-metric-pill">Zero Report Delays</span>
                  </div>
                </div>

                {/* Bottom Narrative Copy */}
                <p className="emp-big-card-bottom-text">
                  Replace days of manual spreadsheet compilation with instant, automated workforce reporting. Zentilos unifies attendance punches, leave quotas, and headcount records into live visual dashboards and structured Excel registers ready for leadership and statutory audits.
                </p>
              </div>

              {/* Right Column: 4 Small Cards */}
              <div className="emp-why-small-grid">
                {/* Card 01 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="reports" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Automated Scheduled Digests</h3>
                  <p className="emp-why-card-desc">
                    Schedule daily presence or monthly attendance summaries delivered directly to department heads via email.
                  </p>
                </div>

                {/* Card 02 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="branch" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Multi-Branch Comparative Analytics</h3>
                  <p className="emp-why-card-desc">
                    Compare headcount, overtime, and absenteeism across multiple offices, factories, or retail stores side-by-side.
                  </p>
                </div>

                {/* Card 03 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="shield" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">Role-Based Report Access</h3>
                  <p className="emp-why-card-desc">
                    Grant managers access to their immediate team's reports while keeping executive payroll summaries strictly confidential.
                  </p>
                </div>

                {/* Card 04 */}
                <div className="emp-why-small-card">
                  <div className="emp-why-card-top-row">
                    <div className="emp-why-icon-badge">
                      <Icon name="clock" size={22} />
                    </div>
                  </div>
                  <h3 className="emp-why-card-title">1-Click Standard & Custom Exports</h3>
                  <p className="emp-why-card-desc">
                    Export clean, formatted reports into standard CSV and Excel (.xlsx) formats ready for auditors, accountants, or boards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WORK PROCESS SECTION (3-Card Notch Design)
            ========================================================================= */}
        <section className="emp-process-section" id="workflow" aria-labelledby="workflow-heading">
          <div className="container">
            <div className="emp-process-header">
              <span className="emp-process-eyebrow">✦ PROCESS ✦</span>
              <h2 id="workflow-heading" className="emp-process-title">
                From Raw Time Logs to Executive Insights in 3 Steps
              </h2>
              <p className="emp-process-subhead">
                A structured, automated pipeline that ingests workforce records, standardizes metrics, and delivers instant reports.
              </p>
            </div>

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
                    <div className="emp-process-notch">
                      <span className="emp-process-notch-num">{step.number}</span>
                    </div>

                    <div className="emp-process-icon-box">{step.icon}</div>

                    <h3 className="emp-process-card-title">{step.title}</h3>
                    <p className="emp-process-card-desc">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. CENTER CTA SECTION (Plum Accent Bar + Overlapping Image)
            ========================================================================= */}
        <section className="emp-center-cta-section" aria-labelledby="cta-banner-title">
          <div className="container">
            <div className="emp-center-cta-card">
              <div className="emp-cta-primary-bar" />

              <div className="emp-cta-img-wrap">
                <img
                  src="/images/reports-cta-analytics.webp"
                  alt="HR leaders and management reviewing report summaries in a collaborative meeting"
                  className="emp-cta-img"
                  loading="lazy"
                />
              </div>

              <div className="emp-cta-content">
                <span className="emp-cta-badge">✦ DECISION-READY REPORTING ✦</span>
                <h2 id="cta-banner-title" className="emp-cta-title">
                  Ready to Eliminate Spreadsheet Reporting Forever?
                </h2>
                <p className="emp-cta-desc">
                  Replace disconnected spreadsheets and manual paperwork with one unified, automated analytics platform. Keep every report verified, compliant, and accessible on demand.
                </p>
                <div className="emp-cta-btn-group">
                  <button
                    type="button"
                    className="emp-cta-btn"
                    onClick={() =>
                      openDemoModal({
                        title: "Schedule a Reports & Analytics Demo",
                        subtitle:
                          "Experience automated workforce reporting, attendance analytics, and pre-payroll registers with Zentilos.",
                        defaultInterest: "Reports & Analytics",
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
                        title: "Talk to a Data Specialist",
                        subtitle:
                          "Consult with our product advisors on custom report templates, multi-branch metrics, and export automation.",
                        defaultInterest: "Reports & Analytics",
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
            7. CONNECTED HRMS MODULES (Works Better Together - 4 Cards)
            ========================================================================= */}
        <section className="emp-section emp-connected-section">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ WORKS BETTER TOGETHER ✦</span>
              <h2 className="emp-section-title">
                Workforce Analytics Is Connected to Every HR Workflow
              </h2>
              <p className="emp-section-subhead">
                Reports seamlessly sync with core modules across the Zentilos platform.
              </p>
            </div>

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
                    <div className="emp-process-notch" aria-label={`Module ${mod.number}`}>
                      {isActive ? (
                        <span className="emp-process-notch-pill">{mod.number}</span>
                      ) : (
                        <span className="emp-process-notch-num">{mod.number}</span>
                      )}
                    </div>

                    <div className="emp-process-icon-box" aria-hidden="true">
                      {mod.icon}
                    </div>

                    <h3 className="emp-process-card-title">{mod.title}</h3>
                    <p className="emp-process-card-desc">{mod.description}</p>

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
            8. TESTIMONIALS SECTION (Slider with Prev/Next Controls)
            ========================================================================= */}
        <section className="emp-testimonials-section" aria-labelledby="testi-title">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ TESTIMONIALS ✦</span>
              <h2 id="testi-title" className="emp-section-title">
                What HR Leaders Say About Zentilos Reports
              </h2>
              <p className="emp-section-subhead">
                Discover how growing organizations eliminate reporting bottlenecks, automate month-end reconciliations, and pass audits effortlessly.
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
            9. FAQ SECTION (2-Column Layout)
            ========================================================================= */}
        <section className="faq-section emp-page-faq" id="faqs">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="QUESTIONS, ANSWERED"
                title="Everything you need to know"
                body="Common questions about workforce reports, data exports, attendance trend tracking, and executive insights."
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
            10. BOTTOM CONVERSION CTA BANNER
            ========================================================================= */}
        <FooterCTA
          eyebrowBadgeText="Built for Modern Multi-Branch Workforce Intelligence"
          headlineLine1="Transform Workforce Data into"
          headlineLine2="Confident Decisions with Zentilos"
          subheadlineLine1="Focus on strategic leadership while we automate workforce reporting:"
          subheadlineLine2="headcount, attendance trends, leave balances, pre-payroll registers, and audit logs."
          primaryButtonText="Book a Live Demo"
          secondaryButtonText="Explore Reports"
        />
      </main>

      <Footer />
    </div>
  );
}

export default ReportsAnalyticsPage;
