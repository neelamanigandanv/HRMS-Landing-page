import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import Icon, { IconName } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { useDemoModal } from "../context/DemoModalContext";
import "./ReportsAnalyticsPage.css";

type DateFilter = "30d" | "q3" | "ytd";
type MetricFilter = "attendance" | "leave" | "headcount";

export function ReportsAnalyticsPage() {
  const { openDemoModal } = useDemoModal();

  // Interactive States
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeDateFilter, setActiveDateFilter] = useState<DateFilter>("30d");
  const [activeMetricFilter, setActiveMetricFilter] = useState<MetricFilter>("attendance");
  const [activeConnectedCard, setActiveConnectedCard] = useState<number | null>(null);

  const handleOpenDemo = () => {
    openDemoModal({
      title: "Request a Reports & Analytics Demo",
      subtitle:
        "See how LattiumHR brings employee records, attendance patterns, and payroll summaries into clear, decision-ready reports.",
      defaultInterest: "Reports & Analytics",
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // =========================================================================
  // 02 · REPORTING CHALLENGES
  // =========================================================================
  const challenges = [
    {
      id: "scattered-sheets",
      title: "Information Scattered Across Spreadsheets",
      desc: "Employee files, contact records, and joining dates spread across disconnected Excel sheets and branch folders cause constant duplicate entries and version mismatch.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="16" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      id: "comparing-attendance",
      title: "Difficulty Comparing Attendance Records",
      desc: "Reconciling biometric logs, web clock-ins, and field shifts by hand makes it difficult to recognize absenteeism trends, punctuality patterns, and overtime hours.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: "manual-compilation",
      title: "Time Spent Preparing Reports Manually",
      desc: "HR managers spend days each month copying numbers, calculating loss of pay, and compiling summaries manually before executive leadership meetings.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h12" />
        </svg>
      ),
    },
    {
      id: "inconsistent-metrics",
      title: "Inconsistent Metrics Across Teams",
      desc: "Different departments measure attendance, leaves, and headcount using different criteria, creating confusion when leadership needs one verified company truth.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  // =========================================================================
  // 03 · REPORTING CAPABILITIES (5 Core Capabilities)
  // =========================================================================
  const capabilities = [
    {
      id: "employee-reports",
      badge: "Core Directory",
      title: "Employee Reports",
      desc: "Employee records and workforce summaries. Maintain complete visibility over active headcounts, job designations, branch rosters, and joining timelines in one verified register.",
      footer: "Includes Headcount, Profiles & Status",
      icon: <Icon name="employee" size={26} />,
    },
    {
      id: "attendance-reports",
      badge: "Daily Presence",
      title: "Attendance Reports",
      desc: "Attendance patterns and recorded workdays. Review daily presence summaries, on-time arrivals, late marks, shift schedules, and monthly timesheets without paper records.",
      footer: "Includes On-Time, Shift & Overtime",
      icon: <Icon name="attendance" size={26} />,
    },
    {
      id: "leave-reports",
      badge: "Time-Off Records",
      title: "Leave Reports",
      desc: "Leave balances, requests, and absence records. Monitor opening and closing quotas for casual, sick, and earned leaves alongside approved time-off and department coverage.",
      footer: "Includes Balances, Quotas & Approvals",
      icon: <Icon name="leave" size={26} />,
    },
    {
      id: "payroll-reports",
      badge: "Salary Preparation",
      title: "Payroll Reports",
      desc: "Relevant salary and payroll summaries, where supported. Access verified pre-payroll reconciliation registers, Loss of Pay (LOP) calculations, and statutory deduction breakdowns.",
      footer: "Includes Pre-Payroll & LOP Data",
      icon: <Icon name="payroll" size={26} />,
    },
    {
      id: "exportable-reports",
      badge: "Audit & Sharing",
      title: "Exportable Reports",
      desc: "Download or export data if the application supports it. Export clean, formatted workforce reports into standard CSV and Excel formats ready for auditors, accountants, or management.",
      footer: "CSV & Excel (.xlsx) Downloads",
      icon: <Icon name="reports" size={26} />,
    },
  ];

  // 3 Flagship Deep-Dive Capability Blocks
  const capabilityBlocks = [
    {
      id: "workforce-demographics",
      badge: "01 Employee Records & Directory",
      eyebrow: "✦ 01. WORKFORCE DIRECTORIES & PROFILES ✦",
      image: "/images/reports-block-workforce.jpg",
      imageAlt: "HR leadership team reviewing workforce demographic reports and employee headcount summaries on a digital tablet",
      title: "Centralized Employee Records & Workforce Summaries",
      description:
        "Replace scattered file folders with a single verified employee directory. Review company-wide and department-level headcounts, employment types, joining dates, and statutory verification status without manual consolidation.",
      bullets: [
        "Single source of truth for full-time, probation, and contract personnel",
        "Department and branch headcount distributions available at a glance",
        "New joining rosters and upcoming anniversary milestones",
        "Emergency contact and statutory KYC verification completeness logs",
        "Filter records by branch location, manager hierarchy, or designation",
        "Role-scoped access ensuring employee confidentiality is maintained",
      ],
      callout: {
        role: "Head of Talent & People Operations",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "100%", label: "Verified Records" },
        { value: "Instant", label: "Directory Sync" },
        { value: "Branch-Level", label: "Filtering" },
        { value: "Zero", label: "Spreadsheet Drift" },
      ],
    },
    {
      id: "attendance-leave-patterns",
      badge: "02 Attendance & Leave Trends",
      eyebrow: "✦ 02. ATTENDANCE & LEAVE PATTERNS ✦",
      image: "/images/reports-block-attendance.jpg",
      imageAlt: "Operations specialist and HR manager analyzing attendance trends and leave utilization on modern monitors",
      title: "Attendance Patterns & Recorded Workdays",
      description:
        "Understand punctuality, daily presence, and planned time-offs across every work week. Easily spot recurring absence patterns, evaluate team shift adherence, and ensure adequate department coverage during peak operating cycles.",
      bullets: [
        "Transparent daily presence board tracking on-time clock-ins and late arrivals",
        "Monthly attendance reconciliation registers ready for managerial review",
        "Real-time leave balance tracking across Casual, Sick, and Earned leaves",
        "Department overlap analysis preventing critical role understaffing",
        "Overtime and grace period summaries based on verified clock-in data",
        "Historical leave and absence records preserved for accurate reviews",
      ],
      callout: {
        role: "HR Operations Specialist",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "96.4%", label: "Average Present Rate" },
        { value: "< 2 Hours", label: "Leave Approval" },
        { value: "Real-Time", label: "Shift Tracking" },
        { value: "0", label: "Coverage Clashes" },
      ],
    },
    {
      id: "payroll-exportable",
      badge: "03 Payroll Summaries & Exports",
      eyebrow: "✦ 03. PAYROLL READINESS & EXPORTS ✦",
      image: "/images/reports-block-payroll.jpg",
      imageAlt: "Finance controller and HR director reviewing monthly salary summaries, payroll cost graphs, and exportable data tables",
      title: "Salary Summaries & Exportable Data Downloads",
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
      callout: {
        role: "Finance & Payroll Controller",
        phone: "+91 800-LATTIUM",
      },
      stats: [
        { value: "1-Click", label: "Excel / CSV Export" },
        { value: "100%", label: "LOP Accuracy" },
        { value: "Audit-Ready", label: "Salary Records" },
        { value: "Zero", label: "Calculation Gaps" },
      ],
    },
  ];

  // =========================================================================
  // 04 · ANALYTICS & INSIGHTS (Dataset for Interactive Single Large Chart)
  // =========================================================================
  const chartDatasets = {
    attendance: {
      title: "Daily Attendance & Punctuality Trend",
      subtitle: "Verified presence and on-time clock-in percentage across all team branches",
      unit: "%",
      benchmarkLabel: "95% Punctuality Target",
      dataPoints: [
        { label: "Wk 1", val: 94.2, baseline: 95, tooltip: "Week 1 • 94.2% Attendance (403/428 Present)" },
        { label: "Wk 2", val: 95.8, baseline: 95, tooltip: "Week 2 • 95.8% Attendance (410/428 Present)" },
        { label: "Wk 3", val: 96.4, baseline: 95, tooltip: "Week 3 • 96.4% Attendance (413/428 Present)" },
        { label: "Wk 4", val: 97.1, baseline: 95, tooltip: "Week 4 • 97.1% Attendance (416/428 Present)" },
        { label: "Wk 5", val: 96.0, baseline: 95, tooltip: "Week 5 • 96.0% Attendance (411/428 Present)" },
        { label: "Wk 6", val: 96.8, baseline: 95, tooltip: "Week 6 • 96.8% Attendance (414/428 Present)" },
      ],
      metrics: [
        { label: "Average Present Rate", val: "96.4%", note: "↑ 1.8% vs last month" },
        { label: "On-Time Clock-Ins", val: "94.8%", note: "Avg time: 09:14 AM" },
        { label: "Overtime Hours", val: "42.5 hrs", note: "Across field & support", neutral: true },
        { label: "Punctuality Target", val: "95.0%", note: "Target surpassed" },
      ],
    },
    leave: {
      title: "Leave Utilization & Absence Records",
      subtitle: "Approved casual, sick, and earned time-off requests mapped against team coverage",
      unit: "%",
      benchmarkLabel: "10% Maximum Absence Threshold",
      dataPoints: [
        { label: "Jul W1", val: 7.2, baseline: 10, tooltip: "Jul Week 1 • 7.2% Leave Rate (31 team members off)" },
        { label: "Jul W3", val: 8.5, baseline: 10, tooltip: "Jul Week 3 • 8.5% Leave Rate (36 team members off)" },
        { label: "Aug W1", val: 9.1, baseline: 10, tooltip: "Aug Week 1 • 9.1% Leave Rate (39 team members off)" },
        { label: "Aug W3", val: 7.8, baseline: 10, tooltip: "Aug Week 3 • 7.8% Leave Rate (33 team members off)" },
        { label: "Sep W1", val: 8.4, baseline: 10, tooltip: "Sep Week 1 • 8.4% Leave Rate (36 team members off)" },
        { label: "Sep W3", val: 7.9, baseline: 10, tooltip: "Sep Week 3 • 7.9% Leave Rate (34 team members off)" },
      ],
      metrics: [
        { label: "Avg Leave Utilization", val: "8.2%", note: "Safe team coverage" },
        { label: "Pending Approvals", val: "03", note: "< 2 hr turnaround", neutral: true },
        { label: "Coverage Clashes", val: "00", note: "Zero staffing gaps" },
        { label: "Holiday Utilization", val: "100%", note: "Synchronized calendar" },
      ],
    },
    headcount: {
      title: "Workforce Headcount & Department Trends",
      subtitle: "Active personnel count, onboarding completion, and department distributions",
      unit: " staff",
      benchmarkLabel: "400 Personnel Base",
      dataPoints: [
        { label: "May", val: 395, baseline: 400, tooltip: "May • 395 Active Employees (+6 New Hires)" },
        { label: "Jun", val: 402, baseline: 400, tooltip: "Jun • 402 Active Employees (+7 New Hires)" },
        { label: "Jul", val: 410, baseline: 400, tooltip: "Jul • 410 Active Employees (+8 New Hires)" },
        { label: "Aug", val: 418, baseline: 400, tooltip: "Aug • 418 Active Employees (+8 New Hires)" },
        { label: "Sep", val: 422, baseline: 400, tooltip: "Sep • 422 Active Employees (+4 New Hires)" },
        { label: "Oct", val: 428, baseline: 400, tooltip: "Oct • 428 Active Employees (+6 New Hires)" },
      ],
      metrics: [
        { label: "Active Headcount", val: "428", note: "↑ 33 staff added YTD" },
        { label: "Verified Profiles", val: "99.8%", note: "Complete KYC records" },
        { label: "Probation Reviews", val: "14", note: "On schedule this month", neutral: true },
        { label: "Branches Mapped", val: "04", note: "HQ & Regional Hubs" },
      ],
    },
  };

  const currentDataset = chartDatasets[activeMetricFilter];

  // =========================================================================
  // 05 · WHY LATTIUMHR (4 Practical Value Pillars)
  // =========================================================================
  const whyLattiumPoints = [
    {
      num: "01",
      title: "Organized, Single-Source Records",
      desc: "All employee information, attendance logs, and leave requests feed into one structured database, eliminating contradictory spreadsheet versions.",
    },
    {
      num: "02",
      title: "Consistent Organizational Metrics",
      desc: "Attendance rates, Loss of Pay days, and leave allowances are calculated using unified formulas, giving leaders reliable metrics they can trust.",
    },
    {
      num: "03",
      title: "Direct Access Without IT Hurdles",
      desc: "HR professionals and department managers generate verified summaries on demand without writing database queries or waiting on engineering teams.",
    },
    {
      num: "04",
      title: "Effortless Export & Sharing",
      desc: "Download cleanly formatted CSV and Excel files whenever accountants, external tax advisors, or compliance auditors request verified workforce records.",
    },
  ];

  // =========================================================================
  // 07 · HOW IT WORKS TOGETHER (Connected Modules)
  // =========================================================================
  const connectedModules = [
    {
      number: "01",
      title: "Employee Management",
      role: "Master Workforce Data",
      icon: <Icon name="employee" size={30} />,
      description:
        "Maintains verified profiles, designations, and department structures that form the foundation for all workforce reports.",
      link: "/features/employee-management",
    },
    {
      number: "02",
      title: "Attendance Management",
      role: "Daily Presence Data",
      icon: <Icon name="attendance" size={30} />,
      description:
        "Feeds clock-in times, shift workdays, and punctuality records directly into daily, monthly, and overtime reports.",
      link: "/features/attendance-management",
    },
    {
      number: "03",
      title: "Leave Management",
      role: "Time-Off Balances",
      icon: <Icon name="leave" size={30} />,
      description:
        "Supplies leave balance updates, approved absences, and holiday calendars for comprehensive team coverage reporting.",
      link: "/features/leave-management",
    },
    {
      number: "04",
      title: "Payroll Management",
      role: "Salary Summaries",
      icon: <Icon name="payroll" size={30} />,
      description:
        "Combines verified attendance and approved leaves into automated Loss of Pay (LOP) and exportable pre-payroll registers.",
      link: "/features/payroll-management",
    },
  ];

  // =========================================================================
  // 08 · FAQ SECTION (4 Questions Requested)
  // =========================================================================
  const faqs = [
    {
      q: "What are HR reports and analytics?",
      a: "HR reports provide structured summaries of workforce data, including employee records, attendance rosters, leave balances, and payroll readiness. Analytics help HR teams and management look at this information across dates and departments to identify patterns, such as attendance trends or seasonal leave peaks, enabling clearer organizational decisions.",
    },
    {
      q: "Which workforce reports can HR teams use?",
      a: "HR teams can generate and review Employee Directory reports, Daily & Monthly Attendance registers, Leave Quota & Balance reports, Department-level absence logs, and Pre-Payroll reconciliation summaries. All reports reflect verified data recorded directly across your active LattiumHR modules.",
    },
    {
      q: "Can HR reports be exported?",
      a: "Yes. Where supported, workforce reports can be exported directly into standard spreadsheet formats like CSV and Excel (.xlsx). This makes it straightforward to share audit-ready data with accounting teams, tax consultants, auditors, or executive leadership without manual reformatting.",
    },
    {
      q: "How can workforce analytics help managers?",
      a: "Analytics give department managers objective visibility into team-level patterns—such as recurring late arrivals, upcoming leave clusters that could risk project coverage, or departmental headcount changes. This helps managers plan shifts proactively and support their team members based on verified facts rather than assumptions.",
    },
  ];

  return (
    <div className="app-shell inner-page-shell emp-page-wrapper reports-page-wrapper">
      <SEO
        title="HR Reports & Workforce Analytics Software — LattiumHR"
        description="Turn HR data into clearer decisions. Bring employee information, attendance patterns, leave records, and payroll summaries together in decision-ready reports with LattiumHR."
        canonicalPath="/features/reports-analytics"
      />

      <Navbar />

      <main className="inner-main-content">
        {/* =========================================================================
            01 · HERO SECTION
            Headline: Turn HR Data Into Clearer Decisions.
            Subhead: Bring workforce information together in meaningful reports...
            Visual: HR analytics dashboard with clean charts and summary metrics.
            ========================================================================= */}
        <section className="emp-hero-rich" aria-labelledby="reports-hero-title">
          <div className="container">
            {/* Top Spotlight Tag */}
            <div className="emp-hero-spotlight-tag" aria-label="Lattium HR">
              <span>✦ LATTIUM HR ✦</span>
            </div>

            {/* Title & Subtext */}
            <h1 id="reports-hero-title" className="emp-hero-rich-title">
              Turn HR Data Into <span className="emp-glow-text">Clearer Decisions.</span>
            </h1>
            <p className="emp-hero-rich-subhead">
              Bring workforce information together in meaningful reports that help you understand attendance, leave, employee trends, and day-to-day operations.
            </p>

            {/* Dual Pill Action Buttons */}
            <div className="emp-hero-rich-actions">
              <button
                type="button"
                className="emp-btn-primary"
                onClick={handleOpenDemo}
              >
                Request a Demo <Icon name="arrow" size={16} />
              </button>
              <a href="#capabilities" className="emp-btn-secondary">
                Explore Capabilities
              </a>
            </div>

            {/* Trust Checklist Row */}
            <div className="emp-hero-trust-row">
              <span>
                <Icon name="check" size={14} /> Decision-Ready Summaries
              </span>
              <span>
                <Icon name="check" size={14} /> Export to CSV & Excel
              </span>
              <span>
                <Icon name="check" size={14} /> Real-Time Synchronization
              </span>
            </div>
          </div>

          {/* Floating Dashboard Showcase Mockup Stage */}
          <div className="container emp-hero-floating-stage">
            <div className="emp-hero-preview-grid">
              {/* Left Floating Widget: Live Presence & Headcount */}
              <div className="emp-floating-widget-left" style={{ minWidth: "260px" }}>
                <div className="emp-widget-header">
                  <span className="reports-live-pulse-dot" />
                  <span>Workforce Overview</span>
                </div>
                <div className="emp-widget-profile-row">
                  <div className="emp-widget-avatar-placeholder">
                    <Icon name="chart" size={18} />
                  </div>
                  <div>
                    <div className="emp-widget-name">428 Active Staff</div>
                    <div className="emp-widget-role">100% Verified Directory</div>
                  </div>
                </div>
                <div className="reports-widget-metric-row">
                  <span className="reports-widget-metric-label">Daily Attendance</span>
                  <span className="reports-widget-pill-green">96.4% Present</span>
                </div>
                <div className="reports-widget-metric-row">
                  <span className="reports-widget-metric-label">Leave Utilization</span>
                  <span className="reports-widget-metric-val">8.2% (Safe)</span>
                </div>
                <div className="reports-widget-metric-row">
                  <span className="reports-widget-metric-label">Active Branches</span>
                  <span className="reports-widget-metric-val">04 Locations</span>
                </div>
              </div>

              {/* Center Main Stage: Photorealistic HR Analytics Dashboard */}
              <div className="reports-hero-showcase-frame">
                <img
                  src="/images/reports-hero-showcase.jpg"
                  alt="Modern HR analytics dashboard with clean charts, attendance trend curves, and workforce summary metrics"
                  className="reports-hero-mockup-img"
                  loading="eager"
                />
              </div>

              {/* Right Floating Widget: Pre-Payroll & Export Status */}
              <div className="emp-floating-widget-right" style={{ minWidth: "250px" }}>
                <div className="emp-widget-header">
                  <span className="emp-widget-sparkle">✦</span>
                  <span>Report Ready</span>
                </div>
                <div className="emp-widget-field">
                  <span className="emp-widget-label">Pay Period Summary</span>
                  <span className="emp-widget-val">Current Month Reconciled</span>
                </div>
                <div className="reports-widget-metric-row">
                  <span className="reports-widget-metric-label">Loss of Pay (LOP)</span>
                  <span className="reports-widget-pill-plum">Auto-Calculated</span>
                </div>
                <div className="reports-widget-metric-row">
                  <span className="reports-widget-metric-label">Export Format</span>
                  <span className="reports-widget-metric-val">XLSX • CSV</span>
                </div>
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <span className="reports-widget-pill-green" style={{ width: "100%", display: "inline-block" }}>
                    ✓ Audit-Ready Download
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            02 · REPORTING CHALLENGES
            Heading: When Workforce Data Is Hard to Understand.
            Problems: scattered spreadsheets, attendance comparison, manual reporting.
            ========================================================================= */}
        <section className="emp-problem-section" id="challenges" aria-labelledby="problem-heading">
          <div className="container">
            <div className="emp-problem-header">
              <span className="emp-eyebrow">✦ 02 · REPORTING CHALLENGES ✦</span>
              <h2 id="problem-heading" className="emp-section-title">
                When Workforce Data Is Hard to Understand.
              </h2>
              <p className="emp-section-subhead">
                Without centralized reporting, gathering everyday workforce numbers becomes a tedious, time-consuming administrative burden prone to human errors.
              </p>
            </div>

            {/* 4 Reporting Challenges Grid */}
            <div className="emp-problem-grid reports-problem-grid">
              {challenges.map((c) => (
                <div className="emp-problem-card" key={c.id}>
                  <div className="emp-problem-icon-wrapper" aria-hidden="true">
                    {c.icon}
                  </div>
                  <h3 className="emp-problem-card-title">{c.title}</h3>
                  <p className="emp-problem-card-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            03 · REPORTING CAPABILITIES (5 Core Capabilities Matrix)
            Heading: See the Workforce Information That Matters.
            Capabilities: Employee, Attendance, Leave, Payroll, Exportable.
            ========================================================================= */}
        <section className="emp-section" id="capabilities" aria-labelledby="capabilities-heading" style={{ background: "#ffffff" }}>
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ 03 · REPORTING CAPABILITIES ✦</span>
              <h2 id="capabilities-heading" className="emp-section-title">
                See the Workforce Information That Matters.
              </h2>
              <p className="emp-section-subhead">
                Gain clear visibility across employee information, attendance patterns, leave records, and payroll preparation with reports built directly into your LattiumHR workspace.
              </p>
            </div>

            {/* 5 Core Capabilities Grid */}
            <div className="reports-capabilities-grid">
              {capabilities.map((cap) => (
                <div className="reports-capability-card" key={cap.id}>
                  <div className="reports-capability-header">
                    <div className="reports-capability-icon">{cap.icon}</div>
                    <span className="reports-capability-badge">{cap.badge}</span>
                  </div>
                  <h3 className="reports-capability-title">{cap.title}</h3>
                  <p className="reports-capability-desc">{cap.desc}</p>
                  <div className="reports-capability-footer">
                    <span>{cap.footer}</span>
                    <span style={{ fontSize: "1rem" }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            03B · DEEP-DIVE CAPABILITY BLOCKS (Alternating 3 Flagship Blocks)
            ========================================================================= */}
        <section className="emp-section" style={{ background: "#F6F8F8", borderTop: "1px solid #E5EAEA" }}>
          <div className="container">
            <div className="emp-feature-blocks-wrapper">
              {capabilityBlocks.map((block, index) => {
                const isEven = index % 2 === 1;
                return (
                  <div
                    key={block.id}
                    className={`emp-flagship-block ${isEven ? "reverse" : ""}`}
                    id={block.id}
                  >
                    {/* Visual Media Column */}
                    <div className="emp-flagship-visual">
                      <div className="emp-flagship-img-frame">
                        <img
                          src={block.image}
                          alt={block.imageAlt}
                          className="emp-flagship-img"
                          loading="lazy"
                        />
                        <div className="emp-flagship-badge-pill">
                          <span className="emp-badge-sparkle">✦</span>
                          <span>{block.badge}</span>
                        </div>
                      </div>

                      {/* 4 Stats Chips Grid */}
                      <div className="emp-flagship-stats-grid">
                        {block.stats.map((st, sIdx) => (
                          <div className="emp-flagship-stat-chip" key={sIdx}>
                            <span className="emp-chip-val">{st.value}</span>
                            <span className="emp-chip-lbl">{st.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="emp-flagship-content">
                      <span className="emp-flagship-eyebrow">{block.eyebrow}</span>
                      <h3 className="emp-flagship-title">{block.title}</h3>
                      <p className="emp-flagship-desc">{block.description}</p>

                      <ul className="emp-flagship-checklist">
                        {block.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>
                            <span className="emp-check-bullet" aria-hidden="true">✓</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="emp-flagship-actions">
                        <button
                          type="button"
                          className="emp-flagship-cta-btn"
                          onClick={handleOpenDemo}
                        >
                          Request a Demo <Icon name="arrow" size={15} />
                        </button>
                        <span className="emp-flagship-callout-text">
                          <span className="emp-callout-dot" />
                          <span>{block.callout.role} • LattiumHR Support</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            04 · ANALYTICS & INSIGHTS
            Headline: Understand the Trends Behind Your Numbers.
            Subhead: Show how available workforce data can help HR teams identify...
            Visual: One large chart with a date filter and a few supporting metrics—
                    not multiple repetitive cards.
            ========================================================================= */}
        <section className="reports-analytics-section" id="analytics" aria-labelledby="analytics-heading">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ 04 · ANALYTICS & INSIGHTS ✦</span>
              <h2 id="analytics-heading" className="emp-section-title">
                Understand the Trends Behind Your Numbers.
              </h2>
              <p className="emp-section-subhead">
                Explore how connected workforce data helps HR teams identify attendance patterns, understand leave usage, and review employee headcount trends over time.
              </p>
            </div>

            {/* Single Large Interactive Chart Stage with Date & Metric Filters */}
            <div className="reports-chart-stage-card">
              {/* Controls Bar: Title & Date Filters */}
              <div className="reports-chart-controls-bar">
                <div className="reports-chart-title-area">
                  <h3>{currentDataset.title}</h3>
                  <p>{currentDataset.subtitle}</p>
                </div>

                <div className="reports-chart-filters-group" role="group" aria-label="Date Range Filter">
                  <span style={{ fontSize: "0.8125rem", color: "#6a667f", fontWeight: 600 }}>Date Range:</span>
                  <button
                    type="button"
                    className={`reports-filter-pill-btn ${activeDateFilter === "30d" ? "is-active" : ""}`}
                    onClick={() => setActiveDateFilter("30d")}
                  >
                    Last 30 Days
                  </button>
                  <button
                    type="button"
                    className={`reports-filter-pill-btn ${activeDateFilter === "q3" ? "is-active" : ""}`}
                    onClick={() => setActiveDateFilter("q3")}
                  >
                    Q3 (Jul - Sep)
                  </button>
                  <button
                    type="button"
                    className={`reports-filter-pill-btn ${activeDateFilter === "ytd" ? "is-active" : ""}`}
                    onClick={() => setActiveDateFilter("ytd")}
                  >
                    Year-to-Date (YTD)
                  </button>
                </div>
              </div>

              {/* Metric Type Selector Pills */}
              <div className="reports-metric-tabs-row" role="tablist" aria-label="Select Analytics Metric">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMetricFilter === "attendance"}
                  className={`reports-metric-tab-btn ${activeMetricFilter === "attendance" ? "is-active" : ""}`}
                  onClick={() => setActiveMetricFilter("attendance")}
                >
                  <span className="reports-metric-tab-dot" />
                  <span>Attendance & Punctuality Trends</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMetricFilter === "leave"}
                  className={`reports-metric-tab-btn ${activeMetricFilter === "leave" ? "is-active" : ""}`}
                  onClick={() => setActiveMetricFilter("leave")}
                >
                  <span className="reports-metric-tab-dot" />
                  <span>Leave & Absence Patterns</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMetricFilter === "headcount"}
                  className={`reports-metric-tab-btn ${activeMetricFilter === "headcount" ? "is-active" : ""}`}
                  onClick={() => setActiveMetricFilter("headcount")}
                >
                  <span className="reports-metric-tab-dot" />
                  <span>Workforce Headcount Growth</span>
                </button>
              </div>

              {/* Large Responsive SVG Area / Trend Chart */}
              <div className="reports-svg-chart-container">
                <svg
                  viewBox="0 0 900 280"
                  className="reports-svg-chart"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="reportsChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#004B49" stopOpacity="0.28" />
                      <stop offset="60%" stopColor="#004B49" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#004B49" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="reportsLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#004B49" />
                      <stop offset="50%" stopColor="#003836" />
                      <stop offset="100%" stopColor="#004B49" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guide Grid Lines */}
                  <line x1="60" y1="40" x2="860" y2="40" stroke="#F6F8F8" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="60" y1="95" x2="860" y2="95" stroke="#F6F8F8" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="60" y1="150" x2="860" y2="150" stroke="#F6F8F8" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="60" y1="205" x2="860" y2="205" stroke="#F6F8F8" strokeWidth="1" />

                  {/* Benchmark Guideline */}
                  <line x1="60" y1="95" x2="860" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 6" />

                  {/* SVG Coordinates calculated from dataset */}
                  {activeMetricFilter === "attendance" && (
                    <>
                      {/* Area Fill */}
                      <path
                        d="M 120 160 Q 240 100 360 85 T 600 65 T 720 100 T 820 75 L 820 205 L 120 205 Z"
                        fill="url(#reportsChartGrad)"
                      />
                      {/* Smooth Line Curve */}
                      <path
                        d="M 120 160 Q 240 100 360 85 T 600 65 T 720 100 T 820 75"
                        stroke="url(#reportsLineGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Data Points */}
                      <circle cx="120" cy="160" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="260" cy="100" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="400" cy="85" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="540" cy="65" r="6" fill="#004B49" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="680" cy="100" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="820" cy="75" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                    </>
                  )}

                  {activeMetricFilter === "leave" && (
                    <>
                      {/* Area Fill */}
                      <path
                        d="M 120 170 Q 240 140 360 120 T 600 155 T 720 135 T 820 150 L 820 205 L 120 205 Z"
                        fill="url(#reportsChartGrad)"
                      />
                      {/* Smooth Line Curve */}
                      <path
                        d="M 120 170 Q 240 140 360 120 T 600 155 T 720 135 T 820 150"
                        stroke="url(#reportsLineGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Data Points */}
                      <circle cx="120" cy="170" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="260" cy="140" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="400" cy="120" r="6" fill="#004B49" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="540" cy="155" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="680" cy="135" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="820" cy="150" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                    </>
                  )}

                  {activeMetricFilter === "headcount" && (
                    <>
                      {/* Area Fill */}
                      <path
                        d="M 120 180 Q 240 160 360 135 T 600 100 T 720 80 T 820 55 L 820 205 L 120 205 Z"
                        fill="url(#reportsChartGrad)"
                      />
                      {/* Smooth Line Curve */}
                      <path
                        d="M 120 180 Q 240 160 360 135 T 600 100 T 720 80 T 820 55"
                        stroke="url(#reportsLineGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Data Points */}
                      <circle cx="120" cy="180" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="260" cy="160" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="400" cy="135" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="540" cy="100" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="680" cy="80" r="5" fill="#ffffff" stroke="#004B49" strokeWidth="3" />
                      <circle cx="820" cy="55" r="6" fill="#004B49" stroke="#ffffff" strokeWidth="2.5" />
                    </>
                  )}

                  {/* X-Axis Labels */}
                  {currentDataset.dataPoints.map((pt, idx) => {
                    const xPositions = [120, 260, 400, 540, 680, 820];
                    return (
                      <text
                        key={idx}
                        x={xPositions[idx]}
                        y="235"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="600"
                        fill="#6a667f"
                      >
                        {pt.label}
                      </text>
                    );
                  })}

                  {/* Y-Axis Value Labels */}
                  <text x="50" y="45" textAnchor="end" fontSize="11" fontWeight="600" fill="#94a3b8">
                    {activeMetricFilter === "headcount" ? "450" : "100%"}
                  </text>
                  <text x="50" y="100" textAnchor="end" fontSize="11" fontWeight="600" fill="#94a3b8">
                    {activeMetricFilter === "headcount" ? "415" : "95%"}
                  </text>
                  <text x="50" y="155" textAnchor="end" fontSize="11" fontWeight="600" fill="#94a3b8">
                    {activeMetricFilter === "headcount" ? "380" : "90%"}
                  </text>
                  <text x="50" y="210" textAnchor="end" fontSize="11" fontWeight="600" fill="#94a3b8">
                    {activeMetricFilter === "headcount" ? "350" : "85%"}
                  </text>
                </svg>

                {/* Legend Bar */}
                <div className="reports-chart-legend">
                  <span className="reports-legend-item">
                    <span className="reports-legend-color-solid" />
                    <span>Recorded Workforce Trend ({activeDateFilter.toUpperCase()})</span>
                  </span>
                  <span className="reports-legend-item">
                    <span className="reports-legend-color-dash" />
                    <span>{currentDataset.benchmarkLabel}</span>
                  </span>
                </div>
              </div>

              {/* Supporting Metrics Row (4 Metrics - No Repetitive Cards) */}
              <div className="reports-chart-metrics-row">
                {currentDataset.metrics.map((m, mIdx) => (
                  <div className="reports-chart-metric-cell" key={mIdx}>
                    <span className="reports-metric-cell-label">{m.label}</span>
                    <div className="reports-metric-cell-val">{m.val}</div>
                    <span className={`reports-metric-cell-caption ${m.neutral ? "neutral" : ""}`}>
                      {m.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            05 · WHY LATTIUMHR
            Headline: Less Time Compiling Reports. More Time Understanding Them.
            Explain: organized info, consistent reporting, easier access.
            Avoid unsupported AI / predictive claims.
            ========================================================================= */}
        <section className="reports-why-section" id="why-lattium" aria-labelledby="why-heading">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ 05 · WHY LATTIUMHR ✦</span>
              <h2 id="why-heading" className="emp-section-title">
                Less Time Compiling Reports. More Time Understanding Them.
              </h2>
              <p className="emp-section-subhead">
                LattiumHR keeps reporting grounded in verified everyday actions. Access consistent workforce records without manual spreadsheet consolidation or complex database queries.
              </p>
            </div>

            {/* 4 Practical Pillars Grid */}
            <div className="reports-why-grid">
              {whyLattiumPoints.map((item) => (
                <div className="reports-why-card" key={item.num}>
                  <span className="reports-why-num">PILLAR {item.num}</span>
                  <h3 className="reports-why-title">{item.title}</h3>
                  <p className="reports-why-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            06 · MIDDLE CTA
            Headline: Make Your Workforce Data More Useful.
            Subhead: See how LattiumHR can support your reporting needs.
            Button: Request a Demo
            ========================================================================= */}
        <section className="emp-center-cta-section" aria-labelledby="middle-cta-title">
          <div className="container">
            <div className="emp-center-cta-card">
              <div className="emp-cta-primary-bar" />

              <div className="emp-cta-img-wrap">
                <img
                  src="/images/emp-cta-collaboration.jpg"
                  alt="HR leaders and management reviewing report summaries in a collaborative meeting"
                  className="emp-cta-img"
                  loading="lazy"
                />
              </div>

              <div className="emp-cta-content">
                <span className="emp-cta-badge">✦ DECISION-READY REPORTING ✦</span>
                <h2 id="middle-cta-title" className="emp-cta-title">
                  Make Your Workforce Data More Useful.
                </h2>
                <p className="emp-cta-desc">
                  See how LattiumHR can support your reporting needs with verified employee summaries, attendance registers, and exportable payroll data.
                </p>
                <div className="emp-cta-btn-group">
                  <button
                    type="button"
                    className="emp-cta-btn"
                    onClick={handleOpenDemo}
                  >
                    Request a Demo
                  </button>
                  <button
                    type="button"
                    className="emp-cta-btn-secondary"
                    onClick={handleOpenDemo}
                  >
                    Talk to a Product Specialist <Icon name="arrow" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            07 · HOW IT WORKS TOGETHER
            Heading: Connect Workforce Data Across Your HRMS.
            Explain how employee info, attendance, leave, and payroll contribute.
            ========================================================================= */}
        <section className="emp-section emp-connected-section" id="connected-modules">
          <div className="container">
            <div className="emp-section-header center">
              <span className="emp-eyebrow">✦ 07 · HOW IT WORKS TOGETHER ✦</span>
              <h2 className="emp-section-title">
                Connect Workforce Data Across Your HRMS.
              </h2>
              <p className="emp-section-subhead">
                Everyday actions taken in employee profiles, attendance logs, leave balances, and salary reconciliations feed directly into clear, relevant reports depending on active modules.
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
                    <div className="emp-process-notch" aria-label={`Module ${mod.number}`}>
                      <span className="emp-process-notch-num">{mod.number}</span>
                    </div>

                    <div className="emp-process-icon-box" aria-hidden="true">
                      {mod.icon}
                    </div>

                    <span className="roles-example-scope-tag" style={{ margin: "0 auto 10px" }}>{mod.role}</span>
                    <h3 className="emp-process-card-title">{mod.title}</h3>
                    <p className="emp-process-card-desc">{mod.description}</p>
                    <span className="emp-connected-explore-pill">
                      Explore Module <Icon name="arrow" size={13} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            08 · FAQ SECTION
            Heading: Common Questions About HR Reports & Analytics
            4 Questions requested by the user.
            ========================================================================= */}
        <section className="faq-section emp-page-faq" id="faqs" aria-labelledby="faq-heading">
          <div className="container faq-grid">
            <div>
              <div className="section-heading">
                <span className="eyebrow">08 · QUESTIONS, ANSWERED</span>
                <h2 id="faq-heading">Common Questions About HR Reports & Analytics</h2>
                <p>
                  Find clear answers regarding workforce reports, data exports, attendance trend tracking, and managerial insights.
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
            FINAL CTA SECTION
            ========================================================================= */}
        <section className="final-cta emp-final-cta-section" aria-labelledby="final-cta-heading">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">READY FOR CLEARER WORKFORCE DATA?</span>
              <h2 id="final-cta-heading">Ready to Turn Your HR Data Into Clearer Decisions?</h2>
              <p>
                Discover how LattiumHR organizes employee profiles, attendance records, and leave summaries into decision-ready reports for your team.
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
                  <Icon name="check" /> Export to CSV & Excel (.xlsx)
                </span>
                <span>
                  <Icon name="check" /> 100% India Data Residency
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

export default ReportsAnalyticsPage;
